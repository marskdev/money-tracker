# 04 - Extracción de estados de cuenta (México, local-first)

Fecha de investigación: 2026-10-10. Todo lo no confirmado en fuente primaria está marcado "(sin verificar)".

## Contenido

1. [Formatos y descarga por institución](#1-formatos-y-descarga-por-institución)
2. [Proyectos open-source existentes](#2-proyectos-open-source-existentes)
3. [Técnicas de extracción local de PDF](#3-técnicas-de-extracción-local-de-pdf)
4. [Conceptos del pipeline de importación](#4-conceptos-del-pipeline-de-importación)
5. [IA/ML local vs parsing determinista](#5-iaml-local-vs-parsing-determinista)
6. [Keywords para profundizar](#6-keywords-para-profundizar)
7. [Huecos de cobertura](#huecos-de-cobertura)

---

## 1. Formatos y descarga por institución

### Resumen rápido

| Institución | PDF | XML | CSV/XLSX | Contraseña PDF | Fuente de contraseña |
|---|---|---|---|---|---|
| BBVA | sí | no confirmado | XLSX no confirmado en MX | RFC sin homoclave, mayúsculas (sin verificar, blog) | no oficial |
| HSBC | sí | sí (Banca por Internet) | no confirmado | no confirmado | - |
| Banamex | sí | sí | solo empresarial (TXT/CSV) | llave de 9-12 alfanum. definida por el usuario (correo) | oficial |
| Mercado Pago | no confirmado | no | CSV, XLSX (reportes) | n/a | oficial |
| Nu | sí (PDF, sin verificar formato exacto) | n/d | n/d | no mencionada | - |
| Santander | sí | n/d | n/d | existe, regla sin confirmar | blog |
| Banorte | sí | sí (empresas) | n/d | "suele venir con contraseña" (sin verificar) | blog |

### BBVA México

- PDF; descarga desde portal bbva.mx o app BBVA: menú Consultar > Estado de cuenta > producto > mes > descargar o enviar por correo. Hasta 10 años de historial; el PDF "cuenta con todos los requisitos fiscales". Fuente: https://www.bbva.com/es/mx/obtener-estado-cuenta-correo-electronico/
- XML: la página oficial no lo menciona (sin verificar).
- Contraseña: blog de terceros dice "RFC sin homoclave" en mayúsculas, sin distinguir persona física/moral. Fuente (no oficial): https://www.digitt.com/blog/contrasena-estado-de-cuenta-bbva . Un repo de parser lo corrobora de forma independiente (password = RFC): https://github.com/bernardogaona101/multi-bank-account-status
- Existe un plugin `ofxstatement-bbva` que menciona XLSX de "los últimos años" en el portal; el país no está claro (probablemente España) (sin verificar): https://pypi.org/project/ofxstatement-bbva/0.2
- Débito vs crédito: formatos distintos en layout (los parsers de la sección 2 los tratan como plantillas separadas: "Débito/Nómina" y "Tarjeta de crédito"). Fuente: https://github.com/Chere3/cuadra
- Texto vs imagen: PDFs de BBVA se leen con pdfplumber/pdftotext en los parsers listados, por lo que son text-based. Fuente: https://github.com/bernardogaona101/multi-bank-account-status

### HSBC México

- Estados de cuenta electrónicos en Banca por Internet: Administrar > Estados de cuenta electrónicos > Consultar; requiere código de acceso generado con Token Móvil de la app. Formato elegible: PDF o Archivo XML. Fuente: https://www.hsbc.com.mx/content/dam/hsbc/mx/documents/digital/estados-de-cuenta/descarga_estados_cuenta.pdf
- App: tarjeta de crédito en Mis cuentas > Ver estados de cuenta, confirmando con Token Móvil/biometría; hasta 12 meses (reportado por buscador sobre fuentes HSBC; guía iOS: https://www.hsbc.com.mx/content/dam/hsbc/mx/documents/digital/estados-de-cuenta/guia_estados_de_cuenta_app_ios.pdf).
- Contraseña del PDF: no encontrada en fuente oficial (sin verificar).
- Texto vs imagen: PDFs de HSBC usan fuentes CID-encoded que pdfplumber no decodifica; un parser usa Tesseract OCR para TDC (https://github.com/Perafan18/bank-statement-parser) y otro reporta "PDF con texto EBCDIC-encoded, leído sin OCR" para débito (https://github.com/Chere3/cuadra). Conclusión: HSBC es el caso difícil (sin verificar localmente).

### Banamex / Citibanamex (personal)

- BancaNet: Accesos rápidos > Estados de cuenta; elegir producto y mes; descarga PDF o XML. Tarjeta de crédito: sin NetKey. Débito, cheques, inversiones: requiere NetKey / NetKey Móvil. Hasta 12 meses en BancaNet; antes, copia en servicio al cliente. Fuente: https://www.banamex.com/es/centro-de-ayuda/servicios-digitales/estado-de-cuenta/bancanet-descargalo.htm
- App Banamex: producto > Estado de cuenta > mes > Descargar. Fuente: https://www.banamex.com/es/personas/banca-digital/estado-de-cuenta.html
- Correo: PDF protegido con llave de acceso, mínimo 9 y máximo 12 caracteres alfanuméricos, definida por el usuario en BancaNet (Configurar notificaciones) o sucursal; aplica solo a estados emitidos después del cambio. Fuente oficial: https://www.banamex.com/es/centro-de-ayuda/servicios-digitales/estado-de-cuenta/email-llave-de-acceso.htm
- Excel/CSV personal: no hay fuente oficial (sin verificar). TXT/CSV solo en Banca Net empresarial: https://www.banamex.com/resources/bancanets/bne/esp/contenedor/Estados-de-cuenta-En-Linea.htm
- Aviso: el estado electrónico "no tiene validez fiscal" según la ayuda de Banamex (resumen de buscador; sin verificar literal).

### Mercado Pago México

- No hay "estado de cuenta" PDF confirmado; hay reportes: Informes y facturación > Reportes de ventas y extractos de cuenta > Todas las transacciones > Crear Reporte > Generar; llega correo al estar listo. Fuente: https://www.mercadopago.com.mx/developers/es/docs/reports/account-money/panel
- Formatos CSV y XLSX (docs de desarrolladores, snippet de buscador): https://www.mercadopago.com.mx/developers/es/docs/woocommerce/additional-content/reports/available-money/generate (no se pudo abrir la página; sin verificar columnas ni periodo máximo).
- Blog oficial sobre reportes para contador devolvió HTTP 403 (bloqueado): https://www.mercadopago.com.mx/blog/descargar-reportes-de-cuenta-para-contador
- Nota: existe tipo de reporte "Liberaciones"; el docs dice que ya no se crean reportes de "Dinero retirado" (sin verificar fecha).
- Ventaja: CSV es el formato más fácil de importar de todas las instituciones; no requiere PDF parsing.

### Nu México

- Tarjeta de crédito: PDF por correo al corte, con CFDI; en app: Tarjeta de crédito > Estados de cuenta > periodo > NIP > descargar/compartir; disponible máximo 48 h tras el corte. Fuente: https://blog.nu.com.mx/consultar-tu-estado-de-cuenta-en-la-app-nu/
- Contraseña: no mencionada; la app pide NIP (no contraseña de PDF).
- Cuenta Nu (débito): no cubierta en la fuente (sin verificar). cuadra tiene parser para "Cuenta" y "Tarjeta" Nu (incluye diseño 2025): https://github.com/Chere3/cuadra

### Santander México

- PDF generado bajo demanda en SuperMóvil con SuperToken, según guía de terceros; contraseña requerida al abrir, regla no indicada. Fuente (no oficial): https://www.rankia.mx/blog/mejores-cuentas-mexico/5014090-como-puedo-ver-estado-cuenta-santander
- Sin fuente oficial consultada (sin verificar).

### Banorte

- Personal: no se encontró página oficial. Guía de terceros: hasta 24 meses en Banco en Línea, PDF "suele venir con contraseña". Fuente (no oficial): https://extractpro.app/mx/blog/convertir-estados-de-cuenta-bancos-mexicanos-excel
- Empresas (BEM): descarga de estados de cuenta CFDI en PDF o XML: https://www.banorte.com/cms/empresas/tutoriales/pdf/BEM-Operador-Consultas-y-Descargas.pdf (no aplica a personal).

### CFDI / XML de estados de cuenta

- El XML (CFDI) del estado de cuenta no contiene cargos y abonos individuales; contiene conceptos que son ingreso para el banco (comisiones, intereses cobrados). Por tanto NO sirve para importar movimientos. Fuente: https://www.elfinanciero.com.mx/monterrey/2023/05/23/mario-alberto-cedillo-peculiaridades-del-cfdi-del-estado-de-cuenta-bancario/ (resumen de buscador; sin verificar literal).
- El complemento histórico ECB (Estado de Cuenta Bancario) fue eliminado alrededor de 2013 (sin verificar): https://contadormx.com/complemento-de-facturas-electronicas-2013-en-estado-de-cuenta-bancario/
- Implicación (inferencia): el XML sirve solo para validar comisiones/intereses; el origen de movimientos es PDF (o CSV/XLSX donde exista).

### Observaciones transversales

- Ningún banco confirmado ofrece OFX/QFX/CSV de estados personales en México (sin verificar exhaustivamente); la vía real es PDF.
- Contraseñas: convenciones varían (RFC, llave elegida por usuario, número de cliente, últimos 4 dígitos de tarjeta, según guía de terceros): https://ayuda.digitt.com/article/84-contrasena-de-mi-estado-de-cuenta (no abierto; sin verificar).
- Recomendación de diseño: pedir contraseña al importar en memoria (nunca persistirla en claro); soportarla en la librería de PDF (ver sección 3).

---

## 2. Proyectos open-source existentes

Todos son repos pequeños y muy jóvenes (0-9 estrellas). Madurez baja; valor como referencia de layouts y de diseño. No copiar código; revisar licencia antes de reutilizar.

| Proyecto | Lenguaje | Cobertura MX | Licencia | Madurez | URL |
|---|---|---|---|---|---|
| cuadra | Python | BBVA (débito/nómina, TDC), Nu (cuenta, tarjeta), Ualá, Vexi, HSBC débito, GBM parcial; CSV/XLSX genérico; OCR opcional | MIT | 2 commits, 133 tests reportados, 0 stars; roadmap incluye Santander, Banorte, Citibanamex, Mercado Pago | https://github.com/Chere3/cuadra |
| Scraping_Bancos_Mx (fork) | Python | 20 bancos: Banamex, BBVA, HSBC, MercadoPago, Nu, Santander, Banorte, etc. pdfplumber + pandas | MIT (según README; GitHub no la detecta) | 96 commits, 0 stars; algunos probados con un solo estado; tests no confirmados | https://github.com/abelsr-kosmos/Scraping_Bancos_Mx |
| bank-statement-parser (Perafan18) | Python | TDC: Amex MX, BBVA, HSBC (OCR Tesseract); planeados Banorte, Santander, Citibanamex | MIT | v0.1.0, 34 commits, 3 stars, pytest con fixtures de texto | https://github.com/Perafan18/bank-statement-parser |
| multi-bank-account-status | Python | BBVA MX TDC; pdfplumber + regex + pandas; clasifica MSI; password = RFC (`.env`) | sin licencia visible | 0 stars | https://github.com/bernardogaona101/multi-bank-account-status |
| estado-cuenta-engine | Python | BBVA PDF digital -> Excel (README) | sin licencia detectada | 0 stars; no se abrió el README (sin verificar detalles) | https://github.com/JoMagistelo/estado-cuenta-engine |
| bbva2pandas | Python | BBVA España (no México), pdftotext/poppler | GPL-3.0 | 9 stars, tests, PyPI | https://github.com/ablancolopez/bbva2pandas |
| @metolabs/mx-bank-receipt-reader | JS/Node + browser | Comprobantes SPEI (imágenes), no estados de cuenta | MIT | n/d | https://cdn.jsdelivr.net/npm/@metolabs/mx-bank-receipt-reader@0.0.15/README.md |

- Un repo apareció con nombre tipo `Iniciarsesion-bancanet.citibanamex.com.mx`: parece phishing/falso; no usar (sospecha).
- Frameworks genéricos de importación (referencia de diseño):
  - ofxstatement (plugins por banco, salida OFX, GPL-3.0, 365 stars): https://github.com/kedder/ofxstatement
  - beangulp (framework de importers para Beancount, GPL-2.0): https://github.com/beancount/beangulp
  - Actual Budget importa CSV/QIF/OFX/QFX/CAMT: https://actualbudget.org/docs/transactions/importing/
- Hallazgos de diseño tomados de cuadra (solo conceptos): plantilla por banco con marcadores de detección, importes en centavos enteros, fechas ISO, preview por defecto y `commit` explícito, rollback, archivo fuente hasheado con SHA-256, transferencias entre cuentas propias detectadas. Fuente: https://github.com/Chere3/cuadra
- Hallazgos de Perafan18: registry de parsers con `can_parse()` sobre texto de primera página. Fuente: https://github.com/Perafan18/bank-statement-parser

---

## 3. Técnicas de extracción local de PDF

### Librerías por ecosistema

| Librería | Ecosistema | Sirve para | Notas verificadas | URL |
|---|---|---|---|---|
| pdfplumber | Python | texto + tablas + bounding boxes | MIT; `password=`; "works best on machine-generated, rather than scanned"; sin OCR; `extract_words` con tolerancias; `extract_text(layout=True)` experimental | https://github.com/jsvine/pdfplumber |
| Camelot | Python | tablas | "only works with text-based PDFs and not scanned documents"; modos Lattice/Stream/Network/Hybrid | https://camelot-py.readthedocs.io/en/latest/ |
| PyMuPDF | Python | texto, bloques, `authenticate(password)` | `authenticate` devuelve 0 si falla; licencia no verificada (AGPL/comercial, sin verificar) | https://pymupdf.readthedocs.io/en/latest/document.html |
| pypdf | Python | texto básico, decrypt | no abierto (sin verificar); AES requiere `cryptography` (sin verificar) | - |
| tabula | Java/Python | tablas | no verificado | - |
| poppler `pdftotext -layout` | CLI | texto con layout | usado por bbva2pandas | https://github.com/ablancolopez/bbva2pandas |
| pdf.js (pdfjs-dist) | JS browser/Node | texto con coordenadas, password | `getDocument({password})`; `onPassword` con `PasswordResponses.NEED_PASSWORD/INCORRECT_PASSWORD` (visto en tests espejo) | https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib.html |
| tesseract.js | JS browser/Node | OCR en WASM | Apache-2.0; se puede alojar local con `workerPath`/`langPath`/`corePath` para evitar CDN | https://github.com/naptha/tesseract.js ; https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md |
| pytesseract / tesseract | Python | OCR | usado por Perafan18 para HSBC | https://github.com/Perafan18/bank-statement-parser |
| pdf-lib | JS | crear/modificar PDFs | no apropiada para extraer texto (sin verificar) | - |

### Texto vs escaneado

- Camelot y pdfplumber: solo text-based; OCR requiere paso aparte. Fuentes arriba.
- Estados de cuenta descargados del banco son normalmente text-based (los parsers de la sección 2 los leen sin OCR), con excepción de fuentes CID/EBCDIC (HSBC) donde el texto extraído sale ilegible y hay que recurrir a OCR (sin verificar a nivel byte).
- Escaneados/fotos (ej. estados impresos): OCR obligatorio, calidad menor; cuadra lo ofrece como opción: https://github.com/Chere3/cuadra
- Heurística: extraer texto; si la densidad de caracteres legibles es baja o hay glifos basura, caer a OCR (inferencia).

### Layout vs regex

- Regex sobre texto línea a línea (BBVA/Amex en Perafan18, multi-bank): simple, frágil a cambios de formato.
- Layout por coordenadas (`extract_words` + columnas x): robusto cuando columnas de cargo/abono están separadas; más código por banco.
- Tablas automáticas (Camelot/pdfplumber tables): funcionan si el PDF tiene líneas o alineación clara; no garantizado para estados de cuenta (sin verificar).
- Recomendación: por banco, detectar con marcadores de primera página, y combinar palabras con coordenadas para determinar columnas; regex solo para campos sueltos (fechas, importes).

### Problemas típicos a manejar

- Conceptos multilínea: acumular líneas hasta la siguiente línea que empieza con fecha.
- Filas MSI (meses sin intereses): columnas adicionales (pago x de n, saldo pendiente); multi-bank las clasifica aparte. Fuente: https://github.com/bernardogaona101/multi-bank-account-status
- Columnas de moneda: algunos bancos reportan USD (Monex/Intercam pueden fallar con multimoneda según README): https://github.com/abelsr-kosmos/Scraping_Bancos_Mx
- Fechas "dd/MMM" sin año: inferir año desde el periodo del estado (inicio/fin); cuidar cruce diciembre-enero. (inferencia; ningún README consultado lo detalla)
- Convención de signos: cargo vs abono en columnas separadas o con signo; cuadra distingue estrategias "signed amounts", "separate charge/credit columns", "printed balances". Fuente: https://github.com/Chere3/cuadra
- Formato numérico mexicano: coma de miles, punto decimal; Perafan18 convierte "Mexican number format". Fuente: https://github.com/Perafan18/bank-statement-parser
- En TDC el "cargo" aumenta deuda y "abono/pago" la reduce: mapear al signo del gasto en tu esquema (inferencia).

---

## 4. Conceptos del pipeline de importación

- Esquema canónico: fecha ISO, importe en centavos enteros (cuadra), moneda, descripción cruda, descripción normalizada, cuenta, saldo corriente opcional, id de origen (archivo+línea). Fuente: https://github.com/Chere3/cuadra
- Idempotencia/dedup:
  - Hash de archivo SHA-256 para detectar mismo PDF (cuadra).
  - Hash por transacción: fecha + importe + descripción normalizada + índice de ocurrencia en el estado (para distinguir dos compras idénticas el mismo día) (inferencia).
  - Actual Budget usa ID de OFX y fallback difuso por fecha/importe/payee: https://actualbudget.org/docs/transactions/importing/
- Conciliación por periodo: saldo inicial + movimientos = saldo final declarado; si no cuadra, bloquear commit. Fuente: https://github.com/Chere3/cuadra . Otro parser regex valida saldo corrido fila a fila: https://pypi.org/project/pdf-bank-statement-parser (FNB Sudáfrica; solo como patrón).
- Plugin por banco: registry + `can_parse(first_page_text)` + `parse()` por producto (débito vs crédito) (Perafan18, cuadra).
- Tests golden-file: PDFs reales no se commitean; fixtures anonimizadas o sintéticas (cuadra pide snippets ficticios; Perafan18 usa texto inline). Fuentes arriba.
- Paso de revisión: preview por defecto y commit explícito (cuadra); categorías inciertas van a "Por revisar".
- Categorización: reglas aprobadas por el usuario sobre comerciante normalizado (SQLite rules en Perafan18/cuadra); normalizar prefijos de procesador (ej. "MERPAGO*", "PAYPAL*") (inferencia).
- Transferencias propias: detectar para no contarlas como gasto/ingreso (cuadra).
- Rollback por importación (cuadra).
- Seguridad: no loguear números de cuenta completos (cuadra los enmascara a 4 dígitos); `.gitignore` de estados y DB.

---

## 5. IA/ML local vs parsing determinista

- Determinista (regex/layout): reproducible, auditable, testeable con golden files, cero alucinaciones; costo: un parser por banco y mantenimiento ante cambios de diseño.
- LLM local: tolera variación de formato; riesgo de números inventados, lento en móvil, modelos pesados; requiere conciliación determinista de saldos como red de seguridad (inferencia).
- Reporte de campo (anecdótico): FinSight parsea PDFs en cliente con pdfjs-dist y usa Ollama/LM Studio; el autor dice que modelos de 1B bastan para parsing y 7B mejoran la categorización; textos largos requieren chunking. Fuente: https://hn.svelte.dev/item/47306144 (sin verificar de primera mano).
- Alternativa determinista citada: SpendLens, parsing sin LLM ni nube: https://dev.to/naveenneog/spendlens-private-on-device-bank-statement-analysis-no-login-no-cloud-no-llm-bnp
- On-device móvil: un tracker usa Gemma 2B vía MediaPipe LlmInference: https://dev.to/sarim2000/how-i-built-a-privacy-first-expense-tracker-with-100-on-device-ai-1bf
- Runtimes a investigar (sin benchmark verificado): Transformers.js, WebLLM, llama.cpp, MediaPipe LLM Inference, Ollama.
- Recomendación: determinista para extracción y conciliación; LLM local opcional solo para sugerir categorías o como fallback de revisión humana, nunca para escribir importes sin validar (inferencia).

---

## 6. Keywords para profundizar

Español:
- "estado de cuenta" BBVA PDF contraseña RFC sin homoclave
- "llave de acceso" estado de cuenta Banamex correo
- Token Móvil HSBC estados de cuenta electrónicos XML
- "meses sin intereses" MSI parser estado de cuenta
- "fecha de corte" "periodo" "saldo anterior" "pago mínimo" "cargos regulares"
- "cargos" "abonos" "saldo inicial" "saldo final" conciliación
- convertir estado de cuenta PDF a Excel/CSV
- complemento estado de cuenta bancario CFDI SAT
- Mercado Pago "reporte de liberaciones" "todas las transacciones" CSV
- SPEI comprobante OCR

English:
- Mexican bank statement parser PDF pdfplumber
- bank statement PDF to CSV Python local
- OFX QFX CSV import deduplication FITID
- ofxstatement plugin; beangulp importer; hledger CSV rules; Firefly III data importer (sin verificar cobertura MX)
- golden file tests anonymized PDF fixtures
- PDF password pdf.js onPassword; PyMuPDF authenticate
- tesseract.js offline langPath; Transformers.js; WebLLM; Ollama structured output
- reconciliation opening balance closing balance

GitHub topics: `bank-statement`, `estado-de-cuenta`, `bbva`, `banamex`, `hsbc`, `mercadopago`.

---

## Huecos de cobertura

- Contraseña del PDF: sin fuente oficial para BBVA (solo blog), HSBC, Santander, Banorte; Banamex sí oficial (llave definida por usuario).
- XML de BBVA, y CSV/XLSX de estados de cuenta personales en BBVA/HSBC/Banamex: no confirmados; solo Mercado Pago (CSV/XLSX) tiene fuente oficial de desarrolladores, con columnas, periodo máximo y página de blog no verificados (403).
- Santander y Banorte personal: sin páginas oficiales consultadas; Nu cuenta de débito no cubierta.
- Texto vs imagen por banco: inferido de READMEs de parsers, no probado con PDFs reales; HSBC con fuentes CID/EBCDIC es el riesgo principal.
- Parsers OSS: ninguno verificado con estados reales ni auditado; cobertura de Banamex solo en Scraping_Bancos_Mx (README sin detalle de débito/crédito); licencias de multi-bank y estado-cuenta-engine ausentes.
- Librerías: licencia de PyMuPDF, capacidades de pypdf/tabula/pdf-lib y soporte exacto de `onPassword` en pdf.js (solo vía tests espejo) sin verificar en docs oficiales.
- IA local: sin benchmarks verificados de Transformers.js/WebLLM/llama.cpp para extracción de estados de cuenta.
- Reglas del SAT sobre el CFDI de estados de cuenta: resumen de prensa, no Anexo 20.
