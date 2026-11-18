/* IndexedDB (nội dung bài học, cache âm thanh) + localStorage (tiến độ, cài đặt) */
const DB = (() => {
  let dbp = null;
  const mem = { units: new Map(), decks: new Map(), audio: new Map() };
  let broken = false;

  function open() {
    if (!dbp) {
      dbp = new Promise((resolve, reject) => {
        if (!window.indexedDB) return reject(new Error('no idb'));
        const r = indexedDB.open('deutschweg', 1);
        r.onupgradeneeded = () => {
          const db = r.result;
          for (const s of ['units', 'decks']) if (!db.objectStoreNames.contains(s)) db.createObjectStore(s, { keyPath: 'id' });
          if (!db.objectStoreNames.contains('audio')) db.createObjectStore('audio');
        };
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
      }).catch(e => { broken = true; throw e; });
    }
    return dbp;
  }

  function run(store, mode, op) {
    return open().then(db => new Promise((resolve, reject) => {
      const t = db.transaction(store, mode);
      const r = op(t.objectStore(store));
      t.oncomplete = () => resolve(r ? r.result : undefined);
      t.onerror = t.onabort = () => reject(t.error);
    }));
  }

  // Fallback sang bộ nhớ tạm nếu trình duyệt chặn IndexedDB
  async function safe(fn, fallback) {
    if (broken) return fallback();
    try { return await fn(); } catch (e) { console.warn('IndexedDB lỗi, dùng bộ nhớ tạm', e); broken = true; return fallback(); }
  }

  return {
    getAll: store => safe(() => run(store, 'readonly', s => s.getAll()), () => [...mem[store].values()]),
    get: (store, key) => safe(() => run(store, 'readonly', s => s.get(key)), () => mem[store].get(key)),
    put: (store, val, key) => safe(() => run(store, 'readwrite', s => key === undefined ? s.put(val) : s.put(val, key)),
      () => mem[store].set(key === undefined ? val.id : key, val)),
    del: (store, key) => safe(() => run(store, 'readwrite', s => s.delete(key)), () => mem[store].delete(key)),
    clear: store => safe(() => run(store, 'readwrite', s => s.clear()), () => mem[store].clear()),
  };
})();

const Store = (() => {
  const KEY = 'deutschweg.state.v1';
  const defaults = () => ({
    xp: 0,
    days: {},            // 'YYYY-MM-DD' -> xp
    lessons: {},         // lessonId -> { best, date, tries }
    cards: {},           // cardKey -> FSRS state
    newToday: { date: '', n: 0 },
    articleStats: { right: 0, total: 0 },
    settings: {
      theme: 'auto',
      ttsEngine: 'browser',     // 'browser' | 'gemini' | 'azure'
      geminiVoice: 'Kore', geminiVoiceB: 'Puck', ttsModel: '',
      pronEngine: 'auto',       // 'auto' | 'gemini' | 'stt'  (Azure luôn được ưu tiên nếu có key)
      voice: '',                // tên giọng trình duyệt
      voiceB: '',               // giọng thứ 2 cho hội thoại
      rate: 0.95,
      slowRate: 0.7,
      azureKey: '', azureRegion: 'westeurope', azureVoice: 'de-DE-KatjaNeural', azureVoiceB: 'de-DE-ConradNeural',
      aiProvider: 'gemini', aiKey: '', aiModel: '',
      newPerDay: 15, dailyGoal: 50, retention: 0.9,
      showIpa: true, showVi: true, autoplay: true,
    },
  });
  let state;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    const d = defaults();
    state = raw ? { ...d, ...raw, settings: { ...d.settings, ...(raw.settings || {}) } } : d;
  } catch (e) { state = defaults(); }

  let timer = null;
  function save() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn('Không lưu được tiến độ', e); }
    }, 150);
  }
  function replace(obj) { const d = defaults(); state = { ...d, ...obj, settings: { ...d.settings, ...(obj.settings || {}) } }; save(); }
  function reset() { state = defaults(); save(); }
  return { get s() { return state; }, save, replace, reset, defaults };
})();
