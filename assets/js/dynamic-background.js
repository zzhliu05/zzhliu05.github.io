(function () {
  var canvas = document.getElementById("dynamic-background-canvas");
  if (!canvas) return;

  var context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  var reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width = 0;
  var height = 0;
  var centerX = 0;
  var centerY = 0;
  var orbitScale = 0;
  var animationFrame = null;
  var lastTime = 0;
  var bodies = [];
  var tracers = [];

  var G = 0.75;
  var softening = 0.018;
  var tracerCount = 140;
  var trailLength = 26;
  var maxDt = 0.018;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    centerX = width * 0.72;
    centerY = height * 0.6;
    orbitScale = Math.min(width, height) * 0.14;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    initializeScene();
  }

  function initializeBodies() {
    var bodyScale = orbitScale;
    var velocityScale = orbitScale * 0.42;

    bodies = [
      {
        x: -0.97000436 * bodyScale,
        y: 0.24308753 * bodyScale,
        vx: 0.466203685 * velocityScale,
        vy: 0.43236573 * velocityScale,
        mass: 1,
        radius: 5.2,
        color: "rgba(126, 162, 255, 0.96)",
        glow: "rgba(126, 162, 255, 0.18)",
        trail: []
      },
      {
        x: 0.97000436 * bodyScale,
        y: -0.24308753 * bodyScale,
        vx: 0.466203685 * velocityScale,
        vy: 0.43236573 * velocityScale,
        mass: 1,
        radius: 5.2,
        color: "rgba(91, 214, 255, 0.95)",
        glow: "rgba(91, 214, 255, 0.16)",
        trail: []
      },
      {
        x: 0,
        y: 0,
        vx: -0.93240737 * velocityScale,
        vy: -0.86473146 * velocityScale,
        mass: 1,
        radius: 5.6,
        color: "rgba(193, 223, 255, 0.95)",
        glow: "rgba(193, 223, 255, 0.14)",
        trail: []
      }
    ];
  }

  function initializeTracers() {
    tracers = [];

    for (var i = 0; i < tracerCount; i += 1) {
      var angle = Math.random() * Math.PI * 2;
      var radius = orbitScale * (0.55 + Math.random() * 1.2);
      var jitter = orbitScale * 0.12;

      tracers.push({
        x: Math.cos(angle) * radius + (Math.random() - 0.5) * jitter,
        y: Math.sin(angle) * radius * 0.72 + (Math.random() - 0.5) * jitter,
        vx: (Math.random() - 0.5) * orbitScale * 0.08,
        vy: (Math.random() - 0.5) * orbitScale * 0.08,
        size: 0.8 + Math.random() * 1.4,
        alpha: 0.1 + Math.random() * 0.24,
        history: []
      });
    }
  }

  function initializeScene() {
    initializeBodies();
    initializeTracers();
  }

  function accelerationAt(x, y, list) {
    var ax = 0;
    var ay = 0;

    for (var i = 0; i < list.length; i += 1) {
      var dx = list[i].x - x;
      var dy = list[i].y - y;
      var distSq = dx * dx + dy * dy + orbitScale * orbitScale * softening;
      var invDist = 1 / Math.sqrt(distSq);
      var factor = G * list[i].mass * invDist * invDist * invDist;
      ax += dx * factor;
      ay += dy * factor;
    }

    return { x: ax, y: ay };
  }

  function pushPoint(history, point, maxLength) {
    history.push(point);
    if (history.length > maxLength) history.shift();
  }

  function stepBodies(dt) {
    var accelerations = [];

    for (var i = 0; i < bodies.length; i += 1) {
      var others = [];

      for (var j = 0; j < bodies.length; j += 1) {
        if (i !== j) others.push(bodies[j]);
      }

      accelerations[i] = accelerationAt(bodies[i].x, bodies[i].y, others);
    }

    for (var k = 0; k < bodies.length; k += 1) {
      var body = bodies[k];
      body.vx += accelerations[k].x * dt;
      body.vy += accelerations[k].y * dt;
      body.x += body.vx * dt;
      body.y += body.vy * dt;

      pushPoint(body.trail, { x: body.x, y: body.y }, trailLength);
    }
  }

  function stepTracers(dt) {
    for (var i = 0; i < tracers.length; i += 1) {
      var tracer = tracers[i];
      var acceleration = accelerationAt(tracer.x, tracer.y, bodies);

      tracer.vx += acceleration.x * dt * 0.52;
      tracer.vy += acceleration.y * dt * 0.52;
      tracer.vx *= 0.995;
      tracer.vy *= 0.995;
      tracer.x += tracer.vx * dt;
      tracer.y += tracer.vy * dt;

      pushPoint(tracer.history, { x: tracer.x, y: tracer.y }, trailLength);

      var radius = Math.sqrt(tracer.x * tracer.x + tracer.y * tracer.y);
      if (radius > orbitScale * 2.8) {
        var angle = Math.random() * Math.PI * 2;
        var spawnRadius = orbitScale * (0.7 + Math.random() * 1.1);
        tracer.x = Math.cos(angle) * spawnRadius;
        tracer.y = Math.sin(angle) * spawnRadius * 0.72;
        tracer.vx = (Math.random() - 0.5) * orbitScale * 0.04;
        tracer.vy = (Math.random() - 0.5) * orbitScale * 0.04;
        tracer.history = [];
      }
    }
  }

  function drawBackdrop() {
    context.clearRect(0, 0, width, height);

    var glow = context.createRadialGradient(centerX, centerY, orbitScale * 0.1, centerX, centerY, orbitScale * 2.6);
    glow.addColorStop(0, "rgba(67, 123, 255, 0.08)");
    glow.addColorStop(0.55, "rgba(28, 55, 126, 0.05)");
    glow.addColorStop(1, "rgba(4, 9, 20, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
  }

  function drawPath(points, strokeStyle, lineWidth) {
    if (points.length < 2) return;

    context.beginPath();
    context.moveTo(centerX + points[0].x, centerY + points[0].y);

    for (var i = 1; i < points.length; i += 1) {
      context.lineTo(centerX + points[i].x, centerY + points[i].y);
    }

    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.stroke();
  }

  function drawBodies() {
    for (var i = 0; i < bodies.length; i += 1) {
      var body = bodies[i];

      drawPath(body.trail, body.glow, 1.4);

      context.beginPath();
      context.arc(centerX + body.x, centerY + body.y, body.radius * 4.2, 0, Math.PI * 2);
      context.fillStyle = body.glow;
      context.fill();

      context.beginPath();
      context.arc(centerX + body.x, centerY + body.y, body.radius, 0, Math.PI * 2);
      context.fillStyle = body.color;
      context.fill();
    }
  }

  function drawTracers() {
    for (var i = 0; i < tracers.length; i += 1) {
      var tracer = tracers[i];

      if (tracer.history.length > 1) {
        drawPath(tracer.history, "rgba(94, 150, 255, " + tracer.alpha * 0.45 + ")", 0.7);
      }

      context.beginPath();
      context.arc(centerX + tracer.x, centerY + tracer.y, tracer.size, 0, Math.PI * 2);
      context.fillStyle = "rgba(186, 218, 255, " + tracer.alpha + ")";
      context.fill();
    }
  }

  function render() {
    drawBackdrop();
    drawTracers();
    drawBodies();
  }

  function tick(time) {
    if (!lastTime) lastTime = time;
    var dt = Math.min((time - lastTime) / 1000, maxDt);
    lastTime = time;

    if (!reducedMotionQuery.matches) {
      stepBodies(dt);
      stepTracers(dt);
    }

    render();
    animationFrame = window.requestAnimationFrame(tick);
  }

  function start() {
    resize();
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    lastTime = 0;
    animationFrame = window.requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", start);
  } else if (typeof reducedMotionQuery.addListener === "function") {
    reducedMotionQuery.addListener(start);
  }

  start();
})();
