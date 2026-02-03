let shakeAmt = 0;
let flashAmt = 0;
let flashColor = '#fff';

export function triggerShake(intensity = 6) {
  shakeAmt = intensity;
}

export function triggerFlash(color = '#fff', intensity = 0.3) {
  flashColor = color;
  flashAmt = intensity;
}

export function applyShake(ctx) {
  if (shakeAmt > 0.5) {
    const ox = (Math.random() - 0.5) * shakeAmt * 2;
    const oy = (Math.random() - 0.5) * shakeAmt * 2;
    ctx.translate(ox, oy);
    shakeAmt *= 0.85;
  } else {
    shakeAmt = 0;
  }
}

export function drawFlash(ctx, w, h) {
  if (flashAmt > 0.01) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = flashAmt;
    ctx.fillStyle = flashColor;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
    ctx.restore();
    flashAmt *= 0.88;
  }
}
