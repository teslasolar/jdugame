import { CFG } from '../core/config.js';

const TYPES = ['lossy', 'lossless', 'scanner', 'deflate'];

let nextPwId = 50000;
let timer = 0;

export function updatePowerups(state, dt) {
  timer += dt;
  if (timer >= CFG.POWERUP_INTERVAL) {
    timer = 0;
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    state.powerups.push({
      id: nextPwId++, type,
      x: Math.random() * state.arenaW,
      y: Math.random() * state.arenaH,
      alive: true
    });
  }
}

export function tryPickup(state) {
  for (const pw of state.powerups) {
    if (!pw.alive) continue;
    const dx = pw.x - state.player.x, dy = pw.y - state.player.y;
    if (dx * dx + dy * dy < 40 * 40) {
      pw.alive = false;
      applyPowerup(state, pw.type);
      return pw.type;
    }
  }
  return null;
}

function applyPowerup(state, type) {
  if (type === 'lossy') { state.mode = 'lossy'; state.modeTimer = CFG.LOSSY_DURATION; }
  if (type === 'lossless') { state.mode = 'lossless'; state.modeTimer = CFG.LOSSLESS_DURATION; }
  if (type === 'scanner') { /* highlight handled in render */ }
  if (type === 'deflate') {
    let pat = null;
    for (const b of state.blocks) {
      if (b.alive && !b.noise) {
        const d = Math.hypot(b.x - state.player.x, b.y - state.player.y);
        if (d < CFG.SCAN_R) { pat = b.pattern; break; }
      }
    }
    if (pat) {
      for (const b of state.blocks) {
        if (b.alive && b.pattern === pat) b.alive = false;
      }
      state.score += 200;
    }
  }
}
