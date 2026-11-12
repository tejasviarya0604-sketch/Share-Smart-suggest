(() => {
  const icon = (body, viewBox = '0 0 24 24') => `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const icons = {
    chats: icon('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-5 4Z" fill="currentColor" stroke="none"/><path d="M8 8.5h8M8 12h5" stroke="#fff"/>'),
    calls: icon('<path d="M6.6 3.5 9 3l1.6 4.2-2 1.5a11 11 0 0 0 5.7 5.7l1.5-2 4.2 1.6-.5 2.4a2 2 0 0 1-2 1.6A15.5 15.5 0 0 1 5 5.5a2 2 0 0 1 1.6-2Z"/>'),
    status: icon('<circle cx="12" cy="12" r="8.5" stroke-dasharray="11 2.4"/><circle cx="12" cy="12" r="4.5"/>'),
    channels: icon('<path d="M12 3.5a8.5 8.5 0 1 1-4.6 15.6L3.5 20.5l1.4-3.8A8.5 8.5 0 0 1 12 3.5Z"/><circle cx="12" cy="12" r="3"/>'),
    communities: icon('<circle cx="12" cy="8.5" r="3"/><circle cx="5.5" cy="10" r="2.2"/><circle cx="18.5" cy="10" r="2.2"/><path d="M6.5 19a5.5 5.5 0 0 1 11 0M1.8 18.5a3.8 3.8 0 0 1 4.6-3.6M22.2 18.5a3.8 3.8 0 0 0-4.6-3.6"/>'),
    meta: '<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="wa-meta" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0866ff"/><stop offset=".5" stop-color="#a033ff"/><stop offset="1" stop-color="#ff5c87"/></linearGradient></defs><circle cx="12" cy="12" r="8" fill="none" stroke="url(#wa-meta)" stroke-width="3.2"/></svg>',
    media: icon('<rect x="6.5" y="3.5" width="14" height="14" rx="2"/><path d="M3.5 7v11.5a2 2 0 0 0 2 2H17"/><path d="m9 14 3-3 2 2 2.5-3 2 3"/>'),
    kebab: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5.5" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="18.5" r="1.7"/></svg>',
    plus: icon('<path d="M12 5v14M5 12h14"/>'),
    search: icon('<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>'),
    video: icon('<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10.5 5-3v9l-5-3"/>'),
    phone: icon('<path d="M6.6 3.5 9 3l1.6 4.2-2 1.5a11 11 0 0 0 5.7 5.7l1.5-2 4.2 1.6-.5 2.4a2 2 0 0 1-2 1.6A15.5 15.5 0 0 1 5 5.5a2 2 0 0 1 1.6-2Z"/>'),
    close: icon('<path d="M6 6l12 12M18 6 6 18"/>'),
    copy: icon('<rect x="8" y="8" width="11.5" height="11.5" rx="1.8"/><path d="M15.5 8V6.3a1.8 1.8 0 0 0-1.8-1.8H6.3a1.8 1.8 0 0 0-1.8 1.8v7.4a1.8 1.8 0 0 0 1.8 1.8H8"/>'),
    copied: icon('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    download: icon('<path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 19.5h14"/>'),
    emoji: icon('<circle cx="12" cy="12" r="8.5"/><path d="M8.5 14.2a4.2 4.2 0 0 0 7 0"/><circle cx="9.3" cy="10" r=".6" fill="currentColor"/><circle cx="14.7" cy="10" r=".6" fill="currentColor"/>'),
    send: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6 3.3 10l12.5 2-12.5 2Z"/></svg>',
    mic: icon('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>'),
    sticker: icon('<path d="M20 12.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6.5Z"/><path d="M20 12.5h-5.5a2 2 0 0 0-2 2V20"/><path d="M8.5 13a3.5 3.5 0 0 0 4 1"/><circle cx="9" cy="9" r=".6" fill="currentColor"/><circle cx="15" cy="9" r=".6" fill="currentColor"/>'),
    doc: icon('<path d="M6.5 3h7l4 4v14h-11Z"/><path d="M13.5 3v4h4"/>'),
    photo: icon('<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m4 17 5-4 4 3 3-2 4 3"/>'),
    videocam: icon('<rect x="3" y="6.5" width="12.5" height="11" rx="2"/><path d="m15.5 10.5 5-3v9l-5-3"/>'),
    callIn: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="2.5" y="6" width="13" height="12" rx="2"/><path d="m15.5 10.5 6-3.5v10l-6-3.5Z"/><path d="M6 15l5-5M7 10h4v4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    blocked: icon('<circle cx="12" cy="12" r="8.5"/><path d="m6 6 12 12"/>'),
    lock: icon('<rect x="5.5" y="10.5" width="13" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>'),
    ticks: '<svg viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m1 6.5 3.5 3.5L11 2.5M7.5 10l.5.5L16.5 2"/></svg>',
    bellOff: icon('<path d="M9.5 19a2.5 2.5 0 0 0 5 0M6.5 9a5.5 5.5 0 0 1 9.4-3.9M18 10v4l1.5 2.5H8M4 4l16 16M6.5 9v5L5 16.5h3"/>'),
    forward: icon('<path d="M14 6l6 6-6 6M20 12h-9a6 6 0 0 0-6 6"/>'),
    pdf: '<svg viewBox="0 0 22 26" aria-hidden="true"><path d="M2 0h12l8 8v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2Z" fill="#e53935"/><path d="M14 0v6a2 2 0 0 0 2 2h6Z" fill="#ef9a9a"/><text x="11" y="19.5" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="6.6" font-weight="700" fill="#fff">PDF</text></svg>',
    minimize: icon('<path d="M2 6.5h8"/>', '0 0 12 12'),
    maximize: icon('<rect x="1.5" y="1.5" width="9" height="9" rx="1"/>', '0 0 12 12'),
    restore: icon('<rect x="1.5" y="3.5" width="7" height="7" rx="1"/><path d="M3.5 3.5V2.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1"/>', '0 0 12 12'),
    closeWindow: icon('<path d="M1.5 1.5l9 9M10.5 1.5l-9 9"/>', '0 0 12 12')
  };
  const asset = (folder, name) => encodeURI(`${folder}/${name}`);
  const wallpaper = (() => {
    const doodles = '<g fill="none" stroke="#0b141a" stroke-opacity=".055" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="30" cy="34" r="12"/><path d="M90 20l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2Z"/><path d="M160 40c0-9 14-9 14 0 0-9 14-9 14 0 0 10-14 18-14 18s-14-8-14-18Z"/><rect x="232" y="22" width="30" height="22" rx="4"/><path d="M240 44l-4 8 10-8"/><path d="M296 30h24M308 18v24"/><path d="M24 110q12-18 24 0t24 0"/><circle cx="128" cy="112" r="8"/><path d="M128 92v6M128 126v6M108 112h6M142 112h6"/><path d="M196 96h28v30h-28ZM196 104h28"/><path d="M262 120l14-26 14 26Z"/><path d="M318 98a14 14 0 1 0 0 28"/><path d="M36 182h26l-4 22h-18Z"/><path d="M62 188h6a5 5 0 0 1 0 10h-8"/><path d="M110 170l10 18 10-18 10 18"/><circle cx="196" cy="186" r="14"/><path d="M190 182h.1M202 182h.1M190 192q6 5 12 0"/><path d="M250 172v30M250 172l20 6-20 6"/><path d="M300 176h30v22h-30ZM306 198l-4 8M324 198l4 8"/><path d="M20 262c10-20 30-20 40 0"/><path d="M96 246h30v30h-30Z"/><path d="M96 256h30M106 246v30"/><path d="M164 250l8 22 8-22M164 250h16"/><circle cx="236" cy="262" r="5"/><circle cx="252" cy="250" r="3"/><circle cx="256" cy="270" r="4"/><path d="M296 246q14 6 0 16t0 16"/><path d="M44 314l10 10 18-22"/><path d="M118 304a14 14 0 1 1 0 28 10 10 0 1 0 0-28Z"/><path d="M182 306h30M182 316h22M182 326h28"/><path d="M262 300l6 10h-12Z M262 316v14"/><path d="M308 304l8 8-8 8M300 312h16"/></g>';
    return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="340" height="340" viewBox="0 0 340 340">${doodles}</svg>`)}")`;
  })();
  const chatList = [
    { name: 'Carlos', contact: 'Carlos', image: asset('People icons', 'Carlos.png'), time: '1:15 am', preview: 'Video Call', previewIcon: 'videocam' },
    { name: 'Hyd-Hangout', image: asset('Trip photos/web', 'pexels-thirdman-8021087.jpg'), time: '2:04 pm', preview: 'Group members have changed. Click to view', unread: 1 },
    { name: '+91 77750 11155', image: asset('Trip photos/web', 'pexels-thirdman-8021263.jpg'), time: '12:42 pm', preview: 'Photo', previewIcon: 'photo', unread: 2 },
    { name: 'Sharon Dsouza', image: asset('Wedding photos decor', 'a3cafb78e2dac6792962721ac63ae67e.jpg'), time: '12:18 pm', preview: 'Check X post 👆👆 as well', unread: 4 },
    { name: 'Coffee time', image: asset('Wedding photos decor', '61fa9ed76d7b92feee8d263cca42139a.jpg'), time: '12:05 pm', preview: 'Richa: Happy birthday 🥳🥳', unread: 2 },
    { name: 'The chosen ones', image: asset('Wedding photos decor', '8359c61b8b39d5867d88a9121f811ec0.jpg'), time: '11:38 am', preview: 'You reacted ❤️ to: "🖼 Photo"' },
    { name: 'Berlin Marathon 2026', image: asset('Trip photos/web', 'pexels-thirdman-8021088.jpg'), time: '9:49 am', preview: 'Srihari: https://www.instagram.com/reel/DemI7-lBSqU/?mdxt=M' },
    { name: 'Sarah', contact: 'Sarah Prerez', image: asset('People icons', 'Sarh Prerez.png'), time: '9:17 am', preview: 'Hey lets meet for coffee??', muted: true },
    { name: 'Aparna Serene Park Communication Channels', image: asset('Trip photos/web', 'pexels-thirdman-8021089.jpg'), time: '7:25 am', preview: '~ASPOCWS-Accounts: Photo' },
    { name: 'Sabhyata', contact: 'Sabhyata', image: asset('People icons', 'Sabhyata.png'), time: 'Yesterday', preview: 'Learning all veg dishes so that when you guys come i can cook❤️❤️❤️❤️', previewIcon: 'photo' },
    { name: 'Dairy', image: asset('Wedding photos decor', 'a3cafb78e2dac6792962721ac63ae67e.jpg'), time: 'Yesterday', preview: 'You: https://www.threads.com/share/BAD5BNonNH/' },
    { name: 'Stadium Run 2026 - 6 Hours SOLO', image: asset('Wedding photos decor', 'afa308775a8f94a57eac267c76d904b5.jpg'), time: 'Yesterday', preview: '~Vipin: you are replying a mailbox that says "donotreply"' }
  ];

  const win = document.createElement('section');
  win.className = 'wa-window';
  win.hidden = true;
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'WhatsApp');
  win.style.setProperty('--wa-wallpaper', wallpaper);
  win.innerHTML = `
    <header class="wa-titlebar">
      <img class="wa-logo" src="${asset('App icons', 'Whatsapp.png')}" alt="">
      <span class="wa-app-title">WhatsApp</span>
      <div class="wa-caption">
        <button type="button" class="wa-min-window" aria-label="Minimize">${icons.minimize}</button>
        <button type="button" class="wa-max-window" aria-label="Maximize">${icons.maximize}</button>
        <button type="button" class="wa-close-window" aria-label="Close WhatsApp">${icons.closeWindow}</button>
      </div>
    </header>
    <div class="wa-body">
      <nav class="wa-rail" aria-hidden="true">
        <span class="wa-rail-item wa-active"><span class="wa-icon">${icons.chats}</span><span class="wa-rail-badge">4</span></span>
        <span class="wa-rail-item"><span class="wa-icon">${icons.calls}</span></span>
        <span class="wa-rail-item"><span class="wa-icon">${icons.status}</span><span class="wa-rail-dot"></span></span>
        <span class="wa-rail-item"><span class="wa-icon">${icons.channels}</span></span>
        <span class="wa-rail-item"><span class="wa-icon">${icons.communities}</span></span>
        <span class="wa-rail-rule"></span>
        <span class="wa-rail-item"><span class="wa-icon">${icons.meta}</span></span>
        <span class="wa-rail-spacer"></span>
        <span class="wa-rail-item"><span class="wa-icon">${icons.media}</span></span>
        <span class="wa-rail-item"><img class="wa-rail-avatar" src="${asset('People icons', 'Sussiee.png')}" alt=""></span>
      </nav>
      <section class="wa-chats" aria-label="Chats">
        <div class="wa-chats-header" aria-hidden="true"><h2>Chats</h2><span class="wa-round"><span class="wa-icon">${icons.kebab}</span></span><span class="wa-round wa-new-chat"><span class="wa-icon">${icons.plus}</span></span></div>
        <div class="wa-search" aria-hidden="true">${icons.search}<span>Search or start a new chat</span></div>
        <div class="wa-filters" aria-hidden="true"><span class="wa-filter wa-active">All</span><span class="wa-filter">Unread <small>4</small></span><span class="wa-filter">Favourites</span><span class="wa-filter wa-filter-add">${icons.plus.replace('<svg', '<svg width="16" height="16"')}</span></div>
        <div class="wa-list" role="list"></div>
      </section>
      <section class="wa-conversation" aria-label="Conversation">
        <header class="wa-chat-header">
          <span class="wa-header-avatar"></span>
          <span class="wa-chat-name"></span>
          <div class="wa-header-actions" aria-hidden="true"><span class="wa-round"><span class="wa-icon">${icons.video}</span></span><span class="wa-round"><span class="wa-icon">${icons.phone}</span></span><span class="wa-round wa-dim"><span class="wa-icon">${icons.search}</span></span><span class="wa-round"><span class="wa-icon">${icons.kebab}</span></span></div>
        </header>
        <div class="wa-compose" hidden>
          <div class="wa-compose-top">
            <button type="button" class="wa-compose-close" aria-label="Discard attachment">${icons.close}</button>
            <div class="wa-compose-title"><strong></strong><span></span></div>
            <div class="wa-compose-actions"><button type="button" class="wa-copy-media" aria-label="Copy image">${icons.copy}</button><button type="button" class="wa-download-media" aria-label="Download image">${icons.download}</button></div>
          </div>
          <div class="wa-compose-preview"></div>
          <div class="wa-caption-area">
            <div class="wa-caption-box">
              <div class="wa-caption-text" role="textbox" aria-readonly="true" aria-label="Caption" tabindex="0"></div>
              <div class="wa-caption-tools"><button type="button" class="wa-caption-clear" aria-label="Remove caption">${icons.close}</button><span aria-hidden="true">${icons.emoji}</span></div>
            </div>
          </div>
          <div class="wa-compose-bottom">
            <div class="wa-attach-row">
              <div class="wa-thumbs" role="group" aria-label="Attachments"></div>
              <span class="wa-add-more" aria-hidden="true">${icons.plus}</span>
            </div>
            <button type="button" class="wa-send" aria-label="Send">${icons.send}<span class="wa-send-count" hidden></span></button>
          </div>
        </div>
        <div class="wa-thread">
          <div class="wa-messages" role="log" aria-label="Messages" tabindex="0"></div>
          <form class="wa-composer">
            <span aria-hidden="true">${icons.plus}</span><span aria-hidden="true">${icons.sticker}</span>
            <input type="text" aria-label="Type a message" placeholder="Type a message" autocomplete="off">
            <span aria-hidden="true">${icons.mic}</span>
          </form>
        </div>
      </section>
    </div>`;
  document.body.append(win);

  const find = selector => win.querySelector(selector);
  const compose = find('.wa-compose');
  const thread = find('.wa-thread');
  const messages = find('.wa-messages');
  const taskbarIcon = document.querySelector('.tb-icon[title="WhatsApp"]');
  let draft = null;
  let previewIndex = 0;
  let maximized = false;
  let restoreFocus = null;
  let current = { name: 'Carlos', image: asset('People icons', 'Carlos.png') };
  const conversations = new Map();

  function avatar(className, image) {
    const wrap = document.createElement('span');
    wrap.className = `wa-avatar ${className}`;
    const img = document.createElement('img');
    img.src = image;
    img.alt = '';
    wrap.append(img);
    return wrap;
  }
  const chatFor = name => chatList.find(chat => chat.contact === name);

  function renderChatList() {
    const list = find('.wa-list');
    list.replaceChildren();
    chatList.forEach(chat => {
      const row = document.createElement('div');
      row.className = `wa-row${chat.contact && chat.contact === current.name ? ' wa-active' : ''}`;
      row.setAttribute('role', 'listitem');
      const main = document.createElement('div');
      main.className = 'wa-row-main';
      const name = document.createElement('div');
      name.className = 'wa-row-name';
      name.textContent = chat.name;
      const preview = document.createElement('div');
      preview.className = 'wa-row-preview';
      const isDraft = draft && chat.contact && chat.contact === current.name;
      const shown = isDraft ? draftSummary() : chat;
      if (isDraft) preview.insertAdjacentHTML('beforeend', '<b class="wa-draft">Draft:</b>');
      if (shown.previewIcon) preview.insertAdjacentHTML('beforeend', icons[shown.previewIcon]);
      const text = document.createElement('span');
      text.textContent = shown.preview;
      preview.append(text);
      main.append(name, preview);
      const meta = document.createElement('div');
      meta.className = `wa-row-meta${chat.unread ? ' wa-unread' : ''}`;
      const time = document.createElement('span');
      time.textContent = chat.time;
      meta.append(time);
      if (chat.unread) meta.insertAdjacentHTML('beforeend', `<span class="wa-unread-badge">${chat.unread}</span>`);
      else if (chat.muted) meta.insertAdjacentHTML('beforeend', icons.bellOff);
      else meta.insertAdjacentHTML('beforeend', '<span class="wa-row-meta-spacer"></span>');
      row.append(avatar('wa-row-avatar', chat.image), main, meta);
      list.append(row);
    });
    const active = list.querySelector('.wa-active');
    if (active) {
      const rowBox = active.getBoundingClientRect();
      const listBox = list.getBoundingClientRect();
      if (rowBox.top < listBox.top || rowBox.bottom > listBox.bottom) list.scrollTop += rowBox.top - listBox.top - 1;
    }
  }
  function draftSummary() {
    const first = draft.attachments[0];
    if (first.type === 'pdf' || !first.preview) return { preview: first.name, previewIcon: 'doc' };
    return { preview: draft.attachments.length > 1 ? `${draft.attachments.length} photos` : 'Photo', previewIcon: 'photo' };
  }
  // A contact you share to always gets a row in the chat list, like opening a new chat in WhatsApp.
  function ensureChat(contact) {
    if (chatFor(contact.name)) return;
    chatList.unshift({ name: contact.name, contact: contact.name, image: contact.image, time: currentTime(), preview: '' });
  }
  // Moves the current contact's chat to the top with the latest message, like WhatsApp does.
  function recordSent(preview, previewIcon, time) {
    let chat = chatFor(current.name);
    if (chat) chatList.splice(chatList.indexOf(chat), 1);
    else chat = { name: current.name, contact: current.name, image: current.image };
    Object.assign(chat, { preview, previewIcon, time, unread: 0 });
    chatList.unshift(chat);
    renderChatList();
    find('.wa-list').scrollTop = 0;
  }

  const histories = {
    Carlos: () => `
        <span class="wa-day">Friday</span>
        <div class="wa-msg wa-tail"><div class="wa-deleted">${icons.blocked}<span>You deleted this message</span><span class="wa-time">12:37 pm</span></div></div>
        <span class="wa-day">Saturday</span>
        <div class="wa-msg wa-call wa-tail"><div class="wa-call-card"><span>${icons.callIn}</span><div><strong>Video call</strong><small>1 minute</small></div></div><div class="wa-time">3:01 pm</div></div>
        <div class="wa-msg wa-call"><div class="wa-call-card"><span>${icons.callIn}</span><div><strong>Video call</strong><small>10 seconds</small></div></div><div class="wa-time">3:51 pm</div></div>`,
    // Earlier food photos from Figma 80:97540.
    Sabhyata: () => `
        <span class="wa-encrypted">${icons.lock}Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.</span>
        <span class="wa-day">Yesterday</span>
        <div class="wa-msg wa-tail wa-image-msg">
          <div class="wa-msg-actions" aria-hidden="true"><span>${icons.emoji}</span></div>
          <div class="wa-image-grid wa-three">${[['Salad', ''], ['Soup', ' (1)'], ['Pasta', ' (2)']].map(([dish, suffix]) => `<span><img src="${asset('Food photos', `WhatsApp Image 2026-11-01 at 1.04.29 PM${suffix}.jpeg`)}" alt="${dish}"></span>`).join('')}</div>
          <div class="wa-msg-caption wa-wrap">Learning all veg dishes so that when you guys come i can cook❤️❤️❤️❤️</div>
          <div class="wa-time">1:04 pm${icons.ticks}</div>
        </div>`
  };
  function conversationFor(name) {
    if (!conversations.has(name)) {
      const conversation = document.createElement('div');
      conversation.className = 'wa-conv';
      conversation.innerHTML = histories[name] ? histories[name]()
        : `<span class="wa-encrypted">${icons.lock}Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.</span>`;
      conversations.set(name, conversation);
    }
    return conversations.get(name);
  }
  function selectContact(contact) {
    current = contact;
    const chat = chatFor(contact.name);
    find('.wa-header-avatar').replaceWith(avatar('wa-header-avatar', contact.image));
    find('.wa-chat-name').textContent = chat ? chat.name : contact.name;
    find('.wa-conversation').setAttribute('aria-label', `Conversation with ${chat ? chat.name : contact.name}`);
    messages.replaceChildren(conversationFor(contact.name));
    renderChatList();
  }

  const formatAmount = value => Number(value).toLocaleString('en-US');
  function captionLines(rows, sent) {
    return [
      '| Medical Name | Date | Invoice no. | Amount |',
      sent ? '|—|—|—|—:|' : '|---|---|---|---:|',
      ...rows.map(([name, date, invoice, amount]) => `| ${name} | ${date} | ${invoice} | ${formatAmount(amount)} |`)
    ];
  }
  function appendCaption(container, rows, sent) {
    if (typeof rows === 'string') {
      container.append(rows);
      return;
    }
    captionLines(rows, sent).forEach((line, index) => {
      if (index) container.append('\n');
      line.split(/(\d{2}-\d{2}-\d{4})/).forEach(part => {
        if (/^\d{2}-\d{2}-\d{4}$/.test(part)) {
          const date = document.createElement('span');
          date.className = 'wa-date';
          date.textContent = part;
          container.append(date);
        } else {
          container.append(part);
        }
      });
    });
  }
  const currentTime = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase();

  function updateScale() {
    const scale = window.matchMedia('(max-width: 650px)').matches ? 1 : Math.min(window.innerWidth / 1920, window.innerHeight / 1200);
    win.style.setProperty('--wa-scale', String(scale));
    if (maximized) {
      win.style.width = `${window.innerWidth / scale}px`;
      win.style.height = `${(window.innerHeight - 48) / scale}px`;
    } else {
      win.style.width = '';
      win.style.height = '';
    }
  }
  function setRunning(running) {
    if (taskbarIcon) taskbarIcon.classList.toggle('wa-running', running);
  }
  function setFocused(focused) {
    if (taskbarIcon) taskbarIcon.classList.toggle('wa-focused', focused);
  }
  function showWindow() {
    updateScale();
    win.hidden = false;
    setRunning(true);
    setFocused(true);
  }
  function hideWindow() {
    win.hidden = true;
    setFocused(false);
    if (restoreFocus && restoreFocus.isConnected) restoreFocus.focus();
  }

  function showPreview(index) {
    previewIndex = index;
    const attachment = draft.attachments[index];
    const preview = find('.wa-compose-preview');
    preview.replaceChildren();
    if (attachment.preview) {
      const image = document.createElement('img');
      image.src = attachment.preview;
      image.alt = attachment.type === 'pdf' ? `First page of ${attachment.name}` : attachment.name;
      if (attachment.type === 'pdf') image.className = 'wa-pdf-page';
      preview.append(image);
    } else {
      const card = document.createElement('div');
      card.className = 'wa-file-card';
      card.innerHTML = icons.pdf;
      const label = document.createElement('span');
      label.textContent = attachment.name;
      card.append(label);
      preview.append(card);
    }
    find('.wa-compose-title strong').textContent = attachment.name;
    find('.wa-compose-actions').hidden = attachment.type !== 'image';
    resetCopyMedia();
    find('.wa-compose-title span').textContent = attachment.type === 'pdf'
      ? `${attachment.pages} ${attachment.pages === 1 ? 'page' : 'pages'}`
      : draft.attachments.length > 1 ? `${index + 1} of ${draft.attachments.length}` : '';
    find('.wa-thumbs').querySelectorAll('.wa-thumb').forEach((thumb, i) => {
      thumb.setAttribute('aria-pressed', String(i === index));
      if (i === index) {
        const strip = find('.wa-thumbs');
        if (thumb.offsetLeft < strip.scrollLeft) strip.scrollLeft = thumb.offsetLeft - 4;
        else if (thumb.offsetLeft + thumb.offsetWidth > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = thumb.offsetLeft + thumb.offsetWidth - strip.clientWidth + 4;
      }
    });
  }
  function renderCaption() {
    const box = find('.wa-caption-box');
    const text = find('.wa-caption-text');
    text.replaceChildren();
    box.classList.toggle('wa-empty', !draft.caption);
    box.classList.toggle('wa-plain-caption', typeof draft.caption === 'string');
    find('.wa-caption-clear').hidden = !draft.caption;
    if (draft.caption) appendCaption(text, draft.caption, false);
    else text.textContent = 'Type a message';
  }
  function openCompose(payload) {
    draft = payload;
    const thumbs = find('.wa-thumbs');
    thumbs.replaceChildren();
    thumbs.scrollLeft = 0;
    const count = find('.wa-send-count');
    count.hidden = draft.attachments.length < 2;
    count.textContent = draft.attachments.length;
    find('.wa-send').setAttribute('aria-label', draft.attachments.length > 1 ? `Send ${draft.attachments.length} items` : 'Send');
    draft.attachments.forEach((attachment, index) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'wa-thumb';
      thumb.setAttribute('aria-label', `Preview ${attachment.name}`);
      if (attachment.preview) {
        const image = document.createElement('img');
        image.src = attachment.thumbnail || attachment.preview;
        image.alt = '';
        thumb.append(image);
      } else {
        thumb.innerHTML = icons.pdf;
      }
      thumb.addEventListener('click', () => showPreview(index));
      thumbs.append(thumb);
    });
    showPreview(0);
    renderCaption();
    compose.classList.remove('wa-leaving');
    thread.hidden = true;
    compose.hidden = false;
  }
  function showThread(leaving) {
    leaving.classList.add('wa-leaving');
    setTimeout(() => {
      leaving.hidden = true;
      leaving.classList.remove('wa-leaving');
      thread.hidden = false;
      thread.classList.remove('wa-entering');
      void thread.offsetWidth;
      thread.classList.add('wa-entering');
      messages.scrollTop = messages.scrollHeight;
      if (!win.hidden) find('.wa-composer input').focus({ preventScroll: true });
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180);
  }

  function appendDay() {
    const conversation = conversationFor(current.name);
    const days = conversation.querySelectorAll('.wa-day');
    if (days[days.length - 1] && days[days.length - 1].textContent === 'Today') return;
    const day = document.createElement('span');
    day.className = 'wa-day';
    day.textContent = 'Today';
    conversation.append(day);
  }
  function messageShell(className, actions = ['emoji', 'forward']) {
    appendDay();
    const message = document.createElement('div');
    message.className = `wa-msg wa-tail wa-new ${className}`;
    message.insertAdjacentHTML('beforeend', `<div class="wa-msg-actions" aria-hidden="true">${actions.map(name => `<span>${icons[name]}</span>`).join('')}</div>`);
    return message;
  }
  function timeStamp(time) {
    const stamp = document.createElement('div');
    stamp.className = 'wa-time';
    stamp.textContent = time;
    stamp.insertAdjacentHTML('beforeend', icons.ticks);
    stamp.querySelector('svg').setAttribute('aria-label', 'Read');
    return stamp;
  }
  function sendDraft() {
    if (!draft) return;
    const time = currentTime();
    const first = draft.attachments[0];
    let message;
    if (first.type === 'pdf') {
      message = messageShell('wa-doc-msg');
      const preview = document.createElement('div');
      preview.className = 'wa-doc-preview';
      const image = document.createElement('img');
      image.src = first.preview;
      image.alt = `First page of ${first.name}`;
      preview.append(image);
      const card = document.createElement('div');
      card.className = 'wa-doc-card';
      card.innerHTML = icons.pdf;
      const info = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = first.name;
      const meta = document.createElement('small');
      meta.textContent = `${first.pages} ${first.pages === 1 ? 'page' : 'pages'} • PDF • ${first.size}`;
      info.append(name, meta);
      card.append(info);
      message.append(preview, card);
    } else if (first.preview) {
      message = messageShell('wa-image-msg', ['forward']);
      const images = draft.attachments.filter(item => item.preview);
      const grid = document.createElement('div');
      grid.className = `wa-image-grid${images.length === 1 ? ' wa-single' : ''}`;
      images.slice(0, 4).forEach((item, index) => {
        const cell = document.createElement('span');
        const image = document.createElement('img');
        image.src = item.thumbnail || item.preview;
        image.alt = item.name;
        cell.append(image);
        if (index === 3 && images.length > 4) cell.insertAdjacentHTML('beforeend', `<b>+${images.length - 4}</b>`);
        grid.append(cell);
      });
      message.append(grid);
    } else {
      message = messageShell('wa-doc-msg');
      const card = document.createElement('div');
      card.className = 'wa-doc-card';
      card.style.borderRadius = '6px';
      card.innerHTML = icons.pdf;
      const name = document.createElement('strong');
      name.textContent = draft.attachments.length > 1 ? `${first.name} +${draft.attachments.length - 1}` : first.name;
      card.append(name);
      message.append(card);
    }
    if (draft.caption) {
      const caption = document.createElement('div');
      caption.className = 'wa-msg-caption';
      appendCaption(caption, draft.caption, true);
      message.append(caption);
    }
    message.append(timeStamp(time));
    conversationFor(current.name).append(message);
    const isDocument = first.type === 'pdf' || !first.preview;
    const count = draft.attachments.length;
    draft = null;
    recordSent(isDocument ? first.name : count > 1 ? `${count} photos` : 'Photo', isDocument ? 'doc' : 'photo', time);
    showThread(compose);
  }

  find('.wa-send').addEventListener('click', sendDraft);
  let copyMediaTimer = null;
  function resetCopyMedia() {
    clearTimeout(copyMediaTimer);
    const button = find('.wa-copy-media');
    button.innerHTML = icons.copy;
    button.setAttribute('aria-label', 'Copy image');
    button.removeAttribute('title');
  }
  find('.wa-copy-media').addEventListener('click', async () => {
    const button = find('.wa-copy-media');
    const attachment = draft && draft.attachments[previewIndex];
    if (!attachment) return;
    try {
      const blob = await (await fetch(attachment.preview)).blob();
      await navigator.clipboard.write([new ClipboardItem({ [blob.type || 'image/png']: blob })]);
      resetCopyMedia();
      button.innerHTML = icons.copied;
      button.setAttribute('aria-label', 'Copied');
      copyMediaTimer = setTimeout(resetCopyMedia, 1500);
    } catch (error) {
      button.title = 'Copying images is not available when the prototype is opened from a local file.';
    }
  });
  find('.wa-download-media').addEventListener('click', () => {
    const attachment = draft && draft.attachments[previewIndex];
    if (!attachment) return;
    const link = document.createElement('a');
    link.href = attachment.preview;
    link.download = attachment.name;
    document.body.append(link);
    link.click();
    link.remove();
  });
  find('.wa-thumbs').addEventListener('wheel', event => {
    const strip = event.currentTarget;
    if (strip.scrollWidth <= strip.clientWidth || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    event.preventDefault();
    strip.scrollLeft += event.deltaY;
  }, { passive: false });
  find('.wa-compose-close').addEventListener('click', () => {
    draft = null;
    renderChatList();
    showThread(compose);
  });
  find('.wa-caption-clear').addEventListener('click', () => {
    draft.caption = null;
    renderCaption();
    find('.wa-send').focus();
  });
  find('.wa-composer').addEventListener('submit', event => {
    event.preventDefault();
    const input = find('.wa-composer input');
    const value = input.value.trim();
    if (!value) return;
    const message = messageShell('wa-text-msg');
    const time = currentTime();
    message.append(value, timeStamp(time));
    conversationFor(current.name).append(message);
    messages.scrollTop = messages.scrollHeight;
    recordSent(value, null, time);
    input.value = '';
  });
  find('.wa-min-window').addEventListener('click', hideWindow);
  find('.wa-close-window').addEventListener('click', () => {
    draft = null;
    renderChatList();
    hideWindow();
    setRunning(false);
  });
  find('.wa-max-window').addEventListener('click', () => {
    maximized = !maximized;
    win.classList.toggle('wa-maximized', maximized);
    const button = find('.wa-max-window');
    button.setAttribute('aria-label', maximized ? 'Restore' : 'Maximize');
    button.innerHTML = maximized ? icons.restore : icons.maximize;
    updateScale();
  });
  win.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !compose.hidden) {
      event.stopPropagation();
      find('.wa-compose-close').click();
    }
  });
  window.addEventListener('resize', () => { if (!win.hidden) updateScale(); });

  if (taskbarIcon) {
    taskbarIcon.dataset.waTaskbar = '';
    taskbarIcon.setAttribute('role', 'button');
    taskbarIcon.tabIndex = 0;
    const toggle = () => {
      if (win.hidden) {
        restoreFocus = document.activeElement;
        showWindow();
        (compose.hidden ? find('.wa-composer input') : find('.wa-send')).focus({ preventScroll: true });
      } else {
        hideWindow();
      }
    };
    taskbarIcon.addEventListener('click', toggle);
    taskbarIcon.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  }

  selectContact(current);
  window.WhatsAppWindow = {
    shareTo(payload, returnFocus) {
      restoreFocus = returnFocus || null;
      ensureChat(payload.contact);
      selectContact(payload.contact);
      openCompose(payload);
      showWindow();
      renderChatList();
      win.style.animation = 'none';
      void win.offsetWidth;
      win.style.animation = '';
      find('.wa-send').focus({ preventScroll: true });
    }
  };
})();
