import { describe, it, assertEqual, assert } from '../harness.js';
import { updateCombo } from '../../src/game/combo.js';

describe('combo', () => {
  it('comboTimer decreases by dt', () => {
    const s = { combo: 3, comboTimer: 2.0 };
    updateCombo(s, 0.5);
    assertEqual(s.comboTimer, 1.5);
  });
  it('combo resets to 0 when comboTimer reaches 0', () => {
    const s = { combo: 3, comboTimer: 0.5 };
    updateCombo(s, 1.0);
    assertEqual(s.combo, 0);
  });
  it('combo stays if comboTimer > 0', () => {
    const s = { combo: 5, comboTimer: 3.0 };
    updateCombo(s, 1.0);
    assertEqual(s.combo, 5);
    assert(s.comboTimer > 0, 'timer still positive');
  });
});
