# Plaza Multipack - Plataforma Web de Abastecimiento Mayorista

Plataforma e-commerce moderna para **Plaza Multipack S.A.C.** (RUC 20601234567, Magdalena del Mar, Lima, Perú), especializada en el abastecimiento mayorista y minorista de envases descartables biodegradables (*Pamolsa, Reyma, Dasil*), abarrotes gastronómicos (*Aceites Primor, Cocinero*), empaques industriales y productos de limpieza.

---

## 🚀 Características Principales

- **Facturación Electrónica SUNAT (RUC 20 / RUC 10):**
  - Validación dinámica en tiempo real de RUC y consulta a servidores SUNAT con estado *ACTIVO* y condición *HABIDO*.
  - Desglose contable con cálculo exacto de *Valor Venta Gravado*, *IGV 18%*, *Ahorro Mayorista* y crédito fiscal conforme a ley peruana.
- **Escalas de Descuento por Volumen B2B:**
  - Tablas dinámicas por presentación (Paquete vs Caja Master / Fardo) que iluminan automáticamente el rango activo al variar las cantidades.
- **Logística y Flete en Lima Metropolitana:**
  - Despacho garantizado en 24h para distritos clave: Magdalena del Mar, San Miguel, Jesús María, Pueblo Libre, Miraflores, San Isidro, Surquillo y agencias a provincias.
  - Alerta y barra de progreso de **Flete Gratis** para compras superiores a **S/ 700.00 PEN**.
- **Carrito de Compras Persistente & Drawer:**
  - Persistencia en `localStorage` sincronizada en todas las páginas.
  - Drawer lateral deslizable accesible desde cualquier vista.
- **Buscador Inteligente con Atajo:**
  - Acceso inmediato con `⌘ K` o `Ctrl + K` filtrando instantáneamente entre miles de referencias.
- **Modal de Recompra Rápida:**
  - Flujo optimizado para compras recurrentes de negocios gastronómicos, pollerías y Dark Kitchens.

---

## 📁 Estructura del Proyecto

```text
web-market/
├── index.html          # Página de Inicio (Hero, Vitrina de Rotación, Bento de Categorías, Cobertura)
├── catalogo.html       # Catálogo de Descartables Biodegradables con Filtros en Vivo y Vistas Grid/Lista
├── producto.html       # Detalle de Producto (PDP) con Galería, Escalas B2B y Cotizador de Flete
├── checkout.html       # Portal de Pago Seguro con Validación SUNAT y Métodos Peruanos (Yape/Plin/BCP/BBVA)
├── css/
│   └── styles.css      # Animaciones, Drawer y Microinteracciones
├── js/
│   ├── cart.js         # Estado Global del Carrito y Drawer Deslizable
│   ├── shared.js       # Buscador con Atajo ⌘K, Modal de Recompra y Modo Canal
│   ├── catalogo.js     # Filtros en Vivo, Slider de Precios y Alternador de Vistas
│   ├── producto.js     # Galería de Miniaturas, Selector de Presentación y Escalas B2B
│   └── checkout.js     # Validación SUNAT, Desglose Contable y Confirmación de Pedido
├── server.js           # Servidor HTTP Estático Nativo (Node.js sin dependencias)
├── package.json        # Configuración del Proyecto y Scripts
└── README.md
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 & Semantic Structure**
- **Tailwind CSS (CDN)** con paleta de diseño personalizada (*Azul Cobalto, Oro Cálido, Esmeralda Ecológico*)
- **Vanilla JavaScript (ES6+)** modular y reactivo sin frameworks pesados
- **Google Fonts:** *Plus Jakarta Sans* & *Inter*
- **Google Material Symbols Outlined**
- **Node.js Native HTTP Server** (cero dependencias de terceros)

---

## 💻 Instalación y Ejecución Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/web-market.git
   cd web-market
   ```

2. Inicia el servidor de desarrollo local:
   ```bash
   npm start
   # o bien:
   node server.js
   ```

3. Abre en tu navegador:
   - **Inicio:** [http://localhost:3000/index.html](http://localhost:3000/index.html)
   - **Catálogo:** [http://localhost:3000/catalogo.html](http://localhost:3000/catalogo.html)
   - **Detalle de Producto:** [http://localhost:3000/producto.html](http://localhost:3000/producto.html)
   - **Checkout SUNAT:** [http://localhost:3000/checkout.html](http://localhost:3000/checkout.html)

---

## 🏢 Datos Institucionales

- **Razón Social:** Plaza Multipack S.A.C.
- **RUC:** 20601234567
- **Dirección:** Jirón José Gálvez 614, Magdalena del Mar, Lima, Perú
- **Canal WhatsApp Corporativo:** +51 931 653 685
