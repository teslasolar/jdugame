import { describe, it, assert, assertEqual } from '../harness.js';
import { pickPattern, getColor, getRarity } from '../../src/game/patterns.js';
import { createRng } from '../../src/core/seed.js';

const rng = createRng(42);

describe('patterns', () => {
  it('pickPattern returns object with seq and rarity', () => {
    const p = pickPattern(rng);
    assert(typeof p.seq === 'string', 'seq should exist');
    assert(typeof p.rarity === 'number', 'rarity should exist');
  });
  it('pickPattern.seq is a string', () => {
    const p = pickPattern(rng);
    assertEqual(typeof p.seq, 'string');
  });
  it('getColor returns a string starting with #', () => {
    const c = getColor('AAAA');
    assert(typeof c === 'string' && c[0] === '#', 'should start with #');
  });
  it('getRarity AAAA returns 1', () => {
    assertEqual(getRarity('AAAA'), 1);
  });
  it('getRarity ABCBA returns 6', () => {
    assertEqual(getRarity('ABCBA'), 6);
  });
  it('getRarity returns 1 for unknown patterns', () => {
    assertEqual(getRarity('ZZZZ'), 1);
  });
});
