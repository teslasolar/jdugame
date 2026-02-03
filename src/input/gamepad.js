import { input } from './state.js';
import { CFG } from '../core/config.js';

export let gamepadActive = false;

function dz(v) {
  return Math.abs(v) < CFG.DEADZONE ? 0 : v;
}

export function pollGamepad() {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  const gp = pads[0];
  if (!gp) { gamepadActive = false; return; }
  gamepadActive = true;
  input.moveX = dz(gp.axes[0]);
  input.moveY = dz(gp.axes[1]);
  input.aimX = dz(gp.axes[2]);
  input.aimY = dz(gp.axes[3]);
  if (gp.buttons[0] && gp.buttons[0].pressed) input.selectDown = true;
  if (gp.buttons[1] && gp.buttons[1].pressed) input.blastDown = true;
  if (gp.buttons[3] && gp.buttons[3].pressed) input.chatDown = true;
  if (gp.buttons[2] && gp.buttons[2].pressed) input.cancelDown = true;
}
