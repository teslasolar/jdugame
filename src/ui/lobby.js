const lobbyEl = document.getElementById('lobby');
const nameEl = document.getElementById('player-name');
const playBtn = document.getElementById('btn-play');
const hintEl = document.getElementById('controls-hint');

const GLOBAL_ROOM = 'GLOBAL';

export function initLobby(onJoin) {
  playBtn.addEventListener('click', () => {
    const name = nameEl.value.trim() || 'Anon';
    onJoin(name, GLOBAL_ROOM);
  });
  nameEl.addEventListener('keydown', e => {
    if (e.code === 'Enter') playBtn.click();
  });
  const gp = navigator.getGamepads ? 'Gamepad or Keyboard' : 'Keyboard + Mouse';
  hintEl.textContent = gp;
}

export function hideLobby() { lobbyEl.style.display = 'none'; }
export function showLobby() { lobbyEl.style.display = 'flex'; }
