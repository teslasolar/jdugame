import { getDoc } from './init.js';

export function syncScore(playerId, score) {
  const doc = getDoc();
  if (!doc) return;
  const map = doc.getMap('leaderboard');
  map.set(playerId, score);
}

export function getScores() {
  const doc = getDoc();
  if (!doc) return {};
  const map = doc.getMap('leaderboard');
  const scores = {};
  map.forEach((val, key) => { scores[key] = val; });
  return scores;
}
