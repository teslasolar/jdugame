import { describe, it, assert, assertEqual } from '../harness.js';
import { createState } from '../../src/core/state.js';

describe('createState', () => {
  it('returns object with phase lobby', () => {
    assertEqual(createState().phase, 'lobby');
  });
  it('player has x, y, name, id', () => {
    const s = createState();
    assert(typeof s.player.x === 'number', 'x must be number');
    assert(typeof s.player.y === 'number', 'y must be number');
    assert(typeof s.player.name === 'string', 'name must be string');
    assert('id' in s.player, 'player must have id');
  });
  it('score starts at 0', () => {
    assertEqual(createState().score, 0);
  });
  it('energy starts at 0', () => {
    assertEqual(createState().energy, 0);
  });
  it('blocks starts as empty array', () => {
    const s = createState();
    assert(Array.isArray(s.blocks), 'blocks must be array');
    assertEqual(s.blocks.length, 0);
  });
  it('two calls return independent objects', () => {
    const a = createState(), b = createState();
    a.score = 99;
    assertEqual(b.score, 0);
  });
});
