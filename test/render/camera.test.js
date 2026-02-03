import { describe, it, assert, assertClose, assertEqual } from '../harness.js';
import { updateCamera, worldToScreen, screenToWorld, getCam } from '../../src/render/camera.js';

describe('camera', () => {
  it('getCam returns object with x and y', () => {
    const cam = getCam();
    assert(typeof cam.x === 'number', 'x should be a number');
    assert(typeof cam.y === 'number', 'y should be a number');
  });

  it('worldToScreen returns object with x and y', () => {
    const s = worldToScreen(100, 200);
    assert(typeof s.x === 'number', 'x should be a number');
    assert(typeof s.y === 'number', 'y should be a number');
  });

  it('worldToScreen and screenToWorld are inverse operations', () => {
    const wx = 150, wy = 250;
    const s = worldToScreen(wx, wy);
    const w = screenToWorld(s.x, s.y);
    assertClose(w.x, wx, 0.01, 'x round-trip failed');
    assertClose(w.y, wy, 0.01, 'y round-trip failed');
  });

  it('updateCamera does not throw', () => {
    updateCamera(400, 300, 800, 600);
  });
});
