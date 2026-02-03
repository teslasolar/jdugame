import { describe, it, assert } from '../harness.js';
import { CFG } from '../../src/core/config.js';

describe('CFG', () => {
  it('has ARENA_W and ARENA_H as positive numbers', () => {
    assert(CFG.ARENA_W > 0, 'ARENA_W must be > 0');
    assert(CFG.ARENA_H > 0, 'ARENA_H must be > 0');
  });
  it('has PLAYER_SPEED > 0', () => {
    assert(CFG.PLAYER_SPEED > 0, 'PLAYER_SPEED must be > 0');
  });
  it('has BLOCK_COUNT > 0', () => {
    assert(CFG.BLOCK_COUNT > 0, 'BLOCK_COUNT must be > 0');
  });
  it('has COLORS as non-empty array', () => {
    assert(Array.isArray(CFG.COLORS), 'COLORS must be array');
    assert(CFG.COLORS.length > 0, 'COLORS must not be empty');
  });
  it('has ENERGY_MAX > 0', () => {
    assert(CFG.ENERGY_MAX > 0, 'ENERGY_MAX must be > 0');
  });
  it('has ROUND_TIME > 0', () => {
    assert(CFG.ROUND_TIME > 0, 'ROUND_TIME must be > 0');
  });
});
