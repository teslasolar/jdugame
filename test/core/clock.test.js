import { describe, it, assert, assertEqual } from '../harness.js';
import { tickClock, setShrinkCallback } from '../../src/core/clock.js';
import { CFG } from '../../src/core/config.js';

describe('tickClock', () => {
  it('increments state.elapsed', () => {
    const s = { phase: 'playing', elapsed: 0, arenaW: CFG.ARENA_W, arenaH: CFG.ARENA_H };
    tickClock(s, 1);
    assertEqual(s.elapsed, 1);
  });
  it('only works when phase is playing', () => {
    const s = { phase: 'lobby', elapsed: 0, arenaW: CFG.ARENA_W, arenaH: CFG.ARENA_H };
    tickClock(s, 1);
    assertEqual(s.elapsed, 0);
  });
  it('arena shrinks after SHRINK_INTERVAL', () => {
    const s = { phase: 'playing', elapsed: 0, arenaW: CFG.ARENA_W, arenaH: CFG.ARENA_H };
    tickClock(s, CFG.SHRINK_INTERVAL + 1);
    assert(s.arenaW < CFG.ARENA_W, 'arena should shrink');
  });
  it('phase becomes ended after ROUND_TIME', () => {
    const s = { phase: 'playing', elapsed: 0, arenaW: CFG.ARENA_W, arenaH: CFG.ARENA_H };
    tickClock(s, CFG.ROUND_TIME);
    assertEqual(s.phase, 'ended');
  });
  it('shrink callback fires when arena shrinks', () => {
    let called = false;
    setShrinkCallback(() => { called = true; });
    const s = { phase: 'playing', elapsed: 0, arenaW: CFG.ARENA_W, arenaH: CFG.ARENA_H };
    tickClock(s, CFG.SHRINK_INTERVAL + 1);
    assert(called, 'callback should fire');
    setShrinkCallback(null);
  });
});
