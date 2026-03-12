/**
 * 1UPGaming - Main JavaScript
 * Handles: RAWG API, Game Library, Booking, WhatsApp integration
 */

// ============================================================
// CONFIGURATION
// ============================================================
const CONFIG = {
  WHATSAPP_NUMBER: '918974740608',
  INSTAGRAM_HANDLE: '1up_gaming31',
  // RAWG API key (free tier) — get yours at https://rawg.io/apidocs
  // Replace 'YOUR_RAWG_API_KEY' with your actual key to load game cover images.
  // Without a key, the library still works using emoji placeholder cards.
  RAWG_API_KEY: 'YOUR_RAWG_API_KEY',
  RAWG_BASE_URL: 'https://api.rawg.io/api',
  AREAS: ['Itanagar', 'Naharlagun', 'Nirjuli'],
  PLANS: [
    { id: '1day',  label: '1 Day',   price: 499,  icon: '⚡' },
    { id: '3days', label: '3 Days',  price: 899,  icon: '🔥' },
    { id: '1week', label: '1 Week',  price: 1399, icon: '🏆' },
  ]
};

// ============================================================
// GAME LIBRARY DATA
// ============================================================
const GAMES = [
  // Sports
  { id: 1,  title: 'EA Sports FC 25',                       genre: 'Sports',   emoji: '⚽', rawgSlug: 'ea-sports-fc-25' },
  { id: 2,  title: 'EA Sports FC 24',                       genre: 'Sports',   emoji: '⚽', rawgSlug: 'ea-sports-fc-24' },
  { id: 3,  title: 'FC 26',                                  genre: 'Sports',   emoji: '⚽', rawgSlug: 'ea-sports-fc-25', isFree: true },
  { id: 4,  title: 'NBA 2K25',                               genre: 'Sports',   emoji: '🏀', rawgSlug: 'nba-2k25' },
  { id: 5,  title: 'NBA 2K24',                               genre: 'Sports',   emoji: '🏀', rawgSlug: 'nba-2k24' },
  { id: 6,  title: 'WWE 2K24',                               genre: 'Sports',   emoji: '🤼', rawgSlug: 'wwe-2k24' },
  { id: 7,  title: 'WWE 2K23',                               genre: 'Sports',   emoji: '🤼', rawgSlug: 'wwe-2k23' },
  { id: 8,  title: 'EA Sports Cricket 24',                   genre: 'Sports',   emoji: '🏏', rawgSlug: 'cricket-24' },
  { id: 9,  title: 'PGA Tour 2K23',                          genre: 'Sports',   emoji: '⛳', rawgSlug: 'pga-tour-2k23' },

  // Action / Adventure
  { id: 10, title: 'GTA V',                                  genre: 'Action',   emoji: '🔫', rawgSlug: 'grand-theft-auto-v' },
  { id: 11, title: 'Marvel\'s Spider-Man 2',                 genre: 'Action',   emoji: '🕷️',  rawgSlug: 'marvels-spider-man-2' },
  { id: 12, title: 'Spider-Man: Miles Morales',              genre: 'Action',   emoji: '🕷️',  rawgSlug: 'marvels-spider-man-miles-morales' },
  { id: 13, title: 'God of War Ragnarök',                    genre: 'Action',   emoji: '⚔️',  rawgSlug: 'god-of-war-ragnarok' },
  { id: 14, title: 'Hogwarts Legacy',                        genre: 'Action',   emoji: '🪄', rawgSlug: 'hogwarts-legacy' },
  { id: 15, title: 'Elden Ring',                             genre: 'Action',   emoji: '💀', rawgSlug: 'elden-ring' },
  { id: 16, title: 'Ghost of Tsushima DC',                   genre: 'Action',   emoji: '🗡️',  rawgSlug: 'ghost-of-tsushima-directors-cut' },
  { id: 17, title: 'Horizon Forbidden West',                 genre: 'Action',   emoji: '🏹', rawgSlug: 'horizon-forbidden-west' },
  { id: 18, title: 'The Last of Us Part I',                  genre: 'Action',   emoji: '🧟', rawgSlug: 'the-last-of-us-part-i' },
  { id: 19, title: 'The Last of Us Part II Remastered',      genre: 'Action',   emoji: '🧟', rawgSlug: 'the-last-of-us-part-ii-remastered' },
  { id: 20, title: 'Uncharted: Legacy of Thieves',           genre: 'Action',   emoji: '🗺️',  rawgSlug: 'uncharted-legacy-of-thieves-collection' },
  { id: 21, title: 'Assassin\'s Creed Mirage',               genre: 'Action',   emoji: '🗡️',  rawgSlug: 'assassins-creed-mirage' },
  { id: 22, title: 'Assassin\'s Creed Valhalla',             genre: 'Action',   emoji: '🪓', rawgSlug: 'assassins-creed-valhalla' },

  // Racing
  { id: 23, title: 'Gran Turismo 7',                         genre: 'Racing',   emoji: '🏎️',  rawgSlug: 'gran-turismo-7' },
  { id: 24, title: 'Need for Speed Unbound',                 genre: 'Racing',   emoji: '🚗', rawgSlug: 'need-for-speed-unbound' },
  { id: 25, title: 'F1 24',                                  genre: 'Racing',   emoji: '🏁', rawgSlug: 'f1-24' },
  { id: 26, title: 'F1 23',                                  genre: 'Racing',   emoji: '🏁', rawgSlug: 'f1-23' },
  { id: 27, title: 'Forza Horizon 5',                        genre: 'Racing',   emoji: '🏎️',  rawgSlug: 'forza-horizon-5' },

  // Fighting
  { id: 28, title: 'Mortal Kombat 1',                        genre: 'Fighting', emoji: '🥊', rawgSlug: 'mortal-kombat-1' },
  { id: 29, title: 'Tekken 8',                               genre: 'Fighting', emoji: '🥋', rawgSlug: 'tekken-8' },
  { id: 30, title: 'Street Fighter 6',                       genre: 'Fighting', emoji: '👊', rawgSlug: 'street-fighter-6' },
  { id: 31, title: 'UFC 5',                                  genre: 'Fighting', emoji: '🥊', rawgSlug: 'ufc-5' },

  // Shooter
  { id: 32, title: 'Call of Duty: Modern Warfare III',       genre: 'Shooter',  emoji: '🔫', rawgSlug: 'call-of-duty-modern-warfare-iii' },
  { id: 33, title: 'Call of Duty: Modern Warfare II',        genre: 'Shooter',  emoji: '🔫', rawgSlug: 'call-of-duty-modern-warfare-ii-2022' },
  { id: 34, title: 'Battlefield 2042',                       genre: 'Shooter',  emoji: '💣', rawgSlug: 'battlefield-2042' },
  { id: 35, title: 'Resident Evil 4 Remake',                 genre: 'Shooter',  emoji: '🎮', rawgSlug: 'resident-evil-4-remake' },
  { id: 36, title: 'Resident Evil Village',                  genre: 'Shooter',  emoji: '🎮', rawgSlug: 'resident-evil-village' },

  // RPG
  { id: 37, title: 'Final Fantasy XVI',                      genre: 'RPG',      emoji: '⚔️',  rawgSlug: 'final-fantasy-xvi' },
  { id: 38, title: 'Final Fantasy VII Rebirth',              genre: 'RPG',      emoji: '🌟', rawgSlug: 'final-fantasy-vii-rebirth' },
  { id: 39, title: 'Diablo IV',                              genre: 'RPG',      emoji: '😈', rawgSlug: 'diablo-iv' },
  { id: 40, title: 'Baldur\'s Gate 3',                       genre: 'RPG',      emoji: '🐉', rawgSlug: 'baldurs-gate-3' },

  // Family / Party
  { id: 41, title: 'It Takes Two',                           genre: 'Family',   emoji: '❤️',  rawgSlug: 'it-takes-two' },
  { id: 42, title: 'Sackboy: A Big Adventure',               genre: 'Family',   emoji: '🧵', rawgSlug: 'sackboy-a-big-adventure' },
  { id: 43, title: 'Ratchet & Clank: Rift Apart',            genre: 'Family',   emoji: '🔧', rawgSlug: 'ratchet-clank-rift-apart' },

  // Horror
  { id: 44, title: 'Alan Wake 2',                            genre: 'Horror',   emoji: '👁️',  rawgSlug: 'alan-wake-2' },
  { id: 45, title: 'Dead Space Remake',                      genre: 'Horror',   emoji: '☠️',  rawgSlug: 'dead-space-remake' },

  // Others
  { id: 46, title: 'Cyberpunk 2077',                         genre: 'RPG',      emoji: '🤖', rawgSlug: 'cyberpunk-2077' },
  { id: 47, title: 'Death Stranding DC',                     genre: 'Action',   emoji: '🌊', rawgSlug: 'death-stranding-directors-cut' },
  { id: 48, title: 'Demon\'s Souls',                         genre: 'RPG',      emoji: '👿', rawgSlug: 'demons-souls-2020' },
  { id: 49, title: 'Returnal',                               genre: 'Action',   emoji: '🔄', rawgSlug: 'returnal' },
  { id: 50, title: 'Stray',                                  genre: 'Action',   emoji: '🐱', rawgSlug: 'stray' },
];

