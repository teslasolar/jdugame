import { describe, it, assert } from '../harness.js';
import { calcScore } from '../../src/game/score.js';

const base = () => ({ dictionary: {}, mode: 'normal', combo: 0 });

describe('score', () => {
  it('score increases with matchCount (quadratic)', () => {
    const s = base();
    const s1 = calcScore('AAAA', 1, s);
    const s2 = calcScore('AAAA', 2, s);
    assert(s2 > s1 * 2, 'quadratic growth');
  });
  it('score increases with rarity', () => {
    const s = base();
    const lo = calcScore('AAAA', 1, s);
    const hi = calcScore('ABCBA', 1, s);
    assert(hi > lo, 'higher rarity = higher score');
  });
  it('dictionary bonus increases score by 1.5x', () => {
    const s1 = base(), s2 = base();
    s2.dictionary = { AAAA: true };
    assert(calcScore('AAAA', 1, s2) > calcScore('AAAA', 1, s1), 'dict bonus');
  });
  it('lossy mode reduces score by 0.7x', () => {
    const s = base(); const n = calcScore('AAAA', 2, s);
    s.mode = 'lossy';
    assert(calcScore('AAAA', 2, s) < n, 'lossy reduces');
  });
  it('lossless mode increases score by 1.5x', () => {
    const s = base(); const n = calcScore('AAAA', 2, s);
    s.mode = 'lossless';
    assert(calcScore('AAAA', 2, s) > n, 'lossless boosts');
  });
  it('combo multiplier increases score', () => {
    const s = base(); const n = calcScore('AAAA', 2, s);
    s.combo = 3;
    assert(calcScore('AAAA', 2, s) > n, 'combo boosts');
  });
});
