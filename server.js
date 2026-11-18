// Máy chủ tĩnh tối giản để chạy DeutschWeg trên máy: node server.js  →  http://localhost:5173
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const port = +process.env.PORT || 5173;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json', '.md': 'text/plain; charset=utf-8' };
// Áp dụng cùng các header bảo mật như khi deploy (đọc từ file _headers, khối "/*")
const secHeaders = {};
try {
  const block = fs.readFileSync(path.join(root, '_headers'), 'utf8').split(/\n(?=\/)/)[0];
  for (const line of block.split('\n').slice(1)) { const m = line.match(/^\s+([\w-]+):\s*(.+)$/); if (m && m[1] !== 'Strict-Transport-Security') secHeaders[m[1]] = m[2].trim(); }
} catch (e) { /* không có _headers */ }
http.createServer((req, res) => {
  for (const [k, v] of Object.entries(secHeaders)) res.setHeader(k, v);
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p === '/') p = '/index.html';
  const file = path.normalize(path.join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}).listen(port, () => console.log(`DeutschWeg: http://localhost:${port}`));
