// In gọn nội dung một unit để biên tập: node tools/dump.js <file> [lessonIndex] [phần: vocab|dialog|ex|theory|reading|all]
const fs = require('fs');
const V = require('../js/validate.js');
const [file, li, part = 'all'] = process.argv.slice(2);
let d = V.extract(fs.readFileSync(file, 'utf8'));
const u = V.mergeUnits(Array.isArray(d) ? d : [d])[0];
const ls = li !== undefined && li !== '' ? [u.lessons[+li]] : u.lessons;
const show = p => part === 'all' || part === p;
console.log(`# ${u.id} ${u.title} / ${u.titleVi}\ngoals: ${(u.goals || []).join(' | ')}`);
for (const l of ls) {
  console.log(`\n## ${l.id} ${l.title} / ${l.titleVi}`);
  if (show('theory')) console.log('THEORY:\n' + l.theory);
  if (show('vocab')) for (const v of l.vocab || []) console.log(`V ${v.article ? v.article + ' ' : ''}${v.de}${v.plural && v.plural !== '–' ? ', ' + v.plural : v.article ? ' (–)' : ''} [${v.ipa}] ${v.pos} = ${v.vi}${v.forms ? ' {' + v.forms + '}' : ''} | ${v.example} = ${v.exampleVi}`);
  if (show('dialog')) for (const x of l.dialogue || []) console.log(`D ${x.speaker}/${x.name}: ${x.de} = ${x.vi}`);
  if (show('reading') && l.reading) console.log(`READING ${l.reading.title}: ${l.reading.text}\n  VI: ${l.reading.vi}\n  Q: ${(l.reading.questions || []).map(q => q.q + ' [' + q.options.map((o, i) => (i === q.answer ? '*' : '') + o).join(' / ') + ']').join('\n     ')}`);
  if (show('reading') && l.writing) console.log(`WRITING: ${l.writing.task} (min ${l.writing.minWords})\n  SAMPLE: ${l.writing.sample}`);
  if (show('ex')) for (const x of l.exercises || []) {
    const t = x.type;
    if (t === 'mcq') console.log(`mcq ${x.q} [${x.options.map((o, i) => (i === x.answer ? '*' : '') + o).join(' / ')}] — ${x.explain || ''}`);
    else if (t === 'gap') console.log(`gap ${x.text} => ${x.answers.join(' ; ')} (${x.hint || ''}) — ${x.explain || ''}`);
    else if (t === 'order') console.log(`ord ${x.answer} || ${(x.answers || []).join(' | ')}`);
    else if (t === 'translate') console.log(`tr  ${x.vi} => ${x.answers.join(' | ')}`);
    else if (t === 'listen' || t === 'speak') console.log(`${t.slice(0, 3)} ${x.de} = ${x.vi}`);
    else if (t === 'match') console.log(`mat ${x.pairs.map(p => p.join('=')).join(', ')}`);
  }
}
