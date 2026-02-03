import { describe, it, assert, assertEqual } from '../harness.js';
import { applyShrink } from '../../src/game/shrink.js';

const mkState = (bx, by) => ({
  arenaW: 500, arenaH: 500,
  blocks: [{ id: 1, x: bx, y: by, alive: true, color: '#f00' }],
  player: { x: 250, y: 250 }, score: 100
});

describe('shrink', () => {
  it('kills blocks outside arena', () => {
    const s = mkState(600, 200);
    applyShrink(s);
    assertEqual(s.blocks[0].alive, false);
  });
  it('blocks inside arena stay alive', () => {
    const s = mkState(200, 200);
    applyShrink(s);
    assertEqual(s.blocks[0].alive, true);
  });
  it('pushes player back inside if outside boundary', () => {
    const s = mkState(200, 200);
    s.player.x = 600; s.player.y = 250;
    applyShrink(s);
    assert(s.player.x <= s.arenaW, 'player x inside');
  });
  it('score penalty for player outside boundary', () => {
    const s = mkState(200, 200);
    s.player.x = 600;
    applyShrink(s);
    assert(s.score < 100, 'score should decrease');
  });
});
