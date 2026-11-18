/* FSRS-5 – thuật toán lặp lại ngắt quãng hiện đại (dùng trong Anki 23.10+) */
const FSRS = (() => {
  const w = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192,
    1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];
  const DECAY = -0.5, FACTOR = 19 / 81, DAY = 864e5, MIN = 6e4;
  const NEW = 0, LEARNING = 1, REVIEW = 2, RELEARNING = 3;

  const clampD = d => Math.min(10, Math.max(1, d));
  const retrievability = (t, s) => Math.pow(1 + FACTOR * t / s, DECAY);
  const interval = (s, ret) => Math.min(36500, Math.max(1, Math.round(s / FACTOR * (Math.pow(ret, 1 / DECAY) - 1))));
  const initD = g => w[4] - Math.exp(w[5] * (g - 1)) + 1;
  const initS = g => Math.max(0.1, w[g - 1]);
  const nextD = (d, g) => {
    const d1 = d + (-w[6] * (g - 3)) * (10 - d) / 9;
    return clampD(w[7] * initD(4) + (1 - w[7]) * d1);
  };
  const recallS = (d, s, r, g) => s * (1 + Math.exp(w[8]) * (11 - d) * Math.pow(s, -w[9]) *
    (Math.exp((1 - r) * w[10]) - 1) * (g === 2 ? w[15] : 1) * (g === 4 ? w[16] : 1));
  const forgetS = (d, s, r) => Math.min(
    w[11] * Math.pow(d, -w[12]) * (Math.pow(s + 1, w[13]) - 1) * Math.exp((1 - r) * w[14]),
    s / Math.exp(w[17] * w[18]));
  const shortS = (s, g) => s * Math.exp(w[17] * (g - 3 + w[18]));

  function blank() { return { state: NEW, s: 0, d: 0, due: 0, last: 0, reps: 0, lapses: 0 }; }

  function schedule(card, g, now = Date.now(), ret = 0.9) {
    const c = { ...card };
    c.reps = (c.reps || 0) + 1;
    if (c.state === NEW) {
      c.s = initS(g); c.d = clampD(initD(g));
      if (g === 1) { c.state = LEARNING; c.due = now + MIN; }
      else if (g === 2) { c.state = LEARNING; c.due = now + 6 * MIN; }
      else if (g === 3) { c.state = LEARNING; c.due = now + 10 * MIN; }
      else { c.state = REVIEW; c.due = now + interval(c.s, ret) * DAY; }
    } else if (c.state === LEARNING || c.state === RELEARNING) {
      c.s = shortS(c.s, g); c.d = nextD(c.d, g);
      if (g === 1) c.due = now + 5 * MIN;
      else if (g === 2) c.due = now + 10 * MIN;
      else { c.state = REVIEW; c.due = now + interval(c.s, ret) * DAY; }
    } else {
      const t = Math.max(0, (now - c.last) / DAY);
      const r = retrievability(t, c.s);
      if (g === 1) {
        c.lapses = (c.lapses || 0) + 1;
        c.s = forgetS(c.d, c.s, r); c.d = nextD(c.d, g);
        c.state = RELEARNING; c.due = now + 10 * MIN;
      } else {
        c.s = recallS(c.d, c.s, r, g); c.d = nextD(c.d, g);
        c.due = now + interval(c.s, ret) * DAY;
      }
    }
    c.last = now;
    return c;
  }

  // Xem trước khoảng cách cho 4 nút; đảm bảo Hard ≤ Good ≤ Easy
  function preview(card, now = Date.now(), ret = 0.9) {
    const out = {};
    for (const g of [1, 2, 3, 4]) out[g] = schedule(card, g, now, ret).due - now;
    if (out[3] < out[2]) out[3] = out[2];
    if (out[4] <= out[3]) out[4] = out[3] + DAY;
    return out;
  }

  function fmt(ms) {
    const m = Math.round(ms / MIN);
    if (m < 60) return m + ' ph';
    const h = Math.round(m / 60);
    if (h < 24) return h + ' giờ';
    const d = Math.round(ms / DAY);
    if (d < 31) return d + ' ngày';
    if (d < 365) return (d / 30).toFixed(d < 300 ? 1 : 0).replace('.0', '') + ' th';
    return (d / 365).toFixed(1).replace('.0', '') + ' năm';
  }

  return { blank, schedule, preview, fmt, retrievability, NEW, LEARNING, REVIEW, RELEARNING, DAY };
})();
