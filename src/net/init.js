import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { getRoomName } from './room.js';

let doc = null;
let provider = null;

export function initNet(roomCode, password) {
  doc = new Y.Doc();
  const room = getRoomName(roomCode);
  provider = new WebrtcProvider(room, doc, {
    signaling: ['wss://signaling.yjs.dev/signaling'],
    password: password || roomCode,
    maxConns: 20
  });
  return { doc, provider };
}

export function getDoc() { return doc; }
export function getProvider() { return provider; }

export function destroyNet() {
  if (provider) { provider.destroy(); provider = null; }
  if (doc) { doc.destroy(); doc = null; }
}
