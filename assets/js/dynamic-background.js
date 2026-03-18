(function () {
  var canvas = document.getElementById("dynamic-background-canvas");
  if (!canvas) return;

  var context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  var torusCanvas = document.getElementById("torus-canvas");
  var torusContext = torusCanvas ? torusCanvas.getContext("2d", { alpha: true }) : null;
  var feynmanCanvas = document.getElementById("feynman-canvas");
  var feynmanContext = feynmanCanvas ? feynmanCanvas.getContext("2d", { alpha: true }) : null;

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

  var G = 2000;
  var softening = 0.03;
  var trailLength = 24;
  var maxDt = 0.014;
  var timeScale = 1.5;
  var integrationSubsteps = 2;
  var confinementRadius = 0;
  var confinementStrength = 0;
  var torusRotation = 0;
  var torusTilt = 0.85;

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

    resizeTorus();
    resizeFeynman();
    initializeScene();
  }

  function resizeTorus() {
    if (!torusCanvas || !torusContext) return;
    var rect = torusCanvas.getBoundingClientRect();
    var w = Math.max(Math.floor(rect.width), 1);
    var h = Math.max(Math.floor(rect.height), 1);
    torusCanvas.width = Math.floor(w * dpr);
    torusCanvas.height = Math.floor(h * dpr);
    torusContext.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function resizeFeynman() {
    if (!feynmanCanvas || !feynmanContext) return;
    var rect = feynmanCanvas.getBoundingClientRect();
    var w = Math.max(Math.floor(rect.width), 1);
    var h = Math.max(Math.floor(rect.height), 1);
    feynmanCanvas.width = Math.floor(w * dpr);
    feynmanCanvas.height = Math.floor(h * dpr);
    feynmanContext.setTransform(dpr, 0, 0, dpr, 0, 0);
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

  function initializeScene() {
    initializeBodies();
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
    return { x: a.x + b.x, y: a.y + b.y };
  }

  function pushPoint(history, point, maxLength) {
    history.push(point);
    if (history.length > maxLength) history.shift();
  }

  function stepBodies(dt) {
    var currentAccelerations = [];
    var nextAccelerations = [];
    var i;
    var j;

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

  function drawBackdrop() {
    context.clearRect(0, 0, width, height);
    var glow = context.createRadialGradient(centerX, centerY, orbitScale * 0.1, centerX, centerY, orbitScale * 2.6);
    glow.addColorStop(0, "rgba(67, 123, 255, 0.08)");
    glow.addColorStop(0.55, "rgba(28, 55, 126, 0.05)");
    glow.addColorStop(1, "rgba(4, 9, 20, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
  }

  function projectTorusPoint(u, v, widthPx, heightPx) {
    var majorRadius = Math.min(widthPx, heightPx) * 0.28;
    var minorRadius = majorRadius * 0.38;
    var cu = Math.cos(u + torusRotation);
    var su = Math.sin(u + torusRotation);
    var cv = Math.cos(v);
    var sv = Math.sin(v);

    var x = (majorRadius + minorRadius * cv) * cu;
    var y = minorRadius * sv;
    var z = (majorRadius + minorRadius * cv) * su;

    var tiltCos = Math.cos(torusTilt);
    var tiltSin = Math.sin(torusTilt);
    var y2 = y * tiltCos - z * tiltSin;
    var z2 = y * tiltSin + z * tiltCos;
    var perspective = 1 / (1 + z2 / (majorRadius * 3.4));

    return {
      x: widthPx * 0.5 + x * perspective,
      y: heightPx * 0.5 + y2 * perspective
    };
  }

  function drawTorus() {
    if (!torusCanvas || !torusContext) return;

    var widthPx = torusCanvas.width / dpr;
    var heightPx = torusCanvas.height / dpr;
    torusContext.clearRect(0, 0, widthPx, heightPx);

    torusRotation += reducedMotionQuery.matches ? 0.0015 : 0.006;

    var uSegments = 28;
    var vSegments = 16;
    var uStep = (Math.PI * 2) / uSegments;
    var vStep = (Math.PI * 2) / vSegments;

    for (var i = 0; i < uSegments; i += 1) {
      torusContext.beginPath();
      for (var j = 0; j <= vSegments; j += 1) {
        var point = projectTorusPoint(i * uStep, j * vStep, widthPx, heightPx);
        if (j === 0) torusContext.moveTo(point.x, point.y);
        else torusContext.lineTo(point.x, point.y);
      }
      torusContext.strokeStyle = "rgba(121, 180, 255, 0.30)";
      torusContext.lineWidth = 0.8;
      torusContext.stroke();
    }

    for (var k = 0; k < vSegments; k += 1) {
      torusContext.beginPath();
      for (var m = 0; m <= uSegments; m += 1) {
        var ringPoint = projectTorusPoint(m * uStep, k * vStep, widthPx, heightPx);
        if (m === 0) torusContext.moveTo(ringPoint.x, ringPoint.y);
        else torusContext.lineTo(ringPoint.x, ringPoint.y);
      }
      torusContext.strokeStyle = "rgba(188, 221, 255, 0.18)";
      torusContext.lineWidth = 0.65;
      torusContext.stroke();
    }
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

  function drawWavyLine(ctx, x1, y1, x2, y2, amplitude, cycles, color, widthPx) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var length = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / length;
    var ny = dx / length;
    var steps = cycles * 18;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for (var i = 1; i <= steps; i += 1) {
      var t = i / steps;
      var px = x1 + dx * t;
      var py = y1 + dy * t;
      var wave = Math.sin(t * Math.PI * 2 * cycles) * amplitude;
      ctx.lineTo(px + nx * wave, py + ny * wave);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = widthPx;
    ctx.stroke();
  }

  function drawArrowedLine(ctx, x1, y1, x2, y2, color, widthPx) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var length = Math.sqrt(dx * dx + dy * dy) || 1;
    var ux = dx / length;
    var uy = dy / length;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = widthPx;
    ctx.stroke();

    var arrowSize = 7;
    var ax = x1 + dx * 0.58;
    var ay = y1 + dy * 0.58;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax - ux * arrowSize - uy * arrowSize * 0.55, ay - uy * arrowSize + ux * arrowSize * 0.55);
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax - ux * arrowSize + uy * arrowSize * 0.55, ay - uy * arrowSize - ux * arrowSize * 0.55);
    ctx.strokeStyle = color;
    ctx.lineWidth = widthPx * 0.95;
    ctx.stroke();
  }

  function drawFeynmanDiagram() {
    if (!feynmanCanvas || !feynmanContext) return;

    var widthPx = feynmanCanvas.width / dpr;
    var heightPx = feynmanCanvas.height / dpr;
    var ctx = feynmanContext;
    var phase = lastTime ? lastTime * 0.0012 : 0;

    ctx.clearRect(0, 0, widthPx, heightPx);

    var lineColor = "rgba(224, 239, 255, 0.94)";
    var photonColor = "rgba(120, 188, 255, 0.86)";
    var leftX = widthPx * 0.12;
    var vertexX = widthPx * 0.42;
    var rightX = widthPx * 0.72;
    var topOuterY = heightPx * 0.24;
    var topVertexY = heightPx * 0.38;
    var bottomVertexY = heightPx * 0.62;
    var bottomOuterY = heightPx * 0.76;

    var leftTop = { x: leftX, y: topOuterY };
    var leftBottom = { x: leftX, y: bottomOuterY };
    var v1 = { x: vertexX, y: topVertexY };
    var v2 = { x: vertexX, y: bottomVertexY };
    var rightTop = { x: rightX, y: topOuterY };
    var rightBottom = { x: rightX, y: bottomOuterY };

    drawArrowedLine(ctx, leftTop.x, leftTop.y, v1.x, v1.y, lineColor, 1.7);
    drawArrowedLine(ctx, v1.x, v1.y, rightTop.x, rightTop.y, lineColor, 1.7);
    drawArrowedLine(ctx, leftBottom.x, leftBottom.y, v2.x, v2.y, lineColor, 1.7);
    drawArrowedLine(ctx, v2.x, v2.y, rightBottom.x, rightBottom.y, lineColor, 1.7);

    drawWavyLine(ctx, v1.x, v1.y, v2.x, v2.y, 4.2 + Math.sin(phase) * 0.35, 5, photonColor, 1.35);

    ctx.beginPath();
    ctx.arc(v1.x, v1.y, 2.2, 0, Math.PI * 2);
    ctx.arc(v2.x, v2.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(212, 234, 255, 0.96)";
    ctx.fill();

    ctx.font = "13px Georgia, serif";
    ctx.fillStyle = "rgba(198, 222, 255, 0.72)";
    ctx.fillText("e-", leftTop.x - 6, leftTop.y - 8);
    ctx.fillText("e-", leftBottom.x - 6, leftBottom.y + 18);
    ctx.fillText("e-", rightTop.x - 3, rightTop.y - 8);
    ctx.fillText("e-", rightBottom.x - 3, rightBottom.y + 18);
    ctx.fillText("gamma", v1.x + 10, (v1.y + v2.y) * 0.5 + 4);
  }

  function drawEntanglement() {
    var pairs = [[0, 1], [1, 2], [2, 0]];
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

  function render() {
    drawBackdrop();
    drawEntanglement();
    drawBodies();
    drawTorus();
    drawFeynmanDiagram();
  }

  function tick(time) {
    if (!lastTime) lastTime = time;
    var dt = Math.min((time - lastTime) / 1000, maxDt) * timeScale;
    lastTime = time;

    if (!reducedMotionQuery.matches) {
      var subDt = dt / integrationSubsteps;
      for (var i = 0; i < integrationSubsteps; i += 1) {
        stepBodies(subDt);
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
