/**
 * Anti-Gravity Particle & Orbital Field Engine
 * Simulates weightless floating particles, concentric orbital rings,
 * and zero-g interactive disturbance waves.
 */

(function () {
  const canvas = document.getElementById("antigravity-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  // Particle configuration
  const PARTICLE_COUNT = 90;
  const particles = [];
  const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 140, active: false };

  // Orbital rings configuration
  const rings = [
    { radiusX: 380, radiusY: 140, angle: -0.28, rotSpeed: 0.0008, alpha: 0.12, dash: [4, 8] },
    { radiusX: 520, radiusY: 200, angle: 0.35, rotSpeed: -0.0006, alpha: 0.08, dash: [6, 12] },
    { radiusX: 260, radiusY: 90, angle: 0.15, rotSpeed: 0.0012, alpha: 0.16, dash: [2, 6] }
  ];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10 + Math.random() * 20;
      this.baseRadius = Math.random() * 1.8 + 0.6;
      this.radius = this.baseRadius;
      // Negative Y velocity = upward anti-gravity drift
      this.vy = -(Math.random() * 0.45 + 0.2);
      this.vx = (Math.random() - 0.5) * 0.25;
      this.alpha = Math.random() * 0.55 + 0.2;
      this.baseAlpha = this.alpha;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseOffset = Math.random() * Math.PI * 2;
      // Color: starlight white, electric cyan, or subtle violet
      const palette = ["#ffffff", "#00f0ff", "#a3e5ff", "#9d4edd"];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }

    update(time) {
      this.pulseOffset += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseOffset) * 0.15;

      // Anti-gravity float with sine turbulence
      this.y += this.vy;
      this.x += this.vx + Math.sin(time * 0.001 + this.pulseOffset) * 0.18;

      // Mouse repulsion in anti-gravity field
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 3.5;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force;
          this.y += Math.sin(angle) * force;
        }
      }

      // Wrap around top or sides
      if (this.y < -20) this.reset(false);
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.shadowBlur = this.radius > 1.2 ? 8 : 4;
      ctx.shadowColor = this.color;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    if (particles.length === 0) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }
  }

  function drawOrbitalRings(time) {
    const centerX = width * 0.5;
    const centerY = height * 0.45;

    ctx.save();
    rings.forEach((ring, index) => {
      ring.angle += ring.rotSpeed;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ring.angle);

      ctx.beginPath();
      ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = index === 0 ? "rgba(0, 240, 255, " + ring.alpha + ")" : "rgba(255, 255, 255, " + ring.alpha + ")";
      ctx.lineWidth = 1;
      ctx.setLineDash(ring.dash);
      ctx.stroke();

      // Small orbital node dot
      const nodeX = Math.cos(ring.angle * 2) * ring.radiusX;
      const nodeY = Math.sin(ring.angle * 2) * ring.radiusY;
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#00f0ff";
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#00f0ff";
      ctx.fill();

      ctx.restore();
    });
    ctx.restore();
  }

  function drawConstellationLines() {
    const maxDist = 95;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.save();
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  let animationId;
  function animate(time) {
    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    ctx.clearRect(0, 0, width, height);

    drawOrbitalRings(time);
    drawConstellationLines();

    particles.forEach((p) => {
      p.update(time);
      p.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
    mouse.targetX = -1000;
    mouse.targetY = -1000;
  });

  // Touch support for mobile devices
  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    mouse.active = false;
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(animate);
    }
  });

  // Initialize
  resize();
  animationId = requestAnimationFrame(animate);
})();
