import { getDoc } from './init.js';

let chatCb = null;

export function initChat(callback) {
  chatCb = callback;
  const doc = getDoc();
  if (!doc) return;
  const arr = doc.getArray('chat');
  arr.observe(evt => {
    evt.changes.added.forEach(item => {
      item.content.getContent().forEach(msg => {
        if (chatCb) chatCb(msg);
      });
    });
  });
}

export function sendChat(sender, text, color) {
  const doc = getDoc();
  if (!doc) return;
  const arr = doc.getArray('chat');
  arr.push([{ sender, text, color, ts: Date.now() }]);
}
