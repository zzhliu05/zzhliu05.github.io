(function () {
  const canvas = document.getElementById("dynamic-background-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const particles = [];
  const particleCount = 36;
  let width = 0;
  let height = 0;
  let animationFrameId = 0;
  let lastTimestamp = 0;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function createParticle() {
    const size = randomBetween(1.2, 3.8);
    return {
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      radius: size,
      vx: randomBetween(-0.08, 0.08),
      vy: randomBetween(-0.04, 0.04),
      alpha: randomBetween(0.2, 0.65),
      pulse: randomBetween(0.2, 1.2),
      pulseSpeed: randomBetween(0.0008, 0.0016),
    };
  }

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push(createParticle());
    }
  }

  function drawBackground() {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#e9f3ff");
    gradient.addColorStop(0.45, "#f9fbff");
    gradient.addColorStop(1, "#edf2f7");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 150) continue;

        context.strokeStyle = `rgba(111, 155, 207, ${0.14 * (1 - distance / 150)})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }
  }

  function drawParticles(timestamp) {
    for (const particle of particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.pulse += particle.pulseSpeed * timestamp;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      const glow = 0.5 + Math.sin(particle.pulse) * 0.5;
      context.fillStyle = `rgba(74, 129, 201, ${particle.alpha})`;
      context.shadowBlur = 18 + glow * 10;
      context.shadowColor = "rgba(110, 163, 231, 0.35)";
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius + glow * 1.4, 0, Math.PI * 2);
      context.fill();
    }
    context.shadowBlur = 0;
  }

  function render(timestamp) {
    if (prefersReducedMotion.matches) {
      drawBackground();
      drawConnections();
      drawParticles(0);
      return;
    }

    const elapsed = timestamp - lastTimestamp;
    if (elapsed < 16) {
      animationFrameId = window.requestAnimationFrame(render);
      return;
    }
    lastTimestamp = timestamp;

    context.clearRect(0, 0, width, height);
    drawBackground();
    drawConnections();
    drawParticles(timestamp);
    animationFrameId = window.requestAnimationFrame(render);
  }

  resize();
  render(0);

  window.addEventListener("resize", resize);
  prefersReducedMotion.addEventListener("change", function () {
    window.cancelAnimationFrame(animationFrameId);
    lastTimestamp = 0;
    render(0);
  });
})();
