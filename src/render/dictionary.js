export function drawDictionary(ctx, dictionary, h) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const entries = Object.entries(dictionary);
  if (!entries.length) { ctx.restore(); return; }
  entries.sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 8);
  ctx.font = '10px monospace';
  ctx.textAlign = 'left';
  let y = h - 140;
  ctx.fillStyle = '#444';
  ctx.fillText('DICTIONARY', 16, y); y += 14;
  for (const [pat, count] of top) {
    ctx.fillStyle = '#555';
    ctx.fillText(`${pat} x${count}`, 16, y);
    y += 12;
  }
  ctx.restore();
}
