import { describe, it, assert, assertEqual } from '../harness.js';
import { trySelect } from '../../src/game/select.js';
import { CFG } from '../../src/core/config.js';

const mkState = (blocks) => ({
  player: { x: 100, y: 100 }, blocks, selected: [],
  aimX: 0, aimY: 0, mode: null
});
const blk = (id, x, y, pat) => ({ id, x, y, pattern: pat, color: '#f00', alive: true });

describe('select', () => {
  it('returns null if selectDown is false', () => {
    const s = mkState([blk(1, 110, 100, 'AAAA')]);
    assertEqual(trySelect(s, { selectDown: false }), null);
  });
  it('returns selected when block in range clicked', () => {
    const s = mkState([blk(1, 110, 100, 'AAAA')]);
    assertEqual(trySelect(s, { selectDown: true }), 'selected');
  });
  it('adds block id to state.selected', () => {
    const s = mkState([blk(1, 110, 100, 'AAAA')]);
    trySelect(s, { selectDown: true });
    assert(s.selected.includes(1), 'should contain id 1');
  });
  it('returns mismatch if second block pattern differs', () => {
    const s = mkState([blk(1, 150, 150, 'AAAA'), blk(2, 105, 100, 'ABCD')]);
    s.selected = [1];
    assertEqual(trySelect(s, { selectDown: true }), 'mismatch');
  });
  it('returns null if block out of scan range', () => {
    const far = CFG.SCAN_R + 200;
    const s = mkState([blk(1, 100 + far, 100, 'AAAA')]);
    assertEqual(trySelect(s, { selectDown: true }), null);
  });
});
