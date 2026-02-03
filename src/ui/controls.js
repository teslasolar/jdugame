export function showControlHints(ctx, w, h, isGamepad) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#444';
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  if (isGamepad) {
    ctx.fillText('LS:Move  RS:Aim  A:Select  B:Blast  Y:Chat', w / 2, h - 12);
  } else {
    ctx.fillText('WASD:Move  Mouse:Aim  LClick:Select  RClick/Space:Blast  Enter:Chat  Esc:Cancel', w / 2, h - 12);
  }
  ctx.restore();
}
