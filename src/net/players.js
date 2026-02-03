import { getDoc, getProvider } from './init.js';

export function syncLocalPlayer(state) {
  const doc = getDoc();
  if (!doc) return;
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
  map.observe(() => {
    const remote = {};
    map.forEach((val, key) => {
      if (key !== state.player.id) remote[key] = val;
    });
    state.remotePlayers = remote;
  });
}

export function getPeerCount() {
  const prov = getProvider();
  if (!prov) return 0;
  return prov.connected ? Math.max(1, Object.keys(prov.room?.peerId ? {} : {}).length) : 0;
}
