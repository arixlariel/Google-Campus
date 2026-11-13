/**
 * Google Campus - Mock Data Store (Universidad de Huelva - ETSI / GDGoC UHU)
 * Incluye:
 * - Código de colores Google por curso académico (1º, 2º, 3º, 4º)
 * - Selector de titulaciones y espacios con icono y color propio por categoría
 * - 12 asignaturas reales del Grado en Ingeniería Informática de la UHU (3 por año)
 * - Espacios adicionales (Máster, GDGoC UHU, Cisco CCNA, Investigación Docente, SAE Realidad Virtual, Idiomas, Mentoría, Prácticas)
 * - Sistema de Campus Points (cómo ganar y catálogo de canje)
 */

// Progresión cromática oficial de Google por curso académico
const YEAR_DOT_COLORS = {
  1: "#34a853", // 1º Curso -> Verde Google (Inicio, bases y fundamentos)
  2: "#1a73e8", // 2º Curso -> Azul Google (Núcleo troncal de ingeniería)
  3: "#fbbc04", // 3º Curso -> Amarillo/Ámbar Google (Especialización e intensificación)
  4: "#ea4335", // 4º Curso -> Rojo Google (Culminación, optativas avanzadas y TFG)
  5: "#7c4dff", // Máster / Postgrado -> Violeta Gemini
  0: "#0097a7"  // Comunidades / Certificaciones / SAE -> Cian / Color de programa
};

const YEAR_COLOR_LEGEND = [
  { year: 1, label: "1º Curso", desc: "Fundamentos", color: "#34a853" },
  { year: 2, label: "2º Curso", desc: "Troncal", color: "#1a73e8" },
  { year: 3, label: "3º Curso", desc: "Especialización", color: "#fbbc04" },
  { year: 4, label: "4º Curso", desc: "Culminación & TFG", color: "#ea4335" }
];

