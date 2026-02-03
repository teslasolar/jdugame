import { CFG } from '../core/config.js';

export function drawHud(ctx, state, w) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#eee';
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`SCORE: ${state.score}`, 16, 30);
  if (state.combo > 1) {
    ctx.fillStyle = '#ffcc00';
    ctx.fillText(`COMBO x${state.combo}`, 16, 54);
  }
  const timeLeft = Math.max(0, CFG.ROUND_TIME - state.elapsed);
  ctx.fillStyle = timeLeft < 30 ? '#e94560' : '#888';
  ctx.textAlign = 'right';
  ctx.fillText(`${Math.ceil(timeLeft)}s`, w - 16, 30);
  // Energy bar
  const bw = 120, bh = 10, bx = w - bw - 16, by = 40;
  ctx.fillStyle = '#222'; ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle = '#00ff88';
  ctx.fillRect(bx, by, bw * (state.energy / CFG.ENERGY_MAX), bh);
  if (state.mode) {
    ctx.fillStyle = state.mode === 'lossy' ? '#ff6b35' : '#4e9af1';
    ctx.textAlign = 'center';
    ctx.fillText(state.mode.toUpperCase(), w / 2, 30);
  }
  ctx.fillStyle = state.connected ? '#00ff88' : '#e94560';
  ctx.font = '11px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(
    state.connected ? `${state.peerCount} peer${state.peerCount !== 1 ? 's' : ''}` : 'OFFLINE',
    w - 16, 66
  );
  ctx.restore();
}
