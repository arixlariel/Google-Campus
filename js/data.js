/**
 * Google Campus - Mock Database & State Store
 * GDGoC (Google Developer Groups on Campus) Project Proposal
 */

const CAMPUS_DATA = {
  currentDegree: "Grado en Ingeniería Informática",
  university: "Universidad Complutense de Madrid",
  currentUser: {
    name: "Ariel Bustillo León",
    role: "Estudiante • GDGoC Lead",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    campusPoints: 480,
    enrolledCourses: ["fundamentos-programacion", "estructuras-datos", "inteligencia-artificial"]
  },

  // 3 Cursos de ejemplo correspondientes a 3 años académicos distintos
  courses: {
    "fundamentos-programacion": {
      id: "fundamentos-programacion",
      code: "FP-101",
      year: "1º Curso • Grado en Informática",
      semester: "1º Cuatrimestre",
      name: "Fundamentos de Programación",
      shortName: "Prog. 101",
      professor: "Dra. Carmen Delgado Fernández",
      department: "Lenguajes y Sistemas Informáticos",
      themeColor: "#0f9d58",
      accentBg: "#e6f4ea",
      badgeColor: "#137333",
      coverGradient: "linear-gradient(135deg, #0b8043 0%, #34a853 100%)",
      description: "Introducción al diseño algorítmico estructurado, sintaxis moderna en C/Python, estructuras de control, funciones, recursividad y gestión de memoria.",
      stats: { students: 148, notesCount: 34, forumPosts: 92, nextClass: "Mañana 09:30" },
      meetActive: false,
      meetUrl: "https://meet.google.com/fp-campus-live",

      // AGENTES PERSONALIZADOS DE ESTA CLASE
      agents: [
        {
          id: "tutor-fp",
          name: "Agente Tutor Socrático de Sintaxis",
          role: "Tutor interactivo de C / Python y Lógica",
          avatarIcon: "terminal",
          color: "#0f9d58",
          description: "Te guía para resolver errores de compilación y comprender punteros y recursividad paso a paso sin hacerte la práctica.",
          systemPrompt: "Eres el tutor virtual de Fundamentos de Programación. Fomenta el razonamiento socrático."
        },
        {
          id: "exam-fp",
          name: "Generador de Parciales FP",
          role: "Simulador de exámenes prácticos",
          avatarIcon: "quiz",
          color: "#ea4335",
          description: "Genera problemas con trazados de memoria, bucles anidados y arrays multidimensionales estilo examen oficial.",
          systemPrompt: "Simula exámenes oficiales de primer año con casos de prueba."
        }
      ],

      quickPrompts: [
        "¿Cuál es la diferencia real entre paso por valor y paso por referencia?",
        "Tengo un fallo de Segmentación (Core Dumped) con punteros, ¿cómo lo diagnostico?",
        "Genera un ejercicio de recursividad tipo examen con solución oculta"
      ],

      // FORO REDDIT
      forumPosts: [
        {
          id: "fp-post-1",
          author: "Marcos_Dev",
          authorRole: "Delegado de 1º",
          authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 2 horas",
          flair: "MEME",
          flairColor: "#ea4335",
          title: "Yo después de pasar 4 horas buscando el punto y coma en el laboratorio de C",
          content: "Compilador: Error en línea 320. Mi código tiene 40 líneas. La salud mental se quedó en la cafetería.",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
          votes: 142,
          userVoted: 0,
          commentsCount: 28,
          comments: [
            { author: "Sara_Codes", time: "Hace 1 hora", text: "Recomiendo compilar siempre con `gcc -Wall -Wextra -pedantic`, te ahorra lágrimas 😂", upvotes: 19 },
            { author: "Prof. Delgado", isTeacher: true, time: "Hace 30 min", text: "Ánimo chicos. En el examen no hay compilador, así que acostumbraos a repasar la sintaxis con papel y lápiz.", upvotes: 45 }
          ]
        },
        {
          id: "fp-post-2",
          author: "Alex_Matematicas",
          authorRole: "Estudiante",
          authorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Ayer",
          flair: "DUDA",
          flairColor: "#1a73e8",
          title: "¿Cómo pensáis la condición de parada en funciones recursivas? Me cuesta ver el caso base",
          content: "Entiendo la teoría de la recursión para el factorial o Fibonacci, pero cuando piden recorrer arrays bidimensionales o invertir listas me bloqueo. ¿Algún truco mental?",
          votes: 39,
          userVoted: 0,
          commentsCount: 14,
          comments: [
            { author: "Ariel B. (GDGoC)", time: "Ayer", text: "Piensa siempre primero en el caso más pequeño posible (array vacío o tamaño 1). Si no necesitas hacer nada, devuélvelo. El agente de NotebookLM de la clase tiene una explicación genial.", upvotes: 12 }
          ]
        }
      ],

      // APUNTES WUOLAH
      apuntes: [
        {
          id: "fp-apunte-1",
          title: "Resumen Completo: Punteros, Aritmética de Punteros y Memoria Dinámica (malloc/free)",
          author: "Lucía_G (Matrícula de Honor)",
          authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
          downloads: 1420,
          rating: 4.9,
          reviewsCount: 88,
          pages: 18,
          verified: true,
          badge: "Top Descargas",
          date: "Curso 2025/2026",
          tags: ["Punteros", "C", "Memoria", "Chuleta"],
          previewText: "Guía visual con diagramas de memoria stack vs heap, desreferenciación (*p) y dirección (&p)."
        },
        {
          id: "fp-apunte-2",
          title: "Recopilación de 50 Ejercicios de Examen Resueltos Paso a Paso",
          author: "Comisión de Apuntes GDGoC",
          authorAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
          downloads: 2150,
          rating: 5.0,
          reviewsCount: 134,
          pages: 42,
          verified: true,
          badge: "Oficial GDGoC",
          date: "Enero 2026",
          tags: ["Exámenes", "Resueltos", "Parcial"],
          previewText: "Todos los ejercicios de los últimos 4 años con comentarios explicativos en cada línea de código."
        }
      ],

      // CLASSROOM / MOODLE
      classroom: {
        announcements: [
          {
            title: "Publicación de la Práctica 1: Simulador de Cajero Automático",
            date: "10 de Noviembre",
            author: "Dra. Carmen Delgado",
            content: "Tenéis subido el enunciado en el apartado de Tareas. Recordad que la fecha límite de entrega por Google Drive / Campus es el próximo domingo a las 23:59."
          }
        ],
        assignments: [
          {
            id: "fp-assign-1",
            title: "Práctica 1: Modularidad y Estructuras en C",
            dueDate: "16 Nov, 23:59",
            status: "Entregado",
            statusColor: "#137333",
            grade: "9.5 / 10",
            feedback: "Excelente modularización y control de fugas de memoria con Valgrind."
          },
          {
            id: "fp-assign-2",
            title: "Cuestionario Tema 3: Recursividad y Trazas",
            dueDate: "23 Nov, 14:00",
            status: "Pendiente",
            statusColor: "#b06000",
            grade: "-- / 10",
            feedback: "Aún sin entregar."
          }
        ],
        modules: [
          { number: "Tema 1", title: "Introducción a la Arquitectura Von Neumann y Representación de Datos", slidesCount: 45 },
          { number: "Tema 2", title: "Estructuras de Control y Modularidad", slidesCount: 62 },
          { number: "Tema 3", title: "Gestión de Memoria y Recursividad", slidesCount: 58 }
        ]
      }
    },

    "estructuras-datos": {
      id: "estructuras-datos",
      code: "EDA-202",
      year: "2º Curso • Grado en Informática",
      semester: "1º Cuatrimestre",
      name: "Estructuras de Datos y Algoritmos",
      shortName: "EDA",
      professor: "Dr. Javier Morales Castillo",
      department: "Sistemas Informáticos y Computación",
      themeColor: "#1a73e8",
      accentBg: "#e8f0fe",
      badgeColor: "#174ea6",
      coverGradient: "linear-gradient(135deg, #174ea6 0%, #1a73e8 100%)",
      description: "Análisis asintótico de complejidad, Árboles binarios equilibrados (AVL, Red-Black, B-Trees), Colas de prioridad, Tablas Hash, Grafos y Algoritmos voraces / Dijkstra / Bellman-Ford.",
      stats: { students: 112, notesCount: 45, forumPosts: 124, nextClass: "Hoy 16:00 (En Directo)" },
      meetActive: true,
      meetUrl: "https://meet.google.com/eda-campus-202",

      // AGENTES PERSONALIZADOS DE ESTA CLASE
      agents: [
        {
          id: "tutor-eda",
          name: "Agente Algorítmico & Complejidad",
          role: "Tutor especialista en grafos y árboles AVL",
          avatarIcon: "neurology",
          color: "#1a73e8",
          description: "Calcula complejidades O(N log N), equilibra árboles paso a paso y te explica por qué tu solución no cumple la cota de tiempo.",
          systemPrompt: "Eres el asistente inteligente de Estructuras de Datos y Algoritmos de Google Campus."
        },
        {
          id: "debugger-eda",
          name: "Auditor de Código y Fugas de Memoria",
          role: "Analizador de punteros y estructuras dinámicas C++",
          avatarIcon: "code_blocks",
          color: "#fbbc04",
          description: "Pega tus clases de Grafo o Árbol y detecta punteros colgantes (dangling pointers) y ciclos infinitos.",
          systemPrompt: "Analiza el código C++ de los alumnos detectando fugas de memoria y errores en destructores."
        },
        {
          id: "deepdive-eda",
          name: "Audio Deep Dive Podcast (Estilo NotebookLM)",
          role: "Generador de resúmenes de audio con 2 interlocutores",
          avatarIcon: "podcasts",
          color: "#7c4dff",
          description: "Convierte cualquier tema de EDA en un debate de 5 minutos en audio entre dos voces de IA.",
          systemPrompt: "Genera resúmenes conversacionales amenos para escuchar camino a la universidad."
        }
      ],

      quickPrompts: [
        "¿Por qué el algoritmo de Dijkstra falla con aristas de peso negativo?",
        "Explica cómo funciona la rotación doble izquierda-derecha en un árbol AVL",
        "Genera una tabla comparativa de complejidad entre Hash Abierto y Hash Cerrado"
      ],

      // FORO REDDIT
      forumPosts: [
        {
          id: "eda-post-1",
          author: "Javier_CodeKnight",
          authorRole: "Estudiante 2º año",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 45 minutos",
          flair: "MEME",
          flairColor: "#ea4335",
          title: "El profesor Morales viendo cómo implemento Dijkstra con una matriz de adyacencia para 1.000.000 nodos",
          content: "Mi portátil ha empezado a despegar como un cohete de la NASA y la RAM ha pedido los santos óleos. Complejidad espacial O(V²) goes brrr 🚀💀",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
          votes: 218,
          userVoted: 1,
          commentsCount: 37,
          comments: [
            { author: "Elena_Dev", time: "Hace 30 min", text: "Listas de adyacencia con `std::vector<std::pair<int, int>>` o muerte, amigo mío 😂", upvotes: 31 },
            { author: "Dr. Morales", isTeacher: true, time: "Hace 10 min", text: "Recordad que la práctica tiene un límite estricto de 256 MB de memoria en el juez automático. Si hacéis matriz os dará Out Of Memory al instante.", upvotes: 84 }
          ]
        },
        {
          id: "eda-post-2",
          author: "Carlos_Alba",
          authorRole: "Estudiante 2º",
          authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 3 horas",
          flair: "DUDA EXAMEN",
          flairColor: "#1a73e8",
          title: "¿En el factor de equilibrio de los AVL, restáis altura derecha menos izquierda o al revés?",
          content: "En las diapositivas del Tema 3 pone Fe = h(der) - h(izq), pero en el libro de Cormen lo hacen al revés. ¿Cuál se considera el estándar en la corrección del examen parcial?",
          votes: 64,
          userVoted: 0,
          commentsCount: 9,
          comments: [
            { author: "Lucia_Matricula", time: "Hace 2 horas", text: "En la Complutense usamos siempre `altura(hijo_derecho) - altura(hijo_izquierdo)`. Si da +2 requiere rotación a la izquierda.", upvotes: 24 }
          ]
        },
        {
          id: "eda-post-3",
          author: "GDGoC_Campus_Team",
          authorRole: "GDGoC Lead",
          authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Ayer",
          flair: "EVENTO GDGOC",
          flairColor: "#34a853",
          title: "🏆 Hackathon GDGoC: Optimización de Grafos en Google Cloud (Premios + Swag de Google)",
          content: "¡Hola a todos! Este viernes en el aula 204 tendremos un taller práctico donde aplicaremos algoritmos de caminos mínimos sobre mapas reales de la universidad usando APIs de Google Maps. Habrá pizza gratis y camisetas exclusivas de Google.",
          votes: 185,
          userVoted: 0,
          commentsCount: 22,
          comments: [
            { author: "Marcos_Dev", time: "Ayer", text: "¡Contad conmigo! Llevo a todo el grupo de prácticas.", upvotes: 15 }
          ]
        }
      ],

      // APUNTES WUOLAH
      apuntes: [
        {
          id: "eda-apunte-1",
          title: "Biblia de Árboles AVL y Grafos: Todas las Rotaciones Dibujadas a Mano en iPad",
          author: "Laura Gómez (Premio Fin de Grado)",
          authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          downloads: 3840,
          rating: 4.98,
          reviewsCount: 210,
          pages: 36,
          verified: true,
          badge: "⭐ Oro Wuolah",
          date: "Octubre 2025",
          tags: ["Árboles", "Grafos", "Dijkstra", "Kruskal"],
          previewText: "Diagramas en color de inserción y borrado en árboles AVL, algoritmos voraces sobre grafos y cotas de complejidad demostradas."
        },
        {
          id: "eda-apunte-2",
          title: "Chuleta de Complejidades Asintóticas Big O para el Examen Parcial",
          author: "Rubén_Alonso",
          authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
          downloads: 1980,
          rating: 4.85,
          reviewsCount: 95,
          pages: 4,
          verified: true,
          badge: "Imprescindible",
          date: "Noviembre 2025",
          tags: ["Chuleta", "Big-O", "Master Theorem", "Hash"],
          previewText: "Tabla resumen de operaciones de inserción, búsqueda y borrado en todas las estructuras de datos (mejor, peor y caso medio)."
        },
        {
          id: "eda-apunte-3",
          title: "Solucionario Oficial de Exámenes Parciales (2021 - 2025)",
          author: "Club de Programación GDGoC",
          authorAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
          downloads: 4120,
          rating: 5.0,
          reviewsCount: 312,
          pages: 58,
          verified: true,
          badge: "Verificado GDGoC",
          date: "Enero 2026",
          tags: ["Exámenes", "Parciales", "Soluciones"],
          previewText: "Todos los ejercicios de grafos y árboles resueltos con explicaciones minuciosas de cada paso algorítmico."
        }
      ],

      // CLASSROOM / MOODLE
      classroom: {
        announcements: [
          {
            title: "Sesión Virtual en Directo por Google Meet hoy a las 16:00",
            date: "Hoy, 10:15",
            author: "Dr. Javier Morales",
            content: "Conectaos puntuales. Resolveremos dudas de la Práctica 2 de Grafos y veremos cómo evitar fallos de memoria en el validador automático."
          }
        ],
        assignments: [
          {
            id: "eda-assign-1",
            title: "Práctica 2: Algoritmo de Dijkstra con Montículo Binario en C++",
            dueDate: "Este Viernes, 23:59",
            status: "Pendiente de Calificar",
            statusColor: "#1a73e8",
            grade: "En revisión",
            feedback: "Entregado a tiempo. Juez automático ejecutando tests de rendimiento..."
          },
          {
            id: "eda-assign-2",
            title: "Práctica 1: Diccionarios con Tablas Hash y Resolución de Colisiones",
            dueDate: "20 Octubre",
            status: "Calificado",
            statusColor: "#137333",
            grade: "10 / 10",
            feedback: "Implementación impecable de rehashing dinámico y factor de carga."
          }
        ],
        modules: [
          { number: "Tema 1", title: "Análisis de Algoritmos y Complejidad Asintótica", slidesCount: 54 },
          { number: "Tema 2", title: "Árboles Equilibrados: AVL y Red-Black", slidesCount: 78 },
          { number: "Tema 3", title: "Grafos: Recorridos BFS, DFS y Caminos Mínimos", slidesCount: 92 },
          { number: "Tema 4", title: "Técnicas de Diseño: Divide y Vencerás y Programación Dinámica", slidesCount: 65 }
        ]
      }
    },

    "inteligencia-artificial": {
      id: "inteligencia-artificial",
      code: "IAML-301",
      year: "3º Curso • Grado en Informática",
      semester: "1º Cuatrimestre",
      name: "Inteligencia Artificial y Machine Learning",
      shortName: "IA & ML",
      professor: "Dra. Elena Ramos Santamaría",
      department: "Inteligencia Artificial e Informática Gráfica",
      themeColor: "#7c4dff",
      accentBg: "#f3e8fd",
      badgeColor: "#6200ea",
      coverGradient: "linear-gradient(135deg, #4527a0 0%, #7c4dff 100%)",
      description: "Búsqueda informada y heurísticas (A*, Minimax, Alpha-Beta), Redes Neuronales Profundas, Visión por Computador, Transformers, Fine-Tuning con modelos de Google Gemini y Ética en IA.",
      stats: { students: 86, notesCount: 52, forumPosts: 156, nextClass: "Jueves 11:30" },
      meetActive: false,
      meetUrl: "https://meet.google.com/ai-lab-301",

      // AGENTES PERSONALIZADOS DE ESTA CLASE
      agents: [
        {
          id: "tutor-ia",
          name: "Agente Gemini Deep Research Lab",
          role: "Investigador experto en Deep Learning y PyTorch",
          avatarIcon: "psychology",
          color: "#7c4dff",
          description: "Explica backpropagation, diseña arquitecturas de redes neuronales y optimiza hiperparámetros en Google Colab.",
          systemPrompt: "Eres el asistente avanzado de Inteligencia Artificial para alumnos de 3º de ingeniería."
        },
        {
          id: "heuristic-ia",
          name: "Validador de Heurísticas A*",
          role: "Especialista en admisibilidad y consistencia",
          avatarIcon: "explore",
          color: "#1a73e8",
          description: "Comprueba si tu función heurística h(n) nunca sobreestima el coste real para garantizar optimalidad.",
          systemPrompt: "Demuestra matemáticamente si una heurística es admisible."
        }
      ],

      quickPrompts: [
        "Demuestra por qué la heurística de Manhattan es admisible en el 8-puzzle",
        "Explica el mecanismo de Self-Attention en Transformers con una analogía simple",
        "¿Cómo evito el desvanecimiento del gradiente en redes profundas?"
      ],

      // FORO REDDIT
      forumPosts: [
        {
          id: "ia-post-1",
          author: "Neural_Nerd",
          authorRole: "Estudiante 3º",
          authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 1 hora",
          flair: "MEME",
          flairColor: "#ea4335",
          title: "Mi modelo de PyTorch tras entrenar 14 horas en Google Colab",
          content: "Epoch 100: Loss = 0.0000000001 (Training Set). Accuracy en Test Set: 12%. El sobreajuste (overfitting) más violento de la historia de la humanidad 💀",
          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
          votes: 310,
          userVoted: 1,
          commentsCount: 42,
          comments: [
            { author: "Dani_ML", time: "Hace 40 min", text: "Métele Dropout 0.5 y regularización L2 amigo, o tus pesos se están memorizando los nombres de los perros 😂", upvotes: 49 },
            { author: "Dra. Ramos", isTeacher: true, time: "Hace 15 min", text: "Justo este es el ejemplo que veremos en la sesión de Regularización del jueves. No olvidéis graficar la curva de validación.", upvotes: 72 }
          ]
        },
        {
          id: "ia-post-2",
          author: "Sofia_Data",
          authorRole: "Estudiante 3º",
          authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 5 horas",
          flair: "PROYECTO",
          flairColor: "#7c4dff",
          title: "🚀 Hemos creado un bot de Meet con la API de Gemini para resumir las clases en vivo",
          content: "Como proyecto de la asignatura, un compañero y yo hemos integrado Gemini Flash para transcribir la reunión de Meet y crear notas automáticas en Google Docs. ¿A alguien le gustaría probar la beta?",
          votes: 198,
          userVoted: 0,
          commentsCount: 29,
          comments: [
            { author: "Ariel B. (GDGoC)", time: "Hace 3 horas", text: "¡Brutal! Deberíamos integrarlo directamente en esta propuesta de Google Campus para enseñárselo a los de Google.", upvotes: 38 }
          ]
        }
      ],

      // APUNTES WUOLAH
      apuntes: [
        {
          id: "ia-apunte-1",
          title: "Guía Definitiva de Búsqueda Heurística: A*, IDA*, Minimax y Poda Alpha-Beta",
          author: "Álvaro_ML (Matrícula de Honor)",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
          downloads: 2890,
          rating: 4.96,
          reviewsCount: 167,
          pages: 28,
          verified: true,
          badge: "⭐ Top Ventas",
          date: "Septiembre 2025",
          tags: ["Heurísticas", "A*", "Alpha-Beta", "Juegos"],
          previewText: "Explicación gráfica paso a paso de los árboles de juego con poda, demostraciones de admisibilidad y ejercicios resueltos de examen."
        },
        {
          id: "ia-apunte-2",
          title: "Manual Práctico de PyTorch: Desde Tensores Básicos hasta Redes Convolucionales y Transformers",
          author: "GDGoC AI Study Group",
          authorAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
          downloads: 3410,
          rating: 5.0,
          reviewsCount: 245,
          pages: 50,
          verified: true,
          badge: "Certificado GDGoC",
          date: "Octubre 2025",
          tags: ["PyTorch", "Deep Learning", "CNN", "Transformers"],
          previewText: "Código listo para ejecutar en Google Colab con comentarios detallados en español y optimizaciones de GPU."
        }
      ],

      // CLASSROOM / MOODLE
      classroom: {
        announcements: [
          {
            title: "Nuevo Cuaderno de Google Colab disponible para el Laboratorio de Redes Neuronales",
            date: "8 de Noviembre",
            author: "Dra. Elena Ramos",
            content: "Tenéis el enlace en la pestaña de Materiales. Aseguraos de activar el entorno de ejecución con GPU T4."
          }
        ],
        assignments: [
          {
            id: "ia-assign-1",
            title: "Proyecto 1: Agente Inteligente para el juego Pacman con Algoritmo A*",
            dueDate: "Próximo Domingo, 23:59",
            status: "En Progreso",
            statusColor: "#b06000",
            grade: "Pendiente",
            feedback: "Esperando envío del código fuente en repositorio de GitHub."
          }
        ],
        modules: [
          { number: "Tema 1", title: "Agentes Racionales y Entornos de Búsqueda", slidesCount: 40 },
          { number: "Tema 2", title: "Búsqueda Informada: Heurísticas Admisibles y A*", slidesCount: 68 },
          { number: "Tema 3", title: "Juegos con Adversario y Poda Alpha-Beta", slidesCount: 52 },
          { number: "Tema 4", title: "Redes Neuronales Artificiales y Retropropagación", slidesCount: 84 }
        ]
      }
    }
  },

  // FORO GENERAL DE LA TITULACIÓN / CAMPUS
  degreeForumPosts: [
    {
      id: "general-1",
      author: "Club_GDGoC_Official",
      authorRole: "Organizador Oficial",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      timeAgo: "Hace 1 día",
      flair: "ANUNCIO OFICIAL",
      flairColor: "#1a73e8",
      title: "🎉 Presentación oficial del proyecto GOOGLE CAMPUS al equipo de Google for Education",
      content: "¡Comunidad! Estamos preparando el prototipo final de Google Campus que aúna Classroom + Foros Reddit + Apuntes colaborativos tipo Wuolah + Agentes NotebookLM. ¿Qué funcionalidad no puede faltar para convencer a Google?",
      votes: 420,
      userVoted: 1,
      commentsCount: 64,
      comments: [
        { author: "Carlos_2o", time: "Hace 18 horas", text: "¡La integración con NotebookLM es clave! Que el agente te conteste citando exactamente la página del PDF de la clase.", upvotes: 82 },
        { author: "Maria_3o", time: "Hace 15 horas", text: "Y el sistema de reputación por subir apuntes buenos. Que te den créditos de Google Cloud por compartir notas verificadas.", upvotes: 56 }
      ]
    },
    {
      id: "general-2",
      author: "Cafeteria_Lover",
      authorRole: "Estudiante Veterano",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      timeAgo: "Hace 2 días",
      flair: "MEME",
      flairColor: "#ea4335",
      title: "Ranking definitivo del bocadillo de tortilla de la cafetería de Informática",
      content: "Tras 4 años de riguroso análisis empírico con rigor científico: Calidad: 9/10, Precio: 3.50€, Capacidad de reanimar a un estudiante tras 5 horas de arquitectura: 11/10.",
      votes: 356,
      userVoted: 0,
      commentsCount: 48,
      comments: [
        { author: "Alex_Matematicas", time: "Hace 1 día", text: "La salsa brava que le ponen es lo único que mantiene con vida mis ganas de graduarme.", upvotes: 41 }
      ]
    }
  ]
};

