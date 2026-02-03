import { getDoc } from './init.js';

const STALE_MS = 10000;

export function syncLocalPlayer(state) {
  const doc = getDoc();
  if (!doc || !state.player.id) return;
  const map = doc.getMap('players');
  map.set(state.player.id, {
    name: state.player.name,
    x: state.player.x, y: state.player.y,
    color: state.player.color,
    score: state.score,
    ts: Date.now()
  });
}

export function observePlayers(state) {
  const doc = getDoc();
  if (!doc) return;
  const map = doc.getMap('players');
  map.observe(() => updateRemote(state, map));
}

function updateRemote(state, map) {
  const now = Date.now();
  const remote = {};
  map.forEach((val, key) => {
    if (key === state.player.id) return;
    if (now - val.ts > STALE_MS) return;
    remote[key] = val;
  });
  state.remotePlayers = remote;
}
