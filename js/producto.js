/**
 * Plaza Multipack - Lógica del Detalle de Producto (PDP)
 * Galería de miniaturas, Selector de Presentación, Escalas de Volumen B2B, Cotizador de Flete y Ficha Técnica
 */

const THUMBNAIL_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpKL3KhsOMwXZzigzHKqvIrfaZ1EqO6Jn4jrDdPzWx4oht2Zcu3fG_ytUDgYYTXdjqeSeFt1rXE-JHykswfWY-_VGhcZ7AlcU_9fI1KCjyIblGKqr2vSFCAZb9opuw4QOgBdSKa6PrBauKvm0JinoJ9QECkD5Mvbm3KuzaSHCt_xqg4cVZ14HV9PbhEIUPW8AYECeuun8xG7qx9RhN3bFlpnMF6qCnYvgwwuLTZw_QcwJfmyON37ZlTg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD5g1YxlbAEb3foS7e7gUuoIe9M_cviS_fv_bsVg26rsRiI6Nq0eFvafcPyjTNtkfUd3xTT_W4qtHzCPtwJhcAIWOd3r7gyWkgarrkJ-BXrtaRbQFhDnKkGb7U_P3t_C8zB4orU5BQ-Ul9Puo6LvrZnNyjtEMM01ul7zKJr7EaoaXwMIMiheaZOGDiyrT5k11ltlMWRV-nS9psB_qgNOviKjOCxZSjyL-p1mZJeOwxAdPp6txO71j-o-g",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC4-vQN4Z2y20rEPjySgpNreZlPutnhs8d5WPjeJkXEbfZcP0tp_B0g6t2I6Ggsc2WfPoyfh72v-zW4Nixa5yEkRlVqox07XdycpsV4eKTisN8af0zVJTcRY2X44bV2IFUYbjTS3yhcn9q8FeiZJ1fi4DHCyAcYQ34MDuzyz7YlN_0AZgYovnmwarOtVldRVXMgd1IKRvGwVP-fsgeQwV3RhWpj67pBjnojzWamHf5P0SdpVwyIybdG_A",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBzUbKUduE8J1RoUff5FxtA_R1IdDwD3YHHy_wga-u3yZD8zuHmJo0X6OfiB13VN5_p_Fx8QOHwZN6hbI8zSS3d4zVdKbnLr5nsXOQIvpmZ2T8THlk0MhxtyYXF9_PeNBPijZTYgy1dqOABlSXkiEqlP85To5soz03yl9Sav7u59B-h1946bkq5HScg7QNXGUmUK79QwellcZCP2qd3HOq-0DVVoHs-9N-5_ItxD9IDFoxN2SJPButjeg"
];

const RATES_BY_DISTRICT = {
  magdalena: 6.00,
  san_miguel: 7.00,
  miraflores: 8.00,
  jesus_maria: 7.00,
  pueblo_libre: 7.00,
  san_isidro: 8.50,
  surquillo: 9.00,
  lima_cercado: 10.00
};

class ProductDetailController {
  constructor() {
    this.currentPresentation = 'caja'; // 'paquete' | 'caja'
    this.currentQty = 1;
    this.mainImageSrc = '';
    this.init();
  }

  init() {
    const mainImg = document.getElementById('mainImage');
    if (mainImg) this.mainImageSrc = mainImg.src;

    this.calcTotal();
    this.bindEvents();
  }

  selectPresentation(type) {
    this.currentPresentation = type;
    const cardA = document.getElementById('cardOptA');
    const cardB = document.getElementById('cardOptB');

    if (type === 'paquete') {
      if (cardA) {
        cardA.classList.remove('border-border-hairline');
        cardA.classList.add('border-primary', 'bg-surface-subtle/50');
      }
      if (cardB) {
        cardB.classList.remove('border-tertiary-container', 'bg-emerald-surface/40');
        cardB.classList.add('border-border-hairline');
      }
    } else {
      if (cardB) {
        cardB.classList.remove('border-border-hairline');
        cardB.classList.add('border-tertiary-container', 'bg-emerald-surface/40');
      }
      if (cardA) {
        cardA.classList.remove('border-primary', 'bg-surface-subtle/50');
        cardA.classList.add('border-border-hairline');
      }
    }
    this.calcTotal();
  }

