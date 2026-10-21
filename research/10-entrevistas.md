# 10 - Rondas de entrevista

Origen: sección 7 de [09-benchmark-top5.md](09-benchmark-top5.md) y el backlog [08-backlog.md](08-backlog.md). Vocabulario: [CONTEXT.md](../CONTEXT.md) (Movimiento, Gasto, Cuenta, Estado de conversión, Emparejamiento, Categoría, Etiqueta, Regla de categorización).

Estado: guion listo, sin respuestas. Las propuestas por defecto son hipótesis nuestras, no hechos: sirven para responder "sí/no" rápido y registrar solo las diferencias.

## Índice

- [Cómo usar este guion](#cómo-usar-este-guion)
- [Ronda 1: línea base y migración](#ronda-1-línea-base-y-migración)
- [Ronda 2: captura diaria](#ronda-2-captura-diaria)
- [Ronda 3: modelo de datos](#ronda-3-modelo-de-datos)
- [Ronda 4: importación y emparejado](#ronda-4-importación-y-emparejado)
- [Ronda 5: moneda, respaldo y privacidad](#ronda-5-moneda-respaldo-y-privacidad)
- [Ronda 6: producto y alcance](#ronda-6-producto-y-alcance)
- [Registro de decisiones](#registro-de-decisiones)

## Cómo usar este guion

- Una ronda por sesión, de 20 a 30 minutos. El orden importa: cada ronda desbloquea la siguiente.
- Por pregunta: se lee la propuesta por defecto; si no hay objeción se registra "acepto" y se pasa a la siguiente.
- Quien responde: el dueño del producto en las rondas 1 a 5. La ronda 6 y la pregunta 4 mejoran si participa alguien del círculo cercano (objetivo declarado en el backlog).
- Antes de cada ronda, tener a la mano los estados de cuenta reales de F0-1; las respuestas sobre importación sin ellos serán especulación.
- Lo respondido se vuelca en [Registro de decisiones](#registro-de-decisiones) y de ahí a `08-backlog.md` (IDs nuevos o cambios).

---

## Ronda 1: línea base y migración

Objetivo: saber qué se reemplaza de verdad y qué trae Money Manager al nuevo sistema.
Desbloquea: alcance de v1 y un posible importador de historial (brecha 1 del benchmark).

| # | Pregunta | Propuesta por defecto | Afecta |
|---|---|---|---|
| 1 | ¿Cuántos años y registros de Money Manager quieres traer, y cómo los exportas hoy (Excel, TSV o archivo de respaldo)? | Traer todo el historial disponible, una sola vez, desde Excel/TSV | nuevo ID de importador; V1-21 |
| 2 | ¿Los ingresos y transferencias históricos se importan aunque v1 solo muestre gastos, o se descartan? | Importarlos y guardarlos con su tipo, sin mostrarlos en v1 | V1-7, P2-5 |
| 3 | ¿Qué de Money Manager usas de verdad: calendario, favoritos, presupuesto por mes, subdivisas, doble partida? | Lo que no uses hoy no entra a v1 | alcance v1 |
| 8 | ¿Qué dispositivo usas a diario (Android o iOS)? | Android | P3-5, F0-4, F0-5 |
| 29 | ¿Algún banco distinto a BBVA crédito entra en la primera versión? | No; solo BBVA crédito, con parsers por banco como plugin | V1-20, P2-1 |

## Ronda 2: captura diaria

Objetivo: fijar el costo en toques del flujo principal.
Desbloquea: diseño de V1-1 a V1-5.

| # | Pregunta | Propuesta por defecto | Afecta |
|---|---|---|---|
| 4 | ¿Cuántos gastos registras al día y cuántos toques es tu límite? | Hasta 3 toques con defaults (V1-1) | V1-1 |
| 5 | ¿Obligatorio solo el monto, o monto y categoría? ¿"Sin categoría" es válido y se resuelve al revisar lo *por revisar*? | Solo el monto es obligatorio; "sin categoría" válido | V1-1, V1-15 |
| 6 | ¿La Cuenta por defecto es la última usada, la más frecuente para esa categoría o la que fijes por comercio? | Última usada | V1-1 |
| 7 | ¿Necesitas "guardar y capturar otro" y favoritos o plantillas en v1, o bastan los recientes? | Solo recientes y frecuentes (V1-3) | V1-3 |

## Ronda 3: modelo de datos

Objetivo: cerrar los casos del estado de cuenta que no son un Gasto simple.
Desbloquea: esquema de Movimiento y Cuenta (V1-6 a V1-10); brecha 2 del benchmark.

| # | Pregunta | Propuesta por defecto | Afecta |
|---|---|---|---|
| 9 | ¿Cómo quieres ver el pago de la tarjeta y los abonos del estado: ocultos como transferencia, visibles o fuera del reporte? | Se importan como Movimientos de otro tipo, fuera del resumen de gastos | V1-7, V1-27 |
| 10 | ¿Un reembolso reduce el Gasto original (enlazado) o es un Movimiento negativo suelto? | Movimiento suelto en v1; enlazar queda para después | V1-7 |
| 11 | ¿Necesitas "excluir de reportes" (gasto empresarial, reembolsable, cuenta de otra persona)? | Resolverlo con una Etiqueta, sin campo nuevo | V1-27 |
| 12 | ¿Se bloquea la moneda de una Cuenta tras su primer Movimiento, como Spendee? | Sí, se bloquea | V1-6 |
| 13 | ¿El mes del reporte es calendario, por día de pago/quincena, o por corte de cada tarjeta? | Calendario en v1; corte llega con P2-7 | V1-27, P2-7 |
| 14 | ¿Archivar Cuentas y Categorías (ocultas, con historial) basta en vez de borrar? | Sí, archivar; sin borrado | V1-9 |

## Ronda 4: importación y emparejado

Objetivo: definir qué pasa cuando el estado de cuenta se importa más de una vez, o se equivoca.
Desbloquea: V1-14 a V1-20; brechas 3 y 4 del benchmark.

| # | Pregunta | Propuesta por defecto | Afecta |
|---|---|---|---|
| 15 | Si borras un Gasto importado y reimportas el mismo estado, ¿debe reaparecer o recordar el descarte? | Recordar el descarte | V1-17, nuevo ID |
| 16 | ¿Qué tolerancia aceptas para proponer un Emparejamiento USD: ±N días y ±X % de monto sobre el estimado? | ±3 días y ±5 % (YNAB usa 10 días y monto exacto; ajustar con datos reales) | V1-19 |
| 17 | Lo importado entra *por revisar* (V1-15). ¿Quieres poder deshacer un lote completo (rollback), o basta descartar por línea? | Deshacer el lote completo además de descartar por línea | V1-15, V1-28 |
| 18 | ¿Guardar siempre el texto original del banco junto al nombre limpio, aunque dupliques datos? | Sí, siempre | V1-16, nuevo ID |
| 19 | ¿Las Reglas de categorización aplican a Movimientos manuales, a importados o a ambos, y solo a nuevos o también al histórico? | Solo importados y nuevos; aplicar al histórico a petición | V1-16 |
| 20 | ¿Aprobación por swipe tipo tarjetas (YNAB iOS) o por lista con selección múltiple? | Lista con selección múltiple (V1-15) | V1-15 |

## Ronda 5: moneda, respaldo y privacidad

Objetivo: fijar la fuente del tipo de cambio y qué protección exige el respaldo.
Desbloquea: V1-11 a V1-13, V1-21 a V1-23; brecha 5 del benchmark.

| # | Pregunta | Propuesta por defecto | Afecta |
|---|---|---|---|
| 21 | ¿Qué FIX usas para el estimado: el del día de la compra o el último publicado? Un cargo en fin de semana no tiene FIX propio. | El último FIX publicado antes de la fecha | V1-11, P2-9 |
| 22 | ¿Aceptas una fuente de respaldo no Banxico si Banxico falla, marcándolo en el Estado de conversión? | Sí, marcado como fuente alterna | V1-11, V1-12 |
| 23 | ¿El JSON de respaldo debe cifrarse con contraseña desde v1? ¿Dónde lo guardas: Drive, iCloud o local? | Cifrado opcional con contraseña; guardado local | V1-21, P3-2 |
| 24 | ¿Bloqueo de app y ocultar montos son requisito de v1, o P3-2 es suficiente? | P3-2 es suficiente | P3-2 |
| 25 | ¿Telemetría y reportes de fallos: ninguna, o solo locales? | Ninguna (cero servicios de pago, datos locales) | V1-25 |

## Ronda 6: producto y alcance

Objetivo: decidir qué sigue después de v1 y si el círculo cercano es un usuario real.
Desbloquea: orden de P2 a P4.

| # | Pregunta | Propuesta por defecto | Afecta |
|---|---|---|---|
| 26 | ¿Presupuesto: por Categoría con rollover o un simple límite mensual? ¿Quieres proyección tipo Wallet (gastado + programado + promedio)? | Límite mensual por Categoría, sin rollover ni proyección | P2-4 |
| 27 | ¿Reportes mínimos más allá de V1-27: calendario, comparativo con el mes anterior, búsqueda de texto? | Comparativo con el mes anterior y búsqueda de texto | V1-5, V1-27 |
| 28 | ¿Compartir con el círculo cercano significa gastos compartidos tipo Splitwise o planes personales separados (Spendee)? | Planes personales separados | P4-2, P4-3 |

---

## Registro de decisiones

Se llena durante las sesiones. "Acepto" significa que se mantiene la propuesta por defecto.

| # | Respuesta | Decisión | IDs del backlog a crear o cambiar | Fecha |
|---|---|---|---|---|
| 1 | No hay historial que migrar de Money Manager | Sin importador de historial; se usan datos mock (sintéticos) | Descarta la brecha 1 del benchmark; enlaza con F0-6 | 2026-10-20 |
| 2 | Sin objeto: no hay historial | Derivada de la 1 | Ninguno | 2026-10-20 |
| 3 | Funciones mínimas; sin recuerdo de cuáles usaba más | v1 se mantiene mínimo, sin añadir funciones de Money Manager (calendario, favoritos, subdivisas, doble partida) hasta que el uso real lo pida | Ninguno; alcance v1 sin cambios | 2026-10-20 |
| 4 | 3 toques está bien | Acepto la propuesta: hasta 3 toques con valores por defecto | V1-1 sin cambios | 2026-10-20 |
| 5 | Acepto la propuesta | Solo el monto es obligatorio; "sin categoría" es válido en gastos manuales | V1-1, V1-15 sin cambios | 2026-10-20 |
| 6 | Acepto la propuesta | Cuenta por defecto = la última usada | V1-1 sin cambios | 2026-10-20 |
| 7 | Acepto la propuesta | Solo recientes y frecuentes; sin favoritos ni plantillas en v1 | V1-3 sin cambios | 2026-10-20 |
| 8 | Android hoy; sin iPhone por ahora, con migración a iPhone prevista | Android es la plataforma de prueba; iOS se contempla en el diseño (respaldo exportable, sin dependencias solo-Android) | F0-4 y F0-5 quedan bloqueadas hasta tener un iPhone; V1-21 sirve también para migrar de Android a iPhone | 2026-10-20 |
| 9 | Acepto la propuesta | Pagos y abonos se importan como Movimientos de otro tipo, fuera del resumen de gastos, salvo reembolsos (ver #10) | V1-7, V1-27 sin cambios | 2026-10-20 |
| 10 | Acepto la propuesta | Reembolso = Movimiento suelto que resta en su Categoría el mes en que llega; el usuario lo marca al revisar (el parser no distingue pago de tarjeta de reembolso) | V1-7, V1-27; enlazar con el gasto original queda para después | 2026-10-20 |
| 11 | Acepto la propuesta | Sin campo "excluir de reportes"; se resuelve con una Etiqueta (p. ej. `reembolsable`) y filtros | V1-27 sin cambios | 2026-10-20 |
| 12 | Acepto la propuesta | La moneda de una Cuenta se bloquea tras su primer Movimiento; para otra moneda se crea otra Cuenta | V1-6 sin cambios | 2026-10-20 |
| 13 | Acepto la propuesta | Mes calendario en v1; el corte por tarjeta llega con P2-7 | V1-27, P2-7 sin cambios | 2026-10-20 |
| 14 | Acepto la propuesta | Cuentas y Categorías solo se archivan (ocultas, con historial); sin borrado | V1-9 sin cambios | 2026-10-20 |
| 15 | Acepto la propuesta | Al reimportar, recordar los descartes: las líneas borradas no reaparecen | V1-17, V1-31 | 2026-10-20 |
| 16 | Acepto la propuesta | Emparejamiento propuesto con ±3 días y ±5 % de monto sobre el estimado; valores iniciales a ajustar con estados reales (F0-1) | V1-19 sin cambios | 2026-10-20 |
| 17 | Acepto la propuesta | Deshacer el lote completo además de descartar por línea | V1-28 (ya en el backlog) | 2026-10-20 |
| 18 | Acepto la propuesta | Guardar siempre el texto original del banco junto al nombre limpio | V1-16, V1-32 | 2026-10-20 |
| 19 | Acepto la propuesta | Las Reglas de categorización aplican solo a Movimientos importados y nuevos; aplicarlas al histórico solo a petición | V1-16 sin cambios | 2026-10-20 |
| 20 | Probar ambas y decidir después si se conserva una o las dos | Construir lista con selección múltiple y swipe de tarjetas como alternativas de la misma revisión; la decisión final queda diferida | V1-15, V1-33 | 2026-10-20 |
| 21 | Acepto la propuesta | El estimado usa el último FIX publicado antes de la fecha de la compra | V1-11, P2-9 sin cambios; F0-3 sigue pendiente de verificar la serie | 2026-10-20 |
| 22 | Acepto la propuesta | Si Banxico falla, se acepta una fuente alterna de tipo de cambio, marcada como tal en el Estado de conversión | V1-11, V1-12 sin cambios | 2026-10-20 |
| 23 | Acepto la propuesta | Respaldo JSON con cifrado opcional por contraseña, guardado local | V1-21, V1-34 | 2026-10-20 |
| 24 | Acepto la propuesta | Bloqueo de app y ocultar montos no son requisito de v1; P3-2 es suficiente | P3-2 sin cambios | 2026-10-20 |
| 25 | Acepto la propuesta, con gestión interna de errores solo para el desarrollador y exportable a agentes; telemetría y reportes de fallos externos al backlog | Sin telemetría ni reportes externos en v1; registro local de diagnóstico en modo desarrollador, exportable | V1-30 (nuevo); P4-7 (nuevo) | 2026-10-20 |
| 26 | Acepto la propuesta | Presupuesto = límite mensual por Categoría, sin rollover ni proyección | P2-4 sin cambios | 2026-10-20 |
| 27 | Acepto la propuesta | Reportes mínimos de v1 además del resumen mensual: comparativo con el mes anterior y búsqueda de texto; sin calendario | V1-35, V1-36 | 2026-10-20 |
| 28 | Descartado: no se comparte; solo se registra la parte propia | Sin gastos compartidos ni planes para otras personas en el alcance previsto; en un gasto dividido se registra únicamente lo que le toca al usuario | P4-2 y P4-3 pierden justificación (sin cambios aplicados aún) | 2026-10-20 |
| 29 | Solo BBVA crédito | Acepto la propuesta: v1 con un solo banco; parsers por banco como plugin | V1-20, P2-1 sin cambios | 2026-10-20 |
