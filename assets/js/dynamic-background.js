(function () {
  const canvas = document.getElementById("dynamic-background-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const particles = [];
  const attractors = [];
  const config = {
    particleCount: 72,
    attractorCount: 3,
    softening: 3000,
    drag: 0.988,
    maxSpeed: 1.5,
    trailLength: 18,
    linkDistance: 150,
    couplingDistance: 190,
  };

  let width = 0;
  let height = 0;
  let ratio = 1;
  let animationFrameId = 0;
  let lastTime = 0;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function wrapDelta(delta, size) {
    if (delta > size / 2) return delta - size;
    if (delta < -size / 2) return delta + size;
    return delta;
  }

  function createParticle(index) {
    const family = index % config.attractorCount;
    return {
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      vx: randomBetween(-0.12, 0.12),
      vy: randomBetween(-0.12, 0.12),
      radius: randomBetween(1.1, 2.4),
      hue: 205 + family * 16 + randomBetween(-4, 4),
      phase: randomBetween(0, Math.PI * 2),
      phaseVelocity: randomBetween(0.009, 0.02),
      entanglement: family,
      history: [],
      pairIndex: -1,
    };
  }

  function createAttractor(index) {
    const angle = (Math.PI * 2 * index) / config.attractorCount;
    return {
      orbitAngle: angle,
      orbitSpeed: randomBetween(0.00008, 0.00016) * (index % 2 === 0 ? 1 : -1),
      radialPhase: randomBetween(0, Math.PI * 2),
      radialSpeed: randomBetween(0.0002, 0.0004),
      centerX: width * 0.5,
      centerY: height * 0.5,
      baseRadiusX: width * randomBetween(0.14, 0.24),
      baseRadiusY: height * randomBetween(0.12, 0.2),
      strength: randomBetween(1600, 2400),
      x: width * 0.5,
      y: height * 0.5,
    };
  }

  function updatePairings() {
    for (const particle of particles) {
      particle.pairIndex = -1;
    }

    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      let bestIndex = -1;
      let bestDistance = Infinity;

      for (let j = 0; j < particles.length; j += 1) {
        if (i === j) continue;
        const other = particles[j];
        if (particle.entanglement === other.entanglement) continue;

        const dx = wrapDelta(other.x - particle.x, width);
        const dy = wrapDelta(other.y - particle.y, height);
        const distance = Math.hypot(dx, dy);
        if (distance < bestDistance && distance < config.couplingDistance) {
          bestDistance = distance;
          bestIndex = j;
        }
      }

      particle.pairIndex = bestIndex;
    }
  }

  function resetScene() {
    particles.length = 0;
    attractors.length = 0;

    for (let i = 0; i < config.attractorCount; i += 1) {
      attractors.push(createAttractor(i));
    }

    for (let i = 0; i < config.particleCount; i += 1) {
      particles.push(createParticle(i));
    }

    updatePairings();
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
    for (let i = 0; i < attractors.length; i += 1) {
      const attractor = attractors[i];
      attractor.orbitAngle += attractor.orbitSpeed * delta;
      attractor.radialPhase += attractor.radialSpeed * delta;

      const radialPulse = 0.82 + Math.sin(attractor.radialPhase) * 0.18;
      const orbitX = attractor.baseRadiusX * radialPulse;
      const orbitY = attractor.baseRadiusY * (1 + Math.cos(attractor.radialPhase * 0.7) * 0.15);

      attractor.x = attractor.centerX + Math.cos(attractor.orbitAngle) * orbitX;
      attractor.y = attractor.centerY + Math.sin(attractor.orbitAngle * 1.15) * orbitY;
    }
  }

  function applyEntanglementForces(particle, step) {
    if (particle.pairIndex < 0) return { ax: 0, ay: 0 };

    const partner = particles[particle.pairIndex];
    const dx = wrapDelta(partner.x - particle.x, width);
    const dy = wrapDelta(partner.y - particle.y, height);
    const distance = Math.max(Math.hypot(dx, dy), 1);
    const targetDistance = 62 + Math.sin(particle.phase + partner.phase) * 18;
    const spring = (distance - targetDistance) * 0.00042;
    const swirl = 0.00085 * Math.sin((particle.phase - partner.phase) * 1.7);

    return {
      ax: dx * spring - (dy / distance) * swirl * 90 * step,
      ay: dy * spring + (dx / distance) * swirl * 90 * step,
    };
  }

  function updateParticles(delta) {
    const step = Math.min(delta / 16.666, 2);

    for (const particle of particles) {
      let ax = 0;
      let ay = 0;

      for (const attractor of attractors) {
        const dx = wrapDelta(attractor.x - particle.x, width);
        const dy = wrapDelta(attractor.y - particle.y, height);
        const distanceSq = dx * dx + dy * dy + config.softening;
        const force = attractor.strength / distanceSq;
        ax += dx * force;
        ay += dy * force;
      }

      const pairForce = applyEntanglementForces(particle, step);
      ax += pairForce.ax;
      ay += pairForce.ay;

      const streamAngle = Math.atan2(particle.y - height * 0.5, particle.x - width * 0.5);
      ax += Math.cos(streamAngle + Math.PI / 2) * 0.008;
      ay += Math.sin(streamAngle + Math.PI / 2) * 0.008;

      particle.phase += particle.phaseVelocity * step;
      particle.vx = (particle.vx + ax * step) * config.drag;
      particle.vy = (particle.vy + ay * step) * config.drag;

      const speed = Math.hypot(particle.vx, particle.vy);
      if (speed > config.maxSpeed) {
        particle.vx = (particle.vx / speed) * config.maxSpeed;
        particle.vy = (particle.vy / speed) * config.maxSpeed;
      }

      particle.x += particle.vx * step;
      particle.y += particle.vy * step;

      if (particle.x < 0) particle.x += width;
      if (particle.x > width) particle.x -= width;
      if (particle.y < 0) particle.y += height;
      if (particle.y > height) particle.y -= height;

      particle.history.push({ x: particle.x, y: particle.y });
      if (particle.history.length > config.trailLength) {
        particle.history.shift();
      }
    }
  }

  function drawField() {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#04060b");
    gradient.addColorStop(0.45, "#07101d");
    gradient.addColorStop(1, "#03050a");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < attractors.length; i += 1) {
      const attractor = attractors[i];
      const glow = context.createRadialGradient(attractor.x, attractor.y, 0, attractor.x, attractor.y, 180);
      glow.addColorStop(0, `rgba(${80 + i * 15}, ${120 + i * 8}, 255, 0.13)`);
      glow.addColorStop(1, "rgba(80, 130, 255, 0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(attractor.x, attractor.y, 180, 0, Math.PI * 2);
      context.fill();
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
        const cx = (current.x + next.x) * 0.5;
        const cy = (current.y + next.y) * 0.5;
        context.quadraticCurveTo(current.x, current.y, cx, cy);
      }

      const tail = particle.history[particle.history.length - 1];
      context.lineTo(tail.x, tail.y);
      context.strokeStyle = `hsla(${particle.hue}, 88%, 68%, 0.17)`;
      context.lineWidth = 1.1;
      context.stroke();
    }
  }

  function drawEntanglements() {
    const drawn = new Set();

    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      const partnerIndex = particle.pairIndex;
      if (partnerIndex < 0) continue;

      const key = i < partnerIndex ? `${i}:${partnerIndex}` : `${partnerIndex}:${i}`;
      if (drawn.has(key)) continue;
      drawn.add(key);

      const partner = particles[partnerIndex];
      const dx = wrapDelta(partner.x - particle.x, width);
      const dy = wrapDelta(partner.y - particle.y, height);
      const distance = Math.hypot(dx, dy);
      if (distance > config.linkDistance) continue;

      const midX = particle.x + dx * 0.5;
      const midY = particle.y + dy * 0.5;
      const normalX = -dy / Math.max(distance, 1);
      const normalY = dx / Math.max(distance, 1);
      const braid = 16 * Math.sin((particle.phase + partner.phase) * 0.9);
      const control1X = midX + normalX * braid;
      const control1Y = midY + normalY * braid;
      const control2X = midX - normalX * braid;
      const control2Y = midY - normalY * braid;
      const alpha = 0.2 * (1 - distance / config.linkDistance);

      context.strokeStyle = `rgba(120, 170, 255, ${alpha})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.quadraticCurveTo(control1X, control1Y, partner.x, partner.y);
      context.stroke();

      context.strokeStyle = `rgba(179, 122, 255, ${alpha * 0.8})`;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.quadraticCurveTo(control2X, control2Y, partner.x, partner.y);
      context.stroke();
    }
  }

  function drawParticles() {
    for (const particle of particles) {
      const glow = 0.7 + Math.sin(particle.phase) * 0.3;
      context.fillStyle = `hsla(${particle.hue}, 95%, ${72 + glow * 8}%, 0.98)`;
      context.shadowBlur = 14;
      context.shadowColor = "rgba(110, 152, 255, 0.45)";
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius + glow * 0.4, 0, Math.PI * 2);
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
      if (Math.floor(timestamp / 900) !== Math.floor((timestamp - delta) / 900)) {
        updatePairings();
      }
    }

    drawTrails();
    drawEntanglements();
    drawParticles();
    animationFrameId = window.requestAnimationFrame(render);
  }

  function renderStatic() {
    drawField();
    drawTrails();
    drawEntanglements();
    drawParticles();
  }

  function restart() {
    window.cancelAnimationFrame(animationFrameId);
    lastTime = 0;
    resize();

    if (reducedMotionQuery.matches) {
      for (let i = 0; i < 8; i += 1) {
        updateAttractors(16.666);
        updateParticles(16.666);
      }
      renderStatic();
      return;
    }

    render(0);
  }

  resize();
  if (reducedMotionQuery.matches) {
    for (let i = 0; i < 8; i += 1) {
      updateAttractors(16.666);
      updateParticles(16.666);
    }
    renderStatic();
  } else {
    render(0);
  }

  window.addEventListener("resize", restart);
  reducedMotionQuery.addEventListener("change", restart);
})();
