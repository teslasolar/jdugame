let updateFn = null;
let renderFn = null;
let last = 0;
let running = false;

function tick(now) {
  if (!running) return;
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (updateFn) updateFn(dt);
  if (renderFn) renderFn(dt);
  requestAnimationFrame(tick);
}

export function startLoop(update, render) {
  updateFn = update;
  renderFn = render;
  running = true;
  last = performance.now();
  requestAnimationFrame(tick);
}

export function stopLoop() { running = false; }
