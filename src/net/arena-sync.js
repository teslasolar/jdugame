import { getDoc } from './init.js';

export function broadcastEvent(evt) {
  const doc = getDoc();
  if (!doc) return;
  const arr = doc.getArray('events');
  arr.push([{ ...evt, ts: Date.now() }]);
}

export function observeEvents(callback) {
  const doc = getDoc();
  if (!doc) return;
  const arr = doc.getArray('events');
  arr.observe(evt => {
    evt.changes.added.forEach(item => {
      item.content.getContent().forEach(e => callback(e));
    });
  });
}
