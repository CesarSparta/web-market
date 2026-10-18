/**
 * Plaza Multipack - Sistema de Carrito de Compras Global
 * Persistencia en localStorage, Drawer Interactivo y Desglose Contable SUNAT
 */

const STORAGE_KEY = 'plaza_multipack_cart_v1';
const FREE_SHIPPING_THRESHOLD = 700.00;

// Estado inicial por defecto (alineado con el desglose del checkout)
const DEFAULT_CART = [
  {
    id: 'BIO-PAM-1000L',
    name: 'Envase Pamolsa Deli 1Lt c/tapa',
    sku: 'PAM-DELI-1000L',
    presentation: 'Caja Master (x200u)',
    price: 60.00,
    regularPrice: 68.00,
    qty: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY3NlAh_Rk2hGSsCi5acL4ARL7E4fL661DMM75BUoXjq6FobCGBjzHD9S7KgoWE5NV6rIl_Ahp0gDcP_h40suC74NYSKfI_TQKi6ejh5hKhv-pPWWH0lxXX0v7xuxehxzY-sRDaLAmy2Rb2MVaduC1UvtDr4BRoOYLzzRN_-QIMqWzkMYnp3GYV4ZiM2mxlygTg3sPvoczl1eE43cymhTzra0UGIsFXnKVBq3lHg4mnbd7BT4Xp4WQbg',
    category: 'Descartables'
  },
  {
    id: 'AB-PRI-5L',
    name: 'Aceite Primor Clásico Galón 5L',
    sku: 'AB-PRI-GAL5L',
    presentation: 'Bidón 5 Litros',
    price: 56.00,
    regularPrice: 58.00,
    qty: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg0v9fnqqtmRTEFeJiHwozRlO0u8Ee48G7Ke-16y7G10iVHkOobPOYtCbnEY2rPSkLKmROL8IFigZLIoNQBw_AtmW3FCUgcl_l9Yb3vVnNLhpQWkhDcd7xzFUxNtxQODg6W8MlqcMd5Mxp5JVjIDe85t51IJymRAAmYI028ltLNor-OCYZW4BmRWyurO8x7AYXfdTK7GZwfvJghWRhEJkXYdnyVSkaCba3UqP3BtJob7d4S_0MlIVDpg',
    category: 'Abarrotes'
  },
  {
    id: 'EMB-KRA-25',
    name: 'Bolsa Papel Kraft N°25 (x500u)',
    sku: 'EMB-KRA-500',
    presentation: 'Fardo Comercial x 500u',
    price: 203.00,
    regularPrice: 220.00,
    qty: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKRBOa2fYrewtCR1jbbc05hexcxiMQGd6hzBThafszzJmNZ55zpy5YjM27sJgSP1uTq8Gx4uS2wUr1kRfcNSyai_lADqTe3B61sMlIKh_kD0VC_0H-SwWBB-pM14mlWieayrc10S67EkabLiYC1whGE_66yOA6kPmOZuFHG-4AM0x4pC2DcDSlof1Iqhnrs5Fzda4TLQ2Y7fPpcdHzlFP5iULgWgTUS5Ypb2QmV_uk0_12kxTo8D3ONw',
    category: 'Embalaje'
  }
];

