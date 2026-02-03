import { describe, it, assert, assertEqual } from '../harness.js';
import { createNoiseBlock } from '../../src/game/noise.js';

describe('noise', () => {
  const b = createNoiseBlock(50, 75, 99);
  it('returns object with given id, x, y', () => {
    assertEqual(b.id, 99);
    assertEqual(b.x, 50);
    assertEqual(b.y, 75);
  });
  it('pattern is a string of length >= 4', () => {
    assert(typeof b.pattern === 'string', 'pattern is string');
    assert(b.pattern.length >= 4, 'pattern length >= 4');
  });
  it('noise flag is true', () => {
    assertEqual(b.noise, true);
  });
  it('alive flag is true', () => {
    assertEqual(b.alive, true);
  });
  it('color is #666', () => {
    assertEqual(b.color, '#666');
  });
});
