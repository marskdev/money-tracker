# 06 - UX de captura, categorías y revisión de importados

Fecha: 2026-10-10. Alcance: investigación de solo lectura (WebSearch/WebFetch). Cada bullet lleva fuente; lo no confirmado en fuente primaria va marcado `(sin verificar)`.

## Contenido

1. [Captura rápida](#1-captura-rápida)
2. [Diseño de formulario](#2-diseño-de-formulario)
3. [Categorías](#3-categorías)
4. [Revisión/triage de importados](#4-revisióntriage-de-importados)
5. [Estimado vs confirmado y multi-moneda](#5-estimado-vs-confirmado-y-multi-moneda)
6. [Hábito y engagement](#6-hábito-y-engagement)
7. [Accesibilidad y localización](#7-accesibilidad-y-localización)
8. [Keywords](#8-keywords)
9. [Decisiones sugeridas para v1](#9-decisiones-sugeridas-para-v1)
10. [Huecos de cobertura](#huecos-de-cobertura)

---

## 1. Captura rápida

### Teclado y campo de monto
- `inputmode="decimal"` muestra keypad con separador decimal del locale; no impone validez -> https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode
- `inputmode="numeric"` solo dígitos 0-9; puede o no traer `-` -> misma fuente
- Evitar `type="number"` para valores no incrementables (flechas up/down, validación del browser); para precios usar `type="text"` + `inputmode="decimal"` -> https://web.dev/articles/sign-in-form-best-practices (la guía habla de IDs/cuentas; extrapolación a monto: sin verificar) y MDN arriba
- Apple HIG: mostrar el teclado apropiado al contenido; usar number formatter (restringe a numérico, formatea decimales/moneda; varía por locale) -> https://developer-mdn.apple.com/design/human-interface-guidelines/components/selection-and-input/text-fields (espejo de Apple HIG)
- `enterkeyhint` (enter/done/go/next/previous/search/send) solo cambia la etiqueta de la tecla Enter, no el comportamiento -> https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/enterKeyHint
- Keypad propio en pantalla (patrón Cashew: "haptic feedback setting to numpad" en changelog) -> https://newreleases.io/project/github/jameskokoska/Cashew/release/5.3.4%2B396
- Calculadora en el campo de monto: Money Manager la lista como "Search and calculator functions" (función de calculadora, no se confirma que sea dentro del campo) -> https://apps.apple.com/app/id560481810
- Calculadora dentro del campo en Cashew/otros: no confirmada en README de Cashew -> https://github.com/jameskokoska/Cashew (sin verificar)

### Defaults inteligentes
- YNAB: categoría por defecto del payee = la usada más recientemente; cambia solo si 2 de las 3 últimas usan otra -> https://support.ynab.com/en_us/categorizing-transactions-a-guide-HyRl60sks.md
- YNAB móvil: sugiere las 5 últimas categorías usadas con ese payee; sin sugerencias para payees nuevos, de una sola categoría o splits -> misma fuente
- Cashew: "custom titles that automatically assign a category to transactions with the same name" -> https://github.com/jameskokoska/Cashew
- Actual Budget: "Category Learning" crea reglas tras categorizar el mismo payee varias veces; activo por defecto, desactivable por payee -> https://actualbudget.org/docs/transactions/payees (resumen en búsqueda) y https://actualbudget.org/docs/accounts/payees/
- Copilot: tras 30 transacciones revisadas, sugiere tipo y categoría; si falla, sube la 2ª mejor opción -> https://help.copilot.money/en/articles/11157550-quick-start-guide
- Último account/fecha-hora "ahora": patrón común, no hallado documentado en fuente primaria -> (sin verificar)

### Templates / favoritos / widgets / atajos
- Money Manager: "payment profiles" para gastos frecuentes; Quick entry widget (v2.14.0) -> https://apps.apple.com/app/id560481810
- Cashew: "App Links for creating pre-filled transactions" (deep links; prioriza nombre exacto de categoría antes de buscar) -> https://github.com/jameskokoska/Cashew y https://newreleases.io/project/github/jameskokoska/Cashew/release/5.3.4%2B396
- PWA `shortcuts` en manifest: menú contextual al mantener el icono; apunta a `url` dentro de `scope`; lista corta, ordenada por importancia; soporte limitado (no Baseline) -> https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/shortcuts
- Atajo útil: `/add?amount=` como deep link tipo Cashew para Shortcuts/NFC/widgets (diseño propio, derivado de las dos fuentes anteriores)

### Share target / notificaciones / voz
- `share_target` en manifest: PWA instalada aparece en el diálogo de compartir; `GET`/`POST`, `title`/`text`/`url`/`files`; experimental, soporte limitado; validar todo input -> https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/share_target
- Captura por notificación bancaria / SMS: no hallada documentada en apps citadas (Wallet: "SMS parsing isn't mentioned") -> https://budgetbakers.com/imports-web-app/ (sin verificar para Money Manager y Spendee)
- Voz / NLP ("café 45 ayer"): no hallada fuente primaria -> (sin verificar)
- Wallet (BudgetBakers): imports por archivo con reglas de lectura; email import reportado por reseña -> https://budgetbakers.com/imports-web-app/ y https://beebom.com/wallet-app-by-budgetbakers-review/amp/ (sin verificar)

### Undo vs confirmación
- Confirmación solo para irreversibles/poco frecuentes; "¿Seguro?" constante se ignora; Nielsen "Confirmation Dialogs Can Prevent User Errors - If Not Overused" -> https://uxplanet.org/confirmation-dialogs-how-to-design-dialogues-without-irritation-7b4cf2599956 (cita secundaria; verificar en nngroup.com)
- Undo preferible cuando la acción es reversible: snackbar con acción Undo, algo más de duración -> https://acorn.firefox.com/latest/mobile/components/snackbar/android-pNOUdFi9 (secundaria; página oficial Material no obtenida, sin verificar valor numérico)
- Snackbar no debe requerir dismiss ni persistir; usar banner si debe persistir -> misma fuente
- Aplicado a guardar gasto: guardar sin confirmación + snackbar "Gasto guardado - Deshacer"; borrar = undo, no modal (derivación propia)

### Feedback offline
- No se halló guía primaria específica de "offline feedback" para finanzas -> (sin verificar)
- Pendiente de investigar: Workbox background sync, Material "offline" patterns

---

## 2. Diseño de formulario

### Progressive disclosure
- Mostrar pocas opciones centrales; resto bajo petición -> https://www.nngroup.com/articles/progressive-disclosure/
- Máximo 2 niveles de disclosure; con 3+ simplificar primero -> misma fuente
- Lo usado con frecuencia va visible; el segundo nivel debe ser raro -> misma fuente
- Trigger visible y con etiqueta que fije expectativas ("Más detalles") -> misma fuente
- Evitar varias rutas al mismo campo secundario -> misma fuente
- Identificar campos núcleo con frecuencia de uso real, no intuición -> misma fuente

### Orden y requeridos
- Orden sugerido (derivado): monto -> categoría -> (resto oculto: nota, fecha, cuenta, tags, foto)
- Requerido solo monto; categoría con default/"Sin categoría" (YNAB permite sin categoría pero insiste hasta asignar) -> https://support.ynab.com/en_us/categorizing-transactions-a-guide-HyRl60sks.md
- Campos opcionales con picos de uso (fecha, cuenta) como chips visibles, no como campos vacíos (derivado)

### Validación inline
- Validar al salir del campo, no mientras se escribe -> https://www.nngroup.com/articles/errors-forms-design-guidelines/
- Error junto al campo, específico y accionable; color + icono; no solo tooltip -> misma fuente
- Éxito solo cuando aporta contexto -> misma fuente
- Mismo error 3+ veces = problema de diseño -> misma fuente

### Fecha y hora
- Calendario para fechas cercanas (< 1 año); siempre permitir teclear; evitar dropdowns separados día/mes/año -> https://www.nngroup.com/articles/date-input/
- Mostrar nombres de mes escritos para evitar ambigüedad dd/mm vs mm/dd -> misma fuente
- Etiqueta "hoy" quita incertidumbre (ejemplo Todoist) -> misma fuente
- Chips relativos "Hoy / Ayer / Otra fecha": patrón derivado; NN/g no cubre relativas en profundidad -> misma fuente

### Teclado en mobile web
- Teclado puede tapar el botón de guardar; mantener el formulario corto y probar en dispositivos reales -> https://web.dev/articles/sign-in-form-best-practices
- Chrome Android >= 108 redimensiona solo el visual viewport; `interactive-widget=resizes-content` en meta viewport restaura el comportamiento previo; valores `resizes-visual` (default) / `resizes-content` / `overlays-content` -> https://developer.chrome.com/blog/viewport-resize-behavior
- `window.visualViewport` `resize` event para anclar una barra inferior sobre el teclado; puede parpadear al hacer scroll -> https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API
- VirtualKeyboard API: no cubierta en la fuente consultada -> (sin verificar)

### Una mano / zona del pulgar
- Hoober (2013, >1300 observados): 49% una mano, 36% cradle + dedo de la otra, 15% dos pulgares -> https://smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users (secundaria)
- El modelo de zonas verde/amarillo/rojo es un modelo, no plantilla rígida; el centro es lo más tocado y preciso -> misma familia de fuentes, vía blog secundario (sin verificar contra Hoober)
- Objetivos táctiles >= 1 cm x 1 cm (0.4 in); mayores para CTA primarios y uso en movimiento; ~2 mm de separación -> https://www.nngroup.com/articles/touch-target-size/
- WCAG 2.2 SC 2.5.8: mínimo 24x24 CSS px (AA), con excepciones por espaciado -> https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- Valor "44x44" (2.5.5 AAA, Apple 44pt): no confirmado en las páginas leídas -> (sin verificar)
- Mover guardar y keypad a la mitad inferior (derivado)

---

## 3. Categorías

### Taxonomías por defecto (referencia)
- PocketSmith: 14 padres (Earnings, Housing Expenses, Utilities and Services, Eating and Drinking, Entertainment and Hobbies, Transport and Travel, Health and Wellness, Family and Pets, Insurances, Giving, Miscellaneous, Banking, Transfers and Repayments, Business); dos niveles; presupuestar al nivel hijo -> https://learn.pocketsmith.com/article/1558-pocketsmiths-default-category-structure
- YNAB (grupos actuales): Bills, Frequent, Non-Monthly, Goals, Quality of Life Goals -> https://www.ynab.com/blog/how-many-ynab-categories
- Monarch: lista oficial "Default Categories" (403 al obtenerla); se pueden desactivar pero no borrar los default (reportado en Reddit) -> https://help.monarch.com/hc/en-us/articles/360048883851 (sin verificar contenido)
- INEGI (grandes rubros de gasto de hogares): Alimentos, bebidas y tabaco; Transporte y comunicaciones; Vivienda y servicios; Educación y esparcimiento; Cuidados personales; (también Salud, Limpieza del hogar, etc.) -> https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/eng/ENG2025_RR.pdf (vía resumen de búsqueda; abrir PDF para lista exacta, sin verificar)
- Pesos 2025 reportados: alimentos/bebidas/tabaco 34.9%, transporte y comunicaciones 20.0%, educación y esparcimiento 8.5%, cuidados personales 8.1% -> https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/eng/ENG2025_RR.pdf (vía nota secundaria, sin verificar)

### Profundidad y cantidad
- YNAB: rango real 8-145 categorías; empezar con pocas y dejar que "ganen su lugar"; prueba: "¿cambiará mi comportamiento?" -> https://www.ynab.com/blog/how-many-ynab-categories
- Borrar categorías de metas cumplidas; YNAB pide reasignar actividad pasada -> misma fuente
- Flat + tags en vez de jerarquía profunda: decisión del proyecto; alineado con límite de 2 niveles de NN/g (arriba)
- Cashew: categorías con iconos buscables + tags personalizados para filtro -> https://github.com/jameskokoska/Cashew

### Tags vs categorías
- Firefly III (modelo): una categoría por transacción, tags muchos (página de docs no obtenida, 404) -> https://docs.firefly-iii.org/ (sin verificar)
- Copilot: tags para distinguir flujos (ej. varias fuentes de ingreso) -> https://help.copilot.money/en/articles/11157550-quick-start-guide
- Monarch: reglas pueden añadir tags -> https://help.monarch.com/hc/en-us/articles/360048393372 (vía búsqueda, 403 al fetch)

### Sin categoría
- YNAB: transacciones sin categoría quedan marcadas "This needs a category", con banner y filtro -> https://support.ynab.com/en_us/categorizing-transactions-a-guide-HyRl60sks.md
- Monarch: preferencia global para marcar "needs review" solo los no categorizados -> https://help.monarch.com/hc/en-us/articles/360048393372 (vía búsqueda)

### Split
- YNAB: split desde el campo categoría; el remanente se auto-distribuye (útil para impuestos); con todo en 0 divide en partes iguales; cada línea con payee/categoría/memo; una línea puede ser transfer -> https://support.ynab.com/en_us/split-transactions-a-guide-SJLEKwY0q.md
- Sin sugerencias de categoría para splits -> https://support.ynab.com/en_us/categorizing-transactions-a-guide-HyRl60sks.md
- Firefly: un "transaction group" contiene N "journals", uno por split; conversiones de tipo no aplican a splits -> https://docs.firefly-iii.org/explanation/financial-concepts/transactions/ (vía búsqueda)
- Monarch: sugiere marcar Amazon/Costco/Walmart "needs review" para dividirlos -> https://www.monarch.com/blog/transaction-review

### Renombrar/fusionar sin romper historial
- Actual: fusionar payees (selección múltiple -> Merge) y renombrar por click; doc no declara efecto en historial -> https://actualbudget.org/docs/accounts/payees/
- YNAB: categorizar auto solo afecta nuevas, no cambia registros existentes; efecto de rename/merge no cubierto -> https://support.ynab.com/en_us/categorizing-transactions-a-guide-HyRl60sks.md
- Patrón técnico (derivado): categoría por ID estable, nombre editable; merge = reasignar `category_id` + redirect de ID viejo; soft-delete (`archived`)
- Monarch: merge de merchants duplicados en ajustes -> https://help.monarch.com/hc/en-us/articles/360048393372 (vía búsqueda)

### Motor de reglas
- Actual: operadores `is`, `contains`, `matches` (regex), `one of`, y negativos; case-insensitive; etapas `pre`/`default`/`post`; auto-orden de menos a más específico (`is` > `contains`); si dos reglas chocan gana la última; campo `imported payee` conserva el texto original del banco -> https://actualbudget.org/docs/budgeting/rules/
- Actual: patrón "pre rule" que busca el comercio con `contains` sobre el imported payee para normalizar nombre -> https://actualbudget.org/docs/budgeting/rules/custom
- Actual: reglas auto-generadas por edición, editables -> https://actualbudget.org/docs/budgeting/rules/ (vía búsqueda)
- Firefly III: triggers pareados con acciones; grupos de reglas con orden; "stop processing"; modo strict (todos los triggers) vs no-strict (cualquiera); triggers invertibles; aplicar regla/grupo a transacciones existentes; variantes de texto: starts with, ends on, contains, is exactly -> https://docs.firefly-iii.org/how-to/firefly-iii/features/rules/ y https://docs.firefly-iii.org/references/firefly-iii/rule-triggers/ (la 2ª vía búsqueda)
- Monarch: condiciones sobre merchant (exact/contains), monto, categoría, cuenta; acciones: renombrar merchant, categoría, tags, ocultar, estado de review, meta; corren con transacciones nuevas no pendientes -> https://help.monarch.com/hc/en-us/articles/360048393372 (vía búsqueda)
- Copilot: "Name Rules"; reseñas se quejan de no poder ver/editar reglas -> https://help.copilot.money/en/articles/11157550-quick-start-guide y https://apps.apple.com/app/id1447330651 (reseña, sin verificar)
- Heurística: reglas aplican solo a nuevas importaciones por defecto; "aplicar a existentes" explícito (Firefly) -> fuente Firefly arriba
- Guardar el texto original (`raw_description`) separado del nombre normalizado (patrón de Actual `imported payee`) -> https://actualbudget.org/docs/budgeting/rules/

### Iconos y color
- Copilot: color, emoji o Genmoji por categoría -> https://help.copilot.money/en/articles/11157550-quick-start-guide
- Cashew: iconos buscables, color de acento -> https://github.com/jameskokoska/Cashew
- Color no como único canal de información (WCAG 1.4.1; no consultado) -> (sin verificar)

### Categorías relevantes para MXN
- Rubros INEGI sirven de base nacional (ver arriba)
- SPEI: Sistema de Pagos Electrónicos Interbancarios de Banxico; CEP = Comprobante Electrónico de Pago con fecha, monto, bancos, clave de rastreo; estatus: en proceso, liquidado, rechazado, cancelado -> https://www.unotv.com/negocios/spei-que-es-y-como-funciona-la-transferencia-electronica/ (secundaria; Banxico oficial no abierto)
- SPEI como metadato de transferencia/origen (no categoría): usar clave de rastreo para deduplicar (derivado de lo anterior)
- Tianguis, gasolina, súper, servicios, suscripciones: no hay fuente primaria de taxonomía; sugerencia propia, marcar `(sin verificar)` como "convención local"
- Texto típico de estado de cuenta (OXXO, CFE, TELMEX, UBER EATS): ejemplos de keywords para reglas contains -> (sin verificar; validar contra estados de cuenta reales del usuario)

---

## 4. Review/triage de importados

### Inbox
- Copilot: sección "To Review" en Dashboard; indicador azul claro de no revisados en todas las listas; marcar revisado en bulk -> https://help.copilot.money/en/articles/11157550-quick-start-guide y https://help.copilot.money/en/articles/11780342-copilot-money-for-web
- Monarch: estado reviewed/needs review, manual o por reglas; tarjeta en home; alertas email/push solo para las no procesadas por reglas -> https://www.monarch.com/blog/transaction-review
- YNAB: banner "New transactions", filtro de "to approve or categorize" -> https://support.ynab.com/en_us/categorizing-transactions-a-guide-HyRl60sks.md
- YNAB importación por archivo: "Only the transactions you confirm in the preview are saved" -> https://support.ynab.com/en_us/file-based-import-a-guide-Bkj4Sszyo.md

### Bulk
- Copilot web: seleccionar varios y editar categoría, estado de review y tipo -> https://help.copilot.money/en/articles/11780342-copilot-money-for-web
- YNAB: bulk categorize en iOS/Android/web; en web buscar por payee y seleccionar -> https://support.ynab.com/en_us/categorizing-transactions-a-guide-HyRl60sks.md
- Monarch: bulk edit en web (con delete); móvil planificado -> https://www.monarch.com/blog/transaction-review
- Cashew: multi-select edit y borrado -> https://github.com/jameskokoska/Cashew

### Teclado en desktop
- Copilot web: flechas (navegar), X seleccionar, R marcar revisado, C cambiar categoría, Cmd+A / Cmd+Shift+A -> https://help.copilot.money/en/articles/11780342-copilot-money-for-web
- Monarch: sin atajos documentados en la página consultada -> https://www.monarch.com/blog/transaction-review

### Sugerencias de match manual vs importado
- YNAB: auto-match con monto idéntico y fechas dentro de 10 días -> https://support.ynab.com/en_us/file-based-import-a-guide-Bkj4Sszyo.md
- YNAB: reportes de usuarios indican ventana efectiva menor (3 días / fecha exacta) y sensibilidad al payee; docs vs práctica discrepan -> https://pol1.lr.ggtyler.dev/r/ynab/comments/1jvdggr/manual_input_vs_letting_them_clear (Reddit, sin verificar)
- YNAB: cuando difiere monto (propina), "Match" manual seleccionando ambas -> mismo hilo (sin verificar)
- Actual: busca payee similar, mismo monto y fecha cercana; si hace match actualiza la fecha de la manual a la del banco -> https://actualbudget.org/docs/transactions/importing/
- Heurística de scoring (derivada): monto exacto (o dentro de tolerancia por propina, p.ej. +-20% restaurante/gasolina) + ventana de fechas + similitud de texto; mostrar el motivo

### Confianza
- Copilot: sugerencias de categoría tras 30 revisadas, con opción 2ª mejor -> https://help.copilot.money/en/articles/11157550-quick-start-guide
- UI de "confidence" explícita (porcentaje/etiqueta): no hallada en fuentes primarias -> (sin verificar)
- Patrón propio: etiquetar origen de la categoría (regla / sugerida / manual) y solo auto-aprobar origen regla

### Duplicados
- YNAB: omite importadas con misma fecha y monto de ya importadas; no reimporta transacciones borradas; tope de 3 días antes de la última conciliación -> https://support.ynab.com/en_us/file-based-import-a-guide-Bkj4Sszyo.md
- Actual: primero revisa `id` de OFX/QFX, luego payee+monto+fecha cercana; opción "Reimport deleted transactions" -> https://actualbudget.org/docs/transactions/importing/
- Hash estable por transacción importada (fecha+monto+descripción+cuenta) o clave de rastreo SPEI como ID externo (derivado)
- Conciliación periódica: YNAB rutina semanal "match, clear or delete" viejos sin conciliar -> https://www.ynab.com/five-minute-budget-routine/

---

## 5. Estimado vs confirmado y multi-moneda

- Bancos: monto pendiente suele diferir del final (propina en restaurantes; gasolina pre-autoriza monto fijo; hoteles con incidentales) y es esperado; evitar contar pendiente y posteado a la vez -> https://support.getvergo.com/en/articles/15370716-why-is-my-transaction-amount-different-from-my-receipt
- Monarch: no editar transacciones pendientes porque se pueden perder al llegar la versión posteada -> https://help.monarch.com/hc/en-us/articles/360048393372 (vía búsqueda)
- Splitwise: conversión entre monedas con Open Exchange Rates, parte de Pro; opción de override de tasa no documentada en lo hallado -> https://apps.apple.com/app/splitwise-bill-splitter/id458023433 (sin verificar override)
- Money Manager: multi-moneda y cuentas múltiples -> https://apps.apple.com/app/id560481810
- Cashew: multi-moneda y cuentas con conversión; cambio rápido de cuenta/moneda en home -> https://github.com/jameskokoska/Cashew
- Patrón de etiquetado (derivado, sin fuente de app): `~$520 MXN` (estimado, prefijo `~` o chip "Est.") vs `$518.40 MXN` (confirmado); origen visible `USD 28.00 x 18.51`
- Guardar siempre `amount_original`, `currency_original`, `fx_rate`, `fx_source` (estimado/banco), `amount_mxn`, `status` (estimado/confirmado) (derivado)
- Totales: mostrar suma confirmada y, por separado, "+ estimado" (derivado)
- Formato: `Intl.NumberFormat(locale, {style:'currency', currency})`; `currencyDisplay` para distinguir MXN de USD ("$" ambiguo) -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat (opciones `currencyDisplay`/`currencySign` no documentadas en esa página; verificar en constructor)
- Estados de fiabilidad de SPEI (en proceso/liquidado) como análogo de pendiente/confirmado -> https://www.unotv.com/negocios/spei-que-es-y-como-funciona-la-transferencia-electronica/

---

## 6. Hábito y engagement

- YNAB rutina de 5 min: diaria (categorizar y aprobar nuevas), semanal/quincena (match/clear/delete viejas, conciliar), cierre de mes (conciliar, ajustar) -> https://www.ynab.com/five-minute-budget-routine/
- Recomendación comunitaria: no pasar más de una semana sin ponerse al corriente -> https://lemm.ee/post/4380628 (foro, sin verificar)
- Copilot: 2-3 min/día de revisión (afirmación de terceros) y ~20% de recategorización -> https://moneywithkatie.com/copilot-review-a-budgeting-app-that-finally-gets-it-right/ (blog, sin verificar)
- Monarch: alertas de review limitadas a lo no procesado por reglas = menos ruido -> https://www.monarch.com/blog/transaction-review
- Monarch weekly recap por email: no confirmado -> (sin verificar)
- Qué miran realmente los usuarios (resumen mensual, gasto por categoría, restante): sin fuente primaria -> (sin verificar; validar con entrevistas propias)
- Patrón sin gamificación: resumen del mes (total, top 5 categorías, vs mes anterior, N sin categorizar, N estimados por confirmar)
- Ritual sugerido (derivado de YNAB): 1) vaciar inbox, 2) confirmar estimados, 3) revisar top categorías, 4) ajustar reglas nuevas

---

## 7. Accesibilidad y localización

- es-MX: separador decimal punto, agrupación coma, símbolo `$`, código MXN, símbolo antes del monto (ej. `$1,234.50`) -> https://www.localeplanet.com/icu/es_MX/ y https://cgit.freebsd.org/src/tree/share/monetdef/es_MX.ISO8859-1.src
- Caveat: hilo CLDR-users 2019 indica que el XML es-MX heredaba de `es`; el JSON sí define símbolos; verificar en versión actual -> https://corp.unicode.org/pipermail/cldr-users/2019-February/000913.html
- Parsear entrada: aceptar `,` y `.` y espacios; el keypad `decimal` usa el separador del locale -> https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode
- Apple HIG: el formato numérico varía de forma significativa por locale -> https://developer-mdn.apple.com/design/human-interface-guidelines/components/selection-and-input/text-fields
- Fechas: mostrar mes escrito ("10 oct 2026"), evitar solo dd/mm -> https://www.nngroup.com/articles/date-input/
- Dark mode: Cashew soporta light/dark y Material You -> https://github.com/jameskokoska/Cashew; `prefers-color-scheme` (no consultado, sin verificar)
- Tamaño de texto grande: usar `rem`/`dvh`, probar a 200% (WCAG 1.4.4, no consultado, sin verificar)
- Objetivos táctiles: ver sección 2 (NN/g, WCAG 2.5.8)
- Errores: no depender solo del color; icono + texto -> https://www.nngroup.com/articles/errors-forms-design-guidelines/
- Etiquetas: no usar placeholder como label (bajo contraste) -> https://design.cms.gov/components/text-field/text-field/ (resultado de búsqueda; sin verificar en página)

---

## 8. Keywords

### Español
- captura rápida de gastos, registro de gasto en un paso, teclado numérico para monto
- categorías vs etiquetas, categoría sin clasificar, dividir gasto / split
- reglas de categorización, normalizar comercio, "contiene" en descripción
- conciliación bancaria, importar estado de cuenta CSV/OFX, duplicados, clave de rastreo SPEI
- gasto estimado vs confirmado, tipo de cambio, pendiente vs liquidado
- revisión mensual de gastos, rutina presupuestal, formato es-MX, MXN

### English
- amount-first entry, numeric keypad, quick add, expense templates, favorites
- smart defaults, payee default category, category learning
- progressive disclosure, inline validation, thumb zone, touch target size
- review inbox, needs review, bulk edit, keyboard shortcuts
- match imported transactions, duplicate detection, fuzzy matching, reconcile, cleared/uncleared
- transaction rules, merchant normalization, imported payee, split transaction
- pending vs posted, foreign currency, FX rate, Intl.NumberFormat
- web app manifest shortcuts, share_target, visualViewport, interactive-widget, inputmode, enterkeyhint

---

## 9. Decisiones sugeridas para v1

- Formulario: monto con `inputmode="decimal"` + chips de categoría recientes + botón guardar anclado; resto bajo "Más"
- Fecha: chips Hoy/Ayer/Otra; hora implícita "ahora" editable
- Guardar sin confirmación, snackbar con Deshacer
- Reglas: `contains` (case-insensitive) + orden manual; guardar `raw_description` aparte
- Import: inbox con estado `to_review`, match por monto+ventana de fechas, mostrar motivo de la sugerencia
- Montos: `status` estimado/confirmado con etiqueta visible y totales separados
- PWA: `shortcuts` hacia `/add`, `share_target` opcional (soporte limitado)

---

## Huecos de cobertura

- Fuentes primarias no obtenidas: Material Design 3 (text fields, snackbar), Apple HIG en vivo, páginas de ayuda de Monarch (403), docs de Firefly (categories/tags 404), Spendee y Wallet (help center), Play Store de Money Manager (truncado), PDF INEGI sin leer.
- Sin verificar por falta de fuente: captura por notificación/SMS, voz/NLP, UI de "confidence", offline feedback, qué consultan realmente los usuarios, patrones de etiquetado estimado/confirmado en apps reales, categorías mexicanas (tianguis, gasolina, súper).
- Efecto en historial de renombrar/fusionar categorías: ninguna doc lo declara; requiere decisión de diseño propia (IDs estables) y pruebas.
