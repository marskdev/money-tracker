# 09 - Benchmark top 5

Fecha de consulta: 2026-10-14. Alcance: lectura web, sin cuentas ni instalación de las apps. Fuente primaria = sitio oficial, centro de ayuda, listado de tienda, repositorio. Fuente secundaria = reseñas, blogs, agregadores; va marcada **[SEC]**. Lo no confirmado lleva "(sin verificar)". Esto profundiza `01-apps-landscape.md`, `02-communities.md` y `06-ux-captura-categorias.md`; no repite su contenido. IDs de backlog: `08-backlog.md`.

## Índice

- [Método y límites de acceso](#método-y-límites-de-acceso)
- [1. Money Manager (Realbyte)](#1-money-manager-realbyte)
- [2. Cashew](#2-cashew)
- [3. Spendee](#3-spendee)
- [4. Wallet (BudgetBakers)](#4-wallet-budgetbakers)
- [5. YNAB](#5-ynab)
- [6. Cruce entre apps](#6-cruce-entre-apps)
  - [6.1 Matriz de módulos](#61-matriz-de-módulos)
  - [6.2 Captura: pasos comparados](#62-captura-pasos-comparados)
  - [6.3 Módulos contra backlog de Kuenty](#63-módulos-contra-backlog-de-kuenty)
  - [6.4 Problemas recurrentes de usuarios](#64-problemas-recurrentes-de-usuarios)
- [7. Brechas y preguntas abiertas para entrevista](#7-brechas-y-preguntas-abiertas-para-entrevista)
- [Lagunas](#lagunas)

---

## Método y límites de acceso

- Páginas de soporte de Wallet (`support.budgetbakers.com`) respondieron 403 al fetch directo. Se leyeron por la API pública del Help Center (`/api/v2/help_center/...json`), que devuelve el mismo texto de los artículos. Idem `help.realbyteapps.com`. Fechas "actualizado" de cada artículo vienen de ese JSON.
- Soporte de YNAB (`support.ynab.com`): se leyó la variante `.md` de cada artículo (misma URL + `.md`), con fecha "Last updated".
- Cashew: README y FAQ oficiales, política de privacidad, listado de App Store y la API de GitHub (issues). El listado de Google Play de Realbyte y de Cashew no cargó (404 / reset); se usó App Store y ayuda oficial.
- Reddit no consultado (bloqueado desde la investigación inicial; ver `02`). Los dolores de usuarios salen de issues de GitHub (primario para Cashew), metadatos del Help Center, reseñas en listados de tienda (marcadas SEC) y agregadores SEC. La evidencia SEC es delgada y parte viene de blogs de competidores; no sustenta conclusiones fuertes.
- Las cifras de calificaciones y precios son captura del 2026-10-14 y cambian por región.

---

## 1. Money Manager (Realbyte)

Fuentes: App Store https://apps.apple.com/app/id560481810 ; Help Center https://help.realbyteapps.com (artículos citados abajo) ; unitQ [SEC] https://unitq.com/unitq-scorecards/moneymanager. Consulta 2026-10-14.

### (a) Qué resuelve y para quién
Registro manual de ingresos/gastos con vista calendario y contabilidad de doble partida automática, sin conectar bancos ("PC management without linking a bank account" según el listado). Para quien captura a mano y quiere cuentas, tarjetas y presupuesto en una app local. Es la app que Kuenty reemplaza.

### (b) Módulos
| Módulo | Qué hace (fuente) |
|---|---|
| Captura | Botón "+" en pestaña Trans.; obligatorios cuenta, categoría, monto; tienda/receptor y nota opcionales, se autocompleta el receptor si se omite; foto de recibo; botón "continuar" para capturar en serie (help 360042701994). Autocompletar en nota (help 360044208973). Favoritos ("bookmarks") y "payment profiles" (help Home tab; App Store). |
| Widgets | Quick entry, Income/Expense, Balance Payable desde v2.14.0 (App Store). |
| Cuentas | Múltiples; Lite limita a 10 cuentas, completa sin límite (App Store). Transferencias entre cuentas propias con comisión opcional; retiro de efectivo y pago de tarjeta se registran como transferencia (help 360042702534). |
| Tarjeta de crédito | Cuenta de facturación, fecha de corte (settlement) y fecha de pago; separa saldo a pagar y saldo pendiente; pago manual o automático (help 360043392253, 360015963594). |
| Categorías | Principal + subcategoría, la subcategoría se activa en Configuración (help 360015963374). Reseña SEC: 12 categorías de gasto y 5 de ingreso por defecto (listado espejo; sin verificar en oficial). |
| Etiquetas | Añadidas en v2.15 / 4.13 (octubre 2026): etiqueta al registrar y búsqueda por etiqueta (App Store; help 63012157101721). |
| Presupuesto | Semanal/mensual/anual por categoría; el monto por defecto aplica a todos los meses y se puede sobrescribir un mes (help 360042842974); día de inicio de mes configurable (App Store). |
| Recurrentes | "Repeat" desde el campo fecha; la entrada aparece solo en su fecha (opción: el día 1 del mes); también "installment" (cuotas) (help 360046668993). Pagos entre cuentas con frecuencia (App Store). |
| Reportes | Calendario, semanal, mensual, resumen; gráficas y estadísticas (help Home tab). |
| Multimoneda | Moneda principal + subdivisas; tipo de cambio manual por usuario, no refleja fluctuación diaria; desde nov-2023 se edita tasa y monto convertido por movimiento; cambiar la tasa después no altera movimientos ya hechos (help 360042988234, 24471469942681). Moneda personalizada. |
| Import/export | Export a Excel; importación masiva por TSV/Excel exigiendo que nombres de cuenta y categoría coincidan con la app (help 360043223253). Excel no es respaldo completo. |
| Respaldo | Auto-respaldo en el dispositivo (7 días, se borra al reinicializar el equipo), Google Drive/iCloud (hasta 10 archivos), correo (help 360042748054, 360045131173, 360042747934). |
| Sync | App Store vende "Data Sync Service" a $2.49/mes o $19.99/año. Un artículo del Help Center dice que no hay sincronización entre dispositivos (help 26011567061657). **Contradicción sin resolver** entre ambas fuentes oficiales. |
| Seguridad | Passcode de 4 dígitos con biometría y tiempo de bloqueo configurable (help 360046343634). |
| Otros | PC Manager (editar por Wi-Fi desde navegador), banderas, búsqueda y filtro. |
| Precio | Gratis con publicidad; "Remove Ads" de pago (precio sin verificar); suscripción de sync. Etiqueta de privacidad: "Usage Data" usado para tracking y datos de dispositivo para publicidad de terceros; la ficha dice a la vez "no Ads" y "Contains Advertising" (App Store). |

### (c) Captura, paso a paso (derivado de help 360042701994)
1. Pestaña Trans. > "+" (1 toque). 2. Elegir "Expense" (2). 3. Teclear monto. 4. Elegir cuenta (3) y categoría (4); fecha viene editable. 5. Opcional: nota, foto. 6. "Save" o "Continue" (5). Fecha por defecto = hoy (sin verificar en la ayuda).

### (d) Fortalezas
- Cobertura funcional amplia y madura; 4.8 de 5 con 19K calificaciones en App Store.
- Ciclo de tarjeta (corte/pago) y transferencias bien modelados.
- Favoritos, autocompletar y "continuar" aceleran captura repetida.
- Edición de tasa y monto convertido por movimiento (desde 2023).

### (e) Dolores conocidos
| Dolor | Fuente |
|---|---|
| Sync entre dispositivos ambiguo y de pago | Help 26011567061657 vs App Store (oficial) |
| Respaldos automáticos solo en dispositivo se pierden al reinicializar | Help 360042748054 (oficial) |
| Tipo de cambio manual; cambiar tasa no recalcula histórico | Help 360042988234 (oficial) |
| Restaurar desde xls/tsv "complicado y menos estable" | Help 360042747934 (oficial) |
| Recurrentes no se ven por adelantado por defecto | Help 360046668993 (oficial) |
| Etiquetas llegaron apenas en oct-2026 | App Store / help (oficial) |
| Diseño "rather plain-looking", configuración "not as simplistic", pide mejor sync | Reseñas en App Store [SEC] |
| Publicidad y rastreo en etiquetas de privacidad inconsistentes | App Store (oficial, declarado por el desarrollador) |
| unitQ: 52 % iOS / 48 % Android de feedback sin problemas, quejas de vista de año fiscal y notificaciones bancarias (poco claro) | unitQ [SEC] |

### (f) Lecciones para Kuenty
- Migración de historial: MM exporta a Excel y su formato de importación exige nombres exactos. No hay ID de backlog para un importador desde MM (ver [brechas](#7-brechas-y-preguntas-abiertas-para-entrevista)).
- "Continuar" tras guardar sirve para ráfagas (volver de un viaje con 10 tickets): no está en V1-1.
- Ciclo de tarjeta como cuenta con fecha de corte/pago: confirma P2-7 y sugiere que el periodo de reporte de una TDC siga su corte (pregunta abierta).
- Auto-respaldo solo local es falso consuelo: V1-22 acierta en recordar y medir "último respaldo externo".
- Cambiar tasa sin recalcular histórico es decisión de MM; Kuenty tiene estimado/confirmado (V1-12), mejor modelo.

---

## 2. Cashew

Fuentes: README https://github.com/jameskokoska/Cashew ; FAQ https://cashewapp.web.app/faq.html ; privacidad https://cashewapp.web.app/policy.html ; App Store https://apps.apple.com/app/id6463662930 ; issues vía API de GitHub (`repos/jameskokoska/Cashew`). Consulta 2026-10-14.

### (a) Qué resuelve y para quién
Rastreador y presupuesto gratuito, de código abierto (GPL-3.0), con datos locales y sync por tu propio Google Drive, sin servidor del autor. Para usuario técnico o consciente de privacidad que quiere funciones completas sin suscripción obligatoria. Mantenedor único (README: no acepta pull requests).

### (b) Módulos
| Módulo | Qué hace (fuente) |
|---|---|
| Captura | "+" > responde prompts de título, categoría, monto > crear (FAQ). |
| Automatización | App Links (URL para crear transacción prellenada), Siri Shortcuts (Apple Pay), escaneo de notificaciones/SMS (Android e iOS), broadcast receiver (Android), "Mailbox" = import/export a Google Sheet, "Intelligence" = captura con IA (Gemini o Apple Intelligence) (FAQ). |
| Cuentas | Múltiples; una moneda por cuenta; totales y reportes convierten a la moneda de la cuenta principal (FAQ). |
| Categorías | Subcategorías desde "Edit Category"; íconos buscables; "custom titles" que asignan categoría a transacciones con el mismo nombre (README). Etiquetas: README menciona filtros por "custom tags"; FAQ no las cubre (sin verificar alcance). |
| Presupuesto | Periodos flexibles y rangos personalizados; "Added Only" (viajes) vs "All Transactions" (mensual) con filtros por categoría; historial (README, FAQ). |
| Recurrentes | "Repetitive", "Subscription" y "Upcoming"; la siguiente ocurrencia se crea solo al marcar la actual Pagada u Omitida; vencidas se pagan solas por defecto, configurable (FAQ). Upcoming no cuenta en totales hasta marcarse Pagado. |
| Deudas | Tipos prestado/prestatario; préstamos de largo plazo modelados como metas (README). |
| Multimoneda | Tasas diarias de la API `fawazahmed0` o personalizadas por cuenta; muestra original y convertido (FAQ, README). |
| Import/export | CSV y Google Sheet con plantillas y mapeo de columnas; importación no se puede deshacer; export de archivo propio de Cashew (CSV no es respaldo) (FAQ). |
| Respaldo/sync | Respaldo local y en Drive (últimos 20, automático al iniciar sesión); sync entre dispositivos por el Drive del mismo usuario, cada dispositivo debe subir antes de que otro baje (FAQ). Restaurar sobrescribe todo. |
| Compartir | Solo compartiendo una cuenta Google (FAQ). |
| Seguridad/privacidad | Bloqueo biométrico (README); sin analíticas ni rastreadores, sin servidor (política); App Store: "no data collected". |
| Plataformas | iOS, Android, web (PWA, sin Pro en web) (FAQ). |
| Precio | Gratis; Pro $1.49/mes, $11.99/año, $19.99 de por vida (App Store). Qué desbloquea Pro: sin verificar (la FAQ no lo lista). |

### (c) Captura, paso a paso (FAQ)
"+" en la pantalla principal (1) > prompts: título, categoría (2), monto > tocar fuera para detalles manuales > crear (3-4). Fecha por defecto: hoy (sin verificar). Para moneda extranjera hay que elegir otra cuenta como moneda de origen (issue #527).

### (d) Fortalezas
- Gratis, local, sin rastreadores; 4.9 de 5 con 527 calificaciones (App Store).
- Mayor superficie de automatización de las cinco (deep links, SMS/notificaciones, IA opcional).
- Presupuestos "solo añadidas" para viajes y periodos libres.
- Tasas diarias automáticas sin costo.

### (e) Dolores conocidos
| Dolor | Fuente |
|---|---|
| Solo Google Drive como nube; sin alternativa (Nextcloud, etc.) | Issue #84, cerrado: "no plans" (oficial) |
| Respaldo de Drive sin cifrar; se pide contraseña | Issue #133, cerrado como duplicado de #20 (oficial) |
| Capturar un gasto en divisa extranjera obliga a crear una cuenta temporal o a convertir a mano | Issue #527 y respuesta del mantenedor (oficial) |
| Filtros y orden con monedas no primarias fallan | Issues #633, #758 (abiertos al 2026-10-14) |
| Crash por memoria con acceso a notificaciones activado | Issue #1234, abierto 2026-09-04 |
| Compartir presupuesto con familia solo vía cuenta Google | Issue #61 + FAQ |
| Importaciones irreversibles | FAQ |
| Mantenedor único, sin PRs; último push al repo 2026-03-09; releases en GitHub quedaron en 5.3.4 (2024-07) mientras App Store va en 5.9 | README + API GitHub (oficial) |

### (f) Lecciones para Kuenty
- Auto-asignar categoría por nombre repetido ("custom titles") es la base de V1-16; Cashew lo hace en captura, Kuenty además en importados.
- Captura en moneda extranjera es la fricción central de Cashew (#527): V1-11 (monto original + MXN estimado en el mismo formulario) la elimina por diseño.
- Backup en Drive sin cifrar fue pedido de usuarios: decidir si el JSON de V1-21 ofrece cifrado con contraseña (hoy P3-2 habla de cifrado en reposo, no de respaldo).
- Mantenedor único y sin PRs es riesgo de continuidad: refuerza export abierto V1-21.
- Corrige `01`: el README declara Firebase para hosting/despliegue de la web, y la FAQ/política declaran que el sync va por Google Drive del usuario; `01` decía "Firebase para auth/backup/sync".
- Escaneo de notificaciones/SMS existe y ya tiene un bug de memoria abierto: P3-5 debe tratarse como riesgo de estabilidad.

---

## 3. Spendee

Fuentes: https://www.spendee.com/ ; https://www.spendee.com/pricing y /premium ; https://www.spendee.com/bank-connect ; Help Center https://help.spendee.com (artículos 121, 137, 224, 229, 231) ; App Store https://apps.apple.com/us/app/expense-budget-app-spendee/id635861140 ; reseñas G2/Capterra [SEC]. Consulta 2026-10-14.

### (a) Qué resuelve y para quién
Seguimiento de gasto por "wallets" con presupuestos y sincronización bancaria, con énfasis en parejas, familias y viajeros (multimoneda, wallets compartidas). Empresa de Praga (SPENDEE a.s.). Para quien quiere interfaz cuidada y compartir un wallet sin fricción.

### (b) Módulos
| Módulo | Qué hace (fuente) |
|---|---|
| Wallets | Efectivo, cuenta bancaria, e-wallets, cripto, con saldo por wallet (sitio). Moneda del wallet bloqueada una vez que tiene transacciones (help 231). |
| Categorías | Personalizadas con nombre, color e ícono (help 227, 212); foto o ubicación por gasto (sitio). Etiquetas ("labels") (App Store). |
| Presupuestos | Límite por categoría, gasto diario permitido, metas de ahorro (sitio). 1 presupuesto en plan Basic, ilimitados en Plus/Premium. Web: "coming soon" (pricing). |
| Recurrentes | "Scheduled/Recurring"; solo para wallets manuales (efectivo) (help 229, artículo antiguo). v6.0.10: gráficas y widgets muestran gastos programados del periodo (App Store). |
| Multimoneda | Moneda principal de cuenta + moneda por wallet; tipo de cambio preferido por transacción; no se documenta fuente automática (help 231). |
| Import | Solo desde la web: xls/xlsx/CSV, máx. 10 MB, solo wallets de efectivo, no detecta duplicados ni transferencias (help 121). |
| Export | Solo desde la app móvil, CSV/XLS; plan Free limita a los últimos 365 días (help 137). |
| Compartir | Wallets compartidas solo de efectivo; el dueño controla categorías, los invitados editan cualquier transacción; presupuestos no se comparten; solo el dueño paga Plus (help 224). |
| Sync bancario | "2,500+ proveedores"; selector de país incluye México; bancos mexicanos concretos sin verificar (bank-connect). Sync diario para algunos proveedores (help, antiguo). |
| IA | Escáner de recibos con IA (App Store, marcado NEW). |
| Seguridad | "Encrypted data sync" (App Store); sitio no declara medidas de seguridad en la página principal. |
| Precio | Basic gratis; Plus $1.99/mes o $14.99/año; Premium $5.99/mes o $35.99/año; prueba 7 días (pricing). App Store: Lifetime $119.99 en una sección y $44.99 en otra. |

### (c) Captura, paso a paso
Sin verificar: no se encontró artículo oficial de "agregar transacción"; la ayuda cubre importación, export y transferencias (Transfer se elige en la pantalla de alta, help 234).

### (d) Fortalezas
- 4.6 de 5 con 6.3K calificaciones (App Store).
- Compartir wallet con invitados en plan gratuito.
- Gráficas con gasto futuro programado diferenciado (hachurado).
- Tipo de cambio por transacción (preferido del usuario).

### (e) Dolores conocidos
| Dolor | Fuente |
|---|---|
| Plan gratis: 1 wallet de efectivo y 1 presupuesto | pricing (oficial) |
| Export limitado a 365 días en Free y solo en móvil | help 137 (oficial) |
| Import sin detección de duplicados; solo wallets de efectivo | help 121 (oficial) |
| Recurrentes solo en wallets manuales | help 229 (oficial) |
| Moneda del wallet no cambia con transacciones | help 231 (oficial) |
| Discrepancia: pricing lista sync bancario en Free; ayuda y App Store lo ponen como Premium | pricing vs help 144 / App Store (oficial) |
| Sync bancario falla o va una vez al día; categorización no siempre confiable | G2 y Capterra [SEC] |
| Crashes, carga lenta, bug de gráfica, glitch de moneda | Reseñas en App Store [SEC] |

### (f) Lecciones para Kuenty
- El paywall sobre datos propios (export limitado) es el patrón a evitar: V1-21 sin límite.
- Un importador que no deduplica es peor que no tener importador: V1-17 es requisito, no mejora.
- Bloquear la moneda de la cuenta tras el primer movimiento es una regla razonable que Kuenty aún no declara (V1-6).
- Mostrar gasto programado futuro con otro estilo visual es patrón útil cuando llegue P2-3.
- Presupuestos no compartidos aunque el wallet sí: separa "datos compartidos" de "plan personal" (relevante para P4-3).

---

## 4. Wallet (BudgetBakers)

Fuentes: https://budgetbakers.com/ ; features https://budgetbakers.com/en/products/wallet/features/ ; seguridad https://budgetbakers.com/en/security/ ; imports https://budgetbakers.com/imports-web-app/ ; Help Center https://support.budgetbakers.com/hc/en-us/articles/ (IDs abajo) ; App Store https://apps.apple.com/app/id1032467659. Consulta 2026-10-14.

### (a) Qué resuelve y para quién
Gestor de finanzas personales y familiares con sincronización bancaria (licencia PSD2, República Checa) y reportes/presupuestos; funciona con captura manual donde no hay bancos. Para quien quiere importación automática y análisis; público principal UE.

### (b) Módulos
| Módulo | Qué hace (fuente) |
|---|---|
| Captura | Tipo (Income/Expense/Transfer), monto, cuenta, categoría obligatorios; nota, etiquetas, receptor, fecha, tipo de pago, garantía, estado, ubicación, recibos opcionales (help 7149271363090). |
| Plantillas | Plantilla con cuenta, categoría, monto, moneda, receptor, etiquetas; solo cuentas manuales (help 7077050225042). |
| Split / clonar | Split solo en Android; iOS y web "not yet available"; clonar y resolver duplicados con artículos propios (help 7149271363090). |
| Categorías | Principales fijas: se renombran y ocultan, no se crean nuevas; sí sub-subcategorías; "naturaleza" must/need/want; justificación: el aprendizaje automático requiere datos estructurados (help 7077082048146). |
| Etiquetas | Hasta 5 por registro (help). |
| Reglas | Palabras clave sobre nota/receptor; acciones: categoría y etiquetas; solo aplican a registros sincronizados del banco, no a los manuales (help 7149319175826). |
| Presupuestos | Por categoría (recomendado), cuentas o etiquetas; periodo y límite; incluye gasto previsto con pagos planeados y promedio histórico; no existen en web (help 7076953735314). |
| Pagos planeados | Manual o automático; no disponibles en web; transferencias planeadas solo Android; no se empareja un pago planeado con un registro bancario (help 7149523920786, 7184048333842). |
| Multimoneda | Una cuenta por moneda (una cuenta no admite varias); tasas automáticas cada noche, desactivables; tasas propias (help 7149418777746). |
| Import | Web: CSV, XLS/XLSX, OFX; monto con signo a la izquierda; sin separador de miles; una sola moneda por archivo; importación gratuita; envío de archivos por correo a una dirección propia con reglas guardadas (help 7077275632274; imports-web-app). PDF no figura. |
| Export | Función Premium; PDF/XLS/CSV en Android, CSV/XLS en web (help 7151606064018). |
| Compartir | "Group Sharing" Premium; el dueño paga, miembros no (help 7149394922002). |
| Automatización | Apple Pay vía Shortcuts; Google Pay Sync con México en la lista de países (help 26593713953554, 27454807191058); API REST e integración MCP (sitio). |
| Sync bancario | Premium; "15K+" conexiones en el sitio vs "about 4,000 banks" en App Store; cobertura en México sin verificar (help 7076796545554). |
| Seguridad | ISO 27001, licencia PSD2, AWS (security). Ocultar montos solo en Android y se restablece al reiniciar (help 7184052562578). Etiqueta de privacidad: correo e identificadores vinculados al usuario con fines de marketing y analítica (App Store). |
| Precio | Gratis; Premium mensual, anual o de por vida; App Store lista $5.99, $14.99, $29.99, Lifetime $49.99, 3 años $49.99 sin indicar periodos; prueba gratuita (help 7151349344018). |

### (c) Captura, paso a paso
Android: ≡ > Records > "+" azul > New Record > tipo > monto > cuenta > categoría > guardar arriba a la derecha (help); desde la home hay "+" con acceso a plantillas. iOS: "+" > mismos campos > deslizar hacia abajo el teclado numérico para ver "guardar". Cuenta de banco conectada: no se puede agregar, editar ni borrar registros sin desconectarla antes (help).

### (d) Fortalezas
- Reglas, plantillas y presupuestos con proyección ("Predicted expenses" = gastado + pagos planeados + promedio histórico).
- Importación web gratuita con reglas guardadas y entrada por correo.
- Tasas automáticas nocturnas con control manual.
- Certificaciones declaradas; 4.6 con 5.9K calificaciones (App Store).

### (e) Dolores conocidos
| Dolor | Fuente |
|---|---|
| Paridad desigual entre Android, iOS y web (split, pagos planeados, presupuestos, ocultar montos) | Help Center, textos "Not yet available" (oficial) |
| No se pueden crear categorías principales | Help 7077082048146 (oficial) |
| Reglas no afectan registros manuales | Help 7149319175826 (oficial) |
| Registros de cuentas bancarias bloqueados para edición | Help 7149271363090 (oficial) |
| Export de datos propios es Premium | Help 7151606064018 (oficial) |
| Artículo de transacciones: 85 votos positivos y 112 negativos de 197 | Metadatos del Help Center (oficial, lectura cautelosa: mide utilidad del artículo, no del producto) |
| No se puede borrar la única cuenta de efectivo ni cuentas con pagos planeados/presupuestos asociados | Help 7151291934866 (oficial) |
| Fallas de sync bancario y de sync iOS-web, soporte sin solución en meses | Reseñas App Store, Trustpilot [SEC] (2024-2025) |

### (f) Lecciones para Kuenty
- Reglas "solo para sincronizados" dejan al usuario manual sin automatización: V1-16 debe aplicar a manuales e importados.
- Prohibir categorías propias por "datos estructurados" es costo de producto con IA; Kuenty usa reglas explícitas y puede permitir categorías libres (V1-9).
- Importar por correo con reglas guardadas es un patrón de cero esfuerzo para estados de cuenta mensuales; solo cabe si hay backend (diferido; P4).
- "No emparejar pago planeado con registro del banco" es la brecha que V1-19 cierra para recurrentes (P2-3 + V1-19).
- Archivar cuenta distinto de "excluir de estadísticas" (help 36544201479186) son dos conceptos con casos de uso reales: Kuenty no los lista.
- Google Pay Sync ofrece captura casi automática en México sin bancos: referencia para P3-5.

---

## 5. YNAB

Fuentes: https://www.ynab.com/pricing ; https://www.ynab.com/security ; soporte https://support.ynab.com/en_us/ (artículos citados) ; App Store https://apps.apple.com/app/ynab-you-need-a-budget/id1010865877. Consulta 2026-10-14.

### (a) Qué resuelve y para quién
Método de presupuesto base cero: asignar cada peso disponible a una categoría antes de gastarlo. Para quien quiere cambiar comportamiento y salir del "paycheck to paycheck"; fuerte sesgo a EE.UU./Canadá/UK/UE. Nota de método: el artículo de soporte vigente (actualizado 2026-09-03) enmarca la decisión como "what's it for?" con cinco respuestas (now, later, ease, you, change); las "cuatro reglas" siguen en blog de YNAB, con redacción cambiante entre fuentes.

### (b) Módulos
| Módulo | Qué hace (fuente) |
|---|---|
| Captura | Tipos Spending, Inflow, Credit Card Payment, Transfer; payee, categoría, cuenta, bandera, cleared, repetición (support: how-to-add-transactions). |
| Atajos | Botón en pestañas, pulsación larga en categoría, widgets, Shortcuts iOS con monto/payee/categoría/cuenta prellenados, pantalla de bloqueo, Siri/Spotlight, icono de la app (mismo artículo). |
| Categorías y split | Grupos y categorías; categoría por defecto del payee = la más reciente; split con remanente autodistribuido (`06`). |
| Programadas | 12 frecuencias (diaria, semanal, quincenal, cada 4 semanas, mensual... anual); el día 31 cae en el último día de meses cortos solo si se crea en mes de 31 días; aparecen como "Scheduled" sin afectar el plan hasta su fecha (support: scheduled-transactions). |
| Import bancario | Direct Import para "select US, Canadian, UK, and EU Banks" vía Plaid y MX; lectura solamente (pricing, security). |
| Import por archivo | CSV (recomendado), QFX/OFX, QIF; solo en web o iPad, no en iPhone ni Android; no importa categorías; no recomienda más de 1 año atrás; omite movimientos con misma fecha y monto; limpieza de payees y autocategorización desde 2026-09-14 (support: file-based-import). |
| Emparejado | Movimiento manual y movimiento importado se emparejan solos si las fechas están a ≤10 días y el monto es idéntico; se conserva el monto del banco y fecha, payee y categoría del usuario; modo tarjetas con swipe en iOS para aprobar (support: approving-and-matching). |
| Conciliación | "Reconcile" recomendado al menos semanal (support: adding-transactions-without-direct-import). |
| Multimoneda | Una moneda por plan; recomienda un plan por moneda y una categoría "Currency Transfer" (support: using-multiple-currencies). |
| Export | CSV/TSV de plan y transacciones, solo web, solo salida: no se puede reimportar un plan exportado (support: how-to-export-plan-data; file-based-import FAQ). |
| Seguridad | Cifrado en tránsito y reposo, credenciales bancarias no almacenadas, infraestructura Heroku/AWS; la página no menciona 2FA (security). |
| Compartir | Hasta seis personas en una suscripción (pricing). |
| Precio | $109/año ($9.08/mes) o $14.99/mes; prueba de 34 días sin tarjeta (web) vs 30 días (App Store); estudiantes 365 días (pricing, App Store). |
| Reportes | Sin verificar en esta consulta (no se leyó el artículo). |

### (c) Captura, paso a paso (support: how-to-add-transactions)
iOS/Android: "+" abajo en Home, Plan, Spending o cuenta (1) > teclear monto y "Done" (2) > menú de tipo: Spending, Inflow, Credit Card Payment, Transfer (3) > payee, categoría, cuenta (4-5) > confirmar fecha > Save (6). Rutas cortas: pulsación larga sobre categoría en Plan, widget, atajo iOS prellenado.

### (d) Fortalezas
- Lógica de emparejado manual-importado documentada con reglas claras (10 días, mismo monto, conserva monto del banco).
- Programadas con aviso previo, auto-emparejado al importar y estado "no cleared".
- Marco de decisión de método (prioriza categorías cuando falta dinero).
- 4.8 de 5 con 62K calificaciones (App Store).

### (e) Dolores conocidos
| Dolor | Fuente |
|---|---|
| Sin multimoneda en un plan | Support using-multiple-currencies (oficial) |
| Import por archivo no existe en teléfono | Support file-based-import (oficial) |
| Movimiento importado y luego borrado no puede reimportarse en esa cuenta | Support file-based-import (oficial) |
| Emparejado falla con montos que varían (servicios, suscripciones variables) | Support approving-and-matching (oficial) |
| Exportar es "one-way street" | Support file-based-import FAQ (oficial) |
| Categorías no vienen en import por archivo | Support file-based-import FAQ (oficial) |
| Precio alto y curva de aprendizaje; sync bancario inestable | Trustpilot y blogs de competidores [SEC] |
| Sync bancario sin México | Pricing (oficial: solo US, CA, UK, EU) |

### (f) Lecciones para Kuenty
- Reglas de emparejado de YNAB (±10 días, monto exacto) fallan justo en el caso USD de Kuenty, donde el MXN estimado difiere del cobrado: V1-19 necesita tolerancia de monto propia.
- Conservar el monto del banco como autoritativo y lo demás del usuario coincide con la decisión "MXN cobrado es la verdad".
- El borrado de importados que impide reimportar es una trampa de idempotencia: definir si Kuenty recuerda descartes (pregunta abierta).
- Tarjetas con swipe para aprobar es un diseño concreto para la bandeja V1-15.
- Programadas sin efecto en el plan hasta su fecha, con estado "pendiente de confirmar", encaja con P2-3 y con estimado/confirmado.
- Un plan por moneda es la salida de YNAB; no es opción para Kuenty (MXN + USD en el mismo reporte).

---

## 6. Cruce entre apps

### 6.1 Matriz de módulos

Leyenda: ✓ documentado; parcial = con restricción documentada; ✗ no existe o no documentado en fuente consultada; sv = sin verificar. MM = Money Manager.

| Módulo | MM | Cashew | Spendee | Wallet | YNAB |
|---|---|---|---|---|---|
| Atajos / widgets / deep links | ✓ | ✓ | parcial (widgets) | ✓ | ✓ |
| Plantillas / favoritos | ✓ | parcial (títulos) | sv | ✓ | parcial |
| Cuentas múltiples por tipo | ✓ | ✓ | ✓ | ✓ | ✓ |
| Transferencias entre cuentas propias | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tarjeta de crédito con corte/pago | ✓ | sv | sv | sv | parcial |
| Subcategorías | ✓ | ✓ | sv | ✓ | ✓ (grupos) |
| Categorías propias libres | ✓ | ✓ | ✓ | parcial | ✓ |
| Etiquetas | ✓ (oct-2026) | parcial | ✓ | ✓ | parcial (banderas) |
| Reglas de categorización | sv | parcial | parcial | parcial (solo sincronizados) | parcial |
| Split de una compra | sv | sv | sv | parcial (Android) | ✓ |
| Presupuestos | ✓ | ✓ | ✓ | ✓ | ✓ |
| Recurrentes / programadas | ✓ | ✓ | parcial (solo efectivo) | ✓ (sin web) | ✓ |
| Reportes y gráficas | ✓ | ✓ | ✓ | ✓ | sv |
| Multimoneda | ✓ | parcial (1 por cuenta) | ✓ | ✓ (1 por cuenta) | ✗ (1 por plan) |
| Tipo de cambio automático | ✗ | ✓ | sv | ✓ | ✗ |
| Original + convertido por movimiento | ✓ | parcial | ✓ | sv | ✗ |
| Estado estimado / confirmado de conversión | ✗ | ✗ | ✗ | ✗ | ✗ |
| Import CSV/Excel | ✓ | ✓ | parcial (web, efectivo) | ✓ | parcial (web/iPad) |
| Import PDF de estado de cuenta | ✗ | ✗ | ✗ | ✗ | ✗ |
| Deduplicación al importar | sv | sv | ✗ | sv (hay artículo "Solve Duplicates") | ✓ |
| Revisión/aprobación previa de importados | sv | sv | sv | sv | ✓ |
| Emparejado manual-importado | ✗ | ✗ | ✗ | ✗ (explícito: no empareja planeados) | ✓ |
| Export de datos | ✓ | ✓ | parcial (365 días Free, solo móvil) | parcial (Premium) | parcial (web, solo salida) |
| Respaldo en nube del usuario | ✓ | ✓ | ✗ (su servidor) | ✗ (su servidor) | ✗ (su servidor) |
| Sync multi-dispositivo | parcial (contradictorio) | ✓ (vía Drive) | ✓ | ✓ | ✓ |
| Datos locales por defecto | ✓ | ✓ | ✗ | ✗ | ✗ |
| Compartir | sv | parcial (cuenta Google) | ✓ | ✓ (Premium) | ✓ (6 personas) |
| Bloqueo / privacidad | ✓ | ✓ | sv | parcial (ocultar monto, Android) | sv |
| Foto de recibo | ✓ | sv | ✓ (+ IA) | ✓ | ✓ |
| Captura por notificación / SMS / pagos móviles | sv | ✓ | sv | parcial (Apple Pay, Google Pay) | parcial (atajos) |
| Sync bancario | ✗ | ✗ | ✓ (Premium; México sv) | ✓ (Premium; México sv) | ✓ (no México) |
| API pública | sv | ✗ (App Links) | sv | ✓ | ✓ |
| Sin publicidad ni rastreo declarado | ✗ | ✓ | ✗ | ✗ | ✗ |

Hallazgo transversal: ninguna de las cinco ofrece importación de PDF de estado de cuenta ni estado estimado/confirmado de conversión. Son los dos diferenciadores reales de Kuenty frente a estas apps.

### 6.2 Captura: pasos comparados

Conteo derivado de las fuentes citadas arriba; supone valores por defecto razonables y no cuenta teclear texto.

| App | Secuencia mínima | Obligatorios | Rutas más cortas documentadas |
|---|---|---|---|
| Money Manager | "+" > Expense > monto > cuenta > categoría > Save (≈5 toques) | cuenta, categoría, monto | Favoritos, widget Quick entry, "Continue" |
| Cashew | "+" > título > categoría > monto > crear (≈4) | categoría, monto (título sin verificar) | App Links, SMS/notificación, Siri, IA |
| Spendee | sv | sv | widgets (App Store 6.0.7) |
| Wallet | "+" > New Record > tipo > monto > cuenta > categoría > guardar (≈6) | tipo, monto, cuenta, categoría | Plantilla (≈3-4), Apple Pay, Google Pay |
| YNAB | "+" > monto > Done > tipo > payee/categoría/cuenta > Save (≈5-6) | monto (categoría exigida antes de aprobar) | Pulsación larga en categoría, widget, atajo prellenado |
| Kuenty (V1-1) | monto > categoría > guardar (3 con defaults) | monto; categoría con default | pendiente: P3-5 |

### 6.3 Módulos contra backlog de Kuenty

Estado: V1 = cubierto en v1; Pn = diferido a esa fase; **brecha** = sin ID en `08-backlog.md` (candidato).

| Módulo | Backlog | Nota |
|---|---|---|
| Captura rápida de una pantalla | V1-1, V1-2, V1-3 | Cubierto. |
| Guardar y capturar otro ("continuar") | **brecha** | MM lo tiene; menor. |
| Favoritos / plantillas | **brecha** parcial (V1-3 = recientes) | MM bookmarks, Wallet templates. P3-5 es atajos, no plantillas. |
| Editar, borrar, deshacer | V1-4 | Cubierto. |
| Filtros | V1-5 | Búsqueda de texto no es explícita: **brecha** menor. |
| Cuentas con moneda propia | V1-6 | Falta decidir bloqueo de moneda tras primer movimiento. |
| Archivar cuenta/categoría | **brecha** (V1-9 cubre fusión) | Wallet impone reglas de borrado; Spendee bloquea moneda. |
| Excluir de estadísticas | **brecha** | Wallet: "Exclude from statistics" vs "Archive". |
| Transferencias y pagos de TDC | **brecha** en backlog (en `04` línea "Transferencias propias: detectar para no contarlas") | Las cinco apps modelan transferencia; el estado de cuenta BBVA trae abonos y pagos. |
| Reembolsos/devoluciones | **brecha** | Cashew pidió enlazar reembolso a gasto (issue #545). |
| Tarjeta: corte, límite, pago | P2-7 | MM la tiene completa. |
| MSI / cuotas | P2-8 | MM tiene "installment". |
| Categorías 1 nivel + etiquetas | V1-2, V1-9; P3-3 subcategorías | Cubierto; MM añadió etiquetas hasta oct-2026. |
| Reglas por texto | V1-16 | Cubierto; ver pregunta de alcance (manuales vs importados). |
| Split | P3-4 | YNAB ✓, Wallet parcial. |
| Presupuesto | P2-4 | Periodo/ciclo no definido (día de inicio, quincena). |
| Recurrentes | P2-3 | Decidir confirmación vs automático (Wallet, Cashew, YNAB difieren). |
| Reporte mensual | V1-27 | Faltan calendario y comparativo vs periodo anterior: **brecha** menor. |
| Multimoneda USD | V1-11, V1-12, V1-13 | Cubierto; P2-9 FX automático; P2-10 otras monedas. |
| Import PDF y revisión | V1-14, V1-15, V1-20 | Cubierto. |
| Dedupe e idempotencia | V1-17 | Cubierto; falta regla sobre descartes. |
| Cuadre contra saldo | V1-18 | Cubierto (YNAB lo hace con Reconcile manual). |
| Emparejado manual-importado | V1-19 | Cubierto; tolerancia de monto por definir. |
| Rollback de un lote importado | **brecha** (en `04` "Rollback por importación") | Cashew: import irreversible. |
| Texto original del banco + nombre limpio | **brecha** (en `02` pedido; `04` normalizar prefijos) | YNAB limpia payees y guarda el original. |
| Importar historial desde Money Manager | **brecha** | Reemplazo declarado; sin ID. |
| Export JSON/CSV | V1-21 | Cubierto; sin cifrado. |
| Respaldo cifrado | **brecha** (P3-2 es cifrado en reposo) | Cashew issue #133. |
| Aviso de respaldo, persist() | V1-22, V1-23 | Cubierto. |
| Respaldo automático a nube del usuario | P2-2 | MM y Cashew ya lo ofrecen. |
| Foto de ticket | P2-6 | Cubierto. |
| Captura por notificación/voz/widget | P3-5 | Cashew ya lo hace. |
| Bloqueo / ocultar montos | P3-2 (biométrico) | "Ocultar montos" no figura: **brecha** menor. |
| Sync multi-dispositivo | P4-1 | MM lo cobra. |
| Compartir | P4-3 | Spendee: presupuestos no compartidos. |
| Ingresos | P2-5 | YNAB exige "Inflow"; ver nota abajo. |
| Sync bancario | P4-6 | Fuera de v1 por decisión. |
| Telemetría / publicidad | sin ID | Decisión "cero servicios de pago" no define analítica. |

Nota: V1 solo expone gastos (P2-5 ingresos). Los abonos a TDC y reembolsos del estado de cuenta existen aunque la UI no tenga ingresos; no hay ID que diga qué se hace con ellos.

### 6.4 Problemas recurrentes de usuarios

Base: fuentes oficiales por app (secciones 1 a 5) más SEC donde se indica. Frecuencia = número de apps de las cinco donde aparece.

| # | Problema | Apps | Qué hace Kuenty |
|---|---|---|---|
| 1 | Sync bancario frágil o ausente en la región | Spendee, Wallet, YNAB (SEC); sin México en YNAB | Atendido por diseño: sin sync bancario (decisión cerrada); el riesgo se mueve al parser PDF (F0-1, F0-2). |
| 2 | Datos propios tras paywall o límite (export, sync, funciones) | MM, Spendee, Wallet, Cashew (Pro), YNAB | Atendido: cero costo y V1-21 sin límite. |
| 3 | Multimoneda débil o con rodeos | YNAB (plan por moneda), Cashew (cuenta temporal), MM (tasa manual), Spendee (manual) | Atendido: V1-11 a V1-13 más estimado/confirmado. Falta decidir fuente de FX (P2-9). |
| 4 | Importar sin deduplicar, sin deshacer o sin recuerdo de descartes | Spendee, Cashew, YNAB | Parcial: V1-17 y V1-19 cubren; rollback por lote y descartes no están en backlog. |
| 5 | Categorías/reglas rígidas | Wallet; Cashew limitado a nombres | Atendido: V1-9, V1-16. Alcance de reglas a manuales sin definir. |
| 6 | Paridad desigual entre plataformas | Wallet (Android/iOS/web), YNAB (import en web), Spendee (export en móvil), Cashew (Pro sin web) | Parcial: una sola base PWA/Capacitor; riesgo: almacenamiento web vs nativo diverge (decisión diferida). |
| 7 | Respaldo local frágil o sin cifrar | MM (auto-respaldo se borra), Cashew (Drive sin cifrar) | Parcial: V1-21 a V1-23 cubren; cifrado de respaldo no está. |
| 8 | Complejidad/curva de aprendizaje | YNAB [SEC], MM (reseña) | Atendido: V1-1, V1-2 con campos opcionales ocultos. |
| 9 | Publicidad o rastreo | MM, Wallet, YNAB, Spendee (etiquetas de privacidad) | Atendido por defecto (local); sin decisión explícita de telemetría. |
| 10 | Riesgo de continuidad (mantenedor único, cierre) | Cashew; Mint en `01` | Atendido: export abierto V1-21. |
| 11 | Recurrentes que no concilian con el cargo real | Wallet (sin emparejar), YNAB (montos variables) | Pendiente: P2-3 más V1-19, sin diseño. |

---

## 7. Brechas y preguntas abiertas para entrevista

### Cinco brechas más importantes frente al backlog
1. Importador de historial desde Money Manager (Excel/TSV): reemplazo declarado, sin ID.
2. Transferencias propias, pagos de TDC y reembolsos en el estado de cuenta: sin tratamiento en backlog aunque `04` lo menciona.
3. Rollback por lote importado y memoria de descartes (YNAB bloquea reimportar lo borrado; Cashew no deshace): sin ID.
4. Texto original del banco + nombre limpio del comercio: sin ID; V1-16 depende de ello.
5. Respaldo cifrado con contraseña: Cashew lo recibió como petición; P3-2 no lo cubre.

### Preguntas por tema

**Migración desde Money Manager**
1. ¿Cuántos años y registros de MM quieres traer, y cómo los exportas hoy (Excel, TSV o archivo de respaldo)?
2. ¿Los ingresos y transferencias históricos de MM se importan aunque v1 solo muestre gastos, o se descartan?
3. ¿Qué de MM usas de verdad: calendario, favoritos, presupuesto por mes, subdivisas, doble partida? Lo que no uses no entra a v1.

**Captura**
4. ¿Cuántos gastos registras al día y qué número de toques es tu límite? Hoy V1-1 son 3 con defaults.
5. ¿Obligatorio solo el monto, o monto y categoría? ¿"Sin categoría" es válido y se resuelve en la bandeja?
6. ¿La cuenta por defecto es la última usada, la más frecuente para esa categoría o la que fijes por comercio?
7. ¿Necesitas "guardar y capturar otro" y favoritos/plantillas en v1, o basta con recientes (V1-3)?
8. ¿Qué dispositivo usas a diario (Android/iOS)? Decide si P3-5 prioriza notificaciones, atajos o Google Pay.

**Modelo de datos**
9. ¿Cómo quieres ver el pago de la TDC y los abonos del estado: ocultos como transferencia, visibles o fuera del reporte?
10. ¿Un reembolso reduce el gasto original (enlazado) o es un movimiento negativo suelto?
11. ¿Necesitas "excluir de reportes" (gasto empresarial, reembolsable, cuenta de otra persona)?
12. ¿Se bloquea la moneda de una cuenta tras su primer movimiento, como Spendee?
13. ¿El mes del reporte es calendario, o por día de pago/quincena, o por corte de cada TDC?
14. ¿Archivar cuentas y categorías (ocultas, con historial) es suficiente en vez de borrar?

**Importación**
15. Si borras un gasto importado y reimportas el mismo estado, ¿debe reaparecer, o recordar el descarte?
16. ¿Qué tolerancia aceptas para proponer un emparejado USD: ±N días y ±X % de monto sobre el estimado? YNAB usa 10 días y monto exacto.
17. ¿Quieres deshacer un lote completo ("rollback") y verlo en la bandeja antes de confirmar, o basta confirmar por línea?
18. ¿Guardar siempre el texto original del banco junto al nombre limpio, aunque dupliques datos?
19. ¿Las reglas de categorización aplican a movimientos manuales, a importados o a ambos, y solo a nuevos o también al histórico?
20. ¿Aprobación por swipe tipo tarjetas (YNAB iOS) o por lista con selección múltiple (V1-15)?

**Tipo de cambio**
21. ¿Qué FIX usas para el estimado: el del día de la compra o el último publicado? Un cargo en fin de semana no tiene FIX propio.
22. ¿Aceptas una fuente de respaldo no Banxico (como la API gratuita de Cashew) si Banxico falla, marcándolo en el estado?

**Respaldo, seguridad y privacidad**
23. ¿El JSON de respaldo debe cifrarse con contraseña desde v1? ¿Dónde lo guardas: Drive, iCloud o local?
24. ¿Bloqueo de app y ocultar montos son requisito de v1 o P3-2 es suficiente?
25. ¿Telemetría y reportes de fallos: ninguna, o solo locales?

**Producto y alcance**
26. ¿Presupuesto: por categoría con rollover o simple límite mensual? ¿Quieres proyección tipo Wallet (gastado + programado + promedio)?
27. ¿Reportes mínimos más allá de V1-27: calendario, comparativo con el mes anterior, búsqueda de texto?
28. ¿Compartir con círculo cercano significa gastos compartidos tipo Splitwise o planes personales separados (Spendee)?
29. ¿Algún banco distinto a BBVA crédito entra en la primera versión? Condiciona V1-20.

---

## Lagunas

- Spendee: no se halló artículo oficial del flujo de captura; sin verificar pasos y campos obligatorios. Sin verificar cobertura de bancos mexicanos (selector de país incluye México; lista de bancos no se obtuvo).
- Wallet: cobertura de bancos en México sin verificar. La cifra de bancos difiere entre sitio ("15K+") y App Store ("about 4,000").
- YNAB: no se leyó el artículo de reportes; método "four rules" vs "what's it for" no reconciliado; moneda MXN en la lista de monedas del plan sin verificar.
- Money Manager: listado de Google Play no cargó; contradicción entre "no hay sync entre dispositivos" (ayuda) y suscripción de "Data Sync" (App Store) sin resolver; precio de "Remove Ads" y comportamiento de publicidad sin verificar. Se leyeron artículos del Help Center vía API; no se probó la app.
- Cashew: qué desbloquea Pro, comportamiento de etiquetas y de bloqueo de seguridad (README sí, FAQ no) sin verificar; releases en GitHub no reflejan las versiones de tienda, por lo que el código fuente puede diferir del binario.
- Evidencia de usuarios: secundaria y escasa; Reddit no consultado; reseñas de competidores (Gerald, Pocket Clear, Budget Utopia, unstar.app) con sesgo comercial, usadas solo como indicio y marcadas SEC. Ningún dato de frecuencia de queja es estadístico.
- Precios y calificaciones son una captura del 2026-10-14; varían por país y plataforma, y hay discrepancias internas en Wallet, Spendee, YNAB (prueba de 34 vs 30 días) y Cashew.
- No se ejecutó ninguna app: los pasos de captura y los conteos de toques son derivados de documentación, no medidos.
- Conteos de "toques" de la sección 6.2 son orientativos; dependen de valores por defecto no verificados.

### Fuentes secundarias consultadas [SEC]
- https://unitq.com/unitq-scorecards/moneymanager (2026-10-14)
- https://www.g2.com/products/spendee/reviews ; https://www.capterra.com/p/238829/Spendee/ (2026-10-14)
- https://es.trustpilot.com/review/budgetbakers.com ; https://justuseapp.com/en/app/1032467659/wallet-finances-argent/reviews (2026-10-14)
- https://www.trustpilot.com/review/youneedabudget.com ; https://pocketclear.app/blog/ynab-complaints-problems.html (2026-10-14)
- https://pocketclear.app/blog/cheapest-budgeting-apps-2026.html (precio de Cashew Pro, confirmado luego en App Store) (2026-10-14)
