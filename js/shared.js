/**
 * Plaza Multipack - Scripts Compartidos
 * Barra de Búsqueda con atajo ⌘K / Ctrl+K, Modal de Recompra Rápida, Modo Hogar/Mayorista
 */

const SAMPLE_SEARCH_CATALOG = [
  {
    name: 'Envase Biodegradable Pamolsa Deli 1Lt con Tapa',
    category: 'Descartables & Envases',
    sku: 'PAM-DELI-1000L',
    price: 'S/ 10.00 / pqte',
    wholesale: 'S/ 68.00 / caja',
    url: '/producto.html',
    icon: 'takeout_dining'
  },
  {
    name: 'Envase Biodegradable Pamolsa Deli 8x8 con Tapa x 25un',
    category: 'Descartables & Envases',
    sku: 'BIO-PAM-88',
    price: 'S/ 10.00 / pqte',
    wholesale: 'S/ 8.50 x mayor',
    url: '/catalogo.html',
    icon: 'takeout_dining'
  },
  {
    name: 'Envase Menú 3 Divisiones Biodegradable Reyma 9x9',
    category: 'Descartables & Envases',
    sku: 'BIO-REY-99',
    price: 'S/ 12.50 / pqte',
    wholesale: 'S/ 10.20 x mayor',
    url: '/catalogo.html',
    icon: 'lunch_dining'
  },
  {
    name: 'Bowl Polipapel Kraft Ecológico 1000ml / 32oz Dasil',
    category: 'Descartables & Envases',
    sku: 'BIO-DAS-BW',
    price: 'S/ 14.00 / pqte',
    wholesale: 'S/ 11.80 x mayor',
    url: '/catalogo.html',
    icon: 'ramen_dining'
  },
  {
    name: 'Aceite Primor Clásico Galón 5L',
    category: 'Abarrotes & Consumo',
    sku: 'AB-PRI-GAL5L',
    price: 'S/ 56.00 / galón',
    wholesale: 'S/ 53.50 x mayor',
    url: '/checkout.html',
    icon: 'water_drop'
  },
  {
    name: 'Bolsa de Papel Kraft N°25 (x500u)',
    category: 'Bolsas & Embalaje',
    sku: 'EMB-KRA-500',
    price: 'S/ 203.00 / fardo',
    wholesale: 'S/ 195.00 x 3 fardos',
    url: '/catalogo.html',
    icon: 'shopping_bag'
  },
  {
    name: 'Set Cubiertos Biodegradables CPLA x 50 juegos',
    category: 'Descartables & Envases',
    sku: 'BIO-DAS-CUB',
    price: 'S/ 16.00 / pack',
    wholesale: 'S/ 13.50 x mayor',
    url: '/catalogo.html',
    icon: 'flatware'
  },
  {
    name: 'Vaso Polipapel Ecológico Reyma 12 oz con Tapa Bio x 50un',
    category: 'Descartables & Envases',
    sku: 'BIO-REY-VAS',
    price: 'S/ 18.00 / pack',
    wholesale: 'S/ 15.20 x mayor',
    url: '/catalogo.html',
    icon: 'local_cafe'
  }
];

