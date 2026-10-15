# 08 - Backlog

Origen: entrevista y investigación (`00-indice.md`, `01`-`07`). Estado: borrador. El proyecto base está inicializado (PR #2: stack, capas y tooling), pero ninguna funcionalidad de v1 está construida.

## Índice

- [Decisiones cerradas](#decisiones-cerradas)
- [Fase 0: verificaciones previas](#fase-0-verificaciones-previas)
- [Fase 1 (v1): solo gastos](#fase-1-v1-solo-gastos)
- [Fases posteriores](#fases-posteriores)
- [Decisiones diferidas](#decisiones-diferidas)
- [Riesgos](#riesgos)

## Decisiones cerradas

| Tema | Decisión |
|---|---|
| Objetivo | Uso personal; aprendizaje + reemplazo de Money Manager; posible producto para círculo cercano |
| Costo | Cero servicios de pago |
| Moneda | MXN principal, USD, más monedas a futuro |
| Alcance v1 | Solo gastos |
| Captura | Una pantalla, monto primero, defaults en fecha/cuenta; foto y notas opcionales (foto al backlog) |
| Ingesta | Manual + importación de estados de cuenta; sin sincronización bancaria |
| Extracción | Local primero; tercero con anonimización después |
| Primer banco | BBVA crédito |
| Plataforma | PWA (Android, iOS, escritorio) empaquetada con Capacitor para tiendas; stack en las filas siguientes |
| Datos | Locales primero; nube después |
| Respaldo v1 | Export/import manual JSON/CSV |
| Identidad de datos | UUID + owner desde v1 |
| USD | Estado *estimado* (FIX Banxico/DOF) y *confirmado* (al importar); MXN cobrado es la fuente de verdad |
| Coincidencias | Sistema propone manual↔importado; el usuario confirma |
| Categorías | Un nivel + etiquetas; reglas por texto del concepto |
| Categorías (cambios) | IDs estables; renombrar/fusionar no rompe historial |
| Stack | React + Vite + TypeScript, TanStack Router y Query, zod, pnpm; un solo paquete (monorepo con Turborepo cuando haya segunda app o backend) |
| Arquitectura | Hexagonal: `domain`, `application`, `infrastructure`, `ui`; límites impuestos con oxlint (ver `AGENTS.md`) |
| Persistencia local | SQLite nativo con `@capacitor-community/sqlite`; `localStorage` e IndexedDB no son almacén de datos financieros en nativo (el SO puede purgarlos) |
| Calidad | oxlint + oxfmt; Vitest + Testing Library; Playwright (Chromium) |
| Compilación móvil | En la nube (GitHub Actions o Codemagic); sin Android Studio local por limitaciones de hardware |
| Nombre | Kuenty; `appId` `dev.marsk.kuenty` (dominio `marsk.dev`). Descartados Centi (ya existe en iOS), Quincy/Quinci (marcas cercanas en software) y Kuenti (`.app`, `.com` y usuario de GitHub ocupados) |

## Fase 0: verificaciones previas

Antes de escribir la app. Cada una cierra un "(sin verificar)" de la investigación.

- [ ] **F0-1** Obtener 2-3 estados de cuenta reales de BBVA crédito y confirmar: PDF con texto o imagen, contraseña, estructura de movimientos, MSI, fechas sin año.
- [ ] **F0-2** Probar extracción local sobre esos PDFs (pdf.js / pdfplumber / PyMuPDF) y medir qué falla.
- [ ] **F0-3** Confirmar en fuente primaria la serie FIX de la API SIE de Banxico, token y términos de uso.
- [ ] **F0-4** Probar en un iPhone real: ¿persisten los datos de una PWA instalada tras >7 días? ¿qué pasa al borrar el icono?
- [ ] **F0-5** Probar en iOS instalado: descarga/exportación de archivos, compartir, cámara.
- [ ] **F0-6** Definir muestras sintéticas/anonimizadas para tests (nunca datos reales en el repo).
- [ ] **F0-7** Comprar los dominios `kuenty.app`, `kuenty.com`, `kuenty.mx` y `kuenty.com.mx`. Estaban sin registrar el 2026-10-13 (RDAP/whois); confirmar en el registrador que no sean *premium* ni reservados y el precio.

## Fase 1 (v1): solo gastos

### Captura
- [ ] **V1-1** Formulario de una pantalla: monto, categoría, concepto; fecha/hora "ahora"; cuenta = última usada.
- [ ] **V1-2** Campos opcionales ocultos hasta pedirlos (notas, etiquetas, fecha distinta).
- [ ] **V1-3** Categorías recientes/frecuentes primero.
- [ ] **V1-4** Editar y eliminar gasto; deshacer tras guardar.
- [ ] **V1-5** Lista de gastos con filtro por periodo, categoría, cuenta, etiqueta.

### Modelo de datos
- [ ] **V1-6** Cuentas (efectivo, débito, crédito, billetera) con moneda propia.
- [ ] **V1-7** Gasto: UUID, owner, cuenta, monto, moneda, monto en MXN, estado (estimado/confirmado), categoría, etiquetas, origen (manual/importado), fecha.
- [ ] **V1-8** Dinero como enteros en unidad menor; nunca flotantes.
- [ ] **V1-9** Categorías con ID estable y nombre editable; fusionar categorías.
- [ ] **V1-10** Migraciones de esquema versionadas desde el inicio.

### Monedas
- [ ] **V1-11** Gasto en USD con monto original y MXN estimado (FIX del día).
- [ ] **V1-12** Marca visible estimado/confirmado en lista y detalle.
- [ ] **V1-13** Edición manual del tipo de cambio.

### Importación
- [ ] **V1-14** Cargar PDF de BBVA crédito, extraer movimientos 100 % local.
- [ ] **V1-15** Lo importado entra marcado *por revisar*; se revisa en la lista principal: editar, descartar, categorizar en bloque.
- [ ] **V1-16** Reglas de categorización por texto del concepto.
- [ ] **V1-17** Deduplicación idempotente al reimportar el mismo estado.
- [ ] **V1-18** Cuadrar contra saldos/total del estado de cuenta al revisar el lote.
- [ ] **V1-19** Coincidencias manual↔importado con confirmación; al coincidir, el gasto USD pasa a confirmado.
- [ ] **V1-20** Arquitectura de parsers por banco (plugin) para sumar bancos sin tocar el núcleo.
- [ ] **V1-28** Deshacer un lote de importación completo.

### Datos y respaldo
- [ ] **V1-21** Exportar todo a JSON y CSV; importar el JSON.
- [ ] **V1-22** Aviso de último respaldo y recordatorio, dado el riesgo de borrado en iOS.
- [ ] **V1-23** Solicitar almacenamiento persistente (`persist()`) donde exista.

### Calidad
- [ ] **V1-24** Formato es-MX (MXN, fechas), modo oscuro, texto grande.
- [ ] **V1-25** Funciona sin conexión. (Service worker con `vite-plugin-pwa` configurado; falta verificar la recarga offline en un navegador real.)
- [ ] **V1-26** Tests con estados de cuenta sintéticos (golden files).
- [ ] **V1-27** Resumen mensual simple: total y por categoría.
- [ ] **V1-29** Totales y resúmenes excluyen lo *por revisar*; los totales muestran su suma como cifra aparte.

## Fases posteriores

Ordenadas por prioridad tentativa; no se descarta ninguna.

| ID | Ítem | Depende de |
|---|---|---|
| P2-1 | Importar HSBC, Banamex, Mercado Pago (un parser por banco) | V1-20, F0 de cada banco |
| P2-2 | Respaldo automático a carpeta/servicio del usuario | V1-21 |
| P2-3 | Gastos recurrentes y suscripciones (registro automático mensual) | V1-7 |
| P2-4 | Presupuesto mensual por categoría | V1-9 |
| P2-5 | Ingresos | V1-6 |
| P2-6 | Foto de ticket | Almacenamiento y respaldo |
| P2-7 | Tarjetas de crédito: fecha de corte, fecha límite, pago para no generar intereses | V1-6 |
| P2-8 | MSI (meses sin intereses) | P2-7 |
| P2-9 | Tipo de cambio automático desde Banxico | F0-3 |
| P2-10 | Otras monedas | V1-8, V1-11 |
| P3-1 | Extracción con tercero (OCR/LLM) tras anonimización local | `07-anonimizacion.md` |
| P3-2 | Cifrado en reposo y desbloqueo biométrico | V1-7 |
| P3-3 | Subcategorías | V1-9 |
| P3-4 | División de un gasto en varias categorías | V1-7 |
| P3-5 | Captura por notificación, voz o widget | V1-1 |
| P3-6 | Publicación en tiendas con Capacitor (configuración base ya en el repo; faltan `appId` definitivo, `cap add android`, iconos y CI) | F0-4, F0-5 |
| P4-1 | Sincronización multi-dispositivo | UUID, owner, tombstones |
| P4-2 | Multiusuario y nube | P4-1 |
| P4-3 | Gastos compartidos | P4-2 |
| P4-4 | Patrimonio neto e inversiones (CETES, Afore) | P2-5 |
| P4-5 | Aviso de privacidad y cumplimiento LFPDPPP antes de abrir a terceros | P4-2 |
| P4-6 | Sincronización bancaria vía agregador (solo si cambia la restricción de costo) | — |

## Decisiones diferidas

- **Librería PDF** para la importación: se decide con los resultados de F0-2. El resto del stack quedó decidido (ver Decisiones cerradas).
- **Almacenamiento local en la versión web**: SQLite nativo ya decidido para Capacitor; falta decidir qué usa la PWA en navegador (IndexedDB o SQLite en wasm/OPFS) y si comparte datos con la app nativa.
- **Estrategia de sincronización** (CRDT, op-log, last-write-wins): decidir al abordar P4-1.
- **Distribución** (PWA pura vs tiendas): decidir tras F0-4/F0-5. Capacitor ya está configurado como vía a tiendas.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| iOS borra datos locales | V1-21, V1-22, F0-4 |
| PDF de HSBC con fuentes CID/OCR | Empezar por BBVA; validar HSBC en P2-1 |
| Parsers OSS inmaduros | Solo referencia; golden files propios |
| Tipo de cambio estimado distinto del bancario | Marca estimado/confirmado; reconciliar al importar |
| Error silencioso al fusionar importados | V1-19 siempre con confirmación |
| Datos reales en el repositorio | F0-6; muestras sintéticas |
| Abrir a terceros sin cumplimiento legal | P4-5 como puerta previa |
