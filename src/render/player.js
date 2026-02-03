import { CFG } from '../core/config.js';

export function drawPlayer(ctx, p, isLocal) {
  ctx.fillStyle = p.color || '#00ff88';
  ctx.beginPath();
  ctx.arc(p.x, p.y, CFG.PLAYER_R, 0, Math.PI * 2);
  ctx.fill();
  if (isLocal) {
    ctx.strokeStyle = '#ffffff44';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, CFG.SCAN_R, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = '#eee';
  ctx.font = '11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(p.name, p.x, p.y - CFG.PLAYER_R - 6);
}

export function drawCrosshair(ctx, px, py, ax, ay) {
  const d = CFG.SCAN_R * 0.8;
  ctx.strokeStyle = '#ffffff66';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px + ax * d, py + ay * d);
  ctx.stroke();
}
