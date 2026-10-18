/**
 * Plaza Multipack - Lógica del Catálogo de Descartables y Biodegradables
 * Filtros en vivo, Slider de Precios, Ordenamiento, Vistas Cuadrícula/Lista y Adición al Carrito
 */

const CATALOG_ITEMS = [
  {
    id: 'BIO-PAM-88',
    sku: 'BIO-PAM-88',
    brand: 'Pamolsa Bio',
    brandFilter: 'pamolsa',
    material: 'bagazo',
    materialLabel: 'Bagazo de Caña (Eco)',
    modalidad: 'caja',
    modalidadLabel: 'Por Caja / Fardo',
    name: 'Envase Biodegradable Pamolsa Deli 8x8 con Tapa x 25un',
    description: 'Presentación: Paquete x 25 unidades | Resistente a microondas y grasas',
    tag: 'Bagazo 100% Compostable',
    price: 10.00,
    regularPrice: 12.60,
    wholesaleTier: 'Por Mayor (4+ pqtes): S/ 8.50 c/u',
    savings: 'Ahorras S/ 6.00 por fardo cerrado',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuiz50VKNjwEfytAzKoCQVtKkDuvQKD98xCUAsYsTmiElR6eNQX_XwZuUlhPpOk1AoN5qY0u7IvDltXM8VAi7xjW4n0FQJCgx32AfMovuHUWdMmejFepOmQmNbr-r_VF5sPNhfx9a2sDu8C-ftaz1eopZ73G4lowai7zYIlJgGSvNmmUq-jQSDHwcnAFyjb0MappkOhiUD5lVOsNvg-E9eHPo9--F4L3_dnAiF1EcOa2XmTbghIg3-3Q',
    badge: 'Eco-Friendly',
    badgeType: 'eco',
    deliveryToday: true
  },
  {
    id: 'BIO-REY-99',
    sku: 'BIO-REY-99',
    brand: 'Reyma Ecológico',
    brandFilter: 'reyma',
    material: 'bagazo',
    materialLabel: 'Bagazo de Caña (Eco)',
    modalidad: 'paquete',
    modalidadLabel: 'Por Paquete individual',
    name: 'Envase Menú 3 Divisiones Biodegradable 9x9 Paquete x 25un',
    description: 'Presentación: Paquete x 25 unidades | Cierre hermético tipo bisagra',
    tag: '3 Divisiones Menú',
    price: 12.50,
    regularPrice: 14.80,
    wholesaleTier: 'Por Mayor (6+ pqtes): S/ 10.20 c/u',
    savings: 'Ahorro de S/ 13.80 por fardo de 150 unidades',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7l23ueJUgNmfr0lfKduRE3U-4goYuTzRxX8Z4nkyXX8Df9Ayk2-LFce0zk-ylVdsENrxuAMXw_-ujaJtMOgBi3U-Y4ICFKVNv7YfLafbqkJ3A1mFea5m6ONQ4KEwlMiHmCm1M_qKvz9kD7cLThHlFyqm5feAf-r_V90ZIL99FgUHfXXYz-VUMtG0oa0aTimx5J3MVwaK77m28HPkSbUlmigLeV63SxdycbFASa4a3Tau2hdb0s7YZdw',
    badge: '-15% Oferta',
    badgeType: 'sale',
    deliveryToday: true
  },
  {
    id: 'BIO-DAS-BW',
    sku: 'BIO-DAS-BW',
    brand: 'Dasil Eco Pack',
    brandFilter: 'dasil',
    material: 'polipapel',
    materialLabel: 'Polipapel Reciclable',
    modalidad: 'caja',
    modalidadLabel: 'Por Caja / Fardo',
    name: 'Bowl Polipapel Kraft Ecológico 1000ml / 32oz con Tapa x 25un',
    description: 'Presentación: Paquete x 25 unidades | Apto para alimentos fríos y calientes',
    tag: 'Bowl Ensaladero 32 oz',
    price: 14.00,
    regularPrice: 16.50,
    wholesaleTier: 'Por Mayor (4+ pqtes): S/ 11.80 c/u',
    savings: 'Ahorras S/ 8.80 por caja máster',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg5fToydeaNVNdSsd255seublfEoyIm93EOupaRARhmaQ6Czl2LntGH_KaTBcqjvT5_Uq7KhxAnbkrgHc5ktvhIkmt93LE-dc93u-jEa7E29w3l2LDPO3yrlmxVuPMQ3y2SF-LNtYsoA0490GJEsjCE4KmocSZMUwAPCYtKDm_zi8u9KmtKMNNpWS2a0G0Yw1V0_K5Jz0npUkL0A6Ipl-7s0NtnCIeeLM3q0dQFS3KCG5rdaJ6Mnh85A',
    badge: 'Eco-Friendly',
    badgeType: 'eco',
    deliveryToday: true
  },
  {
    id: 'BIO-PAM-HAM',
    sku: 'BIO-PAM-HAM',
    brand: 'Pamolsa Bio',
    brandFilter: 'pamolsa',
    material: 'bagazo',
    materialLabel: 'Bagazo de Caña (Eco)',
    modalidad: 'caja',
    modalidadLabel: 'Por Caja / Fardo',
    name: 'Envase Hamburguesero Biodegradable Pamolsa 6x6 x 50un',
    description: 'Presentación: Paquete x 50 unidades | Térmico y biodegradable',
    tag: 'Hamburguesero 6x6',
    price: 15.50,
    regularPrice: 18.20,
    wholesaleTier: 'Por Mayor (5+ pqtes): S/ 13.00 c/u',
    savings: 'Ahorras S/ 12.50 comprando por fardo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7d3OY0_wDmydH6F_HEyw-dnVn6t6bltE9fS2KfyTkEpzMlOy-eKlrPuBluZ9SyZr2C6FqNpv2PAdVI2SUXCf8q8hg14X5J30B99NOOkOykCtYZsXs6PlS86j4yDEbf7v8nvKm7KvpF-378JEpXHHucMwyxRKgQHmdSVQUHYecGX92Xh5YzPXzQdBL0rCMKw-ySD1HItXtmFNp5lFwlnV_f8GQgK0krlyANq-orZ7Hgf5REaro6qwrCw',
    badge: 'Eco-Friendly',
    badgeType: 'eco',
    deliveryToday: true
  },
  {
    id: 'BIO-DAS-CUB',
    sku: 'BIO-DAS-CUB',
    brand: 'Dasil Eco Pack',
    brandFilter: 'dasil',
    material: 'bagazo',
    materialLabel: 'Bagazo de Caña (Eco)',
    modalidad: 'paquete',
    modalidadLabel: 'Por Paquete individual',
    name: 'Set de Cubiertos Biodegradables CPLA (Tenedor + Cuchara + Servilleta) x 50 sets',
    description: 'Presentación: Pack x 50 juegos enfundados individualmente',
    tag: 'Set Cubiertos Compostables',
    price: 16.00,
    regularPrice: 19.00,
    wholesaleTier: 'Por Mayor (8+ packs): S/ 13.50 c/u',
    savings: 'Ahorro comercial de S/ 20.00 por fardo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL6zNyY3daazXWgSHqkOM-SeTL_TEMJ2_JGozVlHR0VUcXzs9us-KYpYaMa1JcRCpmDgb5WVYOJ0pEQSFyK8RsN1MhmQvegiYMOvYZ_QGnYpv2-TJTLvQV2TB0esKY0XRRAe5UA9hN2gRlA7G9ulk-098Wr7Di8FPRCU4CBYb6q7e68wvvn3QwPBK3ch7DKq8IeoEaycOcKfgqJtB02GTAGgWgCS7AuJ3iY2ggz6-1CeCsbfA36SLMvA',
    badge: 'Más Vendido',
    badgeType: 'hot',
    deliveryToday: true
  },
  {
    id: 'BIO-REY-VAS',
    sku: 'BIO-REY-VAS',
    brand: 'Reyma Ecológico',
    brandFilter: 'reyma',
    material: 'polipapel',
    materialLabel: 'Polipapel Reciclable',
    modalidad: 'caja',
    modalidadLabel: 'Por Caja / Fardo',
    name: 'Vaso Polipapel Ecológico Reyma 12 oz con Tapa Bio x 50un',
    description: 'Presentación: Paquete x 50 unidades | Para café y bebidas calientes',
    tag: 'Vaso Polipapel 12 oz',
    price: 18.00,
    regularPrice: 21.50,
    wholesaleTier: 'Por Mayor (4+ pqtes): S/ 15.20 c/u',
    savings: 'Ahorro acumulado de S/ 11.20 en fardo de 200 vasos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLxh96ksjVoa-d6ZoZGhrcaFkODQ59q4ozL7vS8UOVHcnzOCYpGegxCmf3FeSWnjdEu8G3XD58GWY8WRvB6uHOcBgLYw9xuYRyD8B3SP7aRY4Jw21wS5_Z60FNRW9FbouSQk4lA6kGoRUXcZ5SIeAID9Ox5M1aksTmucCnHgif4KuW3bBNBUCzVEIUZEBxaCg9QtLtE48LFOO2-tcRqA8E0nBZuCKYODExeGbg4KbvvmQmAR6g_dWfdA',
    badge: 'Eco-Friendly',
    badgeType: 'eco',
    deliveryToday: true
  }
];

