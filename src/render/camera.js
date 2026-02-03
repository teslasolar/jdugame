let cx = 0, cy = 0;

export function updateCamera(px, py, canvasW, canvasH) {
  const tx = px - canvasW / 2;
  const ty = py - canvasH / 2;
  cx += (tx - cx) * 0.08;
  cy += (ty - cy) * 0.08;
}

export function applyCamera(ctx) {
  ctx.translate(-cx, -cy);
}

export function getCam() { return { x: cx, y: cy }; }

export function screenToWorld(sx, sy) {
  return { x: sx + cx, y: sy + cy };
}

export function worldToScreen(wx, wy) {
  return { x: wx - cx, y: wy - cy };
}