const CAMPUS_DATA = {
  currentUser: {
    name: "Ariel Bustillo",
    role: "Estudiante • 3º Grado en Ingeniería Informática (GDGoC Lead)",
    email: "ariel.bustillo@alu.uhu.es",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    campusPoints: 480,
    karma: 1420,
    badges: ["GDGoC Organizer", "Top Contributor Wuolah", "Mentor ETSI"],
    redeemedRewards: []
  },

  // Sistema de Gamificación y Economía Colaborativa: Campus Points
  pointsSystem: {
    explanation: "Los Campus Points premian la colaboración académica verificada dentro de la Universidad de Huelva. A diferencia de plataformas externas con publicidad intrusiva, Google Campus convierte tus aportaciones en recursos tecnológicos reales, créditos Cloud y servicios universitarios.",
    earnMethods: [
      {
        id: "earn-upload",
        icon: "upload_file",
        color: "#1a73e8",
        title: "Subir apuntes originales verificados",
        desc: "Tus PDFs pasan revisión automática de calidad con Gemini y se indexan en el NotebookLM de la asignatura.",
        points: "+50 pts"
      },
      {
        id: "earn-downloads",
        icon: "trending_up",
        color: "#34a853",
        title: "Regalías por descargas y 5★ en Wuolah / StuDocu",
        desc: "Bonificación automática cada 25 descargas o valoraciones sobresalientes de compañeros de tu curso.",
        points: "+15 pts"
      },
      {
        id: "earn-reddit",
        icon: "check_circle",
        color: "#ea4335",
        title: "Respuesta marcada como Solución en Reddit",
        desc: "Cuando resuelves una duda de código o teoría y el profesor o el autor valida tu explicación.",
        points: "+25 pts"
      },
      {
        id: "earn-exam",
        icon: "quiz",
        color: "#fbbc04",
        title: "Subir examen resuelto de convocatoria oficial",
        desc: "Solucionarios paso a paso de parciales o finales de años anteriores revisados por la comunidad.",
        points: "+40 pts"
      },
      {
        id: "earn-notebook",
        icon: "neurology",
        color: "#7c4dff",
        title: "Mejorar fuentes del Agente NotebookLM",
        desc: "Aportar resúmenes estructurados, flashcards o reportar erratas en las diapositivas oficiales.",
        points: "+10 pts"
      }
    ],
    rewards: [
      {
        id: "rew-copisteria",
        icon: "print",
        color: "#1a73e8",
        title: "Bono 100 Impresiones Copistería ETSI",
        desc: "Impresión gratuita a doble cara sin publicidad en la copistería del Campus de El Carmen.",
        cost: 150
      },
      {
        id: "rew-cafeteria",
        icon: "local_cafe",
        color: "#e37400",
        title: "Menú Desayuno Cafetería Campus El Carmen",
        desc: "Café + tostada entera o bocadillo canjeable con QR desde tu carnet universitario UHU.",
        cost: 120
      },
      {
        id: "rew-gcp",
        icon: "cloud",
        color: "#34a853",
        title: "50$ en Créditos Google Cloud & Vertex AI",
        desc: "Para desplegar tus prácticas de Sistemas Distribuidos, TFG o entrenar modelos con GPUs.",
        cost: 300
      },
      {
        id: "rew-swag",
        icon: "Checkroom",
        color: "#ea4335",
        title: "Pack Merchandising Oficial GDGoC UHU & Google",
        desc: "Sudadera bordada del club, botella térmica Google Developer y pack de stickers.",
        cost: 400
      },
      {
        id: "rew-cert",
        icon: "verified",
        color: "#7c4dff",
        title: "Voucher 100% Examen Google Cloud / Cisco CCNA",
        desc: "Código oficial para examinarte gratis de Associate Cloud Engineer, TensorFlow o CCNA.",
        cost: 800
      }
    ]
  },

  // Selector de Titulaciones, Posgrados, Comunidades y Cursos con color e icono propio
  programs: [
    {
      id: "ing-informatica",
      name: "Grado en Ingeniería Informática",
      category: "Grado Oficial UHU",
      icon: "school",
      color: "#1a73e8",
      bgTint: "#e8f0fe"
    },
    {
      id: "master-ia",
      name: "Máster en Ingeniería Informática e IA",
      category: "Máster Universitario",
      icon: "workspace_premium",
      color: "#7c4dff",
      bgTint: "#f3e8fd"
    },
    {
      id: "gdgoc-uhu",
      name: "GDGoC UHU",
      category: "Club & Comunidad Google",
      icon: "code_blocks",
      color: "#0f9d58",
      bgTint: "#e6f4ea"
    },
    {
      id: "cisco-ccna",
      name: "Curso Cisco CCNA",
      category: "Certificación Profesional",
      icon: "router",
      color: "#0097a7",
      bgTint: "#e0f7fa"
    },
    {
      id: "investigacion-docente",
      name: "Investigación Docente",
      category: "Grupo I+D+i & Semilleros",
      icon: "science",
      color: "#d93025",
      bgTint: "#fce8e6"
    },
    {
      id: "sae-rv",
      name: "SAE Realidad Virtual",
      category: "Actividades Estudiantiles (SAE)",
      icon: "view_in_ar",
      color: "#e37400",
      bgTint: "#fef7e0"
    },
    {
      id: "idiomas-uhu",
      name: "Escuela de Idiomas UHU (B2/C1)",
      category: "Acreditación Lingüística",
      icon: "translate",
      color: "#c2185b",
      bgTint: "#fce4ec"
    },
    {
      id: "mentoria-caruh",
      name: "Mentoría y Delegación (ETSI)",
      category: "Representación Estudiantil",
      icon: "diversity_3",
      color: "#00796b",
      bgTint: "#e0f2f1"
    },
    {
      id: "practicas-soea",
      name: "Prácticas Externas y Empleo (SOEA)",
      category: "Inserción Laboral & Empresas",
      icon: "work",
      color: "#5c6bc0",
      bgTint: "#e8eaf6"
    },
    {
      id: "all",
      name: "Todos mis espacios",
      category: "Vista Global Unificada",
      icon: "grid_view",
      color: "#5f6368",
      bgTint: "#f1f3f4"
    }
  ],

  courses: {
    // =========================================================================
    // GRADO EN INGENIERÍA INFORMÁTICA (UHU - 12 ASIGNATURAS REALES: 3 POR CURSO)
    // =========================================================================

    // --- 1º CURSO (VERDE #34a853) ---
    "fundamentos-programacion": {
      id: "fundamentos-programacion",
      programId: "ing-informatica",
      code: "606010202",
      name: "Fundamentos de Programación",
      shortName: "FP",
      year: "1º Curso • Grado en Ingeniería Informática",
      courseLevel: "1º Curso",
      yearNumber: 1,
      semester: "1º Cuatrimestre",
      professor: "Dra. Carmen Márquez Ruiz",
      professorEmail: "carmen.marquez@dti.uhu.es",
      officeLocation: "Pabellón 7 (ETSI), Planta 2, Despacho 2.14",
      officeHours: "Martes y Jueves de 11:30 a 14:30",
      professorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Tecnologías de la Información (DTI)",
      themeColor: "#34a853",
      coverGradient: "linear-gradient(135deg, #137333 0%, #34a853 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-fp1-etsi",
      description: "Introducción a la algorítmica, tipos de datos estructurados, diseño modular y programación en C++ en la ETSI de Huelva.",
      unread: { classroom: 2, reddit: 6, apuntes: 3, notebook: 1, meet: 1 },
      stats: {
        students: 158,
        notesCount: 38,
        forumPosts: 94,
        nextTheory: "Mañana 09:00",
        nextPractice: "16/11 11:00"
      },
      agents: [
        {
          id: "tutor-fp",
          name: "Tutor Socrático de C++ (FP)",
          role: "Revisa tu código sin darte la solución hecha y detecta bucles infinitos",
          avatarIcon: "terminal",
          color: "#34a853",
          systemGreeting: "¡Hola! Soy el Agente de Fundamentos de Programación (UHU). Pega tu código en C++ y te guiaré paso a paso con punteros, structs y vectores."
        },
        {
          id: "examinador-fp",
          name: "Generador de Parciales FP",
          role: "Crea ejercicios de trazas y tablas de vectores de convocatorias UHU",
          avatarIcon: "quiz",
          color: "#1a73e8",
          systemGreeting: "¿Practicamos para el parcial de laboratorio de C++? Pídeme un problema de matrices o registros."
        }
      ],
      quickPrompts: [
        "¿Diferencia entre paso por valor y por referencia (&) en C++?",
        "Hazme un ejercicio tipo examen de structs y vectores estáticos",
        "¿Por qué se salta el getline() después de usar cin >>?"
      ]
    },

    "fundamentos-computadores": {
      id: "fundamentos-computadores",
      programId: "ing-informatica",
      code: "606010104",
      name: "Fundamentos de Computadores",
      shortName: "FC",
      year: "1º Curso • Grado en Ingeniería Informática",
      courseLevel: "1º Curso",
      yearNumber: 1,
      semester: "1º Cuatrimestre",
      professor: "Dr. Manuel Jesús Cuevas",
      professorEmail: "manuel.cuevas@diesia.uhu.es",
      officeLocation: "Pabellón 6 (ETSI), Lab Electrónica Digital, Despacho 1.08",
      officeHours: "Lunes y Miércoles de 10:00 a 13:00",
      professorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Ingeniería Electrónica, de Sistemas Informáticos y Automática (DIESIA)",
      themeColor: "#34a853",
      coverGradient: "linear-gradient(135deg, #0d652d 0%, #1e8e3e 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-fc1-etsi",
      description: "Representación de la información, Álgebra de Boole, puertas lógicas, mapas de Karnaugh, sistemas combinacionales y secuenciales (biestables y autómatas).",
      unread: { classroom: 1, reddit: 4, apuntes: 2, notebook: 2, meet: 0 },
      stats: {
        students: 162,
        notesCount: 44,
        forumPosts: 76,
        nextTheory: "17/11 10:30",
        nextPractice: "19/11 12:30"
      },
      agents: [
        {
          id: "tutor-fc",
          name: "Asistente de Sistemas Digitales y Karnaugh",
          role: "Simplifica funciones booleanas y verifica máquinas de estados (Mealy/Moore)",
          avatarIcon: "memory",
          color: "#34a853",
          systemGreeting: "¡Hola! Soy el Agente de Fundamentos de Computadores. ¿Revisamos representación en Complemento a 2, IEEE 754 o simplificación por Karnaugh?"
        }
      ],
      quickPrompts: [
        "¿Cómo paso un número negativo a IEEE 754 de simple precisión?",
        "Explícame la diferencia entre máquina de Moore y de Mealy",
        "¿Cómo agrupar términos indiferentes (X) en un mapa de Karnaugh?"
      ]
    },

    "matematica-discreta": {
      id: "matematica-discreta",
      programId: "ing-informatica",
      code: "606010105",
      name: "Matemática Discreta y Lógica",
      shortName: "MDL",
      year: "1º Curso • Grado en Ingeniería Informática",
      courseLevel: "1º Curso",
      yearNumber: 1,
      semester: "2º Cuatrimestre",
      professor: "Dra. Beatriz Toscano Feria",
      professorEmail: "beatriz.toscano@dci.uhu.es",
      officeLocation: "Facultad de Ciencias Experimentales / ETSI, Despacho 3.11",
      officeHours: "Martes y Viernes de 09:30 a 12:30",
      professorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Ciencias Integradas y Matemáticas (DCIM)",
      themeColor: "#34a853",
      coverGradient: "linear-gradient(135deg, #188038 0%, #34a853 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-mdl-etsi",
      description: "Lógica proposicional y de predicados, inducción matemática, combinatoria, aritmética modular, relaciones de equivalencia y teoría de grafos.",
      unread: { classroom: 3, reddit: 2, apuntes: 5, notebook: 1, meet: 0 },
      stats: {
        students: 149,
        notesCount: 51,
        forumPosts: 62,
        nextTheory: "18/11 09:00",
        nextPractice: "20/11 11:00"
      },
      agents: [
        {
          id: "tutor-mdl",
          name: "Tutor de Lógica y Demostraciones",
          role: "Guía paso a paso en deducción natural, inducción y ecuaciones diofánticas",
          avatarIcon: "functions",
          color: "#34a853",
          systemGreeting: "¡Hola! Soy tu Agente de Matemática Discreta y Lógica. Puedo ayudarte con demostraciones por inducción, algoritmo de Euclides extendido y árboles generadores."
        }
      ],
      quickPrompts: [
        "Resuelve paso a paso una ecuación de congruencias lineal",
        "¿Cómo funciona la demostración por reducción al absurdo en lógica?",
        "Diferencia entre grafo euleriano y grafo hamiltoniano"
      ]
    },

    // --- 2º CURSO (AZUL #1a73e8) ---
    "estructuras-datos": {
      id: "estructuras-datos",
      programId: "ing-informatica",
      code: "606010206",
      name: "Estructuras de Datos",
      shortName: "ED",
      year: "2º Curso • Grado en Ingeniería Informática",
      courseLevel: "2º Curso",
      yearNumber: 2,
      semester: "1º Cuatrimestre",
      professor: "Dr. Javier Morales Ortega",
      professorEmail: "javier.morales@dti.uhu.es",
      officeLocation: "Pabellón 7 (ETSI), Planta 2, Despacho 2.09",
      officeHours: "Lunes y Miércoles de 11:00 a 14:00",
      professorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Tecnologías de la Información (DTI)",
      themeColor: "#1a73e8",
      coverGradient: "linear-gradient(135deg, #174ea6 0%, #1a73e8 100%)",
      meetActive: true,
      meetUrl: "https://meet.google.com/uhu-ed2-etsi",
      description: "Especificación algebraica e implementación de TADs lineales (pilas, colas, listas), árboles binarios de búsqueda, AVL, montículos, tablas hash y grafos.",
      unread: { classroom: 4, reddit: 9, apuntes: 5, notebook: 3, meet: 2 },
      stats: {
        students: 142,
        notesCount: 64,
        forumPosts: 128,
        nextTheory: "Mañana 10:30",
        nextPractice: "18/11 12:30"
      },
      agents: [
        {
          id: "tutor-eda",
          name: "Tutor de Estructuras de Datos y Complejidad",
          role: "Especialista en TADs, árboles AVL, tablas Hash y algoritmos de grafos",
          avatarIcon: "account_tree",
          color: "#1a73e8",
          systemGreeting: "¡Hola! Soy el Agente de Estructuras de Datos de la UHU. He indexado todas las transparencias de clase, los apuntes de la comunidad y las prácticas en C++. ¿Qué repasamos?"
        },
        {
          id: "revisor-cpp",
          name: "Auditor de Memoria Dinámica y Punteros",
          role: "Detecta fugas de memoria (memory leaks) y punteros colgantes en tus TADs",
          avatarIcon: "bug_report",
          color: "#ea4335",
          systemGreeting: "Pega la implementación de tu destructor ~Lista() o ~ArbolAVL() y verificaré que no quede ningún nodo sin liberar."
        }
      ],
      quickPrompts: [
        "Explícame las rotaciones dobles en árboles AVL con un ejemplo",
        "¿Por qué Dijkstra falla con aristas de peso negativo?",
        "Compara tablas Hash abiertas vs cerradas en complejidad O()"
      ],
      forumPosts: [
        {
          id: "post-ed-1",
          author: "CarlosM_99",
          authorRole: "Estudiante 2º Año",
          authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 2 horas",
          flair: "MEME",
          flairColor: "#ea4335",
          title: "Yo intentando balancear un Árbol Rojo-Negro a mano en el parcial de las 8:30 AM en el Aulario José Isidoro Morales 😭",
          content: "El profesor dijo que solo entraban rotaciones simples de AVL y de repente aparece un árbol degenerado de 14 niveles...",
          image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80",
          votes: 284,
          userVoted: 1,
          commentsCount: 34,
          comments: [
            { author: "Laura_Code", time: "Hace 1h", text: "Literalmente media clase dibujando flechas con colores en el folio en sucio 😂", upvotes: 45 },
            { author: "Dr. Javier Morales", isTeacher: true, time: "Hace 35m", text: "¡Tranquilos! En el examen oficial solo pediremos rotaciones simples y dobles de AVL, no Rojo-Negro 😉", upvotes: 112 }
          ]
        },
        {
          id: "post-ed-2",
          author: "Elena_Dev",
          authorRole: "Delegada de 2º Curso",
          authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 5 horas",
          flair: "DUDA PRÁCTICA 2",
          flairColor: "#1a73e8",
          title: "[SOLUCIONADO] Segmentation Fault al borrar el nodo raíz en un ABB con dos hijos",
          content: "Cuando llamo a eliminar(raiz, clave) y el nodo tiene tanto hijo izquierdo como derecho, reemplazo por el mínimo del subárbol derecho pero pierdo el puntero padre. ¿Alguien sabe si hay que pasar Node*& por referencia?",
          votes: 96,
          userVoted: 0,
          commentsCount: 19,
          comments: [
            { author: "Ariel Bustillo", time: "Hace 4h", text: "¡Exacto! En la especificación de la ETSI pasamos `Nodo*& p` como puntero por referencia para que al reasignar `p = aux` el enlace del padre se actualice automáticamente.", upvotes: 29 }
          ]
        }
      ],
      apuntes: [
        {
          id: "apunte-ed-1",
          title: "Apuntes Completos Estructuras de Datos UHU (Temas 1 al 6 + Árboles AVL y Grafos)",
          author: "Laura Gómez (Matrícula de Honor 9.8)",
          authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
          downloads: 1840,
          rating: 4.9,
          reviewsCount: 142,
          pages: 48,
          verified: true,
          badge: "Top Descargas UHU",
          date: "Curso 2025/2026",
          tags: ["AVL", "Grafos", "TADs", "C++"],
          previewText: "Tema 4: Árboles Binarios de Búsqueda Equilibrados (AVL). Un árbol AVL es un ABB en el que para todo nodo la diferencia de altura entre su subárbol izquierdo y derecho es como máximo 1..."
        },
        {
          id: "apunte-ed-2",
          title: "Recopilación Exámenes Resueltos ED (Convocatorias Febrero y Septiembre 2021-2025)",
          author: "Marcos Ruiz (GDGoC Core Team)",
          authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
          downloads: 1320,
          rating: 4.8,
          reviewsCount: 89,
          pages: 32,
          verified: true,
          badge: "Exámenes Oficiales",
          date: "Actualizado hace 4 días",
          tags: ["Exámenes", "C++", "Punteros", "TAD"],
          previewText: "Ejercicio 1 (3.5 puntos): Dado el TAD Consultorio Médico implementado mediante una Tabla Hash abierta de colas de prioridad, implemente en C++ el método atenderSiguientePaciente()..."
        }
      ],
      classroom: {
        announcements: [
          {
            id: "ann-ed-1",
            author: "Dr. Javier Morales Ortega",
            date: "Hoy, 09:15",
            title: "Publicada la Práctica 3: Árboles AVL y Diccionarios en C++",
            content: "Ya tenéis disponible en el repositorio el código base de la Práctica 3. La defensa en el laboratorio B2.1 será la semana del 27 de noviembre."
          },
          {
            id: "ann-ed-2",
            author: "Dr. Javier Morales Ortega",
            date: "Hace 3 días",
            title: "Cambio de aula para el seminario de complejidad asintótica",
            content: "El seminario de este viernes pasa al Salón de Grados de la ETSI para poder proyectar el visualizador interactivo de grafos."
          }
        ],
        modules: [
          { number: "Tema 1", title: "Análisis de Eficiencia y Notación Asintótica O(n)", slidesCount: 42 },
          { number: "Tema 2", title: "Especificación Algebraica de TADs: Pilas, Colas y Listas", slidesCount: 58 },
          { number: "Tema 3", title: "Árboles Generales, Binarios de Búsqueda (ABB) y AVL", slidesCount: 74 },
          { number: "Tema 4", title: "Montículos Binarios (Heaps), Tablas Hash y Grafos", slidesCount: 66 }
        ],
        assignments: [
          {
            id: "ass-ed-1",
            title: "Práctica 1: Simulación de Aeropuerto con TAD Cola y Pila",
            dueDate: "Entregado el 20 Oct",
            status: "Calificado",
            grade: "9.5 / 10",
            statusColor: "#137333",
            feedback: "Uso impecable de memoria dinámica sin fugas en Valgrind."
          },
          {
            id: "ass-ed-2",
            title: "Práctica 2: Índice Invertido sobre Árboles AVL",
            dueDate: "28 Nov, 23:59",
            status: "Pendiente de entrega",
            grade: "-- / 10",
            statusColor: "#b06000",
            feedback: "Entrega mediante repositorio privado de GitHub Classroom."
          }
        ]
      }
    },

    "sistemas-operativos": {
      id: "sistemas-operativos",
      programId: "ing-informatica",
      code: "606010208",
      name: "Sistemas Operativos",
      shortName: "SO",
      year: "2º Curso • Grado en Ingeniería Informática",
      courseLevel: "2º Curso",
      yearNumber: 2,
      semester: "1º Cuatrimestre",
      professor: "Dr. Antonio Blanco Aguilera",
      professorEmail: "antonio.blanco@diesia.uhu.es",
      officeLocation: "Pabellón 6 (ETSI), Planta 1, Despacho 1.19",
      officeHours: "Martes y Jueves de 10:00 a 13:00",
      professorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Ingeniería Electrónica, de Sistemas Informáticos y Automática (DIESIA)",
      themeColor: "#1a73e8",
      coverGradient: "linear-gradient(135deg, #0b57d0 0%, #1a73e8 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-so2-etsi",
      description: "Gestión de procesos e hilos POSIX, planificación de CPU, sincronización con semáforos y monitores, interbloqueos, memoria virtual paginada y sistema de ficheros Linux.",
      unread: { classroom: 2, reddit: 5, apuntes: 4, notebook: 1, meet: 0 },
      stats: {
        students: 136,
        notesCount: 49,
        forumPosts: 91,
        nextTheory: "17/11 12:00",
        nextPractice: "19/11 09:00"
      },
      agents: [
        {
          id: "tutor-so",
          name: "Tutor de Concurrencia, Semáforos y Llamadas POSIX",
          role: "Ayuda con fork(), pipe(), pthread_mutex y algoritmos de planificación (Round-Robin, SJF)",
          avatarIcon: "settings_suggest",
          color: "#1a73e8",
          systemGreeting: "¡Hola! Soy el Agente de Sistemas Operativos (UHU). ¿Repasamos el problema de los Filósofos Comensales, memoria paginada o llamadas al sistema en C bajo Linux?"
        }
      ],
      quickPrompts: [
        "Explícame el problema del Productor-Consumidor con semáforos POSIX",
        "¿Cómo calculo los fallos de página con el algoritmo LRU vs Reloj?",
        "¿Qué devuelve exactamente fork() en el proceso padre y en el hijo?"
      ]
    },

    "estructura-computadores": {
      id: "estructura-computadores",
      programId: "ing-informatica",
      code: "606010207",
      name: "Estructura de Computadores",
      shortName: "EC",
      year: "2º Curso • Grado en Ingeniería Informática",
      courseLevel: "2º Curso",
      yearNumber: 2,
      semester: "2º Cuatrimestre",
      professor: "Dr. Fernando Díaz del Río",
      professorEmail: "fernando.diaz@diesia.uhu.es",
      officeLocation: "Pabellón 6 (ETSI), Planta 2, Despacho 2.04",
      officeHours: "Lunes y Jueves de 11:30 a 14:30",
      professorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Ingeniería Electrónica, de Sistemas Informáticos y Automática (DIESIA)",
      themeColor: "#1a73e8",
      coverGradient: "linear-gradient(135deg, #1967d2 0%, #4285f4 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-ec2-etsi",
      description: "Lenguaje ensamblador, ruta de datos y unidad de control segmentada (pipelining), riesgos de datos y control, jerarquía de memoria caché y buses de E/S.",
      unread: { classroom: 1, reddit: 3, apuntes: 2, notebook: 1, meet: 0 },
      stats: {
        students: 129,
        notesCount: 41,
        forumPosts: 68,
        nextTheory: "18/11 10:30",
        nextPractice: "20/11 12:30"
      },
      agents: [
        {
          id: "tutor-ec",
          name: "Analizador de Memoria Caché y Segmentación",
          role: "Calcula tasas de aciertos (Hit/Miss) en caché asociativa y ciclos CPI con adelantamiento",
          avatarIcon: "developer_board",
          color: "#1a73e8",
          systemGreeting: "¡Hola! Soy tu Agente de Estructura de Computadores. Puedo ayudarte a descomponer direcciones de memoria en Etiqueta, Conjunto y Palabra o analizar riesgos RAW en el cauce."
        }
      ],
      quickPrompts: [
        "¿Cómo calculo los bits de Etiqueta, Índice y Desplazamiento en caché asociativa por conjuntos?",
        "¿Cuándo un riesgo RAW necesita detención (stall) aunque haya adelantamiento?",
        "Diferencia entre escritura directa (write-through) y post-escritura (write-back)"
      ]
    },

    // --- 3º CURSO (AMARILLO / ÁMBAR #fbbc04) ---
    "ddsi": {
      id: "ddsi",
      programId: "ing-informatica",
      code: "606010214",
      name: "Diseño y Desarrollo de Sistemas de Información",
      shortName: "DDSI",
      year: "3º Curso • Grado en Ingeniería Informática",
      courseLevel: "3º Curso",
      yearNumber: 3,
      semester: "1º Cuatrimestre",
      professor: "Dra. Nieves R. Brisaboa",
      professorEmail: "nieves.brisaboa@dti.uhu.es",
      officeLocation: "Pabellón 7 (ETSI), Planta 3, Despacho 3.05",
      officeHours: "Martes y Miércoles de 10:30 a 13:30",
      professorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Tecnologías de la Información (DTI)",
      themeColor: "#fbbc04",
      coverGradient: "linear-gradient(135deg, #b06000 0%, #e37400 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-ddsi-etsi",
      description: "Diseño conceptual, lógico y físico de bases de datos relacionales, normalización (FNBC, 3FN), disparadores PL/SQL, transacciones ACID y conexión JDBC/ORM.",
      unread: { classroom: 3, reddit: 7, apuntes: 4, notebook: 2, meet: 1 },
      stats: {
        students: 118,
        notesCount: 53,
        forumPosts: 87,
        nextTheory: "Mañana 11:30",
        nextPractice: "18/11 09:30"
      },
      agents: [
        {
          id: "tutor-ddsi",
          name: "Arquitecto SQL, PL/SQL y Normalización",
          role: "Revisa diagramas Entidad-Relación, dependencias funcionales y triggers en Oracle/PostgreSQL",
          avatarIcon: "database",
          color: "#e37400",
          systemGreeting: "¡Hola! Soy el Agente de DDSI (UHU). Pásame tus dependencias funcionales o tu trigger en PL/SQL y comprobamos si está en Forma Normal de Boyce-Codd."
        }
      ],
      quickPrompts: [
        "¿Cómo calculo el cierre de un conjunto de atributos para hallar todas las claves candidatas?",
        "Por qué salta el error ORA-04091 (tabla mutante) en un trigger PL/SQL",
        "Diferencia entre 3ª Forma Normal (3FN) y Forma Normal de Boyce-Codd (FNBC)"
      ]
    },

    "sistemas-inteligentes": {
      id: "sistemas-inteligentes",
      programId: "ing-informatica",
      code: "606010301",
      name: "Sistemas Inteligentes",
      shortName: "SI",
      year: "3º Curso • Grado en Ingeniería Informática",
      courseLevel: "3º Curso",
      yearNumber: 3,
      semester: "1º Cuatrimestre",
      professor: "Dra. Elena Ruiz Valdivia",
      professorEmail: "elena.ruiz@dti.uhu.es",
      officeLocation: "Pabellón 7 (ETSI), Planta 3, Despacho 3.12",
      officeHours: "Lunes y Miércoles de 12:00 a 15:00",
      professorAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Tecnologías de la Información (DTI)",
      themeColor: "#fbbc04",
      coverGradient: "linear-gradient(135deg, #c26401 0%, #f29900 100%)",
      meetActive: true,
      meetUrl: "https://meet.google.com/uhu-si3-etsi",
      description: "Búsqueda heurística en espacio de estados (A*, IDA*), juegos adversarios (Minimax, poda Alfa-Beta), satisfacción de restricciones (CSP) y aprendizaje automático.",
      unread: { classroom: 5, reddit: 11, apuntes: 6, notebook: 4, meet: 1 },
      stats: {
        students: 112,
        notesCount: 47,
        forumPosts: 109,
        nextTheory: "Hoy 16:30",
        nextPractice: "17/11 18:00"
      },
      agents: [
        {
          id: "tutor-si",
          name: "Agente de Heurísticas A*, Minimax y Machine Learning",
          role: "Verifica admisibilidad y consistencia de heurísticas y trazas de poda Alfa-Beta",
          avatarIcon: "psychology",
          color: "#e37400",
          systemGreeting: "¡Hola! Soy tu Agente de Sistemas Inteligentes. ¿Analizamos si tu heurística para el 8-puzzle es admisible y monótona o trazamos una poda Alfa-Beta?"
        }
      ],
      quickPrompts: [
        "¿Por qué la distancia Manhattan es una heurística admisible en el 8-puzzle?",
        "Hazme una traza paso a paso de poda Alfa-Beta en un árbol Minimax",
        "¿Cuándo una heurística consistente garantiza no reabrir nodos cerrados en A*?"
      ]
    },

    "redes-computadores": {
      id: "redes-computadores",
      programId: "ing-informatica",
      code: "606010212",
      name: "Redes de Computadores",
      shortName: "RC",
      year: "3º Curso • Grado en Ingeniería Informática",
      courseLevel: "3º Curso",
      yearNumber: 3,
      semester: "2º Cuatrimestre",
      professor: "Dr. Juan Carlos Gómez",
      professorEmail: "juancarlos.gomez@diesia.uhu.es",
      officeLocation: "Pabellón 6 (ETSI), Lab Telemática, Despacho 2.18",
      officeHours: "Martes y Jueves de 11:00 a 14:00",
      professorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Ingeniería Electrónica, de Sistemas Informáticos y Automática (DIESIA)",
      themeColor: "#fbbc04",
      coverGradient: "linear-gradient(135deg, #a85502 0%, #e37400 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-rc3-etsi",
      description: "Arquitectura TCP/IP, subnetting VLSM, encaminamiento IP (OSPF, BGP), control de congestión TCP, VLANs 802.1Q y captura de tráfico con Wireshark.",
      unread: { classroom: 2, reddit: 4, apuntes: 3, notebook: 1, meet: 0 },
      stats: {
        students: 121,
        notesCount: 59,
        forumPosts: 83,
        nextTheory: "19/11 09:00",
        nextPractice: "21/11 11:00"
      },
      agents: [
        {
          id: "tutor-rc",
          name: "Calculador de Subredes VLSM y Analizador TCP/IP",
          role: "Resuelve ejercicios de direccionamiento IP, tablas de rutas y capturas Wireshark",
          avatarIcon: "lan",
          color: "#e37400",
          systemGreeting: "¡Hola! Soy el Agente de Redes de Computadores (UHU). Dime una red base y los tamaños de subred requeridos y calculamos juntos el direccionamiento VLSM y tablas de encaminamiento."
        }
      ],
      quickPrompts: [
        "Resuelve un ejercicio de subnetting VLSM sobre 192.168.10.0/24 para 4 subredes",
        "¿Cómo funciona el arranque lento (Slow Start) y evitación de congestión en TCP?",
        "Diferencia entre trama ARP Request (broadcast) y ARP Reply (unicast)"
      ]
    },

    // --- 4º CURSO (ROJO #ea4335) ---
    "seguridad-informatica": {
      id: "seguridad-informatica",
      programId: "ing-informatica",
      code: "606010218",
      name: "Seguridad en Sistemas Informáticos",
      shortName: "SSI",
      year: "4º Curso • Grado en Ingeniería Informática",
      courseLevel: "4º Curso",
      yearNumber: 4,
      semester: "1º Cuatrimestre",
      professor: "Dr. Alejandro Martín",
      professorEmail: "alejandro.martin@dti.uhu.es",
      officeLocation: "Pabellón 7 (ETSI), Lab Ciberseguridad, Despacho 3.19",
      officeHours: "Lunes y Jueves de 10:00 a 13:00",
      professorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Tecnologías de la Información (DTI)",
      themeColor: "#ea4335",
      coverGradient: "linear-gradient(135deg, #a50e0e 0%, #d93025 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-ssi4-etsi",
      description: "Criptografía simétrica (AES) y asimétrica (RSA, curvas elípticas), certificados X.509, PKI, auditoría de vulnerabilidades web (OWASP) y cortafuegos en Linux.",
      unread: { classroom: 2, reddit: 8, apuntes: 4, notebook: 2, meet: 0 },
      stats: {
        students: 88,
        notesCount: 36,
        forumPosts: 74,
        nextTheory: "Mañana 12:30",
        nextPractice: "18/11 16:00"
      },
      agents: [
        {
          id: "tutor-ssi",
          name: "Especialista en Criptografía RSA/AES y Auditoría",
          role: "Explica firmas digitales, protocolos TLS 1.3 y reglas de filtrado iptables/nftables",
          avatarIcon: "shield_lock",
          color: "#d93025",
          systemGreeting: "¡Hola! Soy el Agente de Seguridad en Sistemas Informáticos (UHU). ¿Practicamos un ejercicio numérico de RSA, intercambio Diffie-Hellman o reglas de firewall?"
        }
      ],
      quickPrompts: [
        "¿Cómo se garantiza confidencialidad y autenticidad a la vez con RSA + Hash?",
        "Hazme un ejemplo paso a paso de cálculo de claves RSA con primos pequeños",
        "¿Cómo mitigar SQL Injection y XSS según la guía OWASP?"
      ]
    },

    "procesadores-lenguajes": {
      id: "procesadores-lenguajes",
      programId: "ing-informatica",
      code: "606010305",
      name: "Procesadores de Lenguajes",
      shortName: "PL",
      year: "4º Curso • Grado en Ingeniería Informática",
      courseLevel: "4º Curso",
      yearNumber: 4,
      semester: "1º Cuatrimestre",
      professor: "Dr. Jacinto Mata Vázquez",
      professorEmail: "jacinto.mata@dti.uhu.es",
      officeLocation: "Pabellón 7 (ETSI), Planta 2, Despacho 2.21",
      officeHours: "Martes y Miércoles de 11:00 a 14:00",
      professorAvatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Tecnologías de la Información (DTI)",
      themeColor: "#ea4335",
      coverGradient: "linear-gradient(135deg, #b31412 0%, #ea4335 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-pl4-etsi",
      description: "Análisis léxico (autómatas finitos, JFlex), análisis sintáctico descendente LL(1) y ascendente LR/LALR (CUP/Yacc), traducción dirigida por la sintaxis y generación de código.",
      unread: { classroom: 3, reddit: 5, apuntes: 3, notebook: 2, meet: 0 },
      stats: {
        students: 76,
        notesCount: 33,
        forumPosts: 65,
        nextTheory: "17/11 09:30",
        nextPractice: "19/11 11:30"
      },
      agents: [
        {
          id: "tutor-pl",
          name: "Compilador Asistente LL(1) / LALR y JFlex/CUP",
          role: "Calcula conjuntos PRIMERO y SIGUIENTE, elimina recursividad por la izquierda y resuelve conflictos Shift/Reduce",
          avatarIcon: "integration_instructions",
          color: "#d93025",
          systemGreeting: "¡Hola! Soy tu Agente de Procesadores de Lenguajes. Pásame una gramática incontextual y calculamos juntos los conjuntos PRIMERO, SIGUIENTE y la tabla LL(1)."
        }
      ],
      quickPrompts: [
        "¿Cómo calculo los conjuntos PRIMERO y SIGUIENTE de una gramática con épsilon?",
        "¿Cómo elimino la recursividad directa por la izquierda para que sea LL(1)?",
        "¿Qué significa un conflicto Desplazar/Reducir (Shift/Reduce) en CUP?"
      ]
    },

    "trabajo-fin-grado": {
      id: "trabajo-fin-grado",
      programId: "ing-informatica",
      code: "606010401",
      name: "Trabajo Fin de Grado (TFG)",
      shortName: "TFG",
      year: "4º Curso • Grado en Ingeniería Informática",
      courseLevel: "4º Curso",
      yearNumber: 4,
      semester: "2º Cuatrimestre",
      professor: "Comisión Académica TFG (ETSI UHU)",
      professorEmail: "comision.tfg.informatica@etsi.uhu.es",
      officeLocation: "Secretaría y Subdirección de Ordenación Académica (ETSI)",
      officeHours: "Cita previa mediante Google Calendar",
      professorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80",
      department: "Escuela Técnica Superior de Ingeniería (ETSI - UHU)",
      themeColor: "#ea4335",
      coverGradient: "linear-gradient(135deg, #8c1d40 0%, #d93025 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-tfg-etsi",
      description: "Espacio oficial de seguimiento, plantillas LaTeX/Overleaf de la UHU, normativa de depósito en Arias Montano y preparación de la defensa ante tribunal.",
      unread: { classroom: 1, reddit: 6, apuntes: 4, notebook: 3, meet: 1 },
      stats: {
        students: 95,
        notesCount: 28,
        forumPosts: 54,
        nextTheory: "Tutoría libre",
        nextPractice: "24/11 10:00"
      },
      agents: [
        {
          id: "tutor-tfg",
          name: "Asesor de Memoria TFG, LaTeX y Defensa",
          role: "Revisa la estructura de tu memoria según la normativa de la ETSI UHU y simula preguntas del tribunal",
          avatarIcon: "school",
          color: "#d93025",
          systemGreeting: "¡Hola! Soy el Agente del Trabajo Fin de Grado (ETSI UHU). Puedo ayudarte con la plantilla oficial en LaTeX, objetivos, estado del arte, presupuesto y ensayo de la defensa."
        }
      ],
      quickPrompts: [
        "¿Qué apartados obligatorios exige la normativa TFG de la ETSI UHU?",
        "Simula 3 preguntas difíciles del tribunal sobre mi arquitectura de software",
        "¿Cómo estructurar el capítulo de Planificación Temporal y Presupuesto?"
      ]
    },

    // =========================================================================
    // OTROS ESPACIOS DEL SELECTOR (MÁSTER, GDGOC, CCNA, INVESTIGACIÓN, SAE, ETC.)
    // =========================================================================

    "deep-learning-llm": {
      id: "deep-learning-llm",
      programId: "master-ia",
      code: "MII-70104",
      name: "Deep Learning y Modelos Fundacionales (LLMs)",
      shortName: "DL & LLMs",
      year: "Postgrado • Máster en Ingeniería Informática e IA",
      courseLevel: "Máster Oficial",
      yearNumber: 5,
      semester: "1º Cuatrimestre",
      professor: "Dr. Miguel Ángel Rodríguez",
      professorEmail: "miguel.rodriguez@dti.uhu.es",
      officeLocation: "Pabellón 7 (ETSI), Lab Computación Alto Rendimiento",
      officeHours: "Miércoles de 16:00 a 19:00",
      professorAvatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=120&auto=format&fit=crop&q=80",
      department: "Dpto. de Tecnologías de la Información (DTI)",
      themeColor: "#7c4dff",
      coverGradient: "linear-gradient(135deg, #4a148c 0%, #7c4dff 100%)",
      meetActive: true,
      meetUrl: "https://meet.google.com/uhu-master-dl",
      description: "Arquitecturas Transformer, atención multicabeza, ajuste fino eficiente (LoRA/QLoRA), sistemas RAG con Gemini y despliegue distribuido en GPUs.",
      unread: { classroom: 2, reddit: 5, apuntes: 3, notebook: 2, meet: 1 },
      stats: {
        students: 38,
        notesCount: 24,
        forumPosts: 46,
        nextTheory: "Mañana 17:00",
        nextPractice: "19/11 18:30"
      },
      agents: [
        {
          id: "tutor-llm",
          name: "Investigador de Transformers, LoRA y RAG",
          role: "Asiste en PyTorch, JAX, Keras y optimización de memoria VRAM",
          avatarIcon: "auto_awesome",
          color: "#7c4dff",
          systemGreeting: "¡Bienvenido al Máster! Soy tu Agente especializado en Deep Learning y LLMs."
        }
      ],
      quickPrompts: [
        "¿Cómo reduce QLoRA el consumo de VRAM durante el fine-tuning?",
        "Explica la ecuación de Scaled Dot-Product Attention paso a paso",
        "¿Qué métrica usar para evaluar alucinaciones en un pipeline RAG?"
      ]
    },

    "gdgoc-cloud-gemini": {
      id: "gdgoc-cloud-gemini",
      programId: "gdgoc-uhu",
      code: "GDGOC-UHU-01",
      name: "Google Cloud, Gemini AI & Android Study Jam",
      shortName: "GDGoC Jam",
      year: "Comunidad • GDGoC UHU (gdguhu.com)",
      courseLevel: "Club Tech",
      yearNumber: 0,
      semester: "Anual 2025/26",
      professor: "Core Team GDGoC UHU",
      professorEmail: "hola@gdguhu.com",
      officeLocation: "Aula GDGoC / Salón de Actos ETSI (Campus El Carmen)",
      officeHours: "Viernes de 17:00 a 20:00 + Discord/Reddit 24/7",
      professorAvatar: "assets/icons/gdgoc-uhu-logo.webp",
      department: "Google Developer Group on Campus • Universidad de Huelva (GDGoC UHU)",
      themeColor: "#0f9d58",
      coverGradient: "linear-gradient(135deg, #0d652d 0%, #1a73e8 100%)",
      meetActive: true,
      meetUrl: "https://meet.google.com/gdg-uhu-live",
      description: "Talleres prácticos del club de programación de la UHU: agentes con Gemini API, Firebase, Flutter, Kotlin Multiplatform y preparación del Google Solution Challenge.",
      unread: { classroom: 4, reddit: 14, apuntes: 6, notebook: 3, meet: 2 },
      stats: {
        students: 310,
        notesCount: 29,
        forumPosts: 164,
        nextTheory: "Viernes 17:30",
        nextPractice: "21/11 18:30"
      },
      agents: [
        {
          id: "mentor-gdgoc",
          name: "Mentor de Hackathons & Google Solution Challenge",
          role: "Ayuda a diseñar arquitecturas con Firebase, Cloud Run y Gemini API",
          avatarIcon: "rocket_launch",
          color: "#0f9d58",
          systemGreeting: "¡Hola builder de GDGoC UHU! ¿Qué estamos construyendo hoy con tecnologías de Google?"
        }
      ],
      quickPrompts: [
        "¿Cómo conecto una web estática con Gemini API usando Cloud Run?",
        "Ideas ganadoras para el Google Solution Challenge basadas en los ODS",
        "¿Cómo desplegar gratis nuestro backend en Google Cloud con créditos de estudiante?"
      ]
    },

    "cisco-ccna-switching": {
      id: "cisco-ccna-switching",
      programId: "cisco-ccna",
      code: "CCNA-200-301",
      name: "Cisco CCNA: Switching, Routing & Wireless Essentials",
      shortName: "Cisco CCNA",
      year: "Certificación • Cisco Networking Academy UHU",
      courseLevel: "Certificación",
      yearNumber: 0,
      semester: "Intensivo",
      professor: "Ing. Raúl Domínguez (Cisco NetAcad Instructor)",
      professorEmail: "raul.dominguez@netacad.uhu.es",
      officeLocation: "Pabellón 6 (ETSI), Laboratorio Cisco Networking Academy",
      officeHours: "Jueves de 16:00 a 19:00",
      professorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      department: "Academia Local Cisco • Escuela Técnica Superior de Ingeniería (ETSI - UHU)",
      themeColor: "#0097a7",
      coverGradient: "linear-gradient(135deg, #006064 0%, #0097a7 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-ccna-lab",
      description: "Preparación oficial para el examen CCNA 200-301 con laboratorios de Packet Tracer, VLANs, Spanning Tree (RSTP), EtherChannel, OSPF multiárea y ACLs.",
      unread: { classroom: 3, reddit: 5, apuntes: 4, notebook: 2, meet: 0 },
      stats: {
        students: 65,
        notesCount: 31,
        forumPosts: 52,
        nextTheory: "18/11 17:00",
        nextPractice: "20/11 17:00"
      },
      agents: [
        {
          id: "tutor-ccna",
          name: "Simulador Cisco IOS CLI & Packet Tracer",
          role: "Revisa comandos de configuración de routers/switches Cisco y diagnostica fallos de red",
          avatarIcon: "router",
          color: "#0097a7",
          systemGreeting: "¡Hola! Soy tu Instructor IA de Cisco CCNA. Pega tu `show running-config` o pregúntame cualquier comando de IOS para VLANs, OSPF o NAT."
        }
      ],
      quickPrompts: [
        "Comandos completos en Cisco IOS para configurar Router-on-a-Stick con subinterfaces 802.1Q",
        "¿Cómo se elige el Root Bridge en el protocolo Rapid Spanning Tree (RSTP)?",
        "Diferencia entre ACL estándar y ACL extendida y dónde colocar cada una"
      ]
    },

    "investigacion-ia-salud": {
      id: "investigacion-ia-salud",
      programId: "investigacion-docente",
      code: "IDI-TIC-204",
      name: "Semillero de Investigación Docente: IA Aplicada y Visión por Computador",
      shortName: "Investigación UHU",
      year: "Investigación • Beca de Colaboración e Innovación Docente",
      courseLevel: "I+D+i UHU",
      yearNumber: 0,
      semester: "Anual",
      professor: "Dr. Ignacio Pachón (IP Grupo TIC-UHU)",
      professorEmail: "ignacio.pachon@dti.uhu.es",
      officeLocation: "Centro de Investigación en Tecnología, Energía y Sostenibilidad (CITES - UHU)",
      officeHours: "Lunes a Viernes en laboratorio CITES",
      professorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      department: "Centro de Investigación CITES & Dpto. de Tecnologías de la Información (DTI)",
      themeColor: "#d93025",
      coverGradient: "linear-gradient(135deg, #8c1d40 0%, #c5221f 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-cites-idi",
      description: "Espacio de coordinación de proyectos de innovación docente, becas de iniciación a la investigación del Plan Propio UHU y redacción de artículos JCR/IEEE.",
      unread: { classroom: 2, reddit: 3, apuntes: 2, notebook: 3, meet: 1 },
      stats: {
        students: 24,
        notesCount: 19,
        forumPosts: 31,
        nextTheory: "Reunión Jueves 12:00",
        nextPractice: "Lab CITES"
      },
      agents: [
        {
          id: "tutor-research",
          name: "Co-Investigador de Estado del Arte y Papers IEEE/LaTeX",
          role: "Sintetiza artículos científicos, revisa metodología experimental y formato IEEEtran",
          avatarIcon: "science",
          color: "#d93025",
          systemGreeting: "¡Hola investigador! He indexado los papers del grupo en el CITES. ¿Revisamos la sección de Metodología o las tablas comparativas en LaTeX?"
        }
      ],
      quickPrompts: [
        "Estructura un abstract de 200 palabras estilo IEEE para nuestro experimento",
        "¿Qué test estadístico no paramétrico usar (Wilcoxon vs Friedman) para comparar modelos?",
        "Genera una tabla comparativa en LaTeX con booktabs"
      ]
    },

    "sae-realidad-virtual": {
      id: "sae-realidad-virtual",
      programId: "sae-rv",
      code: "SAE-RV-2026",
      name: "SAE Realidad Virtual, Unity XR y Metaverso Universitario",
      shortName: "SAE Realidad Virtual",
      year: "Actividad Estudiantil • Servicio de Actividades Estudiantiles (SAE UHU)",
      courseLevel: "Créditos ECTS",
      yearNumber: 0,
      semester: "Reconocimiento 2 ECTS",
      professor: "Coord. SAE & Aula de Realidad Extendida",
      professorEmail: "sae.rv@uhu.es",
      officeLocation: "Edificio Marie Curie / Laboratorio XR (Campus de El Carmen)",
      officeHours: "Miércoles de 16:30 a 19:30",
      professorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      department: "Servicio de Actividades Estudiantiles (SAE) y Vicerrectorado de Estudiantes (UHU)",
      themeColor: "#e37400",
      coverGradient: "linear-gradient(135deg, #b06000 0%, #f29900 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-sae-xr",
      description: "Desarrollo de experiencias inmersivas 3D con Unity OpenXR, Meta Quest 3, WebXR y gemelos digitales del Campus de El Carmen con reconocimiento de créditos ECTS.",
      unread: { classroom: 1, reddit: 6, apuntes: 2, notebook: 1, meet: 0 },
      stats: {
        students: 45,
        notesCount: 15,
        forumPosts: 39,
        nextTheory: "Miércoles 16:30",
        nextPractice: "Lab Meta Quest"
      },
      agents: [
        {
          id: "tutor-xr",
          name: "Asistente de Unity XR, C# y Shaders 3D",
          role: "Resuelve dudas de OpenXR Interaction Toolkit, optimización de FPS en gafas VR y WebXR",
          avatarIcon: "view_in_ar",
          color: "#e37400",
          systemGreeting: "¡Hola creador XR! ¿Necesitas ayuda configurando el XR Origin en Unity o mejorando el framerate para Meta Quest 3?"
        }
      ],
      quickPrompts: [
        "¿Cómo configurar locomoción por teletransporte y agarre (Grab Interactable) en OpenXR?",
        "Consejos para mantener 90 FPS estables en gafas VR autónomas",
        "¿Cómo valido mis horas de asistencia del curso SAE para los 2 créditos ECTS?"
      ]
    },

    "ingles-b2-c1-uhu": {
      id: "ingles-b2-c1-uhu",
      programId: "idiomas-uhu",
      code: "SLM-ENG-B2C1",
      name: "Inglés Académico y Técnico para Ingeniería (Acreditación B2 / C1)",
      shortName: "Inglés B2/C1",
      year: "Idiomas • Servicio de Lenguas Modernas UHU",
      courseLevel: "Nivel B2/C1",
      yearNumber: 0,
      semester: "Cuatrimestral",
      professor: "Prof. Sarah Jenkins",
      professorEmail: "sarah.jenkins@slm.uhu.es",
      officeLocation: "Edificio Galileo Galilei (Servicio de Lenguas Modernas UHU)",
      officeHours: "Martes de 10:00 a 13:00",
      professorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      department: "Servicio de Lenguas Modernas y Traducción (SLM - UHU)",
      themeColor: "#c2185b",
      coverGradient: "linear-gradient(135deg, #880e4f 0%, #c2185b 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-slm-eng",
      description: "Preparación del examen oficial de acreditación lingüística de la UHU, presentaciones técnicas en inglés y vocabulario de ingeniería de software.",
      unread: { classroom: 2, reddit: 2, apuntes: 3, notebook: 1, meet: 0 },
      stats: {
        students: 80,
        notesCount: 22,
        forumPosts: 29,
        nextTheory: "Martes 16:00",
        nextPractice: "Speaking Lab"
      },
      agents: [
        {
          id: "tutor-english",
          name: "Speaking & Writing Examiner (Cambridge / ACLES B2-C1)",
          role: "Corrige tus redacciones (Essays/Reports) y simula entrevistas orales técnicas",
          avatarIcon: "translate",
          color: "#c2185b",
          systemGreeting: "Hello Ariel! Paste your B2/C1 essay or technical abstract and I will grade your grammar, vocabulary, and cohesion."
        }
      ],
      quickPrompts: [
        "Corrige este párrafo de introducción para un Essay de nivel C1",
        "Conectores formales avanzados para presentaciones técnicas en inglés",
        "Simula 3 preguntas del Speaking Part 3 sobre Inteligencia Artificial"
      ]
    },

    "mentoria-delegacion-etsi": {
      id: "mentoria-delegacion-etsi",
      programId: "mentoria-caruh",
      code: "CARUH-ETSI-26",
      name: "Programa de Mentoría Universitaria y Delegación de Estudiantes ETSI",
      shortName: "Mentoría & Delegación",
      year: "Vida Universitaria • Delegación ETSI & CARUH",
      courseLevel: "Representación",
      yearNumber: 0,
      semester: "Anual",
      professor: "Subdirección de Estudiantes ETSI & Delegación",
      professorEmail: "delegacion@etsi.uhu.es",
      officeLocation: "Despacho de Delegación de Alumnos (Planta Baja ETSI)",
      officeHours: "Lunes a Viernes de 10:00 a 14:00",
      professorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
      department: "Consejo de Alumnos y Representantes de la Universidad de Huelva (CARUH - ETSI)",
      themeColor: "#00796b",
      coverGradient: "linear-gradient(135deg, #004d40 0%, #00796b 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-delegacion-etsi",
      description: "Coordinación de alumnos mentores de nuevo ingreso, calendario oficial de exámenes de Junta de Centro, becas MEC/UHU y eventos culturales de San Alberto y la ETSI.",
      unread: { classroom: 1, reddit: 8, apuntes: 1, notebook: 1, meet: 0 },
      stats: {
        students: 215,
        notesCount: 12,
        forumPosts: 95,
        nextTheory: "Asamblea Viernes",
        nextPractice: "Mentorías 1º"
      },
      agents: [
        {
          id: "tutor-normativa",
          name: "Asistente de Normativa de Exámenes y Becas UHU",
          role: "Responde dudas sobre evaluación única final, permanencia, compensación curricular y becas",
          avatarIcon: "gavel",
          color: "#00796b",
          systemGreeting: "¡Hola! He indexado el Reglamento de Evaluación de la Universidad de Huelva. ¿Tienes dudas sobre la convocatoria extraordinaria, evaluación única o reconocimiento de créditos?"
        }
      ],
      quickPrompts: [
        "¿Hasta qué fecha puedo solicitar la Evaluación Única Final en la UHU?",
        "¿Cuántos créditos ECTS máximo puedo reconocer por actividades SAE, idiomas y representación?",
        "Requisitos para solicitar la evaluación por compensación curricular"
      ]
    },

    "practicas-externas-soea": {
      id: "practicas-externas-soea",
      programId: "practicas-soea",
      code: "SOEA-EMP-606",
      name: "Prácticas Externas Curriculares y Portal de Empleo Tecnológico (SOEA)",
      shortName: "Prácticas & Empleo",
      year: "Inserción Laboral • Servicio de Empleo y Emprendimiento (SOEA)",
      courseLevel: "Empresas & Ícaro",
      yearNumber: 4,
      semester: "Anual",
      professor: "Oficina de Prácticas en Empresa (ETSI & SOEA)",
      professorEmail: "practicas.etsi@uhu.es",
      officeLocation: "Pabellón Juan Agustín de Mora / Subdirección de Relaciones Externas ETSI",
      officeHours: "Lunes a Viernes de 09:00 a 14:00",
      professorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80",
      department: "Servicio de Orientación, Información, Prácticas, Empleo y Autoempleo (SOEA - UHU)",
      themeColor: "#5c6bc0",
      coverGradient: "linear-gradient(135deg, #283593 0%, #5c6bc0 100%)",
      meetActive: false,
      meetUrl: "https://meet.google.com/uhu-soea-tech",
      description: "Ofertas de prácticas remuneradas en empresas tecnológicas conveniadas con la UHU, gestión de plataforma Ícaro, revisión de CV con IA y preparación de entrevistas técnicas.",
      unread: { classroom: 3, reddit: 4, apuntes: 2, notebook: 2, meet: 0 },
      stats: {
        students: 130,
        notesCount: 16,
        forumPosts: 48,
        nextTheory: "Feria Empleo UHU",
        nextPractice: "Mock Interview"
      },
      agents: [
        {
          id: "tutor-career",
          name: "Entrevistador Técnico y Revisor de CV / Ícaro",
          role: "Prepara entrevistas de código e ingeniería de software y optimiza tu perfil profesional",
          avatarIcon: "work",
          color: "#5c6bc0",
          systemGreeting: "¡Hola! Soy tu Agente de Empleabilidad y Prácticas de la UHU. ¿Revisamos tu CV para ofertas tecnológicas o hacemos un simulacro de entrevista técnica?"
        }
      ],
      quickPrompts: [
        "¿Cómo tramitar el convenio de prácticas curriculares en la plataforma Ícaro?",
        "Hazme 3 preguntas de entrevista técnica para un puesto de Junior Backend / Cloud",
        "¿Qué destacar en mi CV si he participado en proyectos de GDGoC UHU?"
      ]
    }
  }
};

