import { CFG } from '../core/config.js';

export function hasEnergy(state) {
  return state.energy >= CFG.BLAST_COST;
}

export function useEnergy(state) {
  state.energy = Math.max(0, state.energy - CFG.BLAST_COST);
}
