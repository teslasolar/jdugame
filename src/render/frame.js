import { clearFrame, drawGrid } from './clear.js';
import { updateCamera, applyCamera, worldToScreen } from './camera.js';
import { drawBoundary } from './boundary.js';
import { drawBlocks } from './blocks.js';
import { drawPlayer, drawCrosshair } from './player.js';
import { drawParticles, updateParticles } from './particles.js';
import { applyShake, drawFlash } from './effects.js';
import { drawHud } from './hud.js';
import { drawChat } from './chat.js';
import { drawLeaderboard } from './leaderboard.js';
import { drawDictionary } from './dictionary.js';

export function renderFrame(ctx, canvas, state, dt) {
  const w = canvas.width, h = canvas.height;
  clearFrame(ctx, w, h);
  updateParticles(dt);
  updateCamera(state.player.x, state.player.y, w, h);
  ctx.save();
  applyShake(ctx);
  applyCamera(ctx);
  drawGrid(ctx, state.arenaW, state.arenaH);
  drawBoundary(ctx, state.arenaW, state.arenaH, state.elapsed);
  drawBlocks(ctx, state.blocks, state.selected, state.player.x, state.player.y);
  for (const rp of Object.values(state.remotePlayers)) {
    drawPlayer(ctx, rp, false);
  }
  drawPlayer(ctx, state.player, true);
  drawCrosshair(ctx, state.player.x, state.player.y, state.aimX, state.aimY);
  drawParticles(ctx);
  ctx.restore();
  drawFlash(ctx, w, h);
  drawHud(ctx, state, w);
  drawLeaderboard(ctx, state, w);
  drawChat(ctx, state.chatMessages, h);
  drawDictionary(ctx, state.dictionary, h);
  if (state.phase === 'countdown') {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#00ff88';
    ctx.font = 'bold 64px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(Math.ceil(state.countdown), w / 2, h / 2);
    ctx.restore();
  }
}
