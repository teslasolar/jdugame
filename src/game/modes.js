export function updateModes(state, dt) {
  if (state.mode && state.modeTimer > 0) {
    state.modeTimer -= dt;
    if (state.modeTimer <= 0) {
      state.mode = null;
      state.modeTimer = 0;
    }
  }
}
