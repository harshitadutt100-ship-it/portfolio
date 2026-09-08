/**
 * Main Application Controller
 * Handles UI interactions, config rendering, Web Audio synthesis, 3D card tilt, and modals.
 */

function init() {
  initFromConfig();
  initProjectsView();
  initIntersectionReveals();
  initHeaderScroll();
  initAudioSystem();
  initCard3DTilt();
  initModal();
  initTelemetryClock();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

/* ==========================================================================
   CONFIG BINDING & DOM HYDRATION
   ========================================================================== */
function initFromConfig() {
  if (typeof PORTFOLIO_CONFIG === "undefined") return;

  const cfg = PORTFOLIO_CONFIG;

  // Profile binding
  document.querySelectorAll(".bind-name").forEach(el => el.textContent = cfg.profile.name);
  document.querySelectorAll(".bind-headline").forEach(el => el.textContent = cfg.profile.headline);
  document.querySelectorAll(".bind-roles").forEach(el => el.textContent = cfg.profile.roles);
  document.querySelectorAll(".bind-tagline").forEach(el => el.textContent = cfg.profile.tagline);
  document.querySelectorAll(".bind-email").forEach(el => {
    el.textContent = cfg.profile.email;
    if (el.tagName === "A") el.href = `mailto:${cfg.profile.email}`;
  });
  document.querySelectorAll(".bind-phone").forEach(el => {
    el.textContent = cfg.profile.phone;
    if (el.tagName === "A") el.href = `tel:${cfg.profile.phone.replace(/[^0-9+]/g, "")}`;
  });
  document.querySelectorAll(".bind-location").forEach(el => el.textContent = cfg.profile.location);

  const githubLink = document.getElementById("link-github");
  if (githubLink) githubLink.href = cfg.profile.githubUrl || `https://github.com/${cfg.profile.github}`;

  const linkedinLink = document.getElementById("link-linkedin");
  if (linkedinLink && cfg.profile.linkedin) linkedinLink.href = cfg.profile.linkedin;

  const portraitImg = document.getElementById("hero-portrait-img");
  if (portraitImg && cfg.profile.avatarUrl) {
    portraitImg.src = cfg.profile.avatarUrl;
    portraitImg.alt = `${cfg.profile.name} - Portrait`;
  }

  // About Telemetry binding
  const aboutTelemetryContainer = document.getElementById("about-telemetry-container");
  if (aboutTelemetryContainer && cfg.about && cfg.about.telemetry) {
    aboutTelemetryContainer.innerHTML = cfg.about.telemetry.map(item => `
      <div class="telemetry-card">
        <div class="telemetry-card-label">${item.label}</div>
        <div class="telemetry-card-value">${item.value}</div>
        <div class="telemetry-card-status">${item.status}</div>
      </div>
    `).join("");
  }

  // Education Timeline
  const eduContainer = document.getElementById("education-timeline-container");
  if (eduContainer && cfg.education) {
    eduContainer.innerHTML = cfg.education.map(item => `
      <div class="timeline-item reveal-on-scroll is-revealed">
        <div class="timeline-node"></div>
        <div class="timeline-content">
          <div class="timeline-period">${item.period}</div>
          <h3 class="timeline-degree">${item.degree}</h3>
          <div class="timeline-institution">${item.institution} — <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.85rem;">${item.score || ""}</span></div>
          <p class="timeline-desc">${item.details}</p>
          ${item.highlights ? `
            <ul class="timeline-highlights">
              ${item.highlights.map(h => `<li>${h}</li>`).join("")}
            </ul>
          ` : ""}
        </div>
      </div>
    `).join("");
  }

  // Certifications Grid
  const certsContainer = document.getElementById("certifications-grid-container");
  if (certsContainer && cfg.certifications) {
    certsContainer.innerHTML = cfg.certifications.map(cert => `
      <div class="cert-card reveal-on-scroll is-revealed">
        <span class="cert-badge">${cert.badge}</span>
        <h3 class="cert-title">${cert.title}</h3>
        <div class="cert-issuer">${cert.issuer}</div>
        <p class="cert-details">${cert.details}</p>
      </div>
    `).join("");
  }

  // Categorized Skills
  const skillsContainer = document.getElementById("capabilities-cloud-container");
  if (skillsContainer && cfg.skillsCategorized) {
    skillsContainer.innerHTML = cfg.skillsCategorized.map(cat => `
      <div class="skill-category-block">
        <div class="skill-category-title">
          <span class="skill-dot"></span>
          <span>${cat.category}</span>
        </div>
        <div class="skill-category-pills">
          ${cat.skills.map(s => `<span class="skill-pill-tag">${s}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  // Philosophy
  const philStatement = document.getElementById("philosophy-statement");
  if (philStatement && cfg.philosophy) {
    philStatement.innerHTML = cfg.philosophy.statement.replace(/\n/g, "<br>");
  }
}

/* ==========================================================================
   PROJECTS VIEW CONTROLLER (RESUME PROJECTS VS LIVE GITHUB)
   ========================================================================== */
function initProjectsView() {
  const container = document.getElementById("projects-display-container");
  const tabFlagships = document.getElementById("tab-flagships");
  const tabGithub = document.getElementById("tab-github");

  if (!container || !tabFlagships || !tabGithub) return;

  function renderFlagships() {
    const projects = PORTFOLIO_CONFIG.projects || [];
    container.innerHTML = projects.map(project => `
      <div class="project-card floating-card" data-tilt="true">
        <div class="card-inner">
          <div class="card-header">
            <div class="card-meta">
              <span class="card-index">${project.id} // ${project.category.toUpperCase()}</span>
              <span class="repo-badge">${project.badge}</span>
            </div>
            <div class="star-count">
              <span>${project.year}</span>
            </div>
          </div>
          <h3 class="card-title">${project.name}</h3>
          <p class="card-description" style="margin-bottom: 0.75rem;">${project.description}</p>
          ${project.highlights ? `
            <ul class="project-highlights-list">
              ${project.highlights.map(h => `<li>${h}</li>`).join("")}
            </ul>
          ` : ""}
          <div class="card-footer">
            <div class="card-tech">
              ${project.technologies.slice(0, 4).map(tech => `<span class="tech-tag">#${tech}</span>`).join(" ")}
            </div>
            <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action">
              <span>VIEW DETAILS</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `).join("");

    initCard3DTilt();
  }

  tabFlagships.addEventListener("click", () => {
    tabFlagships.classList.add("active");
    tabGithub.classList.remove("active");
    renderFlagships();
    window.audioPlayer && window.audioPlayer.playClick();
  });

  tabGithub.addEventListener("click", () => {
    tabGithub.classList.add("active");
    tabFlagships.classList.remove("active");
    if (typeof GitHubClient !== "undefined") {
      GitHubClient.init(PORTFOLIO_CONFIG.profile.github, "projects-display-container");
    }
    window.audioPlayer && window.audioPlayer.playClick();
  });

  // Default initial render
  renderFlagships();
}

/* ==========================================================================
   SCROLL REVEALS
   ========================================================================== */
function initIntersectionReveals() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) {
      el.classList.add("is-revealed");
    } else {
      observer.observe(el);
    }
  });
}

/* ==========================================================================
   HEADER SCROLL DETECTOR
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

/* ==========================================================================
   3D CARD TILT EFFECT (ZERO-G DEPTH)
   ========================================================================== */
function initCard3DTilt() {
  const cards = document.querySelectorAll(".floating-card");

  cards.forEach(card => {
    if (card.dataset.tiltInitialized) return;
    card.dataset.tiltInitialized = "true";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}

/* ==========================================================================
   WEB AUDIO SYNTHESIZER (FUTURISTIC SOUND DESIGN)
   ========================================================================== */
function initAudioSystem() {
  let audioCtx = null;
  let isMuted = true;
  const toggleBtn = document.getElementById("audio-toggle-btn");

  function getContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  const audioPlayer = {
    playHover: function () {
      if (isMuted) return;
      try {
        const ctx = getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } catch (e) {}
    },

    playClick: function () {
      if (isMuted) return;
      try {
        const ctx = getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } catch (e) {}
    }
  };

  window.audioPlayer = audioPlayer;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isMuted = !isMuted;
      toggleBtn.classList.toggle("active", !isMuted);
      const label = toggleBtn.querySelector(".audio-label");
      if (label) {
        label.textContent = isMuted ? "AUDIO: OFF" : "AUDIO: LIVE";
      }
      if (!isMuted) audioPlayer.playClick();
    });
  }

  // Attach hover sounds to interactive elements
  document.querySelectorAll(".btn, .nav-link, .tab-btn, .contact-link-pill").forEach(el => {
    el.addEventListener("mouseenter", () => audioPlayer.playHover());
    el.addEventListener("click", () => audioPlayer.playClick());
  });
}

/* ==========================================================================
   MODAL CONTROLLER
   ========================================================================== */
function initModal() {
  const overlay = document.getElementById("contact-modal");
  const openButtons = document.querySelectorAll(".btn-open-modal");
  const closeButton = document.getElementById("modal-close-btn");
  const form = document.getElementById("contact-form");

  if (!overlay) return;

  function openModal() {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    window.audioPlayer && window.audioPlayer.playClick();
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    window.audioPlayer && window.audioPlayer.playClick();
  }

  openButtons.forEach(btn => btn.addEventListener("click", openModal));
  if (closeButton) closeButton.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.innerHTML = "<span>TRANSMITTING...</span>";
        setTimeout(() => {
          submitBtn.innerHTML = "<span>MESSAGE DISPATCHED ✓</span>";
          submitBtn.style.background = "#10b981";
          submitBtn.style.borderColor = "#10b981";
          setTimeout(() => {
            closeModal();
            form.reset();
            submitBtn.innerHTML = "<span>SEND DISPATCH</span>";
            submitBtn.style.background = "";
            submitBtn.style.borderColor = "";
          }, 1400);
        }, 800);
      }
    });
  }
}

/* ==========================================================================
   TELEMETRY CLOCK
   ========================================================================== */
function initTelemetryClock() {
  const clockEl = document.getElementById("telemetry-clock");
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, "0");
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, "0");
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, "0");
    clockEl.textContent = `UTC ${utcHours}:${utcMinutes}:${utcSeconds} // ORBIT`;
  }

  update();
  setInterval(update, 1000);
}
