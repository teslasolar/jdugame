import { CFG } from '../core/config.js';

export function drawBlocks(ctx, blocks, selected, px, py) {
  const sr2 = CFG.SCAN_R * CFG.SCAN_R;
  for (const b of blocks) {
    if (!b.alive) continue;
    const dx = b.x - px, dy = b.y - py;
    const inRange = dx * dx + dy * dy < sr2;
    const isSel = selected.includes(b.id);
    ctx.fillStyle = isSel ? '#fff' : (inRange ? b.color : b.color + '66');
    ctx.fillRect(b.x - CFG.BLOCK_SIZE / 2, b.y - CFG.BLOCK_SIZE / 2,
      CFG.BLOCK_SIZE, CFG.BLOCK_SIZE);
    if (inRange) {
      ctx.fillStyle = '#0a0a1a';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(b.pattern, b.x, b.y + 4);
    }
    if (isSel) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(b.x - CFG.BLOCK_SIZE / 2 - 2, b.y - CFG.BLOCK_SIZE / 2 - 2,
        CFG.BLOCK_SIZE + 4, CFG.BLOCK_SIZE + 4);
    }
  }
}
