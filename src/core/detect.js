export const caps = {
  gamepad: 'getGamepads' in navigator,
  webrtc: !!window.RTCPeerConnection,
  audio: !!(window.AudioContext || window.webkitAudioContext),
  sw: 'serviceWorker' in navigator,
  idb: !!window.indexedDB
};
