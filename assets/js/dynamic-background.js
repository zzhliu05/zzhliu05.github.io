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

  var G = 10000;
  var softening = 0.03;
  var tracerCount = 120;
  var trailLength = 24;
  var maxDt = 0.014;
  var timeScale = 4;
  var integrationSubsteps = 2;
  var confinementRadius = 0;
  var confinementStrength = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    centerX = width * 0.72;
    centerY = height * 0.6;
    orbitScale = Math.min(width, height) * 0.14;
    confinementRadius = orbitScale * 1.42;
    confinementStrength = 1.85 / Math.max(orbitScale, 1);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    initializeScene();
  }

  function initializeBodies() {
    var bodyScale = orbitScale;
    var velocityScale = orbitScale * 0.22;
    var spinStrength = orbitScale * 0.06;

    bodies = [
      {
        x: -0.97000436 * bodyScale,
        y: 0.24308753 * bodyScale,
        vx: 0.466203685 * velocityScale,
        vy: 0.43236573 * velocityScale,
        mass: 1.05,
        radius: 3.1,
        color: "rgba(198, 224, 255, 0.98)",
        trail: []
      },
      {
        x: 0.97000436 * bodyScale,
        y: -0.24308753 * bodyScale,
        vx: 0.466203685 * velocityScale,
        vy: 0.43236573 * velocityScale,
        mass: 1,
        radius: 3,
        color: "rgba(143, 208, 255, 0.98)",
        trail: []
      },
      {
        x: 0,
        y: 0,
        vx: -0.93240737 * velocityScale,
        vy: -0.86473146 * velocityScale,
        mass: 0.95,
        radius: 2.9,
        color: "rgba(110, 181, 255, 0.98)",
        trail: []
      }
    ];

    for (var i = 0; i < bodies.length; i += 1) {
      var body = bodies[i];
      body.vx += -body.y * spinStrength / Math.max(bodyScale, 1);
      body.vy += body.x * spinStrength / Math.max(bodyScale, 1);
    }
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
        vx: (Math.random() - 0.5) * orbitScale * 0.05,
        vy: (Math.random() - 0.5) * orbitScale * 0.05,
        size: 0.55 + Math.random() * 0.9,
        alpha: 0.08 + Math.random() * 0.18,
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
      var factor = G * list[i].mass * invDist * invDist;
      ax += dx * factor;
      ay += dy * factor;
    }

    return { x: ax, y: ay };
  }

  function confinementAcceleration(x, y) {
    var radius = Math.sqrt(x * x + y * y);
    if (radius <= confinementRadius) {
      return { x: 0, y: 0 };
    }

    var excess = (radius - confinementRadius) / confinementRadius;
    var smooth = excess * excess * (3 - 2 * Math.min(excess, 1));
    var strength = confinementStrength * smooth * Math.min(radius / confinementRadius, 1.8);
    return {
      x: -(x / radius) * strength * orbitScale,
      y: -(y / radius) * strength * orbitScale
    };
  }

  function addAcceleration(a, b) {
    return {
      x: a.x + b.x,
      y: a.y + b.y
    };
  }

  function pushPoint(history, point, maxLength) {
    history.push(point);
    if (history.length > maxLength) history.shift();
  }

  function stepBodies(dt) {
    var currentAccelerations = [];
    var nextAccelerations = [];
    var i = 0;
    var j = 0;

    for (i = 0; i < bodies.length; i += 1) {
      var others = [];

      for (j = 0; j < bodies.length; j += 1) {
        if (i !== j) others.push(bodies[j]);
      }

      currentAccelerations[i] = addAcceleration(
        accelerationAt(bodies[i].x, bodies[i].y, others),
        confinementAcceleration(bodies[i].x, bodies[i].y)
      );
    }

    for (i = 0; i < bodies.length; i += 1) {
      var body = bodies[i];
      body.x += body.vx * dt + 0.5 * currentAccelerations[i].x * dt * dt;
      body.y += body.vy * dt + 0.5 * currentAccelerations[i].y * dt * dt;
    }

    for (i = 0; i < bodies.length; i += 1) {
      var futureOthers = [];

      for (j = 0; j < bodies.length; j += 1) {
        if (i !== j) futureOthers.push(bodies[j]);
      }

      nextAccelerations[i] = addAcceleration(
        accelerationAt(bodies[i].x, bodies[i].y, futureOthers),
        confinementAcceleration(bodies[i].x, bodies[i].y)
      );
    }

    for (i = 0; i < bodies.length; i += 1) {
      var updatedBody = bodies[i];
      updatedBody.vx += 0.5 * (currentAccelerations[i].x + nextAccelerations[i].x) * dt;
      updatedBody.vy += 0.5 * (currentAccelerations[i].y + nextAccelerations[i].y) * dt;

      pushPoint(updatedBody.trail, { x: updatedBody.x, y: updatedBody.y }, trailLength);
    }

    stabilizeBodies();
  }

  function stabilizeBodies() {
    var totalMass = 0;
    var cmx = 0;
    var cmy = 0;
    var cvx = 0;
    var cvy = 0;

    for (var i = 0; i < bodies.length; i += 1) {
      totalMass += bodies[i].mass;
      cmx += bodies[i].x * bodies[i].mass;
      cmy += bodies[i].y * bodies[i].mass;
      cvx += bodies[i].vx * bodies[i].mass;
      cvy += bodies[i].vy * bodies[i].mass;
    }

    cmx /= totalMass;
    cmy /= totalMass;
    cvx /= totalMass;
    cvy /= totalMass;

    for (var j = 0; j < bodies.length; j += 1) {
      bodies[j].x -= cmx * 0.012;
      bodies[j].y -= cmy * 0.012;
      bodies[j].vx -= cvx * 0.018;
      bodies[j].vy -= cvy * 0.018;
    }
  }

  function stepTracers(dt) {
    for (var i = 0; i < tracers.length; i += 1) {
      var tracer = tracers[i];
      var acceleration = addAcceleration(
        accelerationAt(tracer.x, tracer.y, bodies),
        confinementAcceleration(tracer.x, tracer.y)
      );

      tracer.vx += acceleration.x * dt * 0.34;
      tracer.vy += acceleration.y * dt * 0.34;
      tracer.vx *= 0.997;
      tracer.vy *= 0.997;
      tracer.x += tracer.vx * dt;
      tracer.y += tracer.vy * dt;

      pushPoint(tracer.history, { x: tracer.x, y: tracer.y }, trailLength);

      var radius = Math.sqrt(tracer.x * tracer.x + tracer.y * tracer.y);
      if (radius > confinementRadius * 1.15) {
        var angle = Math.random() * Math.PI * 2;
        var spawnRadius = orbitScale * (0.56 + Math.random() * 0.74);
        tracer.x = Math.cos(angle) * spawnRadius;
        tracer.y = Math.sin(angle) * spawnRadius * 0.72;
        tracer.vx = (Math.random() - 0.5) * orbitScale * 0.025;
        tracer.vy = (Math.random() - 0.5) * orbitScale * 0.025;
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

  function drawEntanglement() {
    var pairs = [
      [0, 1],
      [1, 2],
      [2, 0]
    ];

    for (var i = 0; i < pairs.length; i += 1) {
      var a = bodies[pairs[i][0]];
      var b = bodies[pairs[i][1]];
      var midX = (a.x + b.x) * 0.5;
      var midY = (a.y + b.y) * 0.5;
      var dx = b.x - a.x;
      var dy = b.y - a.y;
      var distance = Math.sqrt(dx * dx + dy * dy) || 1;
      var offsetScale = Math.min(distance * 0.12, orbitScale * 0.16);
      var nx = -dy / distance;
      var ny = dx / distance;

      context.beginPath();
      context.moveTo(centerX + a.x, centerY + a.y);
      context.quadraticCurveTo(
        centerX + midX + nx * offsetScale,
        centerY + midY + ny * offsetScale,
        centerX + b.x,
        centerY + b.y
      );
      context.strokeStyle = "rgba(122, 180, 255, 0.28)";
      context.lineWidth = 0.9;
      context.stroke();
    }
  }

  function drawBodies() {
    for (var i = 0; i < bodies.length; i += 1) {
      var body = bodies[i];

      drawPath(body.trail, "rgba(117, 176, 255, 0.16)", 0.8);

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
        drawPath(tracer.history, "rgba(94, 150, 255, " + tracer.alpha * 0.34 + ")", 0.55);
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
    drawEntanglement();
    drawBodies();
  }

  function tick(time) {
    if (!lastTime) lastTime = time;
    var dt = Math.min((time - lastTime) / 1000, maxDt) * timeScale;
    lastTime = time;

    if (!reducedMotionQuery.matches) {
      var subDt = dt / integrationSubsteps;
      for (var i = 0; i < integrationSubsteps; i += 1) {
        stepBodies(subDt);
        stepTracers(subDt);
      }
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
