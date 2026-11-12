(() => {
  const paths = {
    search: '<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/>',
    file: '<path d="M5 2h9l5 5v15H5Z"/><path d="M14 2v6h5M8 13h8M8 17h8"/>',
    folder: '<path d="M2 6h8l2 3h10v12H2Z"/><path d="M2 6V3h8l3 3"/>',
    edit: '<path d="m4 16 12-12 4 4L8 20l-5 1Z"/><path d="m14 6 4 4"/>',
    wand: '<path d="m3 21 12-12 3 3L6 24ZM13 11l3 3M5 3v6M2 6h6M19 1v6M16 4h6M20 17v5M18 19h5"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    pdf: '<path d="M5 2h9l5 5v15H5Z" fill="#fff" stroke="#999"/><path d="M14 2v6h5"/><rect x="2" y="12" width="18" height="7" rx="1" fill="#d74b36" stroke="none"/><text x="4" y="17.5" font-size="6" font-family="Segoe UI, sans-serif" fill="#fff" stroke="none">PDF</text>'
  };
  const svg = (name, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
  const assetPath = (folder, name) => encodeURI(`${folder}/${name}.png`);
  const otherIcon = name => `<img class="ss-asset-icon" src="${assetPath('Other icons', name)}" alt="">`;
  const people = [
    { name: 'Susiee M', phone: true },
    { name: 'Susiee M', fullName: 'Susiee Mendez', image: 'Sussiee', app: 'Whatsapp' },
    { name: 'Carlos', image: 'Carlos', app: 'Whatsapp' },
    { name: 'Mona Kane', image: 'Mona kane', app: 'Whatsapp' },
    { name: 'Jasper', image: 'Jasper', app: 'Whatsapp' },
    { name: 'Mary Jane', image: 'Mary Jane', app: 'Whatsapp' },
    { name: 'Cameron', fullName: 'Cameron Evans', image: 'Cameron Evans', app: 'Outlook' },
    { name: 'Sarah Prerez', image: 'Sarh Prerez', app: 'Whatsapp' },
    { name: 'Hillary R', image: 'Hillary', app: 'Whatsapp' },
    { name: 'Carlos K.', image: 'Carlos K', app: 'Outlook' }
  ];
  const apps = [
    { name: 'Nearby Share', image: 'Nearby share' },
    { name: 'Whatsapp', image: 'Whatsapp' },
    { name: 'Outlook', image: 'Outlook', labelWidth: 73 },
    { name: 'Twitter', image: 'X' },
    { name: 'Copilot', image: 'Copilot', labelWidth: 73 },
    { name: 'Instagram', image: 'Instagram' },
    { name: 'ChatGPT', image: 'Chat GPT' },
    { name: 'iCloud Photos', image: 'icloud', labelWidth: 93 },
    { name: 'Unigram', image: 'Unigram' },
    { name: 'Clipchamp', image: 'Clipchamp', labelWidth: 73 },
    { name: 'Microsoft Edge', image: 'edge', folder: 'icons', extra: true, labelWidth: 82 }
  ];
  const menu = document.createElement('div');
  menu.className = 'ss-menu';
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', 'File actions');
  menu.hidden = true;
  const menuIcons = {
    cut: 'Cut', copy: 'Copy', rename: 'Rename', share: 'Share', delete: 'Delete',
    photos: 'Photos', openWith: 'Context Menu Icons-1', background: 'Context Menu Icons-3',
    rotateRight: 'Context Menu Icons-4', rotateLeft: 'Context Menu Icons-5', favorite: 'Context Menu Icons-6',
    compress: 'Context Menu Icons-7', link: 'Context Menu Icons-8', properties: 'Context Menu Icons-9',
    copilot: 'Copilot', paint: 'Paint', more: 'Show more'
  };
  const menuIcon = glyph => menuIcons[glyph]
    ? `<img class="ss-menu-icon" src="${assetPath('icons', menuIcons[glyph])}" alt="">`
    : svg(glyph, 16);
  const menuButton = (label, glyph, action, { shortcut = '', submenu = false, photoOnly = false } = {}) => `
    <button type="button" role="menuitem" tabindex="-1" data-action="${action}"${photoOnly ? ' data-photo-only' : ''}>
      ${menuIcon(glyph)}<span>${label}</span>${shortcut ? `<kbd>${shortcut}</kbd>` : ''}${submenu ? `<span class="ss-menu-chevron">${svg('chevron', 12)}</span>` : ''}
    </button>`;
  menu.innerHTML = `
    <div class="ss-command-bar" role="group" aria-label="Quick actions">
      ${menuButton('Cut', 'cut', 'cut')}
      ${menuButton('Copy', 'copy', 'copy')}
      ${menuButton('Rename', 'rename', 'rename')}
      ${menuButton('Share', 'share', 'share')}
      ${menuButton('Delete', 'delete', 'delete')}
    </div>
    <div class="ss-menu-divider" role="separator"></div>
    <div class="ss-menu-group" role="group" aria-label="File commands">
      ${menuButton('Open', 'photos', 'open', { shortcut: 'Enter' })}
      ${menuButton('Open with', 'openWith', 'openWith', { submenu: true })}
      ${menuButton('Share', 'share', 'share')}
      ${menuButton('Set as desktop background', 'background', 'background', { photoOnly: true })}
      ${menuButton('Rotate right', 'rotateRight', 'rotateRight', { photoOnly: true })}
      ${menuButton('Rotate left', 'rotateLeft', 'rotateLeft', { photoOnly: true })}
      ${menuButton('Add to favorites', 'favorite', 'favorite')}
      ${menuButton('Compress to...', 'compress', 'compress')}
      ${menuButton('Copy as path', 'link', 'path', { shortcut: 'Ctrl+Shift+C' })}
      ${menuButton('Properties', 'properties', 'properties', { shortcut: 'Alt+Enter' })}
    </div>
    <div class="ss-menu-divider" role="separator"></div>
    <div class="ss-menu-group" role="group" aria-label="Applications">
      ${menuButton('Ask Copilot', 'copilot', 'copilot')}
      ${menuButton('Edit in Photos', 'photos', 'editPhotos', { photoOnly: true })}
      ${menuButton('Edit with Paint', 'paint', 'paint', { photoOnly: true })}
      ${menuButton('Photos', 'photos', 'photos', { submenu: true, photoOnly: true })}
    </div>
    <div class="ss-menu-divider" role="separator"></div>
    <div class="ss-menu-group" role="group" aria-label="More commands">
      ${menuButton('Show more options', 'more', 'more')}
    </div>`;
  const menuNotice = document.createElement('p');
  menuNotice.className = 'ss-menu-notice';
  menuNotice.setAttribute('role', 'status');
  menuNotice.hidden = true;
  const sheet = document.createElement('dialog');
  sheet.className = 'ss-sheet';
  sheet.tabIndex = -1;
  sheet.setAttribute('aria-labelledby', 'ss-title');
  sheet.innerHTML = `
    <header class="ss-header">${otherIcon('Share')}<h1 id="ss-title">Share</h1>
      <span class="ss-avatar" aria-label="Susiee Mendez profile"><img class="ss-person-photo" src="${assetPath('People icons', 'Sussiee')}" alt=""></span>
      <button class="ss-close" type="button" aria-label="Close share sheet"><img src="${assetPath('Other icons', 'Cross icon')}" alt=""></button>
    </header>
    <div class="ss-body">
      <section class="ss-preview-card" aria-label="Selected files">
        <div class="ss-file-header"><span class="ss-file-icon">${otherIcon('photo')}</span>
          <div class="ss-file-info"><span class="ss-file-title"></span><span class="ss-file-size" title="Sample file size for this prototype">842 KB</span></div>
          <div class="ss-history" hidden><button type="button" class="ss-undo" aria-label="Undo">${otherIcon('Undo')}</button><button type="button" class="ss-redo" aria-label="Redo"><img class="ss-asset-icon ss-redo-enabled" src="${assetPath('Other icons', 'Redo enabled')}" alt=""><img class="ss-asset-icon ss-redo-disabled" src="${assetPath('Other icons', 'Redo disabled')}" alt=""></button></div>
        </div>
        <div class="ss-media" aria-busy="false">
        <div class="ss-preview"><img class="ss-main-image" alt="" hidden>
          <div class="ss-file-fallback" hidden></div>
          <button class="ss-edit" type="button" aria-label="Edit selected file">${svg('edit')}</button>
        </div>
        <div class="ss-thumbnails" role="group" aria-label="File previews"></div>
        <div class="ss-pdf-pages" role="region" aria-label="Simulated merged PDF pages" hidden></div>
        <section class="ss-bill-details" aria-labelledby="ss-details-heading" hidden>
          <div class="ss-details-header"><h2 id="ss-details-heading">Bill details</h2><button type="button" class="ss-copy-details" aria-label="Copy sample bill details"><span class="ss-copy-icon">${otherIcon('Copy button')}</span><span class="ss-copied-icon">${otherIcon('tick mark for copied')}</span></button></div>
          <table aria-label="Sample extracted bill details"><thead><tr><th scope="col">Medical Name</th><th scope="col">Date</th><th scope="col">Invoice no.</th><th scope="col">Amount</th></tr></thead><tbody></tbody></table>
          <div class="ss-passport-lines" aria-label="Sample extracted passport details"></div>
          <label class="ss-include-details"><input type="checkbox" checked><span class="ss-checkbox-box" aria-hidden="true"></span><span>Add these details to the message</span></label>
        </section>
        <section class="ss-summary" aria-labelledby="ss-summary-heading" hidden>
          <div class="ss-summary-header"><h2 id="ss-summary-heading">Description length</h2>
            <div class="ss-length" role="radiogroup" aria-label="Description length">
              <button type="button" role="radio" data-length="short">Short</button><button type="button" role="radio" data-length="medium">Medium</button><button type="button" role="radio" data-length="long">Long</button>
            </div>
          </div>
          <div class="ss-summary-text" role="region" aria-label="Sample summary" tabindex="0"></div>
          <label class="ss-include-details ss-include-summary"><input type="checkbox" checked><span class="ss-checkbox-box" aria-hidden="true"></span><span>Add these details to the message</span></label>
        </section>
        </div>
        <section class="ss-smart" aria-labelledby="ss-smart-heading">
          <div class="ss-smart-title" id="ss-smart-heading">${otherIcon('Sparkle')}<span>Smart suggest</span></div>
          <div class="ss-smart-actions">
            <button type="button" class="ss-pill ss-merge">${otherIcon('Camera Sparkles')}<span>Smart merge</span></button>
            <button type="button" class="ss-pill ss-convert">${otherIcon('GIF')}<span>Convert to GIF</span></button>
            <button type="button" class="ss-wand" aria-label="About smart suggestions">${svg('wand', 19)}</button>
          </div>
        </section>
      </section>
      <section class="ss-right" aria-label="Share destinations">
        <label class="ss-search">${svg('search', 22)}<input type="search" aria-label="Search for people or app" placeholder="Search for people or app"></label>
        <div class="ss-people" role="group" aria-label="Suggested people"></div>
        <p class="ss-empty ss-no-people" hidden>No matching people.</p>
        <div class="ss-app-header"><h2>Share with</h2><button class="ss-all-apps" type="button" aria-expanded="false"><span>More</span>${svg('chevron', 14)}</button></div>
        <div class="ss-apps" role="group" aria-label="Apps"></div>
        <p class="ss-empty ss-no-apps" hidden>No matching apps.</p>
      </section>
    </div>
    <div class="ss-status" hidden><span class="ss-status-text" role="status"></span><button type="button" class="ss-dismiss-status" aria-label="Dismiss notification">&times;</button></div>
    <p class="ss-announcement" role="status" aria-live="polite">Interactive prototype. PDF conversion and bill extraction use simulated results.</p>`;
  document.body.append(menu, menuNotice, sheet);
  updateSheetScale();
  const find = selector => sheet.querySelector(selector);
  const status = find('.ss-status');
  let files = [];
  let origin = null;
  let selectedIndex = 0;
  let allApps = false;
  let noticeTimeout;
  let processingTimer = null;
  let transitionTimer = null;
  let enterTimer = null;
  const busy = () => processingTimer !== null || transitionTimer !== null;
  const initialState = () => ({ merged: false, extracted: false, person: null });
  let billHistory = [initialState()];
  let billHistoryIndex = 0;
  const sampleBillRows = [
    ['Zen labs', '24-05-2026', '411253', '5200'],
    ['Ingles Clinic', '24-05-2026', '001-003', '1025'],
    ['Ingles Clinic', '24-05-2026', '001-003', '1025'],
    ['+24 medical', '25-05-2026', '000526', '800'],
    ['Apollo clinic', '26-05-2026', 'AB-00189', '8000']
  ];
  sampleBillRows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(value => {
      const td = document.createElement('td');
      td.textContent = value;
      tr.append(td);
    });
    find('.ss-bill-details tbody').append(tr);
  });
  const currentBillState = () => billHistory[billHistoryIndex];
  const billsSelected = () => files.length > 0 && files.every(file => file.category === 'bill');
  const passportSelected = () => files.length === 1 && files[0].category === 'passport';
  // Bills and the passport both support "extract details"; only bills can be merged.
  const documentSelected = () => billsSelected() || passportSelected();
  // Figma sample values for the passport specimen; nothing is read from the image.
  const samplePassportLines = [
    'Name : Angela Zoe',
    'Passport number : 925076473',
    'Nationality : British Citizen',
    'Date of Issue: 16/07/2020',
    'Date of Expiry: 16/07/2030'
  ];
  samplePassportLines.forEach(line => {
    const p = document.createElement('p');
    p.textContent = line;
    find('.ss-passport-lines').append(p);
  });
  const docSelected = () => files.length === 1 && files[0].category === 'document' && !!files[0].pages;
  // Summaries supplied for the Spotify guidelines prototype; nothing is generated from the PDF.
  const docSummaries = {
    short: [{ text: '"Spotify’s Partner Brand Guidelines show partners how to use its logo, colors, and messaging consistently. The guide centers on one brand promise: the right music for every moment."' }],
    medium: [{ text: '"Spotify\'s brand guidelines serve as a comprehensive set of rules and recommendations to maintain consistency in how the brand is represented across various channels and touchpoints. These guidelines encompass detailed instructions on the usage of the Spotify logo, including size, placement, and clear space requirements. They also define the brand\'s color palette, specifying primary and secondary colors to be used in design elements. Typography guidelines outline the preferred fonts and styles to ensure a unified visual identity. Additionally, Spotify\'s brand guidelines provide direction on tone of voice and messaging, ensuring that all communication aligns with the brand\'s personality and values. By adhering to these guidelines, stakeholders can effectively convey the Spotify brand to audiences while maintaining brand recognition and integrity."' }],
    long: [
      { heading: 'Spotify Partner Brand Guidelines' },
      { text: 'Spotify’s Partner Brand Guidelines explain how companies can represent Spotify in joint campaigns, device promotions, and product offers. The guide starts with Spotify’s brand promise, “the right music for every moment.” It presents Spotify as a service that helps listeners find something that fits what they’re doing or how they’re feeling, whether they’re working out, hosting a party, or relaxing at home.' },
      { heading: 'Visual identity' },
      { text: 'The guide explains when to use the primary, horizontal, and monochrome versions of the Spotify logo. Each version has minimum sizes for print and digital use and rules for how much clear space to leave around it. When Spotify’s logo appears alongside a partner’s logo, the guide shows how to align and size the two marks, with different proportions for text-based logos and symbols. Partners should use approved artwork, keep the icon and wordmark together, and avoid stretching, recoloring, or adding effects to the logo. Spotify Green is the signature color, supported by neutral tones and backgrounds that maintain clear contrast.' },
      { heading: 'Messaging and promotions' },
      { text: 'The guide gives partners sample copy for describing Spotify’s catalog, its subscription tiers, and the benefits of Premium. It encourages partners to lead with what matters most to their audience, such as listening across devices, downloading music for offline playback, or listening without ads. Partners can also localize artist examples to make the catalog feel relevant to their market.' },
      { text: 'The guide gives separate examples for free trials, paid bundles, and competitions. A free-trial promotion should identify Spotify as the provider and avoid implying the trial is exclusive to the partner’s customers or tied to a purchase. Bundle copy should explain what Spotify access is included. Competition copy should name the prize precisely, such as a year of Spotify Premium. The guide also includes short copy for buttons, packaging, and other places where space is limited.' },
      { heading: 'Before publishing' },
      { text: 'The closing checklist asks partners to verify that they’ve used the specified Spotify Green, left enough clear space around the logo, and placed it on a clean background with sufficient contrast. It also asks partners to check for repeated use of the logo within the same space.' }
    ]
  };
  let summaryLength = 'medium';
  const summaryPlainText = () => docSummaries[summaryLength].map(block => block.heading || block.text).join('\n\n');
  function renderSummary() {
    const container = find('.ss-summary-text');
    container.replaceChildren(...docSummaries[summaryLength].map(block => {
      const element = document.createElement(block.heading ? 'h3' : 'p');
      element.textContent = block.heading || block.text;
      return element;
    }));
    container.scrollTop = 0;
    find('.ss-length').querySelectorAll('button').forEach(button => {
      const selected = button.dataset.length === summaryLength;
      button.setAttribute('aria-checked', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
  }
  const includeDetailsInput = () => find(docSelected() ? '.ss-include-summary input' : '.ss-include-details input');
  const peopleSelected = () => files.length > 1 && files.every(file => file.category === 'people');
  // Smart suggest "Share photos of" pills, in Figma order.
  const photoPeople = ['Sabhyata', 'Suhana'];
  const shownFiles = () => {
    const person = peopleSelected() && currentBillState().person;
    if (!person) return files;
    // The person's best photo leads their filtered set, then the Figma highlight order (80:97540).
    const matches = files.filter(file => file.people === person);
    const rank = file => file.featured ? 0 : file.personOrder || 99;
    return [...matches].sort((a, b) => rank(a) - rank(b));
  };
  let renderedPerson = null;
  const notify = message => {
    status.hidden = false;
    find('.ss-status-text').textContent = message;
  };
  sheet.addEventListener('error', event => {
    const image = event.target;
    if (image instanceof HTMLImageElement && image.matches('.ss-asset-icon, .ss-person-photo, .ss-badge img, .ss-app-icon img')) {
      notify(`Image asset could not be loaded: ${decodeURI(image.getAttribute('src'))}`);
    }
  }, true);
  const targetButton = (name, iconMarkup, onShare) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ss-target';
    button.innerHTML = iconMarkup;
    const label = document.createElement('span');
    label.className = 'ss-target-label';
    label.textContent = name;
    label.title = name;
    button.append(label);
    button.addEventListener('click', () => {
      const merged = billsSelected() && currentBillState().merged;
      const withDetails = (documentSelected() || docSelected()) && currentBillState().extracted && includeDetailsInput().checked;
      if (onShare) {
        onShare({ merged, withDetails });
        return;
      }
      const shared = shownFiles().length;
      const detailsKindLabel = docSelected() ? 'summary' : passportSelected() ? 'passport details' : 'bill details';
      notify(`Prototype only: ${merged ? '1 merged PDF' : `${shared} selected ${shared === 1 ? 'item' : 'items'}`}${withDetails ? ` with sample ${detailsKindLabel}` : ''} for ${name}. No files were sent.`);
    });
    return button;
  };
  // Opens the inline "Share with Outlook" compose step; Back returns to this sheet with its state intact.
  function shareToOutlook(person, { withDetails }) {
    const file = files[0];
    const returnFocus = origin;
    origin = null;
    sheet.close();
    window.OutlookShare.open({
      contact: { name: person.fullName || person.name, image: assetPath('People icons', person.image) },
      file: { name: file.name, size: file.size || '' },
      text: withDetails ? summaryPlainText() : '',
      returnFocus,
      onBack: () => {
        origin = returnFocus;
        sheet.showModal();
        sheet.focus();
      }
    });
  }
  // Hands the current share-sheet state to the simulated WhatsApp window.
  function shareToWhatsApp(person, { merged, withDetails }) {
    const attachments = merged
      ? [{ type: 'pdf', name: 'Hospital bills_Merged.pdf', pages: files.length, size: '10MB', preview: files[0].preview }]
      : shownFiles().map(file => ({ type: file.preview ? 'image' : 'file', name: file.name, preview: file.preview, thumbnail: file.thumbnail }));
    const contact = { name: person.name, image: assetPath('People icons', person.image) };
    const returnFocus = origin;
    origin = null;
    sheet.close();
    const caption = !withDetails ? null
      : passportSelected() ? ['Details:', ...samplePassportLines].join('\n')
      : sampleBillRows.map(row => [...row]);
    window.WhatsAppWindow.shareTo({ contact, attachments, caption }, returnFocus);
  }
  function renderTargets() {
    const query = find('.ss-search input').value.trim().toLowerCase();
    const peopleGrid = find('.ss-people');
    const appGrid = find('.ss-apps');
    peopleGrid.replaceChildren();
    appGrid.replaceChildren();
    const suggestedPeople = peopleSelected()
      ? people.map(person => person.name === 'Carlos' ? { name: 'Sabhyata', image: 'Sabhyata', app: 'Whatsapp' } : person)
      : docSelected()
        // Figma 80:98606: Outlook contacts are suggested for the PDF.
        ? people.map(person => person.name === 'Carlos' ? { name: 'Samantha', image: 'Samantha', app: 'Outlook' }
          : person.name === 'Mona Kane' ? { ...person, app: 'Outlook' } : person)
        : people;
    suggestedPeople.filter(person => `${person.name} ${person.fullName || ''} ${person.app || ''}`.toLowerCase().includes(query)).forEach(person => {
      const badge = person.phone ? '' : `<span class="ss-badge ss-badge-${person.app.toLowerCase()}"><img src="${assetPath('App icons', person.app)}" alt=""></span>`;
      const markup = person.phone
        ? '<span class="ss-phone"><img src="icons/myphone.png" alt=""></span>'
        : `<span class="ss-avatar"><img class="ss-person-photo" src="${assetPath('People icons', person.image)}" alt="">${badge}</span>`;
      const handler = person.app === 'Whatsapp' && window.WhatsAppWindow ? state => shareToWhatsApp(person, state)
        : person.app === 'Outlook' && docSelected() && window.OutlookShare ? state => shareToOutlook(person, state)
        : null;
      const button = targetButton(person.name, markup, handler);
      button.setAttribute('aria-label', person.phone ? `${person.name}, My Phone` : `${person.name}, ${person.app}`);
      peopleGrid.append(button);
    });
    apps.filter(app => (allApps || query || !app.extra) && app.name.toLowerCase().includes(query)).forEach(app => {
      const icon = `<img src="${assetPath(app.folder || 'App icons', app.image)}" alt="">`;
      const button = targetButton(app.name, `<span class="ss-app-icon">${icon}</span>`);
      if (app.labelWidth) button.style.setProperty('--ss-label-width', `${app.labelWidth}px`);
      appGrid.append(button);
    });
    find('.ss-no-people').hidden = peopleGrid.childElementCount > 0;
    find('.ss-no-apps').hidden = appGrid.childElementCount > 0;
    sheet.classList.toggle('ss-expanded-apps', allApps);
  }
  function showPreview(index) {
    selectedIndex = index;
    const file = shownFiles()[index];
    const image = find('.ss-main-image');
    const fallback = find('.ss-file-fallback');
    image.hidden = true;
    fallback.hidden = true;
    image.removeAttribute('src');
    updateFileHeader();
    const showFallback = message => {
      image.hidden = true;
      fallback.hidden = false;
      fallback.innerHTML = svg(file.folder ? 'folder' : 'file', 86);
      const label = document.createElement('span');
      label.textContent = file.name;
      const hint = document.createElement('small');
      hint.textContent = message;
      fallback.append(label, hint);
    };
    image.onerror = () => showFallback('Image preview could not be loaded.');
    if (file.preview) {
      image.alt = file.name;
      image.src = file.preview;
      image.hidden = false;
    } else {
      showFallback(file.folder ? 'Folder selected' : 'Preview is not available for this file type.');
    }
    find('.ss-thumbnails').querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  }
  function updateFileHeader() {
    const merged = billsSelected() && currentBillState().merged;
    const doc = docSelected();
    const shown = shownFiles();
    find('.ss-file-icon').innerHTML = merged || doc ? svg('pdf', 24) : otherIcon('photo');
    find('.ss-file-title').textContent = merged ? 'Hospital bills_Merged.pdf' : shown[selectedIndex].name + (shown.length > 1 ? ` +${shown.length - 1} items` : '');
    find('.ss-file-title').title = merged ? 'Simulated merged PDF - original files are unchanged' : shown.map(item => item.name).join('\n');
    find('.ss-file-size').textContent = merged ? '10 MB' : peopleSelected() ? `${(shown.length * 0.63).toFixed(1)} MB` : passportSelected() ? '20 KB' : doc && files[0].size ? files[0].size : '842 KB';
  }
  function renderThumbnails() {
    const thumbnails = find('.ss-thumbnails');
    thumbnails.replaceChildren();
    shownFiles().forEach((file, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ss-thumbnail';
      button.setAttribute('aria-label', `Preview ${file.name}`);
      button.setAttribute('aria-pressed', 'false');
      if (file.preview) {
        const image = document.createElement('img');
        image.src = file.thumbnail || file.preview;
        image.alt = '';
        image.onerror = () => {
          button.innerHTML = svg('file', 28);
          button.title = 'Image preview could not be loaded';
        };
        button.append(image);
      } else {
        button.innerHTML = svg(file.folder ? 'folder' : 'file', 28);
      }
      button.addEventListener('click', () => showPreview(index));
      thumbnails.append(button);
    });
    thumbnails.scrollLeft = 0;
    renderedPerson = peopleSelected() ? currentBillState().person : null;
  }
  function renderBillState() {
    const { merged, extracted, person } = currentBillState();
    const active = billsSelected();
    const passport = passportSelected();
    const doc = docSelected();
    const documentMode = active || passport;
    const peopleMode = peopleSelected();
    if (peopleMode && person !== renderedPerson) {
      renderThumbnails();
      showPreview(0);
    }
    sheet.classList.toggle('ss-merged', active && merged);
    sheet.classList.toggle('ss-extracted', (documentMode || doc) && extracted);
    find('.ss-preview').hidden = (active && merged) || doc;
    find('.ss-thumbnails').hidden = passport || doc || (active && (merged || extracted));
    find('.ss-edit').hidden = active && extracted;
    find('.ss-pdf-pages').hidden = !(active && merged) && !doc;
    find('.ss-bill-details').hidden = !documentMode || !extracted;
    find('.ss-summary').hidden = !doc || !extracted;
    // Undo/redo appear once any smart action has run.
    find('.ss-history').hidden = !(documentMode || peopleMode || doc) || billHistory.length === 1;
    find('.ss-undo').disabled = billHistoryIndex === 0;
    find('.ss-redo').disabled = billHistoryIndex === billHistory.length - 1;
    const completedStates = peopleMode
      ? [['.ss-merge', person === photoPeople[0]], ['.ss-convert', person === photoPeople[1]]]
      : passport || doc
        ? [['.ss-merge', extracted], ['.ss-convert', false]]
        : [['.ss-merge', active && merged], ['.ss-convert', active && extracted]];
    for (const [selector, completed] of completedStates) {
      const button = find(selector);
      button.classList.toggle('ss-completed', completed);
      button.setAttribute('aria-pressed', String(completed));
      button.disabled = busy() || completed;
    }
    updateFileHeader();
  }
  // Fades the current preview out, swaps to the new state, then animates the new content in.
  function renderWithTransition(render = renderBillState) {
    clearTimeout(transitionTimer);
    clearTimeout(enterTimer);
    sheet.classList.remove('ss-entering');
    sheet.classList.add('ss-leaving');
    sheet.querySelectorAll('.ss-pill').forEach(button => { button.disabled = true; });
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220;
    transitionTimer = setTimeout(() => {
      transitionTimer = null;
      render();
      sheet.classList.remove('ss-leaving');
      void sheet.offsetWidth;
      sheet.classList.add('ss-entering');
      enterTimer = setTimeout(() => sheet.classList.remove('ss-entering'), 900);
    }, delay);
  }
  function cancelProcessing() {
    clearTimeout(processingTimer);
    processingTimer = null;
    clearTimeout(transitionTimer);
    transitionTimer = null;
    clearTimeout(enterTimer);
    sheet.classList.remove('ss-processing', 'ss-leaving', 'ss-entering');
    find('.ss-media').setAttribute('aria-busy', 'false');
  }
  // Shared processing flow for smart suggestions: shimmer, then record the new state in history.
  function runSmartAction(change, startMessage, doneMessage) {
    status.hidden = true;
    sheet.classList.add('ss-processing');
    find('.ss-media').setAttribute('aria-busy', 'true');
    find('.ss-announcement').textContent = startMessage;
    processingTimer = setTimeout(() => {
      processingTimer = null;
      sheet.classList.remove('ss-processing');
      find('.ss-media').setAttribute('aria-busy', 'false');
      billHistory = billHistory.slice(0, billHistoryIndex + 1);
      billHistory.push({ ...currentBillState(), ...change });
      billHistoryIndex++;
      renderWithTransition();
      find('.ss-announcement').textContent = doneMessage;
    }, 1600);
    renderBillState();
  }
  function processBills(action) {
    if (busy() || currentBillState()[action]) return;
    if (passportSelected()) {
      runSmartAction({ extracted: true }, 'Extracting sample passport details.', 'Sample passport details ready. These are Figma sample values, not OCR results.');
      return;
    }
    if (docSelected()) {
      runSmartAction({ extracted: true }, 'Adding a summary of the PDF.', 'Sample summary ready. This text is provided for the prototype, not generated from the PDF.');
      return;
    }
    runSmartAction(
      { [action]: true },
      action === 'merged' ? 'Merging bills into a single PDF preview.' : 'Extracting sample bill details.',
      action === 'merged' ? 'Simulated PDF ready. Original bill images are unchanged.' : 'Sample bill details ready. These are Figma sample values, not OCR results.'
    );
  }
  function filterPhotosOf(person) {
    if (busy() || currentBillState().person === person) return;
    const count = files.filter(file => file.people === person).length;
    runSmartAction({ person }, `Finding photos of ${person}.`, `Showing ${count} photos of ${person}. Prototype grouping uses preset photo tags.`);
  }
  function updateSheetScale() {
    const scale = window.matchMedia('(max-width: 650px)').matches
      ? 1
      : Math.min(window.innerWidth / 1920, window.innerHeight / 1200);
    sheet.style.setProperty('--ss-sheet-scale', String(scale));
  }
  function openSheet() {
    cancelProcessing();
    billHistory = [initialState()];
    billHistoryIndex = 0;
    updateSheetScale();
    menu.hidden = true;
    find('.ss-search input').value = '';
    status.hidden = true;
    find('.ss-status-text').textContent = '';
    allApps = false;
    find('.ss-all-apps').setAttribute('aria-expanded', 'false');
    find('.ss-all-apps span').textContent = 'More';
    const imagesOnly = files.every(file => file.preview);
    const billsOnly = files.every(file => file.category === 'bill');
    const passport = passportSelected();
    const doc = docSelected();
    sheet.classList.toggle('ss-bills', billsOnly);
    sheet.classList.toggle('ss-passport', passport);
    sheet.classList.toggle('ss-doc', doc);
    const mergeLabel = doc ? 'Add a summary' : passport ? 'Extract details' : billsOnly ? 'Merge to single PDF' : !imagesOnly ? 'Merge and convert to PDF' : 'Smart merge';
    const convertLabel = doc ? 'Extract images' : passport ? 'Convert to PDF' : billsOnly ? 'Extract bill details' : imagesOnly ? 'Convert to GIF' : 'Summarize files';
    const peopleMode = peopleSelected();
    sheet.classList.toggle('ss-people-mode', peopleMode);
    if (peopleMode) {
      [['.ss-merge', photoPeople[0]], ['.ss-convert', photoPeople[1]]].forEach(([selector, person]) => {
        const pill = find(selector);
        pill.innerHTML = `<span>Share photos of</span><img class="ss-pill-avatar" src="${assetPath('People icons', person)}" alt="">`;
        pill.setAttribute('aria-label', `Share photos of ${person}`);
        pill.title = `Share photos of ${person}`;
      });
    } else {
      const iconsFolderIcon = name => `<img class="ss-asset-icon" src="${assetPath('icons', name)}" alt="">`;
      find('.ss-merge').innerHTML = `${doc ? iconsFolderIcon('Add summary') : otherIcon(passport ? 'Document Text Extract' : billsOnly ? 'Merge' : 'Camera Sparkles')}<span>${mergeLabel}</span>`;
      const convertIcon = doc ? iconsFolderIcon('Extract images')
        : passport ? iconsFolderIcon('Document PDF')
        : otherIcon(billsOnly ? 'Document Text Extract' : 'GIF');
      find('.ss-convert').innerHTML = `${convertIcon}<span>${convertLabel}</span>`;
      ['.ss-merge', '.ss-convert'].forEach(selector => {
        find(selector).removeAttribute('aria-label');
        find(selector).removeAttribute('title');
      });
    }
    find('.ss-wand').hidden = billsOnly || peopleMode || passport;
    find('#ss-details-heading').textContent = passport ? 'Details' : 'Bill details';
    resetCopyButton();
    find('.ss-include-details input').checked = true;
    find('.ss-include-summary input').checked = true;
    summaryLength = 'medium';
    renderSummary();
    find('.ss-announcement').textContent = 'Interactive prototype. PDF conversion and bill extraction use simulated results.';
    const pages = find('.ss-pdf-pages');
    pages.replaceChildren();
    pages.setAttribute('aria-label', doc ? `${files[0].name} pages` : 'Simulated merged PDF pages');
    if (doc) files[0].pages.forEach((src, index) => {
      const page = document.createElement('div');
      page.className = 'ss-pdf-page';
      const image = document.createElement('img');
      image.src = src;
      image.alt = `Page ${index + 1} of ${files[0].pages.length}`;
      image.loading = 'lazy';
      image.onerror = () => notify(`PDF page image could not be loaded: page ${index + 1}`);
      page.append(image);
      pages.append(page);
    });
    if (billsOnly) files.forEach((file, index) => {
      const page = document.createElement('div');
      page.className = 'ss-pdf-page';
      const image = document.createElement('img');
      image.src = file.preview;
      image.alt = `PDF page ${index + 1}: ${file.name}`;
      image.onerror = () => notify(`PDF preview image could not be loaded: ${file.name}`);
      const count = document.createElement('span');
      count.className = 'ss-page-count';
      count.textContent = `Page ${String(index + 1).padStart(2, '0')} / ${String(files.length).padStart(2, '0')}`;
      page.append(image, count);
      pages.append(page);
    });
    renderThumbnails();
    showPreview(0);
    renderBillState();
    renderTargets();
    sheet.showModal();
    sheet.focus();
  }
  window.ShareSheet = {
    showMenu(x, y, selectedFiles, source) {
      files = selectedFiles;
      origin = source;
      menuNotice.hidden = true;
      clearTimeout(noticeTimeout);
      menu.setAttribute('aria-label', `File actions for ${files.length === 1 ? files[0].name : `${files.length} selected items`}`);
      const photosOnly = files.every(file => file.preview);
      menu.querySelectorAll('[data-photo-only]').forEach(button => { button.hidden = !photosOnly; });
      menu.hidden = false;
      menu.scrollTop = 0;
      menu.style.left = `${Math.max(4, Math.min(x, innerWidth - menu.offsetWidth - 8))}px`;
      menu.style.top = `${Math.max(4, Math.min(y, innerHeight - menu.offsetHeight - 56))}px`;
      focusMenuItem(menu.querySelector('button'));
    }
  };
  function focusMenuItem(button) {
    menu.querySelectorAll('button').forEach(item => { item.tabIndex = item === button ? 0 : -1; });
    button.focus({ preventScroll: true });
  }
  function closeMenu() {
    menu.hidden = true;
    if (origin && origin.isConnected) origin.focus();
  }
  menu.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.action === 'share') {
      openSheet();
    } else {
      closeMenu();
      menuNotice.textContent = `Prototype only: "${button.textContent.trim().replace(/\s+/g, ' ')}" is not connected. No files were modified.`;
      menuNotice.hidden = false;
      clearTimeout(noticeTimeout);
      noticeTimeout = setTimeout(() => { menuNotice.hidden = true; }, 6000);
    }
  });
  menu.addEventListener('keydown', event => {
    const buttons = [...menu.querySelectorAll('button')].filter(button => !button.hidden);
    const index = buttons.indexOf(event.target.closest('button'));
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % buttons.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    else if (event.key === 'Escape' || event.key === 'Tab') {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
      return;
    }
    if (next !== undefined) {
      event.preventDefault();
      focusMenuItem(buttons[next]);
      buttons[next].scrollIntoView({ block: 'nearest' });
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!menu.hidden && !menu.contains(event.target)) menu.hidden = true;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu();
    }
  });
  window.addEventListener('resize', () => {
    menu.hidden = true;
    updateSheetScale();
  });
  find('.ss-close').addEventListener('click', () => sheet.close());
  find('.ss-dismiss-status').addEventListener('click', () => {
    status.hidden = true;
    sheet.focus();
  });
  document.addEventListener('keydown', event => {
    if (sheet.open && event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      sheet.close();
    }
  }, true);
  sheet.addEventListener('close', () => {
    cancelProcessing();
    if (origin && origin.isConnected) origin.focus();
  });
  find('.ss-search input').addEventListener('input', renderTargets);
  find('.ss-pdf-pages').addEventListener('wheel', event => {
    const strip = event.currentTarget;
    // Only the summary layout lays the pages out horizontally.
    if (!sheet.classList.contains('ss-extracted') || strip.scrollWidth <= strip.clientWidth || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    event.preventDefault();
    strip.scrollLeft += event.deltaY;
  }, { passive: false });
  const lengthButtons = () => [...find('.ss-length').querySelectorAll('button')];
  function selectLength(length) {
    if (length === summaryLength) return;
    summaryLength = length;
    renderSummary();
    find('.ss-announcement').textContent = `${length[0].toUpperCase()}${length.slice(1)} summary shown.`;
  }
  find('.ss-length').addEventListener('click', event => {
    const button = event.target.closest('button[data-length]');
    if (button) selectLength(button.dataset.length);
  });
  find('.ss-length').addEventListener('keydown', event => {
    const buttons = lengthButtons();
    const index = buttons.findIndex(button => button.dataset.length === summaryLength);
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = buttons[(index + step + buttons.length) % buttons.length];
    selectLength(next.dataset.length);
    next.focus();
  });
  find('.ss-thumbnails').addEventListener('wheel', event => {
    const strip = event.currentTarget;
    if (strip.scrollWidth <= strip.clientWidth || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    event.preventDefault();
    strip.scrollLeft += event.deltaY;
  }, { passive: false });
  find('.ss-all-apps').addEventListener('click', () => {
    allApps = !allApps;
    find('.ss-all-apps').setAttribute('aria-expanded', String(allApps));
    find('.ss-all-apps span').textContent = allApps ? 'Suggested apps' : 'More';
    renderTargets();
  });
  find('.ss-edit').addEventListener('click', () => notify(`Prototype only: editing ${shownFiles()[selectedIndex].name} requires an image editor integration.`));
  find('.ss-merge').addEventListener('click', () => {
    if (billsSelected()) processBills('merged');
    else if (passportSelected() || docSelected()) processBills('extracted');
    else if (peopleSelected()) filterPhotosOf(photoPeople[0]);
    else notify(`Prototype only: ${find('.ss-merge span').textContent} requires a file-processing integration. No files were modified.`);
  });
  find('.ss-convert').addEventListener('click', () => {
    if (billsSelected()) processBills('extracted');
    else if (peopleSelected()) filterPhotosOf(photoPeople[1]);
    else notify(`Prototype only: ${find('.ss-convert span').textContent} requires a file-processing integration. No files were modified.`);
  });
  for (const [selector, step] of [['.ss-undo', -1], ['.ss-redo', 1]]) {
    find(selector).addEventListener('click', () => {
      cancelProcessing();
      billHistoryIndex = Math.max(0, Math.min(billHistory.length - 1, billHistoryIndex + step));
      find('.ss-undo').disabled = billHistoryIndex === 0;
      find('.ss-redo').disabled = billHistoryIndex === billHistory.length - 1;
      renderWithTransition();
    });
  }
  let copiedTimer = null;
  const detailsKind = () => passportSelected() ? 'passport' : 'bill';
  function resetCopyButton() {
    clearTimeout(copiedTimer);
    const button = find('.ss-copy-details');
    button.classList.remove('ss-copied');
    button.setAttribute('aria-label', `Copy sample ${detailsKind()} details`);
  }
  find('.ss-copy-details').addEventListener('click', async () => {
    const button = find('.ss-copy-details');
    const text = passportSelected()
      ? samplePassportLines.join('\n')
      : [['Medical Name', 'Date', 'Invoice no.', 'Amount'], ...sampleBillRows].map(row => row.join('\t')).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      resetCopyButton();
      button.classList.add('ss-copied');
      button.setAttribute('aria-label', 'Copied');
      find('.ss-announcement').textContent = `Sample ${detailsKind()} details copied.`;
      copiedTimer = setTimeout(resetCopyButton, 1500);
    } catch (error) {
      notify(`Could not copy sample ${detailsKind()} details: ${error.message}`);
    }
  });
  sheet.addEventListener('close', resetCopyButton);
  find('.ss-wand').addEventListener('click', () => notify('Smart suggestions adapt to your selected files. These actions are visual prototypes; no files are processed or modified.'));
})();
