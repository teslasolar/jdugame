import { CFG } from '../core/config.js';

export function updatePlayer(state, input, dt) {
  const mx = input.moveX, my = input.moveY;
  const len = Math.sqrt(mx * mx + my * my) || 0;
  if (len > 0) {
    const nx = mx / Math.max(len, 1);
    const ny = my / Math.max(len, 1);
    state.player.x += nx * CFG.PLAYER_SPEED * dt;
    state.player.y += ny * CFG.PLAYER_SPEED * dt;
  }
  state.player.x = Math.max(0, Math.min(state.arenaW, state.player.x));
  state.player.y = Math.max(0, Math.min(state.arenaH, state.player.y));
  state.aimX = input.aimX;
  state.aimY = input.aimY;
}
