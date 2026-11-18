// Tạo thư mục dist/ chỉ chứa các file web công khai (không có tools/, prompt, inbox/…).
// Cloudflare Pages: Build command = "node tools/build-site.js", Build output directory = "dist".
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const PUBLIC = ['index.html', 'manifest.webmanifest', 'sw.js', 'icon.svg', '_headers', 'css', 'js', 'data'];

fs.rmSync(dist, { recursive: true, force: true });
let n = 0;
for (const p of PUBLIC) {
  const src = path.join(root, p);
  if (!fs.existsSync(src)) continue;
  fs.cpSync(src, path.join(dist, p), { recursive: true });
  n += fs.statSync(src).isDirectory() ? fs.readdirSync(src, { recursive: true }).length : 1;
}
// Chặn lọt bí mật: dừng build nếu thấy thứ trông như API key
const LEAK = /AIza[0-9A-Za-z_-]{20,}|sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}|AQ\.[A-Za-z0-9_-]{30,}/;
for (const f of fs.readdirSync(dist, { recursive: true })) {
  const full = path.join(dist, f);
  if (fs.statSync(full).isFile() && /\.(js|html|json|css|webmanifest)$/.test(f) && LEAK.test(fs.readFileSync(full, 'utf8'))) {
    console.error('✗ Phát hiện chuỗi giống API key trong ' + f + ' – dừng build.');
    process.exit(1);
  }
}
console.log(`✓ dist/ sẵn sàng (${n} mục)`);
