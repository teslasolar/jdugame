import { codeToSeed } from '../core/seed.js';

export function createRoomCode() {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  let c = '';
  for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

export function validateCode(code) {
  return /^[A-Z]{2,6}$/.test(code);
}

export function getRoomName(code) {
  return `compress-arena-${code}`;
}

export { codeToSeed };
