import { CFG } from '../core/config.js';

export function trySelect(state, input) {
  if (!input.selectDown) return null;
  const aim = {
    x: state.player.x + state.aimX * CFG.SCAN_R * 0.5,
    y: state.player.y + state.aimY * CFG.SCAN_R * 0.5
  };
  let best = null, bestD = CFG.BLOCK_SIZE * 2;
  for (const b of state.blocks) {
    if (!b.alive) continue;
    const dx = b.x - aim.x, dy = b.y - aim.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const inRange = Math.hypot(b.x - state.player.x, b.y - state.player.y) < CFG.SCAN_R;
    if (d < bestD && inRange) { best = b; bestD = d; }
  }
  if (!best) return null;
  if (state.selected.includes(best.id)) return null;
  if (state.selected.length > 0) {
    const first = state.blocks.find(b => b.id === state.selected[0]);
    const match = state.mode === 'lossy'
      ? fuzzyMatch(first.pattern, best.pattern)
      : first.pattern === best.pattern;
    if (!match) return 'mismatch';
  }
  state.selected.push(best.id);
  return 'selected';
}

function fuzzyMatch(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff++;
  return diff <= 1;
}
