import { idbGet, idbSet } from '../store/idb.js';

export async function getIdentity() {
  let id = await idbGet('player-id');
  if (!id) {
    id = 'P' + Math.random().toString(36).slice(2, 8).toUpperCase();
    await idbSet('player-id', id);
  }
  return id;
}