const GENRE_COLORS = {
  'Sports':   '#22c55e',
  'Action':   '#a855f7',
  'Racing':   '#3b82f6',
  'Fighting': '#ef4444',
  'Shooter':  '#f97316',
  'RPG':      '#eab308',
  'Family':   '#ec4899',
  'Horror':   '#6b7280',
};

// ============================================================
// RAWG API
// ============================================================
const rawgImageCache = {};

async function fetchGameImage(slug) {
  if (rawgImageCache[slug] !== undefined) return rawgImageCache[slug];
  if (!CONFIG.RAWG_API_KEY || CONFIG.RAWG_API_KEY === 'YOUR_RAWG_API_KEY') {
    rawgImageCache[slug] = null;
    return null;
  }
  try {
    const url = `${CONFIG.RAWG_BASE_URL}/games/${slug}?key=${CONFIG.RAWG_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) { rawgImageCache[slug] = null; return null; }
    const data = await res.json();
    rawgImageCache[slug] = data.background_image || null;
    return rawgImageCache[slug];
  } catch {
    rawgImageCache[slug] = null;
    return null;
  }
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (!navbar) return;

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      const isOpen = links.classList.contains('open');
      if (spans[0]) spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      if (spans[1]) spans[1].style.opacity   = isOpen ? '0' : '1';
      if (spans[2]) spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
  }

  // Set active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// ============================================================
// PARTICLES
// ============================================================
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const colors = ['#a855f7', '#3b82f6', '#22c55e', '#06b6d4', '#ec4899'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${6 + Math.random() * 10}s;
      animation-delay: ${Math.random() * 8}s;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      opacity: ${0.3 + Math.random() * 0.5};
    `;
    container.appendChild(p);
  }
}