// Initialize Search Modal
function initSearchModal() {
  const modalHTML = `
    <div id="search-modal-root" class="modal-overlay" onclick="handleSearchOverlayClick(event)">
      <div class="modal-panel p-6 space-y-4" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between pb-3 border-b border-border-hairline">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[24px]">search</span>
            <h3 class="font-headline-sm font-bold text-primary">Buscador Inteligente de Catálogo</h3>
          </div>
          <button onclick="closeSearchModal()" class="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-soft">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div class="relative">
          <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
          <input id="modal-search-input" type="text" placeholder="Buscar por producto, marca (Pamolsa, Reyma) o SKU..." 
            class="w-full pl-11 pr-4 py-3 bg-surface-subtle border border-border-hairline rounded-xl text-body-md font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-royal-blue-vivid focus:bg-surface-clean transition-all"
            oninput="handleSearchQuery(this.value)" />
        </div>

        <div class="flex items-center gap-2 text-label-sm font-label-sm text-text-muted flex-wrap">
          <span>Sugerencias:</span>
          <button onclick="applySearchTerm('Pamolsa')" class="px-2 py-0.5 rounded-full bg-surface-subtle hover:bg-border-hairline transition-colors">Pamolsa</button>
          <button onclick="applySearchTerm('Biodegradable')" class="px-2 py-0.5 rounded-full bg-surface-subtle hover:bg-border-hairline transition-colors">Biodegradable</button>
          <button onclick="applySearchTerm('Aceite')" class="px-2 py-0.5 rounded-full bg-surface-subtle hover:bg-border-hairline transition-colors">Aceite</button>
          <button onclick="applySearchTerm('Bolsa Kraft')" class="px-2 py-0.5 rounded-full bg-surface-subtle hover:bg-border-hairline transition-colors">Bolsa Kraft</button>
        </div>

        <!-- Live Results List -->
        <div id="search-results-list" class="max-h-80 overflow-y-auto space-y-2 divide-y divide-border-hairline pt-2">
          <!-- Populated dynamically -->
        </div>

        <div class="pt-3 border-t border-border-hairline flex items-center justify-between text-xs text-text-muted">
          <span>Pulsa <kbd class="px-1.5 py-0.5 bg-surface-subtle border border-border-hairline rounded font-mono">ESC</kbd> para cerrar</span>
          <a href="/catalogo.html" class="text-royal-blue-vivid font-semibold hover:underline flex items-center gap-1">
            <span>Ver catálogo completo (+2,500 productos)</span>
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Quick Reorder Modal
function initQuickReorderModal() {
  const modalHTML = `
    <div id="reorder-modal-root" class="modal-overlay" onclick="handleReorderOverlayClick(event)">
      <div class="modal-panel p-6 space-y-4 max-w-xl" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between pb-3 border-b border-border-hairline">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[24px]">receipt_long</span>
            <div>
              <h3 class="font-headline-sm font-bold text-primary">Recompra Rápida para Negocios</h3>
              <p class="text-xs text-text-muted">Abastécete en 1 clic de tus insumos gastronómicos habituales</p>
            </div>
          </div>
          <button onclick="closeReorderModal()" class="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-soft">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div class="space-y-3 max-h-96 overflow-y-auto">
          <!-- Item 1 -->
          <div class="flex items-center justify-between p-3 rounded-xl border border-border-hairline bg-surface-soft hover:bg-surface-clean transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-surface-clean border border-border-hairline flex items-center justify-center p-1 shrink-0">
                <span class="material-symbols-outlined text-primary text-[24px]">takeout_dining</span>
              </div>
              <div>
                <h4 class="font-label-lg font-bold text-on-surface">Envase Pamolsa Deli 1Lt c/tapa</h4>
                <span class="text-xs text-text-muted">Caja Master x 200 un • S/ 68.00</span>
              </div>
            </div>
            <button onclick="quickAdd('BIO-PAM-1000L', 'Envase Pamolsa Deli 1Lt c/tapa', 68.00, 'Caja Master x 200 un')" class="px-3 py-1.5 bg-primary hover:bg-royal-blue-vivid text-surface-clean rounded-lg text-label-sm font-semibold flex items-center gap-1 transition-colors">
              <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              <span>Reordenar</span>
            </button>
          </div>

          <!-- Item 2 -->
          <div class="flex items-center justify-between p-3 rounded-xl border border-border-hairline bg-surface-soft hover:bg-surface-clean transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-surface-clean border border-border-hairline flex items-center justify-center p-1 shrink-0">
                <span class="material-symbols-outlined text-amber-bright text-[24px]">water_drop</span>
              </div>
              <div>
                <h4 class="font-label-lg font-bold text-on-surface">Aceite Primor Clásico Galón 5L</h4>
                <span class="text-xs text-text-muted">Caja x 4 Galones • S/ 214.00</span>
              </div>
            </div>
            <button onclick="quickAdd('AB-PRI-CAJA', 'Aceite Primor Clásico Caja x 4 Galones', 214.00, 'Caja x 4 Galones')" class="px-3 py-1.5 bg-primary hover:bg-royal-blue-vivid text-surface-clean rounded-lg text-label-sm font-semibold flex items-center gap-1 transition-colors">
              <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              <span>Reordenar</span>
            </button>
          </div>

          <!-- Item 3 -->
          <div class="flex items-center justify-between p-3 rounded-xl border border-border-hairline bg-surface-soft hover:bg-surface-clean transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-surface-clean border border-border-hairline flex items-center justify-center p-1 shrink-0">
                <span class="material-symbols-outlined text-secondary text-[24px]">shopping_bag</span>
              </div>
              <div>
                <h4 class="font-label-lg font-bold text-on-surface">Bolsa Papel Kraft N°25 (x500u)</h4>
                <span class="text-xs text-text-muted">Fardo Comercial • S/ 203.00</span>
              </div>
            </div>
            <button onclick="quickAdd('EMB-KRA-25', 'Bolsa Papel Kraft N°25 (x500u)', 203.00, 'Fardo x 500u')" class="px-3 py-1.5 bg-primary hover:bg-royal-blue-vivid text-surface-clean rounded-lg text-label-sm font-semibold flex items-center gap-1 transition-colors">
              <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              <span>Reordenar</span>
            </button>
          </div>
        </div>

        <div class="pt-3 border-t border-border-hairline flex items-center justify-between">
          <a href="/checkout.html" class="inline-flex items-center gap-1 text-label-md font-semibold text-primary hover:underline">
            <span>Ir directo al Checkout</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
          <button onclick="closeReorderModal()" class="px-4 py-2 border border-border-hairline rounded-lg text-label-md hover:bg-surface-soft transition-colors">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openSearchModal() {
  const root = document.getElementById('search-modal-root');
  if (root) {
    root.classList.add('active');
    const input = document.getElementById('modal-search-input');
    if (input) {
      input.focus();
      handleSearchQuery(input.value || '');
    }
  }
}

function closeSearchModal() {
  const root = document.getElementById('search-modal-root');
  if (root) root.classList.remove('active');
}

function handleSearchOverlayClick(e) {
  if (e.target.id === 'search-modal-root') closeSearchModal();
}

function applySearchTerm(term) {
  const input = document.getElementById('modal-search-input');
  if (input) {
    input.value = term;
    handleSearchQuery(term);
  }
}

function handleSearchQuery(query) {
  const listEl = document.getElementById('search-results-list');
  if (!listEl) return;

  const q = (query || '').toLowerCase().trim();
  const filtered = SAMPLE_SEARCH_CATALOG.filter(item => 
    item.name.toLowerCase().includes(q) ||
    item.sku.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="p-6 text-center text-text-muted">
        <span class="material-symbols-outlined text-[32px] text-outline mb-1">search_off</span>
        <p class="font-medium text-on-surface">No encontramos coincidencias exactas para "${query}"</p>
        <p class="text-xs mt-1">Intenta con términos generales como "Pamolsa", "vaso", "bolsa" o "aceite".</p>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(item => {
    html += `
      <a href="${item.url}" class="p-3 flex items-center justify-between hover:bg-surface-soft rounded-lg transition-colors group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-surface-subtle flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-surface-clean transition-colors shrink-0">
            <span class="material-symbols-outlined text-[20px]">${item.icon}</span>
          </div>
          <div>
            <h4 class="font-label-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">${item.name}</h4>
            <div class="flex items-center gap-2 text-xs text-text-muted mt-0.5">
              <span>${item.category}</span> • <span class="font-mono text-outline">${item.sku}</span>
            </div>
          </div>
        </div>
        <div class="text-right shrink-0 pl-3">
          <span class="font-price-card font-bold text-primary block text-sm">${item.price}</span>
          <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-surface px-1.5 py-0.5 rounded border border-emerald-200">${item.wholesale}</span>
        </div>
      </a>
    `;
  });

  listEl.innerHTML = html;
}

function openReorderModal() {
  const root = document.getElementById('reorder-modal-root');
  if (root) root.classList.add('active');
}

function closeReorderModal() {
  const root = document.getElementById('reorder-modal-root');
  if (root) root.classList.remove('active');
}

function handleReorderOverlayClick(e) {
  if (e.target.id === 'reorder-modal-root') closeReorderModal();
}

function quickAdd(id, name, price, presentation) {
  if (window.PlazaCart) {
    window.PlazaCart.addItem({
      id: id,
      name: name,
      price: price,
      presentation: presentation,
      qty: 1
    });
  }
}

// Mode switch (Hogar vs Mayorista)
function setChannelMode(mode) {
  localStorage.setItem('plaza_channel_mode', mode);
  const btns = document.querySelectorAll('.channel-mode-btn');
  btns.forEach(btn => {
    const isTarget = btn.getAttribute('data-mode') === mode;
    if (isTarget) {
      btn.className = 'channel-mode-btn px-2.5 py-0.5 rounded-md text-label-sm font-label-sm bg-surface-clean text-primary font-bold shadow-sm transition-all duration-150';
    } else {
      btn.className = 'channel-mode-btn px-2.5 py-0.5 rounded-md text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-all duration-150 flex items-center gap-1 font-semibold';
    }
  });

  if (window.PlazaCart) {
    window.PlazaCart.showToast(
      mode === 'mayorista' ? 'Modo Mayorista Activado' : 'Modo Hogar Activado',
      mode === 'mayorista' ? 'Mostrando escalas de descuento por fardo y caja cerrada.' : 'Mostrando precios regulares para consumo familiar.'
    );
  }
}

// Keybindings & Triggers
document.addEventListener('DOMContentLoaded', () => {
  initSearchModal();
  initQuickReorderModal();

  // ⌘K or Ctrl+K trigger
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearchModal();
    }
  });

  // Intercept search inputs in headers to open the rich modal
  document.querySelectorAll('input[placeholder*="Buscar"]').forEach(input => {
    input.addEventListener('focus', (e) => {
      // If user clicks on search input, activate modal
      e.preventDefault();
      openSearchModal();
    });
  });

  // Recompra Rápida button triggers
  document.querySelectorAll('[href="#quick-reorder"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openReorderModal();
    });
  });
});
