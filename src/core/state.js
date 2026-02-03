import { CFG } from './config.js';

export function createState() {
  return {
    phase: 'lobby',
    player: {
      x: CFG.ARENA_W / 2, y: CFG.ARENA_H / 2,
      name: 'Player', id: '', color: '#00ff88'
    },
    aimX: 0, aimY: 0,
    score: 0, energy: 0, combo: 0, comboTimer: 0,
    selected: [],
    mode: null, modeTimer: 0,
    dictionary: {},
    blocks: [], powerups: [],
    arenaW: CFG.ARENA_W, arenaH: CFG.ARENA_H,
    elapsed: 0, countdown: CFG.COUNTDOWN,
    remotePlayers: {},
    chatMessages: [], chatActive: false,
    connected: false, peerCount: 0,
    roomCode: '', seed: 0
  };
}

export const state = createState();
