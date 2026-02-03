import { CFG } from '../core/config.js';
import { createBlock, resetBlockIds } from './blocks.js';

export function generateArena(rng) {
  resetBlockIds();
  const blocks = [];
  for (let i = 0; i < CFG.BLOCK_COUNT; i++) {
    blocks.push(createBlock(rng, CFG.ARENA_W, CFG.ARENA_H));
  }
  return blocks;
}
