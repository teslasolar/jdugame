import { describe, it, assert, assertEqual } from '../harness.js';
import { hasEnergy, useEnergy } from '../../src/game/energy.js';
import { CFG } from '../../src/core/config.js';

describe('energy', () => {
  it('hasEnergy returns false when energy < BLAST_COST', () => {
    assertEqual(hasEnergy({ energy: CFG.BLAST_COST - 1 }), false);
  });
  it('hasEnergy returns true when energy >= BLAST_COST', () => {
    assertEqual(hasEnergy({ energy: CFG.BLAST_COST }), true);
    assertEqual(hasEnergy({ energy: CFG.BLAST_COST + 50 }), true);
  });
  it('useEnergy reduces energy by BLAST_COST', () => {
    const s = { energy: CFG.BLAST_COST + 20 };
    useEnergy(s);
    assertEqual(s.energy, 20);
  });
  it('useEnergy does not go below 0', () => {
    const s = { energy: 10 };
    useEnergy(s);
    assertEqual(s.energy, 0);
  });
});
