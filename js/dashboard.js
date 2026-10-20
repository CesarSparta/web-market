/**
 * Plaza Multipack S.A.C. - Executive Sales & Analytics Suite
 * Lógica del Dashboard Gerencial B2B y Modo Presentación para Inversionistas / Empresarios
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DATASETS FICTICIOS ULTRA-REALISTAS PARA LA PRESENTACIÓN EJECUTIVA
  const DATA = {
    // Rendimiento por tienda / canal
    stores: [
      { id: 'ecommerce', name: 'E-commerce B2B (web-market)', sales: 524000, target: 480000, ticket: 409.38, orders: 1280, margin: 31.4, color: '#3B82F6' },
      { id: 'san_miguel', name: 'Sucursal San Miguel (Mayorista)', sales: 412000, target: 400000, ticket: 462.92, orders: 890, margin: 27.8, color: '#6366F1' },
      { id: 'magdalena', name: 'Tienda Central Magdalena', sales: 328000, target: 330000, ticket: 315.38, orders: 1040, margin: 26.5, color: '#F59E0B' },
      { id: 'san_isidro', name: 'Hub San Isidro / Miraflores', sales: 221250, target: 190000, ticket: 574.68, orders: 385, margin: 33.2, color: '#10B981' }
    ],

    // Top 10 Clientes Corporativos B2B (Empresas)
    companies: [
      {
        id: 1,
        name: "Corporación Gastronómica Lima S.A.C.",
        ruc: "20554198211",
        sector: "pollerias",
        sectorName: "Pollerías & Brasas (8 locales)",
        revenue: 142850,
        ordersCount: 18,
        topProduct: 'Envase Bivalva Caña Pamolsa 9x9"',
        frequency: "Cada 3 días",
        paymentTerms: "Crédito 15 días (S/ 50K)",
        status: "VIP DIAMANTE",
        statusColor: "amber",
        nextOrder: "Mañana (Estimado)",
        branch: "Sucursal San Miguel",
        repName: "Carlos Mendoza",
        phone: "+51 987 654 321",
        address: "Av. Javier Prado Este 2450, San Borja",
        productsBreakdown: [
          { name: 'Envase Bivalva Caña Pamolsa 9x9" (Caja x200)', percent: 55, amount: "S/ 78,560" },
          { name: "Papel Grasa Antigrasa Pollería (Millar)", percent: 25, amount: "S/ 35,710" },
          { name: "Balde Aceite Primor Gastronómico 18L", percent: 20, amount: "S/ 28,580" }
        ]
      },
      {
        id: 2,
        name: "Inversiones Rústica & Parrillas del Perú S.A.",
        ruc: "20498712345",
        sector: "horeca",
        sectorName: "Restaurantes & Parrillas",
        revenue: 118400,
        ordersCount: 14,
        topProduct: "Bowls Kraft Biodegradables 32oz",
        frequency: "Semanal",
        paymentTerms: "Crédito 30 días (S/ 60K)",
        status: "VIP PLATINO",
        statusColor: "indigo",
        nextOrder: "En 2 días",
        branch: "Tienda Central Magdalena",
        repName: "Patricia Ramos",
        phone: "+51 976 543 210",
        address: "Av. La Marina 1520, Pueblo Libre",
        productsBreakdown: [
          { name: "Bowls Kraft Biodegradables 32oz c/ Tapa", percent: 45, amount: "S/ 53,280" },
          { name: "Cubiertos Fécula Maíz Compostables (Caja x1000)", percent: 35, amount: "S/ 41,440" },
          { name: "Bolsas Kraft Delivery Base Ancha", percent: 20, amount: "S/ 23,680" }
        ]
      },
      {
        id: 3,
        name: "Dark Kitchens Hub Perú Operaciones S.A.C.",
        ruc: "20603456789",
        sector: "dark_kitchens",
        sectorName: "Dark Kitchens & Delivery (15 marcas)",
        revenue: 96720,
        ordersCount: 22,
        topProduct: "Vaso Polipapel Térmico 16oz + Tapa",
        frequency: "Cada 2 días",
        paymentTerms: "Factura Semanal al Contado",
        status: "ALTO CRECIMIENTO",
        statusColor: "emerald",
        nextOrder: "Hoy en la tarde",
        branch: "E-commerce B2B (web-market)",
        repName: "Bot B2B / Automático",
        phone: "+51 912 345 678",
        address: "Av. Sucre 890, Magdalena del Mar",
        productsBreakdown: [
          { name: "Vaso Polipapel Térmico 16oz + Tapa Domo", percent: 40, amount: "S/ 38,680" },
          { name: "Bolsa Kraft Delivery con Asas Reforzadas", percent: 35, amount: "S/ 33,850" },
          { name: "Envase Hermético PET Ensaladas 24oz", percent: 25, amount: "S/ 24,190" }
        ]
      },
      {
        id: 4,
        name: "Cadenas de Café & Panadería Tradición S.R.L.",
        ruc: "20512398741",
        sector: "cafes",
        sectorName: "Cafeterías & Pastelerías (6 locales)",
        revenue: 78350,
        ordersCount: 11,
        topProduct: "Vasos Polipapel 12oz c/ Tapa Bebida Caliente",
        frequency: "Cada 5 días",
        paymentTerms: "Crédito 15 días (S/ 25K)",
        status: "CLIENTE ORO",
        statusColor: "amber",
        nextOrder: "En 3 días",
        branch: "Hub San Isidro / Miraflores",
        repName: "Rodrigo Valdivia",
        phone: "+51 965 432 109",
        address: "Calle Los Conquistadores 410, San Isidro",
        productsBreakdown: [
          { name: "Vasos Polipapel 12oz + Tapa Bebida Caliente", percent: 60, amount: "S/ 47,010" },
          { name: "Servilletas Interdobladas Kraft Ecológicas", percent: 25, amount: "S/ 19,580" },
          { name: "Cajas Porta Tortas y Postres Microcorrugado", percent: 15, amount: "S/ 11,760" }
        ]
      },
      {
        id: 5,
        name: "Chifas & Wok Express Alimentos S.A.",
        ruc: "20601987456",
        sector: "pollerias",
        sectorName: "Cadenas Comida Oriental",
        revenue: 64190,
        ordersCount: 9,
        topProduct: 'Envase Bivalva Caña Pamolsa 8x8"',
        frequency: "Semanal",
        paymentTerms: "Contado Anticipado (Descuento 3%)",
        status: "CLIENTE ORO",
        statusColor: "amber",
        nextOrder: "En 4 días",
        branch: "Sucursal San Miguel",
        repName: "Carlos Mendoza",
        phone: "+51 954 321 098",
        address: "Av. Universitaria 2100, San Miguel",
        productsBreakdown: [
          { name: 'Envase Bivalva Caña Pamolsa 8x8"', percent: 50, amount: "S/ 32,095" },
          { name: "Palitos de Bambú Enfundados Individual (Millar)", percent: 30, amount: "S/ 19,257" },
          { name: "Aceite Cocinero 18L Balde Gastronómico", percent: 20, amount: "S/ 12,838" }
        ]
      },
      {
        id: 6,
        name: "Comercializadora y Distribuidora Norte S.A.C.",
        ruc: "20384756192",
        sector: "distribuidores",
        sectorName: "Distribuidor Mayorista Los Olivos",
        revenue: 53800,
        ordersCount: 6,
        topProduct: "Balde Aceite Primor 18L + Film Stretch",
        frequency: "Quincenal",
        paymentTerms: "Crédito 30 días (S/ 40K)",
        status: "MAYORISTA VOLUMEN",
        statusColor: "blue",
        nextOrder: "En 6 días",
        branch: "Sucursal San Miguel",
        repName: "Carlos Mendoza",
        phone: "+51 943 210 987",
        address: "Av. Carlos Izaguirre 1250, Los Olivos",
        productsBreakdown: [
          { name: "Aceite Primor Balde 18L (Pallet 36 un)", percent: 65, amount: "S/ 34,970" },
          { name: "Film Stretch Industrial 20 micras x 500m", percent: 35, amount: "S/ 18,830" }
        ]
      },
      {
        id: 7,
        name: "Catering & Banquetes Eventos Lima S.A.C.",
        ruc: "20567812934",
        sector: "horeca",
        sectorName: "Eventos & Fiestas Corporativas",
        revenue: 41200,
        ordersCount: 5,
        topProduct: "Bandejas Blondas de Caña + Vasos PLA",
        frequency: "Quincenal (Inactivo hace 18d)",
        paymentTerms: "Contado",
        status: "EN RIESGO (ALERTA)",
        statusColor: "rose",
        nextOrder: "Atrasado (Requiere llamada)",
        branch: "Tienda Central Magdalena",
        repName: "Patricia Ramos",
        phone: "+51 932 109 876",
        address: "Av. Del Ejército 740, Miraflores",
        productsBreakdown: [
          { name: "Bandejas Blondas Biodegradables 10x14", percent: 50, amount: "S/ 20,600" },
          { name: "Copas y Vasos Transparentes PLA Ecológico", percent: 30, amount: "S/ 12,360" },
          { name: "Cubiertos Madera Abedul Biodegradable", percent: 20, amount: "S/ 8,240" }
        ]
      },
      {
        id: 8,
        name: "Franquicias Peruanas de Jugos & Poké S.A.C.",
        ruc: "20604512398",
        sector: "dark_kitchens",
        sectorName: "Fast Casual Saludable (5 locales)",
        revenue: 38950,
        ordersCount: 7,
        topProduct: "Bowls PET Cristal 32oz Herméticos",
        frequency: "Semanal",
        paymentTerms: "Crédito 15 días (S/ 20K)",
        status: "EN CRECIMIENTO",
        statusColor: "emerald",
        nextOrder: "En 2 días",
        branch: "Hub San Isidro / Miraflores",
        repName: "Rodrigo Valdivia",
        phone: "+51 921 098 765",
        address: "Av. El Polo 670, Surco",
        productsBreakdown: [
          { name: "Bowls PET Cristal 32oz c/ Tapa Hermética", percent: 70, amount: "S/ 27,265" },
          { name: "Vasos PET 16oz para Smoothies c/ Tapa Domo", percent: 30, amount: "S/ 11,685" }
        ]
      },
      {
        id: 9,
        name: "Panificadora y Pastelería Delisur S.R.L.",
        ruc: "20129384756",
        sector: "cafes",
        sectorName: "Panadería Artesanal & Café",
        revenue: 29400,
        ordersCount: 4,
        topProduct: "Bolsas de Papel Kraft Panaderas",
        frequency: "Semanal",
        paymentTerms: "Contado",
        status: "CLIENTE REGULAR",
        statusColor: "slate",
        nextOrder: "En 5 días",
        branch: "Tienda Central Magdalena",
        repName: "Patricia Ramos",
        phone: "+51 910 987 654",
        address: "Av. Benavides 3890, Surco",
        productsBreakdown: [
          { name: "Bolsas de Papel Kraft Panaderas #4", percent: 60, amount: "S/ 17,640" },
          { name: "Cajas de Torta Microcorrugado Blancas", percent: 40, amount: "S/ 11,760" }
        ]
      },
      {
        id: 10,
        name: "Cadena Pollerías Brasa Dorada E.I.R.L.",
        ruc: "20598765432",
        sector: "pollerias",
        sectorName: "Pollerías Cono Sur (4 locales)",
        revenue: 26100,
        ordersCount: 4,
        topProduct: "Bolsas Biodegradables con Asa",
        frequency: "Quincenal",
        paymentTerms: "Crédito 15 días",
        status: "CLIENTE REGULAR",
        statusColor: "slate",
        nextOrder: "En 4 días",
        branch: "E-commerce B2B (web-market)",
        repName: "Bot B2B / Automático",
        phone: "+51 909 876 543",
        address: "Av. Defensores del Morro 1400, Chorrillos",
        productsBreakdown: [
          { name: "Bolsas Plásticas Biodegradables con Asas", percent: 55, amount: "S/ 14,355" },
          { name: "Envases Térmicos Bivalva Pollería", percent: 45, amount: "S/ 11,745" }
        ]
      }
    ],

    // Mix de Categorías
    categories: [
      { name: "Biodegradables (Pamolsa)", percent: 44.2, color: "#10B981" },
      { name: "Envases & Vasos HORECA", percent: 28.4, color: "#3B82F6" },
      { name: "Abarrotes Gastronómicos (Aceites)", percent: 15.8, color: "#F59E0B" },
      { name: "Embalaje & Limpieza Industrial", percent: 11.6, color: "#6366F1" }
    ],

    // Multiplicadores por periodo para simulación dinámica
    periodMultipliers: {
      month: 1,
      week: 0.24,
      quarter: 2.85,
      year: 10.4
    }
  };

  // Variables globales de gráficos Chart.js
  let chartStoresInstance = null;
  let chartStoreShareInstance = null;
  let chartTopCompaniesInstance = null;
  let chartCategoryMixInstance = null;

  // Estado activo de filtros
  let currentPeriod = 'month';
  let currentBranch = 'all';

  // 2. INICIALIZACIÓN DE GRÁFICOS Y COMPONENTES
  initCharts();
  renderCompanyTable();
  initRoiCalculator();
  initPresentationDeck();
  initEventHandlers();

  // -------------------------------------------------------------
  // FUNCIONES DE GRÁFICOS (CHART.JS)
  // -------------------------------------------------------------
  function initCharts() {
    // A. Chart: Ventas por Tienda vs Meta
    const ctxStores = document.getElementById('chartStores');
    if (ctxStores) {
      chartStoresInstance = new Chart(ctxStores, {
        type: 'bar',
        data: {
          labels: DATA.stores.map(s => s.name.split(' (')[0]),
          datasets: [
            {
              label: 'Ventas Reales (Miles S/.)',
              data: DATA.stores.map(s => s.sales / 1000),
              backgroundColor: '#3B82F6',
              borderRadius: 8,
              borderSkipped: false
            },
            {
              label: 'Cuota / Meta (Miles S/.)',
              data: DATA.stores.map(s => s.target / 1000),
              backgroundColor: '#CBD5E1',
              borderRadius: 8,
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: '#475569', font: { family: 'Inter', size: 11 } }
            },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.dataset.label}: S/ ${(ctx.raw * 1000).toLocaleString('es-PE')}`
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#64748B', font: { family: 'Inter', size: 11 } },
              grid: { display: false }
            },
            y: {
              ticks: { color: '#64748B',
                callback: val => `S/ ${val}K`
              },
              grid: { color: 'rgba(219, 234, 254, 0.6)' }
            }
          }
        }
      });
    }

    // B. Chart: Participación de Ventas por Tienda (Donut)
    const ctxShare = document.getElementById('chartStoreShare');
    if (ctxShare) {
      chartStoreShareInstance = new Chart(ctxShare, {
        type: 'doughnut',
        data: {
          labels: DATA.stores.map(s => s.name.split(' (')[0]),
          datasets: [
            {
              data: DATA.stores.map(s => s.sales),
              backgroundColor: DATA.stores.map(s => s.color),
              borderColor: '#FFFFFF',
              borderWidth: 3,
              hoverOffset: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#475569', font: { family: 'Inter', size: 10 }, boxWidth: 12 }
            },
            tooltip: {
              callbacks: {
                label: ctx => {
                  const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                  const pct = ((ctx.raw / total) * 100).toFixed(1);
                  return ` S/ ${ctx.raw.toLocaleString('es-PE')} (${pct}%)`;
                }
              }
            }
          }
        }
      });
    }

    // C. Chart: Top 8 Empresas por Facturación Total (Bar Horizontal)
    const ctxCompanies = document.getElementById('chartTopCompanies');
    if (ctxCompanies) {
      const top8 = DATA.companies.slice(0, 8);
      chartTopCompaniesInstance = new Chart(ctxCompanies, {
        type: 'bar',
        data: {
          labels: top8.map(c => c.name.length > 25 ? c.name.substring(0, 23) + '...' : c.name),
          datasets: [
            {
              label: 'Facturación Total (Miles S/.)',
              data: top8.map(c => c.revenue / 1000),
              backgroundColor: [
                '#F59E0B', '#6366F1', '#10B981', '#F59E0B',
                '#3B82F6', '#64748B', '#F43F5E', '#10B981'
              ],
              borderRadius: 6,
              borderSkipped: false
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => ` Facturación: S/ ${(ctx.raw * 1000).toLocaleString('es-PE')} PEN`
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#64748B',
                callback: val => `S/ ${val}K`
              },
              grid: { color: 'rgba(219, 234, 254, 0.6)' }
            },
            y: {
              ticks: { color: '#334155', font: { family: 'Inter', size: 11, weight: '500' } },
              grid: { display: false }
            }
          }
        }
      });
    }

    // D. Chart: Composición por Familia de Producto (Doughnut)
    const ctxCatMix = document.getElementById('chartCategoryMix');
    if (ctxCatMix) {
      chartCategoryMixInstance = new Chart(ctxCatMix, {
        type: 'doughnut',
        data: {
          labels: DATA.categories.map(c => c.name),
          datasets: [
            {
              data: DATA.categories.map(c => c.percent),
              backgroundColor: DATA.categories.map(c => c.color),
              borderColor: '#FFFFFF',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '62%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.label}: ${ctx.raw}% de ventas`
              }
            }
          }
        }
      });
    }
  }

  // -------------------------------------------------------------
  // TABLA DE CLIENTES Y BÚSQUEDA / FILTRO
  // -------------------------------------------------------------
  function renderCompanyTable(companiesList = DATA.companies) {
    const tbody = document.getElementById('companyTableBody');
    const badge = document.getElementById('companyCountBadge');
    if (!tbody) return;

    if (badge) badge.textContent = companiesList.length;

    if (companiesList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="px-6 py-8 text-center text-slate-400">
            No se encontraron empresas con los criterios seleccionados.
          </td>
        </tr>
      `;
      return;
    }

    const multiplier = DATA.periodMultipliers[currentPeriod] || 1;

    tbody.innerHTML = companiesList.map(comp => {
      const scaledRev = Math.round(comp.revenue * multiplier);
      let statusBadgeClass = "bg-slate-700 text-slate-600 border-slate-600";
      if (comp.statusColor === "amber") statusBadgeClass = "bg-amber-50 text-amber-800 border-amber-200";
      if (comp.statusColor === "indigo") statusBadgeClass = "bg-indigo-50 text-indigo-800 border-indigo-200";
      if (comp.statusColor === "emerald") statusBadgeClass = "bg-emerald-50 text-emerald-800 border-emerald-200";
      if (comp.statusColor === "rose") statusBadgeClass = "bg-rose-50 text-rose-800 border-rose-200 animate-pulse";
      if (comp.statusColor === "blue") statusBadgeClass = "bg-blue-50 text-blue-800 border-blue-200";

      return `
        <tr class="hover:bg-blue-50/40 transition-colors group cursor-pointer border-b border-slate-100" onclick="openClientDetailModal(${comp.id})">
          <td class="px-7 py-4.5">
            <div class="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">${comp.name}</div>
            <div class="text-[11px] text-slate-400">${comp.address}</div>
          </td>
          <td class="px-7 py-4.5 whitespace-nowrap">
            <span class="font-mono text-slate-600">${comp.ruc}</span>
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1.5" title="SUNAT Habido"></span>
          </td>
          <td class="px-7 py-4.5">
            <span class="px-2.5 py-0.5 rounded text-[11px] bg-blue-50 text-blue-800 border border-blue-100 font-medium">
              ${comp.sectorName}
            </span>
          </td>
          <td class="px-7 py-4.5 font-bold text-slate-900 whitespace-nowrap">
            S/ ${scaledRev.toLocaleString('es-PE')}
          </td>
          <td class="px-7 py-4.5 max-w-[200px]">
            <span class="text-xs text-blue-300 hover:underline block truncate font-medium" title="${comp.topProduct}">
              ${comp.topProduct}
            </span>
          </td>
          <td class="px-7 py-4.5 whitespace-nowrap text-slate-600 font-medium">
            ${comp.frequency}
          </td>
          <td class="px-7 py-4.5 whitespace-nowrap text-slate-500 text-[11px]">
            ${comp.paymentTerms}
          </td>
          <td class="px-7 py-4.5 whitespace-nowrap">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeClass}">
              ${comp.status}
            </span>
          </td>
          <td class="px-7 py-4.5 text-center whitespace-nowrap">
            <button class="px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 text-xs font-semibold shadow-xs transition-all">
              Ver Ficha
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // -------------------------------------------------------------
  // EVENTOS DE FILTROS Y BÚSQUEDA
  // -------------------------------------------------------------
  function initEventHandlers() {
    // Filtro por Sucursal
    const branchFilter = document.getElementById('branchFilter');
    if (branchFilter) {
      branchFilter.addEventListener('change', (e) => {
        currentBranch = e.target.value;
        updateDashboardByFilters();
      });
    }

    // Filtro por Período
    const periodFilter = document.getElementById('periodFilter');
    if (periodFilter) {
      periodFilter.addEventListener('change', (e) => {
        currentPeriod = e.target.value;
        updateDashboardByFilters();
      });
    }

    // Buscador de Empresas
    const searchInput = document.getElementById('companySearchInput');
    const sectorFilter = document.getElementById('sectorFilterSelect');

    const filterCompanies = () => {
      const query = (searchInput?.value || '').toLowerCase().trim();
      const sector = sectorFilter?.value || 'all';

      const filtered = DATA.companies.filter(c => {
        const matchesQuery = c.name.toLowerCase().includes(query) || c.ruc.includes(query) || c.topProduct.toLowerCase().includes(query);
        const matchesSector = sector === 'all' || c.sector === sector;
        return matchesQuery && matchesSector;
      });

      renderCompanyTable(filtered);
    };

    if (searchInput) searchInput.addEventListener('input', filterCompanies);
    if (sectorFilter) sectorFilter.addEventListener('change', filterCompanies);

    // Modal de Cliente: Cerrar
    const closeClientModalBtn = document.getElementById('closeClientModalBtn');
    const clientModal = document.getElementById('clientModal');
    if (closeClientModalBtn && clientModal) {
      closeClientModalBtn.addEventListener('click', () => {
        clientModal.classList.add('hidden');
        clientModal.classList.remove('flex');
      });
      clientModal.addEventListener('click', (e) => {
        if (e.target === clientModal) {
          clientModal.classList.add('hidden');
          clientModal.classList.remove('flex');
        }
      });
    }
  }

  // -------------------------------------------------------------
  // RECALCULO DE KPIS Y GRAFICOS POR FILTROS
  // -------------------------------------------------------------
  function updateDashboardByFilters() {
    const multiplier = DATA.periodMultipliers[currentPeriod] || 1;

    let baseSales = 1485250;
    let baseAvgTicket = 3840.50;
    let baseClients = 418;

    if (currentBranch !== 'all') {
      const selected = DATA.stores.find(s => s.id === currentBranch);
      if (selected) {
        baseSales = selected.sales;
        baseAvgTicket = selected.ticket * 8; // Estimado B2B proporcional
        baseClients = Math.round(selected.orders * 0.35);
      }
    }

    const calculatedSales = Math.round(baseSales * multiplier);
    const calculatedAvgTicket = (baseAvgTicket * (multiplier > 1 ? 1.05 : 1)).toFixed(2);
    const calculatedClients = Math.round(baseClients * (multiplier > 1 ? 1.15 : (multiplier < 1 ? 0.8 : 1)));

    // Actualizar elementos DOM de los KPIs
    const kpiRev = document.getElementById('kpiRevenue');
    const kpiTicket = document.getElementById('kpiAvgTicket');
    const kpiClients = document.getElementById('kpiActiveClients');

    if (kpiRev) kpiRev.textContent = `S/ ${calculatedSales.toLocaleString('es-PE')}`;
    if (kpiTicket) kpiTicket.textContent = `S/ ${Number(calculatedAvgTicket).toLocaleString('es-PE')}`;
    if (kpiClients) kpiClients.textContent = `${calculatedClients} Cuentas`;

    // Actualizar tabla de empresas
    renderCompanyTable();

    // Actualizar gráficos si están inicializados
    if (chartStoresInstance) {
      chartStoresInstance.data.datasets[0].data = DATA.stores.map(s => (s.sales * multiplier) / 1000);
      chartStoresInstance.data.datasets[1].data = DATA.stores.map(s => (s.target * multiplier) / 1000);
      chartStoresInstance.update();
    }

    if (chartTopCompaniesInstance) {
      const top8 = DATA.companies.slice(0, 8);
      chartTopCompaniesInstance.data.datasets[0].data = top8.map(c => (c.revenue * multiplier) / 1000);
      chartTopCompaniesInstance.update();
    }
  }

  // -------------------------------------------------------------
  // MODAL FICHA DE CLIENTE B2B (DETALLE DE LA EMPRESA)
  // -------------------------------------------------------------
  window.openClientDetailModal = function(companyId) {
    const client = DATA.companies.find(c => c.id === companyId);
    if (!client) return;

    const modal = document.getElementById('clientModal');
    if (!modal) return;

    const multiplier = DATA.periodMultipliers[currentPeriod] || 1;
    const scaledRev = Math.round(client.revenue * multiplier);

    // Asignar textos
    document.getElementById('modalClientBadge').textContent = client.status;
    document.getElementById('modalClientName').textContent = client.name;
    document.getElementById('modalClientRuc').textContent = `RUC: ${client.ruc} • ${client.sectorName} • ${client.address}`;
    document.getElementById('modalClientRevenue').textContent = `S/ ${scaledRev.toLocaleString('es-PE')}`;
    document.getElementById('modalClientFrequency').textContent = client.frequency;
    document.getElementById('modalClientCredit').textContent = client.paymentTerms;
    document.getElementById('modalClientNextOrder').textContent = client.nextOrder;

    // Inyectar desglose de productos
    const prodList = document.getElementById('modalClientProductsList');
    if (prodList) {
      prodList.innerHTML = client.productsBreakdown.map(p => `
        <div class="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between gap-3.5">
          <div class="flex-1">
            <div class="font-bold text-slate-800 text-xs">${p.name}</div>
            <div class="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div class="bg-amber-400 h-full rounded-full" style="width: ${p.percent}%"></div>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="font-bold text-slate-900 block">${p.amount}</span>
            <span class="text-[10px] text-amber-400 font-semibold">${p.percent}% de compra</span>
          </div>
        </div>
      `).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  // -------------------------------------------------------------
  // CALCULADORA INTERACTIVA DE RETORNO DE INVERSIÓN (ROI)
  // -------------------------------------------------------------
  function initRoiCalculator() {
    const sliderRevenue = document.getElementById('sliderRevenue');
    const sliderLoss = document.getElementById('sliderLoss');
    const sliderMargin = document.getElementById('sliderMargin');

    const valRevenue = document.getElementById('sliderValRevenue');
    const valLoss = document.getElementById('sliderValLoss');
    const valMargin = document.getElementById('sliderValMargin');

    const calcMonthly = document.getElementById('calcMonthlyGain');
    const calcAnnual = document.getElementById('calcAnnualGain');

    const updateRoi = () => {
      const revenue = Number(sliderRevenue.value);
      const lossRate = Number(sliderLoss.value) / 100;
      const marginRate = Number(sliderMargin.value) / 100;

      // Actualizar etiquetas
      if (valRevenue) valRevenue.textContent = `S/ ${revenue.toLocaleString('es-PE')}`;
      if (valLoss) valLoss.textContent = `${sliderLoss.value}%`;
      if (valMargin) valMargin.textContent = `${sliderMargin.value}%`;

      // El sistema recupera el 60% de las ventas que antes se perdían por falta de seguimiento o quiebre de stock
      const recoveredSalesMonthly = revenue * lossRate * 0.60;
      const grossMarginMonthly = recoveredSalesMonthly * marginRate;
      const grossMarginAnnual = grossMarginMonthly * 12;

      if (calcMonthly) calcMonthly.textContent = `S/ ${Math.round(grossMarginMonthly).toLocaleString('es-PE')}.00`;
      if (calcAnnual) calcAnnual.textContent = `S/ ${Math.round(grossMarginAnnual).toLocaleString('es-PE')}.00`;
    };

    if (sliderRevenue) sliderRevenue.addEventListener('input', updateRoi);
    if (sliderLoss) sliderLoss.addEventListener('input', updateRoi);
    if (sliderMargin) sliderMargin.addEventListener('input', updateRoi);

    // Calcular valores iniciales
    updateRoi();
  }

  // -------------------------------------------------------------
  // MODO PRESENTACIÓN / PITCH DECK EN PANTALLA COMPLETA
  // -------------------------------------------------------------
  function initPresentationDeck() {
    const openBtn = document.getElementById('openPresentationBtn');
    const closeBtn = document.getElementById('closePresentationBtn');
    const modal = document.getElementById('presentationModal');
    const container = document.getElementById('slideContainer');
    const counter = document.getElementById('slideCounter');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');
    const dotsContainer = document.getElementById('slideDots');

    if (!modal || !container) return;

    let currentSlide = 0;

    const slides = [
      // Slide 1: El Diagnóstico
      {
        badge: "1. DIAGNÓSTICO DEL NEGOCIO MAYORISTA",
        title: "Los 3 Puntos Ciegos que Frenan el Crecimiento de Plaza Multipack",
        subtitle: "Sin un tablero centralizado, la toma de decisiones depende de intuición y archivos Excel dispersos.",
        content: `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-8">
            <div class="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3 text-slate-800">
              <div class="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <span class="material-symbols-outlined">hide_source</span>
              </div>
              <h3 class="text-base font-bold text-slate-900">1. Fuga Silenciosa de Pollerías</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Los clientes corporativos reducen sus pedidos o compran a intermediarios sin que la gerencia se entere a tiempo para retenerlos.
              </p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3 text-slate-800">
              <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <span class="material-symbols-outlined">inventory</span>
              </div>
              <h3 class="text-base font-bold text-slate-900">2. Quiebres de Stock en Fin de Semana</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Falta de visibilidad sobre los productos estrella (Pamolsa 9x9", Vasos 12oz), provocando ventas perdidas cuando la demanda se dispara.
              </p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3 text-slate-800">
              <div class="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <span class="material-symbols-outlined">call_split</span>
              </div>
              <h3 class="text-base font-bold text-slate-900">3. Sucursales Desconectadas</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Magdalena, San Miguel, San Isidro y la Web operan como islas separadas sin unificar precios, historial de clientes ni margen real.
              </p>
            </div>
          </div>
        `
      },
      // Slide 2: La Solución
      {
        badge: "2. LA SOLUCIÓN TECNOLÓGICA",
        title: "Un Cerebro Digital que Centraliza las 4 Tiendas en Tiempo Real",
        subtitle: "Conectamos los comprobantes electrónicos de SUNAT y los puntos de venta sin cambiar de sistema.",
        content: `
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-left mt-8">
            <div class="p-5 rounded-2xl bg-white border border-blue-200 shadow-sm space-y-2 text-slate-800">
              <span class="text-xs font-bold text-blue-400 block">Paso A</span>
              <h4 class="text-sm font-bold text-slate-900">Ingesta SUNAT</h4>
              <p class="text-xs text-slate-600">Lectura automática de cada factura y boleta emitida con RUC 20 o RUC 10.</p>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-blue-200 shadow-sm space-y-2 text-slate-800">
              <span class="text-xs font-bold text-indigo-400 block">Paso B</span>
              <h4 class="text-sm font-bold text-slate-900">Cálculo de Recompra</h4>
              <p class="text-xs text-slate-600">Algoritmo estima cuándo se le acaban las cajas de descartables a cada restaurante.</p>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2 text-slate-800">
              <span class="text-xs font-bold text-amber-400 block">Paso C</span>
              <h4 class="text-sm font-bold text-slate-900">Alerta al Vendedor</h4>
              <p class="text-xs text-slate-600">Notificación automática por WhatsApp al asesor con la cotización lista para cerrar.</p>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-2 text-slate-800">
              <span class="text-xs font-bold text-emerald-400 block">Paso D</span>
              <h4 class="text-sm font-bold text-slate-900">Control Gerencial</h4>
              <p class="text-xs text-slate-600">Gerencia General visualiza en su móvil la facturación, margen y rentabilidad al minuto.</p>
            </div>
          </div>
        `
      },
      // Slide 3: Hallazgos Clave
      {
        badge: "3. HALLAZGOS DE LA DEMOSTRACIÓN",
        title: "Dónde Está el Dinero Real: Cuentas Clave y Productos Estrella",
        subtitle: "Descubrimientos clave extraídos de la data operativa de Plaza Multipack.",
        content: `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
            <div class="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3 text-slate-800">
              <div class="text-xs font-bold uppercase tracking-wider text-amber-400">Regla del 80/20 en Empresas</div>
              <h4 class="text-lg font-bold text-slate-900">Top 10 Clientes = S/ 735,000 / mes</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                El 49.4% del volumen total depende de solo 10 empresas. Corporación Gastronómica Lima (Pollerías) y Dark Kitchens Hub Perú lideran la demanda. Cuidar estas cuentas con precios por escala y crédito puntual es la máxima prioridad.
              </p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3 text-slate-800">
              <div class="text-xs font-bold uppercase tracking-wider text-emerald-400">Línea Más Rentable</div>
              <h4 class="text-lg font-bold text-slate-900">Biodegradables Pamolsa (34.5% Margen)</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Los envases bivalva 9x9" y vasos polipapel 12oz no solo son los más vendidos, sino los que aportan mayor margen bruto neto comparado con abarrotes (Aceites 14.8%). Fomentar combos de packaging ecológico dispara la rentabilidad.
              </p>
            </div>
          </div>
        `
      },
      // Slide 4: Plan de Implementación
      {
        badge: "4. HOJA DE RUTA TÉCNICA",
        title: "Implementación en 30 Días sin Detener la Venta Diaria",
        subtitle: "Un proceso estructurado para que el equipo comercial comience a ver resultados en el primer mes.",
        content: `
          <div class="space-y-3 text-left mt-8 max-w-2xl mx-auto">
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-between">
              <div>
                <span class="text-xs text-blue-400 font-bold">Semana 1: Conexión Inicial</span>
                <h4 class="text-sm font-bold text-slate-900">Enlace a facturador SUNAT y POS de sucursales</h4>
              </div>
              <span class="text-xs bg-slate-800 text-slate-600 px-3 py-1 rounded">Días 1-7</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-between">
              <div>
                <span class="text-xs text-indigo-400 font-bold">Semana 2: Unificación de Catálogo</span>
                <h4 class="text-sm font-bold text-slate-900">Normalización de RUCs, SKUs y Stock multitienda</h4>
              </div>
              <span class="text-xs bg-slate-800 text-slate-600 px-3 py-1 rounded">Días 8-15</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-between">
              <div>
                <span class="text-xs text-amber-400 font-bold">Semana 3: Motor de Recompra</span>
                <h4 class="text-sm font-bold text-slate-900">Configuración de alertas automáticas para vendedores</h4>
              </div>
              <span class="text-xs bg-slate-800 text-slate-600 px-3 py-1 rounded">Días 16-22</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-between">
              <div>
                <span class="text-xs text-emerald-400 font-bold">Semana 4: Puesta en Producción</span>
                <h4 class="text-sm font-bold text-slate-900">Capacitación a jefes de tienda y tablero ejecutivo</h4>
              </div>
              <span class="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded font-bold">Días 23-30</span>
            </div>
          </div>
        `
      },
      // Slide 5: El Retorno de Inversión (ROI)
      {
        badge: "5. IMPACTO ECONÓMICO FINAL",
        title: "¿Cuánto Dinero Adicional Dejará Esta Plataforma a la Empresa?",
        subtitle: "Cifras proyectadas basadas en la operación real de Plaza Multipack S.A.C.",
        content: `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-8">
            <div class="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 space-y-2">
              <span class="text-xs font-semibold text-slate-400 uppercase">Recuperación de Clientes</span>
              <div class="text-3xl font-display font-black text-emerald-400">+S/ 48,000</div>
              <p class="text-xs text-slate-600">en compras mensuales recuperadas que antes iban a la competencia.</p>
            </div>
            <div class="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/50 space-y-2">
              <span class="text-xs font-semibold text-amber-400 uppercase">Beneficio Neto Anual</span>
              <div class="text-4xl font-display font-black text-amber-400">+S/ 403,200</div>
              <p class="text-xs text-slate-600">en margen bruto recuperado y optimización de compras mayoristas.</p>
            </div>
            <div class="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 space-y-2">
              <span class="text-xs font-semibold text-slate-400 uppercase">Amortización</span>
              <div class="text-3xl font-display font-black text-blue-400">&lt; 30 Días</div>
              <p class="text-xs text-slate-600">La inversión en el software se paga sola antes del primer mes de operación.</p>
            </div>
          </div>
          <div class="mt-8">
            <button onclick="document.getElementById('closePresentationBtn').click(); document.getElementById('section-roi').scrollIntoView({ behavior: 'smooth' });" class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-bold text-sm shadow-xl transition-all">
              Abrir Simulador y Probar con Mis Propias Cifras
            </button>
          </div>
        `
      }
    ];

    const renderSlide = (index) => {
      const slide = slides[index];
      container.innerHTML = `
        <div class="animate-[fadeIn_0.25s_ease-out] space-y-3">
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block uppercase tracking-wider">
            ${slide.badge}
          </span>
          <h2 class="text-2xl sm:text-4xl font-display font-black text-slate-900 tracking-tight max-w-3xl mx-auto">
            ${slide.title}
          </h2>
          <p class="text-sm text-slate-600 max-w-2xl mx-auto">
            ${slide.subtitle}
          </p>
          ${slide.content}
        </div>
      `;

      counter.textContent = `Diapositiva ${index + 1} de ${slides.length}`;

      // Update dot styles
      if (dotsContainer) {
        dotsContainer.innerHTML = slides.map((_, i) => `
          <span class="w-2.5 h-2.5 rounded-full transition-all ${i === index ? 'bg-amber-400 w-6' : 'bg-slate-700'}"></span>
        `).join('');
      }

      // Prev/Next button states
      prevBtn.disabled = index === 0;
      prevBtn.classList.toggle('opacity-50', index === 0);
      prevBtn.classList.toggle('cursor-not-allowed', index === 0);

      if (index === slides.length - 1) {
        nextBtn.innerHTML = `<span>Finalizar</span><span class="material-symbols-outlined text-[16px]">check</span>`;
      } else {
        nextBtn.innerHTML = `<span>Siguiente</span><span class="material-symbols-outlined text-[16px]">arrow_forward</span>`;
      }
    };

    openBtn.addEventListener('click', () => {
      currentSlide = 0;
      renderSlide(currentSlide);
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        renderSlide(currentSlide);
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        renderSlide(currentSlide);
      } else {
        closeBtn.click();
      }
    });

    // Teclado: Flechas izquierda / derecha y ESC
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('hidden')) return;

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextBtn.click();
      } else if (e.key === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'Escape') {
        closeBtn.click();
      }
    });
  }

});
