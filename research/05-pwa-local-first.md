# 05 - PWA local-first: almacenamiento, límites, rutas a nativo, sync, seguridad

Fecha de investigación: 2026-10-10. Solo lectura web; sin decisión de stack. Cada bullet lleva fuente (con fecha/versión cuando la página la daba). `(sin verificar)` = no confirmado en fuente primaria.

## Índice
1. [Almacenamiento local en el navegador](#1-almacenamiento-local-en-el-navegador)
2. [Límites de PWA en iOS y capacidades en Android](#2-límites-de-pwa-en-ios-y-capacidades-en-android)
3. [Backup / export desde una PWA](#3-backup--export-desde-una-pwa)
4. [Rutas de PWA a stores / nativo](#4-rutas-de-pwa-a-stores--nativo)
5. [Local-first y sync](#5-local-first-y-sync)
6. [Seguridad de datos locales](#6-seguridad-de-datos-locales)
7. [Keywords](#7-keywords)
8. [Huecos de cobertura](#huecos-de-cobertura)

---

## 1. Almacenamiento local en el navegador

### 1.1 Opciones
- **IndexedDB**: almacén async clave-valor/objetos, transaccional; es el sitio donde la mayoría de librerías (Dexie, idb, RxDB) persisten. Sujeto a la cuota y eviction del origen. Fuente: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria (MDN, consultada 2026-10)
- **localStorage / sessionStorage**: 5 MiB cada uno por origen, en todos los navegadores; síncrono, solo main thread. Fuente: misma página MDN.
- **Cache API**: pensada para respuestas HTTP (Service Worker); entra en el mismo cupo y en el mismo borrado por eviction/ITP. Fuente: https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/ (2020-03-24)
- **OPFS (Origin Private File System)**: `navigator.storage.getDirectory()`; Baseline "Widely available" desde marzo 2023; solo secure context (HTTPS); `createSyncAccessHandle()` solo en Web Workers; no visible al usuario; se borra al limpiar datos del sitio; sin prompts de permiso. Fuente: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system (MDN, 2026-10)
- **SQLite WASM oficial (sqlite.org/wasm)**, VFS de persistencia:
  - `kvvfs`: usa localStorage/sessionStorage, ~5 MB, solo main thread.
  - `opfs`: solo worker, requiere COOP/COEP (SharedArrayBuffer), incompatible con Safari < 17; multi-tab solo manejando `SQLITE_BUSY`.
  - `opfs-sahpool` (desde 3.43): no requiere COOP/COEP, normalmente el más rápido; sin conexiones simultáneas a la misma DB (salvo mismo thread o pause/unpause 3.50+); borra su storage si falla la inicialización (opcional desde 3.54).
  - `opfs-wl` (3.53.0): usa Web Locks; requiere `Atomics.waitAsync()`.
  - Soporte OPFS: Chromium ~mediados 2022, Firefox 111+, Safari 16.4+.
  - Aviso: en incógnito/invitado pueden reducirse cuotas o deshabilitarse persistencia; las DB pueden desaparecer por antivirus/limpieza del navegador.
  - Fuente: https://sqlite.org/wasm/doc/trunk/persistence.md (doc oficial, menciona pruebas 2026-03)
- **wa-sqlite**: build WASM de SQLite con VFS escritos en JS; VFS: `IDBBatchAtomicVFS`, `IDBMirrorVFS` (IndexedDB), `AccessHandlePoolVFS`, `OPFSCoopSyncVFS`, `OPFSAdaptiveVFS`, `OPFSAnyContextVFS`, `OPFSWriteAheadVFS`, Memory; builds sync y async (Asyncify/JSPI); licencia MIT (relicenciado desde GPLv3 el 2023-02-10). Fuente: https://github.com/rhashimoto/wa-sqlite
- **PGlite**: Postgres en WASM, <3 MB gzip, extensiones dinámicas (pgvector, PostGIS), reactividad/live queries, licencia dual Apache-2.0 + PostgreSQL License. Persistencia IndexedDB/OPFS y límite de una sola conexión: (sin verificar en esta pasada). Fuente: https://pglite.dev/
- **drift (Dart/Flutter web)**: usa sqlite3.wasm + OPFS si está disponible; si no, fallback más lento sobre IndexedDB en shared worker; requiere copiar `sqlite3.wasm` y worker a `web/`. Fuente: https://drift.simonbinder.eu/web/

### 1.2 Cuotas y eviction
- **Chrome/Chromium/Edge**: hasta 60% del disco total por origen (persistente y best-effort); máximo global del navegador 80%. Fuente: MDN quotas (arriba).
- **Firefox**: best-effort = min(10% del disco, 10 GiB por grupo de sitio); persistente hasta 50% del disco, tope 8 TiB. Fuente: MDN quotas.
- **Safari 17+ (iOS 17 / macOS Sonoma)**: apps navegador 60% del disco por origen y 80% total; otras apps WebKit 15% y 20%; iframes cross-origin 10% de la cuota del origen principal; al llegar al límite `QuotaExceededError`. Fuente: https://webkit.org/blog/14403/updates-to-storage-policy/ (2023-08-10)
- **Safari anterior a 17**: 1 GiB inicial por origen y luego prompt. Fuente: MDN quotas.
- **Home Screen web app (Safari 17+)**: misma cuota por origen y total que en el navegador. Fuente: WebKit 14403.
- **Cuotas dependen del tamaño total del disco, no del espacio libre**, y pueden variar para resistir fingerprinting. Fuente: MDN quotas.
- **Eviction por presión de almacenamiento**: LRU por origen; se borra todo el origen junto (consistencia); origen persistente se salta. Fuente: MDN quotas.
- **Regla de 7 días (ITP, Safari)**: borra "all script-writeable storage" (IndexedDB, localStorage, SessionStorage, media keys, service worker registrations y cachés) tras 7 días de *uso de Safari* sin interacción del usuario con el sitio; cookies server-set exentas. Fuente: https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/ (2020-03-24) y https://webkit.org/tracking-prevention/ (sin fecha en página)
- **Home Screen apps vs. 7 días**: tienen su propio contador de días de uso (no son Safari); WebKit "no espera" que se borren los datos del first-party y lo trataría como bug serio. Fuente: WebKit 10218. Nota: es una declaración de intención 2020, no una garantía contractual; además datos del Safari-tab y de la app instalada están particionados (sin verificar en fuente primaria; lo dicen blogs: https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide).
- **Home Screen apps y eviction por falta de espacio**: siguen sujetas a LRU/presión de disco según WebKit 14403 ("Origins with an active page or persistent mode may be excluded").
- **Cuotas antiguas citadas en blogs (~50 MB Cache API)** son datos previos a Safari 17; (sin verificar vigencia). Fuente: magicbell (arriba).

### 1.3 `navigator.storage.persist()` y `estimate()`
- `persist()` soportado: Chrome 55, Edge 79, Firefox 57, Safari 15.2. Fuente: https://web.dev/articles/persistent-storage (actualizado 2020-05-12)
- Chromium: concede/deniega sin prompt por heurística (engagement, instalada/bookmark, permiso de notificaciones). Fuente: web.dev persistent-storage.
- Firefox: muestra popup al usuario. Fuente: web.dev + MDN quotas.
- Safari: concede por heurística, p. ej. si es Home Screen Web App; `persisted()` consulta el estado. Fuente: WebKit 14403.
- Persistente = el navegador no evicta Cache API, cookies, localStorage, File System, IndexedDB ni SW salvo que el usuario limpie. No hay forma programática de quitarlo. Fuente: web.dev persistent-storage.
- Recomendación de la fuente: pedirlo al guardar datos críticos, tras gesto de usuario; no al cargar; no reintentar tras negativa inmediata. Fuente: web.dev persistent-storage.
- `estimate()` devuelve `{usage, quota}`; existe en Safari 17+ (Storage API "fully supported"). Fuente: WebKit 14403 y MDN quotas. Soporte por versión exacta en Android/desktop: (sin verificar con tabla caniuse).
- Reporte de foro: en iOS la persistencia habría que pedirla en cada apertura y exigiría permiso de notificaciones. (sin verificar) Fuente: https://developer.apple.com/forums/thread/710157

---

## 2. Límites de PWA en iOS y capacidades en Android

### 2.1 iOS (era iOS/iPadOS 26, Safari 26)
- **Instalar**: Compartir > "Añadir a pantalla de inicio"; no existe `beforeinstallprompt` (sin verificar en fuente Apple; blogs). Fuente: magicbell (arriba).
- **iOS 26**: todo sitio añadido al Home Screen abre como web app por defecto; interruptor "Open as Web App" para volver a marcador; la web app existente no cambia. Fuente secundaria: https://heise.de/-10749652 (2025); foros dicen que el flujo exige más taps (sin verificar).
- **Web Push**: desde iOS/iPadOS 16.4, solo para web apps en Home Screen, manifest con `display: standalone|fullscreen`, permiso tras gesto directo; usa Push API/Notifications/Service Workers estándar; endpoints permitir `*.push.apple.com`; no exige Apple Developer Program. Fuente: https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ (2023-02-16)
- **Badging API** (`setAppBadge`/`clearAppBadge`) en Home Screen apps desde 16.4. Fuente: WebKit 13878.
- **Background Sync / Periodic Background Sync**: no soportados en iOS Safari. Fuente secundaria: https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide ; bug de WebKit abierto: https://bugs.webkit.org/show_bug.cgi?id=201866 (estado actual sin verificar).
- **File System Access API (`showSaveFilePicker`, etc.)**: no soportado en Safari desktop ni iOS (caniuse lista no soportado hasta 26.5). Fuente: https://caniuse.com/native-filesystem-api y https://caniuse.com/mdn-api_window_showsavefilepicker
- **Web Share API (`navigator.share`)**: Safari 12.1; `canShare()` Safari 14. Fuente: https://web.dev/articles/web-share
- **Web Share Target (manifest `share_target`)**: estado Safari/iOS (sin verificar; la página caniuse consultada no devolvió la tabla). Fuente a revisar: https://caniuse.com/web-share-target
- **Cámara (`getUserMedia`) en standalone**: (sin verificar en esta pasada).
- **Limpieza de datos**: ver 1.2 (7 días, LRU, usuario limpia datos). Qué pasa al borrar el icono de la app: (sin verificar).
- **Terceros navegadores**: pueden ofrecer "Add to Home Screen" solo con entitlement `com.apple.developer.web-browser`; sitios sin manifest/meta web-app se guardan como marcador. Fuente: WebKit 13878.
- **UE / DMA**: en iOS 17.4 beta Apple anunció quitar Home Screen web apps en la UE, y revirtió: se mantienen, siguen construidas sobre WebKit. Fuente secundaria: https://www.engadget.com/apple-backtracks-on-plans-to-get-rid-of-web-apps-on-iphones-in-the-eu-195232177.html (2024-03). Fuente primaria Apple (https://developer.apple.com/support/dma/) no accesible en esta pasada. Estado en iOS 26 en la UE: (sin verificar).

### 2.2 Android
- **WebAPK**: Chrome pide a un servidor de minting generar un APK real de la web app; es la vía "estándar e integrada". En dispositivos sin GMS o con otros navegadores se instala como atajo. Fuente: https://chromium.googlesource.com/chromium/src/+/da170c2267b2201954efe1c8fa5d2d89ab09f7bf/components/webapps/docs/android_architecture.md
- **TWA (Trusted Web Activity)**: abre la PWA a pantalla completa vía Custom Tabs, renderizada por el navegador del usuario; requiere Digital Asset Links (app y sitio del mismo desarrollador); Chrome 72+; si no soporta TWA, cae a Custom Tab con barra. Fuente: https://developer.chrome.com/docs/android/trusted-web-activity/overview
- **Storage de TWA**: comparte cookies y storage con el perfil principal de Chrome. Fuente: doc arquitectura Chromium (arriba). localStorage específico: (sin verificar).
- **Background Sync / Periodic Sync, File System Access en Android**: File System Access NO soportado en Chrome Android (caniuse, Chrome 154). Fuente: https://caniuse.com/native-filesystem-api . Background Sync en Chrome Android: (sin verificar en esta pasada).

---

## 3. Backup / export desde una PWA

- **File System Access API** (`showSaveFilePicker`/`showOpenFilePicker`, handles persistentes): Chrome/Edge desktop 105+ (parcial 86-104); Opera 91+; no en Firefox; no en Safari desktop/iOS; no en Chrome Android. Fuente: https://caniuse.com/native-filesystem-api (consultada 2026-10, datos hasta Chrome 154/Safari 26.5)
- **OPFS** NO es backup: se pierde al limpiar datos; no visible al usuario. Fuente: MDN OPFS.
- **Export por descarga**: `Blob` + `<a download>` funciona como camino universal (comportamiento por plataforma en iOS standalone: sin verificar).
- **Web Share API con archivos** (`navigator.share({files})` + `canShare`): hoja de compartir nativa; soporte de archivos por plataforma (sin verificar). Fuente base: https://web.dev/articles/web-share
- **Import**: `<input type="file">` universal (sin verificar comportamiento específico en iOS standalone, pero es API básica).
- **Backup automático en segundo plano**: sin Background Sync en iOS (ver 2.1); en Chromium existe Periodic Background Sync con requisitos de instalación/engagement (sin verificar). Consecuencia: el backup automático fiable en iOS requiere acción del usuario o sync a cloud.
- **Formato de export portable**: JSON/CSV + versión de esquema (práctica, no fuente).

---

## 4. Rutas de PWA a stores / nativo

### 4.1 Costes y requisitos de stores
- **Apple Developer Program**: 99 USD/año; exención para ONG, instituciones educativas acreditadas y gobiernos (no personas físicas). Fuente: https://developer.apple.com/support/fee-waiver (vía resultados de búsqueda 2026-10; importe oficial en https://developer.apple.com/programs/ no abierto).
- **Cuenta gratis Apple (Personal Team en Xcode)**: hasta 10 App IDs y 3 dispositivos, perfiles expiran a 7 días (reinstalar), 3 apps por dispositivo. Fuente: https://developer.apple.com/support/compare-memberships/
- **TestFlight / App Store Connect**: solo con membresía de pago. Fuente: misma página.
- **Google Play**: 25 USD pago único; verificación de identidad; tarjeta no prepago. Fuente: https://support.google.com/googleplay/android-developer/answer/6112435
- **Google Play, cuentas personales creadas después de 2023-11-13**: closed test con >=12 testers opt-in durante 14 días consecutivos antes de pedir acceso a producción. Fuente: https://support.google.com/googleplay/android-developer/answer/14151465
- **Distribución sin store** Android (APK directo) y Windows/Linux: (sin verificar en esta pasada).
- **Electron / desktop fuera de store**: macOS exige firmar y notarizar con Apple Developer Program (de pago); Windows sin firma dispara SmartScreen; certificados citados 200-700 USD/año (fuente débil, sin verificar). Fuente: https://www.electronjs.org/docs/latest/tutorial/code-signing

### 4.2 Política de stores (riesgo)
- **Apple 4.2 Minimum Functionality**: la app debe "elevate it beyond a repackaged website"; 4.2.6 rechaza apps de plantilla/generador salvo envío del proveedor del contenido; 2.5.2 prohíbe descargar/ejecutar código que cambie funcionalidades. Fuente: https://developer.apple.com/app-store/review/guidelines/ (consultada 2026-10)
- Wrappers WebView con UI 100% remota son el caso típico de rechazo; añadir push/sharing solo no basta según blogs (sin verificar). Fuente: https://www.technetexperts.com/guideline-4-2-minimum-functionality/
- Google Play: política de cuentas nuevas arriba; políticas de contenido/datos financieros (sin verificar para app de gastos personal sin banking).

### 4.3 Qué se reutiliza por ruta (hechos)
| Ruta | Reutiliza | Notas | Fuente |
|---|---|---|---|
| **PWABuilder** | Mismo sitio/PWA | Genera paquete Android (TWA), Windows MSIX y proyecto iOS; coste/licencia no leído | https://www.pwabuilder.com/ |
| **TWA** | Mismo sitio | Requiere Digital Asset Links; Chrome 72+ | https://developer.chrome.com/docs/android/trusted-web-activity/overview |
| **Capacitor** | Build web (carpeta con `index.html`) | `npx cap sync` copia el bundle a proyectos nativos Android/iOS; plugins nativos; requiere entorno nativo (Xcode/Android Studio, sin verificar en la página) | https://capacitorjs.com/docs/getting-started |
| **Tauri 2** | Frontend web | Estable 2024-10-02; iOS y Android incluidos; usa WebView del SO; DX móvil "not completely happy"; no todos los plugins oficiales soportan móvil; core en Rust (Swift/Kotlin para plugins móviles); Linux = WebKit2GTK | https://v2.tauri.app/blog/tauri-20/ |
| **Electron** | Frontend web | Empaqueta Chromium; desktop; firma obligatoria en la práctica | https://www.electronjs.org/docs/latest/tutorial/code-signing |
| **Flutter web / nativo** | Código Dart (no JS) | Misma base Dart para web y nativo; en web, drift usa sqlite3.wasm+OPFS | https://drift.simonbinder.eu/web/ |
| **React Native / Expo** | Lógica JS/TS; UI es distinta a DOM | React Native Web / Expo universal: (sin verificar en esta pasada) | (sin verificar) |

---

## 5. Local-first y sync

### 5.1 Conceptos
- **Siete ideales local-first (Ink & Switch, 2019-04)**: no spinners; multi-dispositivo; offline; colaboración; "The Long Now"; seguridad/privacidad por defecto; control del usuario. Fuente: https://www.inkandswitch.com/essay/local-first/
- **Limitaciones CRDT citadas por los autores**: historial sin límite (crece), red no resuelta (NAT), estado difícil de razonar, conflictos residuales sobre misma propiedad, hace falta servidor como "cloud peer", permisos y evolución de esquema sin resolver. Fuente: mismo ensayo.
- **Estrategias de conflicto** (conceptos): LWW (last-write-wins, simple, pierde escrituras), CRDT (merge automático por tipo), event sourcing / op-log (se sincronizan operaciones, estado = reducción), servidor autoritativo con rebase (estilo Replicache/Zero). Detalle de cada una: (sin verificar con fuente primaria en esta pasada).
- **Ejemplos de conflicto en un ledger**:
  - Mismo gasto editado en dos dispositivos offline (monto vs categoría): LWW por campo salva ambos; LWW por registro pierde uno.
  - Un dispositivo borra y otro edita el mismo gasto: tombstone vs update.
  - Saldo/total derivado calculado en cliente: no sincronizar derivados, recalcular desde transacciones.
  - Duplicados por reimportar el mismo CSV en dos dispositivos: requiere id idempotente/hash de importación.
  - Cambio de categoría renombrada/fusionada mientras otro dispositivo crea gastos con la antigua.
  - Cambio de moneda/tipo de cambio retroactivo.
  (Ejemplos de diseño, no de fuente.)

### 5.2 IDs, tombstones, migraciones
- **UUIDv7 (RFC 9562, 2024-05)**: 48 bits timestamp Unix ms big-endian + versión 4 bits + 12 bits rand_a + variante 2 bits + 62 bits rand_b; ordenable por tiempo; monotonicidad dentro del mismo ms por contador opcional. Fuente: https://www.rfc-editor.org/rfc/rfc9562.html
- **ULID**: alternativa ordenable (26 chars Crockford base32), (sin verificar spec en esta pasada). Fuente a revisar: https://github.com/ulid/spec
- **Tombstones / soft delete** (`deleted_at`/flag): necesarios para propagar borrados en sync; crecen y requieren GC. Fuente conceptual: ensayo Ink & Switch (historial no truncable).
- **Migraciones de esquema en cliente**: versionado de esquema en IndexedDB (`onupgradeneeded`, versión entera) o tabla `schema_version` en SQLite; el ensayo Ink & Switch lista "schema evolution across app versions" como pregunta abierta. En multi-dispositivo hay versiones de app distintas coexistiendo: (concepto, sin fuente específica).

### 5.3 Motores de sync (madurez / licencia)
| Proyecto | Qué es | Licencia | Estado observado | Fuente |
|---|---|---|---|---|
| **Automerge** | CRDT JSON-like + sync protocol; Rust core, WASM a JS | MIT | Automerge 3 publicado (~10x menos memoria); mantenedores full time (Ink & Switch) | https://github.com/automerge/automerge |
| **Yjs** | Framework CRDT (Map, Array, texto), agnóstico de red | MIT | ~22.9k stars; mantenedor en tiempo libre, soporte de pago | https://github.com/yjs/yjs |
| **ElectricSQL** | Sync engine Postgres -> clientes, read-path con Shapes; escrituras no cubiertas por el motor | Apache-2.0 | Referencia a 1.0 (2025-03-17); badge "Beta" en README | https://github.com/electric-sql/electric |
| **PowerSync** | Sync de backend (Postgres/MongoDB/MySQL/SQL Server) a SQLite cliente | SDKs Apache-2.0; servicio/CLI FSL (convierte a OSS a los 2 años); Enterprise comercial | Open Edition self-host gratis | https://www.powersync.com/open-source y https://powersync.com/legal/licensing-terms |
| **cr-sqlite** | Extensión SQLite: tablas CRR, `crsql_changes`, columnas LWW/fractional index/OR-set | MIT | README avisa "main may not be 100% stable"; fecha de último release no confirmada | https://github.com/vlcn-io/cr-sqlite |
| **Zero (Rocicorp)** | Sync engine general para web | licencia (sin verificar) | v1.0 según InfoQ (2026-06) | https://infoq.com/news/2026/06/zero-version-1 |
| **Triplit** | DB full-stack con sync cliente/servidor | AGPL-3.0 | Cofundador se une a Supabase 2025-10-08; se anunció abrir el resto del código; sin plan de integrarlo | https://supabase.com/blog/triplit-joins-supabase |
| **RxDB** | DB local-first JS, storage pluggable (IndexedDB, OPFS, SQLite) y replicación genérica | licencia (sin verificar) | - | https://rxdb.info |
| **Dexie / Dexie Cloud** | Wrapper IndexedDB; Cloud = sync hosted de pago (sin verificar precios) | (sin verificar) | - | https://dexie.org |
| Evolu, LiveStore, Jazz, InstantDB | Otras opciones local-first | (sin verificar) | no investigadas | - |

- Observación: casi todos los motores con servidor presuponen un backend (Postgres u otro) = coste/hosting; con "cero servicios de pago" las vías son: sin sync (export/import), sync por archivo/almacenamiento del usuario, o self-host propio. (Inferencia, no fuente.)

---

## 6. Seguridad de datos locales

- **KDF desde passphrase**: OWASP recomienda Argon2id mínimo m=19 MiB, t=2, p=1 (alternativas 46 MiB/t=1, 12 MiB/t=3, 9 MiB/t=4, 7 MiB/t=5); PBKDF2-HMAC-SHA256 600,000 iteraciones; PBKDF2-HMAC-SHA512 220,000; scrypt N=2^17, r=8, p=1. Medir en el hardware objetivo (<1 s). Fuente: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html (consultada 2026-10)
- **WebCrypto**: nativo soporta PBKDF2, HKDF, AES-GCM (sin verificar lista exacta en esta pasada); Argon2 no está en WebCrypto, requiere lib/WASM (sin verificar). Fuente base: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto
- **WebAuthn PRF extension**: `prf` devuelve bytes deterministas ligados a la credencial (`eval` en `create()`, `evalByCredential` en `get()`); la salida va por HKDF a una clave AES-GCM; si se pierde la credencial se pierde el dato; soporte por navegador/autenticador variable: (sin verificar tabla). Fuente: https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/WebAuthn_extensions
- **Biometría como "unlock"**: WebAuthn con `userVerification` da verificación local pero por sí sola no cifra datos; para cifrado se necesita PRF o un secreto guardado. (Concepto.)
- **Qué el navegador no protege**: XSS/ código inyectado lee IndexedDB y claves en memoria; una clave `extractable: false` evita exportarla pero no que script la use; otros perfiles/dispositivos desbloqueados; extensiones. (Concepto, sin fuente específica.)
- **Cifrar en reposo no evita eviction ni pérdida**: la clave perdida = datos irrecuperables; combinar con export cifrado.
- **OPFS/IndexedDB no están cifrados por la app por defecto**; protegidos solo por el sandbox del navegador y cifrado de disco del SO. (Concepto.)

---

## 7. Keywords

**EN**: local-first software, offline-first, PWA storage quota, StorageManager persist estimate, IndexedDB vs OPFS, sqlite wasm opfs-sahpool, wa-sqlite IDBBatchAtomicVFS, PGlite, Intelligent Tracking Prevention 7-day cap, WebKit storage policy, Home Screen web app, WebAPK, Trusted Web Activity, PWABuilder, Capacitor, Tauri 2 mobile, Expo, React Native Web, Flutter web drift, CRDT, last-write-wins, op-log, event sourcing, tombstone, hybrid logical clock, UUIDv7, ULID, Automerge, Yjs, ElectricSQL, PowerSync, cr-sqlite, Zero sync, Triplit, Replicache, RxDB, Dexie Cloud, WebCrypto AES-GCM, PBKDF2, Argon2id, WebAuthn PRF extension, passkeys, File System Access API, Web Share API, share_target, DMA iOS PWA, App Store guideline 4.2, Play closed testing 12 testers.

**ES**: aplicación web progresiva, almacenamiento local, cuota de almacenamiento, desalojo de datos, "local primero", sincronización sin conexión, resolución de conflictos, borrado lógico, identificadores ordenables, cifrado en reposo, derivación de clave, desbloqueo biométrico, exportar/importar respaldo, publicar PWA en Play Store / App Store, cuenta de desarrollador, tarifa anual.

---

## Huecos de cobertura

- **No accesible / sin primaria**: MDN quotas completo se obtuvo vía resumen; Apple DMA support page no cargó (ECONNRESET); tabla caniuse de `web-share-target` no devuelta; MDN `prf` sin tabla de compatibilidad.
- **Sin verificar**: soporte por plataforma de `estimate()`; cámara en PWA standalone iOS; comportamiento de descarga/share de archivos en iOS standalone; qué ocurre con los datos al borrar el icono en iOS; estado actual de Background Sync en Chrome Android y de Periodic Sync; estado DMA/PWA en iOS 26 UE.
- **No investigado**: Expo/React Native Web, Flutter web (render/rendimiento), Evolu, LiveStore, Jazz, InstantDB, licencias de Zero/RxDB/Dexie, costes de Microsoft Store/Mac App Store, WebAuthn PRF por navegador, Argon2 WASM libs, límites de IndexedDB por transacción/tamaño de registro, rendimiento comparativo IndexedDB vs OPFS-SQLite.
- **Fuentes secundarias usadas** (blogs/prensa; contrastar antes de decidir): magicbell, heise, engadget, technetexperts, PowerSync legal vía buscador, SourceForge/rxdb.info.
