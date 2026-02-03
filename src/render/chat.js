import { CFG } from '../core/config.js';

export function drawChat(ctx, messages, h) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const recent = messages.slice(-CFG.CHAT_MAX);
  const startY = h - 60;
  ctx.font = '12px monospace';
  ctx.textAlign = 'left';
  for (let i = recent.length - 1; i >= 0; i--) {
    const msg = recent[i];
    const y = startY - (recent.length - 1 - i) * 16;
    if (y < 100) break;
    const age = (Date.now() - msg.ts) / 1000;
    const alpha = age < 10 ? 1 : Math.max(0, 1 - (age - 10) / 5);
    if (alpha <= 0) continue;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = msg.color || '#888';
    ctx.fillText(`${msg.sender}: `, 16, y);
    const nw = ctx.measureText(`${msg.sender}: `).width;
    ctx.fillStyle = '#eee';
    ctx.fillText(msg.text, 16 + nw, y);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}