// ============================================================
// GAME LIBRARY
// ============================================================
let activeFilter   = 'All';
let searchQuery    = '';
let allGames       = [...GAMES];

function getGenreColor(genre) {
  return GENRE_COLORS[genre] || '#a855f7';
}

function createGameCard(game, imageUrl) {
  const card = document.createElement('div');
  card.className = 'game-card reveal';
  card.dataset.genre = game.genre;
  card.dataset.id    = game.id;

  const genreColor = getGenreColor(game.genre);

  card.innerHTML = `
    <div class="game-card-image">
      ${imageUrl
        ? `<img src="${imageUrl}" alt="${game.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
        : ''}
      <div class="game-card-placeholder" ${imageUrl ? 'style="display:none"' : ''}>
        <span class="game-emoji">${game.emoji}</span>
        <span class="game-title-placeholder">${game.title}</span>
      </div>
      <div class="game-card-overlay">
        <button class="select-btn" onclick="selectGame(${game.id})">
          🎮 Rent Now
        </button>
      </div>
    </div>
    <div class="game-card-info">
      <div class="game-card-title" title="${game.title}">${game.title}</div>
      <div class="game-card-meta">
        <span class="game-genre-tag" style="background:${genreColor}20; color:${genreColor}; border-color:${genreColor}40">
          ${game.genre}
        </span>
        ${game.isFree ? '<span class="game-free-badge">FREE!</span>' : ''}
      </div>
    </div>
  `;

  return card;
}

async function renderGames() {
  const grid = document.getElementById('gamesGrid');
  const countEl = document.getElementById('gamesCount');
  const loadingEl = document.getElementById('gamesLoading');
  const noResultsEl = document.getElementById('noResults');
  if (!grid) return;

  // Filter
  let filtered = GAMES.filter(g => {
    const matchesGenre  = activeFilter === 'All' || g.genre === activeFilter;
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  // Count
  if (countEl) countEl.textContent = `Showing ${filtered.length} game${filtered.length !== 1 ? 's' : ''}`;

  grid.innerHTML = '';
  if (loadingEl)   loadingEl.classList.remove('hidden');
  if (noResultsEl) noResultsEl.classList.add('hidden');

  if (filtered.length === 0) {
    if (loadingEl)   loadingEl.classList.add('hidden');
    if (noResultsEl) noResultsEl.classList.remove('hidden');
    return;
  }

  // Render cards (images load async)
  filtered.forEach(game => {
    const card = createGameCard(game, null);
    grid.appendChild(card);

    // Load RAWG image asynchronously
    fetchGameImage(game.rawgSlug).then(url => {
      if (url) {
        const imgDiv   = card.querySelector('.game-card-image');
        const existing = imgDiv.querySelector('img');
        const placeholder = imgDiv.querySelector('.game-card-placeholder');
        if (!existing) {
          const img = document.createElement('img');
          img.src     = url;
          img.alt     = game.title;
          img.loading = 'lazy';
          img.onerror = function() {
            this.style.display = 'none';
            if (placeholder) placeholder.style.display = 'flex';
          };
          imgDiv.insertBefore(img, imgDiv.querySelector('.game-card-placeholder'));
        } else {
          existing.src = url;
        }
        if (placeholder) placeholder.style.display = 'none';
      }
    });
  });

  if (loadingEl) loadingEl.classList.add('hidden');

  // Trigger scroll reveal for newly added items
  setTimeout(initScrollReveal, 100);
}

function initGameLibrary() {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      renderGames();
    });
  });

  // Search
  const searchInput = document.getElementById('gameSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderGames();
    });
  }

  renderGames();
}

// ============================================================
// GAME SELECTION & BOOKING
// ============================================================
function selectGame(gameId) {
  const game = GAMES.find(g => g.id === gameId);
  if (!game) return;
  localStorage.setItem('1up_selected_game', JSON.stringify(game));
  window.location.href = 'booking.html';
}

function getSelectedGame() {
  try {
    return JSON.parse(localStorage.getItem('1up_selected_game'));
  } catch { return null; }
}

// ============================================================
// BOOKING PAGE
// ============================================================
function initBookingPage() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  // Display selected game
  const game = getSelectedGame();
  const gameDisplay = document.getElementById('selectedGameDisplay');
  if (gameDisplay) {
    if (game) {
      gameDisplay.innerHTML = `
        <div class="selected-game-card">
          <div class="selected-game-img-placeholder" id="selectedGameImg" style="font-size:2.5rem">
            ${game.emoji}
          </div>
          <div class="selected-game-info">
            <h3>${game.title}</h3>
            <span class="genre-badge">${game.genre}</span>
            ${game.isFree ? '<div class="mt-8"><span class="game-free-badge">⚽ FC 26 FREE!</span></div>' : ''}
            <p class="mt-8 text-muted" style="font-size:0.85rem">Selected for rental</p>
          </div>
        </div>
      `;

      // Load RAWG image for selected game
      fetchGameImage(game.rawgSlug).then(url => {
        if (url) {
          const imgEl = document.getElementById('selectedGameImg');
          if (imgEl) {
            imgEl.innerHTML = `<img src="${url}" alt="${game.title}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
          }
        }
      });
    } else {
      gameDisplay.innerHTML = `
        <div class="notice info">
          ℹ️ No game selected — go to <a href="games.html" style="color:var(--neon-purple)">Game Library</a> to pick a game.
        </div>
      `;
    }
  }

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBookingToWhatsApp();
  });
}

