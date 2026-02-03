import { CFG } from './config.js';

let shrinkCb = null;

export function setShrinkCallback(fn) { shrinkCb = fn; }

export function tickClock(state, dt) {
  if (state.phase !== 'playing') return;
  state.elapsed += dt;
  const shrinks = Math.floor(state.elapsed / CFG.SHRINK_INTERVAL);
  const target = Math.max(
    CFG.MIN_ARENA,
    CFG.ARENA_W - shrinks * CFG.SHRINK_AMOUNT
  );
  if (state.arenaW > target) {
    state.arenaW = target;
    state.arenaH = target;
    if (shrinkCb) shrinkCb();
  }
  if (state.elapsed >= CFG.ROUND_TIME) {
    state.phase = 'ended';
  }
}
