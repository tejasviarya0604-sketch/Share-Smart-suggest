(() => {
  const desktop = document.getElementById('desktop-icons');
  const icons = [...desktop.querySelectorAll('.d-icon')];
  const selected = new Set();
  let selectionAnchor = null;
  let marquee = null;
  let suppressClick = false;
  const selectionBox = document.createElement('div');
  selectionBox.className = 'desktop-selection-box';
  selectionBox.setAttribute('aria-hidden', 'true');
  selectionBox.hidden = true;
  desktop.append(selectionBox);
  function setSelected(icon, value) {
    icon.classList.toggle('selected', value);
    icon.setAttribute('aria-selected', String(value));
    if (value) selected.add(icon);
    else selected.delete(icon);
  }
  function clearSelection() {
    [...selected].forEach(icon => setSelected(icon, false));
  }
  function selectIcon(icon, event) {
    if (event.shiftKey && selectionAnchor) {
      const start = icons.indexOf(selectionAnchor);
      const end = icons.indexOf(icon);
      if (!event.ctrlKey && !event.metaKey) clearSelection();
      icons.slice(Math.min(start, end), Math.max(start, end) + 1).forEach(item => setSelected(item, true));
    } else {
      if (event.ctrlKey || event.metaKey) {
        setSelected(icon, !selected.has(icon));
      } else {
        clearSelection();
        setSelected(icon, true);
      }
      selectionAnchor = icon;
    }
  }
  function showFileMenu(icon, x, y) {
    if (icon.dataset.type === 'app') return;
    if (!selected.has(icon)) {
      clearSelection();
      setSelected(icon, true);
      selectionAnchor = icon;
    }
    const files = icons.filter(item => selected.has(item) && item.dataset.type !== 'app').map(item => {
      const thumb = item.querySelector('.img-file-thumb');
      const match = thumb ? thumb.style.backgroundImage.match(/^url\(["']?(.*?)["']?\)$/) : null;
      return {
        name: item.querySelector('span:last-child').textContent.trim(),
        preview: item.dataset.preview || (match ? match[1] : null),
        thumbnail: item.dataset.thumbnail || null,
        category: item.dataset.category,
        people: item.dataset.people,
        featured: item.dataset.featured === 'true',
        personOrder: Number(item.dataset.personOrder) || 99,
        pages: item.dataset.pages ? Array.from({ length: Number(item.dataset.pageCount) }, (_, i) => encodeURI(item.dataset.pages.replace('{n}', String(i + 1).padStart(2, '0')))) : null,
        size: item.dataset.size || null,
        folder: !!item.querySelector('.folder-thumb')
      };
    });
    window.ShareSheet.showMenu(x, y, files, icon);
  }
  // Shrinks the icon grid on short screens so every row stays above the taskbar.
  const EDGE_INSET = 16;
  function layoutIcons() {
    const needed = Math.max(...icons.map(icon => Number(icon.dataset.y))) + EDGE_INSET + 82 + 8;
    const scale = Math.min(1, desktop.clientHeight / needed);
    desktop.style.setProperty('--icon-scale', String(scale));
    icons.forEach(icon => {
      icon.style.left = `${(Number(icon.dataset.x) + EDGE_INSET) * scale}px`;
      icon.style.top = `${(Number(icon.dataset.y) + EDGE_INSET) * scale}px`;
    });
  }
  layoutIcons();
  window.addEventListener('resize', layoutIcons);
  icons.forEach(icon => {
    icon.tabIndex = 0;
    icon.setAttribute('role', 'option');
    icon.setAttribute('aria-selected', 'false');
    icon.setAttribute('aria-label', icon.querySelector('span:last-child').textContent.trim());
    icon.addEventListener('click', event => selectIcon(icon, event));
    icon.addEventListener('contextmenu', event => {
      if (icon.dataset.type === 'app') return;
      event.preventDefault();
      showFileMenu(icon, event.clientX, event.clientY);
    });
    icon.addEventListener('keydown', event => {
      if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
        event.preventDefault();
        const rect = icon.getBoundingClientRect();
        showFileMenu(icon, rect.right, rect.top);
      } else if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        selectIcon(icon, event);
      }
    });
  });
  desktop.addEventListener('click', event => {
    if (suppressClick) {
      suppressClick = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    } else if (!event.target.closest('.d-icon')) {
      clearSelection();
      selectionAnchor = null;
    }
  }, true);
  desktop.addEventListener('dragstart', event => event.preventDefault());
  desktop.addEventListener('pointerdown', event => {
    suppressClick = false;
    if (event.button !== 0 || !event.isPrimary || event.target.closest('.d-icon') || event.pointerType === 'touch') return;
    marquee = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      baseline: new Set(selected),
      additive: event.ctrlKey || event.metaKey || event.shiftKey,
      toggle: event.ctrlKey || event.metaKey,
      active: false
    };
    desktop.setPointerCapture(event.pointerId);
  });
  desktop.addEventListener('pointermove', event => {
    if (!marquee || marquee.pointerId !== event.pointerId) return;
    if (!marquee.active && Math.hypot(event.clientX - marquee.x, event.clientY - marquee.y) < 4) return;
    marquee.active = true;
    const bounds = desktop.getBoundingClientRect();
    const x = Math.max(bounds.left, Math.min(event.clientX, bounds.right));
    const y = Math.max(bounds.top, Math.min(event.clientY, bounds.bottom));
    const left = Math.min(marquee.x, x);
    const top = Math.min(marquee.y, y);
    const right = Math.max(marquee.x, x);
    const bottom = Math.max(marquee.y, y);
    selectionBox.hidden = false;
    selectionBox.style.left = `${left - bounds.left}px`;
    selectionBox.style.top = `${top - bounds.top}px`;
    selectionBox.style.width = `${right - left}px`;
    selectionBox.style.height = `${bottom - top}px`;
    icons.forEach(icon => {
      const rect = icon.getBoundingClientRect();
      const intersects = rect.right > left && rect.left < right && rect.bottom > top && rect.top < bottom;
      const wasSelected = marquee.baseline.has(icon);
      setSelected(icon, marquee.toggle ? wasSelected !== intersects : intersects || (marquee.additive && wasSelected));
    });
  });
  function finishMarquee(cancelled) {
    if (!marquee) return;
    const { pointerId, baseline, active } = marquee;
    marquee = null;
    selectionBox.hidden = true;
    if (cancelled) {
      icons.forEach(icon => setSelected(icon, baseline.has(icon)));
    } else if (active) {
      selectionAnchor = icons.find(icon => selected.has(icon)) || null;
    }
    suppressClick = active;
    if (desktop.hasPointerCapture(pointerId)) desktop.releasePointerCapture(pointerId);
  }
  desktop.addEventListener('pointerup', event => {
    if (marquee && marquee.pointerId === event.pointerId) finishMarquee(false);
  });
  desktop.addEventListener('pointercancel', () => finishMarquee(true));
  desktop.addEventListener('lostpointercapture', () => finishMarquee(true));
  window.addEventListener('blur', () => finishMarquee(true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && marquee) {
      event.preventDefault();
      event.stopPropagation();
      finishMarquee(true);
    }
  }, true);
  desktop.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
      event.preventDefault();
      icons.forEach(icon => setSelected(icon, true));
      selectionAnchor = icons[0];
    } else if (event.key === 'Escape') {
      clearSelection();
      selectionAnchor = null;
    }
  });
  function updateClock() {
    const now = new Date();
    document.getElementById('clock-time').textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    document.getElementById('clock-date').textContent = now.toLocaleDateString('en-US');
  }
  updateClock();
  setInterval(updateClock, 1000);
})();
