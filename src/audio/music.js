import { getAudioCtx } from './ctx.js';

let playing = false;
let interval = null;

const NOTES = [220, 262, 330, 262, 220, 196, 220, 262];
let idx = 0;

export function startMusic() {
  if (playing) return;
  playing = true;
  interval = setInterval(() => {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = NOTES[idx % NOTES.length];
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.8);
    idx++;
  }, 800);
}

export function stopMusic() {
  playing = false;
  if (interval) { clearInterval(interval); interval = null; }
}
