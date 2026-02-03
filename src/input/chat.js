const chatEl = document.getElementById('chat-input');
let onSendCb = null;

export function initChatInput(onSend) {
  onSendCb = onSend;
  chatEl.addEventListener('keydown', e => {
    e.stopPropagation();
    if (e.code === 'Enter' && chatEl.value.trim()) {
      onSendCb(chatEl.value.trim());
      chatEl.value = '';
      hideChatInput();
    }
    if (e.code === 'Escape') hideChatInput();
  });
}

export function showChatInput() {
  chatEl.style.display = 'block';
  chatEl.focus();
}

export function hideChatInput() {
  chatEl.style.display = 'none';
  chatEl.blur();
}

export function isChatOpen() {
  return chatEl.style.display === 'block';
}
