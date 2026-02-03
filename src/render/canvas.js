const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

export function initCanvas() {
  resize();
  window.addEventListener('resize', resize);
  return { canvas, ctx };
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function showCanvas() {
  canvas.style.display = 'block';
}

export { canvas, ctx };