  updateQty(delta) {
    const input = document.getElementById('qtyInput');
    let val = parseInt(input.value) || 1;
    val += delta;
    if (val < 1) val = 1;
    input.value = val;
    this.calcTotal();
  }

  calcTotal() {
    const input = document.getElementById('qtyInput');
    let qty = parseInt(input ? input.value : 1) || 1;
    if (qty < 1) { qty = 1; if (input) input.value = 1; }
    this.currentQty = qty;

    let unitPrice = 0;
    const row1 = document.getElementById('tierRow1');
    const row2 = document.getElementById('tierRow2');
    const row3 = document.getElementById('tierRow3');

    // Reset tier highlighting
    if (row1) row1.classList.remove('ring-2', 'ring-primary');
    if (row2) row2.classList.remove('ring-2', 'ring-tertiary-container');
    if (row3) row3.classList.remove('ring-2', 'ring-amber-bright');

    if (this.currentPresentation === 'paquete') {
      unitPrice = 10.00;
    } else {
      // Caja master tiers
      if (qty >= 10) {
        unitPrice = 56.00;
        if (row3) row3.classList.add('ring-2', 'ring-amber-bright');
      } else if (qty >= 4) {
        unitPrice = 62.00;
        if (row2) row2.classList.add('ring-2', 'ring-tertiary-container');
      } else {
        unitPrice = 68.00;
        if (row1) row1.classList.add('ring-2', 'ring-primary');
      }
    }

    const total = qty * unitPrice;
    const totalDisplay = document.getElementById('totalAmount');
    if (totalDisplay) {
      totalDisplay.innerText = 'S/ ' + total.toFixed(2);
    }

    // Shipping target tracker (Free after S/ 700)
    const freeShippingLimit = 700.00;
    const remaining = freeShippingLimit - total;
    const bar = document.getElementById('shippingBar');
    const text = document.getElementById('shippingText');

    if (text && bar) {
      if (remaining <= 0) {
        text.innerHTML = '<strong class="text-tertiary-container font-bold">¡Felicidades! Tienes ENVÍO 100% GRATIS</strong> en todo tu pedido para Lima Metropolitana.';
        bar.style.width = '100%';
        bar.classList.remove('bg-amber-bright');
        bar.classList.add('bg-tertiary-container');
      } else {
        const pct = Math.min(100, Math.round((total / freeShippingLimit) * 100));
        text.innerHTML = `¡Añade <strong class="text-primary font-bold">S/ ${remaining.toFixed(2)}</strong> más para obtener <strong>ENVÍO GRATIS</strong> en Lima Metropolitana!`;
        bar.style.width = pct + '%';
        bar.classList.add('bg-amber-bright');
        bar.classList.remove('bg-tertiary-container');
      }
    }

    this.calculateDeliveryRate();
  }

  calculateDeliveryRate() {
    const select = document.getElementById('districtSelect');
    if (!select) return;
    const val = select.value;
    const baseRate = RATES_BY_DISTRICT[val] || 8.00;
    const display = document.getElementById('shippingPriceDisplay');
    if (!display) return;

    const total = this.currentQty * (this.currentPresentation === 'paquete' ? 10.00 : (this.currentQty >= 10 ? 56.00 : (this.currentQty >= 4 ? 62.00 : 68.00)));
    if (total >= 700.00) {
      display.innerHTML = '<span class="text-emerald-700 font-bold uppercase">¡Flete Bonificado Gratis! (S/ 0.00)</span>';
    } else {
      display.innerText = 'Costo: S/ ' + baseRate.toFixed(2) + ' (Tarifa Base)';
    }
  }

  openTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('border-primary', 'text-primary', 'font-bold');
      btn.classList.add('border-transparent', 'text-text-muted');
    });

    const activePane = document.getElementById('tabContent-' + tabId);
    const activeBtn = document.getElementById('tabBtn-' + tabId);
    if (activePane) activePane.classList.remove('hidden');
    if (activeBtn) {
      activeBtn.classList.remove('border-transparent', 'text-text-muted');
      activeBtn.classList.add('border-primary', 'text-primary', 'font-bold');
    }
  }

  setThumb(idx) {
    const btns = document.querySelectorAll('.thumb-btn');
    btns.forEach((b, i) => {
      if (i === idx) {
        b.classList.remove('border-border-hairline');
        b.classList.add('border-2', 'border-primary');
      } else {
        b.classList.remove('border-2', 'border-primary');
        b.classList.add('border-border-hairline');
      }
    });

    const mainImg = document.getElementById('mainImage');
    if (mainImg && THUMBNAIL_IMAGES[idx]) {
      mainImg.style.opacity = '0.3';
      setTimeout(() => {
        mainImg.src = THUMBNAIL_IMAGES[idx];
        mainImg.style.opacity = '1';
      }, 150);
    }
  }

  addToCart() {
    const qty = this.currentQty;
    let unitPrice = 10.00;
    let regularPrice = 12.60;
    let presentationName = 'Paquete x 25 un';

    if (this.currentPresentation === 'caja') {
      presentationName = 'Caja Master x 200 un';
      regularPrice = 80.00;
      if (qty >= 10) unitPrice = 56.00;
      else if (qty >= 4) unitPrice = 62.00;
      else unitPrice = 68.00;
    }

    if (window.PlazaCart) {
      window.PlazaCart.addItem({
        id: 'BIO-PAM-1000L',
        name: 'Envase Biodegradable Caña de Azúcar Pamolsa Deli 1Lt con Tapa',
        sku: 'PAM-DELI-1000L',
        presentation: presentationName,
        price: unitPrice,
        regularPrice: regularPrice,
        qty: qty,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY3NlAh_Rk2hGSsCi5acL4ARL7E4fL661DMM75BUoXjq6FobCGBjzHD9S7KgoWE5NV6rIl_Ahp0gDcP_h40suC74NYSKfI_TQKi6ejh5hKhv-pPWWH0lxXX0v7xuxehxzY-sRDaLAmy2Rb2MVaduC1UvtDr4BRoOYLzzRN_-QIMqWzkMYnp3GYV4ZiM2mxlygTg3sPvoczl1eE43cymhTzra0UGIsFXnKVBq3lHg4mnbd7BT4Xp4WQbg',
        category: 'Descartables'
      });
    }
  }

  addCrossSell(name, price, presentation, image) {
    if (window.PlazaCart) {
      window.PlazaCart.addItem({
        id: 'CROSS-' + Date.now(),
        name: name,
        price: price,
        presentation: presentation,
        qty: 1,
        image: image || ''
      });
    }
  }

  bindEvents() {
    // Primary Add button in PDP
    const addBtn = document.querySelector('button:has-text("Añadir al Carrito")');
    document.querySelectorAll('button').forEach(btn => {
      if (btn.innerText.includes('Añadir al Carrito') && !btn.closest('#cart-drawer-root')) {
        btn.addEventListener('click', () => this.addToCart());
      }
    });

    // Cross sell cards
    document.querySelectorAll('.cross-sell-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = btn.closest('.group');
        const title = card ? card.querySelector('h3').innerText : 'Producto adicional';
        const priceText = card ? card.querySelector('.font-price-card').innerText : 'S/ 10.00';
        const price = parseFloat(priceText.replace('S/', '').trim()) || 10.00;
        const img = card ? card.querySelector('img').src : '';
        this.addCrossSell(title, price, 'Complemento', img);
      });
    });
  }
}

// Global exposure
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.PlazaProduct = new ProductDetailController();
    
    // Provide backwards-compatible global helpers for onclicks in HTML
    window.selectPresentation = (type) => window.PlazaProduct.selectPresentation(type);
    window.updateQty = (delta) => window.PlazaProduct.updateQty(delta);
    window.calcTotal = () => window.PlazaProduct.calcTotal();
    window.calculateDeliveryRate = () => window.PlazaProduct.calculateDeliveryRate();
    window.openTab = (id) => window.PlazaProduct.openTab(id);
    window.setThumb = (idx) => window.PlazaProduct.setThumb(idx);
  });
}
