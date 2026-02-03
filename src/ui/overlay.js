let overlayEl = null;

function getOverlay() {
  if (!overlayEl) {
    overlayEl = document.createElement('div');
    overlayEl.id = 'overlay';
    overlayEl.style.cssText = `position:fixed;inset:0;background:rgba(10,10,26,0.85);
      display:none;justify-content:center;align-items:center;z-index:200;
      color:#eee;font-family:monospace;text-align:center;flex-direction:column;gap:12px`;
    document.body.appendChild(overlayEl);
  }
  return overlayEl;
}

export function showOverlay(html) {
  const el = getOverlay();
  el.innerHTML = html;
  el.style.display = 'flex';
}

export function hideOverlay() {
  getOverlay().style.display = 'none';
}

export function isOverlayVisible() {
  return overlayEl && overlayEl.style.display === 'flex';
}