// Función de auto-relleno coherente para asignaturas que no tengan arrays detallados de ejemplo
(function hydrateDefaultCourseContent() {
  Object.values(CAMPUS_DATA.courses).forEach(course => {
    if (!course.forumPosts) {
      course.forumPosts = [
        {
          id: `post-${course.id}-1`,
          author: "Alejandro_UHU",
          authorRole: `Estudiante • ${course.courseLevel}`,
          authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Hace 3 horas",
          flair: "DUDA",
          flairColor: "#1a73e8",
          title: `Consulta sobre los criterios de evaluación del próximo entregable de ${course.shortName}`,
          content: `Hola compañeros, ¿alguien que haya asistido hoy al laboratorio de ${course.name} puede confirmar si el guion de prácticas se entrega por parejas o individualmente en este bloque?`,
          votes: 48,
          userVoted: 0,
          commentsCount: 8,
          comments: [
            {
              author: course.professor,
              isTeacher: true,
              time: "Hace 1h",
              text: "Hola Alejandro, podéis realizar la entrega en parejas del mismo grupo de laboratorio. Recordad subir también la memoria breve en PDF.",
              upvotes: 34
            },
            {
              author: "Ariel Bustillo",
              time: "Hace 45m",
              text: "He subido en la pestaña de Wuolah / StuDocu una plantilla lista con el formato que pide el departamento.",
              upvotes: 19
            }
          ]
        },
        {
          id: `post-${course.id}-2`,
          author: "Marta_ETSI",
          authorRole: "Estudiante Verificada",
          authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
          timeAgo: "Ayer",
          flair: "MEME",
          flairColor: "#ea4335",
          title: `Cuando compilas la práctica de ${course.shortName} a la primera sin warnings pero desconfías el doble 😂`,
          content: "En la ETSI de Huelva sabemos que si compila a la primera es porque todavía no has probado el caso límite que mete el profesor en la defensa.",
          votes: 162,
          userVoted: 1,
          commentsCount: 14,
          comments: [
            {
              author: "CarlosM_99",
              time: "Hace 18h",
              text: "Clásico momento de pasar los tests públicos y temblar con los privados jajaja",
              upvotes: 22
            }
          ]
        }
      ];
    }

    if (!course.apuntes) {
      course.apuntes = [
        {
          id: `apunte-${course.id}-1`,
          title: `Resumen Completo y Esquemas de ${course.name} (${course.code})`,
          author: "Lucía Fernández (Nota: 9.6 Sobresaliente)",
          authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
          downloads: 940,
          rating: 4.9,
          reviewsCount: 64,
          pages: 38,
          verified: true,
          badge: "Verificado UHU",
          date: "Curso 2025/2026",
          tags: [course.shortName, course.courseLevel, "Teoría", "ETSI UHU"],
          previewText: `Apuntes completos tomados en clase de ${course.name} con ${course.professor}. Incluye todos los bloques teóricos, demostraciones paso a paso y consejos clave para el examen oficial.`
        },
        {
          id: `apunte-${course.id}-2`,
          title: `Colección de Exámenes y Prácticas Resueltas de ${course.shortName} (2021-2025)`,
          author: "Ariel Bustillo (GDGoC UHU)",
          authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          downloads: 780,
          rating: 4.8,
          reviewsCount: 51,
          pages: 26,
          verified: true,
          badge: "Exámenes Resueltos",
          date: "Actualizado este mes",
          tags: ["Exámenes", "Prácticas", course.shortName],
          previewText: `Recopilación comentada de ejercicios reales de examen de ${course.name} en la Universidad de Huelva, con soluciones detalladas y criterios de puntuación.`
        }
      ];
    }

    if (!course.classroom) {
      course.classroom = {
        announcements: [
          {
            id: `ann-${course.id}-1`,
            author: course.professor,
            date: "Hoy, 10:00",
            title: `Actualización de materiales y guion práctico de ${course.shortName}`,
            content: `Ya tenéis disponibles en la carpeta de Drive y en el agente NotebookLM las nuevas diapositivas anotadas y los ejercicios propuestos para la sesión de esta semana.`
          }
        ],
        modules: [
          { number: "Bloque 1", title: `Fundamentos y Conceptos Base de ${course.shortName}`, slidesCount: 44 },
          { number: "Bloque 2", title: "Desarrollo Metodológico y Casos Prácticos", slidesCount: 56 },
          { number: "Bloque 3", title: "Arquitectura Avanzada y Laboratorio en ETSI", slidesCount: 62 },
          { number: "Bloque 4", title: "Preparación de Evaluación y Proyectos", slidesCount: 38 }
        ],
        assignments: [
          {
            id: `ass-${course.id}-1`,
            title: `Entregable Práctico 1 - ${course.shortName}`,
            dueDate: "Entregado",
            status: "Calificado",
            grade: "9.2 / 10",
            statusColor: "#137333",
            feedback: "Excelente estructura, documentación clara y defensa sólida en laboratorio."
          },
          {
            id: `ass-${course.id}-2`,
            title: `Proyecto / Práctica Evaluable 2 - ${course.shortName}`,
            dueDate: "30 Nov, 23:59",
            status: "En curso",
            grade: "-- / 10",
            statusColor: "#1a73e8",
            feedback: "Subida abierta a través de Google Classroom y GitHub Classroom."
          }
        ]
      };
    }

    if (!course.gradesInfo) {
      course.gradesInfo = [
        { item: "Evaluación Continua / Participación", weight: "10%", score: "9.5 / 10", status: "Superado" },
        { item: "Defensa de Prácticas de Laboratorio (ETSI)", weight: "30%", score: "9.2 / 10", status: "Superado" },
        { item: "Primer Parcial Eliminatorio", weight: "30%", score: "8.8 / 10", status: "Superado" },
        { item: "Examen Final / Segundo Bloque", weight: "30%", score: "Pendiente (Enero)", status: "Programado" }
      ];
    }
  });
})();

