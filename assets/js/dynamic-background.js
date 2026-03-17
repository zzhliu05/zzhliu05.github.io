(function () {
  var canvas = document.getElementById("dynamic-background-canvas");
  if (!canvas) return;

  var context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
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
  var tracerCount = 180;
  var trailLength = 28;
  var maxDt = 0.018;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    centerX = width * 0.5;
    centerY = height * 0.48;
    orbitScale = Math.min(width, height) * 0.18;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    initializeScene();
  }

  function initializeBodies() {
    // Figure-eight three-body initial conditions, scaled for visual stability.
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
        color: "rgba(123, 160, 255, 0.95)",
        glow: "rgba(123, 160, 255, 0.20)",
        trail: []
      },
      {
        x: 0.97000436 * bodyScale,
        y: -0.24308753 * bodyScale,
        vx: 0.466203685 * velocityScale,
        vy: 0.43236573 * velocityScale,
        mass: 1,
        radius: 5.2,
        color: "rgba(255, 196, 113, 0.95)",
        glow: "rgba(255, 196, 113, 0.18)",
        trail: []
      },
      {
        x: 0,
        y: 0,
        vx: -0.93240737 * velocityScale,
        vy: -0.86473146 * velocityScale,
        mass: 1,
        radius: 5.6,
        color: "rgba(145, 245, 225, 0.95)",
        glow: "rgba(145, 245, 225, 0.18)",
        trail: []
      }
    ];
  }

  function initializeTracers() {
    tracers = [];

    for (var i = 0; i < tracerCount; i += 1) {
      var angle = Math.random() * Math.PI * 2;
      var radius = orbitScale * (0.55 + Math.random() * 1.25);
      var jitter = orbitScale * 0.12;
      var x = Math.cos(angle) * radius + (Math.random() - 0.5) * jitter;
      var y = Math.sin(angle) * radius * 0.72 + (Math.random() - 0.5) * jitter;

      tracers.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * orbitScale * 0.08,
        vy: (Math.random() - 0.5) * orbitScale * 0.08,
        size: 0.8 + Math.random() * 1.6,
        alpha: 0.12 + Math.random() * 0.28,
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

    return { ax: ax, ay: ay };
  }

  function pushTrail(trail, x, y, limit) {
    trail.push({ x: x, y: y });
    if (trail.length > limit) trail.shift();
  }

  function stepBodies(dt) {
    var accelerations = [];
    var i = 0;

    for (i = 0; i < bodies.length; i += 1) {
      var others = [];

      for (var j = 0; j < bodies.length; j += 1) {
        if (i !== j) others.push(bodies[j]);
      }

      accelerations[i] = accelerationAt(bodies[i].x, bodies[i].y, others);
    }

    for (i = 0; i < bodies.length; i += 1) {
      bodies[i].vx += accelerations[i].ax * dt;
      bodies[i].vy += accelerations[i].ay * dt;
    }

    for (i = 0; i < bodies.length; i += 1) {
      bodies[i].x += bodies[i].vx * dt;
      bodies[i].y += bodies[i].vy * dt;
      pushTrail(bodies[i].trail, bodies[i].x, bodies[i].y, 140);
    }
  }

  function stepTracers(dt) {
    for (var i = 0; i < tracers.length; i += 1) {
      var tracer = tracers[i];
      var acceleration = accelerationAt(tracer.x, tracer.y, bodies);

      tracer.vx += acceleration.ax * dt;
      tracer.vy += acceleration.ay * dt;
      tracer.vx *= 0.998;
      tracer.vy *= 0.998;
      tracer.x += tracer.vx * dt;
      tracer.y += tracer.vy * dt;

      if (Math.abs(tracer.x) > width || Math.abs(tracer.y) > height) {
        var resetAngle = Math.random() * Math.PI * 2;
        var resetRadius = orbitScale * (0.7 + Math.random());
        tracer.x = Math.cos(resetAngle) * resetRadius;
        tracer.y = Math.sin(resetAngle) * resetRadius * 0.75;
        tracer.vx = (Math.random() - 0.5) * orbitScale * 0.06;
        tracer.vy = (Math.random() - 0.5) * orbitScale * 0.06;
        tracer.history = [];
      }

      pushTrail(tracer.history, tracer.x, tracer.y, trailLength);
    }
  }

  function drawTrails() {
    for (var i = 0; i < tracers.length; i += 1) {
      var tracer = tracers[i];
      if (tracer.history.length < 2) continue;

      context.beginPath();

      for (var j = 0; j < tracer.history.length; j += 1) {
        var point = tracer.history[j];
        var px = centerX + point.x;
        var py = centerY + point.y;

        if (j === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }

      context.strokeStyle = "rgba(132, 168, 255," + tracer.alpha + ")";
      context.lineWidth = tracer.size * 0.55;
      context.stroke();
    }

    for (var k = 0; k < bodies.length; k += 1) {
      if (bodies[k].trail.length < 2) continue;

      context.beginPath();
      for (var m = 0; m < bodies[k].trail.length; m += 1) {
        var trailPoint = bodies[k].trail[m];
        var tx = centerX + trailPoint.x;
        var ty = centerY + trailPoint.y;

        if (m === 0) context.moveTo(tx, ty);
        else context.lineTo(tx, ty);
      }

      context.strokeStyle = bodies[k].glow;
      context.lineWidth = 2.2;
      context.stroke();
    }
  }

  function drawBodies() {
    for (var i = 0; i < bodies.length; i += 1) {
      var x = centerX + bodies[i].x;
      var y = centerY + bodies[i].y;

      context.beginPath();
      context.fillStyle = bodies[i].glow;
      context.arc(x, y, bodies[i].radius * 4.5, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = bodies[i].color;
      context.arc(x, y, bodies[i].radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  function drawFieldLinks() {
    context.beginPath();

    for (var i = 0; i < bodies.length; i += 1) {
      for (var j = i + 1; j < bodies.length; j += 1) {
        context.moveTo(centerX + bodies[i].x, centerY + bodies[i].y);
        context.lineTo(centerX + bodies[j].x, centerY + bodies[j].y);
      }
    }

    context.strokeStyle = "rgba(154, 179, 255, 0.12)";
    context.lineWidth = 1;
    context.stroke();
  }

  function render() {
    context.clearRect(0, 0, width, height);

    var glow = context.createRadialGradient(centerX, centerY, orbitScale * 0.2, centerX, centerY, orbitScale * 2.2);
    glow.addColorStop(0, "rgba(88, 126, 255, 0.08)");
    glow.addColorStop(0.45, "rgba(88, 126, 255, 0.03)");
    glow.addColorStop(1, "rgba(88, 126, 255, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    drawTrails();
    drawFieldLinks();
    drawBodies();
  }

  function tick(timestamp) {
    if (!lastTime) lastTime = timestamp;

    var dt = Math.min((timestamp - lastTime) / 1000, maxDt);
    lastTime = timestamp;

    if (!mediaQuery.matches) {
      for (var i = 0; i < 2; i += 1) {
        stepBodies(dt * 0.5);
        stepTracers(dt * 0.5);
      }
    }

    render();
    animationFrame = window.requestAnimationFrame(tick);
  }

  function start() {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    lastTime = 0;
    resize();
    animationFrame = window.requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", start);
  }

  start();
})();
