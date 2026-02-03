export const input = {
  moveX: 0, moveY: 0,
  aimX: 0, aimY: 0,
  select: false, selectDown: false,
  blast: false, blastDown: false,
  chat: false, chatDown: false,
  cancel: false, cancelDown: false,
  pause: false
};

export function clearPresses() {
  input.selectDown = false;
  input.blastDown = false;
  input.chatDown = false;
  input.cancelDown = false;
}
