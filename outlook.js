// Inline document sharing through Outlook or Teams, selected by the contact's app.
// Sending is simulated; nothing leaves the prototype.
(() => {
  const asset = (folder, name) => encodeURI(`${folder}/${name}`);
  const dialog = document.createElement('dialog');
  dialog.className = 'ol-sheet';
  dialog.setAttribute('aria-labelledby', 'ol-title');
  dialog.innerHTML = `
    <header class="ol-header">
      <button type="button" class="ol-back" aria-label="Back to share sheet"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M7 3 2 8l5 5M2.5 8H14" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <img class="ol-app-icon" alt="">
      <h1 id="ol-title"></h1>
      <button type="button" class="ol-close" aria-label="Close"><img src="${asset('Other icons', 'Cross icon.png')}" alt=""></button>
    </header>
    <div class="ol-compose">
      <div class="ol-to">
        <span id="ol-to-label">To:</span>
        <div class="ol-recipients" role="group" aria-labelledby="ol-to-label">
          <input type="text" class="ol-recipient-input" aria-label="Add a recipient" autocomplete="off">
        </div>
      </div>
      <div class="ol-file">
        <span class="ol-file-icon" aria-hidden="true"></span>
        <div class="ol-file-info"><strong></strong><small></small></div>
      </div>
      <textarea class="ol-message" aria-label="Message" placeholder="Add a message"></textarea>
    </div>
    <div class="ol-progress" role="status" hidden>
      <span class="ol-spinner" aria-hidden="true"></span>
      <span class="ol-done" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="m4.5 8.2 2.3 2.3 4.7-4.9" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <strong class="ol-progress-file"></strong>
      <span class="ol-progress-text"></span>
    </div>
    <footer class="ol-buttons">
      <button type="button" class="ol-send">Send</button>
      <button type="button" class="ol-cancel">Cancel</button>
    </footer>`;
  document.body.append(dialog);
  const find = selector => dialog.querySelector(selector);
  let options = null;
  let recipients = [];
  let sendTimer = null;
  let stage = 'compose';

  function updateScale() {
    const scale = window.matchMedia('(max-width: 650px)').matches ? 1 : Math.min(window.innerWidth / 1920, window.innerHeight / 1200);
    dialog.style.setProperty('--ol-scale', String(scale));
  }
  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0].toUpperCase()).join('');
  }
  function renderRecipients() {
    const box = find('.ol-recipients');
    box.querySelectorAll('.ol-pill').forEach(pill => pill.remove());
    recipients.forEach((person, index) => {
      const pill = document.createElement('span');
      pill.className = 'ol-pill';
      const photo = document.createElement(person.image ? 'img' : 'span');
      photo.className = 'ol-pill-photo';
      if (person.image) {
        photo.src = person.image;
        photo.alt = '';
      } else {
        photo.textContent = initials(person.name);
      }
      const name = document.createElement('span');
      name.className = 'ol-pill-name';
      name.textContent = person.name;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'ol-pill-remove';
      remove.setAttribute('aria-label', `Remove ${person.name}`);
      remove.innerHTML = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 3 6 6M9 3 3 9" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>';
      remove.addEventListener('click', () => {
        recipients.splice(index, 1);
        renderRecipients();
        find('.ol-recipient-input').focus();
      });
      pill.append(photo, name, remove);
      box.insertBefore(pill, find('.ol-recipient-input'));
    });
    find('.ol-send').disabled = recipients.length === 0;
  }
  function setStage(next) {
    stage = next;
    dialog.dataset.stage = next;
    const sending = next !== 'compose';
    find('.ol-compose').hidden = sending;
    find('.ol-progress').hidden = !sending;
    find('.ol-back').hidden = sending;
    find('.ol-send').hidden = sending;
    find('.ol-cancel').textContent = next === 'done' ? 'Close' : 'Cancel';
    if (sending) {
      const names = recipients.map(person => person.name).join(', ');
      find('.ol-progress-file').textContent = options.file.name;
      const channel = options.app === 'Teams' ? 'using Teams' : 'over Outlook';
      find('.ol-progress-text').textContent = `${next === 'done' ? 'Shared' : 'Sharing'} with ${names} ${channel}`;
    }
  }
  function close() {
    clearTimeout(sendTimer);
    sendTimer = null;
    if (dialog.open) dialog.close();
  }
  dialog.addEventListener('close', () => {
    clearTimeout(sendTimer);
    sendTimer = null;
    const focusTarget = options && options.returnFocus;
    if (focusTarget && focusTarget.isConnected && stage !== 'back') focusTarget.focus();
  });

  find('.ol-back').addEventListener('click', () => {
    stage = 'back';
    const back = options.onBack;
    dialog.close();
    if (back) back();
  });
  find('.ol-close').addEventListener('click', close);
  find('.ol-cancel').addEventListener('click', () => {
    if (stage === 'sending') {
      clearTimeout(sendTimer);
      sendTimer = null;
      setStage('compose');
      find('.ol-send').focus();
    } else {
      close();
    }
  });
  find('.ol-send').addEventListener('click', () => {
    if (!recipients.length) return;
    setStage('sending');
    find('.ol-cancel').focus();
    sendTimer = setTimeout(() => {
      sendTimer = null;
      setStage('done');
      find('.ol-cancel').focus();
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 600 : 2200);
  });
  find('.ol-recipient-input').addEventListener('keydown', event => {
    const input = event.currentTarget;
    if ((event.key === 'Enter' || event.key === ';' || event.key === ',') && input.value.trim()) {
      event.preventDefault();
      recipients.push({ name: input.value.trim(), image: null });
      input.value = '';
      renderRecipients();
    } else if (event.key === 'Backspace' && !input.value && recipients.length) {
      recipients.pop();
      renderRecipients();
    }
  });
  find('.ol-recipients').addEventListener('click', event => {
    if (event.target === event.currentTarget) find('.ol-recipient-input').focus();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  });
  window.addEventListener('resize', () => { if (dialog.open) updateScale(); });

  window.DocumentShare = {
    open(config) {
      options = config;
      find('.ol-app-icon').src = asset(config.app === 'Teams' ? 'icons' : 'App icons', `${config.app}.png`);
      find('#ol-title').textContent = config.app === 'Teams' ? 'Share using Teams' : 'Share with Outlook';
      recipients = [{ ...config.contact }];
      clearTimeout(sendTimer);
      sendTimer = null;
      find('.ol-file-info strong').textContent = config.file.name;
      find('.ol-file-info small').textContent = config.file.size;
      find('.ol-recipient-input').value = '';
      const message = find('.ol-message');
      message.value = config.text;
      renderRecipients();
      setStage('compose');
      updateScale();
      dialog.showModal();
      message.focus({ preventScroll: true });
      message.setSelectionRange(message.value.length, message.value.length);
      message.scrollTop = 0;
    }
  };
})();
