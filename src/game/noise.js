import { CFG } from '../core/config.js';

const CHARS = 'ABCDEFGH';

export function createNoiseBlock(x, y, id) {
  let seq = '';
  for (let i = 0; i < 4 + Math.floor(Math.random() * 3); i++) {
    seq += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return {
    id, x, y,
    vx: (Math.random() - 0.5) * CFG.BLOCK_DRIFT * 2,
    vy: (Math.random() - 0.5) * CFG.BLOCK_DRIFT * 2,
    pattern: seq,
    color: '#666',
    alive: true, noise: true
  };
}
