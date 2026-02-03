import { describe, it, assert, assertEqual, assertClose } from '../harness.js';
import { updatePlayer } from '../../src/game/player.js';
import { CFG } from '../../src/core/config.js';

const mkState = () => ({
  player: { x: 500, y: 500 }, arenaW: 3000, arenaH: 3000, aimX: 0, aimY: 0
});
const inp = (mx, my, ax, ay) => ({ moveX: mx, moveY: my, aimX: ax || 0, aimY: ay || 0 });

describe('player', () => {
  it('moves player by input * speed * dt', () => {
    const s = mkState();
    updatePlayer(s, inp(1, 0), 1);
    assertClose(s.player.x, 500 + CFG.PLAYER_SPEED, 1);
  });
  it('clamps player within arena bounds', () => {
    const s = mkState();
    updatePlayer(s, inp(-1, 0), 100);
    assertEqual(s.player.x, 0);
  });
  it('no movement when input is 0,0', () => {
    const s = mkState();
    updatePlayer(s, inp(0, 0), 1);
    assertEqual(s.player.x, 500);
    assertEqual(s.player.y, 500);
  });
  it('updates aimX aimY from input', () => {
    const s = mkState();
    updatePlayer(s, inp(0, 0, 0.7, -0.3), 0.016);
    assertClose(s.aimX, 0.7);
    assertClose(s.aimY, -0.3);
  });
});
