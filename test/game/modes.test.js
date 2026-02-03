import { describe, it, assert, assertEqual, assertClose } from '../harness.js';
import { updateModes } from '../../src/game/modes.js';

describe('modes', () => {
  it('mode timer decreases by dt', () => {
    const s = { mode: 'lossy', modeTimer: 5 };
    updateModes(s, 1);
    assertClose(s.modeTimer, 4);
  });
  it('mode resets to null when timer reaches 0', () => {
    const s = { mode: 'lossy', modeTimer: 0.5 };
    updateModes(s, 1);
    assertEqual(s.mode, null);
    assertEqual(s.modeTimer, 0);
  });
  it('does nothing if mode is null', () => {
    const s = { mode: null, modeTimer: 0 };
    updateModes(s, 1);
    assertEqual(s.mode, null);
    assertEqual(s.modeTimer, 0);
  });
});
