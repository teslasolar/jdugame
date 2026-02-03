import { CFG } from '../core/config.js';
import { pickPattern, getColor } from './patterns.js';

let nextId = 0;

export function createBlock(rng, arenaW, arenaH) {
  const p = pickPattern(rng);
  return {
    id: nextId++, x: rng() * arenaW, y: rng() * arenaH,
    vx: (rng() - 0.5) * CFG.BLOCK_DRIFT,
    vy: (rng() - 0.5) * CFG.BLOCK_DRIFT,
    pattern: p.seq, color: getColor(p.seq),
    alive: true, noise: false
  };
}

export function updateBlocks(blocks, dt, arenaW, arenaH) {
  for (const b of blocks) {
    if (!b.alive) continue;
    b.x += b.vx * dt; b.y += b.vy * dt;
    if (b.x < 0 || b.x > arenaW) b.vx *= -1;
    if (b.y < 0 || b.y > arenaH) b.vy *= -1;
    b.x = Math.max(0, Math.min(arenaW, b.x));
    b.y = Math.max(0, Math.min(arenaH, b.y));
  }
}

export function resetBlockIds() { nextId = 0; }
