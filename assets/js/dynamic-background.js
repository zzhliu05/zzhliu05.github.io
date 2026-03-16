(function () {
  const canvas = document.getElementById("dynamic-background-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const particles = [];
  const attractors = [];
  const config = {
    particleCount: 56,
    attractorCount: 2,
    linkDistance: 120,
    softening: 2400,
    drag: 0.992,
    maxSpeed: 1.2,
  };

  let width = 0;
  let height = 0;
  let ratio = 1;
  let animationFrameId = 0;
  let lastTime = 0;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function createParticle() {
    return {
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      vx: randomBetween(-0.18, 0.18),
      vy: randomBetween(-0.18, 0.18),
      mass: randomBetween(0.8, 1.8),
      radius: randomBetween(1.2, 2.8),
      hue: randomBetween(205, 220),
    };
  }

  function createAttractor(index) {
    return {
      angle: randomBetween(0, Math.PI * 2),
      speed: randomBetween(0.00012, 0.00022) * (index % 2 === 0 ? 1 : -1),
      orbitX: randomBetween(width * 0.18, width * 0.32),
      orbitY: randomBetween(height * 0.12, height * 0.24),
      centerX: width * (index === 0 ? 0.36 : 0.68),
      centerY: height * (index === 0 ? 0.34 : 0.62),
      strength: randomBetween(1800, 2600),
      x: width / 2,
      y: height / 2,
    };
  }

  function resetScene() {
    particles.length = 0;
    attractors.length = 0;

    for (let i = 0; i < config.particleCount; i += 1) {
      particles.push(createParticle());
    }

    for (let i = 0; i < config.attractorCount; i += 1) {
      attractors.push(createAttractor(i));
    }
  }

  function resize() {
    ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    resetScene();
  }

  function updateAttractors(delta) {
    for (const attractor of attractors) {
      attractor.angle += attractor.speed * delta;
      attractor.x = attractor.centerX + Math.cos(attractor.angle) * attractor.orbitX;
      attractor.y = attractor.centerY + Math.sin(attractor.angle * 1.3) * attractor.orbitY;
    }
  }

  function updateParticles(delta) {
    const step = Math.min(delta / 16.666, 2);

    for (const particle of particles) {
      let ax = 0;
      let ay = 0;

      for (const attractor of attractors) {
        const dx = attractor.x - particle.x;
        const dy = attractor.y - particle.y;
        const distanceSq = dx * dx + dy * dy + config.softening;
        const force = attractor.strength / distanceSq;
        ax += dx * force;
        ay += dy * force;
      }

      particle.vx = (particle.vx + ax * step) * config.drag;
      particle.vy = (particle.vy + ay * step) * config.drag;

      const speed = Math.hypot(particle.vx, particle.vy);
      if (speed > config.maxSpeed) {
        particle.vx = (particle.vx / speed) * config.maxSpeed;
        particle.vy = (particle.vy / speed) * config.maxSpeed;
      }

      particle.x += particle.vx * step;
      particle.y += particle.vy * step;

      if (particle.x < -40) particle.x = width + 40;
      if (particle.x > width + 40) particle.x = -40;
      if (particle.y < -40) particle.y = height + 40;
      if (particle.y > height + 40) particle.y = -40;
    }
  }

  function drawField() {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#eaf3ff");
    gradient.addColorStop(0.45, "#f7fbff");
    gradient.addColorStop(1, "#eef3f8");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    for (const attractor of attractors) {
      const glow = context.createRadialGradient(attractor.x, attractor.y, 0, attractor.x, attractor.y, 150);
      glow.addColorStop(0, "rgba(107, 166, 255, 0.12)");
      glow.addColorStop(1, "rgba(107, 166, 255, 0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(attractor.x, attractor.y, 150, 0, Math.PI * 2);
      context.fill();
    }
  }

  function drawLinks() {
    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        if (distance > config.linkDistance) continue;

        const alpha = 0.16 * (1 - distance / config.linkDistance);
        context.strokeStyle = `rgba(96, 145, 214, ${alpha})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }
  }

  function drawParticles() {
    for (const particle of particles) {
      const speed = Math.hypot(particle.vx, particle.vy);
      const tailX = particle.x - particle.vx * 12;
      const tailY = particle.y - particle.vy * 12;

      context.strokeStyle = `hsla(${particle.hue}, 72%, 66%, 0.22)`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(tailX, tailY);
      context.lineTo(particle.x, particle.y);
      context.stroke();

      context.fillStyle = `hsla(${particle.hue}, 76%, ${68 + speed * 8}%, 0.95)`;
      context.shadowBlur = 10;
      context.shadowColor = "rgba(111, 169, 255, 0.32)";
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    }

    context.shadowBlur = 0;
  }

  function render(timestamp) {
    const delta = lastTime ? timestamp - lastTime : 16.666;
    lastTime = timestamp;

    drawField();
    updateAttractors(delta);

    if (!reducedMotionQuery.matches) {
      updateParticles(delta);
    }

    drawLinks();
    drawParticles();
    animationFrameId = window.requestAnimationFrame(render);
  }

  function restart() {
    window.cancelAnimationFrame(animationFrameId);
    lastTime = 0;
    resize();
    render(0);
  }

  resize();
  render(0);

  window.addEventListener("resize", restart);
  reducedMotionQuery.addEventListener("change", restart);
})();