// Respuestas simuladas para el Agente NotebookLM
const AI_SIMULATED_RESPONSES = {
  "dijkstra": `### 📍 Análisis del Algoritmo de Dijkstra con Pesos Negativos

El algoritmo de Dijkstra se basa en una estrategia **voraz (greedy)**: una vez que un nodo se extrae de la cola de prioridad (se marca como visitado), Dijkstra asume que **la distancia calculada hasta ese nodo es mínima y definitiva**.

#### ¿Por qué falla con pesos negativos?
1. Si existe una arista con peso negativo $w(u, v) < 0$, podría existir un camino más largo en número de nodos pero con menor coste total que se descubra después.
2. Como Dijkstra no vuelve a actualizar nodos ya cerrados, **no puede corregir esa distancia**, dando un resultado subóptimo o entrando en bucles infinitos si hay ciclos negativos.

> 📚 **Referencia en el Temario:**
> *[Ver Diapositiva 42, Tema 3 - Grafos y Caminos Mínimos (Prof. Morales)]*

#### 💡 Alternativa Recomendada:
Para grafos con pesos negativos debes utilizar el **Algoritmo de Bellman-Ford** (complejidad $O(V \\cdot E)$) o el algoritmo de **Floyd-Warshall** para todos los pares de nodos.`,

  "avl": `### 🌳 Rotación Doble Izquierda-Derecha en Árboles AVL

La rotación doble **Izquierda-Derecha (LR)** se produce cuando se rompe el equilibrio en un nodo $Z$ con un factor de equilibrio $+2$ (o $-2$ según convenio), pero el hijo izquierdo $Y$ tiene su peso inclinado hacia la derecha (factor $+1$).

#### Pasos de la Transformación:
1. **Paso 1: Rotación Simple a la Izquierda** sobre el hijo $Y$. Esto alinea los tres nodos conflictivos en una línea recta continua.
2. **Paso 2: Rotación Simple a la Derecha** sobre el nodo raíz desbalanceado $Z$.

\`\`\`
      Z (+2)                    Z (+2)                  X (0)
     /                         /                       /     \\
    Y (-1)     ==>            X (+1)     ==>          Y (0)   Z (0)
     \\                       /
      X                     Y
\`\`\`

> 🔍 **Verificado con tus Apuntes:**
> *[Coincide con los diagramas de la página 14 del apunte "Biblia de Árboles AVL" de Laura Gómez]*

¿Quieres que generemos un ejercicio práctico de inserción numérica paso a paso?`,

  "manhattan": `### 🧩 Admisibilidad de la Distancia Manhattan en el 8-Puzzle

Para que una función heurística $h(n)$ sea **admisible**, debe cumplirse que:
$$h(n) \\le h^*(n) \\quad \\forall n$$
donde $h^*(n)$ es el coste real mínimo desde el estado $n$ hasta el estado objetivo.

#### Demostración:
1. La distancia Manhattan calcula la suma de desplazamientos horizontales y verticales de cada ficha hasta su casilla meta:
   $$h(n) = \\sum_{i=1}^{8} (|x_i - x_{i, \\text{meta}}| + |y_i - y_{i, \\text{meta}}|)$$
2. En cada movimiento legal del juego, una ficha solo puede desplazarse **como máximo 1 casilla** adyacente vacía.
3. Por tanto, cada ficha necesita **al menos** tantas jugadas como su distancia Manhattan (asumiendo que no hay ninguna otra ficha bloqueándole el paso).
4. Como los obstáculos solo pueden **aumentar** el número de pasos necesarios pero nunca reducirlo, se concluye que:
   $$h_{\\text{Manhattan}}(n) \\le h^*(n)$$
   **Q.E.D. La heurística es admisible y garantiza la solución óptima en el algoritmo A*.**

> 📌 **Fuente en el Material del Curso:**
> *[Diapositivas Tema 2: Búsqueda Heurística, Dra. Elena Ramos, pág. 35]*`
};