class CatalogController {
  constructor() {
    this.currentView = 'grid'; // 'grid' | 'list'
    this.maxPrice = 150;
    this.filters = {
      modalidad: ['caja'], // defaults checked
      material: ['bagazo'],
      brand: ['pamolsa'],
      maxPrice: 150,
      deliveryToday: true
    };
    this.currentSort = 'savings';
    this.init();
  }

  init() {
    this.bindDOM();
    this.renderCatalog();
  }

  bindDOM() {
    // Price slider
    const priceSlider = document.querySelector('input[type="range"]');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        this.maxPrice = parseFloat(e.target.value);
        this.filters.maxPrice = this.maxPrice;
        const display = document.querySelector('.price-range-display');
        if (display) display.innerText = `S/ 5 - S/ ${this.maxPrice}`;
        this.renderCatalog();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderCatalog();
      });
    }

    // Checkboxes
    document.querySelectorAll('aside input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        this.readFiltersFromSidebar();
        this.renderCatalog();
      });
    });

    // View toggles
    const gridBtn = document.querySelector('button[aria-label="Vista cuadrícula"]');
    const listBtn = document.querySelector('button[aria-label="Vista lista"]');
    if (gridBtn && listBtn) {
      gridBtn.addEventListener('click', () => this.setView('grid', gridBtn, listBtn));
      listBtn.addEventListener('click', () => this.setView('list', listBtn, gridBtn));
    }

    // Reset filters
    document.querySelectorAll('.reset-filters-btn, button:has-text("Limpiar todo")').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.resetFilters();
      });
    });
  }

  readFiltersFromSidebar() {
    // We can collect checked state from sidebar checkboxes
    const modalidadChecks = Array.from(document.querySelectorAll('input[data-filter-modalidad]:checked')).map(el => el.value);
    const materialChecks = Array.from(document.querySelectorAll('input[data-filter-material]:checked')).map(el => el.value);
    const brandChecks = Array.from(document.querySelectorAll('input[data-filter-brand]:checked')).map(el => el.value);
    
    if (modalidadChecks.length > 0) this.filters.modalidad = modalidadChecks;
    if (materialChecks.length > 0) this.filters.material = materialChecks;
    if (brandChecks.length > 0) this.filters.brand = brandChecks;
  }

  setView(view, activeBtn, inactiveBtn) {
    this.currentView = view;
    activeBtn.className = 'p-1.5 rounded bg-surface-clean text-primary shadow-xs';
    inactiveBtn.className = 'p-1.5 rounded text-outline hover:text-on-surface transition-colors';
    this.renderCatalog();
  }

  resetFilters() {
    this.filters = {
      modalidad: ['caja', 'paquete'],
      material: ['bagazo', 'polipapel', 'pet'],
      brand: ['pamolsa', 'reyma', 'dasil', 'multipack'],
      maxPrice: 150,
      deliveryToday: false
    };
    document.querySelectorAll('aside input[type="checkbox"]').forEach(cb => cb.checked = true);
    const priceSlider = document.querySelector('input[type="range"]');
    if (priceSlider) priceSlider.value = 150;
    this.renderCatalog();
  }

  getFilteredItems() {
    let items = CATALOG_ITEMS.filter(item => {
      if (item.price > this.filters.maxPrice) return false;
      return true;
    });

    // Sort
    if (this.currentSort.includes('menor a mayor')) {
      items.sort((a, b) => a.price - b.price);
    } else if (this.currentSort.includes('mayor a menor')) {
      items.sort((a, b) => b.price - a.price);
    } else {
      // Default: mayor ahorro
      items.sort((a, b) => (b.regularPrice - b.price) - (a.regularPrice - a.price));
    }

    return items;
  }

  renderCatalog() {
    const gridContainer = document.querySelector('.grid-cols-1.md\\:grid-cols-2.xl\\:grid-cols-3');
    if (!gridContainer) return;

    const items = this.getFilteredItems();

    if (this.currentView === 'list') {
      gridContainer.className = 'flex flex-col gap-4';
    } else {
      gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6';
    }

    let html = '';
    items.forEach(item => {
      if (this.currentView === 'list') {
        html += this.renderListItem(item);
      } else {
        html += this.renderGridItem(item);
      }
    });

    gridContainer.innerHTML = html;

    // Update count display
    const countDisplay = document.querySelector('.category-product-count');
    if (countDisplay) {
      countDisplay.innerText = `${items.length} productos`;
    }
  }

  renderGridItem(item) {
    return `
      <article class="bg-surface-clean border border-border-hairline hover:border-border-hover rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-md relative group">
        <div class="space-y-4">
          <!-- Top Badges & SKU -->
          <div class="flex items-center justify-between gap-2">
            <span class="bg-emerald-surface text-tertiary-container border border-tertiary-fixed-dim/50 text-label-sm font-label-sm px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px]">eco</span>
              ${item.badge}
            </span>
            <span class="text-body-sm font-body-sm text-outline">SKU: ${item.sku}</span>
          </div>

          <!-- Product Image Container -->
          <a href="/producto.html" class="bg-surface-soft rounded-xl p-4 flex items-center justify-center aspect-[4/3] overflow-hidden relative block cursor-pointer">
            <img class="object-contain h-full w-full transition-transform duration-200 group-hover:scale-105" src="${item.image}" alt="${item.name}">
            <span class="absolute bottom-2 left-2 bg-surface-clean/90 backdrop-blur-xs text-text-muted text-label-sm font-label-sm px-2 py-0.5 rounded border border-border-hairline">
              ${item.tag}
            </span>
          </a>

          <!-- Content details -->
          <div class="space-y-1.5">
            <span class="text-label-md font-label-md text-primary font-bold">${item.brand}</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
              <a href="/producto.html">${item.name}</a>
            </h3>
            <p class="font-body-sm text-body-sm text-text-muted">
              ${item.description}
            </p>
          </div>

          <!-- Pricing Section -->
          <div class="pt-2 border-t border-border-hairline space-y-2">
            <div class="flex items-baseline gap-2">
              <span class="font-price-card text-price-card text-on-surface">S/ ${item.price.toFixed(2)}</span>
              <span class="font-body-sm text-body-sm text-outline line-through">S/ ${item.regularPrice.toFixed(2)}</span>
              <span class="text-label-sm font-label-sm text-text-muted">/ paquete</span>
            </div>

            <!-- Wholesale Tier Capsule -->
            <div class="bg-emerald-surface border border-tertiary-fixed-dim/60 rounded-lg p-2.5 text-body-sm font-body-sm text-tertiary-container space-y-0.5">
              <div class="flex items-center justify-between font-bold">
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px] text-tertiary-container">inventory_2</span>
                  ${item.wholesaleTier}
                </span>
              </div>
              <span class="text-label-sm font-label-sm text-on-tertiary-fixed-variant block">
                ${item.savings}
              </span>
            </div>
          </div>
        </div>

        <!-- Stepper and Add Button -->
        <div class="pt-4 mt-2 flex items-center gap-2">
          <div class="flex items-center bg-surface-subtle border border-border-hairline rounded-lg overflow-hidden shrink-0">
            <button onclick="window.PlazaCatalog.adjustCardQty(this, -1)" aria-label="Disminuir" class="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-border-hairline transition-colors" type="button">-</button>
            <input class="w-9 h-8 border-none bg-transparent text-center text-body-md font-semibold text-on-surface p-0 focus:ring-0" type="text" value="1">
            <button onclick="window.PlazaCatalog.adjustCardQty(this, 1)" aria-label="Aumentar" class="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-border-hairline transition-colors" type="button">+</button>
          </div>
          <button onclick="window.PlazaCatalog.addCardItemToCart(this, '${item.id}')" class="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-royal-blue-vivid text-surface-clean text-label-md font-label-md font-semibold py-2 px-3 rounded-lg transition-colors duration-150 shadow-xs" type="button">
            <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Añadir al pedido</span>
          </button>
        </div>
      </article>
    `;
  }

  renderListItem(item) {
    return `
      <article class="bg-surface-clean border border-border-hairline hover:border-border-hover rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-200 hover:shadow-md group">
        <div class="flex items-center gap-4 flex-1">
          <a href="/producto.html" class="w-28 h-28 bg-surface-soft rounded-xl p-2 shrink-0 flex items-center justify-center overflow-hidden border border-border-hairline">
            <img class="object-contain h-full w-full group-hover:scale-105 transition-transform" src="${item.image}" alt="${item.name}">
          </a>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-primary">${item.brand}</span>
              <span class="text-xs text-outline">SKU: ${item.sku}</span>
              <span class="bg-emerald-surface text-tertiary-container text-[11px] px-2 py-0.5 rounded-full font-semibold border border-tertiary-fixed">${item.tag}</span>
            </div>
            <h3 class="font-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">
              <a href="/producto.html">${item.name}</a>
            </h3>
            <p class="text-xs text-text-muted max-w-xl">${item.description}</p>
            <div class="text-xs text-tertiary font-semibold flex items-center gap-1 mt-1">
              <span class="material-symbols-outlined text-[14px]">local_shipping</span>
              <span>Entrega express en 24h Lima</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:items-end gap-3 shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-border-hairline">
          <div class="text-left md:text-right">
            <div class="flex items-baseline gap-2">
              <span class="font-price-card text-price-card text-primary font-bold">S/ ${item.price.toFixed(2)}</span>
              <span class="text-xs text-outline line-through">S/ ${item.regularPrice.toFixed(2)}</span>
            </div>
            <span class="text-[11px] text-tertiary-container font-semibold bg-emerald-surface px-2 py-0.5 rounded block mt-0.5">${item.wholesaleTier}</span>
          </div>

          <div class="flex items-center gap-2 w-full md:w-auto">
            <div class="flex items-center bg-surface-subtle border border-border-hairline rounded-lg overflow-hidden">
              <button onclick="window.PlazaCatalog.adjustCardQty(this, -1)" class="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-border-hairline transition-colors">-</button>
              <input class="w-9 h-8 border-none bg-transparent text-center text-body-md font-semibold text-on-surface p-0 focus:ring-0" type="text" value="1">
              <button onclick="window.PlazaCatalog.adjustCardQty(this, 1)" class="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-border-hairline transition-colors">+</button>
            </div>
            <button onclick="window.PlazaCatalog.addCardItemToCart(this, '${item.id}')" class="flex-1 md:flex-initial px-4 py-2 bg-primary hover:bg-royal-blue-vivid text-surface-clean rounded-lg text-label-md font-semibold flex items-center gap-1.5 transition-colors">
              <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>Añadir</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  adjustCardQty(btn, delta) {
    const parent = btn.parentElement;
    const input = parent.querySelector('input');
    if (!input) return;
    let val = parseInt(input.value) || 1;
    val += delta;
    if (val < 1) val = 1;
    input.value = val;
  }

  addCardItemToCart(btn, itemId) {
    const card = btn.closest('article');
    const input = card ? card.querySelector('input') : null;
    const qty = input ? parseInt(input.value) || 1 : 1;

    const item = CATALOG_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    if (window.PlazaCart) {
      window.PlazaCart.addItem({
        id: item.id,
        name: item.name,
        sku: item.sku,
        presentation: item.tag,
        price: item.price,
        regularPrice: item.regularPrice,
        qty: qty,
        image: item.image,
        category: 'Descartables'
      });
    }
  }
}

// Global catalog initialization
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.PlazaCatalog = new CatalogController();
  });
}
