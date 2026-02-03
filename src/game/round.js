import { CFG } from '../core/config.js';

export function updateRound(state, dt) {
  if (state.phase === 'countdown') {
    state.countdown -= dt;
    if (state.countdown <= 0) {
      state.phase = 'playing';
      state.countdown = 0;
    }
  }
}

export function startRound(state) {
  state.phase = 'countdown';
  state.countdown = CFG.COUNTDOWN;
  state.elapsed = 0;
  state.score = 0;
  state.energy = 0;
  state.combo = 0;
  state.comboTimer = 0;
  state.selected = [];
  state.mode = null;
  state.modeTimer = 0;
  state.arenaW = CFG.ARENA_W;
  state.arenaH = CFG.ARENA_H;
  state.powerups = [];
}
