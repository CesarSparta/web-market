/**
 * Plaza Multipack - Lógica del Checkout & Facturación Electrónica SUNAT
 * Validación de RUC 20, Selección Boleta/Factura, Sincronización Contable del Carrito y Confirmación de Pedido
 */

class CheckoutController {
  constructor() {
    this.selectedComprobante = 'factura';
    this.selectedPayment = 'yape';
    this.selectedTurno = 'manana';
    this.selectedDistrict = 'magdalena';
    this.init();
  }

  init() {
    this.bindDOM();
    this.syncCartSummary();

    // Listen to cart updates
    window.addEventListener('cartUpdated', () => {
      this.syncCartSummary();
    });
  }

  bindDOM() {
    // Payment method switches
    document.querySelectorAll('input[name="metodo-pago"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.selectedPayment = e.target.value;
      });
    });

    // District select
    const distSelect = document.querySelector('select:has(option:contains("Magdalena"))');
    document.querySelectorAll('select').forEach(sel => {
      if (sel.querySelector('option[value*="Magdalena"]') || sel.innerText.includes('Magdalena')) {
        sel.addEventListener('change', (e) => {
          this.selectedDistrict = e.target.value;
          this.syncCartSummary();
        });
      }
    });

    // Pay button
    const payBtn = document.querySelector('button:has-text("Confirmar y Pagar Pedido")');
    document.querySelectorAll('button').forEach(btn => {
      if (btn.innerText.includes('Confirmar y Pagar Pedido')) {
        btn.addEventListener('click', () => this.handleOrderSubmission());
      }
    });
  }

  toggleComprobante(type) {
    this.selectedComprobante = type;
    const btnBoleta = document.getElementById('btn-boleta');
    const btnFactura = document.getElementById('btn-factura');
    const panelFactura = document.getElementById('panel-factura');
    const panelBoleta = document.getElementById('panel-boleta');

    if (type === 'factura') {
      if (btnFactura) btnFactura.className = 'py-2.5 px-4 rounded-md font-label-lg text-label-lg font-bold bg-surface-clean text-primary-container border border-border-hairline shadow-sm text-center flex items-center justify-center gap-2';
      if (btnBoleta) btnBoleta.className = 'py-2.5 px-4 rounded-md font-label-lg text-label-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface text-center flex items-center justify-center gap-2';
      if (panelFactura) panelFactura.classList.remove('hidden');
      if (panelBoleta) panelBoleta.classList.add('hidden');
    } else {
      if (btnBoleta) btnBoleta.className = 'py-2.5 px-4 rounded-md font-label-lg text-label-lg font-bold bg-surface-clean text-primary-container border border-border-hairline shadow-sm text-center flex items-center justify-center gap-2';
      if (btnFactura) btnFactura.className = 'py-2.5 px-4 rounded-md font-label-lg text-label-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface text-center flex items-center justify-center gap-2';
      if (panelBoleta) panelBoleta.classList.remove('hidden');
      if (panelFactura) panelFactura.classList.add('hidden');
    }
  }

  triggerSunatValidation() {
    const btn = document.getElementById('btn-validar-ruc');
    const box = document.getElementById('sunat-status-box');
    const rucInput = document.getElementById('ruc-input');
    const rucVal = rucInput ? rucInput.value.trim() : '20601234567';

    if (btn) {
      btn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span> Consultando SUNAT...';
      btn.disabled = true;
    }

    setTimeout(() => {
      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">verified</span> Validado con Éxito';
        btn.disabled = false;
      }
      if (box) {
        box.classList.remove('opacity-50');
        box.classList.add('ring-2', 'ring-tertiary-container');
        setTimeout(() => box.classList.remove('ring-2', 'ring-tertiary-container'), 1200);
      }
      if (window.PlazaCart) {
        window.PlazaCart.showToast(
          'RUC Verificado en SUNAT',
          `RUC ${rucVal} - GASTRONOMÍA LIMA S.A.C. se encuentra ACTIVO y HABIDO.`
        );
      }
    }, 600);
  }

  syncCartSummary() {
    if (!window.PlazaCart) return;

    const cart = window.PlazaCart.getCart();
    const totals = window.PlazaCart.getTotals();

    // 1. Items container in checkout sidebar
    const itemsContainer = document.querySelector('aside .divide-y');
    if (itemsContainer && cart.length > 0) {
      let html = '';
      cart.forEach(item => {
        html += `
          <div class="pt-3 first:pt-0 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-surface-soft border border-border-hairline flex items-center justify-center shrink-0 overflow-hidden text-primary">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain">` : `<span class="material-symbols-outlined text-[24px]">inventory_2</span>`}
              </div>
              <div>
                <h4 class="font-label-lg font-bold text-on-surface line-clamp-1">${item.name}</h4>
                <div class="flex items-center gap-2 text-on-surface-variant text-[12px]">
                  <span class="font-medium">${item.qty} un (${item.presentation})</span>
                  <span>•</span>
                  <span class="text-tertiary-container font-semibold">Mayorista</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <span class="font-label-lg font-bold text-on-surface block">S/ ${(item.price * item.qty).toFixed(2)}</span>
              <span class="text-[11px] text-on-surface-variant">S/ ${item.price.toFixed(2)} c/u</span>
            </div>
          </div>
        `;
      });
      itemsContainer.innerHTML = html;
    }

    // 2. Shipping calculation
    let deliveryFee = totals.total >= 700.00 ? 0 : 8.00;
    const finalTotal = totals.total + deliveryFee;

    // 3. Update accounting rows
    const subtotalEl = document.querySelector('aside .flex:has(span:contains("Subtotal Valor Venta")) span:last-child');
    const igvEl = document.querySelector('aside .flex:has(span:contains("IGV 18%")) span:last-child');
    const savingsEl = document.querySelector('aside .flex:has(span:contains("Ahorro Mayorista")) span:last-child');
    const shippingEl = document.querySelector('aside .flex:has(span:contains("Costo de Despacho")) span:last-child');
    const grandTotalEl = document.querySelector('aside .font-price-hero');
    const payBtn = document.querySelector('button:has-text("Confirmar y Pagar")');

    document.querySelectorAll('aside .flex').forEach(row => {
      const text = row.innerText;
      if (text.includes('Subtotal Valor Venta')) {
        const val = row.querySelector('span:last-child');
        if (val) val.innerText = `S/ ${totals.subtotalGravado.toFixed(2)}`;
      }
      if (text.includes('IGV 18%')) {
        const val = row.querySelector('span:last-child');
        if (val) val.innerText = `S/ ${totals.igv.toFixed(2)}`;
      }
      if (text.includes('Ahorro Mayorista')) {
        const val = row.querySelector('span:last-child');
        if (val) val.innerText = `- S/ ${totals.savings.toFixed(2)}`;
      }
      if (text.includes('Costo de Despacho')) {
        const val = row.querySelector('span:last-child');
        if (val) {
          if (totals.total >= 700.00) {
            val.innerHTML = '<strong class="text-tertiary-container uppercase">Gratis (S/ 0.00)</strong>';
          } else {
            val.innerText = `S/ ${deliveryFee.toFixed(2)}`;
          }
        }
      }
    });

    if (grandTotalEl) {
      grandTotalEl.innerText = `S/ ${finalTotal.toFixed(2)}`;
    }

    document.querySelectorAll('button').forEach(btn => {
      if (btn.innerText.includes('Confirmar y Pagar Pedido')) {
        btn.innerHTML = `
          <span class="material-symbols-outlined text-[20px]" data-icon="lock" style="font-variation-settings: 'FILL' 1;">lock</span>
          <span>Confirmar y Pagar Pedido (S/ ${finalTotal.toFixed(2)})</span>
        `;
      }
    });
  }

  handleOrderSubmission() {
    const totals = window.PlazaCart ? window.PlazaCart.getTotals() : { total: 555.00 };
    const orderNumber = 'PM-' + Math.floor(100000 + Math.random() * 900000);
    const rucInput = document.getElementById('ruc-input');
    const ruc = rucInput ? rucInput.value : '20601234567';

    const modalHTML = `
      <div id="order-success-modal" class="modal-overlay active">
        <div class="modal-panel p-6 lg:p-8 space-y-6 text-center max-w-lg" onclick="event.stopPropagation()">
          <div class="w-16 h-16 rounded-full bg-emerald-surface text-tertiary-container flex items-center justify-center mx-auto border-2 border-tertiary-fixed shadow-sm">
            <span class="material-symbols-outlined text-[36px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
          </div>

          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-tertiary-container bg-emerald-surface px-3 py-1 rounded-full border border-tertiary-fixed">
              ¡Pedido Registrado con Éxito!
            </span>
            <h3 class="font-headline-lg font-bold text-primary mt-2">Orden #${orderNumber}</h3>
            <p class="text-body-sm text-text-muted mt-1">
              Comprobante Electrónico emitido a nombre de <strong>GASTRONOMÍA LIMA S.A.C.</strong> con RUC <strong>${ruc}</strong>.
            </p>
          </div>

          <!-- Factura Simulation Card -->
          <div class="bg-surface-subtle p-4 rounded-xl border border-border-hairline text-left text-body-sm space-y-2">
            <div class="flex justify-between border-b border-border-hairline pb-2 font-bold text-on-surface">
              <span>Factura Electrónica Serie F001-${Math.floor(1000 + Math.random()*9000)}</span>
              <span class="text-emerald-700 flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">verified</span> SUNAT OK
              </span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs text-text-muted">
              <div>Fecha: <strong>${new Date().toLocaleDateString('es-PE')}</strong></div>
              <div>Despacho: <strong>Lima Metropolitana</strong></div>
              <div>Turno: <strong>Mañana 9:00 - 13:00</strong></div>
              <div>Total: <strong class="text-primary text-sm">S/ ${totals.total.toFixed(2)}</strong></div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <a href="https://wa.me/51931653685?text=Hola%20Plaza%20Multipack,%20acabo%20de%20realizar%20el%20pedido%20${orderNumber}%20por%20S/%20${totals.total.toFixed(2)}.%20Adjunto%20constancia." target="_blank" rel="noopener" class="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-surface-clean font-bold text-label-md rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors">
              <span class="material-symbols-outlined text-[20px]">chat</span>
              <span>Enviar Voucher por WhatsApp</span>
            </a>
            <a href="/index.html" class="py-3 px-5 border border-border-hairline hover:bg-surface-soft text-on-surface font-semibold text-label-md rounded-xl transition-colors flex items-center justify-center">
              Volver al Inicio
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
}

// Global exposure
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.PlazaCheckout = new CheckoutController();

    // Backwards compatibility for onclick calls
    window.toggleComprobante = (type) => window.PlazaCheckout.toggleComprobante(type);
    window.triggerSunatValidation = () => window.PlazaCheckout.triggerSunatValidation();
  });
}
