import { CFG } from '../core/config.js';
import { hasEnergy, useEnergy } from './energy.js';
import { createNoiseBlock } from './noise.js';
import { spawnParticles } from '../render/particles.js';
import { triggerShake, triggerFlash } from '../render/effects.js';

let blastIdCounter = 90000;

export function tryBlast(state, input) {
  if (!input.blastDown || !hasEnergy(state)) return false;
  useEnergy(state);
  const tx = state.player.x + state.aimX * CFG.SCAN_R * 1.5;
  const ty = state.player.y + state.aimY * CFG.SCAN_R * 1.5;
  for (let i = 0; i < CFG.BLAST_NOISE_COUNT; i++) {
    const ox = (Math.random() - 0.5) * 200;
    const oy = (Math.random() - 0.5) * 200;
    state.blocks.push(createNoiseBlock(tx + ox, ty + oy, blastIdCounter++));
  }
  spawnParticles(tx, ty, '#e94560', 20);
  triggerShake(12);
  triggerFlash('#e94560', 0.12);
  return true;
}
