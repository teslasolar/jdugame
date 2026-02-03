import { clearPresses } from './state.js';
import { pollKeyboard } from './keyboard.js';
import { pollGamepad, gamepadActive } from './gamepad.js';
import { pollMouse } from './mouse.js';

export function pollInput(playerScreenX, playerScreenY) {
  clearPresses();
  pollKeyboard();
  if (navigator.getGamepads) pollGamepad();
  if (!gamepadActive) pollMouse(playerScreenX, playerScreenY);
}
