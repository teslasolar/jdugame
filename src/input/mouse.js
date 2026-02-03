import { input } from './state.js';

let mx = 0, my = 0;
let canvasRef = null;

export function initMouse(canvas) {
  canvasRef = canvas;
  canvas.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
  });
  canvas.addEventListener('mousedown', e => {
    if (e.button === 0) input.selectDown = true;
    if (e.button === 2) input.blastDown = true;
  });
  canvas.addEventListener('contextmenu', e => e.preventDefault());
}

export function pollMouse(playerScreenX, playerScreenY) {
  if (!canvasRef) return;
  const dx = mx - playerScreenX;
  const dy = my - playerScreenY;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  input.aimX = dx / len;
  input.aimY = dy / len;
}
