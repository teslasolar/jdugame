import { showOverlay, hideOverlay } from './overlay.js';

export function showEndScreen(state, onReplay, onLobby) {
  const dictCount = Object.keys(state.dictionary).length;
  const html = `
    <h1 style="color:#00ff88;font-size:2rem">ROUND OVER</h1>
    <p style="font-size:1.4rem">Score: <span style="color:#ffcc00">${state.score}</span></p>
    <p>Patterns learned: ${dictCount}</p>
    <p>Best combo: x${state.combo || 0}</p>
    <div style="margin-top:16px;display:flex;gap:12px">
      <button id="btn-replay" style="padding:10px 20px;background:#00ff88;color:#0a0a1a;border:none;border-radius:6px;font-family:monospace;cursor:pointer;font-weight:bold">PLAY AGAIN</button>
      <button id="btn-lobby" style="padding:10px 20px;background:#333;color:#eee;border:none;border-radius:6px;font-family:monospace;cursor:pointer">LOBBY</button>
    </div>
  `;
  showOverlay(html);
  document.getElementById('btn-replay').onclick = () => { hideOverlay(); onReplay(); };
  document.getElementById('btn-lobby').onclick = () => { hideOverlay(); onLobby(); };
}
