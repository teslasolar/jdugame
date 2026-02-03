let startTime = 0;

export function resetHintTimer() { startTime = Date.now(); }

export function showControlHints(ctx, w, h, isGamepad) {
  const age = (Date.now() - startTime) / 1000;
  if (age > 20) return;
  const alpha = age < 15 ? 0.7 : Math.max(0, 0.7 - (age - 15) / 5);
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = alpha;
  // Controls bar
  ctx.fillStyle = '#1a1a2ecc';
  ctx.fillRect(0, h - 56, w, 56);
  ctx.fillStyle = '#aaa';
  ctx.font = '11px monospace';
  ctx.textAlign = 'center';
  if (isGamepad) {
    ctx.fillText('LS: Move   RS: Aim   A: Select Block   B: Blast Noise   Y: Chat', w / 2, h - 34);
  } else {
    ctx.fillText('WASD: Move   Mouse: Aim   Left Click: Select Block   Right Click/Space: Blast   Enter: Chat', w / 2, h - 34);
  }
  ctx.fillStyle = '#00ff88';
  ctx.font = 'bold 11px monospace';
  ctx.fillText('Click 2+ matching patterns (same text) to COMPRESS them for points!', w / 2, h - 14);
  ctx.globalAlpha = 1;
  ctx.restore();
}
