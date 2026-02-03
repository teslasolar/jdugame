import { CFG } from '../core/config.js';

export function drawBoundary(ctx, arenaW, arenaH, elapsed) {
  const pulse = Math.sin(elapsed * 3) * 0.3 + 0.7;
  const shrinking = arenaW < CFG.ARENA_W;
  ctx.strokeStyle = shrinking
    ? `rgba(233,69,96,${pulse})`
    : '#333';
  ctx.lineWidth = shrinking ? 3 : 1;
  ctx.strokeRect(0, 0, arenaW, arenaH);
  if (shrinking) {
    ctx.fillStyle = `rgba(233,69,96,0.03)`;
    ctx.fillRect(0, 0, arenaW, arenaH);
  }
}
