import { input } from './state.js';

const keys = {};

export function initKeyboard() {
  window.addEventListener('keydown', e => {
    if (e.repeat) return;
    keys[e.code] = true;
    if (e.code === 'Enter') input.chatDown = true;
    if (e.code === 'Escape') input.cancelDown = true;
    if (e.code === 'Space') input.blastDown = true;
  });
  window.addEventListener('keyup', e => { keys[e.code] = false; });
}

export function pollKeyboard() {
  input.moveX = (keys['KeyD'] ? 1 : 0) - (keys['KeyA'] ? 1 : 0);
  input.moveY = (keys['KeyS'] ? 1 : 0) - (keys['KeyW'] ? 1 : 0);
}
