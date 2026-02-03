export function clearFrame(ctx, w, h) {
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, w, h);
}

export function drawGrid(ctx, arenaW, arenaH) {
  ctx.strokeStyle = '#151530';
  ctx.lineWidth = 1;
  const step = 80;
  for (let x = 0; x <= arenaW; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0);
    ctx.lineTo(x, arenaH); ctx.stroke();
  }
  for (let y = 0; y <= arenaH; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y);
    ctx.lineTo(arenaW, y); ctx.stroke();
  }
}
