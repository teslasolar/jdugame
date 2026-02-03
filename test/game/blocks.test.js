import { describe, it, assert, assertEqual } from '../harness.js';
import { createBlock, updateBlocks, resetBlockIds } from '../../src/game/blocks.js';
import { createRng } from '../../src/core/seed.js';

describe('blocks', () => {
  resetBlockIds();
  const rng = createRng(7);
  it('createBlock returns object with required fields', () => {
    const b = createBlock(rng, 800, 600);
    assert(typeof b.id === 'number' && typeof b.x === 'number', 'fields');
    assert(typeof b.pattern === 'string' && typeof b.color === 'string', 'pat/col');
    assertEqual(b.alive, true);
  });
  it('createBlock positions within arena bounds', () => {
    const b = createBlock(rng, 800, 600);
    assert(b.x >= 0 && b.x <= 800, 'x in bounds');
    assert(b.y >= 0 && b.y <= 600, 'y in bounds');
  });
  it('updateBlocks moves blocks by velocity * dt', () => {
    const b = { x: 100, y: 100, vx: 10, vy: 5, alive: true };
    updateBlocks([b], 1, 800, 600);
    assert(b.x > 100, 'x should have moved');
  });
  it('blocks bounce off arena walls', () => {
    const b = { x: 799, y: 599, vx: 10, vy: 10, alive: true };
    updateBlocks([b], 1, 800, 600);
    assert(b.vx < 0, 'vx should reverse');
    assert(b.vy < 0, 'vy should reverse');
  });
  it('successive createBlock calls produce incrementing ids', () => {
    const a = createBlock(rng, 800, 600);
    const b = createBlock(rng, 800, 600);
    assertEqual(b.id, a.id + 1);
  });
});
