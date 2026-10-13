# 01 - Panorama de apps de finanzas personales

Fecha de consulta: 2026-10-10. Las fuentes son páginas oficiales salvo indicación. Lo no verificado lleva "(sin verificar)". Precios cambian por región/promo: confirmar antes de decidir.

## Índice
- [Apps comerciales (SaaS)](#apps-comerciales-saas)
- [Apps open source / self-hosted](#apps-open-source--self-hosted)
- [Apps de contabilidad en texto plano](#apps-de-contabilidad-en-texto-plano)
- [Apps móviles / nicho](#apps-moviles--nicho)
- [Mint: cierre y migración](#mint-cierre-y-migracion)
- [Otras apps recurrentes 2025-2026](#otras-apps-recurrentes-2025-2026)
- [Listas de keywords](#listas-de-keywords)
  - [1. Inventario de features](#1-inventario-de-features)
  - [2. Métodos de presupuesto](#2-metodos-de-presupuesto)
  - [3. Ingesta de datos](#3-ingesta-de-datos)
  - [4. Modelo de datos / arquitectura](#4-modelo-de-datos--arquitectura)
  - [5. Privacidad / seguridad / offline / sync](#5-privacidad--seguridad--offline--sync)
- [Conclusiones para una app personal](#conclusiones-para-una-app-personal)
- [Lagunas](#lagunas)

---

## Apps comerciales (SaaS)

### YNAB (You Need A Budget)
- Paradigma: zero-based / "give every dollar a job" (envelope-like).
- Ingesta: bank sync vía Plaid (US, CA, UK, EU selectos); File-Based Import para el resto; manual.
- Distintivo: loan calculator/debt, goals, sharing hasta 6 personas, sync en tiempo real.
- Precio: $109/año o $14.99/mes; trial 34 días sin tarjeta; gratis 365 días para estudiantes.
- Plataformas: iOS, Android, web. Self-host: no. Open source: no.
- Debilidad: curva de aprendizaje del método; caro; sin forecasting avanzado (sin verificar).
- Fuente: https://www.ynab.com/pricing (consultado 2026-10)
- Nota: las "four rules" no aparecen en esa página; son conocimiento general (sin verificar en fuente).

### Monarch Money
- Paradigma: net-worth + tracking + presupuesto flexible (categoría o flex).
- Ingesta: 3 proveedores: Plaid, Finicity (Mastercard Data Connect), MX; el usuario puede cambiar de proveedor por conexión; casas/vehículos vía Zillow / VinAudit.
- Distintivo: calculadoras (salud financiera, deuda, hipoteca), exportes fiscales, colaboración de hogar, tier Plus con forecasting y varias fuentes de ingreso.
- Precio: $99.99/año, $14.99/mes (promo vigente en la página); Plus sin precio listado en la página.
- Plataformas: web, iOS, Android. Self-host: no. Open source: no.
- Debilidad: dependencia de 3 agregadores (fallos de sync); suscripción.
- Fuentes: https://www.monarch.com/pricing ; https://help.monarch.com/hc/en-us/articles/33707613533972-Understanding-Data-Providers-and-Connections

### Copilot Money
- Paradigma: tracking + net worth, presupuesto con rollovers, muy automatizado (categorización con ML).
- Ingesta: bank sync; agregador principal Plaid, segundo proveedor discrepante entre fuentes (MX o Finicity) (sin verificar).
- Distintivo: detección de suscripciones, inversiones/cripto, valor de casa vía URL Zillow, diseño.
- Precio: $7.92/mes o $95/año (página oficial); prueba gratuita.
- Plataformas: iPhone, iPad, Mac, web; sin Android (según blogs 2026, sin verificar en oficial).
- Self-host: no. Open source: no.
- Debilidad: ecosistema Apple; cuenta single-user (blog, sin verificar).
- Fuente: https://www.copilot.money/

### Simplifi (Quicken)
- Paradigma: "Spending Plan" (ingreso - facturas = lo disponible), compatible con zero-based / envelope / 50-30-20 según la página.
- Ingesta: bank sync a 14,000+ instituciones (proveedor no nombrado); solo US y Canadá.
- Distintivo: gasto diario disponible, cash flow proyectado, retirement planner, bill reminders, spaces & sharing (1 persona más).
- Precio: $3.99/mes facturado anual (intro, hasta 2026-11-06), referencia $6.99/mes.
- Plataformas: web, iOS, Android. Self-host: no. Open source: no.
- Debilidad: solo US/CA; algunas features no en móvil.
- Fuente: https://www.quicken.com/products/simplifi/

### Lunch Money
- Paradigma: tracking + presupuesto por categoría, multi-currency nativo; orientado a power users/devs.
- Ingesta: Plaid (webhook al haber datos nuevos); CSV/PDF import; API de desarrollador (lunchmoney.dev); servicios terceros Lunch Flow, Synci; plugins comunitarios para bancos europeos.
- Países Plaid (según soporte): US, CA, FR, NL, ES, IE, DE, PL, PT, SE, DK, BE, IT, NO, AT, FI, EE, LT, LV.
- Distintivo: multi-currency desde el inicio, API abierta, rules, merge de conexiones para evitar duplicados, fecha mínima de import.
- Precio: fuentes discrepan (≈$10/mes; anual "pay what you want" desde $40-60) (sin verificar; pricing page dio 403).
- Plataformas: web (app móvil limitada según reseñas). Self-host: no (hay versión OSS parcial/legacy (sin verificar)). Open source: no.
- Debilidad: sin app móvil nativa sólida; sin inversiones/loan sync automático.
- Fuente: https://support.lunchmoney.app/guides/automatic-imports ; https://lunchmoney.app/why-lunch-money

### Wallet by BudgetBakers
- Paradigma: tracking + presupuestos; multi-usuario.
- Ingesta: manual; bank sync vía Salt Edge (UE/UK, política de privacidad abr-2026); import/export.
- Distintivo: charts/reportes avanzados, colaboración (Premium), sync bancario como feature de pago.
- Precio: discrepante: €1.99/mes y €14.99/año (App Store DE); otras fuentes $4.49-5.99/mes, $21.99-26.99/año, lifetime $26.99-49.99 (sin verificar; cambia por región).
- Plataformas: iOS, Android, web. Self-host: no. Open source: no.
- Debilidad: problemas de sync reportados por usuarios (reseña, sin verificar).
- Fuentes: https://budgetbakers.com/en/legal/saltedge-privacy/ ; https://apps.apple.com/DE/app/id1032467659

### Spendee
- Paradigma: tracking con wallets y budgets.
- Ingesta: manual; bank sync (proveedor no nombrado); import/export.
- Distintivo: wallet sharing, auto-categorización, budgets (móvil; web "coming soon").
- Precio: Basic gratis (1 wallet cash, 1 budget); Plus $1.99/mes o $14.99/año; Premium $5.99/mes o $35.99/año; trial 7 días.
- Plataformas: iOS, Android, web. Self-host: no. Open source: no.
- Debilidad: plan gratis muy limitado.
- Fuente: https://www.spendee.com/premium

### Goodbudget
- Paradigma: envelope (digital); sin bank sync histórico (sin verificar actualidad).
- Ingesta: manual (+ import (sin verificar)).
- Distintivo: sync entre dispositivos/pareja, envelopes anuales/goals.
- Precio: gratis 10 envelopes + 10 annual/goal, 1 cuenta, 2 dispositivos; pago $10/mes o $80/año (nombre del plan Plus/Premium discrepante; agregadores de precios, sin verificar).
- Plataformas: iOS, Android, web. Self-host: no. Open source: no.
- Debilidad: limitado, UI anticuada (sin verificar).
- Fuente: https://www.nerdwallet.com/finance/learn/goodbudget-app-review (secundaria; pág. oficial dio 404)

### PocketGuard
- Paradigma: "in my pocket" (disponible tras necesidades); soporta zero-based, envelope, 50/30/20, custom.
- Ingesta: bank sync 20,000+ instituciones US/CA/UK con Plaid, Finicity y Salt Edge (read-only).
- Distintivo: Leftover, "Pace" (forecast fin de mes), rules, rollovers, detección de suscripciones, debt payoff, net worth.
- Precio: trial 7 días; precios no en la página (sin verificar).
- Plataformas: iOS, Android, web, Apple Watch. Self-host: no. Open source: no.
- Debilidad: freemium con upsell (sin verificar).
- Fuente: https://pocketguard.com/

### Splitwise
- Paradigma: gastos compartidos / settle-up (no presupuesto).
- Ingesta: manual; import de tarjetas solo US en Pro; receipt scanning, itemization.
- Distintivo: splits por grupo, conversión de divisa, simplificación de deudas (conocimiento general, sin verificar en página).
- Precio: gratis con límites; Pro de pago (precio no en la página).
- Plataformas: iOS, Android, web. Self-host: no. Open source: no.
- Debilidad: límite diario de gastos en gratis; no es presupuesto.
- Fuente: https://www.splitwise.com/pro

### Fintonic (España)
- Paradigma: agregador + categorización + objetivos + scoring/productos (FinScore).
- Ingesta: PSD2 AISP/PISP autorizado por Banco de España (registro 6892 según una fuente, sin verificar en registro).
- Distintivo: gratuito para el usuario; monetiza comisiones por préstamos/productos financieros.
- Precio: gratis (modelo de comisión). Plataformas: iOS, Android. Self-host: no. Open source: no.
- Debilidad: modelo comercial orientado a venta de productos; cifras de usuarios inconsistentes.
- Fuente: https://www.genbeta.com/a-fondo/gestionar-todos-tus-bancos-unico-sitio-11-apps-banca-que-permiten-controlar-todos-tus-gastos (secundaria)

### Emma (UK/EU)
- Paradigma: tracking + budgets + suscripciones; también broker (ETFs).
- Ingesta: Open Banking (FCA); 50+ bancos UK según una reseña; read-only.
- Distintivo: detección de suscripciones, inversión desde £1.
- Precio: gratis con 2 cuentas; Plus/Pro/Ultimate £4.99-£14.99/mes, discrepante entre fuentes (sin verificar en oficial).
- Plataformas: iOS, Android. Self-host: no. Open source: no.
- Debilidad: caro y muchos upsells (reseñas).
- Fuente: https://emma-app.com/blog/what-is-the-best-budgeting-app-in-the-uk/ ; reseñas secundarias.

### Otras que aparecen a menudo (2025-2026)
- Rocket Money: suscripciones y facturas; negociación (sin verificar). Fuente: https://rocketmoney.com/learn/personal-finance/best-budgeting-apps
- Tiller: presupuesto dentro de hojas de cálculo (Google Sheets/Excel); feeds bancarios (agregador no verificado). Fuente: https://tiller.com/mint
- Origin: all-in-one budgeting + inversión, promocional (sin verificar). 
- Empower: dashboard de patrimonio; poco detalle encontrado (sin verificar).
- Finary (FR): mencionado como alternativa a Mint (sin verificar detalles).

---

## Apps open source / self-hosted

### Actual Budget
- Paradigma: envelope (zero-based).
- Ingesta: CSV/OFX/QIF import (sin verificar en la página consultada); bank sync con tu propia clave: GoCardless BankAccountData (UE, ya sin cuentas nuevas), Enable Banking (UE), SimpleFIN Bridge (NA), Akahu (NZ), Pluggy.ai (BR).
- Distintivo: local-first, sync opcional entre dispositivos, E2EE de datos de presupuesto, rules, schedules.
- Precio: gratis; PikaPods/Fly.io de pago; costes del agregador por tu cuenta.
- Plataformas: web, desktop (Win/Mac/Linux), self-host con Docker. Open source: sí (MIT (sin verificar)).
- Debilidad: tokens de bank sync en servidor sin E2EE; sync solo con app abierta; sin inversiones avanzadas.
- Fuentes: https://actualbudget.org/docs/ ; https://actualbudget.org/docs/advanced/bank-sync/

### Firefly III
- Paradigma: double-entry (declarado en README) + budgets + piggy banks.
- Ingesta: Data Importer (CSV, CAMT.05x) y proveedores: GoCardless, SimpleFIN, Enable Banking, FinTS, basiq.io, Sophtron, Lunch Flow, teller.io (Spectre no aparece en docs actuales).
- Distintivo: rules, webhooks, recurring, subscriptions, reconciliation, liabilities, multi-currency, REST API, 2FA.
- Precio: gratis. Plataformas: web (self-host Docker/K8s). Open source: sí, AGPL-3.0.
- Debilidad: UI densa, requiere operar servidor (stack PHP), sin app móvil oficial (sin verificar).
- Fuentes: https://docs.firefly-iii.org/ ; https://github.com/firefly-iii/firefly-iii (~24.9k stars)

### Maybe Finance (estado)
- Estado: repo archivado el 2025-07-27, "no longer actively maintained", última release v0.6.0; licencia AGPL-3.0; marca "Maybe" no reutilizable.
- Stack: Ruby on Rails + Hotwire + PostgreSQL; self-host con Docker.
- Continuidad: fork comunitario "Sure" (we-promise/sure), AGPLv3, self-host, sin SaaS (fuente secundaria; actividad no verificada).
- Paradigma: net-worth + tracking. Ingesta: Plaid (sin verificar en README).
- Debilidad: proyecto original abandonado.
- Fuente: https://github.com/maybe-finance/maybe ; https://github.com/we-promise/sure

### Cashew
- Paradigma: tracking + budgets flexibles (diario/semanal/mensual/custom).
- Ingesta: manual; sin bank sync (sin verificar).
- Distintivo: multi-account y multi-currency, recurring/subscriptions, reportes, deep links para automatizar.
- Stack: Flutter, Drift (SQL local), Firebase para auth/backup/sync; Google Drive backup.
- Precio: gratis. Plataformas: iOS, Android, web (PWA). Open source: sí, GPL-3.0 (fuente secundaria).
- Debilidad: dependencia de Firebase para sync; mantenedor único.
- Fuente: https://github.com/jameskokoska/Cashew (el fetch directo falló; datos de búsqueda web)

---

## Apps de contabilidad en texto plano

### GnuCash
- Paradigma: double-entry clásico.
- Ingesta: QIF (asistente) y OFX; CSV no listado en la página de features pero existe import CSV (sin verificar); HBCI para bancos alemanes.
- Distintivo: scheduled transactions con reminders, multi-currency con balance, conciliación (sin verificar en página).
- Precio: gratis. Plataformas: Windows, macOS, Linux. Open source: sí (GPL (sin verificar)).
- Debilidad: UI de escritorio anticuada, sin móvil oficial (sin verificar).
- Fuente: https://www.gnucash.org/features.phtml

### Beancount + Fava
- Paradigma: double-entry en texto plano, CLI.
- Ingesta: importers/ingest (Beangulp en v3), scripts propios; sin agregador integrado.
- Distintivo: directivas, balance assertions, pad, inventories/lots, query language `bean-query`, plugins; Fava = UI web (MIT, `pip install fava`).
- Precio: gratis. Plataformas: multiplataforma, local. Open source: sí (licencia de Beancount sin verificar).
- Debilidad: exige disciplina contable y scripting.
- Fuentes: https://beancount.github.io/docs/index.html ; https://github.com/beancount/fava

### hledger / Ledger
- Paradigma: double-entry en texto plano (formato heredado de Ledger).
- Ingesta: `import` con CSV rules files; journal, CSV, TSV; salidas text/HTML/JSON/CSV.
- Distintivo: `check`, strict mode, balance sheet / income statement, hledger-ui (TUI), hledger web.
- Precio: gratis. Plataformas: multiplataforma. Open source: sí (licencia exacta sin verificar).
- Debilidad: sin móvil ni sync bancario nativo.
- Fuente: https://hledger.org/

---

## Apps moviles / nicho

### Money Manager (Realbyte) "Expense & Budget"
- Paradigma: tracking manual con calendario; presupuestos semanal/mensual/anual.
- Ingesta: manual; backup/restore; PC manager vía Wi-Fi.
- Precio: gratis; suscripción Data Sync $2.49/mes o $19.99/año (iOS, snapshot 2026-05-14).
- Distintivo: multi-currency, passcode, vista calendario.
- Plataformas: iOS, iPad (Android existe (sin verificar precios)). Self-host: no. Open source: no.
- Debilidad: sin bank sync; UI recargada (sin verificar).
- Fuente: https://apps.apple.com/app/id560481810

---

## Mint: cierre y migracion
- Cerrado por Intuit; servicio terminó 2024-03-23 (cita de Tiller; otras fuentes dicen "marzo 2024").
- Usuarios migrados a Credit Karma: balances, net worth histórico y ~3 años de transacciones; Credit Karma perdió presupuestos mensuales por categoría (PCWorld).
- Destinos citados: Monarch (favorito inicial), Simplifi, YNAB, Tiller, Finary; OSS: GnuCash, HomeBank, Money Manager Ex.
- Lección: riesgo de plataforma/lock-in; permitir exportar siempre.
- Fuentes: https://tiller.com/mint ; https://www.pcworld.com/article/2125596/the-popular-mint-budgeting-tool-is-shutting-down.html

---

## Otras apps recurrentes 2025-2026
- Ver sección de Rocket Money, Tiller, Origin, Empower arriba. Resumen de ranking en https://useorigin.com/resources/blog/the-10-best-budgeting-apps-for-2026-unbiased-reviews-and-comparisons (sesgado: vende un competidor).
- Consenso de reseñas (secundario): YNAB = zero-based/comportamiento; Monarch = mejor all-around/hogar; Copilot = mejor para Apple; Rocket Money = suscripciones; Tiller = hojas de cálculo.
- Queja más repetida: bugs de sync y subscription creep.

---

## Listas de keywords

### 1. Inventario de features
- categories / category groups: clasificar gasto en jerarquía
- subcategories: nivel hijo de categoría
- rules (auto-categorize): reglas por payee/importe/texto
- ML auto-categorization: categorizar por aprendizaje
- recurring transactions: plantillas periódicas
- schedules / upcoming bills: facturas futuras con aviso
- subscriptions detection: detectar cargos recurrentes
- splits (split transactions): una transacción en varias categorías
- shared expenses / settle-up: dividir con otros
- transfers: mover dinero entre cuentas propias
- tags / labels: etiquetas transversales
- payees / merchants: contraparte normalizada
- notes / attachments / receipts: adjuntos y recibos
- goals / savings goals: objetivos de ahorro
- piggy banks: hucha por objetivo (Firefly)
- debt payoff planner: estrategia snowball/avalanche
- loans / liabilities: pasivos con intereses
- net worth: activos menos pasivos
- investments / holdings: posiciones y rendimiento
- manual assets (home, vehicle): activos valorados a mano
- multi-currency: cuentas y transacciones en varias divisas
- reports / charts: gasto por categoría/tiempo
- cash flow: entradas vs salidas
- forecasting / projected cash flow: proyección futura
- reconciliation: cuadrar saldo con extracto
- pending vs cleared: estado de transacción
- search / filters / saved views: consulta de transacciones
- import/export (CSV): portabilidad
- API / webhooks: automatización externa
- sharing / households: multiusuario
- rollovers: arrastre de saldo no gastado
- tax export: informes fiscales
- audit trail / history: histórico de cambios

### 2. Metodos de presupuesto
- zero-based budgeting: ingreso = asignaciones, sobrante 0
- envelope budgeting: sobres con límite por categoría
- "give every dollar a job": lema YNAB
- YNAB four rules: (sin verificar en fuente) reglas del método
- 50/30/20: necesidades/deseos/ahorro
- pay yourself first: ahorrar antes de gastar
- sinking funds: ahorro para gasto futuro conocido
- rolling budget / rollovers: arrastrar sobrante o déficit
- flex budgeting: grupo flexible vs fijo (Monarch)
- spending plan: ingreso menos facturas, resto disponible
- safe-to-spend / left to spend: importe disponible hoy
- daily spending allowance: disponible por día restante
- category vs account-based budgeting: presupuesto por categoría o cuenta
- tracking-only: sin límites, solo observar
- age of money: antigüedad del dinero (YNAB, sin verificar)
- budget by custom period: ciclos no mensuales (Cashew)
- debt snowball/avalanche: orden de pago de deudas
- cash stuffing: envelopes físicos

### 3. Ingesta de datos
- Plaid: US/CA/UE/UK; cobertura amplia, coste/privacidad
- MX: agregador US, alternativa
- Finicity (Mastercard Data Connect): US, usado por Monarch
- Teller: API US directa, developer-friendly
- SaltEdge: UE/UK, usado por Wallet/PocketGuard
- Tink: open banking europeo (Visa)
- GoCardless Bank Account Data (ex-Nordigen): UE, sin altas nuevas hoy
- Enable Banking: UE, alternativa a GoCardless
- SimpleFIN Bridge: NA, barato, para self-host
- Akahu / Pluggy / basiq: NZ / BR / AU
- FinTS/HBCI: bancos alemanes, directo
- PSD2 / open banking: acceso regulado a cuentas UE
- AISP / PISP: lectura vs iniciación de pagos
- consentimiento 90/180 días: reautenticación periódica PSD2
- CSV import: universal, manual, formato por banco
- OFX / QFX: estándar, algunos bancos
- QIF: legado, sin IDs
- CAMT.053 / MT940: extractos bancarios ISO/SWIFT
- PDF statement parsing: frágil, último recurso
- email/receipt parsing: extraer de recibos por correo
- OCR receipts: foto a datos
- webhooks de agregador: avisan de datos nuevos
- screen scraping: legado, riesgo
- manual entry: fiable, esfuerzo constante
- Tradeoff general: sync automático = comodidad vs privacidad/coste/fallos de conexión; CSV = control vs fricción

### 4. Modelo de datos / arquitectura
- double-entry bookkeeping: cada movimiento = débito y crédito
- ledger / journal: libro de asientos
- account types: asset/liability/income/expense/equity
- postings: líneas de un asiento
- accounts / payees / categories: entidades núcleo
- money as integer minor units: céntimos como entero, sin float
- decimal arithmetic: evitar errores de redondeo
- currency / commodity: divisa o activo
- FX rates (historical): conversión a fecha
- base currency vs account currency: reporte vs original
- idempotent import: reimportar sin duplicar
- dedupe: detectar duplicados (fecha+importe+payee)
- external/import ID (FITID): ID estable del banco
- transfer matching: emparejar ambos lados
- split transaction model: padre + líneas
- balance assertion: verificación de saldo en fecha
- reconciliation status: pending/cleared/reconciled
- soft delete / audit log: histórico
- recurring rule engine: reglas RRULE-like
- event sourcing / append-only: movimientos inmutables
- schema migrations: evolución versionada
- time zones / booking vs value date: fechas distintas
- opening balance: saldo inicial
- tags vs categories: ortogonales
- budget model: asignación por periodo y categoría
- plain text accounting: archivo humano versionable

### 5. Privacidad / seguridad / offline / sync
- local-first: datos en el dispositivo primero
- offline-first: funciona sin red
- E2EE (end-to-end encryption): servidor no lee datos
- CRDT: fusión sin conflictos (Actual usa CRDT (sin verificar))
- self-hosting: servidor propio, control total
- SQLite: BD local embebida
- sync server: servidor de relé
- encryption at rest: cifrado en disco
- secrets management: tokens de agregador
- read-only access: sin mover dinero
- OAuth / consent: autorización por banco
- 2FA / passkeys: acceso a la app
- data export / portability: salida de datos
- backups: copias cifradas
- tokens de agregador no E2EE (Actual docs): riesgo de servidor
- vendor lock-in / shutdown risk: caso Mint
- GDPR / PSD2 compliance: datos personales UE
- AGPL: copyleft de red (Firefly, Maybe)

---

## Conclusiones para una app personal
- Elegir paradigma primero: envelope/zero-based vs tracking vs double-entry; define el modelo de datos.
- Para un solo usuario, empezar con CSV/OFX + dedupe idempotente; bank sync después (coste y mantenimiento).
- Dinero como enteros en unidades menores; guardar divisa por transacción.
- Local-first + export abierto evita el riesgo tipo Mint.
- Recomendación: modelo con cuentas/payees/categorías + transferencias + splits; double-entry opcional si quieres reportes tipo ledger.

## Lagunas
- Sin verificar en fuente oficial: precios Lunch Money, Wallet, Goodbudget, Emma, Splitwise Pro, PocketGuard; cobertura regional (España/UE) de la mayoría.
- Licencias exactas de Actual, Beancount, hledger, GnuCash; funcionamiento CRDT de Actual; import CSV/OFX/QIF de Actual.
- Rocket Money, Tiller, Origin, Empower, Finary, Cashew (fetch directo falló) y Money Manager en Android solo con fuentes secundarias.
