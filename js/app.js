/**
 * Google Campus - Main Application Controller
 * Manages State, Routing, Modals, and Interactive Events
 */

const App = {
  state: {
    currentCourseId: "estructuras-datos", // Default active course: EDA (2º año)
    currentTab: "reddit",                  // Default tab: Reddit forum
    currentAgentId: "tutor-eda",           // Default AI agent
    redditFilter: "ALL",
    isPlayingAudioDeepDive: false,
    audioAudioInstance: null,
    chatHistories: {
      "fundamentos-programacion": [],
      "estructuras-datos": [],
      "inteligencia-artificial": []
    }
  },

  // Initialize Application
  init() {
    this.renderSidebarCourses();
    this.renderCurrentView();
    this.setupEventListeners();
  },

  // Switch Active Course (from 1º, 2º or 3º año)
  switchCourse(courseId) {
    if (!CAMPUS_DATA.courses[courseId]) return;
    this.state.currentCourseId = courseId;
    this.state.currentTab = "reddit"; // Reset to forum tab on switch
    const defaultAgent = CAMPUS_DATA.courses[courseId].agents[0];
    this.state.currentAgentId = defaultAgent ? defaultAgent.id : null;

    this.renderSidebarCourses();
    this.renderCurrentView();

    // Scroll to top of main content smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.showToast(`Cambiado a: ${CAMPUS_DATA.courses[courseId].name}`);
  },

  // Switch Tab within Course (Reddit, Apuntes, Classroom, Meet, NotebookLM)
  switchTab(tabName) {
    this.state.currentTab = tabName;
    this.renderCurrentView();
  },

  // Renders the Course List in Sidebar
  renderSidebarCourses() {
    const listEl = document.getElementById("sidebar-courses-list");
    if (!listEl) return;

    const coursesArr = Object.values(CAMPUS_DATA.courses);
    listEl.innerHTML = coursesArr.map(c => `
      <li class="sidebar-course-item ${c.id === this.state.currentCourseId ? 'active' : ''}" onclick="App.switchCourse('${c.id}')">
        <div class="course-item-left">
          <span class="course-color-dot" style="background-color: ${c.themeColor};"></span>
          <span class="course-name-text">${c.name}</span>
        </div>
        <span class="course-year-badge">${c.year.split('•')[0].trim()}</span>
      </li>
    `).join('');
  },

  // Renders the Active View
  renderCurrentView() {
    const mainEl = document.getElementById("main-content-view");
    if (!mainEl) return;

    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    if (!course) return;

    // Build the container HTML with Hero + Secondary Tabs + Tab Content
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
        contentHtml = Components.renderRedditSection(course);
    }

    mainEl.innerHTML = `
      ${Components.renderCourseHero(course)}
      ${Components.renderCourseTabs(this.state.currentTab, course.stats)}
      <div class="tab-panel active">
        ${contentHtml}
      </div>
    `;
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
      // Undo vote
      post.votes -= direction;
      post.userVoted = 0;
    } else {
      // Change vote
      post.votes += (direction - post.userVoted);
      post.userVoted = direction;
    }

    // Update karma display directly in DOM for instant feedback
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

    this.closeModal("create-post-modal");
    this.renderCurrentView();
    this.showToast("¡Publicación enviada al foro con éxito!");

    // Reset input fields
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
              <strong>${c.author} ${c.isTeacher ? '<span style="color:#137333; font-weight:700;">(Profesor)</span>' : ''}</strong>
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

    document.getElementById("post-detail-modal").classList.add("open");
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

    this.openPostDetailModal(postId); // Refresh modal view
    this.renderCurrentView(); // Refresh background counter
    this.showToast("Comentario publicado.");
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
          <span style="font-size:12px; color:#5f6368;">Subido por ${apunte.author} • ${apunte.pages} páginas</span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="g-btn g-btn-tonal" onclick="App.downloadApunte('${apunte.id}')">
            <span class="material-symbols-rounded">download</span> Descargar PDF
          </button>
        </div>
      </div>

      <div class="doc-reader-viewport">
        <div class="doc-sheet">
          <h2>${course.name} - ${course.code}</h2>
          <p style="font-size:14px; font-style:italic; margin-bottom:18px;">Material de apoyo verificado por GDGoC • ${apunte.date}</p>
          <hr style="border:none; border-top:1px solid #ccc; margin-bottom:16px;">
          <p style="font-size:15px; margin-bottom:14px;">${apunte.previewText}</p>
          <div style="background:#f1f3f4; padding:14px; border-radius:8px; font-family:monospace; font-size:13px; margin-bottom:16px;">
            // Fragmento de demostración de código y teoremas incluidos en este apunte:<br>
            template &lt;typename T&gt;<br>
            void AVLTree&lt;T&gt;::rebalance(Node*&amp; node) {<br>
            &nbsp;&nbsp;int balance = getBalanceFactor(node);<br>
            &nbsp;&nbsp;if (balance &gt; 1) { /* Rotación Derecha */ }<br>
            }
          </div>
          <p style="font-size:13px; color:#5f6368; text-align:center; margin-top:32px;">
            -- Página 1 de ${apunte.pages} • Documento completo disponible para descarga --
          </p>
        </div>
      </div>
    `;

    document.getElementById("doc-reader-modal").classList.add("open");
  },

  // Download Apunte Handler
  downloadApunte(apunteId) {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const apunte = course.apuntes.find(a => a.id === apunteId);
    if (!apunte) return;

    apunte.downloads += 1;
    CAMPUS_DATA.currentUser.campusPoints += 5;
    this.updatePointsBadge();
    this.renderCurrentView();

    this.showToast(`Descargando "${apunte.title.substring(0, 30)}...". ¡Has ganado +5 Campus Points! 🪙`);
  },

  // Modal: Upload Apunte
  openUploadApunteModal() {
    document.getElementById("upload-apunte-modal").classList.add("open");
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
      downloads: 0,
      rating: 5.0,
      reviewsCount: 1,
      pages: 12,
      verified: true,
      badge: "Nuevo",
      date: "Hoy",
      tags: ["Apuntes", "Comunidad", course.shortName],
      previewText: "Documento subido por el alumno. Pendiente de valoración por la comunidad."
    };

    course.apuntes.unshift(newApunte);
    course.stats.notesCount += 1;
    CAMPUS_DATA.currentUser.campusPoints += 50;

    this.updatePointsBadge();
    this.closeModal("upload-apunte-modal");
    this.renderCurrentView();

    this.showToast("🎉 ¡Apuntes subidos! Has recibido +50 Campus Points.");
  },

  // Modal: Google Meet Simulation
  openMeetModal() {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const meetTitle = document.getElementById("meet-modal-title");
    if (meetTitle) meetTitle.textContent = `Google Meet: ${course.name}`;

    document.getElementById("meet-simulator-modal").classList.add("open");
  },

  toggleMeetMic() {
    const btn = document.getElementById("meet-mic-btn");
    const icon = btn.querySelector(".material-symbols-rounded");
    if (btn.classList.contains("danger")) {
      btn.classList.remove("danger");
      icon.textContent = "mic";
      this.showToast("Micrófono activado.");
    } else {
      btn.classList.add("danger");
      icon.textContent = "mic_off";
      this.showToast("Micrófono silenciado.");
    }
  },

  toggleMeetCam() {
    const btn = document.getElementById("meet-cam-btn");
    const icon = btn.querySelector(".material-symbols-rounded");
    if (btn.classList.contains("danger")) {
      btn.classList.remove("danger");
      icon.textContent = "videocam";
      this.showToast("Cámara activada.");
    } else {
      btn.classList.add("danger");
      icon.textContent = "videocam_off";
      this.showToast("Cámara desactivada.");
    }
  },

  hangupMeet() {
    this.closeModal("meet-simulator-modal");
    this.showToast("Has salido de la sesión de Google Meet.");
  },

  // Modal: Pitch Presentation for Google
  openPitchModal() {
    document.getElementById("pitch-modal").classList.add("open");
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
    this.showToast("Agente cambiado.");
  },

  // Ask AI via prompt chips or input
  askAI(promptText) {
    const course = CAMPUS_DATA.courses[this.state.currentCourseId];
    const history = this.state.chatHistories[course.id];

    // Add user question
    history.push({
      sender: "user",
      htmlContent: `<p>${promptText}</p>`
    });

    // Re-render chat
    this.renderCurrentView();

    // Determine simulated intelligent response
    let responseText = "";
    if (promptText.toLowerCase().includes("dijkstra") || promptText.toLowerCase().includes("negativo")) {
      responseText = AI_SIMULATED_RESPONSES["dijkstra"];
    } else if (promptText.toLowerCase().includes("avl") || promptText.toLowerCase().includes("rotaci")) {
      responseText = AI_SIMULATED_RESPONSES["avl"];
    } else if (promptText.toLowerCase().includes("manhattan") || promptText.toLowerCase().includes("heur")) {
      responseText = AI_SIMULATED_RESPONSES["manhattan"];
    } else {
      responseText = `### 🤖 Explicación Personalizada del Agente de ${course.shortName}