function submitBookingToWhatsApp() {
  const game = getSelectedGame();
  const plan = document.querySelector('input[name="plan"]:checked');

  if (!plan) {
    showFormError('Please select a rental plan.');
    return;
  }

  const fields = {
    name:        document.getElementById('fullName')?.value?.trim(),
    phone:       document.getElementById('phone')?.value?.trim(),
    idType:      document.getElementById('idType')?.value,
    idNumber:    document.getElementById('idNumber')?.value?.trim(),
    area:        document.getElementById('area')?.value,
    address:     document.getElementById('address')?.value?.trim(),
    apstChecked: document.getElementById('apstCheck')?.checked,
    ageChecked:  document.getElementById('ageCheck')?.checked,
  };

  // Validation
  if (!fields.name) { showFormError('Please enter your full name.'); return; }
  if (!fields.phone || !/^\d{10}$/.test(fields.phone)) { showFormError('Please enter a valid 10-digit phone number.'); return; }
  if (!fields.idNumber) { showFormError('Please enter your Aadhaar/PAN number.'); return; }
  if (!fields.area) { showFormError('Please select your area.'); return; }
  if (!fields.address) { showFormError('Please enter your delivery address.'); return; }
  if (!fields.apstChecked) { showFormError('You must confirm APST (Arunachal Pradesh Scheduled Tribe) eligibility.'); return; }
  if (!fields.ageChecked) { showFormError('You must confirm age requirement (18+ or guardian).'); return; }

  const planData = CONFIG.PLANS.find(p => p.id === plan.value);

  // Build WhatsApp message
  const msg = [
    '🎮 *NEW PS5 RENTAL BOOKING - 1UPGaming*',
    '',
    `*Game:* ${game ? game.title : 'Not specified'}`,
    `*Plan:* ${planData?.label || plan.value} — ₹${planData?.price || ''}`,
    '',
    '👤 *CUSTOMER DETAILS*',
    `*Name:* ${fields.name}`,
    `*Phone:* ${fields.phone}`,
    `*${fields.idType || 'ID'}:* ${fields.idNumber}`,
    '',
    '📍 *DELIVERY DETAILS*',
    `*Area:* ${fields.area}`,
    `*Address:* ${fields.address}`,
    '',
    '✅ *CONFIRMATIONS*',
    `• APST Eligibility: ✅ Confirmed`,
    `• Age (18+): ✅ Confirmed`,
    '',
    `⚽ *FC 26 included FREE!*`,
    `🚫 *No security deposit required*`,
    '',
    '_Sent via 1UPGaming Website_',
  ].join('\n');

  const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function showFormError(message) {
  let errEl = document.getElementById('formError');
  if (!errEl) {
    errEl = document.createElement('div');
    errEl.id = 'formError';
    errEl.className = 'notice warning';
    const submitBtn = document.getElementById('submitBookingBtn');
    if (submitBtn) submitBtn.parentElement.insertBefore(errEl, submitBtn);
  }
  errEl.textContent = '⚠️ ' + message;
  errEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => { if (errEl) errEl.textContent = ''; }, 5000);
}

