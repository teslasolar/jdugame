import { getRarity } from './patterns.js';

export function calcScore(pattern, matchCount, state) {
  const rarity = getRarity(pattern);
  let score = rarity * matchCount * matchCount * 10;
  if (state.dictionary[pattern]) score *= 1.5;
  if (state.mode === 'lossy') score *= 0.7;
  if (state.mode === 'lossless') score *= 1.5;
  if (state.combo > 1) score *= (1 + state.combo * 0.5);
  return Math.round(score);
}
