import { playTone, playNoise } from './synth.js';

export function playSfx(name) {
  switch (name) {
    case 'select':
      playTone(600, 0.08, 'square', 0.1);
      break;
    case 'compress':
      playTone(400, 0.1, 'square', 0.12);
      setTimeout(() => playTone(600, 0.1, 'square', 0.12), 60);
      setTimeout(() => playTone(800, 0.15, 'sine', 0.15), 120);
      break;
    case 'blast':
      playNoise(0.3, 0.15);
      playTone(120, 0.3, 'sawtooth', 0.1);
      break;
    case 'mismatch':
      playTone(200, 0.15, 'sawtooth', 0.12);
      setTimeout(() => playTone(150, 0.2, 'sawtooth', 0.1), 100);
      break;
    case 'shrink':
      playTone(80, 0.5, 'sine', 0.08);
      break;
    case 'powerup':
      playTone(500, 0.1, 'sine', 0.1);
      setTimeout(() => playTone(700, 0.1, 'sine', 0.1), 80);
      setTimeout(() => playTone(900, 0.15, 'sine', 0.12), 160);
      break;
    case 'combo':
      playTone(1000, 0.08, 'sine', 0.08);
      break;
  }
}
