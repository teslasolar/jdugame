import { describe, it, assert, assertEqual } from '../harness.js';
import { tryCompress } from '../../src/game/compress.js';
import { CFG } from '../../src/core/config.js';

const mkState = (sel) => ({
  selected: sel, blocks: [
    { id: 1, x: 10, y: 10, pattern: 'AAAA', color: '#f00', alive: true },
    { id: 2, x: 20, y: 20, pattern: 'AAAA', color: '#f00', alive: true },
  ], score: 0, energy: 0, combo: 0, comboTimer: 0, dictionary: {}, mode: null
});

describe('compress', () => {
  it('returns false if less than 2 selected', () => {
    assertEqual(tryCompress(mkState([1])), false);
  });
  it('compresses matching blocks and returns score > 0', () => {
    const s = mkState([1, 2]);
    const pts = tryCompress(s);
    assert(pts > 0, 'score should be positive');
    assert(!s.blocks[0].alive && !s.blocks[1].alive, 'blocks dead');
  });
  it('adds pattern to dictionary', () => {
    const s = mkState([1, 2]);
    tryCompress(s);
    assert(s.dictionary['AAAA'] >= 1, 'dictionary entry');
  });
  it('increases energy', () => {
    const s = mkState([1, 2]);
    tryCompress(s);
    assertEqual(s.energy, CFG.ENERGY_PER_COMPRESS);
  });
  it('clears selected array after compress', () => {
    const s = mkState([1, 2]);
    tryCompress(s);
    assertEqual(s.selected.length, 0);
  });
  it('increases combo', () => {
    const s = mkState([1, 2]);
    tryCompress(s);
    assertEqual(s.combo, 1);
  });
});
