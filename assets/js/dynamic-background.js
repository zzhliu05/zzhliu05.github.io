(function () {
  const canvas = document.getElementById("dynamic-background-canvas");
  const selectableNodes = document.querySelectorAll(
    "#main, .page, .page__inner-wrap, .page__content, .sidebar, .sidebar *, .author__content, .author__content *"
  );

  for (const node of selectableNodes) {
    node.style.userSelect = "text";
    node.style.webkitUserSelect = "text";
    node.style.pointerEvents = "auto";
  }

  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const particles = [];
  const orbitals = [];
  const config = {
    orbitalCount: 3,
    particleCount: 120,
    cloudLayers: [0.22, 0.34, 0.48],
    shellJitter: 0.085,
    angularSpeed: 0.00022,
    radialBreath: 0.045,
    entanglementDistance: 160,
    trailLength: 12,
  };

  let width = 0;
  let height = 0;
  let ratio = 1;
  let animationFrameId = 0;
  let lastTime = 0;
  let fieldTime = 0;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function wrapDelta(delta, size) {
    if (delta > size / 2) return delta - size;
    if (delta < -size / 2) return delta + size;
    return delta;
  }

  function createOrbital(index) {
    const angle = (Math.PI * 2 * index) / config.orbitalCount;
    return {
      centerX: width * (0.5 + Math.cos(angle) * 0.12),
      centerY: height * (0.5 + Math.sin(angle) * 0.1),
      baseRadius: Math.min(width, height) * randomBetween(0.17, 0.24),
      angularOffset: randomBetween(0, Math.PI * 2),
      phase: randomBetween(0, Math.PI * 2),
      hue: 210 + index * 18,
      lobeCount: 2 + (index % 2),
    };
  }

  function createParticle(index) {
    const orbitalIndex = index % config.orbitalCount;
    const shellIndex = index % config.cloudLayers.length;
    const shell = config.cloudLayers[shellIndex];
    const theta = randomBetween(0, Math.PI * 2);

    return {
      orbitalIndex,
      shellIndex,
      shell,
      theta,
      thetaSpeed: randomBetween(0.5, 1.2) * (index % 2 === 0 ? 1 : -1),
      phase: randomBetween(0, Math.PI * 2),
      phaseSpeed: randomBetween(0.6, 1.1),
      radiusJitter: randomBetween(-config.shellJitter, config.shellJitter),
      glow: randomBetween(0.75, 1.2),
      pairIndex: -1,
      history: [],
      x: width * 0.5,
      y: height * 0.5,
      hue: orbitals[orbitalIndex].hue + randomBetween(-6, 8),
      radius: randomBetween(1, 2.4),
    };
  }

  function assignEntanglementPairs() {
    for (let i = 0; i < particles.length; i += 1) {
      particles[i].pairIndex = (i + Math.floor(config.particleCount / config.orbitalCount)) % particles.length;
    }
  }

  function resetScene() {
    orbitals.length = 0;
    particles.length = 0;

    for (let i = 0; i < config.orbitalCount; i += 1) {
      orbitals.push(createOrbital(i));
    }

    for (let i = 0; i < config.particleCount; i += 1) {
      particles.push(createParticle(i));
    }

    assignEntanglementPairs();
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

  function orbitalPosition(particle, time) {
    const orbital = orbitals[particle.orbitalIndex];
    const normalizedTime = time * 0.001;
    const breathing = 1 + Math.sin(normalizedTime * config.angularSpeed * 900 + orbital.phase + particle.phase) * config.radialBreath;
    const nodeTerm = Math.cos((particle.theta + orbital.angularOffset) * orbital.lobeCount + particle.phase * 0.55);
    const probabilityRing = particle.shell + particle.radiusJitter + nodeTerm * 0.055;
    const radius = orbital.baseRadius * Math.max(0.08, probabilityRing) * breathing;
    const theta = particle.theta + normalizedTime * config.angularSpeed * 1400 * particle.thetaSpeed;

    return {
      x: orbital.centerX + Math.cos(theta) * radius,
      y: orbital.centerY + Math.sin(theta) * radius * (0.82 + 0.15 * Math.sin(theta * 1.7 + orbital.phase)),
      radius,
      nodeTerm,
    };
  }

  function updateParticles(delta) {
    const step = Math.min(delta / 16.666, 2);
    fieldTime += delta;

    for (const particle of particles) {
      particle.phase += 0.012 * particle.phaseSpeed * step;
      particle.theta += 0.0025 * particle.thetaSpeed * step;

      const position = orbitalPosition(particle, fieldTime);
      particle.x = position.x;
      particle.y = position.y;
      particle.nodeTerm = position.nodeTerm;

      particle.history.push({ x: particle.x, y: particle.y });
      if (particle.history.length > config.trailLength) {
        particle.history.shift();
      }
    }
  }

  function drawField() {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#03050a");
    gradient.addColorStop(0.45, "#081120");
    gradient.addColorStop(1, "#02040a");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    for (const orbital of orbitals) {
      const glow = context.createRadialGradient(
        orbital.centerX,
        orbital.centerY,
        0,
        orbital.centerX,
        orbital.centerY,
        orbital.baseRadius * 1.9
      );
      glow.addColorStop(0, "rgba(108, 148, 255, 0.12)");
      glow.addColorStop(0.45, "rgba(108, 148, 255, 0.05)");
      glow.addColorStop(1, "rgba(108, 148, 255, 0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(orbital.centerX, orbital.centerY, orbital.baseRadius * 1.9, 0, Math.PI * 2);
      context.fill();
    }
  }

  function drawProbabilityClouds() {
    for (const orbital of orbitals) {
      for (let i = 0; i < config.cloudLayers.length; i += 1) {
        const shell = config.cloudLayers[i];
        const radius = orbital.baseRadius * shell * (1.1 + i * 0.32);
        const gradient = context.createRadialGradient(
          orbital.centerX,
          orbital.centerY,
          radius * 0.12,
          orbital.centerX,
          orbital.centerY,
          radius * 1.08
        );

        gradient.addColorStop(0, "rgba(124, 170, 255, 0)");
        gradient.addColorStop(0.35, `rgba(124, 170, 255, ${0.03 + i * 0.012})`);
        gradient.addColorStop(0.68, `rgba(168, 138, 255, ${0.045 + i * 0.014})`);
        gradient.addColorStop(1, "rgba(124, 170, 255, 0)");

        context.fillStyle = gradient;
        context.beginPath();
        context.ellipse(
          orbital.centerX,
          orbital.centerY,
          radius,
          radius * (0.82 + i * 0.06),
          orbital.angularOffset * 0.5,
          0,
          Math.PI * 2
        );
        context.fill();
      }
    }
  }

  function drawTrails() {
    for (const particle of particles) {
      if (particle.history.length < 4) continue;

      context.beginPath();
      context.moveTo(particle.history[0].x, particle.history[0].y);

      for (let i = 1; i < particle.history.length - 1; i += 1) {
        const current = particle.history[i];
        const next = particle.history[i + 1];
        context.quadraticCurveTo(
          current.x,
          current.y,
          (current.x + next.x) * 0.5,
          (current.y + next.y) * 0.5
        );
      }

      const tail = particle.history[particle.history.length - 1];
      context.lineTo(tail.x, tail.y);
      context.strokeStyle = `hsla(${particle.hue}, 90%, 72%, 0.08)`;
      context.lineWidth = 0.9;
      context.stroke();
    }
  }

  function drawEntanglements() {
    const drawn = new Set();

    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      const partner = particles[particle.pairIndex];
      if (!partner) continue;

      const key = i < particle.pairIndex ? `${i}:${particle.pairIndex}` : `${particle.pairIndex}:${i}`;
      if (drawn.has(key)) continue;
      drawn.add(key);

      const dx = wrapDelta(partner.x - particle.x, width);
      const dy = wrapDelta(partner.y - particle.y, height);
      const distance = Math.hypot(dx, dy);
      if (distance > config.entanglementDistance) continue;

      const midX = particle.x + dx * 0.5;
      const midY = particle.y + dy * 0.5;
      const normalX = -dy / Math.max(distance, 1);
      const normalY = dx / Math.max(distance, 1);
      const interference = 10 * Math.sin((particle.phase + partner.phase) * 0.9);
      const alpha = 0.08 * (1 - distance / config.entanglementDistance);

      context.strokeStyle = `rgba(126, 168, 255, ${alpha})`;
      context.lineWidth = 0.9;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.quadraticCurveTo(
        midX + normalX * interference,
        midY + normalY * interference,
        partner.x,
        partner.y
      );
      context.stroke();
    }
  }

  function drawParticles() {
    for (const particle of particles) {
      const nodeFade = 0.45 + (particle.nodeTerm + 1) * 0.35;
      context.fillStyle = `hsla(${particle.hue}, 95%, ${72 + nodeFade * 12}%, ${0.68 + nodeFade * 0.18})`;
      context.shadowBlur = 14 * particle.glow;
      context.shadowColor = "rgba(118, 160, 255, 0.32)";
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius * (0.9 + nodeFade * 0.35), 0, Math.PI * 2);
      context.fill();
    }

    context.shadowBlur = 0;
  }

  function render(timestamp) {
    const delta = lastTime ? timestamp - lastTime : 16.666;
    lastTime = timestamp;

    drawField();

    if (!reducedMotionQuery.matches) {
      updateParticles(delta);
    }

    drawProbabilityClouds();
    drawTrails();
    drawEntanglements();
    drawParticles();
    animationFrameId = window.requestAnimationFrame(render);
  }

  function renderStatic() {
    for (let i = 0; i < 8; i += 1) {
      updateParticles(16.666);
    }
    drawField();
    drawProbabilityClouds();
    drawTrails();
    drawEntanglements();
    drawParticles();
  }

  function restart() {
    window.cancelAnimationFrame(animationFrameId);
    lastTime = 0;
    fieldTime = 0;
    resize();

    if (reducedMotionQuery.matches) {
      renderStatic();
      return;
    }

    render(0);
  }

  resize();
  if (reducedMotionQuery.matches) {
    renderStatic();
  } else {
    render(0);
  }

  window.addEventListener("resize", restart);
  reducedMotionQuery.addEventListener("change", restart);
})();
