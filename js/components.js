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
              <span class="hero-pill">${course.courseLevel || course.year}</span>
              <span class="hero-pill">${course.semester}</span>
            </div>

            <div class="hero-schedule-pills">
              ${course.meetActive ? `
                <div class="live-indicator-pill">
                  <span class="live-pulse-dot"></span>
                  <span>EN DIRECTO (MEET)</span>
                </div>
              ` : ''}
              ${course.stats.nextTheory ? `<span class="hero-pill">Teoría: ${course.stats.nextTheory}</span>` : ''}
              ${course.stats.nextPractice ? `<span class="hero-pill">Prácticas: ${course.stats.nextPractice}</span>` : ''}
            </div>
          </div>

          <div class="hero-title-row">
            <h1>${course.name}</h1>
            <p class="hero-subtitle">${course.description}</p>
          </div>
        </div>

        <div class="hero-actions-row">
          <div class="hero-teacher-info">
            <img class="hero-teacher-avatar" src="${course.professorAvatar}" alt="${course.professor}">
            <div class="hero-teacher-meta">
              <strong class="hero-teacher-name">${course.professor}</strong>
              <span class="hero-teacher-sep">•</span>
              <span class="hero-teacher-dept">${course.department}</span>
            </div>
          </div>

          <div class="hero-quick-buttons">
            <button class="hero-action-btn primary-gmail-btn" onclick="App.openGmailModal()" title="Redactar correo en Gmail para ${course.professor} (${course.professorEmail})">
              <img src="assets/icons/gmail-icon.svg" width="16" height="16" alt="Gmail">
              <span>Enviar Gmail</span>
            </button>
            <button class="hero-action-btn" onclick="App.openCourseInfoModal('tutoria')" title="Solicitar tutoría en Google Calendar (${course.officeLocation})">
              <img src="assets/icons/calendar-icon.svg" width="16" height="16" alt="Calendar">
              <span>Reservar Tutoría</span>
            </button>
            <button class="hero-action-btn" onclick="App.openCourseInfoModal('syllabus')" title="Consultar Guía Docente Oficial UHU y criterios de evaluación">
              <span class="material-symbols-rounded" style="font-size: 17px; color: #1a73e8;">menu_book</span>
              <span>Guía Docente</span>
            </button>
            <button class="hero-action-btn" onclick="App.openCourseInfoModal('grades')" title="Ver desglose de calificaciones y evaluación continua">
              <span class="material-symbols-rounded" style="font-size: 17px; color: #137333;">fact_check</span>
              <span>Calificaciones</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Renders the Secondary Tabs (Google Classroom style) with unread counts on EVERY tab
  renderCourseTabs(activeTab, course) {
    const unread = course.unread || { classroom: 2, reddit: 5, apuntes: 3, notebook: 1, meet: 1 };
    const uClassroom = unread.classroom ?? 2;
    const uReddit = unread.reddit ?? 4;
    const uApuntes = unread.apuntes ?? 3;
    const uNotebook = unread.notebook ?? 2;
    const uMeet = (unread.meet && unread.meet > 0) ? unread.meet : 1;

    return `
      <nav class="course-tabs-nav" aria-label="Navegación del curso">
        <button class="course-tab-btn ${activeTab === 'classroom' ? 'active' : ''}" onclick="App.switchTab('classroom')" title="${uClassroom} elementos sin abrir en Classroom">
          <span class="material-symbols-rounded">school</span>
          <span>Classroom</span>
          <span class="tab-counter-badge unread" title="${uClassroom} sin abrir">${uClassroom}</span>
        </button>
        <button class="course-tab-btn ${activeTab === 'reddit' ? 'active' : ''}" onclick="App.switchTab('reddit')" title="${uReddit} hilos nuevos sin abrir en Reddit">
          <span class="material-symbols-rounded">forum</span>
          <span>Reddit</span>
          <span class="tab-counter-badge unread" title="${uReddit} sin abrir">${uReddit}</span>
        </button>
        <button class="course-tab-btn ${activeTab === 'apuntes' ? 'active' : ''}" onclick="App.switchTab('apuntes')" title="${uApuntes} apuntes nuevos sin abrir en Wuolah / StuDocu">
          <span class="material-symbols-rounded">description</span>
          <span>Wuolah / StuDocu</span>
          <span class="tab-counter-badge unread" title="${uApuntes} sin abrir">${uApuntes}</span>
        </button>
        <button class="course-tab-btn ${activeTab === 'notebook' ? 'active' : ''}" onclick="App.switchTab('notebook')" title="${uNotebook} actualizaciones sin abrir en NotebookLM">
          <span class="material-symbols-rounded">neurology</span>
          <span>NotebookLM</span>
          <span class="tab-counter-badge unread" title="${uNotebook} sin abrir">${uNotebook}</span>
        </button>
        <button class="course-tab-btn ${activeTab === 'meet' ? 'active' : ''}" onclick="App.switchTab('meet')" title="${uMeet} grabaciones o sesiones sin abrir en Google Meet">
          <span class="material-symbols-rounded">videocam</span>
          <span>Google Meet</span>
          <span class="tab-counter-badge unread" title="${uMeet} sin abrir">${uMeet}</span>
          ${course.meetActive ? '<span class="live-pulse-dot" style="margin-left: 2px;"></span>' : ''}
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
            <div class="compose-fake-input">¿Dudas, memes o apuntes sobre ${course.shortName}? Publica en la comunidad (+10 pts)...</div>
            <button class="g-icon-btn"><span class="material-symbols-rounded">image</span></button>
            <button class="g-icon-btn"><span class="material-symbols-rounded">poll</span></button>
            <button class="g-icon-btn"><span class="material-symbols-rounded">code</span></button>
          </div>

          <!-- Reddit Filter Chips -->
          <div class="reddit-filter-bar">
            <button class="g-chip ${filter === 'ALL' ? 'active' : ''}" onclick="App.filterReddit('ALL')">
              <span class="material-symbols-rounded">feed</span> Todos (${posts.length})
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
            <h3><span class="material-symbols-rounded" style="color: var(--google-blue);">shield</span> Normas de r/${course.shortName}_UHU</h3>
            <ol class="rules-list">
              <li>Respeto mutuo y código de conducta universitario UHU & GDGoC.</li>
              <li>No publicar código íntegro de prácticas evaluables antes de la fecha límite.</li>
              <li>Usa los flairs ([MEME], [DUDA], [APUNTES]) para mantener el orden.</li>
              <li>Las respuestas validadas por el profesor otorgan <strong>+25 Campus Points</strong>.</li>
            </ol>
          </div>

          <div class="g-card moderators-card">
            <h3>Moderación del Canal</h3>
            <div class="mod-item">
              <img src="${course.professorAvatar}" alt="Mod">
              <div>
                <strong>${course.professor}</strong>
                <div style="font-size:11px; color:#137333; font-weight:600;">Profesor Responsable (UHU)</div>
              </div>
            </div>
            <div class="mod-item">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60" alt="Mod">
              <div>
                <strong>Ariel B.</strong> (GDGoC Lead)
                <div style="font-size:11px; color:#5f6368;">Delegación & Moderador</div>
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
  renderApuntesSection(course) {
    const apuntes = course.apuntes || [];

    return `
      <div class="apuntes-container">
        <!-- Gamification Banner -->
        <div class="apuntes-banner">
          <div class="apuntes-banner-content">
            <h3><span class="material-symbols-rounded">monetization_on</span> Sube tus apuntes de ${course.shortName} y gana Campus Points</h3>
            <p>Tus apuntes verificados suman puntos canjeables por impresiones gratis en la copistería de la ETSI, créditos de Google Cloud y cafetería del Campus El Carmen.</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="g-btn g-btn-outlined" onclick="App.openPointsModal()">
              <span class="material-symbols-rounded">redeem</span>
              <span>Ver Recompensas</span>
            </button>
            <button class="g-btn g-btn-primary" onclick="App.openUploadApunteModal()">
              <span class="material-symbols-rounded">upload</span>
              <span>Subir Apuntes (+50 pts)</span>
            </button>
          </div>
        </div>

        <!-- Filter Chips -->
        <div class="reddit-filter-bar">
          <button class="g-chip active"><span class="material-symbols-rounded">all_inclusive</span> Todos (${apuntes.length})</button>
          <button class="g-chip"><span class="material-symbols-rounded">menu_book</span> Teoría Completa</button>
          <button class="g-chip"><span class="material-symbols-rounded">biotech</span> Guiones de Prácticas</button>
          <button class="g-chip"><span class="material-symbols-rounded">quiz</span> Exámenes UHU Resueltos</button>
          <button class="g-chip"><span class="material-symbols-rounded">bolt</span> Resúmenes & Chuletas</button>
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
                  <div style="font-size:11px; color:#5f6368;">${item.date} • Indexado en NotebookLM</div>
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
            <span>Temario Oficial UHU</span>
          </h3>

          <div class="module-item active">
            <div><strong>Todos los Bloques</strong></div>
            <small style="color:#5f6368;">Código ${course.code} • ${course.semester}</small>
          </div>

          ${cls.modules.map(mod => `
            <div class="module-item" onclick="App.showToast('Abriendo materiales de ${mod.number} en Google Drive...')">
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
              <span>Tablón de Anuncios del Profesorado</span>
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

          <h3 style="font-size: 16px; font-weight:600; margin-top: 12px;">Entregas de Laboratorio y Evaluación Continua</h3>

          ${cls.assignments.map(ass => `
            <div class="assignment-card">
              <div class="assignment-info">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="material-symbols-rounded" style="color:var(--google-blue);">assignment</span>
                  <h4>${ass.title}</h4>
                </div>
                <div class="assignment-due">
                  <span>Plazo: <strong>${ass.dueDate}</strong></span>
                  <span>•</span>
                  <span>${ass.feedback}</span>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:12px;">
                <span class="grade-badge" style="background-color: ${ass.statusColor}18; color: ${ass.statusColor};">
                  ${ass.grade !== '-- / 10' ? `Nota: ${ass.grade}` : ass.status}
                </span>
                <button class="g-btn g-btn-tonal" onclick="App.showToast('Detalle de entrega sincronizado con GitHub Classroom y Moodle UHU.')">
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
              <span>SALA GOOGLE MEET DE LA ASIGNATURA</span>
            </div>
            <h2>Aula Virtual y Tutorías Síncronas: ${course.name}</h2>
            <p>Profesor responsable: <strong>${course.professor}</strong> • Enlace permanente: <code>${course.meetUrl}</code></p>
          </div>

          <button class="g-btn" style="background:#ffffff; color:#0b8043; font-weight:700; padding:12px 24px; font-size:15px;" onclick="App.openMeetModal()">
            <img src="assets/icons/meet-icon.svg" width="20" height="20" alt="Meet">
            <span>Unirse a Google Meet</span>
          </button>
        </div>

        <!-- Recorded Lectures -->
        <div>
          <h3 style="font-size: 18px; margin-bottom: 16px;">Grabaciones Indexadas con Capítulos Automáticos de Gemini</h3>
          <div class="recordings-grid">
            <div class="recording-card">
              <div class="recording-thumbnail" onclick="App.openMeetModal()">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500" alt="Video">
                <div class="play-overlay-btn"><span class="material-symbols-rounded">play_arrow</span></div>
                <span class="video-duration">1h 24m</span>
              </div>
              <div class="recording-details">
                <h4>Sesión Magistral: Resolución de Problemas de Examen (${course.shortName})</h4>
                <div style="font-size:12px; color:#5f6368;">Grabado en ETSI UHU • Transcripción sincronizada con NotebookLM</div>
                <div class="recording-chapters">
                  <span>⏱️ 00:15 - Repaso de conceptos clave del bloque</span>
                  <span>⏱️ 24:30 - Resolución paso a paso de ejercicio de examen</span>
                  <span>⏱️ 55:10 - Dudas sobre la defensa de prácticas</span>
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
                <h4>Seminario de Laboratorio: Guion Práctico y Casos de Prueba</h4>
                <div style="font-size:12px; color:#5f6368;">Grabado en Laboratorio ETSI • Disponible en Google Drive</div>
                <div class="recording-chapters">
                  <span>⏱️ 02:00 - Configuración del entorno del laboratorio</span>
                  <span>⏱️ 38:20 - Criterios de corrección y pruebas límite</span>
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
              <img src="assets/icons/notebooklm-icon.svg" width="20" height="20" alt="NotebookLM">
              <span>Fuentes del Cuaderno</span>
            </h3>
            <span class="g-chip" style="font-size:11px; padding:2px 8px;">Sincronizado</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px;">
            <div class="source-file-item">
              <span class="material-symbols-rounded" style="color:#ea4335;">picture_as_pdf</span>
              <div>
                <strong>Diapositivas_${course.shortName}_UHU.pdf</strong>
                <div style="font-size:11px; color:#5f6368;">Material oficial de ${course.professor}</div>
              </div>
            </div>
            <div class="source-file-item">
              <span class="material-symbols-rounded" style="color:#1a73e8;">description</span>
              <div>
                <strong>Mejores_Apuntes_Wuolah_${course.shortName}.pdf</strong>
                <div style="font-size:11px; color:#5f6368;">Apuntes verificados por la comunidad</div>
              </div>
            </div>
            <div class="source-file-item">
              <span class="material-symbols-rounded" style="color:#34a853;">code</span>
              <div>
                <strong>Examenes_y_Practicas_${course.code}.zip</strong>
                <div style="font-size:11px; color:#5f6368;">Histórico de convocatorias ETSI UHU</div>
              </div>
            </div>
          </div>

          <button class="g-btn g-btn-outlined" style="width:100%;" onclick="App.showToast('Puedes añadir tus propios PDFs o apuntes de Drive al contexto del Agente (+10 Campus Points).')">
            <span class="material-symbols-rounded">add</span>
            <span>Añadir Fuente al Cuaderno (+10 pts)</span>
          </button>

          <!-- Audio Deep Dive Player Widget -->
          <div class="audio-deepdive-card">
            <h4>
              <span class="material-symbols-rounded" style="color:#8ab4f8;">podcasts</span>
              <span>Audio Overview (NotebookLM)</span>
            </h4>
            <p style="font-size:12px; opacity:0.85; line-height:1.4;">
              Podcast generado por IA de 6 min donde dos voces repasan los puntos clave de examen de ${course.shortName}.
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
                <p>¡Hola, Ariel! Soy tu <strong>${activeAgent.name}</strong> para <em>${course.name}</em> (${course.code}).</p>
                <p style="margin-top:6px;">${activeAgent.systemGreeting || 'He indexado todas las diapositivas de clase, los apuntes de Wuolah/StuDocu y los exámenes anteriores de la UHU. ¿En qué duda puedo ayudarte hoy?'}</p>
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
            <input type="text" id="ai-chat-input" placeholder="Pregunta al cuaderno de ${course.shortName} citando diapositivas de clase..." onkeydown="if(event.key==='Enter') App.submitChatInput()">
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
