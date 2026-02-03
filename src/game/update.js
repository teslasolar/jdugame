import { pollInput } from '../input/poll.js';
import { input } from '../input/state.js';
import { isChatOpen, showChatInput, hideChatInput } from '../input/chat.js';
import { updatePlayer } from './player.js';
import { updateBlocks } from './blocks.js';
import { trySelect } from './select.js';
import { tryCompress } from './compress.js';
import { tryBlast } from './blast.js';
import { updateCombo } from './combo.js';
import { updateModes } from './modes.js';
import { updatePowerups, tryPickup } from './powerup.js';
import { updateRound } from './round.js';
import { tickClock } from '../core/clock.js';
import { applyShrink } from './shrink.js';
import { worldToScreen } from '../render/camera.js';

export function update(state, canvas, dt) {
  const ps = worldToScreen(state.player.x, state.player.y);
  pollInput(ps.x, ps.y);
  if (input.chatDown && !isChatOpen()) { showChatInput(); return; }
  if (isChatOpen()) return;
  if (input.cancelDown) { state.selected = []; return; }
  if (state.phase === 'countdown') { updateRound(state, dt); return; }
  if (state.phase !== 'playing') return;
  updatePlayer(state, input, dt);
  updateBlocks(state.blocks, dt, state.arenaW, state.arenaH);
  const sel = trySelect(state, input);
  if (sel === 'mismatch') { state.selected = []; state.combo = 0; }
  if (state.selected.length >= 2 && sel === 'selected') tryCompress(state);
  tryBlast(state, input);
  updateCombo(state, dt);
  updateModes(state, dt);
  updatePowerups(state, dt);
  tryPickup(state);
  tickClock(state, dt);
  applyShrink(state);
  updateRound(state, dt);
}
