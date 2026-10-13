# 03 - Contexto México para un tracker de finanzas personales

Fecha de investigación: 2026-10-10. Método: búsquedas web + fetch de páginas oficiales cuando fue posible.
Convención: **(sin verificar)** = no confirmado con fuente primaria; **(fuente secundaria)** = blog/vendor/medio.

## Contenido
1. [Open banking / open finance en México](#1-open-banking--open-finance-en-méxico)
2. [Agregadores bancarios](#2-agregadores-bancarios)
3. [Formatos de estado de cuenta / export por banco](#3-formatos-de-estado-de-cuenta--export-por-banco)
4. [Tipos de cambio](#4-tipos-de-cambio)
5. [Conceptos de dinero específicos de México](#5-conceptos-de-dinero-específicos-de-méxico)
6. [Apps y comunidades](#6-apps-y-comunidades)
7. [Datos personales: LFPDPPP](#7-datos-personales-lfpdppp)
8. [Keywords para profundizar](#8-keywords-para-profundizar)
9. [Huecos de cobertura](#huecos-de-cobertura)

---

## 1. Open banking / open finance en México

- Base legal: Ley Fintech (Ley para Regular las Instituciones de Tecnología Financiera, 2018), art. 76: obliga a entidades a establecer APIs estandarizadas para compartir 3 capas: datos abiertos, datos agregados, datos transaccionales. Texto: https://sdv.com.mx/compendio/ley-para-regular-las-instituciones-de-tecnologia-financiera/articulo-76/ (fuente secundaria, compendio)
- Capa 1 "datos abiertos" (ubicación de ATM/sucursales, productos, comisiones): disposiciones CNBV publicadas en DOF 2020-06-04, vigentes 2020-06-05. https://www.hklaw.com/es/insights/publications/2020/07/open-banking-has-arrived-in-mexico ; https://www.whitecase.com/sites/default/files/2020-06/secondary-regulations-relating-standardized-application-programming-interfaces-spa.pdf
- Banxico: Circular 2/2020 (DOF 2020-03-10), reglas de APIs, aplica solo a SIC (burós de crédito) y cámaras de compensación. https://basham.com.mx/circular-2-2020-primeras-reglas-secundarias-referentes-al-open-banking/ ; https://dplnews.com/banco-de-mexico-publica-reglas-para-la-banca-abierta-de-la-ley-fintech/
- Capas 2 (agregados) y 3 (transaccionales, las que importan para un tracker personal): sin reglas secundarias publicadas, "sin cronograma oficial", años de retraso sobre el plazo legal. https://www.fiskil.com/es/open-finance/mexico (vendor, fuente secundaria; no hallé nota oficial CNBV/Banxico que lo confirme ni lo contradiga)
- Consentimiento: el dato transaccional solo se compartiría con consentimiento previo y expreso del cliente (según el mismo vendor).
- Lo que realmente está disponible a un desarrollador individual: **no hay API pública de transacciones de bancos mexicanos para personas** (conclusión, basada en lo anterior). Opciones reales: export manual (sección 3), agregadores comerciales (sección 2), captura manual, notificaciones/emails del banco (sin verificar).
- Contraste: Brasil sí tiene Open Finance operativo; México no (conclusión de fuente secundaria).
- Sitio CNBV Open Finance: https://www.cnbv.gob.mx/Paginas/Open-Finance.aspx (fetch falló: error de certificado; no verificado)

## 2. Agregadores bancarios

Hallazgo transversal: ninguno ofrece tier gratuito de producción documentado para uso personal. Todos son B2B.

| Agregador | Cobertura MX | Modelo / precio | Uso personal | Método | Fuente |
|---|---|---|---|---|---|
| Belvo | Bancos MX + SAT (fiscal) + gig platforms; "60+ instituciones" (nota de prensa 2021-23, sin fecha verificada) | Sandbox gratis "solo pruebas/evaluación"; Launch 1,000 USD/mes; Growth a medida; producción requiere plan de pago (la página se contradice: lista "Production environment" en Sandbox pero la nota al pie dice que producción es de pago). Un listado de terceros habla de "25 live links" en plan Test (sin verificar) | Solo sandbox; producción no es viable gratis | Mixto no documentado: credenciales (scraping) vs API directa (sin verificar por banco) | https://belvo.com/plans-and-pricing/ |
| Finerio Connect | Marketing: "+120 clientes en México y LATAM"; lista de bancos no publicada en su home | No publicado; contacto comercial | Sin acceso self-serve visible | (sin verificar) | https://finerioconnect.com/ |
| Fintoc | México: producto principal = pagos (SPEI, CLABE virtuales, cargos recurrentes). Open banking data en MX no mencionado en su página MX | No publicado en la página; docs mencionan sección "Fintoc fees" y planes que cambian frecuencia de actualización de movimientos (docs requieren login, fetch redirigió) | Sin evidencia | Credenciales/widget (sin verificar) | https://fintoc.com/mx ; https://docs.fintoc.com/docs/movements/overview-data-aggregation |
| Syncfy (ex Paybook) | Bancos MX, SAT (CIEC/FIEL), RENAPO/INE; cifras discrepantes ("125+ instituciones" vs "92 integraciones") | No publicado | Sin evidencia de tier gratis | Credenciales/scraping (SAT por CIEC/FIEL) | https://www.syncfy.com/blog/?p=87 (2019) |
| Plaid | Cobertura MX no confirmada en búsquedas; página global no consultada con éxito | - | - | - | https://plaid.com/global/ (sin verificar) |
| Otros | Listado comparativo "6 plataformas con cobertura MX" | - | - | - | https://openbankingtracker.com/api-aggregators?country=MX (HTTP 429, no leído) |

- Credential scraping: implica entregar usuario/contraseña del banco a terceros; riesgo y posible violación de términos del banco (concepto general, sin fuente puntual).
- Alternativa gratuita sin agregador: SAT descarga masiva de CFDI (portal SAT, FIEL) para facturas recibidas/emitidas (sin verificar en esta investigación).

## 3. Formatos de estado de cuenta / export por banco

Hallazgo transversal: casi todo es **PDF**; CSV/Excel nativo es raro en banca personal. Terceros convierten PDF a Excel (SATfácil, etc.) pero implica subir datos bancarios a un servicio externo.

| Banco/wallet | Qué se verificó | Estado | Fuente |
|---|---|---|---|
| BBVA MX | Estado de cuenta en PDF (web/app, hasta 10 años, con elementos fiscales: folio fiscal, sello SAT). CSV/Excel no mencionado | PDF verificado; CSV no | https://www.bbva.com/es/mx/en-bbva-se-puede-obtener-un-estado-de-cuenta-sin-llamar-o-salir-de-casa/ |
| Banorte | Consulta de movimientos en banca en línea: botón "Exportar" a .txt o "excel (csv)" | TXT + CSV verificado (manual oficial; fecha del PDF no visible) | https://www.banorte.com/dam/jcr:6ec65099-6bf8-418c-80e0-64a2b9dc0eb6/Consulta_de_movimientos.pdf |
| Santander MX | Sin fuente oficial hallada | (sin verificar) | - |
| HSBC MX | Existe guía oficial de descarga de estados de cuenta (PDF, modificado 2022-11); contenido no extraíble por fetch | (sin verificar) formatos | https://www.hsbc.com.mx/content/dam/hsbc/mx/documents/digital/estados-de-cuenta/descarga_estados_cuenta.pdf |
| Banamex/Citi | Banca Net **empresarial**: movimientos en TXT o Excel CSV. Personas: sin verificar | Empresarial verificado; personal (sin verificar) | https://www.banamex.com/resources/bancanets/bne/esp/contenedor/Movimientos.htm |
| Scotiabank MX | Solo guías de Canadá (PDF; CSV en ScotiaConnect empresarial) | (sin verificar) para MX | - |
| Nu MX | Estados de cuenta de tarjeta de crédito en app (historial desde activación); sin CSV documentado | PDF probable; CSV no | https://blog.nu.com.mx/consultar-tu-estado-de-cuenta-en-la-app-nu/ |
| Mercado Pago | Reportes de actividad/cobros en .csv y .xlsx (hasta 1 año por solicitud, .zip si es grande, generación asíncrona, programable vía API). Orientado a vendedores/integraciones | CSV/XLSX verificado | https://www.mercadopago.com.mx/developers/es/docs/reports/activities-reports/generate ; https://www.mercadopago.com.mx/blog/descargar-reportes-de-cuenta-para-contador |
| Revolut MX | Estado por divisa desde la app, PDF o Excel; un documento por divisa | PDF+Excel verificado | https://help.revolut.com/es-MX/help/profile-and-plan/managing-my-account/account-statement-per-chosen-currency/ |
| Hey Banco, Klar, Stori, Spin/Oxxo, Rappi Card | Sin resultados | (sin verificar) | - |

- CFDI de estado de cuenta: los bancos timbran un CFDI por estado de cuenta, pero el XML solo contiene conceptos que son ingreso del banco (comisiones, intereses cobrados), NO los movimientos. Los intereses pagados y el ISR retenido van por declaración informativa (constancia de retenciones). https://www.elfinanciero.com.mx/monterrey/2023/05/23/mario-alberto-cedillo-peculiaridades-del-cfdi-del-estado-de-cuenta-bancario/ (fuente secundaria; no hallé la norma SAT original)
- OFX/QIF: no hallé evidencia de soporte en bancos MX (sin verificar).
- Estado de Cuenta Universal (CONDUSEF) como estructura estandarizada: ejemplo en https://sinembargo.mx/wp-content/uploads/2024/11/Estado-de-Cuenta-Universal.pdf (sin verificar normatividad).
- Implicación de diseño: parser de PDF por banco + import CSV genérico con mapeo de columnas + captura manual.

## 4. Tipos de cambio

### Banxico SIE API (fuente primaria, gratis)
- Intro: https://www.banxico.org.mx/SieAPIRest/service/v1/
- Token: obligatorio, 64 caracteres, se solicita en el sitio (endpoint `/SieAPIRest/service/v1/token`); se envía en header `Bmx-Token` o parámetro `token`. TLS 1.3 obligatorio desde 2023-03-24.
- Límites (https://www.banxico.org.mx/SieAPIRest/service/v1/doc/limiteConsultas):
  - Consultas oportunas/metadatos: máx 80 por minuto.
  - Históricas: máx 200 por 5 minutos.
  - Diario: 40,000 oportunas; 10,000 históricas.
  - Límite de series por consulta: no indicado en la página.
- Series (https://www.banxico.org.mx/SieAPIRest/service/v1/doc/catalogoSeries):
  - `SF43718` Pesos por dólar, FIX.
  - `SF60653` Pesos por dólar, fecha de liquidación.
  - Serie del DOF / interbancario: **no listadas** en el catálogo consultado; un código `SF43773` mencionado en memoria es (sin verificar). El FIX es el valor que se publica en el DOF.
- Términos de uso ("Salvedad de uso"): URL `/doc/salvedadUso` redirigió a `anterior.banxico.org.mx` y dio 404; no leídos.
- Página humana de tipos de cambio: https://www.banxico.org.mx/tipcamb/llenarTiposCambioAction.do?idioma=sp ; "para solventar obligaciones": https://www.banxico.org.mx/tipcamb/tipCamMIAction.do
- Cliente comunitario PHP: https://github.com/Xint0/banxico-php (referencia de endpoints).

### Tipos de cambio (conceptos)
- **FIX**: determinado por Banxico en días hábiles bancarios como promedio de cotizaciones de mercado mayorista (plataformas electrónicas) para operaciones liquidables a 2 días hábiles; se publica desde ~12:00; en el **DOF** al día hábil bancario siguiente. Base: Circular 3/2012 Banxico, Título Tercero, Cap. V. Fuente: https://www.banxico.org.mx/tipcamb/tipCamMIAction.do
- **DOF**: es la publicación del FIX; para obligaciones en USD pagaderas en México se usa el publicado en el DOF el día hábil bancario inmediato anterior. Mismo enlace.
- **Fecha de liquidación**: valor para operaciones que liquidan (serie SF60653).
- **Interbancario / spot / mayorista**: cotización entre bancos; no es el que ve el usuario final.
- **Compra / venta (ventanilla)**: tipo que cada banco/casa de cambio aplica al cliente; varía por entidad. Spread incluido. (conceptual)
- Para tracker: guardar por transacción `monto_origen`, `moneda`, `tipo_cambio_usado`, `tipo_tipo_cambio` (fix/banco/tarjeta), `fecha_tc`.
- Tarjetas: el banco emisor aplica su propio tipo de cambio + comisión por uso en el extranjero (sin verificar cifras).

### Otras fuentes gratis
| Fuente | Key | Límites / términos | Fuente |
|---|---|---|---|
| Frankfurter (`api.frankfurter.dev/v2`) | No | Rate-limited, sin cuota mensual/diaria; open source, autohospedable; 223 monedas, 104 bancos centrales/fuentes; histórico desde 1948; actualización diaria. MXN no nombrado explícitamente, verificar `/v2/currencies` | https://frankfurter.dev |
| open.er-api.com (ExchangeRate-API open access) | No | Actualiza 1 vez al día; pide atribución ("Rates By Exchange Rate API"); pedir máx. 1/hora; 429 al exceder; cache permitido, **redistribución no**; 161 monedas (MXN no confirmado) | https://www.exchangerate-api.com/docs/free |
| exchangerate.host | - | Fetch/verificación no realizada; historial de cambios a modelo con key (sin verificar) | - |
| Banxico SIE | Token | ver arriba | arriba |

- Recomendación: Banxico SIE como fuente primaria para USD/MXN (oficial, FIX); Frankfurter para otras monedas.

## 5. Conceptos de dinero específicos de México

### Tarjeta de crédito
- **Fecha de corte**: cierre del periodo; consumos posteriores van al siguiente periodo.
- **Fecha límite de pago**: último día para pagar sin mora; distinta de la de corte.
- **Pago mínimo**: evita atraso pero genera intereses.
- **Pago para no generar intereses**: saldo total de consumos a pago normal + parcialidades MSI del mes.
- Financiamiento "hasta ~50 días" comprando justo después del corte (fuente secundaria).
- Fuente: https://www.banorte.com/cms/CONDUSEF/2023/octubre/Art-Tu-tarjeta-de-credito-Aliada-o-Pesadilla.pdf ; comparador CONDUSEF: tarjetas.condusef.gob.mx ; guía: https://www.dedinero.com.mx/servicios/estado-de-cuenta-de-tarjeta-de-credito-guia-completa-para-entender-fechas-de-corte-y-pago/
- Modelar: ciclo (corte, límite), saldo a corte, pago mínimo, pago no-intereses, límite de crédito, tasa/CAT (CAT = Costo Anual Total, concepto Banxico/CONDUSEF).
- **MSI (meses sin intereses)**: compra diferida en N parcialidades sin interés; cada parcialidad cuenta dentro del "pago para no generar intereses"; ocupa línea de crédito por el total. Modelar como plan de pagos con N cuotas, no un gasto único (decisión de diseño: reconocer gasto en fecha de compra vs. flujo mensual).
- **MCI** (meses con intereses) y **diferidos**: (sin verificar en esta ronda).
- Recompensas/cashback/puntos: (sin verificar).

### Transferencias y pagos
- **SPEI**: sistema de transferencias interbancarias de Banxico; 24/7; **CLABE** de 18 dígitos.
- **CEP** (Comprobante Electrónico de Pago): comprobante Banxico, PDF/HTML, disponible hasta 30 min después, estados en proceso/liquidado/rechazado/cancelado; incluye clave de rastreo. https://www.xataka.com.mx/otros-1/pocos-saben-mexico-se-puede-saber-estado-transferencia-asi-funciona-cep
- **CoDi** (QR) y **DiMo** (transferencia por número celular, 2023): sobre SPEI. https://www.elfinanciero.com.mx/mis-finanzas/2023/08/13/spei-codi-y-dimo-banxico-diferencias-en-herramientas-de-transferencias-elecronicas/
- Tipos de cuenta: cheques, nómina, débito, ahorro, inversión; **cuenta CLABE** virtual de wallets.

### Ingreso y laboral
- **Aguinaldo**: mínimo 15 días de salario, pagadero antes del 20 de diciembre; proporcional si <1 año (LFT art. 87). https://sdv.com.mx/recursos/aguinaldo-ley-federal-del-trabajo/ . Iniciativa para subir a 20 días: sin evidencia de aprobación.
- **PTU** (reparto de utilidades, 10%, art. 117 LFT): plazos (30 mayo personas morales / 30 junio personas físicas) **(sin verificar)**.
- **Nómina**: recibo con percepciones, deducciones, ISR retenido, cuotas IMSS (conceptos; detalle sin verificar). Recibo de nómina es un CFDI.
- **Retenciones ISR**: sobre sueldos, honorarios, intereses (CETES: retención provisional 0.50% anual sobre saldo promedio en 2026, fuente secundaria https://www.richify.ai/es/mx/glossary/cetesdirecto).
- **Vales de despensa**: (sin verificar en esta ronda) saldo en tarjeta separada (Sodexo/Edenred/Pluxee).

### Impuestos y CFDI
- **CFDI/factura**: comprobante fiscal digital (XML, versión vigente 4.0 sin verificar). Para persona física que no es contribuyente, la factura sirve sobre todo para **deducciones personales** (declaración anual).
- **Deducciones personales** (LISR art. 151): médicas/dentales/psicología/nutrición, hospitalización, lentes, funerarios, donativos, intereses reales de créditos hipotecarios, colegiaturas (topes por nivel), primas de seguros de gastos médicos, aportaciones complementarias de retiro, transporte escolar. Requisitos: CFDI válido + pago bancarizado (tarjeta, transferencia, cheque nominativo; efectivo no). Tope global: lo menor entre 5 UMA anuales y 15% de ingresos; cifras UMA 2026 discrepan entre fuentes (42,794.64 vs 43,794.64 MXN anuales) **(sin verificar)**. RESICO PF no puede aplicarlas (fuente secundaria). https://www.adn40.mx/finanzas/2026-02-28/declaracion-anual-2026-deducciones-que-valen-topes-requisitos-sat/ ; https://facturama.mx/blog/que-significa/deducciones-personales/
- Modelar por gasto: `es_deducible`, `categoria_deduccion`, `tiene_cfdi`, `uuid_cfdi`, `forma_pago`, `rfc_emisor`.
- Declaración anual: abril (ejercicio previo) (confirmado indirectamente por fuente secundaria).

### Ahorro e inversión
- **CETES / CETESDirecto**: valores gubernamentales (operado por Nafin), plazos 28, 91, 182, 364 días (728 mencionado por una fuente, sin verificar); sin comisión; tasa cambia en subasta semanal. https://www.cetesdirecto.com.mx ; https://financera.mx/inversion/como-invertir-en-cetes/ (secundaria)
- **Afore**: cuenta individual de retiro, regulada por CONSAR; **aportaciones voluntarias**, deducibles dentro de deducciones personales. Búsqueda no devolvió fuente; (sin verificar). https://www.gob.mx/consar
- **Apartados/bolsillos de neobancos** (Nu "cajitas", Mercado Pago, Hey Banco, Klar): subcuentas con rendimiento; sin verificar por banco. Modelar como sub-cuentas con saldo propio (no gasto).
- **SOFIPO / IPAB**: protección de depósitos (IPAB cubre bancos hasta 400,000 UDI; SOFIPO tiene cobertura distinta) (sin verificar).
- **UDI/UMA/INPC/TIIE**: indicadores en SIE Banxico/INEGI; UMA actualiza cada febrero (sin verificar fecha).

## 6. Apps y comunidades

### Apps (fuente: artículos de medios, no oficiales)
| App | Nota | Fuente |
|---|---|---|
| Finerio (app personal) | Mexicana, categoriza gastos y presupuestos, gratis; nació como PFM en 2016, de ahí Finerio Connect (2020) | https://www.provenir.com/marketplace/finerio-connect/ ; https://www.elimparcial.com/dinero/2025/02/26/las-mejores-aplicaciones-financieras-para-optimizar-tu-presupuesto-en-2025/ |
| Fintonic | Sincroniza cuentas bancarias; disponibilidad en MX (sin verificar) | https://www.pluxee.mx/blog/las-5-mejores-apps-para-finanzas-personales-y-control-de-gastos/ |
| Monefy | Entrada manual, export Excel/CSV | idem |
| Wallet (BudgetBakers) | Manual o conexión bancaria; reportes | idem |
| Spendee | Gastos compartidos | idem |
| Hojas de cálculo | Alternativa común (sin verificar cifras) | - |

### Comunidades
| Comunidad | URL | Foco | Actividad |
|---|---|---|---|
| r/MexicoFinanciero | https://www.reddit.com/r/MexicoFinanciero/ | Inversión, tarjetas, deudas, SAT; tiene wiki/FAQ | ~427k miembros según GummySearch (terceros, https://gummysearch.com/r/MexicoFinanciero ) |
| r/MexicoBursatil | https://www.reddit.com/r/MexicoBursatil/ | Bolsa e inversión | ~30k según GummySearch |
| Rankia México (foro) | https://www.rankia.mx | Bolsa, fondos, finanzas | (sin verificar actividad actual) |
| Cooltura Financiera (YouTube) | (canal, URL no verificada) | Finanzas básicas | Activo reportado |
| Pequeño Cerdo Capitalista (Sofía Macías, YouTube + blog) | (URL no verificada) | Ahorro, inversión, crédito | Listas de 2021, verificar |
| Eduardo Rosas (YouTube) | (URL no verificada) | Finanzas personales | idem |
| Kardmatch (Joel Cortés) | (URL no verificada) | Tarjetas, créditos | idem |
| Perro Dinero (Substack) | https://perrodinero.substack.com | Recursos curados | (sin verificar) |

- Listas de canales: https://financera.mx/finanzas-personales/youtube-aprender-finanzas-personales-en-mexico/ ; https://www.sopitas.com/mientras-tanto/7-canales-youtube-videos-cuidar-finanzas-personales/amp/
- Telegram: no se encontraron grupos (sin verificar).
- Comunidades dev/open banking MX: no investigadas.

## 7. Datos personales: LFPDPPP

- **Nueva LFPDPPP** publicada en DOF 2025-03-20, en vigor 2025-03-21; abroga la ley de 2010. https://www.hoganlovells.com/es/publications/mexicos-new-federal-data-protection-law-what-it-means-for-companies ; https://www.garrigues.com/es_ES/noticia/mexico-nueva-ley-federal-proteccion-datos-personales-posesion-particulares-introduce
- **INAI** desapareció (reforma constitucional 2024-12-20); funciones pasan a la **Secretaría Anticorrupción y Buen Gobierno**. https://idconline.mx/corporativo/2025/04/02/que-asumio-la-secretaria-anticorrupcion-tras-la-desaparicion-del-inai
- Conceptos: responsable, titular, encargado, **aviso de privacidad** (disponible desde la recolección), consentimiento libre/específico/informado, derechos **ARCO** (acceso, rectificación, cancelación, oposición), datos sensibles, transferencias, medidas de seguridad.
- Principios/derechos/sanciones se mantienen en gran parte respecto a 2010 (fuente secundaria: https://basham.com.mx/en/iniciativa-en-materia-de-transparencia-y-proteccion-de-datos-personales/).
- Datos financieros: la ley tiene regla específica para datos patrimoniales/financieros (consentimiento expreso en la ley de 2010, art. 8, sin verificar en la nueva). No se obtuvo análisis específico para datos financieros.
- Relevancia: uso estrictamente personal/doméstico queda fuera (concepto general, sin verificar texto); aplica al pasar a producto con terceros.
- Si se usa agregador/CNBV: Ley Fintech añade deberes propios (sin verificar).
- Otros: secreto bancario/financiero (Ley de Instituciones de Crédito art. 142, sin verificar), PCI-DSS si se tocan tarjetas (sin verificar).

## 8. Keywords para profundizar

Español:
- "banca abierta" México, "open finance" México CNBV, "Ley Fintech artículo 76", "disposiciones de carácter general APIs estandarizadas", "datos transaccionales" "datos agregados", "Circular 2/2020 Banxico", "Circular 3/2012 Banxico", "ITF CNBV autorización agregador", "Sociedad de Información Crediticia"
- "SIE Banxico API token", "tipo de cambio FIX SF43718", "DOF tipo de cambio para solventar obligaciones", "tipo de cambio interbancario"
- "estado de cuenta CFDI banco", "constancia de retenciones intereses", "descarga masiva CFDI SAT", "Anexo 20 CFDI 4.0", "RESICO personas físicas", "declaración anual deducciones personales art. 151"
- "meses sin intereses estado de cuenta", "pago para no generar intereses", "CAT costo anual total", "SPEI CEP rastreo", "CoDi DiMo", "CLABE interbancaria", "cuenta CLABE virtual"
- "aguinaldo art. 87 LFT", "PTU", "AFORE aportaciones voluntarias deducibles", "CETESDirecto subasta", "SOFIPO IPAB"
- "aviso de privacidad modelo", "LFPDPPP 2025", "Secretaría Anticorrupción y Buen Gobierno datos personales", "derechos ARCO"
- "convertir estado de cuenta PDF a Excel" (ecosistema de parsers locales)

English:
- Mexico open banking status, Mexico Fintech Law API, Belvo / Syncfy / Finerio Connect / Fintoc, "bank statement parser Mexico", "Banxico SIE REST API Python", "MXN exchange rate API free", "multi-currency personal finance local-first", "Actual Budget / Firefly III / Beancount Mexico" (alternativas OSS; no investigadas)
- "Plaid Mexico coverage", "open banking tracker Mexico", "CFDI 4.0 parser XML library"

## Huecos de cobertura

- Estado oficial vigente (2025-2026) de reglas CNBV/Banxico para capas agregada y transaccional: solo fuente vendor (Fiskil); sin DOF/CNBV directo. CNBV falló por certificado.
- Formatos de export de Santander, HSBC, Scotiabank, Banamex personas, Nu (débito), Hey Banco, Klar, Stori, Spin/Oxxo, Rappi Card: sin fuente oficial. OFX/QIF sin evidencia. Falta probar con cuentas reales.
- Pricing/sandbox/cobertura real de Finerio Connect y Fintoc MX data; Plaid MX; Syncfy: docs requieren login o no publican precios. exchangerate.host no verificado. Términos de uso de Banxico SIE (salvedad) y series DOF/interbancario no obtenidos.
- Sin verificar: PTU fechas, Afore/CONSAR, vales de despensa, apartados de neobancos, MCI/diferidos, tope de deducciones (UMA discrepante), SAT descarga masiva, Telegram/YouTube URLs exactas y actividad, LFPDPPP específico para datos financieros y exención de uso doméstico.