// ============================================================
// HOMEPAGE
// ============================================================
function initHomepage() {
  const el = document.getElementById('homeGameList');
  if (!el) return;
  // Show a few featured games on homepage
  const featured = GAMES.filter(g => [10, 13, 15, 11, 23, 37, 28, 32].includes(g.id)).slice(0, 8);
  featured.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card reveal';
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <div class="game-card-image">
        <div class="game-card-placeholder" style="display:flex">
          <span class="game-emoji">${game.emoji}</span>
          <span class="game-title-placeholder">${game.title}</span>
        </div>
        <div class="game-card-overlay">
          <button class="select-btn" onclick="selectGame(${game.id})">🎮 Rent Now</button>
        </div>
      </div>
      <div class="game-card-info">
        <div class="game-card-title">${game.title}</div>
        <div class="game-card-meta">
          <span class="game-genre-tag">${game.genre}</span>
        </div>
      </div>
    `;
    el.appendChild(card);

    fetchGameImage(game.rawgSlug).then(url => {
      if (!url) return;
      const placeholder = card.querySelector('.game-card-placeholder');
      const imgDiv = card.querySelector('.game-card-image');
      const img = document.createElement('img');
      img.src = url;
      img.alt = game.title;
      img.loading = 'lazy';
      imgDiv.insertBefore(img, placeholder);
      if (placeholder) placeholder.style.display = 'none';
    });
  });
  setTimeout(initScrollReveal, 200);
}

// ============================================================
// COUNTER ANIMATION
// ============================================================
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1500;
    const start = Date.now();
    const update = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initParticles();
  initGameLibrary();
  initBookingPage();
  initHomepage();

  // Animate counters when visible
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }
});
