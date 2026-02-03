import { describe, it, assert } from '../harness.js';
import { spawnParticles, updateParticles, drawParticles } from '../../src/render/particles.js';

const mockCtx = { globalAlpha: 1, fillStyle: '', fillRect: () => {} };

describe('particles', () => {
  it('spawnParticles does not throw', () => {
    spawnParticles(100, 100, '#ff0', 5);
  });

  it('updateParticles does not throw', () => {
    updateParticles(0.016);
  });

  it('drawParticles with mock ctx does not throw', () => {
    drawParticles(mockCtx);
    assert(mockCtx.globalAlpha === 1, 'globalAlpha should be reset to 1');
  });
});
