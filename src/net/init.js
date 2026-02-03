import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { getRoomName } from './room.js';

let doc = null;
let provider = null;

const SIGNALING = [
  'wss://signaling.yjs.dev/signaling',
  'wss://y-webrtc-signaling-eu.herokuapp.com/signaling',
  'wss://y-webrtc-signaling-us.herokuapp.com/signaling'
];

export function initNet(roomCode) {
  doc = new Y.Doc();
  const room = getRoomName(roomCode);
  provider = new WebrtcProvider(room, doc, {
    signaling: SIGNALING,
    password: 'compress-arena-v1',
    maxConns: 30,
    filterBcConns: true,
    peerOpts: {
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun.services.mozilla.com' }
        ]
      }
    }
  });
  return { doc, provider };
}

export function getDoc() { return doc; }
export function getProvider() { return provider; }

export function destroyNet() {
  if (provider) { provider.destroy(); provider = null; }
  if (doc) { doc.destroy(); doc = null; }
}
