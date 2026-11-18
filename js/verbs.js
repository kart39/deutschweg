/* Bộ dữ liệu động từ thông dụng + bộ chia động từ (Präsens, Präteritum, Perfekt).
   Định dạng: nguyên mẫu (| = tiền tố tách) | nghĩa | du (Präsens) | er (Präsens) | ich (Präteritum) | trợ động từ h/s | Partizip II | trình độ | [Präsens đầy đủ nếu bất quy tắc] */
const VERBS = (() => {
  const RAW = `sein|là, ở|bist|ist|war|s|gewesen|A1|bin,bist,ist,sind,seid,sind
haben|có|hast|hat|hatte|h|gehabt|A1
werden|trở thành|wirst|wird|wurde|s|geworden|A1
können|có thể|kannst|kann|konnte|h|gekonnt|A1|kann,kannst,kann,können,könnt,können
müssen|phải|musst|muss|musste|h|gemusst|A1|muss,musst,muss,müssen,müsst,müssen
dürfen|được phép|darfst|darf|durfte|h|gedurft|A1|darf,darfst,darf,dürfen,dürft,dürfen
sollen|nên|sollst|soll|sollte|h|gesollt|A1|soll,sollst,soll,sollen,sollt,sollen
wollen|muốn|willst|will|wollte|h|gewollt|A1|will,willst,will,wollen,wollt,wollen
mögen|thích|magst|mag|mochte|h|gemocht|A1|mag,magst,mag,mögen,mögt,mögen
wissen|biết (sự việc)|weißt|weiß|wusste|h|gewusst|A1|weiß,weißt,weiß,wissen,wisst,wissen
heißen|tên là|heißt|heißt|hieß|h|geheißen|A1
kommen|đến|kommst|kommt|kam|s|gekommen|A1
gehen|đi|gehst|geht|ging|s|gegangen|A1
wohnen|sống, ở|wohnst|wohnt|wohnte|h|gewohnt|A1
machen|làm|machst|macht|machte|h|gemacht|A1
lernen|học|lernst|lernt|lernte|h|gelernt|A1
arbeiten|làm việc|arbeitest|arbeitet|arbeitete|h|gearbeitet|A1
spielen|chơi|spielst|spielt|spielte|h|gespielt|A1
kaufen|mua|kaufst|kauft|kaufte|h|gekauft|A1
kochen|nấu ăn|kochst|kocht|kochte|h|gekocht|A1
fragen|hỏi|fragst|fragt|fragte|h|gefragt|A1
sagen|nói|sagst|sagt|sagte|h|gesagt|A1
hören|nghe|hörst|hört|hörte|h|gehört|A1
brauchen|cần|brauchst|braucht|brauchte|h|gebraucht|A1
warten|chờ|wartest|wartet|wartete|h|gewartet|A1
reisen|du lịch|reist|reist|reiste|s|gereist|A1
studieren|học đại học|studierst|studiert|studierte|h|studiert|A1
besuchen|thăm|besuchst|besucht|besuchte|h|besucht|A1
bezahlen|trả tiền|bezahlst|bezahlt|bezahlte|h|bezahlt|A1
tanzen|nhảy, múa|tanzt|tanzt|tanzte|h|getanzt|A1
fahren|đi (xe), lái|fährst|fährt|fuhr|s|gefahren|A1
essen|ăn|isst|isst|aß|h|gegessen|A1
trinken|uống|trinkst|trinkt|trank|h|getrunken|A1
sehen|nhìn, xem|siehst|sieht|sah|h|gesehen|A1
lesen|đọc|liest|liest|las|h|gelesen|A1
sprechen|nói (ngôn ngữ)|sprichst|spricht|sprach|h|gesprochen|A1
nehmen|lấy|nimmst|nimmt|nahm|h|genommen|A1
geben|đưa, cho|gibst|gibt|gab|h|gegeben|A1
schlafen|ngủ|schläfst|schläft|schlief|h|geschlafen|A1
schreiben|viết|schreibst|schreibt|schrieb|h|geschrieben|A1
finden|tìm thấy, thấy rằng|findest|findet|fand|h|gefunden|A1
verstehen|hiểu|verstehst|versteht|verstand|h|verstanden|A1
auf|stehen|thức dậy|stehst|steht|stand|s|aufgestanden|A1
ein|kaufen|đi mua sắm|kaufst|kauft|kaufte|h|eingekauft|A1
an|rufen|gọi điện|rufst|ruft|rief|h|angerufen|A1
fern|sehen|xem TV|siehst|sieht|sah|h|ferngesehen|A1
an|kommen|đến nơi|kommst|kommt|kam|s|angekommen|A1
laufen|chạy, đi bộ|läufst|läuft|lief|s|gelaufen|A2
fliegen|bay|fliegst|fliegt|flog|s|geflogen|A2
bleiben|ở lại|bleibst|bleibt|blieb|s|geblieben|A2
helfen|giúp đỡ|hilfst|hilft|half|h|geholfen|A2
treffen|gặp|triffst|trifft|traf|h|getroffen|A2
singen|hát|singst|singt|sang|h|gesungen|A2
beginnen|bắt đầu|beginnst|beginnt|begann|h|begonnen|A2
stehen|đứng|stehst|steht|stand|h|gestanden|A2
liegen|nằm|liegst|liegt|lag|h|gelegen|A2
sitzen|ngồi|sitzt|sitzt|saß|h|gesessen|A2
tragen|mang, mặc|trägst|trägt|trug|h|getragen|A2
waschen|giặt, rửa|wäschst|wäscht|wusch|h|gewaschen|A2
halten|giữ, dừng|hältst|hält|hielt|h|gehalten|A2
vergessen|quên|vergisst|vergisst|vergaß|h|vergessen|A2
bringen|mang đến|bringst|bringt|brachte|h|gebracht|A2
denken|nghĩ|denkst|denkt|dachte|h|gedacht|A2
kennen|biết (người, nơi)|kennst|kennt|kannte|h|gekannt|A2
tun|làm|tust|tut|tat|h|getan|A2
öffnen|mở|öffnest|öffnet|öffnete|h|geöffnet|A2
glauben|tin|glaubst|glaubt|glaubte|h|geglaubt|A2
zeigen|chỉ, cho xem|zeigst|zeigt|zeigte|h|gezeigt|A2
suchen|tìm kiếm|suchst|sucht|suchte|h|gesucht|A2
mit|bringen|mang theo|bringst|bringt|brachte|h|mitgebracht|A2
ein|laden|mời|lädst|lädt|lud|h|eingeladen|A2
gewinnen|thắng|gewinnst|gewinnt|gewann|h|gewonnen|B1
sterben|chết|stirbst|stirbt|starb|s|gestorben|B1
ziehen|kéo, chuyển (nhà)|ziehst|zieht|zog|h|gezogen|B1
bitten|nhờ, đề nghị|bittest|bittet|bat|h|gebeten|B1
entscheiden|quyết định|entscheidest|entscheidet|entschied|h|entschieden|B1
verlieren|đánh mất|verlierst|verliert|verlor|h|verloren|B1
vergleichen|so sánh|vergleichst|vergleicht|verglich|h|verglichen|B1
erziehen|giáo dục, nuôi dạy|erziehst|erzieht|erzog|h|erzogen|B1`;

  const PERSONS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
  const HABEN = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'];
  const SEIN = ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'];

  const list = RAW.trim().split('\n').map(line => {
    const p = line.split('|');
    let prefix = '';
    if (p.length === 10 || (p.length === 9 && !p[8].includes(','))) prefix = p.shift();
    const [inf, vi, du, er, prt, aux, p2, level, full] = p;
    return { prefix, inf, display: prefix + inf, vi, du, er, prt, aux, p2, level, full: full ? full.split(',') : null };
  });

  const needsE = stem => /[td]$/.test(stem) || /[^aeiouäöülrhmn][mn]$/.test(stem);
  const stemOf = inf => inf.replace(/e?n$/, '');

  function present(v) {
    if (v.full) return v.full.slice();
    const st = stemOf(v.inf);
    return [st + 'e', v.du, v.er, v.inf, st + (needsE(st) ? 'et' : 't'), v.inf];
  }
  function preterite(v) {
    const x = v.prt;
    if (/e$/.test(x)) return [[x], [x + 'st'], [x], [x + 'n'], [x + 't'], [x + 'n']];
    const sib = /[sßz]$/.test(x), dent = /[td]$/.test(x);
    return [[x], sib ? [x + 'est', x + 't'] : dent ? [x + 'est'] : [x + 'st'], [x], [x + 'en'], dent ? [x + 'et'] : [x + 't'], [x + 'en']];
  }
  /** Trả về mảng các đáp án được chấp nhận */
  function conj(v, tense, person) {
    const sep = s => v.prefix ? s + ' ' + v.prefix : s;
    if (tense === 'praes') return [sep(present(v)[person])];
    if (tense === 'praet') return preterite(v)[person].map(sep);
    const aux = (v.aux === 's' ? SEIN : HABEN)[person];
    return [aux + ' ' + v.p2];
  }
  const TENSES = { praes: 'Präsens (hiện tại)', praet: 'Präteritum (quá khứ đơn)', perf: 'Perfekt (quá khứ hoàn thành)' };
  return { list, conj, PERSONS, TENSES };
})();
