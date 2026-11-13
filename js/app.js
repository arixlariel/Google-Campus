/**
 * Google Campus - Main Application Controller
 * Manages State, Routing, Reordering, Program Selector, Campus Points & Modals
 */

const App = {
  state: {
    currentProgramId: "ing-informatica",   // Default active degree: Grado en Ingeniería Informática (UHU)
    currentCourseId: "estructuras-datos",  // Default active course: Estructuras de Datos (2º Curso)
    currentTab: "classroom",               // Default tab: Classroom (first tab)
    currentAgentId: "tutor-eda",           // Default AI agent
    redditFilter: "ALL",
    isPlayingAudioDeepDive: false,
    draggedCourseId: null,
    courseOrder: [],                       // Custom user-defined order of courses
    chatHistories: {}
  },

  // Initialize Application
  init() {
    this.state.courseOrder = Object.keys(CAMPUS_DATA.courses);
    this.renderProgramSelector();
    this.renderSidebarCourses();
    this.renderCurrentView();
    this.setupEventListeners();
  },

  // Toggle Left Sidebar (Desktop collapse & Mobile drawer)
  toggleSidebar() {
    const sidebar = document.getElementById("campus-sidebar");
    const toggleBtn = document.getElementById("menu-toggle-btn");
    if (!sidebar) return;

    const isMobile = window.innerWidth <= 1024;
    let isVisible;

    if (isMobile) {
      sidebar.classList.toggle("open");
      isVisible = sidebar.classList.contains("open");
    } else {
      sidebar.classList.toggle("collapsed");
      isVisible = !sidebar.classList.contains("collapsed");
    }

    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", String(isVisible));
    }
  },

  // Renders the Custom Colored Program Selector Trigger & Dropdown Menu
  renderProgramSelector() {
    const activeProgram = CAMPUS_DATA.programs.find(p => p.id === this.state.currentProgramId) || CAMPUS_DATA.programs[0];

    const badgeEl = document.getElementById("program-trigger-badge");
    const iconEl = document.getElementById("program-trigger-icon");
    const catEl = document.getElementById("program-trigger-category");
    const nameEl = document.getElementById("program-trigger-name");
    const menuEl = document.getElementById("program-dropdown-menu");

    if (badgeEl) {
      badgeEl.style.backgroundColor = activeProgram.bgTint;
      badgeEl.style.color = activeProgram.color;
    }
    if (iconEl) iconEl.textContent = activeProgram.icon;
    if (catEl) {
      catEl.textContent = activeProgram.category;
      catEl.style.color = activeProgram.color;
    }
    if (nameEl) nameEl.textContent = activeProgram.name;

    if (menuEl) {
      menuEl.innerHTML = CAMPUS_DATA.programs.map(prog => {
        const isSelected = prog.id === this.state.currentProgramId;
        const count = prog.id === "all"
          ? Object.keys(CAMPUS_DATA.courses).length
          : Object.values(CAMPUS_DATA.courses).filter(c => c.programId === prog.id).length;

        return `
          <button type="button" class="program-option-item ${isSelected ? 'selected' : ''}" onclick="App.switchProgram('${prog.id}')" role="option" aria-selected="${isSelected}">
            <span class="program-option-icon" style="background-color: ${prog.bgTint}; color: ${prog.color};">
              <span class="material-symbols-rounded">${prog.icon}</span>
            </span>
            <span class="program-option-info">
              <span class="program-option-category" style="color: ${prog.color};">${prog.category}</span>
              <span class="program-option-title">${prog.name}</span>
            </span>
            <span class="program-option-count" style="background-color: ${prog.bgTint}; color: ${prog.color};">${count}</span>
          </button>
        `;
      }).join('');
    }

    // Show/hide the 1º-4º color legend depending on whether we are in Grado or All
    const legendEl = document.getElementById("year-color-legend");
    if (legendEl) {
      legendEl.style.display = (this.state.currentProgramId === "ing-informatica" || this.state.currentProgramId === "all")
        ? "flex"
        : "none";
    }
  },

  toggleProgramDropdown() {
    const menuEl = document.getElementById("program-dropdown-menu");
    const triggerEl = document.getElementById("program-selector-trigger");
    if (!menuEl) return;
    const isOpen = menuEl.classList.toggle("open");
    if (triggerEl) triggerEl.setAttribute("aria-expanded", String(isOpen));
  },

  // Switch Active Degree / Master / Community / Certification
  switchProgram(programId) {
    this.state.currentProgramId = programId;
    const menuEl = document.getElementById("program-dropdown-menu");
    const triggerEl = document.getElementById("program-selector-trigger");
    if (menuEl) menuEl.classList.remove("open");
    if (triggerEl) triggerEl.setAttribute("aria-expanded", "false");

    const courses = this.getVisibleCourses();
    if (courses.length > 0 && !courses.some(c => c.id === this.state.currentCourseId)) {
      const nextCourse = courses[0];
      this.state.currentCourseId = nextCourse.id;
      this.state.currentTab = "classroom";
      const defaultAgent = nextCourse.agents?.[0];
      this.state.currentAgentId = defaultAgent ? defaultAgent.id : null;
    }

    this.renderProgramSelector();
    this.renderSidebarCourses();
    this.renderCurrentView();

    const prog = CAMPUS_DATA.programs.find(p => p.id === programId);
    if (prog) {
      this.showToast(`Espacio activo: ${prog.name}`);
    }
  },

  getVisibleCourses() {
    if (!this.state.courseOrder || this.state.courseOrder.length === 0) {
      this.state.courseOrder = Object.keys(CAMPUS_DATA.courses);
    }
    const orderedCourses = this.state.courseOrder
      .map(id => CAMPUS_DATA.courses[id])
      .filter(Boolean);

    if (this.state.currentProgramId === "all") return orderedCourses;
    return orderedCourses.filter(c => c.programId === this.state.currentProgramId);
  },

  // Move a course Up (delta = -1) or Down (delta = 1) inside Mis Asignaturas
  moveCourse(courseId, delta, event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const visible = this.getVisibleCourses();
    const currentIndexInVisible = visible.findIndex(c => c.id === courseId);
    const targetIndexInVisible = currentIndexInVisible + delta;

    if (currentIndexInVisible < 0 || targetIndexInVisible < 0 || targetIndexInVisible >= visible.length) {
      return;
    }

    const targetCourseId = visible[targetIndexInVisible].id;
    const order = [...this.state.courseOrder];
    const idxA = order.indexOf(courseId);
    const idxB = order.indexOf(targetCourseId);

    if (idxA !== -1 && idxB !== -1) {
      order[idxA] = targetCourseId;
      order[idxB] = courseId;
      this.state.courseOrder = order;
      this.renderSidebarCourses();
    }
  },

  // Drag-and-Drop handlers for sidebar courses
  handleDragStart(courseId, event) {
    this.state.draggedCourseId = courseId;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", courseId);
    }
    event.currentTarget?.classList.add("dragging");
  },

  handleDragOver(event) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
    event.currentTarget?.classList.add("drag-over");
  },

  handleDragLeave(event) {
    event.currentTarget?.classList.remove("drag-over");
  },

  handleDrop(targetCourseId, event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget?.classList.remove("drag-over");

    const sourceId = this.state.draggedCourseId;
    this.state.draggedCourseId = null;
    if (!sourceId || sourceId === targetCourseId) return;

    const order = [...this.state.courseOrder];
    const fromIdx = order.indexOf(sourceId);
    const toIdx = order.indexOf(targetCourseId);
    if (fromIdx === -1 || toIdx === -1) return;

    order.splice(fromIdx, 1);
    order.splice(toIdx, 0, sourceId);
    this.state.courseOrder = order;
    this.renderSidebarCourses();
    this.showToast("Orden de asignaturas actualizado");
  },

  handleDragEnd(event) {
    event.currentTarget?.classList.remove("dragging");
    document.querySelectorAll(".sidebar-course-item.drag-over").forEach(el => el.classList.remove("drag-over"));
  },

  // Switch Active Course
  switchCourse(courseId) {
    const course = CAMPUS_DATA.courses[courseId];
    if (!course) return;
    if (this.state.currentProgramId !== "all" && course.programId !== this.state.currentProgramId) {
      this.state.currentProgramId = course.programId;
      this.renderProgramSelector();
    }
    this.state.currentCourseId = courseId;
    this.state.currentTab = "classroom";
    const defaultAgent = course.agents?.[0];
    this.state.currentAgentId = defaultAgent ? defaultAgent.id : null;

    this.renderSidebarCourses();
    this.renderCurrentView();

    if (window.innerWidth <= 1024) {
      document.getElementById("campus-sidebar")?.classList.remove("open");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  // Switch Tab within Course (Classroom, Reddit, Wuolah/StuDocu, NotebookLM, Meet)
  switchTab(tabName) {
    this.state.currentTab = tabName;
    this.renderCurrentView();

    if (window.innerWidth <= 1024) {
      document.getElementById("campus-sidebar")?.classList.remove("open");
    }
  },

  // Renders the Course List in Sidebar (with year dot color + Up/Down & Drag reordering)
  renderSidebarCourses() {
    const listEl = document.getElementById("sidebar-courses-list");
    const countEl = document.getElementById("sidebar-courses-count");
    if (!listEl) return;

    const coursesArr = this.getVisibleCourses();
    if (countEl) countEl.textContent = String(coursesArr.length);

    listEl.innerHTML = coursesArr.map((c, index) => {
      const dotColor = YEAR_DOT_COLORS[c.yearNumber] || c.themeColor || "#1a73e8";
      const isFirst = index === 0;
      const isLast = index === coursesArr.length - 1;

      return `
        <li class="sidebar-course-item ${c.id === this.state.currentCourseId ? 'active' : ''}"
            draggable="true"
            ondragstart="App.handleDragStart('${c.id}', event)"
            ondragover="App.handleDragOver(event)"
            ondragleave="App.handleDragLeave(event)"
            ondrop="App.handleDrop('${c.id}', event)"
            ondragend="App.handleDragEnd(event)"
            onclick="App.switchCourse('${c.id}')"
            title="${c.name} (${c.courseLevel} • ${c.semester})">
          <div class="course-item-left">
            <span class="course-color-dot" style="background-color: ${dotColor};" title="${c.courseLevel}"></span>
            <span class="course-name-text">${c.name}</span>
          </div>
          <div class="course-reorder-controls" onclick="event.stopPropagation();">
            <button type="button" class="reorder-btn" onclick="App.moveCourse('${c.id}', -1, event)" ${isFirst ? 'disabled' : ''} title="Mover asignatura hacia arriba" aria-label="Subir ${c.name}">
              <span class="material-symbols-rounded">keyboard_arrow_up</span>
            </button>
            <button type="button" class="reorder-btn" onclick="App.moveCourse('${c.id}', 1, event)" ${isLast ? 'disabled' : ''} title="Mover asignatura hacia abajo" aria-label="Bajar ${c.name}">
              <span class="material-symbols-rounded">keyboard_arrow_down</span>
            </button>
          </div>
        </li>
      `;
    }).join('');
  },

  // Renders the Active View
  renderCurrentView() {
    const mainEl = document.getElementById("main-content-view");
    if (!mainEl) return;

    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    if (!course) return;

    if (!this.state.chatHistories[course.id]) {
      this.state.chatHistories[course.id] = [];
    }

    let contentHtml = '';

    switch (this.state.currentTab) {
      case 'reddit':
        contentHtml = Components.renderRedditSection(course, this.state.redditFilter);
        break;
      case 'apuntes':
        contentHtml = Components.renderApuntesSection(course);
        break;
      case 'classroom':
        contentHtml = Components.renderClassroomSection(course);
        break;
      case 'meet':
        contentHtml = Components.renderMeetSection(course);
        break;
      case 'notebook':
        contentHtml = Components.renderNotebookSection(
          course,
          this.state.currentAgentId,
          this.state.chatHistories[course.id]
        );
        break;
      default:
        contentHtml = Components.renderClassroomSection(course);
    }

    mainEl.innerHTML = `
      ${Components.renderCourseHero(course)}
      ${Components.renderCourseTabs(this.state.currentTab, course)}
      <div class="tab-panel active">
        ${contentHtml}
      </div>
    `;
  },

  // ========================================================
  // CAMPUS POINTS MENU & REWARDS SYSTEM
  // ========================================================
  openPointsModal() {
    this.renderPointsModalContent();
    const modal = document.getElementById("points-modal");
    if (modal) modal.classList.add("open");
  },

  renderPointsModalContent() {
    const bodyEl = document.getElementById("points-modal-body");
    if (!bodyEl) return;

    const user = CAMPUS_DATA.currentUser;
    const sys = CAMPUS_DATA.pointsSystem;

    bodyEl.innerHTML = `
      <div class="points-hero-summary">
        <div class="points-balance-box">
          <span class="points-balance-label">Tu Saldo Disponible</span>
          <div class="points-balance-number">🪙 ${user.campusPoints} <small>pts</small></div>
          <span class="points-balance-sub">Rango: Colaborador Nivel Oro • ETSI UHU</span>
        </div>
        <div class="points-explanation-box">
          <h4>¿Para qué sirven y cómo funcionan los Campus Points?</h4>
          <p>${sys.explanation}</p>
        </div>
      </div>

      <div class="points-grid-columns">
        <!-- Column 1: How to earn points -->
        <div class="points-column">
          <h3 class="points-col-title">
            <span class="material-symbols-rounded" style="color:#137333;">add_Task</span>
            <span>¿Cómo conseguir puntos?</span>
          </h3>
          <div class="points-list">
            ${sys.earnMethods.map(m => `
              <div class="points-card-item">
                <div class="points-item-icon" style="background:${m.color}18; color:${m.color};">
                  <span class="material-symbols-rounded">${m.icon}</span>
                </div>
                <div class="points-item-text">
                  <strong>${m.title}</strong>
                  <p>${m.desc}</p>
                </div>
                <span class="points-earn-pill">${m.points}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Column 2: How to redeem points -->
        <div class="points-column">
          <h3 class="points-col-title">
            <span class="material-symbols-rounded" style="color:#b06000;">redeem</span>
            <span>Catálogo de Recompensas UHU & Google</span>
          </h3>
          <div class="points-list">
            ${sys.rewards.map(r => {
              const isRedeemed = user.redeemedRewards.includes(r.id);
              const canAfford = user.campusPoints >= r.cost;
              return `
                <div class="points-card-item">
                  <div class="points-item-icon" style="background:${r.color}18; color:${r.color};">
                    <span class="material-symbols-rounded">${r.icon}</span>
                  </div>
                  <div class="points-item-text">
                    <strong>${r.title}</strong>
                    <p>${r.desc}</p>
                  </div>
                  <button class="g-btn ${isRedeemed ? 'g-btn-outlined' : canAfford ? 'g-btn-tonal' : 'g-btn-outlined'}"
                          style="padding:6px 12px; font-size:12px; flex-shrink:0;"
                          onclick="App.redeemReward('${r.id}')"
                          ${isRedeemed || !canAfford ? 'disabled' : ''}>
                    ${isRedeemed ? '✓ Canjeado' : `Canjear (${r.cost} pts)`}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  redeemReward(rewardId) {
    const reward = CAMPUS_DATA.pointsSystem.rewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (CAMPUS_DATA.currentUser.campusPoints < reward.cost) {
      this.showToast("No tienes suficientes Campus Points todavía.");
      return;
    }

    CAMPUS_DATA.currentUser.campusPoints -= reward.cost;
    CAMPUS_DATA.currentUser.redeemedRewards.push(rewardId);
    this.updatePointsBadge();
    this.renderPointsModalContent();
    this.showToast(`🎁 ¡Recompensa canjeada! Código enviado a ${CAMPUS_DATA.currentUser.email}`);
  },

  // ========================================================
  // GMAIL COMPOSE & COURSE QUICK ACTIONS
  // ========================================================
  openGmailModal() {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    if (!course) return;

    const toInput = document.getElementById("gmail-to-input");
    const subInput = document.getElementById("gmail-subject-input");
    const bodyInput = document.getElementById("gmail-body-input");

    if (toInput) toInput.value = `${course.professor} <${course.professorEmail || 'profesor@uhu.es'}>`;
    if (subInput) subInput.value = `[UHU - ${course.code} ${course.shortName}] Consulta sobre la asignatura`;
    if (bodyInput) {
      bodyInput.value = `Estimado/a ${course.professor},\n\nLe escribo desde Google Campus respecto a la asignatura ${course.name} (${course.courseLevel}).\n\nTenía una consulta sobre...\n\nMuchas gracias y un cordial saludo,\n${CAMPUS_DATA.currentUser.name}`;
    }

    document.getElementById("gmail-modal")?.classList.add("open");
  },

  sendGmailToProfessor() {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    this.closeModal("gmail-modal");
    this.showToast(`✉️ Correo enviado por Gmail a ${course.professor} (${course.professorEmail})`);
  },

  openCourseInfoModal(type) {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    if (!course) return;

    const titleEl = document.getElementById("course-info-modal-title");
    const bodyEl = document.getElementById("course-info-modal-body");
    if (!titleEl || !bodyEl) return;

    if (type === "tutoria") {
      titleEl.innerHTML = `<img src="assets/icons/calendar-icon.svg" width="22" height="22" alt="Calendar"> <span>Reservar Tutoría Oficial • ${course.shortName}</span>`;
      bodyEl.innerHTML = `
        <div style="background:#f8fafd; border:1px solid #dadce0; border-radius:12px; padding:16px; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <img src="${course.professorAvatar}" style="width:44px; height:44px; border-radius:50%; object-fit:cover;" alt="${course.professor}">
            <div>
              <strong style="font-size:15px;">${course.professor}</strong>
              <div style="font-size:12px; color:#5f6368;">${course.department}</div>
            </div>
          </div>
          <div style="font-size:13px; color:#202124; display:flex; flex-direction:column; gap:6px;">
            <div>📍 <strong>Despacho / Lugar:</strong> ${course.officeLocation || 'Pabellón ETSI, Campus de El Carmen'}</div>
            <div>🕒 <strong>Horario de Tutorías:</strong> ${course.officeHours || 'Martes y Jueves de 11:00 a 14:00'}</div>
            <div>📹 <strong>Modalidad Virtual:</strong> Enlace Google Meet automático al confirmar cita</div>
          </div>
        </div>
        <h4 style="font-size:14px; margin-bottom:10px;">Selecciona un tramo disponible en Google Calendar:</h4>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <button class="g-btn g-btn-outlined" onclick="App.closeModal('course-info-modal'); App.showToast('📅 Tutoría reservada en tu Google Calendar para el Martes a las 11:30');">Martes • 11:30 - 12:00 (Presencial ETSI)</button>
          <button class="g-btn g-btn-outlined" onclick="App.closeModal('course-info-modal'); App.showToast('📅 Tutoría reservada en tu Google Calendar para el Martes a las 12:30');">Martes • 12:30 - 13:00 (Google Meet)</button>
          <button class="g-btn g-btn-outlined" onclick="App.closeModal('course-info-modal'); App.showToast('📅 Tutoría reservada en tu Google Calendar para el Jueves a las 11:30');">Jueves • 11:30 - 12:00 (Presencial ETSI)</button>
          <button class="g-btn g-btn-outlined" onclick="App.closeModal('course-info-modal'); App.showToast('📅 Tutoría reservada en tu Google Calendar para el Jueves a las 13:00');">Jueves • 13:00 - 13:30 (Google Meet)</button>
        </div>
      `;
    } else if (type === "syllabus") {
      titleEl.innerHTML = `<span class="material-symbols-rounded" style="color:#1a73e8;">menu_book</span> <span>Guía Docente Oficial UHU • ${course.name} (${course.code})</span>`;
      bodyEl.innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:16px;">
          <div style="background:#f8fafd; padding:12px; border-radius:10px; border:1px solid #e0e2ec;">
            <small style="color:#5f6368;">Código UHU</small>
            <div style="font-weight:700; font-size:15px;">${course.code}</div>
          </div>
          <div style="background:#f8fafd; padding:12px; border-radius:10px; border:1px solid #e0e2ec;">
            <small style="color:#5f6368;">Créditos ECTS</small>
            <div style="font-weight:700; font-size:15px;">6.0 ECTS (${course.semester})</div>
          </div>
          <div style="background:#f8fafd; padding:12px; border-radius:10px; border:1px solid #e0e2ec;">
            <small style="color:#5f6368;">Curso Académico</small>
            <div style="font-weight:700; font-size:15px;">2025 / 2026</div>
          </div>
        </div>
        <h4 style="font-size:14px; margin-bottom:8px;">Sistema de Evaluación (Convocatoria Ordinaria I):</h4>
        <ul style="padding-left:18px; font-size:13px; color:#3c4043; line-height:1.7; margin-bottom:14px;">
          <li><strong>Examen de Teoría y Problemas (60%):</strong> Prueba escrita oficial fijada por la Junta de Centro de la ETSI.</li>
          <li><strong>Defensa de Prácticas de Laboratorio (30%):</strong> Entregas incrementales y defensa individual en ordenador.</li>
          <li><strong>Seguimiento y Actividades Académicas Dirigidas (10%):</strong> Participación en clase y resolución de casos.</li>
        </ul>
        <div style="font-size:12px; background:#e8f0fe; color:#174ea6; padding:10px 14px; border-radius:8px;">
          ℹ️ <strong>Evaluación Única Final:</strong>Según el Reglamento de la Universidad de Huelva, el estudiante puede acogerse a Evaluación Única Final (100%) solicitándolo en las dos primeras semanas de impartición.
        </div>
      `;
    } else if (type === "grades") {
      titleEl.innerHTML = `<span class="material-symbols-rounded" style="color:#137333;">fact_check</span> <span>Calificaciones y Evaluación Continua • ${course.shortName}</span>`;
      const grades = course.gradesInfo || [];
      bodyEl.innerHTML = `
        <div style="margin-bottom:12px; font-size:13px; color:#5f6368;">
          Expediente en curso de <strong>${CAMPUS_DATA.currentUser.name}</strong> para <strong>${course.name}</strong>:
        </div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${grades.map(g => `
            <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border:1px solid #dadce0; border-radius:10px; background:#fff;">
              <div>
                <strong style="font-size:14px;">${g.item}</strong>
                <div style="font-size:12px; color:#5f6368;">Ponderación en guía docente: ${g.weight}</div>
              </div>
              <span class="grade-badge" style="background:#e6f4ea; color:#137333;">${g.score}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    document.getElementById("course-info-modal")?.classList.add("open");
  },

  // Reddit Filter handler
  filterReddit(filter) {
    this.state.redditFilter = filter;
    this.renderCurrentView();
  },

  // Reddit Upvote/Downvote Handler
  handleVote(postId, direction) {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const post = course.forumPosts.find(p => p.id === postId);
    if (!post) return;

    if (post.userVoted === direction) {
      post.votes -= direction;
      post.userVoted = 0;
    } else {
      post.votes += (direction - post.userVoted);
      post.userVoted = direction;
    }

    const postEl = document.getElementById(`post-${postId}`);
    if (postEl) {
      const countEl = postEl.querySelector('.vote-count');
      const upBtn = postEl.querySelector('.vote-btn:first-child');
      const downBtn = postEl.querySelector('.vote-btn:last-child');

      if (countEl) countEl.textContent = post.votes;
      if (upBtn) upBtn.classList.toggle('upvoted', post.userVoted === 1);
      if (downBtn) downBtn.classList.toggle('downvoted', post.userVoted === -1);
      if (countEl) {
        countEl.classList.toggle('upvoted', post.userVoted === 1);
        countEl.classList.toggle('downvoted', post.userVoted === -1);
      }
    }
  },

  // Modal: Create Post
  openCreatePostModal() {
    const modalEl = document.getElementById("create-post-modal");
    if (modalEl) modalEl.classList.add("open");
  },

  submitNewPost() {
    const title = document.getElementById("new-post-title")?.value.trim();
    const content = document.getElementById("new-post-content")?.value.trim();
    const flair = document.getElementById("new-post-flair")?.value || "DUDA";

    if (!title || !content) {
      alert("Por favor rellena el título y el contenido de tu publicación.");
      return;
    }

    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const newPost = {
      id: `custom-post-${Date.now()}`,
      author: CAMPUS_DATA.currentUser.name,
      authorRole: CAMPUS_DATA.currentUser.role,
      authorAvatar: CAMPUS_DATA.currentUser.avatar,
      timeAgo: "Ahora mismo",
      flair: flair,
      flairColor: flair === 'MEME' ? '#ea4335' : flair === 'DUDA' ? '#1a73e8' : '#34a853',
      title: title,
      content: content,
      votes: 1,
      userVoted: 1,
      commentsCount: 0,
      comments: []
    };

    course.forumPosts.unshift(newPost);
    course.stats.forumPosts += 1;
    course.unread.reddit = (course.unread.reddit || 0) + 1;
    CAMPUS_DATA.currentUser.campusPoints += 10;
    this.updatePointsBadge();

    this.closeModal("create-post-modal");
    this.renderCurrentView();
    this.showToast("¡Publicación enviada al foro! Has ganado +10 Campus Points 🪙");

    if (document.getElementById("new-post-title")) document.getElementById("new-post-title").value = "";
    if (document.getElementById("new-post-content")) document.getElementById("new-post-content").value = "";
  },

  // Modal: Post Detail with Threaded Comments
  openPostDetailModal(postId) {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const post = course.forumPosts.find(p => p.id === postId);
    if (!post) return;

    const modalBody = document.getElementById("post-detail-modal-body");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 16px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <img src="${post.authorAvatar}" style="width:28px; height:28px; border-radius:50%;" alt="Author">
          <strong>${post.author}</strong>
          <span style="font-size:12px; color:#5f6368;">(${post.authorRole})</span>
          <span class="post-flair" style="background:${post.flairColor}20; color:${post.flairColor};">${post.flair}</span>
        </div>
        <h2 style="font-size: 20px; font-weight:600; margin-bottom: 8px;">${post.title}</h2>
        <p style="font-size: 14px; line-height:1.6; color:#202124;">${post.content}</p>
        ${post.image ? `<img src="${post.image}" style="width:100%; border-radius:12px; margin-top:12px;" alt="Post img">` : ''}
      </div>

      <hr style="border:none; border-top:1px solid #e8eaed; margin:16px 0;">

      <!-- Comments Thread -->
      <h3 style="font-size: 15px; margin-bottom: 12px;">Comentarios (${post.comments.length})</h3>
      <div style="display:flex; flex-direction:column; gap:12px; margin-bottom: 18px;">
        ${post.comments.map(c => `
          <div style="background:#f8fafd; padding:12px 16px; border-radius:12px; border:1px solid #e0e2ec;">
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
              <strong>${c.author} ${c.isTeacher ? '<span style="color:#137333; font-weight:700;">(Profesor Oficial UHU)</span>' : ''}</strong>
              <span style="color:#5f6368;">${c.time}</span>
            </div>
            <div style="font-size:13px; color:#3c4043;">${c.text}</div>
          </div>
        `).join('')}
      </div>

      <!-- Add Comment Form -->
      <div style="display:flex; gap:10px;">
        <input type="text" id="new-comment-input" placeholder="Escribe una respuesta constructiva..." style="flex:1; border:1px solid #dadce0; border-radius:20px; padding:10px 16px;">
        <button class="g-btn g-btn-primary" onclick="App.addCommentToPost('${post.id}')">Responder</button>
      </div>
    `;

    document.getElementById("post-detail-modal")?.classList.add("open");
  },

  addCommentToPost(postId) {
    const input = document.getElementById("new-comment-input");
    const text = input ? input.value.trim() : "";
    if (!text) return;

    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const post = course.forumPosts.find(p => p.id === postId);
    if (!post) return;

    post.comments.push({
      author: CAMPUS_DATA.currentUser.name,
      time: "Ahora mismo",
      text: text,
      upvotes: 1
    });
    post.commentsCount += 1;

    this.openPostDetailModal(postId);
    this.renderCurrentView();
    this.showToast("Comentario publicado en el hilo.");
  },

  // Modal: Document Reader (Wuolah style preview)
  openDocReaderModal(apunteId) {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const apunte = course.apuntes.find(a => a.id === apunteId);
    if (!apunte) return;

    const modalBody = document.getElementById("doc-reader-modal-body");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding:0 8px;">
        <div>
          <h3 style="font-size:16px; font-weight:600;">${apunte.title}</h3>
          <span style="font-size:12px; color:#5f6368;">Subido por ${apunte.author} • ${apunte.pages} páginas • Sin publicidad</span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="g-btn g-btn-tonal" onclick="App.downloadApunte('${apunte.id}')">
            <span class="material-symbols-rounded">download</span> Descargar PDF
          </button>
        </div>
      </div>

      <div class="doc-reader-viewport">
        <div class="doc-sheet">
          <h2>${course.name} (${course.code})</h2>
          <p style="font-size:14px; font-style:italic; margin-bottom:18px;">Universidad de Huelva (ETSI) • ${apunte.date}</p>
          <hr style="border:none; border-top:1px solid #ccc; margin-bottom:16px;">
          <p style="font-size:15px; margin-bottom:14px;">${apunte.previewText}</p>
          <div style="background:#f1f3f4; padding:14px; border-radius:8px; font-family:monospace; font-size:13px; margin-bottom:16px;">
            // Ejemplo práctico incluido en los apuntes verificados:<br>
            template &lt;typename T&gt;<br>
            void ArbolAVL&lt;T&gt;::equilibrar(Nodo*&amp; n) {<br>
            &nbsp;&nbsp;if (altura(n-&gt;izq) - altura(n-&gt;der) == 2) { /* Rotación */ }<br>
            }
          </div>
          <p style="font-size:13px; color:#5f6368; text-align:center; margin-top:32px;">
            -- Página 1 de ${apunte.pages} • Indexado automáticamente en NotebookLM --
          </p>
        </div>
      </div>
    `;

    document.getElementById("doc-reader-modal")?.classList.add("open");
  },

  // Download Apunte Handler
  downloadApunte(apunteId) {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const apunte = course.apuntes.find(a => a.id === apunteId);
    if (!apunte) return;

    apunte.downloads += 1;
    this.renderCurrentView();
    this.showToast(`📥 Descargando "${apunte.title.substring(0, 32)}...". El autor ha recibido +5 Campus Points.`);
  },

  // Modal: Upload Apunte
  openUploadApunteModal() {
    document.getElementById("upload-apunte-modal")?.classList.add("open");
  },

  submitUploadApunte() {
    const title = document.getElementById("upload-title")?.value.trim();
    if (!title) {
      alert("Por favor indica el título del apunte.");
      return;
    }

    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const newApunte = {
      id: `custom-apunte-${Date.now()}`,
      title: title,
      author: `${CAMPUS_DATA.currentUser.name} (Tú)`,
      authorAvatar: CAMPUS_DATA.currentUser.avatar,
      downloads: 1,
      rating: 5.0,
      reviewsCount: 1,
      pages: 18,
      verified: true,
      badge: "Recién Subido",
      date: "Hoy",
      tags: ["UHU", course.shortName, course.courseLevel],
      previewText: "Documento subido por el estudiante e indexado automáticamente en el cuaderno NotebookLM de la asignatura."
    };

    course.apuntes.unshift(newApunte);
    course.stats.notesCount += 1;
    course.unread.apuntes = (course.unread.apuntes || 0) + 1;
    CAMPUS_DATA.currentUser.campusPoints += 50;

    this.updatePointsBadge();
    this.closeModal("upload-apunte-modal");
    this.renderCurrentView();

    this.showToast("🎉 ¡Apuntes publicados! Has ganado +50 Campus Points 🪙");
  },

  // Modal: Google Meet Simulation
  openMeetModal() {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const meetTitle = document.getElementById("meet-modal-title");
    const speakerAvatar = document.getElementById("meet-speaker-avatar");
    const speakerName = document.getElementById("meet-speaker-name");

    if (meetTitle) meetTitle.textContent = `Google Meet: ${course.name}`;
    if (speakerAvatar) speakerAvatar.src = course.professorAvatar;
    if (speakerName) speakerName.textContent = `${course.professor} (${course.shortName})`;

    document.getElementById("meet-simulator-modal")?.classList.add("open");
  },

  toggleMeetMic() {
    const btn = document.getElementById("meet-mic-btn");
    if (!btn) return;
    const icon = btn.querySelector(".material-symbols-rounded");
    if (btn.classList.contains("danger")) {
      btn.classList.remove("danger");
      if (icon) icon.textContent = "mic";
      this.showToast("Micrófono activado.");
    } else {
      btn.classList.add("danger");
      if (icon) icon.textContent = "mic_off";
      this.showToast("Micrófono silenciado.");
    }
  },

  toggleMeetCam() {
    const btn = document.getElementById("meet-cam-btn");
    if (!btn) return;
    const icon = btn.querySelector(".material-symbols-rounded");
    if (btn.classList.contains("danger")) {
      btn.classList.remove("danger");
      if (icon) icon.textContent = "videocam";
      this.showToast("Cámara activada.");
    } else {
      btn.classList.add("danger");
      if (icon) icon.textContent = "videocam_off";
      this.showToast("Cámara desactivada.");
    }
  },

  hangupMeet() {
    this.closeModal("meet-simulator-modal");
    this.showToast("Has salido de la sala de Google Meet.");
  },

  // Modal: Pitch Presentation for Google
  openPitchModal() {
    document.getElementById("pitch-modal")?.classList.add("open");
  },

  // Close any modal
  closeModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) modalEl.classList.remove("open");
  },

  // Select Specialized Agent for the Course
  selectAgent(agentId) {
    this.state.currentAgentId = agentId;
    this.renderCurrentView();
    this.showToast("Agente de NotebookLM cambiado.");
  },

  // Ask AI via prompt chips or input
  askAI(promptText) {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    if (!this.state.chatHistories[course.id]) {
      this.state.chatHistories[course.id] = [];
    }
    const history = this.state.chatHistories[course.id];

    history.push({
      sender: "user",
      htmlContent: `<p>${promptText}</p>`
    });

    this.renderCurrentView();

    let responseText = "";
    const lower = promptText.toLowerCase();
    if (lower.includes("dijkstra") || lower.includes("negativo")) {
      responseText = AI_SIMULATED_RESPONSES["dijkstra"];
    } else if (lower.includes("avl") || lower.includes("rotaci")) {
      responseText = AI_SIMULATED_RESPONSES["avl"];
    } else if (lower.includes("manhattan") || lower.includes("heur")) {
      responseText = AI_SIMULATED_RESPONSES["manhattan"];
    } else {
      responseText = `### 🤖 Respuesta del Cuaderno NotebookLM de ${course.shortName} (${course.code})

Basándome en las **diapositivas de ${course.professor}** y en los apuntes verificados de la ETSI UHU:

1. **Concepto Clave**: Este apartado entra habitualmente en las pruebas de evaluación de *${course.name}*.
2. **Recomendación de Laboratorio**: Revisa los casos límite en los guiones de prácticas y apóyate en los ejemplos resueltos subidos en la pestaña **Wuolah / StuDocu**.
3. **Referencia**: *[Guía Docente UHU ${course.code} • ${course.department}]*`;
    }

    setTimeout(() => {
      history.push({
        sender: "ai",
        htmlContent: `
          <div>${this.formatMarkdownToHtml(responseText)}</div>
          <span class="chat-citation-chip">
            <span class="material-symbols-rounded" style="font-size:14px;">verified</span>
            Fuente verificada en el cuaderno de ${course.shortName}
          </span>
        `
      });
      this.renderCurrentView();

      const chatContainer = document.getElementById("chat-messages-scroll");
      if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 500);
  },

  submitChatInput() {
    const input = document.getElementById("ai-chat-input");
    const text = input ? input.value.trim() : "";
    if (!text) return;
    this.askAI(text);
    input.value = "";
  },

  // Toggle Audio Deep Dive Podcast Simulator
  toggleAudioDeepDive() {
    const icon = document.getElementById("podcast-play-icon");
    const text = document.getElementById("podcast-play-text");
    const waveform = document.getElementById("audio-waveform");

    this.state.isPlayingAudioDeepDive = !this.state.isPlayingAudioDeepDive;

    if (this.state.isPlayingAudioDeepDive) {
      if (icon) icon.textContent = "pause";
      if (text) text.textContent = "Pausar Audio Overview";
      if (waveform) waveform.style.opacity = "1";
      this.showToast("🎙️ Reproduciendo Audio Overview de NotebookLM (2 voces IA)");
    } else {
      if (icon) icon.textContent = "play_arrow";
      if (text) text.textContent = "Escuchar Resumen";
      if (waveform) waveform.style.opacity = "0.4";
      this.showToast("Audio pausado.");
    }
  },

  // Toggle Google Apps Waffle Menu
  toggleAppsDropdown() {
    const dropdown = document.getElementById("apps-waffle-dropdown");
    if (dropdown) dropdown.classList.toggle("open");
  },

  // Share / Save Post helpers
  sharePost() {
    navigator.clipboard?.writeText(window.location.href);
    this.showToast("Enlace copiado al portapapeles.");
  },

  savePost() {
    this.showToast("Guardado en tus marcadores de Google Campus.");
  },

  // Toast Notification Helper
  showToast(message) {
    const toast = document.getElementById("campus-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = "block";
    toast.style.opacity = "1";

    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => { toast.style.display = "none"; }, 300);
    }, 3200);
  },

  updatePointsBadge() {
    const badge = document.getElementById("user-points-badge");
    if (badge) badge.textContent = `${CAMPUS_DATA.currentUser.campusPoints} pts`;
  },

  // Simple Markdown to HTML formatter for AI responses
  formatMarkdownToHtml(md) {
    return md
      .replace(/^### (.*$)/gim, '<h3 style="font-size:16px; font-weight:600; margin:10px 0 6px 0;">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 style="font-size:14px; font-weight:600; margin:8px 0 4px 0;">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre style="background:#202124; color:#fff; padding:12px; border-radius:8px; font-family:monospace; font-size:12px; overflow-x:auto;">$1</pre>')
      .replace(/`([^`]+)`/g, '<code style="background:#e8eaed; padding:2px 6px; border-radius:4px; font-family:monospace; font-size:12px;">$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote style="border-left:3px solid #1a73e8; padding-left:12px; margin:8px 0; color:#5f6368; font-style:italic;">$1</blockquote>')
      .replace(/\n\n/g, '<br><br>');
  },

  setupEventListeners() {
    document.addEventListener("click", (e) => {
      // Close Google Apps Waffle dropdown when clicking outside
      const waffleBtn = document.getElementById("apps-waffle-btn");
      const dropdown = document.getElementById("apps-waffle-dropdown");
      if (dropdown && waffleBtn && !waffleBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }

      // Close Program Selector dropdown when clicking outside
      const progContainer = document.getElementById("program-selector-container");
      const progMenu = document.getElementById("program-dropdown-menu");
      const progTrigger = document.getElementById("program-selector-trigger");
      if (progMenu && progContainer && !progContainer.contains(e.target)) {
        progMenu.classList.remove("open");
        if (progTrigger) progTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }
};

// Auto-run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
