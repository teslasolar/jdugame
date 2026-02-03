const toasts = [];

export function showToast(msg, color = '#eee') {
  toasts.push({ msg, color, born: Date.now() });
  if (toasts.length > 5) toasts.shift();
}

export function drawToasts(ctx, w) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'center';
  const now = Date.now();
  for (let i = toasts.length - 1; i >= 0; i--) {
    const t = toasts[i];
    const age = (now - t.born) / 1000;
    if (age > 3) { toasts.splice(i, 1); continue; }
    const alpha = age < 2.5 ? 1 : 1 - (age - 2.5) / 0.5;
    const y = 90 + (toasts.length - 1 - i) * 22;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = t.color;
    ctx.fillText(t.msg, w / 2, y);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}
