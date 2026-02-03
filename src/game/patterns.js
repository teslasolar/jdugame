import { CFG } from '../core/config.js';

const PATTERNS = [
  { seq: 'AAAA', rarity: 1, weight: 20 },
  { seq: 'AABB', rarity: 2, weight: 16 },
  { seq: 'ABAB', rarity: 3, weight: 12 },
  { seq: 'ABBA', rarity: 3, weight: 12 },
  { seq: 'ABCD', rarity: 5, weight: 6 },
  { seq: 'AABBA', rarity: 4, weight: 8 },
  { seq: 'ABCBA', rarity: 6, weight: 4 },
  { seq: 'ABCABC', rarity: 7, weight: 3 },
  { seq: 'AABBCC', rarity: 5, weight: 6 },
  { seq: 'ABABAB', rarity: 4, weight: 8 },
];

export function pickPattern(rng) {
  const total = PATTERNS.reduce((s, p) => s + p.weight, 0);
  let r = rng() * total;
  for (const p of PATTERNS) {
    r -= p.weight; if (r <= 0) return p;
  }
  return PATTERNS[0];
}

export function getColor(pattern) {
  const i = pattern.charCodeAt(0) - 65;
  return CFG.COLORS[i % CFG.COLORS.length];
}

export function getRarity(seq) {
  const p = PATTERNS.find(p => p.seq === seq);
  return p ? p.rarity : 1;
}
