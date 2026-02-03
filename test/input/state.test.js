import { describe, it, assertEqual } from '../harness.js';
import { input, clearPresses } from '../../src/input/state.js';

describe('input state', () => {
  it('has moveX and moveY initialized to 0', () => {
    assertEqual(input.moveX, 0);
    assertEqual(input.moveY, 0);
  });
  it('has aimX and aimY initialized to 0', () => {
    assertEqual(input.aimX, 0);
    assertEqual(input.aimY, 0);
  });
  it('has selectDown initialized to false', () => {
    assertEqual(input.selectDown, false);
  });
  it('clearPresses resets selectDown to false', () => {
    input.selectDown = true;
    clearPresses();
    assertEqual(input.selectDown, false);
  });
  it('clearPresses resets blastDown to false', () => {
    input.blastDown = true;
    clearPresses();
    assertEqual(input.blastDown, false);
  });
  it('clearPresses resets chatDown to false', () => {
    input.chatDown = true;
    clearPresses();
    assertEqual(input.chatDown, false);
  });
});
