#!/usr/bin/env node
// Test runner - imports mock DOM then all test suites
import './mock-dom.js';
import { summary } from './harness.js';

// Core tests
console.log('\n\x1b[1m[core]\x1b[0m');
await import('./core/seed.test.js');
await import('./core/config.test.js');
await import('./core/state.test.js');
await import('./core/clock.test.js');
await import('./core/loop.test.js');

// Game tests
console.log('\n\x1b[1m[game]\x1b[0m');
await import('./game/patterns.test.js');
await import('./game/blocks.test.js');
await import('./game/score.test.js');
await import('./game/compress.test.js');
await import('./game/combo.test.js');
await import('./game/energy.test.js');
await import('./game/select.test.js');
await import('./game/noise.test.js');
await import('./game/shrink.test.js');
await import('./game/player.test.js');
await import('./game/round.test.js');
await import('./game/modes.test.js');

// Net tests
console.log('\n\x1b[1m[net]\x1b[0m');
await import('./net/room.test.js');

// Render tests
console.log('\n\x1b[1m[render]\x1b[0m');
await import('./render/camera.test.js');
await import('./render/particles.test.js');

// Input tests
console.log('\n\x1b[1m[input]\x1b[0m');
await import('./input/state.test.js');

// UI tests
console.log('\n\x1b[1m[ui]\x1b[0m');
await import('./ui/toast.test.js');

// Summary
const result = summary();
process.exit(result.failed > 0 ? 1 : 0);
