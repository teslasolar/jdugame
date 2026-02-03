import { caps } from './core/detect.js';
import { state, createState } from './core/state.js';
import { startLoop } from './core/loop.js';
import { createRng, codeToSeed } from './core/seed.js';
import { setShrinkCallback } from './core/clock.js';
import { initCanvas, showCanvas, canvas, ctx } from './render/canvas.js';
import { initKeyboard } from './input/keyboard.js';
import { initMouse } from './input/mouse.js';
import { initChatInput } from './input/chat.js';
import { initLobby, hideLobby, showLobby } from './ui/lobby.js';
import { showEndScreen } from './ui/endscreen.js';
import { drawToasts, showToast } from './ui/toast.js';
import { showControlHints, resetHintTimer } from './ui/controls.js';
import { gamepadActive } from './input/gamepad.js';
import { renderFrame } from './render/frame.js';
import { update } from './game/update.js';
import { generateArena } from './game/arena.js';
import { startRound } from './game/round.js';
import { initNet, destroyNet } from './net/init.js';
import { syncLocalPlayer, observePlayers } from './net/players.js';
import { initChat, sendChat } from './net/chat.js';
import { syncScore } from './net/leaderboard.js';
import { getNetStatus, setupStatusEvents, onStatusChange } from './net/status.js';
import { getIdentity } from './net/identity.js';
import { playSfx } from './audio/sfx.js';
import { startMusic } from './audio/music.js';

initCanvas();
initKeyboard();
initMouse(canvas);

let syncTimer = 0;

function gameUpdate(dt) {
  if (state.phase === 'lobby' || state.phase === 'ended') return;
  update(state, canvas, dt);
  syncTimer += dt;
  if (syncTimer > 0.1) {
    syncTimer = 0;
    syncLocalPlayer(state);
    syncScore(state.player.id, state.score);
    const ns = getNetStatus();
    state.connected = ns.connected;
    state.peerCount = ns.peerCount;
  }
  if (state.phase === 'ended') {
    showEndScreen(state, replay, goLobby);
  }
}

function gameRender(dt) {
  if (state.phase === 'lobby') return;
  renderFrame(ctx, canvas, state, dt);
  showControlHints(ctx, canvas.width, canvas.height, gamepadActive);
  drawToasts(ctx, canvas.width);
}

async function startGame(name, roomCode) {
  Object.assign(state, createState());
  state.player.name = name;
  state.roomCode = roomCode;
  state.seed = codeToSeed(roomCode);
  // Await identity so it's ready before any net sync
  const id = await getIdentity();
  state.player.id = id;
  state.player.color = '#' + id.slice(1, 4).split('').map(
    c => c.charCodeAt(0).toString(16).padStart(2, '0')
  ).join('').slice(0, 6).padEnd(6, 'f');
  const rng = createRng(state.seed);
  state.blocks = generateArena(rng);
  startRound(state);
  hideLobby();
  showCanvas();
  try {
    initNet(roomCode);
    setupStatusEvents();
    onStatusChange(evt => {
      if (evt.type === 'peers') {
        const count = evt.peers ? evt.peers.size || 0 : 0;
        if (count > 0) showToast(`${count} player${count > 1 ? 's' : ''} online`, '#00ff88');
      }
    });
    observePlayers(state);
    initChat(msg => {
      // Skip echo of own messages (we add them locally already)
      if (msg.sender === state.player.name) {
        const age = Date.now() - msg.ts;
        if (age < 2000) return;
      }
      state.chatMessages.push(msg);
    });
    state.connected = true;
    showToast('CONNECTED - click matching patterns!', '#00ff88');
  } catch (e) {
    showToast('Offline mode - playing solo', '#e94560');
  }
  resetHintTimer();
  startMusic();
}

function replay() {
  const rng = createRng(state.seed);
  state.blocks = generateArena(rng);
  startRound(state);
}

function goLobby() {
  destroyNet();
  state.phase = 'lobby';
  canvas.style.display = 'none';
  showLobby();
}

initChatInput(text => {
  sendChat(state.player.name, text, state.player.color);
  state.chatMessages.push({
    sender: state.player.name, text,
    color: state.player.color, ts: Date.now()
  });
});

setShrinkCallback(() => {
  showToast('ARENA SHRINKING!', '#e94560');
  playSfx('shrink');
});

initLobby((name, code) => startGame(name, code));
startLoop(gameUpdate, gameRender);

if (caps.sw) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