// Respuestas simuladas enriquecidas para el chat de NotebookLM
const AI_SIMULATED_RESPONSES = {
  "dijkstra": `### 🧭 ¿Por qué el algoritmo de Dijkstra falla con aristas de peso negativo?

Según el **Tema 4 de las diapositivas oficiales de Estructuras de Datos (pág. 42)** de la ETSI UHU:

1. **Hipótesis Voraz (Greedy)**: Dijkstra asume que, cuando extrae un vértice \`u\` de la cola de prioridad y lo marca como visitado, la distancia \`D[u]\` ya es **definitiva y mínima**.
2. **El contraejemplo con pesos negativos**: Si existe una arista con coste negativo \`(v, u)\` desde un nodo \`v\` aún no procesado, el camino \`origen -> v -> u\` podría reducir el coste total hacia \`u\` *después* de haber cerrado \`u\`.
3. **Solución vista en clase**: Utilizar el **Algoritmo de Bellman-Ford** (complejidad \`O(V · E)\`), que relaja todas las aristas \`V - 1\` veces y además detecta ciclos negativos.`,

  "avl": `### 🌲 Rotaciones Dobles en Árboles AVL (RSD y RDD)

Basándome en los **Apuntes Verificados de Laura Gómez (Tema 3, pág. 19)** y el código C++ de laboratorio:

* **Desequilibrio Izquierda-Derecha (FE = +2 en raíz, FE = -1 en hijo izq.)**:
  1. Aplicamos una **Rotación Simple a la Izquierda (RSI)** sobre el hijo izquierdo.
  2. Aplicamos una **Rotación Simple a la Derecha (RSD)** sobre el nodo desequilibrado.

\`\`\`cpp
void rotacionDobleIzqDer(NodoAVL*& n) {
  rotacionSimpleIzquierda(n->izq);
  rotacionSimpleDerecha(n);
}
\`\`\`

> Recuerda actualizar la altura de los nodos implicados antes de retornar el puntero por referencia.`,

  "manhattan": `### 🤖 Admisibilidad de la Distancia Manhattan en el 8-Puzzle

De acuerdo con el **Tema 2 de Sistemas Inteligentes (Búsqueda Informada A*)**:

* Una heurística \`h(n)\` es **admisible** si nunca sobreestima el coste óptimo real \`h*(n)\` para alcanzar el objetivo: \`h(n) <= h*(n)\`.
* En el 8-puzzle, cada movimiento válido desplaza una única ficha **1 casilla** horizontal o vertical.
* Por tanto, ninguna ficha puede llegar a su posición objetivo en menos pasos que su **distancia Manhattan** (\`|x1 - x2| + |y1 - y2|\`). Como tampoco pueden moverse dos fichas a la vez, la suma de distancias Manhattan es siempre menor o igual al número real de movimientos.`
};
