/* Dữ liệu phòng luyện phát âm – IPA theo chuẩn Standardaussprache (Duden – Das Aussprachewörterbuch) */
const PRON = {
  alphabet: [
    ['A', 'aː'], ['B', 'beː'], ['C', 'tseː'], ['D', 'deː'], ['E', 'eː'], ['F', 'ɛf'], ['G', 'ɡeː'], ['H', 'haː'], ['I', 'iː'],
    ['J', 'jɔt'], ['K', 'kaː'], ['L', 'ɛl'], ['M', 'ɛm'], ['N', 'ɛn'], ['O', 'oː'], ['P', 'peː'], ['Q', 'kuː'], ['R', 'ɛʁ'],
    ['S', 'ɛs'], ['T', 'teː'], ['U', 'uː'], ['V', 'faʊ̯'], ['W', 'veː'], ['X', 'ɪks'], ['Y', 'ˈʏpsilɔn', 'Ypsilon'], ['Z', 'tsɛt'],
    ['Ä', 'ɛː'], ['Ö', 'øː'], ['Ü', 'yː'], ['ß', 'ɛsˈtsɛt', 'Eszett'],
  ],

  groups: [
    {
      id: 'vowels', title: 'Nguyên âm đơn – dài & ngắn',
      intro: 'Trong tiếng Đức, **độ dài nguyên âm làm đổi nghĩa** ({{Staat}} = nhà nước, {{Stadt}} = thành phố). Nguyên âm thường **dài** khi: viết đôi (aa, ee, oo), có h theo sau (ah, eh…), viết ie, hoặc chỉ có 1 phụ âm theo sau trong âm tiết mở. Nguyên âm thường **ngắn** khi có 2 phụ âm trở lên theo sau (tt, ss, nn, ck, nd…).',
      sounds: [
        { sym: 'aː', label: 'a dài', tip: 'Như "a" tiếng Việt nhưng kéo dài gấp đôi.', words: [['Tag', 'taːk', 'ngày'], ['Name', 'ˈnaːmə', 'tên'], ['Bahn', 'baːn', 'tàu']] },
        { sym: 'a', label: 'a ngắn', tip: 'Ngắn, dứt khoát – gần "ă".', words: [['Mann', 'man', 'đàn ông'], ['Stadt', 'ʃtat', 'thành phố'], ['Hand', 'hant', 'bàn tay']] },
        { sym: 'eː', label: 'e dài', tip: 'Như "ê" kéo dài, môi bành sang hai bên; KHÔNG trượt thành "ây".', words: [['See', 'zeː', 'hồ'], ['leben', 'ˈleːbn̩', 'sống'], ['Tee', 'teː', 'trà']] },
        { sym: 'ɛ', label: 'e/ä ngắn', tip: 'Như "e" tiếng Việt, ngắn.', words: [['Bett', 'bɛt', 'giường'], ['essen', 'ˈɛsn̩', 'ăn'], ['Hände', 'ˈhɛndə', 'những bàn tay']] },
        { sym: 'ɛː', label: 'ä dài', tip: 'Như "e" tiếng Việt nhưng kéo dài.', words: [['Käse', 'ˈkɛːzə', 'phô mai'], ['spät', 'ʃpɛːt', 'muộn'], ['Mädchen', 'ˈmɛːtçən', 'cô gái']] },
        { sym: 'ə', label: 'e lướt (Schwa)', tip: 'Âm "ơ" rất nhẹ, không nhấn – thường ở âm tiết cuối -e, -en.', words: [['bitte', 'ˈbɪtə', 'làm ơn'], ['Tasse', 'ˈtasə', 'cái tách'], ['gehen', 'ˈɡeːən', 'đi']] },
        { sym: 'iː', label: 'i dài', tip: '"i" dài, căng, môi bành.', words: [['Liebe', 'ˈliːbə', 'tình yêu'], ['Bier', 'biːɐ̯', 'bia'], ['wir', 'viːɐ̯', 'chúng tôi']] },
        { sym: 'ɪ', label: 'i ngắn', tip: '"i" ngắn và lỏng, hơi ngả về "ê".', words: [['Kind', 'kɪnt', 'đứa trẻ'], ['ist', 'ɪst', 'là'], ['Tisch', 'tɪʃ', 'cái bàn']] },
        { sym: 'oː', label: 'o dài', tip: 'Như "ô" kéo dài, môi tròn; KHÔNG trượt thành "âu" như tiếng Anh.', words: [['Boot', 'boːt', 'thuyền'], ['Sohn', 'zoːn', 'con trai'], ['rot', 'ʁoːt', 'đỏ']] },
        { sym: 'ɔ', label: 'o ngắn', tip: 'Như "o" tiếng Việt, ngắn.', words: [['Sonne', 'ˈzɔnə', 'mặt trời'], ['kommen', 'ˈkɔmən', 'đến'], ['oft', 'ɔft', 'thường']] },
        { sym: 'uː', label: 'u dài', tip: '"u" dài, môi chu tròn và đẩy ra trước.', words: [['gut', 'ɡuːt', 'tốt'], ['Schule', 'ˈʃuːlə', 'trường học'], ['Uhr', 'uːɐ̯', 'đồng hồ']] },
        { sym: 'ʊ', label: 'u ngắn', tip: '"u" ngắn, môi hơi lỏng.', words: [['Mutter', 'ˈmʊtɐ', 'mẹ'], ['und', 'ʊnt', 'và'], ['Hund', 'hʊnt', 'con chó']] },
      ],
    },
    {
      id: 'umlaut', title: 'Umlaut – ä, ö, ü (khó nhất với người Việt)',
      intro: 'Tiếng Việt không có nguyên âm **tròn môi hàng trước** như ö, ü. Bí quyết: **giữ lưỡi** ở vị trí của nguyên âm không tròn môi (ê / i), rồi **chỉ thay đổi môi** (chu tròn như ô / u). Tập trước gương!',
      sounds: [
        { sym: 'øː', label: 'ö dài', tip: 'Nói "ê" thật dài → giữ nguyên lưỡi → chu môi tròn như "ô".', words: [['schön', 'ʃøːn', 'đẹp'], ['hören', 'ˈhøːʁən', 'nghe'], ['Öl', 'øːl', 'dầu']] },
        { sym: 'œ', label: 'ö ngắn', tip: 'Nói "e" ngắn → giữ lưỡi → môi tròn như "o".', words: [['können', 'ˈkœnən', 'có thể'], ['zwölf', 'tsvœlf', 'mười hai'], ['Köln', 'kœln', 'Köln']] },
        { sym: 'yː', label: 'ü dài', tip: 'Nói "i" thật dài → giữ nguyên lưỡi → chu môi như "u" (như huýt sáo).', words: [['müde', 'ˈmyːdə', 'mệt'], ['Tür', 'tyːɐ̯', 'cửa'], ['über', 'ˈyːbɐ', 'phía trên']] },
        { sym: 'ʏ', label: 'ü ngắn', tip: 'Như ü dài nhưng ngắn và lỏng hơn.', words: [['Glück', 'ɡlʏk', 'hạnh phúc'], ['fünf', 'fʏnf', 'năm (số 5)'], ['müssen', 'ˈmʏsn̩', 'phải']] },
      ],
    },
    {
      id: 'diph', title: 'Nguyên âm đôi & âm r hóa nguyên âm',
      intro: 'Chú ý: **ei** đọc là "ai", **ie** đọc là "i" dài, **eu/äu** đọc là "oi". Âm **-er** cuối từ và **r sau nguyên âm dài** biến thành nguyên âm [ɐ] (giống "a" ngắn, mờ) – đây là điểm làm giọng nghe "chuẩn Đức" ngay lập tức.',
      sounds: [
        { sym: 'aɪ̯', label: 'ei / ai', tip: 'Đọc "ai" – dù viết là ei!', words: [['mein', 'maɪ̯n', 'của tôi'], ['Zeit', 'tsaɪ̯t', 'thời gian'], ['Mai', 'maɪ̯', 'tháng Năm']] },
        { sym: 'aʊ̯', label: 'au', tip: 'Đọc "ao".', words: [['Haus', 'haʊ̯s', 'ngôi nhà'], ['Frau', 'fʁaʊ̯', 'phụ nữ'], ['auch', 'aʊ̯x', 'cũng']] },
        { sym: 'ɔʏ̯', label: 'eu / äu', tip: 'Đọc "oi".', words: [['heute', 'ˈhɔʏ̯tə', 'hôm nay'], ['neu', 'nɔʏ̯', 'mới'], ['Häuser', 'ˈhɔʏ̯zɐ', 'những ngôi nhà']] },
        { sym: 'ɐ', label: '-er cuối từ', tip: 'Đọc như "a" ngắn và mờ – KHÔNG đọc "ơ-r".', words: [['Vater', 'ˈfaːtɐ', 'bố'], ['Lehrer', 'ˈleːʁɐ', 'giáo viên'], ['aber', 'ˈaːbɐ', 'nhưng']] },
        { sym: 'ɐ̯', label: 'r sau nguyên âm dài', tip: 'r biến thành "a" lướt nhẹ: Uhr ≈ "u-a".', words: [['Uhr', 'uːɐ̯', 'đồng hồ'], ['mehr', 'meːɐ̯', 'nhiều hơn'], ['Tür', 'tyːɐ̯', 'cửa']] },
      ],
    },
    {
      id: 'cons', title: 'Phụ âm đặc trưng',
      intro: 'Phần lớn phụ âm tiếng Đức dễ với người Việt. Cần chú ý: hai âm **ch**, âm **r lưỡi gà**, **s** đọc thành [z] trước nguyên âm, **z** = [ts], **v** = [f], **w** = [v].',
      sounds: [
        { sym: 'ç', label: 'ch "Ich-Laut"', tip: 'Sau e, i, ä, ö, ü, ei, eu và sau l, n, r. Đặt lưỡi như nói "i", thổi hơi mạnh qua khe hẹp (như mèo "khè" nhẹ). KHÔNG đọc "ích" hay "ít". Đuôi -ig cuối từ cũng đọc [ɪç].', words: [['ich', 'ɪç', 'tôi'], ['Milch', 'mɪlç', 'sữa'], ['König', 'ˈkøːnɪç', 'vua']] },
        { sym: 'x', label: 'ch "Ach-Laut"', tip: 'Sau a, o, u, au. Giống hệt "kh" tiếng Việt – bạn đã biết sẵn!', words: [['Bach', 'bax', 'con suối'], ['Buch', 'buːx', 'quyển sách'], ['Nacht', 'naxt', 'ban đêm']] },
        { sym: 'ʁ', label: 'r lưỡi gà', tip: 'Phát ra ở cuống họng: gần "g" tiếng Việt (gà) nhưng lùi sâu hơn, có hơi cọ xát. Không rung đầu lưỡi.', words: [['rot', 'ʁoːt', 'đỏ'], ['Brot', 'bʁoːt', 'bánh mì'], ['fahren', 'ˈfaːʁən', 'lái xe, đi']] },
        { sym: 'ʃ', label: 'sch, sp-, st-', tip: '"s" uốn lưỡi, môi chu ra. sp/st ở đầu từ (hoặc đầu thành tố) đọc [ʃp], [ʃt].', words: [['Schule', 'ˈʃuːlə', 'trường học'], ['Sport', 'ʃpɔʁt', 'thể thao'], ['Stadt', 'ʃtat', 'thành phố']] },
        { sym: 'z', label: 's trước nguyên âm', tip: 'Âm "z" có rung dây thanh (như "d" giọng Bắc trong "da").', words: [['Sonne', 'ˈzɔnə', 'mặt trời'], ['Saft', 'zaft', 'nước ép'], ['lesen', 'ˈleːzn̩', 'đọc']] },
        { sym: 's', label: 'ss, ß, s cuối', tip: '"s" không rung – đọc rõ, không nuốt.', words: [['Wasser', 'ˈvasɐ', 'nước'], ['groß', 'ɡʁoːs', 'to lớn'], ['Haus', 'haʊ̯s', 'ngôi nhà']] },
        { sym: 'ts', label: 'z, tz, -tion', tip: '"t" và "s" liền một hơi.', words: [['Zeit', 'tsaɪ̯t', 'thời gian'], ['Katze', 'ˈkatsə', 'con mèo'], ['Nation', 'naˈtsi̯oːn', 'quốc gia']] },
        { sym: 'pf', label: 'pf', tip: 'Môi bật "p" rồi chuyển ngay sang "f".', words: [['Apfel', 'ˈapfl̩', 'quả táo'], ['Pferd', 'pfeːɐ̯t', 'con ngựa'], ['Kopf', 'kɔpf', 'cái đầu']] },
        { sym: 'f', label: 'v (từ gốc Đức)', tip: 'v trong từ gốc Đức đọc là "f". (Từ mượn như Vase, Klavier đọc [v].)', words: [['Vater', 'ˈfaːtɐ', 'bố'], ['vier', 'fiːɐ̯', 'bốn'], ['viel', 'fiːl', 'nhiều']] },
        { sym: 'v', label: 'w', tip: 'w đọc như "v" tiếng Việt.', words: [['Wasser', 'ˈvasɐ', 'nước'], ['wie', 'viː', 'như thế nào'], ['Welt', 'vɛlt', 'thế giới']] },
        { sym: 'j', label: 'j', tip: 'Như "d/gi" giọng Nam ("da"), không phải "j" tiếng Anh.', words: [['ja', 'jaː', 'vâng'], ['Jahr', 'jaːɐ̯', 'năm'], ['Junge', 'ˈjʊŋə', 'cậu bé']] },
        { sym: 'h', label: 'h', tip: 'Đầu từ: bật hơi rõ. Sau nguyên âm: câm, chỉ báo nguyên âm dài (gehen, Sohn).', words: [['Haus', 'haʊ̯s', 'ngôi nhà'], ['haben', 'ˈhaːbn̩', 'có'], ['gehen', 'ˈɡeːən', 'đi']] },
        { sym: 'ŋ', label: 'ng', tip: 'Như "ng" tiếng Việt, KHÔNG có "g" bật ra sau.', words: [['lang', 'laŋ', 'dài'], ['singen', 'ˈzɪŋən', 'hát'], ['Zeitung', 'ˈtsaɪ̯tʊŋ', 'tờ báo']] },
        { sym: 'ks', label: 'chs, x', tip: 'Đọc "ks".', words: [['sechs', 'zɛks', 'sáu'], ['Fuchs', 'fʊks', 'con cáo'], ['Text', 'tɛkst', 'văn bản']] },
        { sym: 'kv', label: 'qu', tip: 'qu = "k" + "v".', words: [['Quatsch', 'kvatʃ', 'vớ vẩn'], ['bequem', 'bəˈkveːm', 'thoải mái'], ['Quelle', 'ˈkvɛlə', 'nguồn']] },
        { sym: 'ʔ', label: 'âm tắc thanh hầu', tip: 'Ngắt hơi rất nhẹ trước nguyên âm ở đầu từ / đầu hình vị. Tiếng Đức KHÔNG nối âm kiểu tiếng Anh: "ein Apfel" → [aɪ̯n ˈʔapfl̩].', words: [['beachten', 'bəˈʔaxtn̩', 'chú ý'], ['Theater', 'teˈʔaːtɐ', 'nhà hát'], ['Spiegelei', 'ˈʃpiːɡl̩ˌʔaɪ̯', 'trứng ốp la']] },
      ],
    },
    {
      id: 'devoice', title: 'Vô thanh hóa cuối từ (Auslautverhärtung)',
      intro: 'Ở **cuối từ hoặc cuối âm tiết**, b → [p], d → [t], g → [k], s → [s]. Nhưng khi thêm đuôi (số nhiều…), âm gốc trở lại. Nghe và so sánh từng cặp:',
      sounds: [
        { sym: 'k / ɡ', label: 'g', tip: 'Tag [taːk] – Tage [ˈtaːɡə]', words: [['Tag', 'taːk', 'ngày'], ['Tage', 'ˈtaːɡə', 'những ngày']] },
        { sym: 't / d', label: 'd', tip: 'Hund [hʊnt] – Hunde [ˈhʊndə]', words: [['Hund', 'hʊnt', 'con chó'], ['Hunde', 'ˈhʊndə', 'những con chó']] },
        { sym: 'p / b', label: 'b', tip: 'gelb [ɡɛlp] – gelbe [ˈɡɛlbə]', words: [['gelb', 'ɡɛlp', 'vàng'], ['gelbe', 'ˈɡɛlbə', '(cái) vàng']] },
        { sym: 's / z', label: 's', tip: 'Haus [haʊ̯s] – Häuser [ˈhɔʏ̯zɐ]', words: [['Haus', 'haʊ̯s', 'ngôi nhà'], ['Häuser', 'ˈhɔʏ̯zɐ', 'những ngôi nhà']] },
      ],
    },
  ],

  pairs: [
    { title: 'Nguyên âm dài – ngắn', tip: 'Nghe kỹ độ dài – đây là khác biệt đổi nghĩa.', pairs: [['Staat', 'Stadt'], ['Miete', 'Mitte'], ['Ofen', 'offen'], ['Beet', 'Bett'], ['Hüte', 'Hütte'], ['Schal', 'Schall'], ['Höhle', 'Hölle']] },
    { title: 'i – ü', tip: 'Cùng vị trí lưỡi, chỉ khác môi.', pairs: [['Kiste', 'Küste'], ['Tier', 'Tür'], ['vier', 'für'], ['Kissen', 'küssen']] },
    { title: 'e – ö', tip: 'Cùng vị trí lưỡi, ö chu môi tròn.', pairs: [['lesen', 'lösen'], ['kennen', 'können'], ['Sehne', 'Söhne']] },
    { title: 'u – ü', tip: 'Umlaut thường xuất hiện ở số nhiều.', pairs: [['Mutter', 'Mütter'], ['fuhr', 'für'], ['Bruder', 'Brüder']] },
    { title: 'o – ö', tip: '', pairs: [['schon', 'schön'], ['Tochter', 'Töchter'], ['Ofen', 'Öfen']] },
    { title: 'ei – ie', tip: 'ei = "ai", ie = "i" dài. Lỗi kinh điển!', pairs: [['Wein', 'Wien'], ['Reise', 'Riese'], ['leider', 'Lieder']] },
    { title: 'eu – ei', tip: 'eu = "oi", ei = "ai".', pairs: [['neun', 'nein'], ['Eule', 'Eile'], ['Leute', 'Leiter']] },
    { title: 'Ach-Laut ↔ Ich-Laut', tip: 'Số nhiều có umlaut → ch đổi từ [x] sang [ç].', pairs: [['Bach', 'Bäche'], ['Buch', 'Bücher'], ['Loch', 'Löcher']] },
    { title: 'ch [ç] – sch [ʃ]', tip: '[ç] lưỡi như "i", [ʃ] môi chu ra.', pairs: [['Kirche', 'Kirsche'], ['mich', 'misch']] },
    { title: 's [z] – ß [s]', tip: 's giữa hai nguyên âm rung [z], ß không rung [s].', pairs: [['reisen', 'reißen'], ['weise', 'weiße']] },
  ],

  stress: `## Trọng âm từ (Wortakzent)
- Từ gốc Đức: trọng âm thường ở **âm tiết đầu tiên của gốc từ**: {{Arbeit}} [ˈaʁbaɪ̯t], {{Mutter}} [ˈmʊtɐ], {{Sprache}} [ˈʃpʁaːxə].
- Tiền tố **không tách được** KHÔNG nhận trọng âm: be-, ge-, er-, ver-, zer-, ent-, emp-, miss- → {{verstehen}}, {{bezahlen}}, {{Geschenk}}.
- Tiền tố **tách được** NHẬN trọng âm: {{aufstehen}}, {{einkaufen}}, {{anrufen}}.
- Từ ghép: trọng âm chính ở **thành tố đầu**: {{Hausaufgabe}}, {{Bahnhof}}, {{Kühlschrank}}.
- Từ mượn: thường nhấn **âm tiết cuối/gần cuối**: -ion ({{Information}}), -ie ({{Philosophie}}), -ieren ({{studieren}}), -tät ({{Universität}}), -ur ({{Kultur}}).

## Ngữ điệu câu (Satzmelodie)
| Loại câu | Ngữ điệu | Ví dụ |
|---|---|---|
| Câu trần thuật | xuống ↘ | {{Ich komme aus Vietnam.}} |
| Câu hỏi có từ để hỏi (W-Frage) | xuống ↘ | {{Woher kommst du?}} |
| Câu hỏi có/không (Ja/Nein) | lên ↗ | {{Kommst du aus Vietnam?}} |
| Câu mệnh lệnh | xuống mạnh ↘ | {{Komm bitte her!}} |

> Tiếng Đức **không có thanh điệu** như tiếng Việt. Đừng lên giọng xuống giọng ở từng âm tiết – hãy nhấn mạnh âm tiết trọng âm (to hơn, dài hơn) và giữ các âm tiết khác nhẹ.

## Lỗi thường gặp của người Việt
1. **Nuốt phụ âm cuối**: tiếng Việt không bật phụ âm cuối, tiếng Đức phải đọc rõ: {{Hund}} [hʊnt], {{Obst}} [oːpst], {{nichts}} [nɪçts].
2. **Chèn nguyên âm vào cụm phụ âm**: {{Strumpf}} chỉ có 1 âm tiết [ʃtʁʊmpf], không phải "sơ-trum-pờ-phờ".
3. **Đọc -er thành "ơ"**: {{Lehrer}} là [ˈleːʁɐ], không phải "lê-rơ".
4. **Đọc ei thành "ây"**: {{mein}} là "main".
5. **Không phân biệt dài – ngắn**: {{Miete}} (tiền thuê nhà) ≠ {{Mitte}} (ở giữa).
6. **Nối âm**: {{am Abend}} → [am ˈʔaːbn̩t] – có ngắt nhẹ trước Abend.`,

  twisters: [
    ['Fischers Fritz fischt frische Fische, frische Fische fischt Fischers Fritz.', 'Luyện f, sch [ʃ], i ngắn'],
    ['Blaukraut bleibt Blaukraut und Brautkleid bleibt Brautkleid.', 'Luyện bl/br, au/ei'],
    ['Zwischen zwei Zwetschgenzweigen zwitschern zwei Schwalben.', 'Luyện z [ts], schw [ʃv]'],
    ['Esel essen Nesseln nicht, Nesseln essen Esel nicht.', 'Luyện e dài/ngắn, s [z]/[s]'],
    ['Wenn Fliegen hinter Fliegen fliegen, fliegen Fliegen Fliegen hinterher.', 'Luyện fl, ie [iː]'],
    ['Der Cottbuser Postkutscher putzt den Cottbuser Postkutschkasten.', 'Luyện p, tz [ts], tsch [tʃ]'],
  ],
};
