# Google Campus • Next Gen School!
> **Prototipo desarrollado en el Club de Programación del Google Developer Group on Campus Universidad de Huelva**

---

## El aula redefinida

Actualmente, **Google Classroom** es la herramienta académica más extendida en colegios, institutos y universidades a lo largo y ancho del mundo. Aún así, no se ha actualizado con las nuevas funcionalidades de IA ni integraciones que hoy en día ofrece la empresa:
1. **La comunidad vive fuera:** Los debates sobre ejercicios y exámenes se van a foros como Discord, Reddit o WhatsApp —y los correos tardan demasiado en recibir respuesta. Parte de este tráfico estaría mucho mejor localizado dentro de las propias aulas virtuales. Esta funcionalidad ya existe, pero creemos que no despega debido a que los estudiantes buscan herramientas más completas como Reddit
2. **Los apuntes se fragmentan:** Para conseguir exámenes resueltos, esquemas o chuletas, los alumnos recurren a plataformas monetizadas de terceros tipo StuDocu o Wuolah.
3. **La IA no conoce el curso:** Los estudiantes consultan dudas en LLMs generalistas que no tienen acceso al temario ni el estilo del profesor. Para conseguir esto es necesario descargar todo el material y preparar un NotebookLM personalizado para cada asignatura que los alumnos deben ir actualizando conforme los profesores publican material, cuando esto podría manejarlo directamente el centro desde la aplicación

**Google Campus** fusiona todo el ecosistema universitario en una única plataforma diseñada bajo las **Google Brand Guidelines** y la filosofía de **Material Design 3**. Está diseñado como una propuesta de producto a Google, o como producto propio tras un rebranding si no se aceptara

---

## Funcionalidades Principales

### 1. Foro Universitario & Reddit por Asignatura y Titulación
- **Comunidad estilo Reddit** organizada por curso, grado y asignatura.
- **Flairs y etiquetas:** `[MEME]`, `[DUDA]`, `[APUNTES]`, `[EXAMEN]`, `[PROYECTO]`.
- Sistema de **karma y votaciones (Upvotes/Downvotes)** con colores oficiales de Google.
- Soporte para memes universitarios, encuestas interactivas, fragmentos de código con sintaxis resaltada y moderación compartida entre profesores y delegados.
- Hilos de respuestas anidados con badges verificados de profesorado y miembros GDGoC.

### 2. Marketplace de Apuntes Colaborativos (Estilo Wuolah en Drive)
- Repositorio peer-to-peer de apuntes, resúmenes, chuletas y exámenes anteriores resueltos.
- **Calificación por estrellas (1 a 5 ⭐)**, métricas de descargas y verificación de calidad.
- Visor integrado de documentos PDF con previsualización sin salir de la plataforma.
- **Gamificación con Campus Points (🪙):** Los alumnos ganan créditos por subir apuntes útiles y resolver dudas, canjeables por créditos de Google Cloud y ventajas en eventos GDGoC.

### 3. Classroom LMS (Moodle + Google Classroom Fusion)
- Gestión completa de asignaturas por módulos y temas oficiales.
- Tareas con fecha límite, control de versiones de código y entrega vinculada a Google Drive y GitHub.
- Tablón de anuncios oficiales del profesorado y libro de calificaciones.

### 4. Google Meet & Aulas Virtuales
- Acceso directo a la sala de Meet en vivo con indicador de llamada activa.
- Grabaciones automáticas de clases pasadas con **capítulos generados por IA** e índice temático por minuto.
- Simulador de sala interactiva con control de micrófono, cámara y pantalla compartida.

### 5. Campus AI Notebook & Agentes de Clase (NotebookLM + Gemini)
- Cuaderno inteligente donde **todas las diapositivas, prácticas y exámenes anteriores de la clase están indexados**.
- **Múltiples agentes especializados por asignatura:**
  - 🧠 *Agente Tutor Socrático:* Te guía paso a paso sin dar la respuesta directamente.
  - 💻 *Auditor de Código y Complejidad:* Analiza tu código en C++/Python, detecta fugas de memoria y calcula la cota $O(N \log N)$.
  - 📝 *Simulador de Exámenes Parciales:* Genera tests realistas con el nivel del profesor.
  - 🎙️ *Audio Deep Dive Podcast (NotebookLM):* Convierte el tema en un resumen de audio conversacional de 5 minutos con dos voces de IA.
- Respuestas con citas textuales a las diapositivas y fórmulas matemáticas en LaTeX.

---

## Asignaturas de Ejemplo Incluidas en el Prototipo

El prototipo incluye navegación funcional e inmediata entre 3 asignaturas de 3 cursos universitarios diferentes:

| Curso | Asignatura | Código | Profesor / Cátedra | Tema Principal |
| :--- | :--- | :--- | :--- | :--- |
| **1º Curso** | Fundamentos de Programación | `FP-101` | Dra. Carmen Delgado | Punteros en C, Recursividad y Modularidad |
| **2º Curso** | Estructuras de Datos y Algoritmos | `EDA-202` | Dr. Javier Morales | Árboles AVL, Grafos, Dijkstra y Complejidad |
| **3º Curso** | Inteligencia Artificial y Machine Learning | `IAML-301` | Dra. Elena Ramos | Heurísticas A*, PyTorch, Transformers y LLMs |
