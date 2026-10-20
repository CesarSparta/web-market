const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, reqPath);

  // Security check: ensure path is inside PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Acceso denegado');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for html pages without .html extension
      if (!path.extname(filePath)) {
        const htmlFallback = filePath + '.html';
        if (fs.existsSync(htmlFallback)) {
          serveFile(htmlFallback, res);
          return;
        }
      }
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h2>404 - Página no encontrada</h2>
          <p>No pudimos encontrar el recurso solicitado: ${reqPath}</p>
          <a href="/index.html" style="color: #00286a; font-weight: bold;">Volver a Inicio de Plaza Multipack</a>
        </div>
      `);
      return;
    }

    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error interno del servidor');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🛒 Servidor Plaza Multipack ejecutándose exitosamente!`);
  console.log(`🌐 URL Local: http://localhost:${PORT}`);
  console.log(`📁 Rutas disponibles:`);
  console.log(`   - Inicio:    http://localhost:${PORT}/index.html`);
  console.log(`   - Catálogo:  http://localhost:${PORT}/catalogo.html`);
  console.log(`   - Producto:  http://localhost:${PORT}/producto.html`);
  console.log(`   - Checkout:  http://localhost:${PORT}/checkout.html`);
  console.log(`   - Dashboard: http://localhost:${PORT}/dashboard.html`);
  console.log(`======================================================\n`);
});