Basándome en las **diapositivas oficiales del curso** y en los apuntes de la clase:

1. **Concepto Clave**: Este tema se evalúa habitualmente en el segundo examen parcial.
2. **Recomendación Práctica**: Recuerda modularizar las funciones y comprobar siempre la condición de parada antes de acceder a posiciones del array o desreferenciar punteros.
3. **Cita Directa**: *[Ver Guía Docente de ${course.name}, Semestre 1]*`;
    }

    // Simulate typing delay
    setTimeout(() => {
      history.push({
        sender: "ai",
        htmlContent: `
          <div>${this.formatMarkdownToHtml(responseText)}</div>
          <span class="chat-citation-chip">
            <span class="material-symbols-rounded" style="font-size:14px;">verified</span>
            Fuente validada con el material de la asignatura
          </span>
        `
      });
      this.renderCurrentView();

      // Scroll to bottom of chat
      const chatContainer = document.getElementById("chat-messages-scroll");
      if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 600);
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
      if (text) text.textContent = "Pausar Deep Dive";
      if (waveform) waveform.style.opacity = "1";
      this.showToast("🎙️ Reproduciendo Audio Podcast con 2 voces de IA (NotebookLM)");
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
  sharePost(postId) {
    navigator.clipboard?.writeText(window.location.href);
    this.showToast("Enlace de la publicación copiado al portapapeles.");
  },

  savePost(postId) {
    this.showToast("Publicación guardada en tus marcadores de Campus.");
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
    // Global click listener to close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      const waffleBtn = document.getElementById("apps-waffle-btn");
      const dropdown = document.getElementById("apps-waffle-dropdown");
      if (dropdown && waffleBtn && !waffleBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }
};

// Auto-run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