class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.initDrawerUI();
    this.updateAllUI();
    this.bindEvents();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading cart from localStorage', e);
    }
    // Set default initial cart
    this.saveCart(DEFAULT_CART);
    return DEFAULT_CART;
  }

  saveCart(items) {
    this.cart = items;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
    } catch (e) {
      console.warn('Error saving cart to localStorage', e);
    }
    this.updateAllUI();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: this.cart } }));
  }

  getCart() {
    return this.cart;
  }

  addItem(item) {
    const existing = this.cart.find(i => i.id === item.id);
    if (existing) {
      existing.qty += (item.qty || 1);
    } else {
      this.cart.push({
        id: item.id || 'item-' + Date.now(),
        name: item.name || 'Producto Plaza Multipack',
        sku: item.sku || 'SKU-001',
        presentation: item.presentation || 'Unidad',
        price: parseFloat(item.price) || 10.00,
        regularPrice: parseFloat(item.regularPrice) || (parseFloat(item.price) * 1.15),
        qty: parseInt(item.qty) || 1,
        image: item.image || '',
        category: item.category || 'General'
      });
    }
    this.saveCart(this.cart);
    this.showToast('¡Producto Añadido!', `${item.name} agregado al pedido.`);
    this.openDrawer();
  }

  updateQty(id, delta) {
    const item = this.cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.removeItem(id);
      return;
    }
    this.saveCart(this.cart);
  }

  removeItem(id) {
    const item = this.cart.find(i => i.id === id);
    const name = item ? item.name : 'Producto';
    this.cart = this.cart.filter(i => i.id !== id);
    this.saveCart(this.cart);
    this.showToast('Producto eliminado', `${name} fue retirado del carrito.`);
  }

  clearCart() {
    this.saveCart([]);
    this.showToast('Carrito vacío', 'Se eliminaron todos los productos.');
  }

  getTotals() {
    let total = 0;
    let savings = 0;
    let itemCount = 0;

    this.cart.forEach(item => {
      total += item.price * item.qty;
      if (item.regularPrice && item.regularPrice > item.price) {
        savings += (item.regularPrice - item.price) * item.qty;
      }
      itemCount += item.qty;
    });

    const subtotalGravado = total / 1.18;
    const igv = total - subtotalGravado;
    const qualifiesFreeShipping = total >= FREE_SHIPPING_THRESHOLD;
    const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
    const shippingProgressPct = Math.min(100, Math.round((total / FREE_SHIPPING_THRESHOLD) * 100));

    return {
      total,
      subtotalGravado,
      igv,
      savings,
      itemCount,
      uniqueCount: this.cart.length,
      qualifiesFreeShipping,
      remainingForFreeShipping,
      shippingProgressPct
    };
  }

  updateAllUI() {
    const totals = this.getTotals();

    // 1. Update header cart buttons
    const cartButtons = document.querySelectorAll('[data-cart-button], .cart-button-trigger');
    cartButtons.forEach(btn => {
      const textSpan = btn.querySelector('.cart-text, span:last-child');
      if (textSpan && textSpan.innerText.includes('Mi Carrito')) {
        textSpan.innerText = `Mi Carrito (S/ ${totals.total.toFixed(2)})`;
      }
      const badge = btn.querySelector('.cart-badge, .w-4.h-4.rounded-full');
      if (badge) {
        badge.innerText = totals.uniqueCount;
      }
    });

    // 2. Update Top Announcement shipping threshold
    const topThresholdText = document.querySelector('#top-shipping-threshold-text');
    const topThresholdBar = document.querySelector('#top-shipping-threshold-bar');
    if (topThresholdText) {
      if (totals.qualifiesFreeShipping) {
        topThresholdText.innerText = '¡Flete Gratis Aplicado!';
      } else {
        topThresholdText.innerText = `Faltan S/ ${totals.remainingForFreeShipping.toFixed(2)}`;
      }
    }
    if (topThresholdBar) {
      topThresholdBar.style.width = `${totals.shippingProgressPct}%`;
    }

    // 3. Render Drawer Content
    this.renderDrawer();
  }

  initDrawerUI() {
    if (document.getElementById('cart-drawer-root')) return;

    const drawerHTML = `
      <div id="cart-drawer-root" class="cart-drawer-overlay" onclick="window.PlazaCart.handleOverlayClick(event)">
        <div class="cart-drawer-panel" onclick="event.stopPropagation()">
          <!-- Header -->
          <div class="p-5 border-b border-border-hairline bg-surface-clean flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[24px] text-primary" data-icon="shopping_bag">shopping_bag</span>
              <h3 class="font-headline-sm text-headline-sm text-primary font-bold">Mi Carrito de Compras</h3>
              <span id="drawer-item-count-badge" class="bg-primary/10 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">0 ítems</span>
            </div>
            <button class="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-soft transition-colors" onclick="window.PlazaCart.closeDrawer()" title="Cerrar carrito">
              <span class="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          <!-- Free Shipping Tracker inside drawer -->
          <div class="bg-emerald-surface/60 border-b border-tertiary-fixed/60 p-4">
            <div class="flex items-center justify-between text-body-sm font-body-sm mb-1.5">
              <span class="flex items-center gap-1.5 font-bold text-tertiary-container" id="drawer-shipping-status-label">
                <span class="material-symbols-outlined text-[18px]">local_shipping</span>
                <span>Flete Gratis desde S/ 700.00</span>
              </span>
              <span class="font-label-sm text-label-sm font-semibold text-tertiary" id="drawer-shipping-diff">Faltan S/ 0.00</span>
            </div>
            <div class="w-full bg-surface-clean h-2 rounded-full overflow-hidden border border-tertiary-fixed/40">
              <div id="drawer-shipping-progress" class="bg-emerald-500 h-full rounded-full transition-all duration-300" style="width: 0%;"></div>
            </div>
          </div>

          <!-- Items list -->
          <div id="drawer-items-list" class="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-border-hairline">
            <!-- Dynamic items will be injected here -->
          </div>

          <!-- Footer & Checkout CTA -->
          <div class="p-5 bg-surface-clean border-t border-border-hairline space-y-3 shadow-lg">
            <div class="space-y-1.5 text-body-sm font-body-sm">
              <div class="flex justify-between text-text-muted">
                <span>Subtotal (sin IGV):</span>
                <span id="drawer-subtotal-val" class="font-semibold text-on-surface">S/ 0.00</span>
              </div>
              <div class="flex justify-between text-text-muted">
                <span>IGV (18% Oficial SUNAT):</span>
                <span id="drawer-igv-val" class="font-semibold text-on-surface">S/ 0.00</span>
              </div>
              <div class="flex justify-between text-tertiary-container font-semibold" id="drawer-savings-row">
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[15px]">savings</span>
                  Ahorro Mayorista:
                </span>
                <span id="drawer-savings-val">- S/ 0.00</span>
              </div>
              <div class="pt-2 border-t border-border-hairline flex items-baseline justify-between text-on-surface">
                <div>
                  <span class="font-headline-sm font-bold block">Total a Pagar</span>
                  <span class="text-[11px] text-text-muted">Precios con Factura o Boleta</span>
                </div>
                <span id="drawer-total-val" class="text-price-hero font-price-hero text-primary font-extrabold">S/ 0.00</span>
              </div>
            </div>

            <div class="space-y-2 pt-1">
              <a href="/checkout.html" class="w-full py-3.5 px-6 bg-primary hover:bg-royal-blue-vivid active:bg-primary-container text-surface-clean rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-150">
                <span class="material-symbols-outlined text-[20px]">lock</span>
                <span>Continuar al Pago Seguro</span>
              </a>
              <a href="https://wa.me/51931653685?text=Hola%20Plaza%20Multipack,%20deseo%20confirmar%20mi%20pedido%20corporativo" target="_blank" rel="noopener" class="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-tertiary-container border border-emerald-300 rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-colors">
                <span class="material-symbols-outlined text-[18px]">chat</span>
                <span>Cotizar por WhatsApp Corporativo</span>
              </a>
            </div>

            <p class="text-center text-[11px] text-text-muted flex items-center justify-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
              <span>Emisión de Factura con RUC 20 y crédito fiscal</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Container for dynamic toast messages -->
      <div id="toast-container"></div>
    `;

    document.body.insertAdjacentHTML('beforeend', drawerHTML);
  }

  renderDrawer() {
    const listEl = document.getElementById('drawer-items-list');
    const badgeEl = document.getElementById('drawer-item-count-badge');
    const diffEl = document.getElementById('drawer-shipping-diff');
    const progEl = document.getElementById('drawer-shipping-progress');
    const statusLabelEl = document.getElementById('drawer-shipping-status-label');
    const subtotalEl = document.getElementById('drawer-subtotal-val');
    const igvEl = document.getElementById('drawer-igv-val');
    const savingsEl = document.getElementById('drawer-savings-val');
    const totalEl = document.getElementById('drawer-total-val');

    if (!listEl) return;

    const totals = this.getTotals();
    badgeEl.innerText = `${totals.uniqueCount} ítems (${totals.itemCount} un.)`;

    if (totals.qualifiesFreeShipping) {
      diffEl.innerHTML = '<span class="text-emerald-700 font-bold">¡Envío 100% Gratis!</span>';
      progEl.style.width = '100%';
      progEl.className = 'bg-emerald-600 h-full rounded-full transition-all duration-300';
      statusLabelEl.innerHTML = '<span class="material-symbols-outlined text-[18px] text-emerald-600">verified</span><span>¡Calificas para Flete Bonificado en Lima!</span>';
    } else {
      diffEl.innerText = `Faltan S/ ${totals.remainingForFreeShipping.toFixed(2)}`;
      progEl.style.width = `${totals.shippingProgressPct}%`;
      progEl.className = 'bg-amber-bright h-full rounded-full transition-all duration-300';
      statusLabelEl.innerHTML = '<span class="material-symbols-outlined text-[18px]">local_shipping</span><span>Flete Gratis desde S/ 700.00</span>';
    }

    subtotalEl.innerText = `S/ ${totals.subtotalGravado.toFixed(2)}`;
    igvEl.innerText = `S/ ${totals.igv.toFixed(2)}`;
    savingsEl.innerText = `- S/ ${totals.savings.toFixed(2)}`;
    totalEl.innerText = `S/ ${totals.total.toFixed(2)}`;

    if (this.cart.length === 0) {
      listEl.innerHTML = `
        <div class="py-12 flex flex-col items-center justify-center text-center text-text-muted space-y-3">
          <div class="w-16 h-16 rounded-full bg-surface-subtle flex items-center justify-center text-outline">
            <span class="material-symbols-outlined text-[36px]">remove_shopping_cart</span>
          </div>
          <h4 class="font-headline-sm text-on-surface font-semibold">Tu carrito está vacío</h4>
          <p class="text-body-sm max-w-xs">Explora nuestro catálogo mayorista de descartables, abarrotes y empaques en Lima.</p>
          <a href="/catalogo.html" onclick="window.PlazaCart.closeDrawer()" class="inline-flex items-center gap-1 px-4 py-2 bg-primary text-surface-clean rounded-lg text-label-md font-semibold hover:bg-royal-blue-vivid transition-colors">
            <span>Ver Catálogo</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      `;
      return;
    }

    let itemsHtml = '';
    this.cart.forEach(item => {
      itemsHtml += `
        <div class="pt-4 first:pt-0 flex items-start gap-3.5 group">
          <div class="w-16 h-16 rounded-xl bg-surface-soft border border-border-hairline p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
            ${item.image ? `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain">` : `<span class="material-symbols-outlined text-[24px] text-outline">inventory_2</span>`}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <h4 class="font-label-lg font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">${item.name}</h4>
              <button onclick="window.PlazaCart.removeItem('${item.id}')" class="text-outline hover:text-error transition-colors p-0.5" title="Eliminar">
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
            <div class="text-[12px] text-text-muted mt-0.5">
              <span>${item.presentation}</span> • <span class="font-mono text-outline">${item.sku}</span>
            </div>
            <div class="mt-2.5 flex items-center justify-between">
              <!-- Stepper -->
              <div class="flex items-center bg-surface-subtle border border-border-hairline rounded-lg overflow-hidden">
                <button onclick="window.PlazaCart.updateQty('${item.id}', -1)" class="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-border-hairline transition-colors">
                  <span class="material-symbols-outlined text-[14px]">remove</span>
                </button>
                <span class="w-8 text-center text-body-sm font-bold text-on-surface">${item.qty}</span>
                <button onclick="window.PlazaCart.updateQty('${item.id}', 1)" class="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-border-hairline transition-colors">
                  <span class="material-symbols-outlined text-[14px]">add</span>
                </button>
              </div>
              <!-- Subtotal item -->
              <div class="text-right">
                <span class="font-label-lg font-bold text-primary">S/ ${(item.price * item.qty).toFixed(2)}</span>
                <span class="block text-[11px] text-text-muted">S/ ${item.price.toFixed(2)} c/u</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = itemsHtml;
  }

  openDrawer() {
    const root = document.getElementById('cart-drawer-root');
    if (root) {
      root.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const root = document.getElementById('cart-drawer-root');
    if (root) {
      root.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  handleOverlayClick(e) {
    if (e.target.id === 'cart-drawer-root') {
      this.closeDrawer();
    }
  }

  showToast(title, message, icon = 'check_circle') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item bg-surface-clean border border-border-hairline shadow-lg rounded-xl p-3.5 flex items-center gap-3 text-body-sm font-body-sm min-w-[280px] max-w-sm';
    toast.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-emerald-surface text-tertiary-container flex items-center justify-center shrink-0 border border-emerald-300">
        <span class="material-symbols-outlined text-[18px]">${icon}</span>
      </div>
      <div class="flex-1 min-w-0">
        <strong class="font-semibold text-on-surface block truncate">${title}</strong>
        <span class="text-text-muted text-xs block truncate">${message}</span>
      </div>
      <button class="text-outline hover:text-on-surface p-1" onclick="this.parentElement.remove()">
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  bindEvents() {
    // Intercept clicks on cart buttons
    document.addEventListener('click', (e) => {
      const cartBtn = e.target.closest('[href="/cart"], [href="/cart.html"], .cart-button-trigger, [data-action="open-cart"]');
      if (cartBtn && !window.location.pathname.includes('checkout.html')) {
        e.preventDefault();
        this.openDrawer();
      }
    });

    // Keyboard shortcut ESC to close drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDrawer();
      }
    });
  }
}

// Global initialization
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.PlazaCart = new CartManager();
  });
}
