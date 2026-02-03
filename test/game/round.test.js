import { describe, it, assert, assertEqual } from '../harness.js';
import { updateRound, startRound } from '../../src/game/round.js';
import { CFG } from '../../src/core/config.js';

const mkState = () => ({
  phase: '', countdown: 0, elapsed: 0, score: 50, energy: 30,
  combo: 2, comboTimer: 1, selected: [1], mode: 'lossy', modeTimer: 5,
  arenaW: 0, arenaH: 0, powerups: []
});

describe('round', () => {
  it('startRound sets phase to countdown', () => {
    const s = mkState(); startRound(s);
    assertEqual(s.phase, 'countdown');
  });
  it('startRound resets score energy combo to 0', () => {
    const s = mkState(); startRound(s);
    assertEqual(s.score, 0);
    assertEqual(s.energy, 0);
    assertEqual(s.combo, 0);
  });
  it('updateRound decrements countdown', () => {
    const s = mkState(); startRound(s);
    const before = s.countdown;
    updateRound(s, 1);
    assert(s.countdown < before, 'countdown decreased');
  });
  it('phase changes to playing when countdown <= 0', () => {
    const s = mkState(); startRound(s);
    updateRound(s, CFG.COUNTDOWN + 1);
    assertEqual(s.phase, 'playing');
  });
  it('startRound sets arenaW/H to CFG values', () => {
    const s = mkState(); startRound(s);
    assertEqual(s.arenaW, CFG.ARENA_W);
    assertEqual(s.arenaH, CFG.ARENA_H);
  });
});
