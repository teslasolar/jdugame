const lobbyEl = document.getElementById('lobby');
const nameEl = document.getElementById('player-name');
const codeEl = document.getElementById('room-code');
const joinBtn = document.getElementById('btn-join');
const createBtn = document.getElementById('btn-create');
const hintEl = document.getElementById('controls-hint');

export function initLobby(onJoin) {
  const go = (code) => {
    const name = nameEl.value.trim() || 'Anon';
    onJoin(name, code.toUpperCase());
  };
  joinBtn.addEventListener('click', () => {
    const c = codeEl.value.trim().toUpperCase();
    if (c.length >= 2) go(c);
  });
  createBtn.addEventListener('click', () => {
    const code = randomCode();
    codeEl.value = code;
    go(code);
  });
  codeEl.addEventListener('keydown', e => {
    if (e.code === 'Enter') joinBtn.click();
  });
  hintEl.textContent = navigator.getGamepads
    ? 'Gamepad or Keyboard supported'
    : 'Keyboard + Mouse';
}

export function hideLobby() { lobbyEl.style.display = 'none'; }
export function showLobby() { lobbyEl.style.display = 'flex'; }

function randomCode() {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  let c = '';
  for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}
