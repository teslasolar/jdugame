// Minimal DOM mocks for importing src modules in Node
const noop = () => {};
const mockEl = {
  style: {}, innerHTML: '', value: '', textContent: '',
  addEventListener: noop, removeEventListener: noop,
  focus: noop, blur: noop, click: noop,
  appendChild: noop, getContext: () => mockCtx,
  querySelectorAll: () => [], querySelector: () => mockEl,
  getBoundingClientRect: () => ({ x: 0, y: 0, width: 800, height: 600 })
};
const mockCtx = {
  save: noop, restore: noop, setTransform: noop,
  fillRect: noop, strokeRect: noop, clearRect: noop,
  beginPath: noop, moveTo: noop, lineTo: noop, arc: noop,
  fill: noop, stroke: noop, fillText: noop,
  translate: noop, measureText: () => ({ width: 10 }),
  createLinearGradient: () => ({ addColorStop: noop }),
  fillStyle: '', strokeStyle: '', lineWidth: 1,
  font: '', textAlign: '', globalAlpha: 1
};

function safeSet(obj, key, value) {
  try { obj[key] = value; } catch {
    Object.defineProperty(obj, key, { value, writable: true, configurable: true });
  }
}

safeSet(globalThis, 'window', globalThis);
safeSet(globalThis, 'document', {
  getElementById: () => mockEl,
  createElement: () => mockEl,
  body: { appendChild: noop }
});
safeSet(globalThis, 'navigator', {
  getGamepads: () => [],
  serviceWorker: { register: () => Promise.resolve() }
});
safeSet(globalThis, 'localStorage', {
  getItem: noop, setItem: noop, removeItem: noop, length: 0, key: noop
});
safeSet(globalThis, 'location', { hash: '', origin: 'http://test', pathname: '/' });
safeSet(globalThis, 'requestAnimationFrame', noop);
safeSet(globalThis, 'performance', { now: () => Date.now() });
safeSet(globalThis, 'AudioContext', undefined);
safeSet(globalThis, 'webkitAudioContext', undefined);
safeSet(globalThis, 'RTCPeerConnection', undefined);
safeSet(globalThis, 'crypto', { randomUUID: () => 'test-uuid-1234', getRandomValues: (a) => a });
safeSet(globalThis, 'indexedDB', {
  open: () => ({
    onupgradeneeded: null, onsuccess: null, onerror: null,
    result: { createObjectStore: noop, transaction: () => ({
      objectStore: () => ({ get: () => ({ onsuccess: null, onerror: null }), put: noop }),
      oncomplete: null, onerror: null
    })}
  })
});
safeSet(globalThis, 'caches', { open: () => Promise.resolve({ addAll: noop, put: noop, match: noop }) });
safeSet(globalThis, 'fetch', () => Promise.resolve({ clone: () => ({}) }));
globalThis.setInterval = globalThis.setInterval || noop;
globalThis.clearInterval = globalThis.clearInterval || noop;
globalThis.setTimeout = globalThis.setTimeout || ((fn, ms) => fn());
