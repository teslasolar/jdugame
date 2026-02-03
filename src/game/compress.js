import { calcScore } from './score.js';
import { spawnParticles } from '../render/particles.js';
import { triggerShake, triggerFlash } from '../render/effects.js';
import { CFG } from '../core/config.js';

export function tryCompress(state) {
  if (state.selected.length < 2) return false;
  const blocks = state.selected.map(
    id => state.blocks.find(b => b.id === id)
  ).filter(Boolean);
  if (blocks.length < 2) { state.selected = []; return false; }
  const pattern = blocks[0].pattern;
  const pts = calcScore(pattern, blocks.length, state);
  state.score += pts;
  state.energy = Math.min(CFG.ENERGY_MAX, state.energy + CFG.ENERGY_PER_COMPRESS);
  state.dictionary[pattern] = (state.dictionary[pattern] || 0) + 1;
  for (const b of blocks) {
    b.alive = false;
    spawnParticles(b.x, b.y, b.color, 12);
  }
  triggerShake(8);
  triggerFlash('#00ff88', 0.15);
  state.combo++;
  state.comboTimer = CFG.COMBO_WINDOW;
  state.selected = [];
  return pts;
}
