(function () {
  const canvas = document.getElementById("dynamic-background-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const particles = [];
  const config = {
    particleCount: 78,
    trailLength: 24,
    maxSpeed: 1.35,
    velocityBlend: 0.06,
    linkDistance: 145,
    couplingDistance: 185,
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

  function wrapPosition(particle) {
    if (particle.x < 0) particle.x += width;
    if (particle.x > width) particle.x -= width;
    if (particle.y < 0) particle.y += height;
    if (particle.y > height) particle.y -= height;
  }

  function createParticle(index) {
    const family = index % 3;
    return {
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      vx: randomBetween(-0.18, 0.18),
      vy: randomBetween(-0.18, 0.18),
      radius: randomBetween(1.1, 2.5),
      hue: 206 + family * 18 + randomBetween(-4, 4),
      phase: randomBetween(0, Math.PI * 2),
      phaseVelocity: randomBetween(0.008, 0.018),
      entanglement: family,
      pairIndex: -1,
      history: [],
    };
  }

  function sampleFlow(x, y, time) {
    const nx = x / width;
    const ny = y / height;

    const u =
      Math.sin((ny + time * 0.032) * Math.PI * 3.1) +
      0.8 * Math.cos((nx * 1.7 - time * 0.025) * Math.PI * 2.4) +
      0.55 * Math.sin((nx * 1.3 + ny * 1.8 + time * 0.018) * Math.PI * 2.2);

    const v =
      Math.cos((nx - time * 0.028) * Math.PI * 2.7) -
      0.75 * Math.sin((ny * 1.8 + time * 0.024) * Math.PI * 2.9) +
      0.5 * Math.cos((nx * 1.4 - ny * 1.6 - time * 0.015) * Math.PI * 2.0);

    const swirl =
      0.42 *
      Math.sin((nx + ny + time * 0.02) * Math.PI * 3.0);

    return {
      x: u - v * swirl,
      y: v + u * swirl,
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

  function applyEntanglement(particle, step) {
    if (particle.pairIndex < 0) {
      return { x: 0, y: 0 };
    }

    const partner = particles[particle.pairIndex];
    const dx = wrapDelta(partner.x - particle.x, width);
    const dy = wrapDelta(partner.y - particle.y, height);
    const distance = Math.max(Math.hypot(dx, dy), 1);
    const targetDistance = 58 + Math.sin(particle.phase + partner.phase) * 16;
    const spring = (distance - targetDistance) * 0.00048;
    const braid = 0.018 * Math.sin((particle.phase - partner.phase) * 1.6);

    return {
      x: dx * spring - (dy / distance) * braid * step,
      y: dy * spring + (dx / distance) * braid * step,
    };
  }

  function updateParticles(delta) {
    const step = Math.min(delta / 16.666, 2);
    fieldTime += delta;

    for (const particle of particles) {
      const flow = sampleFlow(particle.x, particle.y, fieldTime);
      const flowMagnitude = Math.max(Math.hypot(flow.x, flow.y), 0.001);
      const entanglement = applyEntanglement(particle, step);

      const targetVx = (flow.x / flowMagnitude) * config.maxSpeed + entanglement.x;
      const targetVy = (flow.y / flowMagnitude) * config.maxSpeed + entanglement.y;

      particle.phase += particle.phaseVelocity * step;
      particle.vx += (targetVx - particle.vx) * config.velocityBlend * step;
      particle.vy += (targetVy - particle.vy) * config.velocityBlend * step;

      const speed = Math.hypot(particle.vx, particle.vy);
      if (speed > config.maxSpeed) {
        particle.vx = (particle.vx / speed) * config.maxSpeed;
        particle.vy = (particle.vy / speed) * config.maxSpeed;
      }

      particle.x += particle.vx * step;
      particle.y += particle.vy * step;
      wrapPosition(particle);

      particle.history.push({ x: particle.x, y: particle.y });
      if (particle.history.length > config.trailLength) {
        particle.history.shift();
      }
    }
  }

  function drawField() {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#04060b");
    gradient.addColorStop(0.4, "#07101d");
    gradient.addColorStop(1, "#03050a");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    const veil = context.createRadialGradient(width * 0.5, height * 0.45, 0, width * 0.5, height * 0.45, Math.max(width, height) * 0.7);
    veil.addColorStop(0, "rgba(70, 105, 255, 0.08)");
    veil.addColorStop(1, "rgba(70, 105, 255, 0)");
    context.fillStyle = veil;
    context.fillRect(0, 0, width, height);
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
      context.strokeStyle = `hsla(${particle.hue}, 92%, 70%, 0.18)`;
      context.lineWidth = 1.15;
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
      const bend = 14 * Math.sin((particle.phase + partner.phase) * 0.85);
      const alpha = 0.18 * (1 - distance / config.linkDistance);

      context.strokeStyle = `rgba(112, 163, 255, ${alpha})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.quadraticCurveTo(midX + normalX * bend, midY + normalY * bend, partner.x, partner.y);
      context.stroke();

      context.strokeStyle = `rgba(182, 120, 255, ${alpha * 0.78})`;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.quadraticCurveTo(midX - normalX * bend, midY - normalY * bend, partner.x, partner.y);
      context.stroke();
    }
  }

  function drawParticles() {
    for (const particle of particles) {
      const glow = 0.72 + Math.sin(particle.phase) * 0.28;
      context.fillStyle = `hsla(${particle.hue}, 95%, ${72 + glow * 8}%, 0.98)`;
      context.shadowBlur = 12;
      context.shadowColor = "rgba(110, 152, 255, 0.42)";
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius + glow * 0.35, 0, Math.PI * 2);
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
      if (Math.floor(timestamp / 1000) !== Math.floor((timestamp - delta) / 1000)) {
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
    fieldTime = 0;
    resize();

    if (reducedMotionQuery.matches) {
      for (let i = 0; i < 10; i += 1) {
        updateParticles(16.666);
      }
      renderStatic();
      return;
    }

    render(0);
  }

  resize();
  if (reducedMotionQuery.matches) {
    for (let i = 0; i < 10; i += 1) {
      updateParticles(16.666);
    }
    renderStatic();
  } else {
    render(0);
  }

  window.addEventListener("resize", restart);
  reducedMotionQuery.addEventListener("change", restart);
})();
