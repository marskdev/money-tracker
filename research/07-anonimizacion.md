# 07 - Anonimización y envío seguro de datos de estados de cuenta

Investigación de apoyo (no es asesoría legal). Fecha de consulta: 2026-10-10. Las fechas entre paréntesis son la fecha de la fuente cuando la página la mostraba. "(sin verificar)" = no se obtuvo fuente primaria o hay fuentes en conflicto.

## Contenido

1. [Qué es sensible en un estado de cuenta mexicano](#1-qué-es-sensible-en-un-estado-de-cuenta-mexicano)
2. [Definiciones: anonimización, seudonimización, etc.](#2-definiciones)
3. [Detección de PII local y gratuita](#3-detección-de-pii-local-y-gratuita)
4. [Pipelines redact-before-send](#4-pipelines-redact-before-send)
5. [Opciones de extracción de terceros vs. locales](#5-opciones-de-extracción-terceros-vs-locales)
6. [Protección de datos en México (LFPDPPP) y equivalentes](#6-protección-de-datos-en-méxico-lfpdppp-y-equivalentes)
7. [Higiene operativa](#7-higiene-operativa)
8. [Keywords para profundizar](#8-keywords-para-profundizar)
9. [Huecos de cobertura](#huecos-de-cobertura)

---

## 1. Qué es sensible en un estado de cuenta mexicano

Nota: la lista de campos es conocimiento del dominio, no sale de una fuente única. Los formatos exactos por banco (BBVA, HSBC, Banamex, Mercado Pago) no se verificaron (sin verificar). Validar contra PDFs reales propios.

Definición legal base (texto vigente, última reforma DOF 14-11-2025):
- Dato personal = "cualquier información concerniente a una persona identificada o identificable"; identificable si se puede determinar "directa o indirectamente a través de cualquier información" (art. 2 V). Fuente: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf
- Esto implica que merchant + monto + fecha puede ser dato personal por vía indirecta aunque no haya nombre.
- "Datos financieros o patrimoniales requerirán el consentimiento expreso" (art. 7). Misma fuente.
- Los datos sensibles de la ley (art. 2 VI) son origen racial, salud, genética, creencias, opiniones políticas, preferencia sexual (lista enunciativa). Los financieros NO están en esa lista, pero tienen régimen propio de consentimiento expreso (art. 7). Misma fuente.
- Ojo: un merchant puede revelar dato sensible por inferencia (clínica, farmacia, iglesia, partido, app de citas). Es inferencia, no listado legal (sospecha).

Clasificación por campo (identifica / necesario para extraer):

| Campo | ¿Identifica persona? | ¿Necesario para extraer transacciones? |
|---|---|---|
| Nombre del titular | Directo | No |
| RFC (13 car. física, 12 moral) | Directo (casi) | No |
| CURP (18 car.) | Directo | No |
| Domicilio | Directo | No |
| Número de cuenta / CLABE (18 díg.) | Directo (cuasi-único) | No |
| Número de tarjeta completo / PAN parcial (últimos 4) | Cuasi-identificador | Solo para asociar tarjeta (puede ser alias local) |
| Número de cliente / contrato | Directo (dentro del banco) | No |
| Referencias / concepto de transferencia | Puede contener nombres, CLABEs, teléfonos | A veces (descripción) |
| Merchants / descripciones | Cuasi-identificador (hábitos, ubicación) | Sí (categorización) |
| Montos | Cuasi-identificador combinado | Sí |
| Saldos | Cuasi-identificador | Parcial (conciliación) |
| Fechas | Cuasi-identificador combinado | Sí |
| Teléfono / email / código de barras de pago | Directo | No |

Estructuras (para regex/validación):
- RFC: 4 letras + AAMMDD + 3 homoclave (13 car. físicas). Contiene fecha de nacimiento y letras del nombre, por eso es re-identificante. Fuente secundaria: https://www.nmas.com.mx/economia/sat-que-significan-los-digitos-del-rfc-y-homoclave/ (sin verificar contra SAT)
- CLABE: 18 dígitos = banco(3) + plaza(3) + cuenta(11) + control(1). Fuente: https://en.wikipedia.org/wiki/CLABE (secundaria; algoritmo ponderadores 3-7-1 mod 10 sin verificar en documento oficial Banxico/ABM)
- CURP: 18 caracteres, estructura similar al RFC; instructivo RENAPO no recuperado (sin verificar).

## 2. Definiciones

Una línea cada una; aplicabilidad al caso "extraer transacciones de PDFs":

- **Anonimización**: irreversible, el dato ya no permite identificar a nadie por medios razonables. En LFPDPPP el equivalente es "disociación" (art. 2 IX): no puede asociarse a la persona "ni permitir, por su estructura, contenido o grado de desagregación, la identificación". Fuente: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf. Aplica: difícil de lograr con transacciones (ver riesgo re-identificación en sección 4).
- **Seudonimización**: reemplazar identificadores por tokens; reversible con información adicional guardada aparte. Sigue siendo dato personal en GDPR (Art. 4(5), Recital 26). Fuente: https://presencis.com/regulations/gdpr/recital-26/ (secundaria; texto oficial en EUR-Lex, sin verificar). Aplica: es el modelo realista del pipeline (mapa token->valor local).
- **Redaction / masking (redacción)**: tachar o reemplazar por marcador fijo sin mapa de retorno (`[REDACTED]`, `****1234`). Aplica: para campos que el tercero nunca necesita (nombre, RFC, CURP, CLABE, domicilio).
- **Tokenization**: sustituir un valor por un token opaco con mapeo en una bóveda separada; término típico de PCI para PAN. Aplica: igual que seudonimización; placeholders `<MERCHANT_1>`.
- **k-anonymity**: cada registro es indistinguible de al menos k-1 otros respecto a sus cuasi-identificadores. Aplica poco: es para datasets publicados, no para un documento individual. (concepto; sin fuente primaria obtenida)
- **Differential privacy**: garantía matemática sobre resultados agregados con ruido calibrado (presupuesto epsilon). Aplica poco: es para estadísticas agregadas, no para extraer líneas de un PDF. Fuente: NIST SP 800-226, final marzo 2025, https://csrc.nist.gov/pubs/sp/800/226/final
- **Riesgos de re-identificación (WP29 Opinion 05/2014)**: singling out, linkability, inference. Fuente secundaria: https://www.bodleian.ox.ac.uk/sites/default/files/bodreader/documents/media/iskills-sensitivedatacommentlegislationanonymisation-handout.pdf. Nota: se reporta un borrador EDPB Guidelines 02/2026 sobre anonimización (julio 2026, consulta hasta 2026-10-30) que actualiza esa opinión: https://hlc.com/en/publications/edpb-publishes-new-guidelines-on-anonymization-under-the-gdpr (secundaria, sin verificar en edpb.europa.eu).
- **ISO/IEC 20889** (técnicas de de-identificación de privacidad): se menciona como keyword; no se verificó su contenido (sin verificar).

Conclusión de aplicabilidad (hecho, no recomendación): para este caso las categorías operativas son redaction + seudonimización/tokenización; k-anonymity y DP no encajan con la unidad "documento/transacción".

## 3. Detección de PII local y gratuita

| Herramienta | Licencia | Español | Madurez / notas | Fuente |
|---|---|---|---|---|
| Microsoft Presidio (analyzer/anonymizer) | MIT | Sí con modelo NLP español + reconocedores en `es`; "each recognizer can support one language"; regex es agnóstico al idioma, el contexto debe estar en español | v2.2.364, jul 2026, Python >=3.10. Aviso oficial: "no guarantee that Presidio will find all sensitive information" | https://pypi.org/project/presidio-analyzer/ , https://presidio.dataprivacystack.org/analyzer/languages/ , https://github.com/microsoft/presidio |
| Presidio entidades predefinidas | MIT | Países listados: ES_NIF, ES_NIE, ES_PASSPORT; **ninguna entidad de México** (RFC, CURP, CLABE requieren recognizer custom) | Genéricas útiles: CREDIT_CARD (12-19 díg., checksum), IBAN_CODE, PERSON, PHONE_NUMBER, EMAIL_ADDRESS, LOCATION | https://presidio.dataprivacystack.org/supported_entities/ |
| Presidio custom `PatternRecognizer` | MIT | regex + `deny_list` + context words | Forma de añadir RFC/CURP/CLABE; ejemplo oficial en `es` | https://presidio.dataprivacystack.org/analyzer/languages/ |
| Presidio Image Redactor / presidio-structured | MIT | Depende de OCR local | Redacta texto en imágenes y datos estructurados | https://github.com/microsoft/presidio |
| spaCy modelos `es_core_news_sm/md/lg` | Licencia del modelo no confirmada en la página consultada (sin verificar) | Sí, con NER; `es_dep_news_trf` sin entidades | Modelos entrenados en noticias, no en estados de cuenta; NER de PERSON en español depende del tamaño del modelo (md > sm según ejemplo LangChain, secundaria) | https://spacy.io/models/es |
| python-stdnum | LGPL 2+ | n/a (validadores) | v2.2, ene 2026. Tiene `mx.rfc` y `mx.curp`. **No tiene módulo CLABE** (mx/ solo `curp.py`, `rfc.py`). Validación de CLABE requiere código propio o librería `clabe` de PyPI (sin verificar) | https://pypi.org/project/python-stdnum/ , https://github.com/arthurdejong/python-stdnum/tree/master/stdnum/mx , https://pypi.org/project/clabe |
| scrubadub | Apache/MIT (la ficha dice "Apache Software License (MIT)") | Clasificador de nombres solo inglés; detectores regionales US/GB/CA; plugins spaCy/Stanford | v2.0.1, sep 2023; poca actividad | https://pypi.org/project/scrubadub/ |
| Regex propio | n/a | n/a | Control total; sin falsos "mágicos", pero cobertura manual | n/a |

Otros (mencionados como keywords, no verificados): GLiNER (NER zero-shot), Flair, Stanza, transformers NER multilingüe, `piiranha`, LLM Guard (sin verificar).

## 4. Pipelines redact-before-send

Hechos verificados que condicionan el diseño:
- Presidio no garantiza detección completa; añadir salvaguardas. https://github.com/microsoft/presidio
- Regex es agnóstico al idioma; el contexto (palabras "RFC", "CLABE", "titular") sí es en español. https://presidio.dataprivacystack.org/analyzer/languages/
- Para la ley, un tratamiento previo de disociación exime de pedir consentimiento (art. 9 III). https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf

Patrones y técnicas (conocimiento de dominio; sin fuente primaria única):
- **Redactar en PDF vs. en texto extraído**
  - En PDF: la redacción debe eliminar el contenido real, no solo dibujar un rectángulo encima (texto subyacente y metadatos persisten). Verificar extrayendo texto después.
  - En texto extraído: más simple y testeable; requiere extracción local previa (OCR/parseo local).
  - Si el PDF es nativo (con capa de texto), se puede parsear localmente sin OCR de terceros.
- **Mapa de tokens reversible solo local**: `<PERSON_1>`, `<ACCT_1>`, `<MERCHANT_1>`; el mapa nunca sale del equipo; rehidratar la respuesta localmente. Es seudonimización, sigue siendo dato personal localmente.
- **Enviar fragmentos estructurados** (una línea de transacción, no el documento): reduce contexto identificante (encabezado con nombre, CLABE, domicilio, RFC).
- **Fechas y montos**: opciones habituales: dejarlos (necesarios para el trabajo), desplazar fechas con offset constante local, redondear o bucketizar montos. Cada opción degrada la utilidad; decisión de diseño, no hay estándar.
- **Re-identificación por merchant + monto + fecha**: quasi-identificadores combinados permiten singling out/linkability (WP29). Fuente secundaria: https://www.bodleian.ox.ac.uk/sites/default/files/bodreader/documents/media/iskills-sensitivedatacommentlegislationanonymisation-handout.pdf. Un merchant poco común (pequeño comercio local) + fecha + monto puede identificar a la persona a quien tenga acceso a otras fuentes (el propio comercio, el banco).
- **Orden recomendado de las etapas** (descriptivo): extraer local -> detectar PII -> tokenizar -> enviar fragmento -> recibir -> rehidratar -> validar (checksums de montos, suma de saldos).
- **Fallback local-first**: si el servicio falla/no hay red/el score de detección es bajo, usar parser local y marcar la línea para revisión manual (en vez de enviar sin redactar).
- **Verificación**: test de que el payload saliente no contiene ningún patrón de RFC/CURP/CLABE/PAN (assert sobre el body antes de la llamada HTTP).
- **Imágenes**: si se usa OCR en la nube sobre imagen del PDF, la redacción previa en imagen es difícil; Presidio Image Redactor lo intenta con OCR local (calidad no verificada). https://github.com/microsoft/presidio

## 5. Opciones de extracción: terceros vs. locales

Solo hechos. Sin recomendación. Fechas = última actualización de la fuente.

### 5.1 LLM APIs

| Proveedor | Retención | Entrenamiento | ZDR / región | Capa gratis | Fuente |
|---|---|---|---|---|---|
| Anthropic API | Entradas/salidas borradas en 30 días (art. actualizado 2026-07-01); marcadas por trust & safety hasta 2 años (inputs/outputs) y 7 años (scores) | "Retained data is never used for model training without your express permission" | ZDR por organización con aprobación; algunos modelos "Covered" exigen 30 días y no son ZDR; Files API se retiene hasta borrar; `inference_geo` global o `us` (1.1x precio) en modelos recientes | No verificado (sin verificar) | https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data , https://platform.claude.com/docs/en/manage-claude/api-and-data-retention , https://platform.claude.com/docs/en/build-with-claude/data-residency |
| OpenAI API | Logs de abuso hasta 30 días por defecto; Responses 30 días si `store` true; Files/Conversations hasta borrar | No se usan para entrenar salvo opt-in (desde 2023-03-01) | ZDR y Modified Abuse Monitoring requieren aprobación; residencia de datos configurable por proyecto (US, EU, UK, CA, JP, IN, SG, KR, AU, UAE); procesamiento regional solo US/EU/UAE y no-US exige aprobación | No verificado (sin verificar) | https://developers.openai.com/api/docs/guides/your-data |
| Google Gemini API | Servicios pagados: logs "por un periodo limitado" para abuso (días no especificados) | **Unpaid (AI Studio, cuota gratis): Google usa prompts y respuestas para mejorar productos; revisores humanos pueden leer**; pagado: no | En EEE/UK/CH aplican términos de "paid" a todo; términos actualizados 2026-04-28 | Sí, cuota gratuita (con uso de datos) | https://ai.google.dev/gemini-api/terms |
| Mistral | 30 días / ZDR: fuentes secundarias en conflicto | Plan Experiment (gratis): puede usarse para entrenar según help center | Hosting EU por defecto (secundaria); ZDR por solicitud (sin verificar) | Sí, plan Experiment; OCR $4/1000 págs (batch $2) | https://help.mistral.ai/en/articles/455206-how-can-i-try-the-api-for-free-with-the-experiment-plan , https://mistral.ai/en/pricing ; política oficial no recuperada (sin verificar) |

### 5.2 OCR / Document AI en la nube

| Servicio | Retención / uso de datos | Capa gratis | Fuente |
|---|---|---|---|
| Azure Document Intelligence | Entrada y resultados almacenados temporalmente 24 h tras completar, luego borrado automático; `Delete Analyze Result` para borrar antes; procesado en la región del recurso (pág. 2026-07-22) | No verificado (sin verificar) | https://learn.microsoft.com/en-us/legal/cognitive-services/document-intelligence/data-privacy-security |
| Google Cloud Document AI | "never use customer data to train our Document AI models"; online: en memoria, sin persistir en disco; batch: borrado tras proceso con TTL de 1 día; metadata de requests se loguea temporalmente (pág. 2026-10-07) | No verificado (sin verificar) | https://docs.cloud.google.com/document-ai/docs/data-usage |
| Amazon Textract | Puede almacenar y usar documentos para mejorar servicios de AI de Amazon; opt-out vía política AI services de AWS Organizations (que también evita copia a otra región); borrado vía AWS Support | Free tier 3 meses: Detect Text 1000 págs/mes; Forms/Tables/Layout 100 págs/mes | https://aws.amazon.com/textract/faqs/ |
| Mistral OCR | ver 5.1 | Experiment plan | ver 5.1 |

### 5.3 Locales

| Herramienta | Licencia | Hechos | Tradeoffs honestos | Fuente |
|---|---|---|---|---|
| Tesseract | Apache 2.0 | >100 idiomas, motor LSTM (v4+), v5 estable desde 2021-11-30; sin GUI | "Better results often require improving the image quality"; sin análisis de layout/tablas nativo (limitación general, sin verificar en la fuente) | https://github.com/tesseract-ocr/tesseract |
| PaddleOCR | Apache 2.0 | v3.7.0 (2026-06-11); despliegue local, ONNX, OpenVINO; "100+ idiomas"; PP-StructureV3 para documentos; PaddleOCR-VL 0.9B | Español no confirmado explícitamente en la página; requiere dependencias pesadas (sin verificar) | https://github.com/PaddlePaddle/PaddleOCR |
| llama.cpp | MIT | Inferencia local de LLM/VLM, servidor compatible OpenAI, GGUF, cuantización 1.5-8 bit, CPU/GPU | Calidad depende del modelo y hardware disponible; VLM pequeños pueden fallar en tablas densas (sin verificar) | https://github.com/ggml-org/llama.cpp |
| Ollama | MIT | Servidor local en `localhost:11434`, macOS/Windows/Linux | Misma observación de calidad/hardware; algunos modelos listados pueden ser de nube, verificar cuál corre local (sin verificar) | https://github.com/ollama/ollama |
| Parseo directo de PDF nativo (pdfplumber, pdftotext) | varias | Sin OCR si el PDF tiene capa de texto | Layout específico por banco; frágil ante cambios de formato (conocimiento general, sin fuente) | n/a |

## 6. Protección de datos en México (LFPDPPP) y equivalentes

Estado verificado en el texto consolidado de la Cámara de Diputados: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf

- **Ley**: "Nueva Ley" publicada en el DOF el 20-03-2025; última reforma DOF 14-11-2025 (texto vigente). Abrogó la de 2010 (fuente secundaria: https://basham.com.mx/nueva-ley-federal-de-proteccion-de-datos-personales-en-posesion-de-los-particulares-publicada-en-el-diario-oficial-de-la-federacion/ ).
- **Autoridad**: "Secretaría: Secretaría Anticorrupción y Buen Gobierno" (art. 2 XV). El INAI se extinguió y sus funciones pasaron a esa Secretaría (secundaria: https://www.garrigues.com/es_ES/noticia/mexico-nueva-ley-federal-proteccion-datos-personales-posesion-particulares-introduce ). Reglamento y lineamientos nuevos: no verificados (sin verificar); una fuente indica que el Reglamento de 2011 sigue publicado como vigente.
- **Exclusión de uso personal (art. 1)**: quedan exceptuadas "las personas que lleven a cabo la recolección y almacenamiento de datos personales, que sea para uso exclusivamente personal, y sin fines de divulgación o utilización comercial". Relevante: aplica al uso propio, no necesariamente al ofrecer la app a amigos o comercialmente. Si la ley aplica a ese escenario es interpretación legal (sin verificar).
- **Principios (art. 5)**: licitud, finalidad, lealtad, consentimiento, calidad, proporcionalidad, información, responsabilidad.
- **Consentimiento (art. 7)**: expreso o tácito; tácito por regla general; datos financieros o patrimoniales requieren consentimiento expreso; revocable.
- **Datos sensibles (arts. 2 VI y 8)**: consentimiento expreso y por escrito (firma autógrafa, electrónica o mecanismo de autenticación); no crear bases de datos sensibles sin finalidad legítima y concreta.
- **Excepción por disociación (art. 9 III)**: no se requiere consentimiento si los datos se someten a procedimiento previo de disociación.
- **Aviso de privacidad (arts. 14-17)**: contenido mínimo: identidad y domicilio del responsable; datos tratados identificando sensibles; finalidades distinguiendo las que requieren consentimiento; opciones para limitar uso; mecanismos ARCO; procedimiento de cambios. Modalidad simplificada para medios electrónicos.
- **Seguridad (arts. 18-20)**: medidas administrativas, técnicas y físicas; notificación inmediata de vulneraciones que afecten significativamente derechos patrimoniales o morales; confidencialidad.
- **ARCO (arts. 21-34)**: acceso, rectificación, cancelación, oposición; gratuito (art. 34); respuesta en máximo 20 días (art. 31). Portabilidad: no encontrada en el texto leído (sin verificar).
- **Transferencias (arts. 35-36)**: nacional o internacional ("dentro o fuera del territorio mexicano", art. 2 XX); comunicar el aviso al tercero; cláusula en el aviso para aceptar o no la transferencia; el tercero asume mismas obligaciones; excepciones de consentimiento en art. 36 (ley/tratado, contrato en interés del titular, etc.).
- **Encargado (art. 2 XII)**: quien trata datos "por cuenta del responsable". Un proveedor de OCR/LLM actuaría como encargado; la ley distingue transferencia a tercero (art. 35) de "persona encargada". Clasificación concreta de un proveedor cloud: sin verificar.
- **Sanciones**: calculadas en UMA, duplicables con datos sensibles (secundaria: https://www.legiscope.com/blog/lfpdppp-mexico-guia-cumplimiento.html , sin verificar).

Equivalentes si se sirve a personas de otras jurisdicciones (solo keywords; sin verificar aplicabilidad):
- GDPR: Art. 4(5) pseudonymisation, Recital 26, Art. 28 processor/DPA, Art. 44-49 transferencias, Art. 30 RoPA, Art. 35 DPIA, Art. 17 right to erasure.
- California: CCPA/CPRA (keywords: "service provider", "sensitive personal information", "financial account").
- Brasil: LGPD. Otros: ver sección 8.

## 7. Higiene operativa

- **Logs sin PII**: OWASP lista como excluir/enmascarar: datos de titular de tarjeta y cuenta bancaria, PII sensible e identificadores gubernamentales, tokens, claves, cadenas de conexión; "use with care": rutas de archivo, nombres, teléfonos, emails; pseudonimizar si no se necesita identidad; sanear CR/LF contra log injection. Fuente: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
  - Loguear IDs de transacción internos, conteos, hashes, no descripciones ni montos.
  - Cuidado con trazas de excepciones que incluyan fragmentos del texto del PDF.
- **Cifrado local de archivos importados**: keywords `age`, `sops`, SQLCipher, cifrado de disco (LUKS/FileVault), `gocryptfs`; ninguna verificada en esta investigación (sin verificar).
- **Borrar PDFs fuente tras parsear**: considerar que en SSD/CoW el borrado no es garantizado; cifrado de disco mitiga; guardar solo el JSON estructurado/hash del archivo para idempotencia (diseño, sin fuente).
- **Muestras para tests**: usar estados de cuenta sintéticos (generados) con datos falsos; golden files con RFC/CURP/CLABE de formato válido pero ficticios; no commitear PDFs reales; `.gitignore` + hook pre-commit (gitleaks/detect-secrets son para secretos, no PII; sin verificar).
- **Retención**: art. 2 III "bloqueo" y art. 24-25 cancelación definen que tras cumplir la finalidad los datos se bloquean y cancelan. https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf
- **Telemetría/crash reports** de terceros (Sentry, etc.): pueden capturar PII; desactivar o filtrar (sin verificar).

## 8. Keywords para profundizar

Español:
- aviso de privacidad simplificado / integral, derechos ARCO, disociación, datos patrimoniales o financieros, consentimiento expreso, encargado vs responsable, transferencia internacional, Secretaría Anticorrupción y Buen Gobierno, LFPDPPP 2025, Reglamento LFPDPPP, vulneración de seguridad, medidas de seguridad administrativas técnicas físicas, CONDUSEF estado de cuenta, SPEI CLABE Banxico, ABM CLABE, SAT RFC homoclave, RENAPO CURP, Ley Fintech datos (sin verificar), tokenización PAN, PCI DSS.

Inglés:
- PII detection, named entity recognition, Presidio custom recognizer, PatternRecognizer, deny list, context words, pseudonymization vs anonymization, de-identification, tokenization vault, re-identification risk, singling out linkability inference, quasi-identifiers, k-anonymity, l-diversity, differential privacy epsilon, NIST SP 800-226, ISO/IEC 20889, ISO/IEC 27701, zero data retention (ZDR), data residency, regional processing, DPA/data processing addendum, sub-processor, prompt injection from documents, local-first, on-device inference, GGUF, quantization, document layout analysis, table extraction, synthetic data generation (Faker es_MX), golden files, SQLCipher, age encryption, secure deletion SSD, log redaction, structured logging.

## Huecos de cobertura

- Formatos reales de estado de cuenta de BBVA, HSBC, Banamex y Mercado Pago (campos exactos, ubicación de PII, PDFs protegidos con contraseña): no investigados.
- Algoritmo oficial de CLABE (Banxico/ABM) y estructura oficial de CURP (RENAPO): solo fuentes secundarias.
- Reglamento/lineamientos de la LFPDPPP 2025 y criterios de la Secretaría Anticorrupción y Buen Gobierno: no recuperados; portabilidad y tratamiento de proveedores cloud como "encargado" sin verificar.
- Políticas actuales de Mistral (retención, ZDR, entrenamiento) y de capas gratuitas de Anthropic, OpenAI y Document AI/Azure: no verificadas en fuente primaria.
- Calidad real de Presidio + spaCy `es_*` sobre estados de cuenta, licencias de los modelos spaCy, PaddleOCR en español y Tesseract `spa`: no medidas ni confirmadas.
- Seguridad del borrado de archivos en SSD, herramientas de cifrado concretas y redacción real de PDFs (eliminación de texto subyacente): sin fuentes.
