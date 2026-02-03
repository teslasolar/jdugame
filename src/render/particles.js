const pool = [];
const MAX = 200;

export function spawnParticles(x, y, color, count = 10) {
  for (let i = 0; i < count && pool.length < MAX; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 60 + Math.random() * 140;
    pool.push({
      x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
      life: 0.4 + Math.random() * 0.4, age: 0,
      color, size: 2 + Math.random() * 3
    });
  }
}

export function updateParticles(dt) {
  for (let i = pool.length - 1; i >= 0; i--) {
    const p = pool[i];
    p.age += dt; p.x += p.vx * dt; p.y += p.vy * dt;
    p.vx *= 0.96; p.vy *= 0.96;
    if (p.age >= p.life) pool.splice(i, 1);
  }
}

export function drawParticles(ctx) {
  for (const p of pool) {
    const a = 1 - p.age / p.life;
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  }
  ctx.globalAlpha = 1;
}
