/**
 * Google Campus - Mock Database & State Store
 * GDGoC (Google Developer Groups on Campus) Project Proposal
 */

const YEAR_DOT_COLORS = {
  1: "#34a853", // 1º Curso: Google Green
  2: "#1a73e8", // 2º Curso: Google Blue
  3: "#ea4335", // 3º Curso: Google Red
  4: "#fbbc04", // 4º Curso: Google Yellow
  0: "#8430ce"  // Cursillos / Talleres / Máster: Purple
};

const CAMPUS_DATA = {
  currentDegree: "Grado en Ingeniería Informática",
  university: "Universidad de Huelva",
  programs: [
    { id: "ing-informatica", name: "Grado en Ing. Informática" },
    { id: "master-ia", name: "Máster en Ciencia de Datos e IA" },
    { id: "cursillos-campus", name: "Cursillos y Talleres (GDGoC)" },
    { id: "all", name: "Todas mis asignaturas" }
  ],
  currentUser: {
    name: "Ariel Bustillo León",
    role: "Estudiante • GDGoC Lead",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    campusPoints: 480,
    enrolledCourses: [
      "fundamentos-programacion",
      "estructuras-datos",
      "inteligencia-artificial",
      "ciberseguridad-auditoria",
      "sistemas-multiagente",
      "taller-cloud-gemini"
    ]
  },

  // Cursos de ejemplo across 4 cursos + Máster + Cursillos
  courses: {
    "fundamentos-programacion": {
      id: "fundamentos-programacion",
      programId: "ing-informatica",
      yearNumber: 1,
      courseLevel: "1º Curso",
      code: "FP-101",
      year: "1º Curso • Grado en Informática",
      semester: "1º Cuatrimestre",
      name: "Fundamentos de Programación",
      shortName: "Prog. 101",
      professor: "Dra. Carmen Delgado Fernández",
      professorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      department: "Departamento de Tecnologías de la Información y Lenguajes Informáticos (DTILI)",
      themeColor: "#34a853",
      accentBg: "#e6f4ea",
      badgeColor: "#137333",
      coverGradient: "linear-gradient(135deg, #0b8043 0%, #34a853 100%)",
      description: "Introducción al diseño algorítmico estructurado, sintaxis moderna en C/Python, estructuras de control, funciones, recursividad y gestión de memoria.",
      stats: { students: 148, notesCount: 34, forumPosts: 92, nextTheory: "Mañana 09:30", nextPractice: "17/11 11:30" },
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
      programId: "ing-informatica",
      yearNumber: 2,
      courseLevel: "2º Curso",
      code: "EDA-202",
      year: "2º Curso • Grado en Informática",
      semester: "1º Cuatrimestre",
      name: "Estructuras de Datos y Algoritmos",
      shortName: "EDA",
      professor: "Dr. Javier Morales Castillo",
      professorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      department: "Departamento de Ingeniería Electrónica, de Sistemas Informáticos y Automática (DIESIA)",
      themeColor: "#1a73e8",
      accentBg: "#e8f0fe",
      badgeColor: "#174ea6",
      coverGradient: "linear-gradient(135deg, #174ea6 0%, #1a73e8 100%)",
      description: "Análisis asintótico de complejidad, Árboles binarios equilibrados (AVL, Red-Black, B-Trees), Colas de prioridad, Tablas Hash, Grafos y Algoritmos voraces / Dijkstra / Bellman-Ford.",
      stats: { students: 112, notesCount: 45, forumPosts: 124, nextTheory: "Hoy 16:00", nextPractice: "16/11 10:30" },
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
            { author: "Lucia_Matricula", time: "Hace 2 horas", text: "En la UHU usamos siempre `altura(hijo_derecho) - altura(hijo_izquierdo)`. Si da +2 requiere rotación a la izquierda.", upvotes: 24 }
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
      programId: "ing-informatica",
      yearNumber: 3,
      courseLevel: "3º Curso",
      code: "IAML-301",
      year: "3º Curso • Grado en Informática",
      semester: "1º Cuatrimestre",
      name: "Inteligencia Artificial y Machine Learning",
      shortName: "IA & ML",
      professor: "Dra. Elena Ramos Santamaría",
      professorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      department: "Departamento de Ciencias de la Computación e Inteligencia Artificial (CCIA)",
      themeColor: "#ea4335",
      accentBg: "#fce8e6",
      badgeColor: "#c5221f",
      coverGradient: "linear-gradient(135deg, #c5221f 0%, #ea4335 100%)",
      description: "Búsqueda informada y heurísticas (A*, Minimax, Alpha-Beta), Redes Neuronales Profundas, Visión por Computador, Transformers, Fine-Tuning con modelos de Google Gemini y Ética en IA.",
      stats: { students: 86, notesCount: 52, forumPosts: 156, nextTheory: "19/11 11:30", nextPractice: "Mañana 12:30" },
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
    },

    "ciberseguridad-auditoria": {
      id: "ciberseguridad-auditoria",
      programId: "ing-informatica",
      yearNumber: 4,
      courseLevel: "4º Curso",
      code: "CIB-404",
      year: "4º Curso • Grado en Informática",
      semester: "1º Cuatrimestre",
      name: "Ciberseguridad y Auditoría Web",
      shortName: "Ciber 404",
      professor: "Dr. Pablo Navarro Ruiz",
      professorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      department: "Departamento de Ingeniería Telemática y Seguridad en Redes Corporativas (DITSR)",
      themeColor: "#fbbc04",
      accentBg: "#fef7e0",
      badgeColor: "#b06000",
      coverGradient: "linear-gradient(135deg, #b06000 0%, #f29900 100%)",
      description: "Pentesting ético, OWASP Top 10, criptografía aplicada, seguridad en Cloud (GCP IAM), análisis forense y auditoría de redes corporativas.",
      stats: { students: 64, notesCount: 29, forumPosts: 78, nextTheory: "18/11 18:00", nextPractice: "20/11 16:00" },
      meetActive: false,
      meetUrl: "https://meet.google.com/cib-uhu-404",
      agents: [
        {
          id: "tutor-cib",
          name: "Agente Auditor OWASP & Pentesting",
          role: "Especialista en vulnerabilidades web y mitigación",
          avatarIcon: "security",
          color: "#f29900",
          description: "Analiza configuraciones, explica inyecciones SQL/XSS de forma defensiva y repasa los laboratorios CTF de clase.",
          systemPrompt: "Eres el tutor de Ciberseguridad enfocado en defensa y buenas prácticas."
        }
      ],
      quickPrompts: [
        "¿Cómo mitigar ataques XSS e Inyección SQL en una API REST?",
        "Diferencias entre cifrado simétrico AES y asimétrico RSA/ECC",
        "Genera un reto CTF rápido sobre cabeceras HTTP seguras"
      ],
      forumPosts: [
        {
          id: "cib-post-1",
          author: "Sec_UHU",
          authorRole: "Estudiante 4º",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 2 horas",
          flair: "MEME",
          flairColor: "#ea4335",
          title: "Yo intentando encontrar la flag del CTF de la práctica 3 mientras Wireshark captura 40.000 paquetes por segundo",
          content: "Mi filtro `http.request.method == POST` me ha salvado la vida y el aprobado.",
          votes: 115,
          userVoted: 0,
          commentsCount: 11,
          comments: [
            { author: "Dr. Navarro", isTeacher: true, time: "Hace 1 hora", text: "Recordad usar `tcp.stream eq X` para seguir la conversación completa sin perderos entre el ruido de la red.", upvotes: 34 }
          ]
        }
      ],
      apuntes: [
        {
          id: "cib-apunte-1",
          title: "Cheat Sheet OWASP Top 10 + Comandos Nmap & Wireshark para el Parcial",
          author: "Nuria_Sec (4º Curso)",
          authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
          downloads: 1340,
          rating: 4.92,
          reviewsCount: 64,
          pages: 15,
          verified: true,
          badge: "Top 4º",
          date: "Noviembre 2026",
          tags: ["OWASP", "CTF", "Redes", "Criptografía"],
          previewText: "Resumen visual de vulnerabilidades web, ejemplos de parches en código y comandos esenciales de auditoría."
        }
      ],
      classroom: {
        announcements: [
          {
            title: "Laboratorio CTF abierto hasta el domingo",
            date: "11 de Noviembre",
            author: "Dr. Pablo Navarro",
            content: "Ya tenéis el entorno aislado desplegado en Google Cloud. Subid las flags capturadas antes del domingo."
          }
        ],
        assignments: [
          {
            id: "cib-assign-1",
            title: "Auditoría de Vulnerabilidades OWASP sobre App de Prueba",
            dueDate: "Domingo, 23:59",
            status: "Pendiente",
            statusColor: "#b06000",
            grade: "-- / 10",
            feedback: "Entrega del informe técnico en PDF por Classroom."
          }
        ],
        modules: [
          { number: "Tema 1", title: "Fundamentos de Criptografía Aplicada y PKI", slidesCount: 48 },
          { number: "Tema 2", title: "Seguridad Web y OWASP Top 10", slidesCount: 72 },
          { number: "Tema 3", title: "Auditoría de Redes y Análisis Forense", slidesCount: 55 }
        ]
      }
    },

    "sistemas-multiagente": {
      id: "sistemas-multiagente",
      programId: "master-ia",
      yearNumber: 1,
      courseLevel: "1º Curso",
      code: "MIA-502",
      year: "Máster en Ciencia de Datos e IA",
      semester: "1º Cuatrimestre",
      name: "Sistemas Multiagente & LLMs",
      shortName: "LLMs Máster",
      professor: "Dra. Elena Ramos Santamaría",
      professorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      department: "Departamento de Ciencias de la Computación e Inteligencia Artificial (CCIA)",
      themeColor: "#34a853",
      accentBg: "#e6f4ea",
      badgeColor: "#137333",
      coverGradient: "linear-gradient(135deg, #0b8043 0%, #34a853 100%)",
      description: "Diseño de arquitecturas RAG, orquestación de agentes autónomos con herramientas (MCP, Tool Use), evaluación de modelos Gemini y despliegue en Vertex AI.",
      stats: { students: 38, notesCount: 19, forumPosts: 46, nextTheory: "Hoy 19:00", nextPractice: "18/11 19:00" },
      meetActive: false,
      meetUrl: "https://meet.google.com/mia-agents-502",
      agents: [
        {
          id: "tutor-mia",
          name: "Agente Arquitecto Vertex AI & RAG",
          role: "Especialista en evaluación de agentes y embeddings",
          avatarIcon: "hub",
          color: "#34a853",
          description: "Resuelve dudas sobre chunking, reranking, function calling y trazabilidad en sistemas multiagente.",
          systemPrompt: "Eres el asistente de posgrado para Sistemas Multiagente."
        }
      ],
      quickPrompts: [
        "¿Cuándo usar RAG híbrido frente a Fine-Tuning?",
        "Explica cómo reducir alucinaciones en pipelines multiagente",
        "Compara estrategias de chunking semántico vs tamaño fijo"
      ],
      forumPosts: [
        {
          id: "mia-post-1",
          author: "Carlos_Research",
          authorRole: "Alumno Máster",
          authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 4 horas",
          flair: "DUDA",
          flairColor: "#1a73e8",
          title: "¿Alguien ha probado ya el SDK de Gemini con Vertex AI para el proyecto de agentes?",
          content: "Estamos midiendo latencias entre streaming y respuesta completa con tool calling paralelo. ¿Qué métricas de evaluación estáis usando?",
          votes: 48,
          userVoted: 0,
          commentsCount: 7,
          comments: [
            { author: "Dra. Ramos", isTeacher: true, time: "Hace 2 horas", text: "Subí una plantilla de evaluación con LLM-as-a-judge en el Tema 2 del Classroom.", upvotes: 19 }
          ]
        }
      ],
      apuntes: [
        {
          id: "mia-apunte-1",
          title: "Patrones de Diseño en Agentes Autónomos (ReAct, Plan-and-Solve, Reflection)",
          author: "Grupo Investigación UHU",
          authorAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
          downloads: 620,
          rating: 4.95,
          reviewsCount: 31,
          pages: 24,
          verified: true,
          badge: "Máster",
          date: "Noviembre 2026",
          tags: ["RAG", "Agentes", "Gemini", "Vertex AI"],
          previewText: "Comparativa práctica de patrones agénticos con diagramas de flujo y ejemplos de implementación."
        }
      ],
      classroom: {
        announcements: [
          {
            title: "Seminario invitado de Google Cloud AI este viernes",
            date: "Hoy, 09:00",
            author: "Dra. Elena Ramos",
            content: "Contaremos con un Developer Advocate de Google para hablar sobre arquitecturas agénticas en producción."
          }
        ],
        assignments: [
          {
            id: "mia-assign-1",
            title: "Paper Review + Demo de Agente RAG Evaluado",
            dueDate: "28 Nov, 23:59",
            status: "En Progreso",
            statusColor: "#1a73e8",
            grade: "-- / 10",
            feedback: "Pendiente de entrega."
          }
        ],
        modules: [
          { number: "Tema 1", title: "Fundamentos de LLMs y Function Calling", slidesCount: 50 },
          { number: "Tema 2", title: "Sistemas RAG Avanzados y Evaluación", slidesCount: 64 }
        ]
      }
    },

    "taller-cloud-gemini": {
      id: "taller-cloud-gemini",
      programId: "cursillos-campus",
      yearNumber: 0,
      courseLevel: "Cursillo",
      code: "GDG-CLOUD",
      year: "Cursillo • GDGoC UHU",
      semester: "Edición Otoño 2026",
      name: "Taller Cloud & Gemini API",
      shortName: "Cloud & Gemini",
      professor: "Equipo GDGoC UHU",
      professorAvatar: "assets/icons/gdgoc-uhu-logo.webp",
      department: "Google Developer Group on Campus • Universidad de Huelva (GDGoC UHU)",
      themeColor: "#8430ce",
      accentBg: "#f3e8fd",
      badgeColor: "#681da8",
      coverGradient: "linear-gradient(135deg, #681da8 0%, #8430ce 100%)",
      description: "Cursillo práctico abierto a toda la universidad: despliega tu primera app con Cloud Run, Firebase y la API de Gemini. ¡Con certificado Open Badge oficial de gdguhu.com!",
      stats: { students: 210, notesCount: 14, forumPosts: 63, nextTheory: "Hoy 17:00", nextPractice: "20/11 17:00" },
      meetActive: true,
      meetUrl: "https://meet.google.com/gdgoc-uhu-cloud",
      agents: [
        {
          id: "tutor-gdg-cloud",
          name: "Asistente de Workshop GDGoC UHU",
          role: "Guía paso a paso del taller y créditos Cloud",
          avatarIcon: "cloud",
          color: "#8430ce",
          description: "Te ayuda con errores de Docker, Cloud Run, variables de entorno y obtención de tu Open Badge en gdguhu.com.",
          systemPrompt: "Ayuda a los asistentes del cursillo de GDGoC UHU a completar su proyecto."
        }
      ],
      quickPrompts: [
        "¿Cómo canjeo los créditos gratuitos de Google Cloud del taller?",
        "Pasos para desplegar una web estática o API en Cloud Run",
        "¿Cómo consigo el certificado Open Badge en gdguhu.com?"
      ],
      forumPosts: [
        {
          id: "gdg-post-1",
          author: "Ariel_GDGoC_UHU",
          authorRole: "GDGoC Lead",
          authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 3 horas",
          flair: "EVENTO GDGOC",
          flairColor: "#34a853",
          title: "🍕 ¡Este viernes Taller en la ETSI + Pizza y Open Badges verificables en gdguhu.com!",
          content: "No hace falta experiencia previa. Traed el portátil cargado y os lleváis una app desplegada en Google Cloud y vuestra insignia digital oficial de GDGoC UHU.",
          votes: 174,
          userVoted: 1,
          commentsCount: 19,
          comments: [
            { author: "Laura_1o", time: "Hace 2 horas", text: "¡Soy de primero y es mi primer taller, qué ganas!", upvotes: 22 }
          ]
        }
      ],
      apuntes: [
        {
          id: "gdg-apunte-1",
          title: "Guía Rápida del Taller: CLI de gcloud, Cloud Run y Gemini Starter Kit",
          author: "GDGoC UHU Tech Team",
          authorAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
          downloads: 890,
          rating: 5.0,
          reviewsCount: 54,
          pages: 12,
          verified: true,
          badge: "Oficial GDGoC UHU",
          date: "Noviembre 2026",
          tags: ["Cloud Run", "Gemini API", "Docker", "Open Badges"],
          previewText: "Todos los comandos listos para copiar y pegar durante el taller presencial y online."
        }
      ],
      classroom: {
        announcements: [
          {
            title: "Acreditaciones digitales listas tras completar el reto",
            date: "Hoy, 12:00",
            author: "Equipo GDGoC UHU",
            content: "Al finalizar el despliegue podrás reclamar tu certificado verificable directamente en gdguhu.com."
          }
        ],
        assignments: [
          {
            id: "gdg-assign-1",
            title: "Reto Final: Tu propia App con Gemini API desplegada",
            dueDate: "Próximo Miércoles",
            status: "Abierto",
            statusColor: "#137333",
            grade: "Open Badge",
            feedback: "Sube la URL de tu despliegue para recibir tu certificado."
          }
        ],
        modules: [
          { number: "Sesión 1", title: "Configuración de Google Cloud & API Key de Gemini", slidesCount: 28 },
          { number: "Sesión 2", title: "Despliegue Serverless con Cloud Run", slidesCount: 34 }
        ]
      }
    },

    "bootcamp-flutter": {
      id: "bootcamp-flutter",
      programId: "cursillos-campus",
      yearNumber: 0,
      courseLevel: "Cursillo",
      code: "GDG-FLUT",
      year: "Cursillo • GDGoC UHU",
      semester: "Intensivo",
      name: "Bootcamp Flutter & Firebase",
      shortName: "Flutter",
      professor: "Mentores Mobile GDGoC UHU",
      professorAvatar: "assets/icons/gdgoc-uhu-logo.webp",
      department: "Google Developer Group on Campus • Universidad de Huelva (GDGoC UHU)",
      themeColor: "#8430ce",
      accentBg: "#f3e8fd",
      badgeColor: "#681da8",
      coverGradient: "linear-gradient(135deg, #681da8 0%, #8430ce 100%)",
      description: "Aprende a crear apps multiplataforma Android, iOS y Web con Material Design 3 y autenticación en tiempo real con Firebase.",
      stats: { students: 165, notesCount: 21, forumPosts: 52, nextTheory: "Mañana 10:30", nextPractice: "21/11 10:30" },
      meetActive: false,
      meetUrl: "https://meet.google.com/gdgoc-uhu-flutter",
      agents: [
        {
          id: "tutor-flutter",
          name: "Mentor Dart & Widgets Material 3",
          role: "Especialista en UI Flutter y Firebase Auth",
          avatarIcon: "smartphone",
          color: "#8430ce",
          description: "Resuelve errores de árbol de widgets, StatefulWidget vs Riverpod y reglas de Firestore.",
          systemPrompt: "Eres un mentor amigable del bootcamp de Flutter de GDGoC UHU."
        }
      ],
      quickPrompts: [
        "Diferencia práctica entre StatelessWidget y StatefulWidget",
        "¿Cómo conectar Flutter con Firebase Auth en 5 minutos?",
        "Ejemplo de tarjeta Material Design 3 limpia en Dart"
      ],
      forumPosts: [
        {
          id: "flt-post-1",
          author: "Marta_Mobile",
          authorRole: "Participante",
          authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Ayer",
          flair: "PROYECTO",
          flairColor: "#8430ce",
          title: "¡Mi primer Hot Reload funcionando en el móvil físico! Qué maravilla",
          content: "Vengo de compilar proyectos pesados en C y ver que la UI cambia en 0.2 segundos sin reiniciar la app es magia pura.",
          votes: 92,
          userVoted: 0,
          commentsCount: 14,
          comments: [
            { author: "Mentor_GDG", time: "Ayer", text: "¡Es el superpoder de Flutter! En la sesión 2 le metemos Firebase en tiempo real.", upvotes: 18 }
          ]
        }
      ],
      apuntes: [
        {
          id: "flt-apunte-1",
          title: "Catálogo de Widgets Esenciales & Plantilla Material 3",
          author: "GDGoC UHU Mobile",
          authorAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
          downloads: 740,
          rating: 4.9,
          reviewsCount: 41,
          pages: 16,
          verified: true,
          badge: "Starter Pack",
          date: "Octubre 2026",
          tags: ["Flutter", "Dart", "Firebase", "UI"],
          previewText: "Esquema visual de Row, Column, Stack, ListView y navegación en Flutter."
        }
      ],
      classroom: {
        announcements: [
          {
            title: "Instalación previa de Flutter SDK recomendada antes del sábado",
            date: "9 de Noviembre",
            author: "Mentores GDGoC UHU",
            content: "Ejecutad `flutter doctor` en vuestra terminal y si da algún fallo preguntadlo en el foro antes de la sesión."
          }
        ],
        assignments: [
          {
            id: "flt-assign-1",
            title: "Mini-App: Lista de Tareas con Firestore",
            dueDate: "Siguiente Semana",
            status: "Abierto",
            statusColor: "#137333",
            grade: "Open Badge",
            feedback: "Entrega tu repo de GitHub."
          }
        ],
        modules: [
          { number: "Módulo 1", title: "Dart Moderno y Árbol de Widgets", slidesCount: 36 },
          { number: "Módulo 2", title: "Estado y Conexión con Firebase", slidesCount: 44 }
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

