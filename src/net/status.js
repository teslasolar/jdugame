import { getProvider } from './init.js';

export function getNetStatus() {
  const prov = getProvider();
  if (!prov) return { connected: false, peerCount: 0 };
  const connected = prov.connected;
  let peerCount = 0;
  if (prov.room && prov.room.webrtcConns) {
    peerCount = prov.room.webrtcConns.size;
  }
  return { connected, peerCount };
}
