import { describe, it, assert } from '../harness.js';
import { startLoop, stopLoop } from '../../src/core/loop.js';

describe('loop', () => {
  it('startLoop is a function', () => {
    assert(typeof startLoop === 'function', 'startLoop must be function');
  });
  it('stopLoop is a function', () => {
    assert(typeof stopLoop === 'function', 'stopLoop must be function');
  });
  it('calling startLoop does not throw', () => {
    let threw = false;
    try { startLoop(() => {}, () => {}); } catch (e) { threw = true; }
    assert(!threw, 'startLoop should not throw');
    stopLoop();
  });
});
