import { describe, it, assert } from '../harness.js';
import { showToast, drawToasts } from '../../src/ui/toast.js';

const mockCtx = {
  save:()=>{}, restore:()=>{}, setTransform:()=>{}, fillText:()=>{},
  globalAlpha:1, font:'', textAlign:'', fillStyle:''
};

describe('toast', () => {
  it('showToast does not throw', () => {
    let err = null;
    try { showToast('hello'); } catch (e) { err = e; }
    assert(err === null, 'showToast threw: ' + err);
  });
  it('drawToasts with mock ctx does not throw', () => {
    let err = null;
    try { drawToasts(mockCtx, 800); } catch (e) { err = e; }
    assert(err === null, 'drawToasts threw: ' + err);
  });
  it('calling showToast multiple times does not throw', () => {
    let err = null;
    try {
      for (let i = 0; i < 10; i++) showToast('msg' + i);
    } catch (e) { err = e; }
    assert(err === null, 'multiple showToast threw: ' + err);
  });
});
