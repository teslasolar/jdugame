import { getProvider, getDoc } from './init.js';

let onStatusCb = null;

export function onStatusChange(cb) { onStatusCb = cb; }

export function setupStatusEvents() {
  const prov = getProvider();
  if (!prov) return;
  prov.on('synced', (synced) => {
    if (onStatusCb) onStatusCb({ type: 'synced', synced });
  });
  prov.on('peers', (peers) => {
    if (onStatusCb) onStatusCb({ type: 'peers', peers });
  });
}

export function getNetStatus() {
  const prov = getProvider();
  if (!prov) return { connected: false, peerCount: 0 };
  const connected = prov.connected;
  let peerCount = 0;
  try {
    if (prov.room && prov.room.webrtcConns) {
      peerCount = prov.room.webrtcConns.size;
    }
    if (peerCount === 0 && prov.room && prov.room.bcConns) {
      peerCount = prov.room.bcConns.size;
    }
  } catch (e) { /* y-webrtc internals may vary */ }
  if (peerCount === 0) {
    const doc = getDoc();
    if (doc) {
      const map = doc.getMap('players');
      peerCount = Math.max(0, map.size - 1);
    }
  }
  return { connected, peerCount };
}
