import { spawnParticles } from '../render/particles.js';

export function applyShrink(state) {
  for (const b of state.blocks) {
    if (!b.alive) continue;
    if (b.x > state.arenaW || b.y > state.arenaH) {
      b.alive = false;
      spawnParticles(b.x, b.y, '#e94560', 4);
    }
  }
  if (state.player.x > state.arenaW || state.player.y > state.arenaH) {
    state.score = Math.max(0, state.score - 50);
    state.player.x = Math.min(state.player.x, state.arenaW - 20);
    state.player.y = Math.min(state.player.y, state.arenaH - 20);
  }
}
