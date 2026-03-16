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
  const paths = [];
  const config = {
    pathCount: 4,
    particleCount: 130,
    classicalWeight: 0.82,
    linkDistance: 150,
    trailLength: 18,
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

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function cubicBezier(p0, p1, p2, p3, t) {
    const mt = 1 - t;
    return (
      mt * mt * mt * p0 +
      3 * mt * mt * t * p1 +
      3 * mt * t * t * p2 +
      t * t * t * p3
    );
  }

  function cubicBezierDerivative(p0, p1, p2, p3, t) {
    const mt = 1 - t;
    return (
      3 * mt * mt * (p1 - p0) +
      6 * mt * t * (p2 - p1) +
      3 * t * t * (p3 - p2)
    );
  }

  function createPath(index) {
    const baseY = height * (0.25 + index * 0.17);
    const startX = -width * 0.08;
    const endX = width * 1.08;
    const bend = (index % 2 === 0 ? 1 : -1) * height * randomBetween(0.08, 0.15);

    return {
      start: { x: startX, y: baseY + randomBetween(-40, 40) },
      control1: { x: width * randomBetween(0.22, 0.32), y: baseY + bend },
      control2: { x: width * randomBetween(0.6, 0.78), y: baseY - bend * randomBetween(0.7, 1.1) },
      end: { x: endX, y: baseY + randomBetween(-50, 50) },
      hue: 208 + index * 12,
      weight: index === 1 || index === 2 ? 1 : 0.72,
      phase: randomBetween(0, Math.PI * 2),
    };
  }

  function pathPoint(path, t) {
    return {
      x: cubicBezier(path.start.x, path.control1.x, path.control2.x, path.end.x, t),
      y: cubicBezier(path.start.y, path.control1.y, path.control2.y, path.end.y, t),
    };
  }

  function pathTangent(path, t) {
    return {
      x: cubicBezierDerivative(path.start.x, path.control1.x, path.control2.x, path.end.x, t),
      y: cubicBezierDerivative(path.start.y, path.control1.y, path.control2.y, path.end.y, t),
    };
  }

  function createParticle(index) {
    const primaryPath = index % paths.length;
    const alternatePath = (primaryPath + 1 + (index % 2)) % paths.length;
    const progress = randomBetween(0, 1);

    return {
      primaryPath,
      alternatePath,
      progress,
      speed: randomBetween(0.00005, 0.00014),
      phase: randomBetween(0, Math.PI * 2),
      phaseSpeed: randomBetween(0.7, 1.25),
      branchBias: Math.random() < config.classicalWeight ? 0 : 1,
      branchMix: randomBetween(0.02, 0.14),
      deviation: randomBetween(8, 36),
      hue: paths[primaryPath].hue + randomBetween(-6, 8),
      radius: randomBetween(0.9, 2.2),
      pairIndex: -1,
      history: [],
      x: width * 0.5,
      y: height * 0.5,
    };
  }

  function assignPairs() {
    for (let i = 0; i < particles.length; i += 1) {
      particles[i].pairIndex = (i + Math.floor(particles.length / 3)) % particles.length;
    }
  }

  function resetScene() {
    paths.length = 0;
    particles.length = 0;

    for (let i = 0; i < config.pathCount; i += 1) {
      paths.push(createPath(i));
    }

    for (let i = 0; i < config.particleCount; i += 1) {
      particles.push(createParticle(i));
    }

    assignPairs();
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

  function sampleAmplitude(particle, time) {
    const primary = paths[particle.primaryPath];
    const alternate = paths[particle.alternatePath];
    const p = pathPoint(primary, particle.progress);
    const a = pathPoint(alternate, particle.progress);
    const tangent = pathTangent(primary, particle.progress);
    const tangentLength = Math.max(Math.hypot(tangent.x, tangent.y), 0.001);
    const normalX = -tangent.y / tangentLength;
    const normalY = tangent.x / tangentLength;

    const branchOscillation = 0.5 + 0.5 * Math.sin(time * 0.0012 + particle.phase);
    const rarePathWeight =
      particle.branchBias === 0
        ? particle.branchMix * branchOscillation
        : 0.22 + particle.branchMix * branchOscillation;
    const primaryWeight = clamp(1 - rarePathWeight, 0.65, 0.98);

    const x = p.x * primaryWeight + a.x * (1 - primaryWeight);
    const y = p.y * primaryWeight + a.y * (1 - primaryWeight);
    const interference = Math.sin(time * 0.002 + particle.phase * 1.3);
    const deviation = particle.deviation * (0.3 + (1 - primaryWeight)) * interference;

    return {
      x: x + normalX * deviation,
      y: y + normalY * deviation,
      primaryWeight,
      deviation,
    };
  }

  function updateParticles(delta) {
    const step = Math.min(delta / 16.666, 2);
    fieldTime += delta;

    for (const particle of particles) {
      particle.progress += particle.speed * step;
      particle.phase += 0.012 * particle.phaseSpeed * step;

      if (particle.progress > 1.02) {
        particle.progress -= 1.02;
        if (Math.random() > config.classicalWeight) {
          const swap = particle.primaryPath;
          particle.primaryPath = particle.alternatePath;
          particle.alternatePath = swap;
          particle.branchBias = 1;
        } else {
          particle.branchBias = 0;
        }
      }

      const amplitude = sampleAmplitude(particle, fieldTime);
      particle.x = amplitude.x;
      particle.y = amplitude.y;
      particle.primaryWeight = amplitude.primaryWeight;
      particle.interference = amplitude.deviation;

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
  }

  function drawClassicalPaths() {
    for (const path of paths) {
      for (let layer = 0; layer < 3; layer += 1) {
        context.beginPath();
        const start = pathPoint(path, 0);
        context.moveTo(start.x, start.y);

        for (let i = 1; i <= 36; i += 1) {
          const point = pathPoint(path, i / 36);
          context.lineTo(point.x, point.y);
        }

        const alpha = (0.04 + layer * 0.025) * path.weight;
        context.strokeStyle = `hsla(${path.hue}, 95%, ${72 + layer * 4}%, ${alpha})`;
        context.lineWidth = 28 - layer * 10;
        context.stroke();
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
      const alpha = 0.05 + (1 - particle.primaryWeight) * 0.1;
      context.strokeStyle = `hsla(${particle.hue}, 90%, 72%, ${alpha})`;
      context.lineWidth = 0.9 + (1 - particle.primaryWeight) * 0.8;
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

      const dx = partner.x - particle.x;
      const dy = partner.y - particle.y;
      const distance = Math.hypot(dx, dy);
      if (distance > config.linkDistance) continue;

      const alpha = 0.04 * (1 - distance / config.linkDistance);
      context.strokeStyle = `rgba(152, 182, 255, ${alpha})`;
      context.lineWidth = 0.8;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.lineTo(partner.x, partner.y);
      context.stroke();
    }
  }

  function drawParticles() {
    for (const particle of particles) {
      const classicalGlow = particle.primaryWeight;
      context.fillStyle = `hsla(${particle.hue}, 96%, ${72 + classicalGlow * 10}%, ${0.5 + classicalGlow * 0.45})`;
      context.shadowBlur = 10 + classicalGlow * 10;
      context.shadowColor = "rgba(120, 162, 255, 0.38)";
      context.beginPath();
      context.arc(
        particle.x,
        particle.y,
        particle.radius * (0.85 + (1 - particle.primaryWeight) * 0.9),
        0,
        Math.PI * 2
      );
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

    drawClassicalPaths();
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
    drawClassicalPaths();
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
