export function drawLeaderboard(ctx, state, w) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const entries = [];
  entries.push({ name: state.player.name, score: state.score, me: true });
  for (const [, rp] of Object.entries(state.remotePlayers)) {
    entries.push({ name: rp.name, score: rp.score || 0, me: false });
  }
  entries.sort((a, b) => b.score - a.score);
  const top = entries.slice(0, 5);
  ctx.font = '11px monospace';
  ctx.textAlign = 'right';
  const x = w - 16;
  let y = 90;
  ctx.fillStyle = '#555';
  ctx.fillText('LEADERBOARD', x, y); y += 16;
  for (const e of top) {
    ctx.fillStyle = e.me ? '#00ff88' : '#888';
    ctx.fillText(`${e.name} ${e.score}`, x, y);
    y += 14;
  }
  ctx.restore();
}
