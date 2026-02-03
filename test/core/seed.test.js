import { describe, it, assert, assertEqual } from '../harness.js';
import { createRng, codeToSeed } from '../../src/core/seed.js';

describe('createRng', () => {
  it('same seed produces same sequence', () => {
    const a = createRng(42), b = createRng(42);
    assertEqual(a(), b());
    assertEqual(a(), b());
  });
  it('different seeds produce different sequences', () => {
    const a = createRng(1), b = createRng(999);
    assert(a() !== b(), 'sequences should differ');
  });
  it('values are between 0 and 1', () => {
    const rng = createRng(7);
    for (let i = 0; i < 50; i++) {
      const v = rng();
      assert(v >= 0 && v < 1, `out of range: ${v}`);
    }
  });
});

describe('codeToSeed', () => {
  it('returns an integer', () => {
    const s = codeToSeed('ABCD');
    assertEqual(s, Math.floor(s));
  });
  it('same input gives same output', () => {
    assertEqual(codeToSeed('XYZ'), codeToSeed('XYZ'));
  });
  it('different input gives different output', () => {
    assert(codeToSeed('AAA') !== codeToSeed('BBB'), 'should differ');
  });
});
