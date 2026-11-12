# 🎓 Google Campus • Google Workspace for Education (Next Gen)
> **Propuesta y prototipo oficial desarrollado por el club de programación de Google Developer Groups on Campus (GDGoC).**

![Google Campus Banner](https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80)

[![GDGoC](https://img.shields.io/badge/GDGoC-Project%20Proposal-4285F4?style=for-the-badge&logo=google)](https://developers.google.com/community/gdgoc)
[![License](https://img.shields.io/badge/License-Apache%202.0-34A853?style=for-the-badge)](LICENSE)
[![Google Brand](https://img.shields.io/badge/Google%20Brand%20Guidelines-Compliant-EA4335?style=for-the-badge)](https://brand.google)

---

## 🚀 La Visión: Redefiniendo el Aula Universitaria

Actualmente, **Google Classroom** es la herramienta académica más extendida en colegios e institutos, pero en la universidad los estudiantes sufren una desconexión crítica:
1. **La comunidad vive fuera:** Los debates sobre ejercicios, exámenes y la vida universitaria se van a foros externos como Reddit, Discord o grupos masivos de WhatsApp.
2. **Los apuntes se fragmentan:** Para conseguir exámenes resueltos, esquemas y chuletas de calidad, los alumnos recurren a plataformas de monetización de terceros tipo Wuolah o StuDocu.
3. **La IA no conoce el curso:** Los estudiantes consultan dudas en LLMs generalistas que no tienen acceso al temario, las diapositivas oficiales ni el estilo del profesor.

**Google Campus** fusiona todo el ecosistema universitario en una única plataforma diseñada bajo las **Google Brand Guidelines** y la filosofía de **Material Design 3**.

---

## 🌟 Funcionalidades Principales

### 1. 💬 Foro Universitario & Reddit por Asignatura y Titulación
- **Comunidad estilo Reddit** organizada por curso, grado y asignatura.
- **Flairs y etiquetas:** `[MEME]`, `[DUDA]`, `[APUNTES]`, `[EXAMEN]`, `[PROYECTO]`.
- Sistema de **karma y votaciones (Upvotes/Downvotes)** con colores oficiales de Google.
- Soporte para memes universitarios, encuestas interactivas, fragmentos de código con sintaxis resaltada y moderación compartida entre profesores y delegados.
- Hilos de respuestas anidados con badges verificados de profesorado y miembros GDGoC.

### 2. 📚 Marketplace de Apuntes Colaborativos (Estilo Wuolah en Drive)
- Repositorio peer-to-peer de apuntes, resúmenes, chuletas y exámenes anteriores resueltos.
- **Calificación por estrellas (1 a 5 ⭐)**, métricas de descargas y verificación de calidad.
- Visor integrado de documentos PDF con previsualización sin salir de la plataforma.
- **Gamificación con Campus Points (🪙):** Los alumnos ganan créditos por subir apuntes útiles y resolver dudas, canjeables por créditos de Google Cloud y ventajas en eventos GDGoC.

### 3. 🎓 Classroom LMS (Moodle + Google Classroom Fusion)
- Gestión completa de asignaturas por módulos y temas oficiales.
- Tareas con fecha límite, control de versiones de código y entrega vinculada a Google Drive y GitHub.
- Tablón de anuncios oficiales del profesorado y libro de calificaciones.

### 4. 📹 Google Meet & Aulas Virtuales
- Acceso directo a la sala de Meet en vivo con indicador de llamada activa.
- Grabaciones automáticas de clases pasadas con **capítulos generados por IA** e índice temático por minuto.
- Simulador de sala interactiva con control de micrófono, cámara y pantalla compartida.

### 5. 🤖 Campus AI Notebook & Agentes de Clase (NotebookLM + Gemini)
- Cuaderno inteligente donde **todas las diapositivas, prácticas y exámenes anteriores de la clase están indexados**.
- **Múltiples agentes especializados por asignatura:**
  - 🧠 *Agente Tutor Socrático:* Te guía paso a paso sin dar la respuesta directamente.
  - 💻 *Auditor de Código y Complejidad:* Analiza tu código en C++/Python, detecta fugas de memoria y calcula la cota $O(N \log N)$.
  - 📝 *Simulador de Exámenes Parciales:* Genera tests realistas con el nivel del profesor.
  - 🎙️ *Audio Deep Dive Podcast (NotebookLM):* Convierte el tema en un resumen de audio conversacional de 5 minutos con dos voces de IA.
- Respuestas con citas textuales a las diapositivas y fórmulas matemáticas en LaTeX.

---

## 🏫 Asignaturas de Ejemplo Incluidas en el Prototipo

El prototipo incluye navegación funcional e inmediata entre 3 asignaturas de 3 cursos universitarios diferentes:

| Curso | Asignatura | Código | Profesor / Cátedra | Tema Principal |
| :--- | :--- | :--- | :--- | :--- |
| **1º Curso** | Fundamentos de Programación | `FP-101` | Dra. Carmen Delgado | Punteros en C, Recursividad y Modularidad |
| **2º Curso** | Estructuras de Datos y Algoritmos | `EDA-202` | Dr. Javier Morales | Árboles AVL, Grafos, Dijkstra y Complejidad |
| **3º Curso** | Inteligencia Artificial y Machine Learning | `IAML-301` | Dra. Elena Ramos | Heurísticas A*, PyTorch, Transformers y LLMs |

---

## 🎨 Cumplimiento de las Google Brand Guidelines

Este proyecto sigue escrupulosamente los estándares visuales de Google:
- **Tipografía:** *Google Sans* / *Product Sans* / *Roboto* y *Roboto Mono*.
- **Paleta de Color Oficial:**
  - Google Blue: `#1a73e8`
  - Google Red: `#ea4335`
  - Google Yellow: `#fbbc04`
  - Google Green: `#34a853`
  - Superficies y contenedores: `#f8fafd`, `#ffffff`, `#dadce0`
- **Iconografía:** Google Material Symbols Rounded (`opsz 24`, `wght 400`, `FILL 0/1`).
- **Lanzador de Apps:** Icono Waffle oficial con acceso rápido a Classroom, Meet, Drive y NotebookLM.

---

## 💻 Cómo Probar el Proyecto Localmente

El prototipo ha sido desarrollado con estándares web modernos sin dependencias externas pesadas, lo que permite abrirlo al instante en cualquier navegador o servirlo con Python:

```bash
# Clonar el repositorio
git clone https://github.com/arixlariel/Google-Campus.git
cd Google-Campus

# Servir con Python 3
python3 -m http.server 8000
```

Abre tu navegador en `http://localhost:8000` para disfrutar de la experiencia interactiva de **Google Campus**.

---

## 👥 Equipo y Créditos
- Desarrollado por miembros del **Google Developer Group on Campus (GDGoC)**.
- Diseñado como propuesta de producto para el equipo de **Google Workspace for Education**.
