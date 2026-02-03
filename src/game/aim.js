import { CFG } from '../core/config.js';
import { screenToWorld } from '../render/camera.js';

export function getAimTarget(state, input, canvas) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const wx = state.player.x + input.aimX * CFG.SCAN_R;
  const wy = state.player.y + input.aimY * CFG.SCAN_R;
  return { x: wx, y: wy };
}
