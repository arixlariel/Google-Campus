/**
 * Google Campus - UI Components & Template Renderers
 */

const Components = {
  // Renders the Hero Header for a Course
  renderCourseHero(course) {
    return `
      <div class="course-hero-banner" style="background: ${course.coverGradient};">
        <div class="hero-bg-shapes"></div>
        <div>
          <div class="hero-meta-row">
            <div class="hero-pills">
              <span class="hero-pill">${course.code}</span>
              <span class="hero-pill">${course.year}</span>
              <span class="hero-pill">${course.semester}</span>
            </div>
            ${course.meetActive ? `
              <div class="live-indicator-pill">
                <span class="live-pulse-dot"></span>
                <span>CLASE EN DIRECTO (MEET)</span>
              </div>
            ` : `
              <span class="hero-pill" style="opacity: 0.9;">Próxima: ${course.stats.nextClass}</span>
            `}
          </div>

          <div class="hero-title-row">
            <h1>${course.name}</h1>
            <p class="hero-subtitle">${course.description}</p>
          </div>
        </div>

        <div class="hero-actions-row">
          <div class="hero-teacher-info">
            <span class="material-symbols-rounded">person</span>
            <span><strong>${course.professor}</strong> • ${course.department}</span>
          </div>

          <div class="hero-quick-buttons">
            <button class="hero-action-btn" onclick="App.openMeetModal()">
              <span class="material-symbols-rounded" style="color: #00ac47;">videocam</span>
              <span>Aula Meet</span>
            </button>
            <button class="hero-action-btn" onclick="App.switchTab('notebook')">
              <span class="material-symbols-rounded" style="color: #7c4dff;">auto_awesome</span>
              <span>Cuaderno IA</span>
            </button>
            <button class="hero-action-btn" onclick="App.openUploadApunteModal()">
              <span class="material-symbols-rounded" style="color: #ea4335;">upload_file</span>
              <span>Subir Apunte</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Renders the Secondary Tabs (Google Classroom style)
  renderCourseTabs(activeTab, stats) {
    return `
      <nav class="course-tabs-nav" aria-label="Navegación del curso">
        <button class="course-tab-btn ${activeTab === 'reddit' ? 'active' : ''}" onclick="App.switchTab('reddit')">
          <span class="material-symbols-rounded">forum</span>
          <span>Foro & Reddit</span>
          <span class="tab-counter-badge">${stats.forumPosts}</span>
        </button>
        <button class="course-tab-btn ${activeTab === 'apuntes' ? 'active' : ''}" onclick="App.switchTab('apuntes')">
          <span class="material-symbols-rounded">description</span>
          <span>Apuntes Wuolah</span>
          <span class="tab-counter-badge">${stats.notesCount}</span>
        </button>
        <button class="course-tab-btn ${activeTab === 'classroom' ? 'active' : ''}" onclick="App.switchTab('classroom')">
          <span class="material-symbols-rounded">school</span>
          <span>Classroom LMS</span>
        </button>
        <button class="course-tab-btn ${activeTab === 'meet' ? 'active' : ''}" onclick="App.switchTab('meet')">
          <span class="material-symbols-rounded">videocam</span>
          <span>Google Meet</span>
          ${stats.nextClass.includes('Directo') ? '<span class="live-pulse-dot" style="margin-left: 4px;"></span>' : ''}
        </button>
        <button class="course-tab-btn ${activeTab === 'notebook' ? 'active' : ''}" onclick="App.switchTab('notebook')">
          <span class="material-symbols-rounded">neurology</span>
          <span>Agente NotebookLM</span>
          <span class="tab-counter-badge" style="background:#f3e8fd; color:#6200ea;">IA Activa</span>
        </button>
      </nav>
    `;
  },

  // Renders Reddit Feed Section
  renderRedditSection(course, filter = 'ALL') {
    const posts = course.forumPosts || [];
    const filteredPosts = posts.filter(p => {
      if (filter === 'ALL') return true;
      if (filter === 'MEME') return p.flair === 'MEME';
      if (filter === 'DUDA') return p.flair.includes('DUDA');
      if (filter === 'TOP') return p.votes > 100;
      return true;
    });

    return `
      <div class="reddit-container">
        <div class="reddit-feed">
          <!-- Quick Compose trigger -->
          <div class="reddit-compose-trigger" onclick="App.openCreatePostModal()">
            <img src="${CAMPUS_DATA.currentUser.avatar}" alt="Avatar">
            <div class="compose-fake-input">¿Dudas, memes o apuntes sobre ${course.shortName}? Publica en la comunidad...</div>
            <button class="g-icon-btn"><span class="material-symbols-rounded">image</span></button>
            <button class="g-icon-btn"><span class="material-symbols-rounded">poll</span></button>
            <button class="g-icon-btn"><span class="material-symbols-rounded">code</span></button>
          </div>

          <!-- Reddit Filter Chips -->
          <div class="reddit-filter-bar">
            <button class="g-chip ${filter === 'ALL' ? 'active' : ''}" onclick="App.filterReddit('ALL')">
              <span class="material-symbols-rounded">feed</span> Todos
            </button>
            <button class="g-chip ${filter === 'TOP' ? 'active' : ''}" onclick="App.filterReddit('TOP')">
              <span class="material-symbols-rounded">local_fire_department</span> 🔥 Más votados
            </button>
            <button class="g-chip ${filter === 'MEME' ? 'active' : ''}" onclick="App.filterReddit('MEME')">
              <span class="material-symbols-rounded">mood</span> 😂 Memes
            </button>
            <button class="g-chip ${filter === 'DUDA' ? 'active' : ''}" onclick="App.filterReddit('DUDA')">
              <span class="material-symbols-rounded">help</span> ❓ Dudas & Consultas
            </button>
          </div>

          <!-- Post Cards -->
          ${filteredPosts.map(post => this.renderRedditPostCard(post)).join('')}
        </div>

        <!-- Reddit Sidebar -->
        <div class="reddit-sidebar">
          <div class="g-card rules-card">
            <h3><span class="material-symbols-rounded" style="color: var(--google-blue);">shield</span> Normas de la Comunidad</h3>
            <ol class="rules-list">
              <li>Respeto mutuo y código de conducta GDGoC.</li>
              <li>No publicar soluciones directas durante exámenes oficiales.</li>
              <li>Usa los flairs adecuados (ej: [MEME], [DUDA]).</li>
              <li>El profesorado participa en este foro para resolver dudas de laboratorio.</li>
            </ol>
          </div>

          <div class="g-card moderators-card">
            <h3>Moderadores de la Asignatura</h3>
            <div class="mod-item">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60" alt="Mod">
              <div>
                <strong>Ariel B.</strong> (GDGoC Lead)
                <div style="font-size:11px; color:#5f6368;">Estudiante Verificado</div>
              </div>
            </div>
            <div class="mod-item">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60" alt="Mod">
              <div>
                <strong>${course.professor}</strong>
                <div style="font-size:11px; color:#137333; font-weight:600;">Catedrático Oficial</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Renders a single Reddit Post Card
  renderRedditPostCard(post) {
    const isUpvoted = post.userVoted === 1;
    const isDownvoted = post.userVoted === -1;

    return `
      <article class="reddit-card" id="post-${post.id}">
        <!-- Karma Vote Column -->
        <div class="reddit-vote-column">
          <button class="vote-btn ${isUpvoted ? 'upvoted' : ''}" onclick="App.handleVote('${post.id}', 1)" title="Voto positivo">
            <span class="material-symbols-rounded">arrow_upward</span>
          </button>
          <span class="vote-count ${isUpvoted ? 'upvoted' : isDownvoted ? 'downvoted' : ''}">${post.votes}</span>
          <button class="vote-btn ${isDownvoted ? 'downvoted' : ''}" onclick="App.handleVote('${post.id}', -1)" title="Voto negativo">
            <span class="material-symbols-rounded">arrow_downward</span>
          </button>
        </div>

        <!-- Post Content Column -->
        <div class="reddit-content-column">
          <div class="post-header">
            <img class="post-author-avatar" src="${post.authorAvatar}" alt="${post.author}">
            <span class="post-author-name">${post.author}</span>
            <span style="color:#80868b;">•</span>
            <span class="post-flair" style="background-color: ${post.flairColor}20; color: ${post.flairColor};">${post.flair}</span>
            <span style="color:#80868b;">• ${post.timeAgo}</span>
          </div>

          <h3 class="post-title" onclick="App.openPostDetailModal('${post.id}')">${post.title}</h3>
          <p class="post-body">${post.content}</p>

          ${post.image ? `
            <div class="post-image-wrapper">
              <img src="${post.image}" alt="Imagen publicación" loading="lazy">
            </div>
          ` : ''}

          <div class="post-footer-actions">
            <button class="post-action-btn" onclick="App.openPostDetailModal('${post.id}')">
              <span class="material-symbols-rounded">chat_bubble</span>
              <span>${post.commentsCount} comentarios</span>
            </button>
            <button class="post-action-btn" onclick="App.sharePost('${post.id}')">
              <span class="material-symbols-rounded">share</span>
              <span>Compartir</span>
            </button>
            <button class="post-action-btn" onclick="App.savePost('${post.id}')">
              <span class="material-symbols-rounded">bookmark</span>
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </article>
    `;
  },

  // Renders Wuolah-style Apuntes Section
  renderApuntesSection(course, filter = 'ALL') {
    const apuntes = course.apuntes || [];

    return `
      <div class="apuntes-container">
        <!-- Gamification Banner -->
        <div class="apuntes-banner">
          <div class="apuntes-banner-content">
            <h3><span class="material-symbols-rounded">monetization_on</span> Gana Campus Points y Swag de Google compartiendo tus apuntes</h3>
            <p>Cada vez que un compañero descargue tus notas verificadas recibes créditos canjeables por Google Cloud Credits y ventajas en el club GDGoC.</p>
          </div>
          <button class="g-btn g-btn-primary" onclick="App.openUploadApunteModal()">
            <span class="material-symbols-rounded">upload</span>
            <span>Subir mis Apuntes (+50 pts)</span>
          </button>
        </div>

        <!-- Filter Chips -->
        <div class="reddit-filter-bar">
          <button class="g-chip active"><span class="material-symbols-rounded">all_inclusive</span> Todos (${apuntes.length})</button>
          <button class="g-chip"><span class="material-symbols-rounded">menu_book</span> Teoría Completa</button>
          <button class="g-chip"><span class="material-symbols-rounded">biotech</span> Prácticas & Labs</button>
          <button class="g-chip"><span class="material-symbols-rounded">quiz</span> Exámenes Resueltos</button>
          <button class="g-chip"><span class="material-symbols-rounded">bolt</span> Chuletas Resumen</button>
        </div>

        <!-- Apuntes Grid -->
        <div class="apuntes-grid">
          ${apuntes.map(item => `
            <div class="apunte-card">
              ${item.badge ? `<span class="apunte-badge-top">${item.badge}</span>` : ''}

              <div>
                <h4 class="apunte-title">${item.title}</h4>
                <div class="apunte-tags" style="margin-top: 8px;">
                  ${item.tags.map(t => `<span class="apunte-tag">#${t}</span>`).join('')}
                </div>
              </div>

              <div class="apunte-meta-stats">
                <span class="rating-stars">
                  <span class="material-symbols-rounded filled" style="font-size: 16px;">star</span>
                  <span>${item.rating}</span>
                  <small style="color:#5f6368; font-weight:400;">(${item.reviewsCount})</small>
                </span>
                <span><strong>${item.downloads.toLocaleString()}</strong> descargas</span>
                <span><strong>${item.pages}</strong> págs</span>
              </div>

              <div class="apunte-author-row">
                <img src="${item.authorAvatar}" alt="${item.author}">
                <div>
                  <strong>${item.author}</strong>
                  <div style="font-size:11px; color:#5f6368;">${item.date} • Verificado</div>
                </div>
              </div>

              <div class="apunte-footer-btns">
                <button class="g-btn g-btn-outlined" onclick="App.openDocReaderModal('${item.id}')">
                  <span class="material-symbols-rounded">visibility</span>
                  <span>Previsualizar</span>
                </button>
                <button class="g-btn g-btn-tonal" onclick="App.downloadApunte('${item.id}')">
                  <span class="material-symbols-rounded">download</span>
                  <span>Descargar</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // Renders Classroom LMS Section (Moodle + Google Classroom)
  renderClassroomSection(course) {
    const cls = course.classroom;

    return `
      <div class="classroom-container">
        <!-- Modules / Temario Sidebar -->
        <div class="classroom-modules-card">
          <h3 style="font-size: 15px; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
            <span class="material-symbols-rounded" style="color:var(--google-blue);">folder_open</span>
            <span>Temario Moodle</span>
          </h3>

          <div class="module-item active">
            <div><strong>Todos los Temas</strong></div>
            <small style="color:#5f6368;">Guía docente oficial 2025/26</small>
          </div>

          ${cls.modules.map(mod => `
            <div class="module-item" onclick="App.showToast('Descargando diapositivas de ${mod.number}...')">
              <div><strong>${mod.number}</strong>: ${mod.title}</div>
              <small style="color:#5f6368;"><span class="material-symbols-rounded" style="font-size:12px;">slideshow</span> ${mod.slidesCount} diapositivas en Google Drive</small>
            </div>
          `).join('')}
        </div>

        <!-- Announcements & Assignments -->
        <div class="assignments-list">
          <div class="g-card" style="padding: 20px; background: #fafbfc;">
            <h3 style="font-size: 16px; margin-bottom: 8px; color: #174ea6; display:flex; align-items:center; gap:8px;">
              <span class="material-symbols-rounded">campaign</span>
              <span>Tablón de Anuncios Oficiales</span>
            </h3>
            ${cls.announcements.map(ann => `
              <div style="border-top: 1px solid #e8eaed; padding-top: 12px; margin-top: 12px;">
                <div style="display:flex; justify-content:space-between; font-size:12px; color:#5f6368; margin-bottom:4px;">
                  <span><strong>${ann.author}</strong></span>
                  <span>${ann.date}</span>
                </div>
                <h4 style="font-size:14px; margin-bottom:4px;">${ann.title}</h4>
                <p style="font-size:13px; color:#3c4043;">${ann.content}</p>
              </div>
            `).join('')}
          </div>

          <h3 style="font-size: 16px; font-weight:600; margin-top: 12px;">Tareas y Entregas de Prácticas</h3>

          ${cls.assignments.map(ass => `
            <div class="assignment-card">
              <div class="assignment-info">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="material-symbols-rounded" style="color:var(--google-blue);">assignment</span>
                  <h4>${ass.title}</h4>
                </div>
                <div class="assignment-due">
                  <span>Fecha límite: <strong>${ass.dueDate}</strong></span>
                  <span>•</span>
                  <span>Feedback: ${ass.feedback}</span>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:12px;">
                <span class="grade-badge" style="background-color: ${ass.statusColor}18; color: ${ass.statusColor};">
                  ${ass.grade !== '-- / 10' ? `Nota: ${ass.grade}` : ass.status}
                </span>
                <button class="g-btn g-btn-tonal" onclick="App.showToast('Tarea ya enviada. Puedes revisar el commit de GitHub entregado.')">
                  Ver Entrega
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // Renders Google Meet Section
  renderMeetSection(course) {
    return `
      <div class="meet-section-container">
        <!-- Live Call Banner -->
        <div class="meet-live-card">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,0.2); padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; margin-bottom:10px;">
              <span class="live-pulse-dot" style="background:#ffffff;"></span>
              <span>AULA VIRTUAL EN DIRECTO</span>
            </div>
            <h2>Sesión Semanal: Laboratorio y Resolución de Dudas</h2>
            <p>Conectados: <strong>${course.professor}</strong> + 42 estudiantes de la clase.</p>
          </div>

          <button class="g-btn" style="background:#ffffff; color:#0b8043; font-weight:700; padding:12px 24px; font-size:15px;" onclick="App.openMeetModal()">
            <span class="material-symbols-rounded" style="color:#00ac47;">videocam</span>
            <span>Entrar a Google Meet</span>
          </button>
        </div>

        <!-- Recorded Lectures -->
        <div>
          <h3 style="font-size: 18px; margin-bottom: 16px;">Grabaciones de Clases con Capítulos de IA</h3>
          <div class="recordings-grid">
            <div class="recording-card">
              <div class="recording-thumbnail" onclick="App.openMeetModal()">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500" alt="Video">
                <div class="play-overlay-btn"><span class="material-symbols-rounded">play_arrow</span></div>
                <span class="video-duration">1h 24m</span>
              </div>
              <div class="recording-details">
                <h4>Clase 12: Grafos, Algoritmo de Dijkstra y Bellman-Ford</h4>
                <div style="font-size:12px; color:#5f6368;">Impartida el 8 de Noviembre • 108 visualizaciones</div>
                <div class="recording-chapters">
                  <span>⏱️ 00:15 - Introducción a caminos mínimos</span>
                  <span>⏱️ 24:30 - Demostración de Dijkstra con cola de prioridad</span>
                  <span>⏱️ 55:10 - Resolución de dudas de la práctica 2</span>
                </div>
              </div>
            </div>

            <div class="recording-card">
              <div class="recording-thumbnail" onclick="App.openMeetModal()">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500" alt="Video">
                <div class="play-overlay-btn"><span class="material-symbols-rounded">play_arrow</span></div>
                <span class="video-duration">1h 10m</span>
              </div>
              <div class="recording-details">
                <h4>Clase 11: Árboles AVL y Rotaciones Dobles</h4>
                <div style="font-size:12px; color:#5f6368;">Impartida el 4 de Noviembre • 142 visualizaciones</div>
                <div class="recording-chapters">
                  <span>⏱️ 02:00 - Rebalanceo tras inserción</span>
                  <span>⏱️ 38:20 - Implementación en C++ con punteros</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Renders NotebookLM & AI Course Agents Section
  renderNotebookSection(course, activeAgentId = null, chatHistory = []) {
    const agents = course.agents || [];
    const activeAgent = agents.find(a => a.id === activeAgentId) || agents[0];

    return `
      <div class="notebook-container">
        <!-- Sources & NotebookLM Audio Deep Dive Panel -->
        <div class="notebook-sources-panel">
          <div class="sources-header">
            <h3 style="font-size:15px; font-weight:600; display:flex; align-items:center; gap:8px;">
              <span class="material-symbols-rounded" style="color:#7c4dff;">source</span>
              <span>Fuentes del Cuaderno</span>
            </h3>
            <span class="g-chip" style="font-size:11px; padding:2px 8px;">3 Fuentes</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px;">
            <div class="source-file-item">
              <span class="material-symbols-rounded" style="color:#ea4335;">picture_as_pdf</span>
              <div>
                <strong>Diapositivas_Oficiales_Tema1-4.pdf</strong>
                <div style="font-size:11px; color:#5f6368;">240 páginas • Indexado</div>
              </div>
            </div>
            <div class="source-file-item">
              <span class="material-symbols-rounded" style="color:#1a73e8;">description</span>
              <div>
                <strong>Apuntes_Laura_Gomez_Oro.pdf</strong>
                <div style="font-size:11px; color:#5f6368;">36 páginas • Indexado</div>
              </div>
            </div>
            <div class="source-file-item">
              <span class="material-symbols-rounded" style="color:#34a853;">code</span>
              <div>
                <strong>Repositorio_Practicas_C++.zip</strong>
                <div style="font-size:11px; color:#5f6368;">Código del curso indexado</div>
              </div>
            </div>
          </div>

          <button class="g-btn g-btn-outlined" style="width:100%;" onclick="App.showToast('Arrastra cualquier PDF de la asignatura para incorporarlo al contexto del agente.')">
            <span class="material-symbols-rounded">add</span>
            <span>Añadir Fuente al Cuaderno</span>
          </button>

          <!-- Audio Deep Dive Player Widget -->
          <div class="audio-deepdive-card">
            <h4>
              <span class="material-symbols-rounded" style="color:#8ab4f8;">podcasts</span>
              <span>Deep Dive de Audio (NotebookLM)</span>
            </h4>
            <p style="font-size:12px; opacity:0.85; line-height:1.4;">
              Resumen en podcast de 5 min con dos voces de IA debatiendo sobre ${course.shortName}.
            </p>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-top:4px;">
              <button class="g-btn" style="background:#8ab4f8; color:#041e49; font-weight:600; padding:6px 14px; font-size:12px;" onclick="App.toggleAudioDeepDive()">
                <span class="material-symbols-rounded" id="podcast-play-icon">play_arrow</span>
                <span id="podcast-play-text">Escuchar Resumen</span>
              </button>
              <div class="audio-waveform-visualizer" id="audio-waveform" style="opacity:0.4;">
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Chat with the Course Agent -->
        <div class="notebook-chat-panel">
          <div class="chat-agent-selector-bar">
            <div class="current-agent-badge">
              <div class="agent-icon-circle" style="background-color: ${activeAgent.color};">
                <span class="material-symbols-rounded">${activeAgent.avatarIcon}</span>
              </div>
              <div>
                <strong>${activeAgent.name}</strong>
                <div style="font-size:11px; color:#5f6368;">${activeAgent.role}</div>
              </div>
            </div>

            <!-- Agent Dropdown Selector -->
            <select id="agent-selector" onchange="App.selectAgent(this.value)" style="border:1px solid #dadce0; border-radius:20px; padding:6px 12px; background:#fff; font-weight:500;">
              ${agents.map(ag => `
                <option value="${ag.id}" ${ag.id === activeAgent.id ? 'selected' : ''}>${ag.name}</option>
              `).join('')}
            </select>
          </div>

          <!-- Chat Messages Area -->
          <div class="chat-messages-scroll" id="chat-messages-scroll">
            <div class="chat-bubble ai">
              <div class="agent-icon-circle" style="background-color: ${activeAgent.color}; flex-shrink:0;">
                <span class="material-symbols-rounded">${activeAgent.avatarIcon}</span>
              </div>
              <div class="chat-bubble-content">
                <p>¡Hola, Ariel! Soy tu <strong>${activeAgent.name}</strong> para <em>${course.name}</em>.</p>
                <p style="margin-top:6px;">He indexado todas las diapositivas de clase, los apuntes de la comunidad y los exámenes anteriores. ¿En qué duda puedo ayudarte hoy?</p>
              </div>
            </div>

            ${chatHistory.map(msg => `
              <div class="chat-bubble ${msg.sender}">
                <div class="chat-bubble-content">
                  ${msg.htmlContent}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Quick Suggestion Chips -->
          <div class="chat-quick-prompts-bar">
            ${course.quickPrompts.map(p => `
              <button class="g-chip" onclick="App.askAI('${p.replace(/'/g, "\\'")}')">
                <span class="material-symbols-rounded" style="font-size:16px; color:#7c4dff;">auto_awesome</span>
                <span>${p}</span>
              </button>
            `).join('')}
          </div>

          <!-- Chat Input -->
          <div class="chat-input-wrapper">
            <input type="text" id="ai-chat-input" placeholder="Pregunta a tu Agente de ${course.shortName} con referencias de clase..." onkeydown="if(event.key==='Enter') App.submitChatInput()">
            <button class="g-btn g-btn-primary" onclick="App.submitChatInput()">
              <span class="material-symbols-rounded">send</span>
              <span>Preguntar</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
};

