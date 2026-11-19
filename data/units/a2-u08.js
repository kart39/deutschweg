/* unit a2-u08 – đã kiểm duyệt */
(window.SEED = window.SEED || []).push({
 "type": "unit",
 "id": "a2-u08",
 "level": "A2",
 "order": 8,
 "title": "Urlaub und Reisen",
 "titleVi": "Kỳ nghỉ và du lịch",
 "goals": [
  "Lên kế hoạch chuyến đi, chọn giới từ nach, in, zu, an hoặc auf để nêu điểm đến.",
  "Đặt phòng, xác nhận dịch vụ và phân biệt Wo? với Wohin? khi nói về chỗ lưu trú.",
  "Dùng aus và von với Dativ để trả lời Woher? và mô tả nơi xuất phát.",
  "Báo vấn đề cụ thể ở chỗ ở, đề nghị cách xử lý và kể ngắn về kỳ nghỉ trong bưu thiếp."
 ],
 "lessons": [
  {
   "id": "a2-u08-l1",
   "title": "Wohin fahren wir?",
   "titleVi": "Mình sẽ đi đâu?",
   "theory": "## Chọn giới từ để nói điểm đến\n\nCâu hỏi {{Wohin?}} hỏi đích đến. Chọn giới từ theo loại địa điểm và theo cách mình hình dung đích đến.\n\n| Giới từ | Dùng khi nói về đích đến | Ví dụ |\n| --- | --- | --- |\n| {{nach}} | tên thành phố, nước thường không có mạo từ; cụm {{nach Hause}} | {{Wir fahren nach Salzburg.}} — Chúng mình đi Salzburg. |\n| {{in + Akkusativ}} | vào bên trong, vào một vùng, hoặc đến nước có mạo từ | {{Wir fahren in die Schweiz.}} — Chúng mình đi Thụy Sĩ. {{Wir fahren in die Berge.}} — Chúng mình đi vùng núi. |\n| {{zu + Dativ}} | đến chỗ một người, một cơ quan hoặc một mốc | {{Wir gehen zum Bahnhof.}} — Chúng mình đi đến ga. |\n| {{an + Akkusativ}} | đến sát bờ biển, bờ sông hay bờ hồ | {{Wir fahren an die Küste.}} — Chúng mình đi ra bờ biển. |\n| {{auf + Akkusativ}} | đến một hòn đảo hoặc lên một bề mặt, khu vực mở | {{Wir fahren auf eine Insel.}} — Chúng mình đi ra một hòn đảo. |\n\n{{nach}} và {{zu}} đi với {{Dativ}}, dù câu trả lời nói về hướng. Với {{in}}, {{an}}, {{auf}}, dùng {{Akkusativ}} trong các câu mô tả đích đến ở bảng trên. Dạng gộp thường gặp gồm {{zum}} = {{zu dem}}, {{zur}} = {{zu der}}, {{ins}} = {{in das}}, {{ans}} = {{an das}} và {{aufs}} = {{auf das}}.\n\n## Lập một hành trình ngắn\n\nNêu nơi đến, thêm chặng dừng và cho biết lúc quay về. {{Zuerst fahren wir nach Lübeck. Dann machen wir einen Abstecher an die Küste. Am Sonntag fahren wir zurück.}} — Trước tiên chúng mình đi Lübeck. Sau đó ghé bờ biển. Chủ nhật chúng mình quay về.\n\nCả {{nach Rügen}} và {{auf die Insel Rügen}} đều đúng. Với tên riêng {{Rügen}} đứng một mình, có thể dùng {{nach}}. Với cụm có danh từ {{die Insel}}, dùng {{auf die Insel}} để nói đích đến.",
   "vocab": [
    {
     "de": "Reiseziel",
     "article": "das",
     "plural": "Reiseziele",
     "pos": "noun",
     "ipa": "ˈʁaɪ̯zəˌtsiːl",
     "vi": "điểm đến du lịch",
     "example": "Unser erstes Reiseziel ist Lübeck.",
     "exampleVi": "Điểm đến đầu tiên của chúng mình là Lübeck."
    },
    {
     "de": "Reiseroute",
     "article": "die",
     "plural": "Reiserouten",
     "pos": "noun",
     "ipa": "ˈʁaɪ̯zəˌʁuːtə",
     "vi": "tuyến hành trình",
     "example": "Die Reiseroute führt an die Küste.",
     "exampleVi": "Tuyến hành trình đi ra bờ biển."
    },
    {
     "de": "Reiseplanung",
     "article": "die",
     "plural": "Reiseplanungen",
     "pos": "noun",
     "ipa": "ˈʁaɪ̯zəˌplaːnʊŋ",
     "vi": "việc lên kế hoạch chuyến đi",
     "example": "Bei der Reiseplanung hilft eine Karte.",
     "exampleVi": "Bản đồ giúp ích khi lên kế hoạch chuyến đi."
    },
    {
     "de": "Abstecher",
     "article": "der",
     "plural": "Abstecher",
     "pos": "noun",
     "ipa": "ˈapˌʃtɛçɐ",
     "vi": "chuyến ghé qua ngoài lộ trình chính",
     "example": "Wir machen einen Abstecher nach Wismar.",
     "exampleVi": "Chúng mình ghé qua Wismar."
    },
    {
     "de": "Tagesausflug",
     "article": "der",
     "plural": "Tagesausflüge",
     "pos": "noun",
     "ipa": "ˈtaːɡəsˌʔaʊ̯sfluːk",
     "vi": "chuyến đi chơi trong ngày",
     "example": "Wir machen einen Tagesausflug an den See.",
     "exampleVi": "Chúng mình đi chơi trong ngày ở hồ."
    },
    {
     "de": "Rundreise",
     "article": "die",
     "plural": "Rundreisen",
     "pos": "noun",
     "ipa": "ˈʁʊntˌʁaɪ̯zə",
     "vi": "chuyến du lịch qua nhiều điểm theo một vòng",
     "example": "Die Rundreise endet in Dresden.",
     "exampleVi": "Chuyến du lịch kết thúc ở Dresden."
    },
    {
     "de": "Strecke",
     "article": "die",
     "plural": "Strecken",
     "pos": "noun",
     "ipa": "ˈʃtʁɛkə",
     "vi": "quãng đường, tuyến đường",
     "example": "Die Strecke zum See ist kurz.",
     "exampleVi": "Quãng đường đến hồ ngắn."
    },
    {
     "de": "Zwischenstopp",
     "article": "der",
     "plural": "Zwischenstopps",
     "pos": "noun",
     "ipa": "ˈtsvɪʃn̩ˌʃtɔp",
     "vi": "chặng dừng giữa hành trình",
     "example": "Wir machen einen Zwischenstopp in Ulm.",
     "exampleVi": "Chúng mình dừng một chặng ở Ulm."
    },
    {
     "de": "Startpunkt",
     "article": "der",
     "plural": "Startpunkte",
     "pos": "noun",
     "ipa": "ˈʃtaʁtˌpʊŋkt",
     "vi": "điểm xuất phát",
     "example": "Der Bahnhof ist unser Startpunkt.",
     "exampleVi": "Nhà ga là điểm xuất phát của chúng mình."
    },
    {
     "de": "Endpunkt",
     "article": "der",
     "plural": "Endpunkte",
     "pos": "noun",
     "ipa": "ˈɛntˌpʊŋkt",
     "vi": "điểm cuối hành trình",
     "example": "Das Hotel ist der Endpunkt.",
     "exampleVi": "Khách sạn là điểm cuối của hành trình."
    },
    {
     "de": "Küste",
     "article": "die",
     "plural": "Küsten",
     "pos": "noun",
     "ipa": "ˈkʏstə",
     "vi": "bờ biển, vùng ven biển",
     "example": "Morgen fahren wir an die Küste.",
     "exampleVi": "Ngày mai chúng mình ra bờ biển."
    },
    {
     "de": "Insel",
     "article": "die",
     "plural": "Inseln",
     "pos": "noun",
     "ipa": "ˈɪnzl̩",
     "vi": "hòn đảo",
     "example": "Wir möchten auf die Insel fahren.",
     "exampleVi": "Chúng mình muốn ra đảo."
    },
    {
     "de": "Gebirge",
     "article": "das",
     "plural": "Gebirge",
     "pos": "noun",
     "ipa": "ɡəˈbɪʁɡə",
     "vi": "dãy núi, vùng núi",
     "example": "Die Familie fährt ins Gebirge.",
     "exampleVi": "Gia đình đi lên vùng núi."
    },
    {
     "de": "Nationalpark",
     "article": "der",
     "plural": "Nationalparks",
     "pos": "noun",
     "ipa": "natsioˈnaːlˌpaʁk",
     "vi": "vườn quốc gia",
     "example": "Wir fahren in einen Nationalpark.",
     "exampleVi": "Chúng mình đi đến một vườn quốc gia."
    },
    {
     "de": "Reisetag",
     "article": "der",
     "plural": "Reisetage",
     "pos": "noun",
     "ipa": "ˈʁaɪ̯zəˌtaːk",
     "vi": "ngày trong hành trình",
     "example": "Am zweiten Reisetag fahren wir an den See.",
     "exampleVi": "Vào ngày thứ hai của chuyến đi, chúng mình đi ra hồ."
    },
    {
     "de": "Landkarte",
     "article": "die",
     "plural": "Landkarten",
     "pos": "noun",
     "ipa": "ˈlantˌkaʁtə",
     "vi": "bản đồ địa lý",
     "example": "Auf der Landkarte sehen wir die ganze Strecke.",
     "exampleVi": "Trên bản đồ, chúng mình thấy toàn bộ lộ trình."
    },
    {
     "de": "Etappe",
     "article": "die",
     "plural": "Etappen",
     "pos": "noun",
     "ipa": "eˈtapə",
     "vi": "chặng của hành trình",
     "example": "Die erste Etappe endet in Kiel.",
     "exampleVi": "Chặng đầu kết thúc ở Kiel."
    },
    {
     "de": "Reisezeit",
     "article": "die",
     "plural": "Reisezeiten",
     "pos": "noun",
     "ipa": "ˈʁaɪ̯zəˌtsaɪ̯t",
     "vi": "thời gian hoặc mùa thích hợp để đi du lịch",
     "example": "Der September ist eine gute Reisezeit.",
     "exampleVi": "Tháng Chín là thời điểm thích hợp để đi du lịch."
    },
    {
     "de": "auswählen",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "wählt aus, wählte aus, hat ausgewählt",
     "ipa": "ˈaʊ̯sˌvɛːlən",
     "vi": "chọn trong số các phương án (+ Akk; động từ tách)",
     "example": "Wir wählen das Reiseziel zusammen aus.",
     "exampleVi": "Chúng mình cùng chọn điểm đến."
    },
    {
     "de": "losfahren",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "fährt los, fuhr los, ist losgefahren",
     "ipa": "ˈloːsˌfaːʁən",
     "vi": "khởi hành bằng phương tiện (động từ tách)",
     "example": "Wir fahren am Freitag früh los.",
     "exampleVi": "Chúng mình khởi hành sớm vào thứ Sáu."
    },
    {
     "de": "hinfahren",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "fährt hin, fuhr hin, ist hingefahren",
     "ipa": "ˈhɪnˌfaːʁən",
     "vi": "đi đến đó bằng phương tiện (động từ tách)",
     "example": "Möchtest du mit dem Zug hinfahren?",
     "exampleVi": "Bạn muốn đi tàu đến đó không?"
    },
    {
     "de": "zurückfahren",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "fährt zurück, fuhr zurück, ist zurückgefahren",
     "ipa": "tsuˈʁʏkˌfaːʁən",
     "vi": "đi về, quay lại bằng phương tiện (động từ tách)",
     "example": "Am Montag fahren wir zurück.",
     "exampleVi": "Thứ Hai chúng mình quay về."
    },
    {
     "de": "weiterreisen",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "reist weiter, reiste weiter, ist weitergereist",
     "ipa": "ˈvaɪ̯tɐˌʁaɪ̯zn̩",
     "vi": "đi tiếp trong hành trình (động từ tách)",
     "example": "Wir reisen am nächsten Morgen weiter.",
     "exampleVi": "Chúng mình đi tiếp vào sáng hôm sau."
    },
    {
     "de": "vorhaben",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "hat vor, hatte vor, hat vorgehabt",
     "ipa": "ˈfoːɐ̯ˌhaːbn̩",
     "vi": "dự định (+ Akk hoặc zu + nguyên mẫu; động từ tách)",
     "example": "Was hast du im Urlaub vor?",
     "exampleVi": "Bạn dự định làm gì trong kỳ nghỉ?"
    },
    {
     "de": "unterwegs",
     "article": null,
     "plural": null,
     "pos": "adv",
     "ipa": "ʊntɐˈveːks",
     "vi": "đang trên đường, dọc đường",
     "example": "Unterwegs machen wir eine Pause.",
     "exampleVi": "Dọc đường chúng mình nghỉ một lát."
    }
   ],
   "dialogue": [
    {
     "speaker": "A",
     "name": "My",
     "de": "Wohin wollen wir im September fahren?",
     "vi": "Tháng Chín chúng mình muốn đi đâu?"
    },
    {
     "speaker": "B",
     "name": "Jonas",
     "de": "Ich möchte an die Küste. Was hältst du von Lübeck?",
     "vi": "Mình muốn đi ra bờ biển. Bạn thấy Lübeck thế nào?"
    },
    {
     "speaker": "A",
     "name": "My",
     "de": "Gute Idee. Wir können am Freitag nach Lübeck fahren.",
     "vi": "Ý hay đấy. Thứ Sáu chúng mình có thể đi Lübeck."
    },
    {
     "speaker": "B",
     "name": "Jonas",
     "de": "Und am Samstag machen wir einen Tagesausflug ans Meer.",
     "vi": "Và thứ Bảy chúng mình đi chơi ngoài biển trong ngày."
    },
    {
     "speaker": "A",
     "name": "My",
     "de": "Fahren wir direkt hin oder machen wir einen Zwischenstopp?",
     "vi": "Mình đi thẳng đến đó hay dừng ở đâu giữa đường?"
    },
    {
     "speaker": "B",
     "name": "Jonas",
     "de": "Lass uns zuerst nach Hamburg fahren. Dort kann ich meine Tante treffen.",
     "vi": "Mình đi Hamburg trước nhé. Ở đó mình có thể gặp cô mình."
    },
    {
     "speaker": "A",
     "name": "My",
     "de": "Gut. Wann reisen wir von Hamburg weiter?",
     "vi": "Được. Khi nào mình đi tiếp từ Hamburg?"
    },
    {
     "speaker": "B",
     "name": "Jonas",
     "de": "Am Freitag um vier. Die Strecke nach Lübeck ist nicht lang.",
     "vi": "Thứ Sáu lúc bốn giờ. Đường đến Lübeck không dài."
    },
    {
     "speaker": "A",
     "name": "My",
     "de": "Fahren wir am Sonntag zurück?",
     "vi": "Chủ nhật mình về à?"
    },
    {
     "speaker": "B",
     "name": "Jonas",
     "de": "Lieber erst am Montag. Dann haben wir am Sonntag noch Zeit für einen Abstecher.",
     "vi": "Thứ Hai thì hơn. Vậy Chủ nhật mình vẫn còn thời gian ghé thêm một nơi."
    },
    {
     "speaker": "A",
     "name": "My",
     "de": "Gut, ich suche eine Verbindung für Montag.",
     "vi": "Được, mình sẽ tìm chuyến cho thứ Hai."
    },
    {
     "speaker": "B",
     "name": "Jonas",
     "de": "Und ich bringe die Landkarte mit.",
     "vi": "Còn mình sẽ mang bản đồ."
    }
   ],
   "reading": {
    "title": "Drei Tage im Norden",
    "text": "Für das lange Wochenende im September planen Huy und Lena eine kurze Reise. Am Freitag fahren sie nach Hamburg. Dort treffen sie Lenas Cousine und essen mit ihr zu Mittag. Danach reisen sie mit dem Zug nach Lübeck weiter. Lübeck ist ihr Startpunkt für das Wochenende.\n\nAm Samstag möchten sie an die Küste fahren. Sie haben vor, dort am Meer spazieren zu gehen. Wenn sie genug Zeit haben, machen sie am Nachmittag noch einen Abstecher nach Travemünde. Am Sonntag wollen sie in die Stadt zurück und das Museum besuchen. Huy hat schon online gesehen, wann es öffnet.\n\nFür die Rückfahrt haben die beiden Montag gewählt. Sie wollen schon am Vormittag losfahren. Lena muss um vier Uhr zu ihrer Schwester, denn am Abend feiern beide mit ihrer Familie.",
    "vi": "Vào dịp cuối tuần dài tháng Chín, Huy và Lena lên kế hoạch đi chơi ngắn ngày. Thứ Sáu họ đi Hamburg. Ở đó họ gặp chị họ của Lena và ăn trưa cùng chị ấy. Sau đó họ đi tàu tiếp đến Lübeck. Lübeck là điểm xuất phát để họ đi chơi cuối tuần.\n\nThứ Bảy họ muốn đi ra bờ biển. Họ định đi dạo bên biển. Nếu có đủ thời gian, buổi chiều họ sẽ ghé thêm Travemünde. Chủ nhật họ muốn quay vào thành phố và tham quan bảo tàng. Huy đã xem giờ mở cửa trên mạng.\n\nHai người chọn thứ Hai để trở về. Họ muốn khởi hành ngay buổi sáng. Lena phải đến chỗ chị gái lúc bốn giờ vì buổi tối cả hai có buổi gặp mặt ăn mừng cùng gia đình.",
    "questions": [
     {
      "q": "Wen treffen Huy und Lena in Hamburg?",
      "options": [
       "Huys Tante.",
       "Lenas Cousine.",
       "Lenas Schwester."
      ],
      "answer": 1
     },
     {
      "q": "Wohin fahren die beiden am Samstag zuerst?",
      "options": [
       "An die Küste.",
       "Zum Museum.",
       "Nach Hamburg."
      ],
      "answer": 0
     },
     {
      "q": "Wann wollen sie zurückfahren?",
      "options": [
       "Am Sonntagabend.",
       "Am Montagvormittag.",
       "Am Samstagmorgen."
      ],
      "answer": 1
     }
    ],
    "glossary": []
   },
   "writing": {
    "task": "Schreib einer Freundin oder einem Freund über deine Reisepläne (40–60 Wörter). Nenne zwei Ziele, einen Zwischenstopp und den Tag der Rückfahrt.\nViết 40–60 từ báo kế hoạch du lịch cho một người bạn. Nêu hai điểm đến, một chặng dừng giữa đường và ngày trở về.",
    "minWords": 40,
    "sample": "Hallo Sara! Im September möchte ich zuerst nach Lübeck und dann für zwei Tage an die Küste fahren. Auf dem Weg mache ich einen Zwischenstopp in Hamburg. Dort esse ich mit meiner Cousine zu Mittag. Am Montag fahre ich früh zurück. Möchtest du mitkommen? Viele Grüße, Huy"
   },
   "exercises": [
    {
     "type": "mcq",
     "q": "Chọn câu hỏi về điểm đến của chuyến đi.",
     "options": [
      "Wann fahrt ihr?",
      "Woher kommt ihr?",
      "Wohin fahrt ihr?",
      "Wo seid ihr?"
     ],
     "answer": 2,
     "explain": "{{Wohin?}} dùng để hỏi điểm đến hoặc hướng đi."
    },
    {
     "type": "mcq",
     "q": "Chọn cụm có nghĩa “đến Thụy Sĩ”.",
     "options": [
      "nach der Schweiz",
      "in der Schweiz",
      "aus der Schweiz",
      "in die Schweiz"
     ],
     "answer": 3,
     "explain": "{{die Schweiz}} có mạo từ. Khi nêu đích đến, dùng {{in die Schweiz}}."
    },
    {
     "type": "mcq",
     "q": "Chọn cách nói “đi đến Salzburg”.",
     "options": [
      "in Salzburg fahren",
      "nach Salzburg fahren",
      "von Salzburg fahren",
      "aus Salzburg fahren"
     ],
     "answer": 1,
     "explain": "{{nach Salzburg}} chỉ đích đến là một thành phố."
    },
    {
     "type": "mcq",
     "q": "Chọn cụm có nghĩa “đi đến ga” với giới từ zu.",
     "options": [
      "von dem Bahnhof",
      "zu den Bahnhof",
      "zum Bahnhof",
      "zur Bahnhof"
     ],
     "answer": 2,
     "explain": "{{der Bahnhof}} ở {{Dativ}} là {{dem Bahnhof}}. Gộp {{zu dem}} thành {{zum}}."
    },
    {
     "type": "mcq",
     "q": "Chọn cụm có nghĩa “đi ra một hòn đảo”.",
     "options": [
      "aus einer Insel fahren",
      "auf eine Insel fahren",
      "an der Insel fahren",
      "auf einer Insel fahren"
     ],
     "answer": 1,
     "explain": "{{auf eine Insel}} trả lời {{Wohin?}} và dùng {{Akkusativ}}."
    },
    {
     "type": "gap",
     "text": "Wir fahren ___ Küste.",
     "answers": [
      "an die"
     ],
     "hint": "an + die Küste, chỉ đích đến",
     "vi": "Chúng mình đi ra bờ biển.",
     "explain": "Khi nêu hướng đến bờ biển, nói {{an die Küste}}."
    },
    {
     "type": "gap",
     "text": "Am Samstag fahren wir ___ Dresden.",
     "answers": [
      "nach"
     ],
     "hint": "Đích đến là một thành phố",
     "vi": "Thứ Bảy chúng mình đi Dresden.",
     "explain": "Dùng {{nach}} trước tên thành phố khi nêu đích đến."
    },
    {
     "type": "gap",
     "text": "Im September fahren wir ___ Gebirge.",
     "answers": [
      "ins"
     ],
     "hint": "in + das, viết gộp",
     "vi": "Tháng Chín chúng mình đi lên vùng núi.",
     "explain": "{{ins}} là dạng gộp của {{in das}} cho đích đến giống trung."
    },
    {
     "type": "gap",
     "text": "Du musst heute ___ Bahnhof gehen.",
     "answers": [
      "zum"
     ],
     "hint": "zu + dem, viết gộp",
     "vi": "Hôm nay bạn phải đến ga.",
     "explain": "Giới từ {{zu}} đi với {{Dativ}}, nên gộp {{zu dem}} thành {{zum}}."
    },
    {
     "type": "gap",
     "text": "Am Freitag fahren wir früh ___.",
     "answers": [
      "los"
     ],
     "hint": "losfahren, phần tách",
     "vi": "Thứ Sáu chúng mình khởi hành sớm.",
     "explain": "Trong câu kể, phần {{los}} của {{losfahren}} đứng cuối."
    },
    {
     "type": "gap",
     "text": "Wir möchten auf ___ Insel fahren.",
     "answers": [
      "eine"
     ],
     "hint": "Mạo từ không xác định, chỉ đích đến",
     "vi": "Chúng mình muốn đi ra một hòn đảo.",
     "explain": "Dùng {{auf + Akkusativ}} khi chỉ đích đến ở đây. Với {{Insel}}, chọn {{eine}}."
    },
    {
     "type": "order",
     "words": [
      "ihr",
      "Fahrt",
      "zurück"
     ],
     "answer": "Fahrt ihr zurück?",
     "answers": [
      "Fahrt ihr zurück?"
     ],
     "vi": "Các bạn có quay về không?"
    },
    {
     "type": "order",
     "words": [
      "hinfahren",
      "Kannst",
      "du"
     ],
     "answer": "Kannst du hinfahren?",
     "answers": [
      "Kannst du hinfahren?"
     ],
     "vi": "Bạn đi đến đó được không?"
    },
    {
     "type": "order",
     "words": [
      "Hause",
      "nach",
      "du",
      "Fährst"
     ],
     "answer": "Fährst du nach Hause?",
     "answers": [
      "Fährst du nach Hause?"
     ],
     "vi": "Bạn về nhà à?"
    },
    {
     "type": "translate",
     "vi": "Thứ Bảy chúng mình đi ra bờ biển.",
     "answers": [
      "Am Samstag fahren wir an die Küste.",
      "Wir fahren am Samstag an die Küste."
     ]
    },
    {
     "type": "translate",
     "vi": "Chúng mình ghé qua Wismar trong ngày hôm nay.",
     "answers": [
      "Heute machen wir einen Abstecher nach Wismar.",
      "Wir machen heute einen Abstecher nach Wismar."
     ]
    },
    {
     "type": "translate",
     "vi": "Thứ Hai bạn muốn quay về à?",
     "answers": [
      "Willst du am Montag zurückfahren?",
      "Möchtest du am Montag zurückfahren?"
     ]
    },
    {
     "type": "listen",
     "de": "Am Sonntag fahren wir in die Schweiz.",
     "vi": "Chủ nhật chúng mình đi Thụy Sĩ."
    },
    {
     "type": "listen",
     "de": "Unterwegs machen wir einen Zwischenstopp in Ulm.",
     "vi": "Dọc đường chúng mình dừng một chặng ở Ulm."
    },
    {
     "type": "speak",
     "de": "Ich möchte am Samstag an den See fahren.",
     "vi": "Thứ Bảy mình muốn đi ra hồ."
    },
    {
     "type": "speak",
     "de": "Am Montag reisen wir nach dem Frühstück weiter.",
     "vi": "Thứ Hai chúng mình đi tiếp sau bữa sáng."
    },
    {
     "type": "match",
     "pairs": [
      [
       "das Reiseziel",
       "điểm đến du lịch"
      ],
      [
       "der Zwischenstopp",
       "chặng dừng giữa đường"
      ],
      [
       "der Tagesausflug",
       "chuyến đi chơi trong ngày"
      ],
      [
       "die Landkarte",
       "bản đồ địa lý"
      ],
      [
       "die Küste",
       "bờ biển"
      ]
     ]
    },
    {
     "type": "mcq",
     "q": "Chọn từ chỉ lúc bắt đầu đi trong câu “Wir fahren morgen früh ___.”",
     "options": [
      "weiter",
      "los",
      "zurück",
      "hin"
     ],
     "answer": 1,
     "explain": "{{losfahren}} là khởi hành. {{weiterreisen}} nói về đi tiếp và {{zurückfahren}} nói về quay về."
    }
   ]
  },
  {
   "id": "a2-u08-l2",
   "title": "Ein Zimmer für zwei Nächte",
   "titleVi": "Đặt phòng cho hai đêm",
   "theory": "## Hỏi vị trí và nói hướng đi tại chỗ ở\n\nCác giới từ {{in}}, {{an}} và {{auf}} đổi cách tùy ý nghĩa của cụm giới từ. Hỏi {{Wo?}} khi muốn biết vị trí. Hỏi {{Wohin?}} khi muốn biết đích đến.\n\n| Địa điểm | {{Wo?}} với {{Dativ}} | {{Wohin?}} với {{Akkusativ}} |\n| --- | --- | --- |\n| bên trong một tòa nhà | {{im Hotel}}, {{in der Pension}} | {{ins Hotel}}, {{in die Pension}} |\n| tại một quầy hoặc mốc | {{an der Rezeption}} | {{an die Rezeption}} |\n| trong khu cắm trại | {{auf dem Campingplatz}} | {{auf den Campingplatz}} |\n\n{{An der Rezeption}} là nơi một việc diễn ra. {{Ich bezahle an der Rezeption.}} — Mình thanh toán tại quầy lễ tân. {{An die Rezeption}} là đích đến trong câu {{Ich gehe an die Rezeption.}} — Mình đi đến quầy lễ tân.\n\nKhi dùng {{zu}}, danh từ theo sau luôn ở {{Dativ}}. {{Ich gehe zur Rezeption.}} cũng có nghĩa “Mình đến quầy lễ tân”. Có thể nói {{zum Hotel gehen}} khi lấy khách sạn làm mốc cần đến và {{ins Hotel gehen}} khi nói đi vào trong khách sạn.\n\n## Hỏi và xác nhận đặt phòng\n\n1. Nêu ngày và số người. {{Ich hätte gern ein Zimmer für zwei Personen vom 14. bis zum 16. Mai.}} — Tôi muốn đặt một phòng cho hai người từ ngày 14 đến 16 tháng Năm.\n2. Hỏi giá và dịch vụ. {{Ist das Frühstück im Preis inbegriffen?}} — Bữa sáng đã tính trong giá chưa?\n3. Hỏi nơi nhận chìa khóa. {{Wo bekomme ich die Schlüsselkarte?}} — Tôi nhận thẻ mở cửa ở đâu?\n4. Nhờ gửi xác nhận. {{Können Sie mir die Buchungsbestätigung schicken?}} — Anh/chị có thể gửi xác nhận đặt phòng cho tôi không?\n\n> Khi nói phòng trong một địa điểm, dùng {{im Gästehaus}} hoặc {{in der Jugendherberge}}. Khi nói khách đi vào nơi đó, dùng {{ins Gästehaus}} hoặc {{in die Jugendherberge}}.",
   "vocab": [
    {
     "de": "Unterkunft",
     "article": "die",
     "plural": "Unterkünfte",
     "pos": "noun",
     "ipa": "ˈʊntɐˌkʊnft",
     "vi": "chỗ lưu trú",
     "example": "Wir suchen eine Unterkunft für zwei Nächte.",
     "exampleVi": "Chúng mình tìm chỗ ở cho hai đêm."
    },
    {
     "de": "Jugendherberge",
     "article": "die",
     "plural": "Jugendherbergen",
     "pos": "noun",
     "ipa": "ˈjuːɡn̩tˌhɛʁbɛʁɡə",
     "vi": "nhà nghỉ thanh niên",
     "example": "Wir übernachten in einer Jugendherberge.",
     "exampleVi": "Chúng mình nghỉ qua đêm ở một nhà nghỉ thanh niên."
    },
    {
     "de": "Pension",
     "article": "die",
     "plural": "Pensionen",
     "pos": "noun",
     "ipa": "pɑ̃ˈzi̯oːn",
     "vi": "nhà nghỉ nhỏ (chỗ lưu trú)",
     "example": "Die Pension liegt am See.",
     "exampleVi": "Nhà nghỉ nằm bên hồ."
    },
    {
     "de": "Gästehaus",
     "article": "das",
     "plural": "Gästehäuser",
     "pos": "noun",
     "ipa": "ˈɡɛstəˌhaʊ̯s",
     "vi": "nhà khách",
     "example": "Im Gästehaus gibt es sechs Zimmer.",
     "exampleVi": "Nhà khách có sáu phòng."
    },
    {
     "de": "Ferienwohnung",
     "article": "die",
     "plural": "Ferienwohnungen",
     "pos": "noun",
     "ipa": "ˈfeːʁi̯ənˌvoːnʊŋ",
     "vi": "căn hộ cho thuê phục vụ kỳ nghỉ",
     "example": "Die Ferienwohnung ist für vier Personen.",
     "exampleVi": "Căn hộ nghỉ dưỡng dành cho bốn người."
    },
    {
     "de": "Campingplatz",
     "article": "der",
     "plural": "Campingplätze",
     "pos": "noun",
     "ipa": "ˈkɛmpɪŋˌplats",
     "vi": "khu cắm trại",
     "example": "Auf dem Campingplatz gibt es einen kleinen Laden.",
     "exampleVi": "Trong khu cắm trại có một cửa hàng nhỏ."
    },
    {
     "de": "Mehrbettzimmer",
     "article": "das",
     "plural": "Mehrbettzimmer",
     "pos": "noun",
     "ipa": "ˈmeːɐ̯bɛtˌtsɪmɐ",
     "vi": "phòng có nhiều giường",
     "example": "Im Mehrbettzimmer schlafen sechs Personen.",
     "exampleVi": "Sáu người ngủ trong phòng nhiều giường."
    },
    {
     "de": "Familienzimmer",
     "article": "das",
     "plural": "Familienzimmer",
     "pos": "noun",
     "ipa": "faˈmiːli̯ənˌtsɪmɐ",
     "vi": "phòng dành cho gia đình",
     "example": "Das Familienzimmer hat vier Betten.",
     "exampleVi": "Phòng gia đình có bốn giường."
    },
    {
     "de": "Übernachtung",
     "article": "die",
     "plural": "Übernachtungen",
     "pos": "noun",
     "ipa": "yːbɐˈnaxtʊŋ",
     "vi": "lượt nghỉ qua đêm",
     "example": "Eine Übernachtung kostet achtzig Euro.",
     "exampleVi": "Một đêm nghỉ giá tám mươi euro."
    },
    {
     "de": "Aufenthalt",
     "article": "der",
     "plural": "Aufenthalte",
     "pos": "noun",
     "ipa": "ˈaʊ̯fʔɛntˌhalt",
     "vi": "thời gian lưu trú, đợt lưu trú",
     "example": "Unser Aufenthalt dauert drei Tage.",
     "exampleVi": "Chúng mình lưu trú ba ngày."
    },
    {
     "de": "Frühstücksbuffet",
     "article": "das",
     "plural": "Frühstücksbuffets",
     "pos": "noun",
     "ipa": "ˈfʁyːʃtʏksbyˌfeː",
     "vi": "bữa sáng tự chọn",
     "example": "Das Frühstücksbuffet beginnt um sieben.",
     "exampleVi": "Bữa sáng tự chọn bắt đầu lúc bảy giờ."
    },
    {
     "de": "Frühstücksraum",
     "article": "der",
     "plural": "Frühstücksräume",
     "pos": "noun",
     "ipa": "ˈfʁyːʃtʏksˌʁaʊ̯m",
     "vi": "phòng ăn sáng",
     "example": "Der Frühstücksraum ist im Erdgeschoss.",
     "exampleVi": "Phòng ăn sáng ở tầng trệt."
    },
    {
     "de": "Zimmernummer",
     "article": "die",
     "plural": "Zimmernummern",
     "pos": "noun",
     "ipa": "ˈtsɪmɐˌnʊmɐ",
     "vi": "số phòng",
     "example": "Können Sie mir die Zimmernummer sagen?",
     "exampleVi": "Anh/chị có thể cho tôi biết số phòng không?"
    },
    {
     "de": "Zimmerschlüssel",
     "article": "der",
     "plural": "Zimmerschlüssel",
     "pos": "noun",
     "ipa": "ˈtsɪmɐˌʃlʏsl̩",
     "vi": "chìa khóa phòng",
     "example": "Der Zimmerschlüssel liegt an der Rezeption.",
     "exampleVi": "Chìa khóa phòng ở quầy lễ tân."
    },
    {
     "de": "Schlüsselkarte",
     "article": "die",
     "plural": "Schlüsselkarten",
     "pos": "noun",
     "ipa": "ˈʃlʏsl̩ˌkaʁtə",
     "vi": "thẻ mở cửa",
     "example": "Die Schlüsselkarte ist in meiner Tasche.",
     "exampleVi": "Thẻ mở cửa ở trong túi của mình."
    },
    {
     "de": "Buchungsbestätigung",
     "article": "die",
     "plural": "Buchungsbestätigungen",
     "pos": "noun",
     "ipa": "ˈbuːxʊŋsbəˌʃtɛːtɪɡʊŋ",
     "vi": "xác nhận đặt chỗ",
     "example": "Die Buchungsbestätigung kommt per E-Mail.",
     "exampleVi": "Xác nhận đặt chỗ được gửi qua email."
    },
    {
     "de": "Reisedatum",
     "article": "das",
     "plural": "Reisedaten",
     "pos": "noun",
     "ipa": "ˈʁaɪ̯zəˌdaːtʊm",
     "vi": "ngày đi, mốc ngày của chuyến đi",
     "example": "Bitte geben Sie das Reisedatum an.",
     "exampleVi": "Vui lòng cho biết ngày đi."
    },
    {
     "de": "verfügbar",
     "article": null,
     "plural": null,
     "pos": "adj",
     "ipa": "fɛɐ̯ˈfyːkbaːɐ̯",
     "vi": "có sẵn, còn trống",
     "example": "Ist das Familienzimmer noch verfügbar?",
     "exampleVi": "Phòng gia đình còn trống không?"
    },
    {
     "de": "bestätigen",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "bestätigt, bestätigte, hat bestätigt",
     "ipa": "bəˈʃtɛːtɪɡn̩",
     "vi": "xác nhận (+ Akk)",
     "example": "Können Sie den Preis bestätigen?",
     "exampleVi": "Anh/chị có thể xác nhận giá không?"
    },
    {
     "de": "übernachten",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "übernachtet, übernachtete, hat übernachtet",
     "ipa": "yːbɐˈnaxtn̩",
     "vi": "nghỉ qua đêm",
     "example": "Wir übernachten im Gästehaus.",
     "exampleVi": "Chúng mình nghỉ qua đêm ở nhà khách."
    },
    {
     "de": "angeben",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "gibt an, gab an, hat angegeben",
     "ipa": "ˈanˌɡeːbn̩",
     "vi": "cung cấp thông tin (+ Akk; động từ tách)",
     "example": "Bitte geben Sie Ihren Namen an.",
     "exampleVi": "Vui lòng cung cấp tên của anh/chị."
    },
    {
     "de": "bekommen",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "bekommt, bekam, hat bekommen",
     "ipa": "bəˈkɔmən",
     "vi": "nhận được (+ Akk)",
     "example": "Sie bekommen die Schlüsselkarte an der Rezeption.",
     "exampleVi": "Anh/chị nhận thẻ mở cửa ở quầy lễ tân."
    },
    {
     "de": "frühzeitig",
     "article": null,
     "plural": null,
     "pos": "adv",
     "ipa": "ˈfʁyːˌtsaɪ̯tɪç",
     "vi": "sớm, trước đủ lâu",
     "example": "Im Sommer buchen wir frühzeitig.",
     "exampleVi": "Vào mùa hè, chúng mình đặt phòng sớm."
    },
    {
     "de": "inbegriffen",
     "article": null,
     "plural": null,
     "pos": "adj",
     "ipa": "ɪnbəˈɡʁɪfn̩",
     "vi": "đã bao gồm, đã tính trong giá",
     "example": "Das Frühstück ist im Preis inbegriffen.",
     "exampleVi": "Bữa sáng đã tính trong giá."
    },
    {
     "de": "ausgebucht",
     "article": null,
     "plural": null,
     "pos": "adj",
     "ipa": "ˈaʊ̯sɡəˌbuːxt",
     "vi": "đã hết chỗ, hết phòng",
     "example": "Das Gästehaus ist am Samstag ausgebucht.",
     "exampleVi": "Nhà khách đã hết phòng vào thứ Bảy."
    }
   ],
   "dialogue": [
    {
     "speaker": "A",
     "name": "Nam",
     "de": "Guten Tag! Ich hätte gern ein Zimmer für zwei Nächte.",
     "vi": "Xin chào! Tôi muốn đặt một phòng cho hai đêm."
    },
    {
     "speaker": "B",
     "name": "Frau Hansen",
     "de": "Für welches Datum und für wie viele Personen?",
     "vi": "Cho ngày nào và bao nhiêu người ạ?"
    },
    {
     "speaker": "A",
     "name": "Nam",
     "de": "Vom 14. bis zum 16. Mai, für zwei Erwachsene und ein Kind.",
     "vi": "Từ ngày 14 đến 16 tháng Năm, cho hai người lớn và một trẻ em."
    },
    {
     "speaker": "B",
     "name": "Frau Hansen",
     "de": "Für diese Tage ist ein Familienzimmer verfügbar.",
     "vi": "Những ngày đó còn một phòng gia đình."
    },
    {
     "speaker": "A",
     "name": "Nam",
     "de": "Was kosten zwei Übernachtungen?",
     "vi": "Hai đêm nghỉ giá bao nhiêu ạ?"
    },
    {
     "speaker": "B",
     "name": "Frau Hansen",
     "de": "Insgesamt zweihundert Euro. Das Frühstück ist inbegriffen.",
     "vi": "Tổng cộng hai trăm euro. Giá đã gồm bữa sáng."
    },
    {
     "speaker": "A",
     "name": "Nam",
     "de": "Wo gibt es das Frühstück?",
     "vi": "Bữa sáng được phục vụ ở đâu ạ?"
    },
    {
     "speaker": "B",
     "name": "Frau Hansen",
     "de": "Im Frühstücksraum im Erdgeschoss, ab sieben Uhr.",
     "vi": "Trong phòng ăn sáng ở tầng trệt, từ bảy giờ."
    },
    {
     "speaker": "A",
     "name": "Nam",
     "de": "Gut, dann nehme ich das Zimmer. Wo bekomme ich den Schlüssel?",
     "vi": "Được, vậy tôi đặt phòng đó. Tôi nhận chìa khóa ở đâu ạ?"
    },
    {
     "speaker": "B",
     "name": "Frau Hansen",
     "de": "Gehen Sie bei Ihrer Ankunft bitte an die Rezeption.",
     "vi": "Khi đến, anh vui lòng ra quầy lễ tân."
    },
    {
     "speaker": "A",
     "name": "Nam",
     "de": "Können Sie mir die Buchungsbestätigung per E-Mail schicken?",
     "vi": "Chị có thể gửi xác nhận đặt phòng qua email cho tôi không?"
    },
    {
     "speaker": "B",
     "name": "Frau Hansen",
     "de": "Gern. Bitte geben Sie mir noch Ihre E-Mail-Adresse.",
     "vi": "Được ạ. Anh cho tôi xin thêm địa chỉ email nhé."
    }
   ],
   "reading": {
    "title": "Willkommen im Gästehaus Lindenhof",
    "text": "Guten Tag, Frau Nguyen! Vielen Dank für Ihre Buchung. Ihr Familienzimmer ist am Freitag ab 15 Uhr verfügbar. Bei der Ankunft gehen Sie bitte zuerst an die Rezeption. Sie ist im Erdgeschoss. Dort bekommen Sie zwei Schlüsselkarten. Wenn Sie erst nach 20 Uhr ankommen, rufen Sie uns bitte vorher an. Dann erklären wir Ihnen, wo Ihr Schlüssel liegt.\n\nDas Frühstück ist im Preis inbegriffen. Zwischen sieben und zehn Uhr finden Sie das Buffet im Frühstücksraum neben der Rezeption. Bei gutem Wetter können Sie mit Ihrem Frühstück auf die Terrasse gehen. Auf der Terrasse stehen sechs Tische. Einen Parkplatz gibt es hinter dem Gästehaus.\n\nMöchten Sie früher in die Stadt? Sie können Ihre Taschen schon ab elf Uhr an der Rezeption lassen. Wir wünschen Ihnen einen schönen Aufenthalt!",
    "vi": "Xin chào bà Nguyen! Cảm ơn bà đã đặt phòng. Phòng gia đình của bà sẵn sàng từ 15 giờ thứ Sáu. Khi đến, bà vui lòng ra quầy lễ tân trước. Quầy nằm ở tầng trệt. Tại đó bà sẽ nhận hai thẻ mở cửa. Nếu đến sau 20 giờ, bà vui lòng gọi cho chúng tôi trước. Khi đó chúng tôi sẽ hướng dẫn bà lấy chìa khóa ở đâu.\n\nGiá đã gồm bữa sáng. Từ bảy đến mười giờ, bà có thể dùng bữa sáng tự chọn ở phòng ăn cạnh quầy lễ tân. Nếu trời đẹp, bà có thể mang bữa sáng ra sân hiên. Trên sân hiên có sáu bàn. Phía sau nhà khách có chỗ đậu xe.\n\nBà muốn vào thành phố sớm hơn? Bà có thể gửi túi ở quầy lễ tân từ mười một giờ. Chúc bà có thời gian lưu trú vui vẻ!",
    "questions": [
     {
      "q": "Wo bekommt Frau Nguyen bei der regulären Ankunft die Schlüsselkarten?",
      "options": [
       "Auf der Terrasse.",
       "An der Rezeption.",
       "Im Frühstücksraum."
      ],
      "answer": 1
     },
     {
      "q": "Was soll Frau Nguyen tun, wenn sie nach 20 Uhr ankommt?",
      "options": [
       "Vorher bezahlen.",
       "Vorher anrufen.",
       "An der Rezeption warten."
      ],
      "answer": 1
     },
     {
      "q": "Wo steht das Frühstücksbuffet?",
      "options": [
       "Auf der Terrasse.",
       "Hinter dem Gästehaus.",
       "Im Frühstücksraum."
      ],
      "answer": 2
     }
    ],
    "glossary": []
   },
   "writing": {
    "task": "Schreib eine Buchungsanfrage (40–60 Wörter). Nenne den Zeitraum, die Zahl der Gäste und die Zimmerart. Frag nach dem Frühstück und nach dem Ort der Schlüsselübergabe.\nViết yêu cầu đặt phòng 40–60 từ. Nêu thời gian, số khách và loại phòng. Hỏi về bữa sáng và nơi nhận chìa khóa.",
    "minWords": 40,
    "sample": "Guten Tag! Ich hätte gern ein Familienzimmer vom 14. bis zum 16. Mai für zwei Erwachsene und ein Kind. Ist noch ein Zimmer verfügbar? Ist das Frühstück im Preis inbegriffen? Bekomme ich den Schlüssel an der Rezeption? Bitte senden Sie mir den Gesamtpreis per E-Mail. Vielen Dank und freundliche Grüße, Nam"
   },
   "exercises": [
    {
     "type": "mcq",
     "q": "Chọn cụm chỉ vị trí “trong nhà khách”.",
     "options": [
      "ins Gästehaus",
      "zum Gästehaus",
      "im Gästehaus",
      "aus dem Gästehaus"
     ],
     "answer": 2,
     "explain": "{{im}} gộp {{in dem}} và chỉ vị trí bên trong nhà khách."
    },
    {
     "type": "mcq",
     "q": "Chọn cụm dùng an có nghĩa “đến quầy lễ tân”.",
     "options": [
      "an die Rezeption",
      "bei der Rezeption",
      "an der Rezeption",
      "von der Rezeption"
     ],
     "answer": 0,
     "explain": "{{an die Rezeption}} là đích đến, nên dùng {{Akkusativ}}."
    },
    {
     "type": "mcq",
     "q": "“Das Frühstück ist im Preis inbegriffen.” nghĩa là gì?",
     "options": [
      "Giá đã gồm bữa sáng.",
      "Bữa sáng được phục vụ trong phòng.",
      "Cần trả thêm tiền cho bữa sáng.",
      "Bữa sáng chỉ phục vụ khi đặt trước."
     ],
     "answer": 0,
     "explain": "{{im Preis inbegriffen}} nghĩa là đã tính vào giá."
    },
    {
     "type": "mcq",
     "q": "Chọn câu có nghĩa “Chúng mình nghỉ qua đêm trong khu cắm trại”.",
     "options": [
      "Wir treffen uns vor dem Campingplatz.",
      "Wir übernachten auf dem Campingplatz.",
      "Wir fahren vom Campingplatz.",
      "Wir fahren auf den Campingplatz."
     ],
     "answer": 1,
     "explain": "Vị trí nghỉ qua đêm là {{auf dem Campingplatz}} với {{Dativ}}."
    },
    {
     "type": "mcq",
     "q": "Chọn tính từ nghĩa “hết phòng” trong câu “Für Samstag ist die Pension ___.”",
     "options": [
      "ausgebucht",
      "inbegriffen",
      "frühzeitig",
      "verfügbar"
     ],
     "answer": 0,
     "explain": "{{ausgebucht}} nghĩa là mọi phòng đã được đặt hết."
    },
    {
     "type": "gap",
     "text": "Wir gehen ___ Gästehaus.",
     "answers": [
      "ins"
     ],
     "hint": "in + das, viết gộp, đích đến bên trong",
     "vi": "Chúng mình đi vào nhà khách.",
     "explain": "Dùng {{ins}} vì đích đến là bên trong {{das Gästehaus}}."
    },
    {
     "type": "gap",
     "text": "Der Schlüssel liegt ___ Rezeption.",
     "answers": [
      "an der"
     ],
     "hint": "an + die Rezeption, chỉ vị trí",
     "vi": "Chìa khóa ở quầy lễ tân.",
     "explain": "{{Wo?}} hỏi vị trí, nên dùng {{an der Rezeption}}."
    },
    {
     "type": "gap",
     "text": "Sie fahren auf ___ Campingplatz.",
     "answers": [
      "den"
     ],
     "hint": "Mạo từ xác định, chỉ đích đến",
     "vi": "Họ đi tới khu cắm trại.",
     "explain": "Với {{der Campingplatz}}, mạo từ {{Akkusativ}} là {{den}}."
    },
    {
     "type": "gap",
     "text": "Das Frühstücksbuffet steht ___ Frühstücksraum.",
     "answers": [
      "im"
     ],
     "hint": "in + dem, viết gộp, chỉ vị trí",
     "vi": "Bữa sáng tự chọn được bày trong phòng ăn sáng.",
     "explain": "{{im}} là dạng gộp của {{in dem}}."
    },
    {
     "type": "gap",
     "text": "Das Familienzimmer ist noch ___.",
     "answers": [
      "verfügbar|frei"
     ],
     "hint": "Còn trống, có sẵn",
     "vi": "Phòng gia đình vẫn còn trống.",
     "explain": "{{verfügbar}} hoặc {{frei}} cho biết phòng còn trống."
    },
    {
     "type": "gap",
     "text": "Bitte geben Sie das Reisedatum ___.",
     "answers": [
      "an"
     ],
     "hint": "angeben, phần tách",
     "vi": "Anh/chị vui lòng cung cấp ngày đi.",
     "explain": "Dạng lịch sự {{Geben Sie … an}} đặt phần {{an}} cuối câu."
    },
    {
     "type": "order",
     "words": [
      "Sie",
      "dort",
      "Übernachten"
     ],
     "answer": "Übernachten Sie dort?",
     "answers": [
      "Übernachten Sie dort?"
     ],
     "vi": "Anh/chị nghỉ qua đêm ở đó à?"
    },
    {
     "type": "order",
     "words": [
      "inbegriffen",
      "Ist",
      "es"
     ],
     "answer": "Ist es inbegriffen?",
     "answers": [
      "Ist es inbegriffen?"
     ],
     "vi": "Khoản đó đã được tính trong giá chưa?"
    },
    {
     "type": "order",
     "words": [
      "hingehen",
      "wir",
      "Können"
     ],
     "answer": "Können wir hingehen?",
     "answers": [
      "Können wir hingehen?"
     ],
     "vi": "Chúng mình đến đó được không?"
    },
    {
     "type": "translate",
     "vi": "Chúng mình nghỉ qua đêm ở nhà khách.",
     "answers": [
      "Wir übernachten im Gästehaus.",
      "Im Gästehaus übernachten wir."
     ]
    },
    {
     "type": "translate",
     "vi": "Tôi nhận thẻ mở cửa ở quầy lễ tân.",
     "answers": [
      "Ich bekomme die Schlüsselkarte an der Rezeption.",
      "An der Rezeption bekomme ich die Schlüsselkarte."
     ]
    },
    {
     "type": "translate",
     "vi": "Giá đã gồm bữa sáng chưa?",
     "answers": [
      "Ist das Frühstück im Preis inbegriffen?",
      "Ist das Frühstück im Preis enthalten?"
     ]
    },
    {
     "type": "listen",
     "de": "Im Gästehaus ist noch ein Familienzimmer frei.",
     "vi": "Nhà khách vẫn còn một phòng gia đình."
    },
    {
     "type": "listen",
     "de": "Die Schlüsselkarte bekommen Sie an der Rezeption.",
     "vi": "Anh/chị nhận thẻ mở cửa ở quầy lễ tân."
    },
    {
     "type": "speak",
     "de": "Ich möchte für zwei Nächte ein Zimmer buchen.",
     "vi": "Tôi muốn đặt một phòng cho hai đêm."
    },
    {
     "type": "speak",
     "de": "Das Frühstücksbuffet steht im Raum an der Rezeption.",
     "vi": "Bữa sáng tự chọn được bày trong phòng ở chỗ quầy lễ tân."
    },
    {
     "type": "match",
     "pairs": [
      [
       "die Schlüsselkarte",
       "thẻ mở cửa"
      ],
      [
       "die Zimmernummer",
       "số phòng"
      ],
      [
       "die Jugendherberge",
       "nhà nghỉ thanh niên"
      ],
      [
       "die Buchungsbestätigung",
       "xác nhận đặt chỗ"
      ],
      [
       "das Familienzimmer",
       "phòng gia đình"
      ]
     ]
    },
    {
     "type": "mcq",
     "q": "Chọn câu hỏi nơi nhận thẻ mở cửa.",
     "options": [
      "Woher kommt die Schlüsselkarte?",
      "Wann bekomme ich die Schlüsselkarte?",
      "Wo bekomme ich die Schlüsselkarte?",
      "Wie viel kostet die Schlüsselkarte?"
     ],
     "answer": 2,
     "explain": "{{Wo?}} hỏi địa điểm nhận thẻ."
    }
   ]
  },
  {
   "id": "a2-u08-l3",
   "title": "Grüße von der Küste",
   "titleVi": "Lời chào từ bờ biển",
   "theory": "## Nói từ đâu đến với {{Woher?}}\n\n| Giới từ | Dùng trong bài | Ví dụ |\n| --- | --- | --- |\n| {{aus + Dativ}} | từ bên trong, từ một thành phố hoặc quốc gia | {{Ich komme aus dem Hotel.}} — Mình vừa đi ra từ khách sạn. {{Wir kommen aus der Schweiz.}} — Chúng mình đến từ Thụy Sĩ. |\n| {{von + Dativ}} | từ một mốc, từ chỗ một người hoặc từ một hoạt động | {{Ich komme vom Strand.}} — Mình vừa từ bãi biển về. {{Ich komme von der Rezeption.}} — Mình vừa ở quầy lễ tân về. |\n\nCùng một địa điểm có thể là nơi xuất phát theo hai cách. {{Aus dem Hotel}} nhấn mạnh đi từ trong khách sạn ra. {{Vom Hotel}} lấy khách sạn làm mốc bắt đầu, chẳng hạn khi kể đường đi. {{Vom}} gộp {{von dem}}. Với danh từ giống cái, giữ {{von der}} hoặc {{aus der}}.\n\n| Câu hỏi | Bờ biển | Thụy Sĩ |\n| --- | --- | --- |\n| {{Wohin?}} | {{an die Küste}} | {{in die Schweiz}} |\n| {{Wo?}} | {{an der Küste}} | {{in der Schweiz}} |\n| {{Woher?}} | {{von der Küste}} | {{aus der Schweiz}} |\n\n## Báo vấn đề ở chỗ lưu trú\n\nNêu vấn đề cụ thể, nói rõ phòng và đề nghị cách xử lý. {{In Zimmer zwölf gibt es kein Warmwasser. Können Sie das bitte prüfen?}} — Phòng mười hai không có nước nóng. Anh/chị có thể kiểm tra giúp tôi không? Khi cần chuyển phòng, hỏi {{Können wir das Zimmer wechseln?}} — Chúng tôi có thể đổi phòng không?\n\nDùng {{reklamieren}} khi phản ánh về dịch vụ hoặc đồ đã mua. Dùng {{einen Mangel melden}} khi báo một lỗi cụ thể. {{Die Klimaanlage ist defekt.}} — Điều hòa bị hỏng.\n\n## Viết bưu thiếp\n\nMở đầu bằng {{Liebe Mai,}} hoặc {{Lieber Ben,}}. Nói mình đang ở đâu và vừa đi đâu về, rồi kể một hoạt động. {{Wir sind an der Küste. Ich komme gerade vom Strand. Morgen fahren wir auf eine Insel.}} — Chúng mình đang ở bờ biển. Mình vừa từ bãi biển về. Mai chúng mình ra đảo. Kết thư bằng {{Liebe Grüße}} và tên của bạn.",
   "vocab": [
    {
     "de": "Beschwerde",
     "article": "die",
     "plural": "Beschwerden",
     "pos": "noun",
     "ipa": "bəˈʃveːɐ̯də",
     "vi": "lời phàn nàn, khiếu nại",
     "example": "Die Rezeption nimmt die Beschwerde auf.",
     "exampleVi": "Lễ tân ghi nhận lời phàn nàn."
    },
    {
     "de": "Mangel",
     "article": "der",
     "plural": "Mängel",
     "pos": "noun",
     "ipa": "ˈmaŋl̩",
     "vi": "thiếu sót, khiếm khuyết",
     "example": "Ich möchte einen Mangel im Zimmer melden.",
     "exampleVi": "Tôi muốn báo một vấn đề trong phòng."
    },
    {
     "de": "Lärm",
     "article": "der",
     "plural": "–",
     "pos": "noun",
     "ipa": "ˈlɛʁm",
     "vi": "tiếng ồn",
     "example": "Nachts gibt es viel Lärm.",
     "exampleVi": "Ban đêm có nhiều tiếng ồn."
    },
    {
     "de": "Baustelle",
     "article": "die",
     "plural": "Baustellen",
     "pos": "noun",
     "ipa": "ˈbaʊ̯ˌʃtɛlə",
     "vi": "công trường",
     "example": "Neben dem Gästehaus ist eine Baustelle.",
     "exampleVi": "Có một công trường cạnh nhà khách."
    },
    {
     "de": "Klimaanlage",
     "article": "die",
     "plural": "Klimaanlagen",
     "pos": "noun",
     "ipa": "ˈkliːmaˌʔanlaːɡə",
     "vi": "máy điều hòa, hệ thống điều hòa",
     "example": "Die Klimaanlage funktioniert nicht.",
     "exampleVi": "Máy điều hòa không hoạt động."
    },
    {
     "de": "Warmwasser",
     "article": "das",
     "plural": "–",
     "pos": "noun",
     "ipa": "ˈvaʁmˌvasɐ",
     "vi": "nước nóng",
     "example": "Im Bad gibt es kein Warmwasser.",
     "exampleVi": "Trong phòng tắm không có nước nóng."
    },
    {
     "de": "Duschkopf",
     "article": "der",
     "plural": "Duschköpfe",
     "pos": "noun",
     "ipa": "ˈduːʃˌkɔpf",
     "vi": "đầu vòi sen",
     "example": "Der Duschkopf ist undicht.",
     "exampleVi": "Đầu vòi sen bị rò nước."
    },
    {
     "de": "Handtuch",
     "article": "das",
     "plural": "Handtücher",
     "pos": "noun",
     "ipa": "ˈhantˌtuːx",
     "vi": "khăn lau, khăn tắm",
     "example": "Im Bad liegen zwei Handtücher.",
     "exampleVi": "Trong phòng tắm có hai chiếc khăn."
    },
    {
     "de": "Zimmerwechsel",
     "article": "der",
     "plural": "Zimmerwechsel",
     "pos": "noun",
     "ipa": "ˈtsɪmɐˌvɛksl̩",
     "vi": "việc đổi phòng",
     "example": "Ein Zimmerwechsel ist morgen möglich.",
     "exampleVi": "Ngày mai có thể đổi phòng."
    },
    {
     "de": "Ersatz",
     "article": "der",
     "plural": "–",
     "pos": "noun",
     "ipa": "ɛɐ̯ˈzats",
     "vi": "đồ thay thế, giải pháp thay thế",
     "example": "Wir brauchen Ersatz für den Duschkopf.",
     "exampleVi": "Chúng tôi cần đầu vòi sen thay thế."
    },
    {
     "de": "Erstattung",
     "article": "die",
     "plural": "Erstattungen",
     "pos": "noun",
     "ipa": "ɛɐ̯ˈʃtatʊŋ",
     "vi": "khoản hoàn tiền, việc hoàn tiền",
     "example": "Die Erstattung kommt in drei Tagen.",
     "exampleVi": "Khoản hoàn tiền sẽ về sau ba ngày."
    },
    {
     "de": "Lösung",
     "article": "die",
     "plural": "Lösungen",
     "pos": "noun",
     "ipa": "ˈløːzʊŋ",
     "vi": "giải pháp, cách giải quyết",
     "example": "Wir finden sicher eine Lösung.",
     "exampleVi": "Chắc chắn chúng tôi sẽ tìm được cách giải quyết."
    },
    {
     "de": "Aussicht",
     "article": "die",
     "plural": "Aussichten",
     "pos": "noun",
     "ipa": "ˈaʊ̯sˌzɪçt",
     "vi": "tầm nhìn, quang cảnh (auf + Akk)",
     "example": "Das Zimmer hat Aussicht aufs Meer.",
     "exampleVi": "Phòng nhìn ra biển."
    },
    {
     "de": "Ansichtskarte",
     "article": "die",
     "plural": "Ansichtskarten",
     "pos": "noun",
     "ipa": "ˈanˌzɪçtskaʁtə",
     "vi": "bưu thiếp có hình",
     "example": "Ich schreibe eine Ansichtskarte aus dem Urlaub.",
     "exampleVi": "Mình viết bưu thiếp trong kỳ nghỉ."
    },
    {
     "de": "Briefmarke",
     "article": "die",
     "plural": "Briefmarken",
     "pos": "noun",
     "ipa": "ˈbʁiːfˌmaʁkə",
     "vi": "tem thư",
     "example": "Ich brauche eine Briefmarke für die Karte.",
     "exampleVi": "Mình cần một con tem cho bưu thiếp."
    },
    {
     "de": "Briefkasten",
     "article": "der",
     "plural": "Briefkästen",
     "pos": "noun",
     "ipa": "ˈbʁiːfˌkastn̩",
     "vi": "hộp thư, thùng gửi thư",
     "example": "Der Briefkasten ist vor der Post.",
     "exampleVi": "Thùng gửi thư ở trước bưu điện."
    },
    {
     "de": "Absender",
     "article": "der",
     "plural": "Absender",
     "pos": "noun",
     "ipa": "ˈapˌzɛndɐ",
     "vi": "người gửi, thông tin người gửi",
     "example": "Ich schreibe meinen Namen als Absender auf die Karte.",
     "exampleVi": "Mình ghi tên mình trên bưu thiếp ở phần người gửi."
    },
    {
     "de": "Empfänger",
     "article": "der",
     "plural": "Empfänger",
     "pos": "noun",
     "ipa": "ɛmˈpfɛŋɐ",
     "vi": "người nhận",
     "example": "Der Empfänger wohnt in Bonn.",
     "exampleVi": "Người nhận sống ở Bonn."
    },
    {
     "de": "Grußformel",
     "article": "die",
     "plural": "Grußformeln",
     "pos": "noun",
     "ipa": "ˈɡʁuːsˌfɔʁml̩",
     "vi": "lời chào kết thư",
     "example": "Auf der Karte steht als Grußformel „Liebe Grüße“.",
     "exampleVi": "Bưu thiếp có lời chào kết thư “Thân mến”."
    },
    {
     "de": "reklamieren",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "reklamiert, reklamierte, hat reklamiert",
     "ipa": "ʁeklaˈmiːʁən",
     "vi": "phản ánh, khiếu nại về hàng hóa hoặc dịch vụ (+ Akk)",
     "example": "Diesen Service möchte ich reklamieren.",
     "exampleVi": "Tôi muốn phản ánh về dịch vụ này."
    },
    {
     "de": "melden",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "meldet, meldete, hat gemeldet",
     "ipa": "ˈmɛldn̩",
     "vi": "báo, thông báo (+ Akk)",
     "example": "Bitte melden Sie den Mangel an der Rezeption.",
     "exampleVi": "Anh/chị vui lòng báo vấn đề ở quầy lễ tân."
    },
    {
     "de": "wechseln",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "wechselt, wechselte, hat gewechselt",
     "ipa": "ˈvɛksl̩n",
     "vi": "đổi, thay (+ Akk trong bài)",
     "example": "Wir möchten das Zimmer wechseln.",
     "exampleVi": "Chúng tôi muốn đổi phòng."
    },
    {
     "de": "beheben",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "behebt, behob, hat behoben",
     "ipa": "bəˈheːbn̩",
     "vi": "khắc phục, sửa lỗi (+ Akk)",
     "example": "Das Hotel behebt den Mangel heute.",
     "exampleVi": "Khách sạn khắc phục lỗi trong hôm nay."
    },
    {
     "de": "undicht",
     "article": null,
     "plural": null,
     "pos": "adj",
     "ipa": "ˈʊnˌdɪçt",
     "vi": "không kín, bị rò",
     "example": "Das Fenster ist undicht.",
     "exampleVi": "Cửa sổ bị hở."
    },
    {
     "de": "defekt",
     "article": null,
     "plural": null,
     "pos": "adj",
     "ipa": "deˈfɛkt",
     "vi": "bị hỏng, không hoạt động",
     "example": "Meine Schlüsselkarte ist defekt.",
     "exampleVi": "Thẻ mở cửa của tôi bị hỏng."
    }
   ],
   "dialogue": [
    {
     "speaker": "A",
     "name": "Hoa",
     "de": "Guten Tag. Ich komme gerade vom Strand und wollte duschen.",
     "vi": "Xin chào. Tôi vừa từ bãi biển về và định tắm."
    },
    {
     "speaker": "B",
     "name": "Herr Brandt",
     "de": "Gibt es ein Problem mit dem Bad?",
     "vi": "Phòng tắm có vấn đề gì ạ?"
    },
    {
     "speaker": "A",
     "name": "Hoa",
     "de": "Ja. Aus der Dusche kommt nur kaltes Wasser.",
     "vi": "Có. Vòi sen chỉ chảy nước lạnh."
    },
    {
     "speaker": "B",
     "name": "Herr Brandt",
     "de": "Das tut mir leid. Welche Zimmernummer haben Sie?",
     "vi": "Tôi rất tiếc. Chị ở phòng số mấy?"
    },
    {
     "speaker": "A",
     "name": "Hoa",
     "de": "Zimmer zwölf. Können Sie bitte jemanden schicken?",
     "vi": "Phòng mười hai. Anh có thể cử người lên xem giúp không?"
    },
    {
     "speaker": "B",
     "name": "Herr Brandt",
     "de": "Ja, ich melde das sofort. Eine Kollegin kann um fünf kommen.",
     "vi": "Được, tôi sẽ báo ngay. Một đồng nghiệp có thể lên lúc năm giờ."
    },
    {
     "speaker": "A",
     "name": "Hoa",
     "de": "Können wir früher eine Lösung finden? Wir müssen um fünf zum Bahnhof.",
     "vi": "Có cách nào giải quyết sớm hơn không ạ? Năm giờ chúng tôi phải đến ga."
    },
    {
     "speaker": "B",
     "name": "Herr Brandt",
     "de": "Sie können jetzt das Zimmer wechseln. Zimmer acht ist frei.",
     "vi": "Chị có thể đổi phòng ngay. Phòng tám đang trống."
    },
    {
     "speaker": "A",
     "name": "Hoa",
     "de": "Wo ist Zimmer acht?",
     "vi": "Phòng tám ở đâu ạ?"
    },
    {
     "speaker": "B",
     "name": "Herr Brandt",
     "de": "Im Erdgeschoss, gleich rechts. Hier ist die Schlüsselkarte.",
     "vi": "Ở tầng trệt, ngay bên phải. Đây là thẻ mở cửa."
    },
    {
     "speaker": "A",
     "name": "Hoa",
     "de": "Gut, ich hole zuerst die Taschen aus Zimmer zwölf.",
     "vi": "Được, tôi lấy túi ra khỏi phòng mười hai trước."
    },
    {
     "speaker": "B",
     "name": "Herr Brandt",
     "de": "Natürlich. Wenn noch etwas fehlt, kommen Sie bitte wieder an die Rezeption.",
     "vi": "Vâng. Nếu còn thiếu gì, chị vui lòng quay lại quầy lễ tân."
    }
   ],
   "reading": {
    "title": "Eine Karte aus dem Urlaub",
    "text": "Lieber Daniel,\n\nviele Grüße von der Küste! Wir sind seit Freitag in einem kleinen Gästehaus. Jeden Morgen frühstücken wir auf der Terrasse. Von dort sehen wir das Meer. Heute komme ich gerade vom Strand zurück. Es war windig, aber die Sonne war warm und das Wasser war ruhig.\n\nGestern hatten wir kein Warmwasser im Bad. Ich bin an die Rezeption gegangen und habe den Mangel gemeldet. Am Nachmittag war das Problem schon behoben. Jetzt ist alles in Ordnung.\n\nMorgen fahren wir auf die Insel Poel. Dort möchten wir Fahrräder mieten und an der Küste entlangfahren. Am Montag reisen wir nach Hause. Ich bringe dir ein Foto vom Strand mit. Diese Karte werfe ich gleich in den Briefkasten vor der Post.\n\nLiebe Grüße\nHoa",
    "vi": "Daniel thân mến,\n\nGửi bạn lời chào từ bờ biển! Từ thứ Sáu chúng mình ở một nhà khách nhỏ. Sáng nào chúng mình cũng ăn sáng trên sân hiên. Từ đó có thể nhìn ra biển. Hôm nay mình vừa từ bãi biển về. Trời có gió nhưng nắng ấm, mặt nước yên ả.\n\nHôm qua phòng tắm không có nước nóng. Mình ra quầy lễ tân báo vấn đề. Đến chiều lỗi đã được khắc phục. Giờ mọi thứ ổn rồi.\n\nNgày mai chúng mình ra đảo Poel. Ở đó chúng mình muốn thuê xe đạp và đạp dọc bờ biển. Thứ Hai chúng mình về nhà. Mình sẽ mang cho bạn một tấm ảnh bãi biển. Mình sắp bỏ tấm bưu thiếp này vào thùng thư trước bưu điện.\n\nThân mến,\nHoa",
    "questions": [
     {
      "q": "Wo frühstückt Hoa jeden Morgen?",
      "options": [
       "Im Zimmer.",
       "Auf der Terrasse.",
       "Am Strand."
      ],
      "answer": 1
     },
     {
      "q": "Wo hat Hoa den Mangel gemeldet?",
      "options": [
       "An der Rezeption.",
       "Im Frühstücksraum.",
       "Bei der Post."
      ],
      "answer": 0
     },
     {
      "q": "Wohin fährt Hoa am nächsten Tag?",
      "options": [
       "Nach Hause.",
       "Auf die Insel Poel.",
       "Zum Bahnhof."
      ],
      "answer": 1
     }
    ],
    "glossary": []
   },
   "writing": {
    "task": "Schreib eine Ansichtskarte (40–60 Wörter). Sag, wo du bist, woher du gerade kommst und wohin du morgen fährst. Erzähle kurz von einem kleinen Problem und einer Lösung.\nViết bưu thiếp 40–60 từ. Nêu bạn đang ở đâu, vừa từ đâu về và ngày mai sẽ đi đâu. Kể ngắn gọn về một vấn đề nhỏ và cách giải quyết.",
    "minWords": 40,
    "sample": "Liebe Mai, viele Grüße von der Küste! Wir sind in einer Pension am Meer. Ich komme gerade vom Strand. Gestern war unsere Schlüsselkarte defekt, aber wir haben an der Rezeption sofort eine neue bekommen. Morgen fahren wir auf eine kleine Insel. Dort machen wir einen langen Spaziergang. Liebe Grüße, Hoa"
   },
   "exercises": [
    {
     "type": "mcq",
     "q": "Hỏi “Tàu vừa đến từ đâu?” bằng câu nào?",
     "options": [
      "Wo ist der Zug?",
      "Woher kommt der Zug?",
      "Wohin fährt der Zug?",
      "Wann kommt der Zug?"
     ],
     "answer": 1,
     "explain": "{{Woher?}} hỏi nguồn hoặc điểm xuất phát."
    },
    {
     "type": "mcq",
     "q": "Chọn cụm nghĩa “đi ra từ trong khách sạn”.",
     "options": [
      "im Hotel bleiben",
      "aus dem Hotel kommen",
      "ins Hotel gehen",
      "zum Hotel gehen"
     ],
     "answer": 1,
     "explain": "{{aus dem Hotel}} chỉ điểm xuất phát ở bên trong khách sạn."
    },
    {
     "type": "mcq",
     "q": "Chọn câu nghĩa “Chúng mình vừa từ bãi biển về”.",
     "options": [
      "Wir fahren gerade an den Strand.",
      "Wir kommen gerade vom Strand.",
      "Wir sind gerade am Strand.",
      "Wir gehen gerade zum Strand."
     ],
     "answer": 1,
     "explain": "{{vom Strand}} là điểm xuất phát. {{vom}} gộp {{von dem}}."
    },
    {
     "type": "mcq",
     "q": "Câu nào đề nghị đổi phòng?",
     "options": [
      "Ist das Frühstück inbegriffen?",
      "Können wir am Meer bleiben?",
      "Können wir das Zimmer wechseln?",
      "Wo ist die Rezeption?"
     ],
     "answer": 2,
     "explain": "{{das Zimmer wechseln}} nghĩa là đổi phòng."
    },
    {
     "type": "mcq",
     "q": "Chọn cụm có nghĩa “từ Thụy Sĩ”.",
     "options": [
      "in der Schweiz",
      "aus der Schweiz",
      "in die Schweiz",
      "an der Schweiz"
     ],
     "answer": 1,
     "explain": "{{aus}} chỉ nguồn gốc và đi với {{Dativ}}. Với {{die Schweiz}}, dùng {{aus der Schweiz}}."
    },
    {
     "type": "gap",
     "text": "Ich komme gerade ___ Strand.",
     "answers": [
      "vom"
     ],
     "hint": "von + dem, viết gộp",
     "vi": "Mình vừa từ bãi biển về.",
     "explain": "{{vom}} là dạng gộp của {{von dem}} và chỉ điểm xuất phát."
    },
    {
     "type": "gap",
     "text": "Die Gäste kommen ___ Schweiz.",
     "answers": [
      "aus der"
     ],
     "hint": "aus + die Schweiz ở Dativ",
     "vi": "Các vị khách đến từ Thụy Sĩ.",
     "explain": "Sau {{aus}}, dùng {{Dativ}}. Với {{die Schweiz}}, chọn {{der Schweiz}}."
    },
    {
     "type": "gap",
     "text": "Nur kaltes Wasser kommt ___ Dusche.",
     "answers": [
      "aus der"
     ],
     "hint": "aus + die Dusche ở Dativ",
     "vi": "Vòi sen chỉ chảy nước lạnh.",
     "explain": "Dùng {{aus der Dusche}} để chỉ nơi nước chảy ra."
    },
    {
     "type": "gap",
     "text": "Das Gästehaus liegt ___ Küste.",
     "answers": [
      "an der"
     ],
     "hint": "an + die Küste, chỉ vị trí",
     "vi": "Nhà khách nằm ở bờ biển.",
     "explain": "{{Wo?}} hỏi vị trí, nên chọn {{an der Küste}} với {{Dativ}}."
    },
    {
     "type": "gap",
     "text": "Morgen fahren wir ___ Insel.",
     "answers": [
      "auf die"
     ],
     "hint": "auf + die Insel, chỉ đích đến",
     "vi": "Ngày mai chúng mình ra đảo.",
     "explain": "Khi nêu đích đến, nói {{auf die Insel}} với {{Akkusativ}}."
    },
    {
     "type": "gap",
     "text": "Ich möchte einen Mangel ___.",
     "answers": [
      "melden"
     ],
     "hint": "báo, thông báo; động từ ở nguyên mẫu",
     "vi": "Tôi muốn báo một vấn đề.",
     "explain": "Cụm {{einen Mangel melden}} nghĩa là báo một thiếu sót hoặc khiếm khuyết."
    },
    {
     "type": "order",
     "words": [
      "Strand",
      "vom",
      "ihr",
      "Kommt"
     ],
     "answer": "Kommt ihr vom Strand?",
     "answers": [
      "Kommt ihr vom Strand?"
     ],
     "vi": "Các bạn từ bãi biển về à?"
    },
    {
     "type": "order",
     "words": [
      "Wien",
      "du",
      "aus",
      "Kommst"
     ],
     "answer": "Kommst du aus Wien?",
     "answers": [
      "Kommst du aus Wien?"
     ],
     "vi": "Bạn đến từ Vienna à?"
    },
    {
     "type": "order",
     "words": [
      "defekt",
      "sie",
      "Ist"
     ],
     "answer": "Ist sie defekt?",
     "answers": [
      "Ist sie defekt?"
     ],
     "vi": "Nó bị hỏng à?"
    },
    {
     "type": "translate",
     "vi": "Mình vừa từ quầy lễ tân về.",
     "answers": [
      "Ich komme gerade von der Rezeption.",
      "Gerade komme ich von der Rezeption."
     ]
    },
    {
     "type": "translate",
     "vi": "Trong phòng tắm không có nước nóng.",
     "answers": [
      "Im Bad gibt es kein Warmwasser.",
      "Es gibt kein Warmwasser im Bad."
     ]
    },
    {
     "type": "translate",
     "vi": "Anh/chị có thể kiểm tra máy điều hòa giúp tôi không?",
     "answers": [
      "Können Sie bitte die Klimaanlage prüfen?",
      "Könnten Sie bitte die Klimaanlage prüfen?"
     ]
    },
    {
     "type": "listen",
     "de": "Ich komme gerade aus dem Gästehaus und warte hier.",
     "vi": "Mình vừa đi ra từ nhà khách và đang chờ ở đây."
    },
    {
     "type": "listen",
     "de": "Der Duschkopf ist undicht und das Wasser ist kalt.",
     "vi": "Đầu vòi sen bị rò và nước lạnh."
    },
    {
     "type": "speak",
     "de": "Wir sind an der Küste und fahren morgen auf eine Insel.",
     "vi": "Chúng mình ở bờ biển và ngày mai sẽ ra một hòn đảo."
    },
    {
     "type": "speak",
     "de": "Können wir bitte das Zimmer wechseln?",
     "vi": "Chúng tôi có thể đổi phòng được không?"
    },
    {
     "type": "match",
     "pairs": [
      [
       "der Lärm",
       "tiếng ồn"
      ],
      [
       "die Lösung",
       "giải pháp"
      ],
      [
       "die Briefmarke",
       "tem thư"
      ],
      [
       "die Aussicht",
       "quang cảnh"
      ],
      [
       "der Mangel",
       "khiếm khuyết"
      ]
     ]
    },
    {
     "type": "mcq",
     "q": "Chọn cụm phù hợp để kết bưu thiếp gửi một người bạn.",
     "options": [
      "Zimmer zwölf",
      "Liebe Grüße",
      "Vom 14. bis zum 16. Mai",
      "Woher kommen Sie?"
     ],
     "answer": 1,
     "explain": "{{Liebe Grüße}} là lời chào kết thư thân mật."
    }
   ]
  },
  {
   "id": "a2-u08-l4",
   "title": "Wiederholung und Vertiefung",
   "titleVi": "Ôn tập & mở rộng",
   "theory": "> Bài này tổng hợp **cách giải thích thứ hai** cho toàn unit cùng từ vựng mở rộng và bài luyện tập thêm. Học sau khi xong ba bài chính.\n\n## Reiseziele: Wohin? – Wo? – Woher? (nach, in, an, auf, aus, von) – Điểm đến du lịch: Đi đâu? – Ở đâu? – Từ đâu về? (nach, in, an, auf, aus, von)\n\n### 1. Bảng Hệ thống Vàng các Giới từ Địa lý: {{Wohin?}} – {{Wo?}} – {{Woher?}}\n\nMột trong những lỗi phổ biến nhất của người Việt khi nói tiếng Đức là dùng chung một giới từ cho mọi địa điểm (ví dụ nói *\"fahren nach Meer\"* hay *\"fahren nach Schweiz\"* – SAI!). Hãy học thuộc bảng đối chiếu 3 chiều **Đi đâu ({{Wohin?}}) – Ở đâu ({{Wo?}}) – Từ đâu về ({{Woher?}})** dưới đây:\n\n| Loại địa điểm | **1. {{Wohin?}} (Đi tới đâu?)**<br>*(Hướng di chuyển)* | **2. {{Wo?}} (Đang ở đâu?)**<br>*(Vị trí tĩnh + Dativ)* | **3. {{Woher?}} (Từ đâu về?)**<br>*(Điểm xuất phát + Dativ)* |\n| :--- | :--- | :--- | :--- |\n| **A. Thành phố & Quốc gia KHÔNG mạo từ**<br>*(Berlin, Deutschland, Vietnam, Italien)* | **{{nach}}** Berlin<br>**{{nach}}** Vietnam | **{{in}}** Berlin<br>**{{in}}** Vietnam | **{{aus}}** Berlin<br>**{{aus}}** Vietnam |\n| **B. Quốc gia CÓ mạo từ!**<br>- Giống Cái: *die Schweiz, die Türkei*<br>- Số nhiều: *die USA, die Niederlande*<br>- Giống Đực: *der Iran, der Libanon* | **{{in + Akkusativ}}**:<br>**{{in die}}** Schweiz / Türkei<br>**{{in die}}** USA<br>**{{in den}}** Iran | **{{in + Dativ}}**:<br>**{{in der}}** Schweiz / Türkei<br>**{{in den}}** USA<br>**{{im}}** Iran | **{{aus + Dativ}}**:<br>**{{aus der}}** Schweiz / Türkei<br>**{{aus den}}** USA<br>**{{aus dem}}** Iran |\n| **C. Vùng núi & Không gian kín**<br>*(die Berge, die Alpen, das Gebirge, der Wald)* | **{{in + Akkusativ}}**:<br>**{{in die}}** Berge / Alpen<br>**{{in den}}** Wald | **{{in + Dativ}}**:<br>**{{in den}}** Bergen / Alpen<br>**{{im}}** Wald | **{{aus + Dativ}}**:<br>**{{aus den}}** Bergen<br>**{{aus dem}}** Wald |\n| **D. Mặt nước & Bờ biển / Hồ**<br>*(das Meer, der Strand, der See, die Küste, die Ostsee/Nordsee)* | **{{an + Akkusativ}}**:<br>**{{ans}}** (= an das) Meer<br>**{{an den}}** Strand / See<br>**{{an die}}** Ostsee / Küste | **{{an + Dativ}}**:<br>**{{am}}** (= an dem) Meer<br>**{{am}}** Strand / See<br>**{{an der}}** Ostsee / Küste | **{{vom / von der}}**:<br>**{{vom}}** Meer / Strand / See<br>**{{von der}}** Ostsee / Küste |\n| **E. Hòn đảo & Đỉnh núi cao**<br>*(die Insel, Rügen, Phú Quốc, das Land)* | **{{auf + Akkusativ}}**:<br>**{{auf die}}** Insel (Rügen)<br>**{{aufs}}** (= auf das) Land | **{{auf + Dativ}}**:<br>**{{auf der}}** Insel (Rügen)<br>**{{auf dem}}** Land | **{{von + Dativ}}**:<br>**{{von der}}** Insel<br>**{{vom}}** Land |\n\n> **3 Quy tắc sinh tử khi thi A2:**\n> 1. Đi ra biển/hồ luôn dùng **{{an}}** (**{{ans Meer}}**, **{{an den See}}**, **{{an den Strand}}**); đang ở biển là **{{am Meer}}**, **{{am Strand}}**!\n> 2. Đi lên vùng núi luôn dùng **{{in}}** (**{{in die Berge}}**, **{{in die Alpen}}**); đang ở trên núi là **{{in den Bergen}}**!\n> 3. Với Thụy Sĩ ({{die Schweiz}}), Thổ Nhĩ Kỳ ({{die Türkei}}) và Mỹ ({{die USA}}), tuyệt đối không dùng {{nach}}, mà phải dùng **{{in die Schweiz / in der Schweiz}}**!\n\n## Unterkünfte buchen und Probleme im Hotel reklamieren – Đặt chỗ lưu trú và Phàn nàn sự cố trong khách sạn\n\n### 1. Các loại hình lưu trú du lịch phổ biến ở Đức, Áo, Thụy Sĩ ({{Unterkünfte}})\n\nTùy theo ngân sách và hình thức đi du lịch (đi một mình, đi cùng gia đình hay đi phượt), người Đức lựa chọn các loại chỗ ở (**{{die Unterkunft}}**) sau:\n\n1. **{{das Hotel}}**: Khách sạn (từ 1 đến 5 sao), có lễ tân 24/24, dịch vụ dọn phòng và ăn sáng (**{{Frühstücksbuffet}}**) hoặc ăn 2 bữa (**{{Halbpension}}**), ăn 3 bữa (**{{Vollpension}}**).\n2. **{{die Pension}} / {{das Gasthaus}}**: Nhà nghỉ gia đình ấm cúng, giá rẻ hơn khách sạn, thường bao gồm bữa sáng.\n3. **{{die Ferienwohnung}} (viết tắt: {{FeWo}})**: Căn hộ nghỉ dưỡng có đầy đủ nhà bếp riêng để tự nấu ăn – cực kỳ được các gia đình có trẻ nhỏ ở Đức ưa chuộng!\n4. **{{die Jugendherberge}}**: Nhà trọ thanh niên (giường tầng, phòng tập thể hoặc phòng gia đình giá rẻ).\n5. **{{der Campingplatz}}**: Khu cắm trại (dành cho người ngủ lều **{{das Zelt}}** hoặc đi xe nhà lưu động **{{das Wohnmobil}}**).\n\n### 2. Mẫu câu Giao tiếp khi gặp Sự cố và Phàn nàn ở Khách sạn ({{Beschwerden im Hotel}})\n\nKhi phòng nghỉ không đúng như mô tả hoặc thiết bị hỏng, bạn hãy đến quầy lễ tân (**{{an die Rezeption}}**) và trình bày lịch sự bằng các cấu trúc sau:\n\n| Vấn đề thường gặp | Cách nói lịch sự bằng tiếng Đức | Yêu cầu hướng giải quyết |\n| :--- | :--- | :--- |\n| **Thiếu đồ dùng trong phòng** | {{Entschuldigung, in meinem Badezimmer fehlen die Handtücher / gibt es keine Seife.}} | {{Könnten Sie mir bitte frische Handtücher aufs Zimmer schicken?}} |\n| **Thiết bị hỏng** | {{Die Klimaanlage / Die Heizung / Die Dusche / Der Fernseher in Zimmer 204 funktioniert leider nicht.}} | {{Können Sie bitte jemanden schicken, der das repariert?}} |\n| **Phòng ồn hoặc bẩn** | {{Das Zimmer liegt direkt zur Hauptstraße und ist viel zu laut.}}<br>{{Das Bad ist leider nicht sauber.}} | {{Kann ich bitte ein anderes, ruhigeres Zimmer bekommen?}} |\n| **Sai loại phòng đã đặt** | {{Ich hatte ein Zimmer mit Meerblick und Balkon gebucht!}} | {{Können wir bitte in ein Zimmer mit Balkon wechseln?}} |\n\n## Urlaubserlebnisse, Postkarten und Reiseberichte – Trải nghiệm kỳ nghỉ, Viết bưu thiếp và Ký sự du lịch\n\n### 1. Tổng hợp các Giới từ chỉ Phương hướng & Chuyển động trong Du lịch\n\nKhi kể về hành trình di chuyển trong chuyến du lịch, ngoài {{nach}}, {{in}}, {{an}}, {{auf}}, bạn hãy sử dụng thêm các giới từ rất sinh động sau:\n- **{{durch}} (+ Akkusativ):** đi xuyên qua, dạo quanh ({{Wir sind durch die Altstadt / durch den Park spazieren gegangen.}}).\n- **{{über}} (+ Akkusativ):** đi ngang qua quảng trường, qua cầu, hoặc quá cảnh qua một thành phố ({{Der Zug fährt über Frankfurt nach Paris.}}).\n- **{{um ... herum}} (+ Akkusativ):** đi vòng quanh ({{Wir sind mit dem Fahrrad um den See gefahren.}}).\n- **{{entlang}}** (đứng **SAU** danh từ ở Akkusativ!): đi dọc theo ({{Wir sind am Abend den Strand entlanggegangen.}}).\n- **{{ab}} / {{von ... aus}} (+ Dativ):** xuất phát từ đâu ({{Ab München fliegen wir direkt nach Hanoi.}}).\n\n### 2. Cấu trúc một tấm Bưu thiếp / Tin nhắn từ kỳ nghỉ ({{Eine Urlaubspostkarte schreiben}})\n\nViết bưu thiếp ({{die Postkarte}}) hoặc tin nhắn kể về kỳ nghỉ là dạng bài kinh điển của kỳ thi A2:\n\n1. **Mở đầu từ điểm du lịch:**\n   - {{Liebe Anna, lieber Lukas,}} / {{Hallo ihr Lieben,}}\n   - {{herzliche / sonnige Grüße aus Italien / von der Insel Rügen / vom Bodensee!}} (Gửi những lời chào thân ái / đầy nắng từ nước Ý / từ đảo Rügen / từ hồ Bodensee!)\n2. **Nội dung chính (Kể thời tiết, chỗ ở, hoạt động đã làm ở Perfekt & kế hoạch ngày mai):**\n   - {{Wir sind seit vier Tagen hier am Meer und wohnen in einer tollen Ferienwohnung direkt am Strand.}}\n   - {{Das Wetter ist traumhaft: Die Sonne scheint jeden Tag bei 28 Grad!}}\n   - {{Gestern haben wir eine Bootstour gemacht und die alte Burg besichtigt. Morgen wollen wir Fahrräder mieten.}}\n3. **Kết thúc:**\n   - {{Schade, dass ihr nicht dabei seid! Bis nächste Woche!}}\n   - {{Liebe Grüße, eure Mai}}",
   "vocab": [
    {
     "de": "Ostsee",
     "article": "die",
     "plural": "–",
     "pos": "noun",
     "ipa": "ˈɔstˌzeː",
     "vi": "Biển Đông của Đức (Biển Baltic)",
     "example": "Im Juli fahren viele Familien aus Berlin an die Ostsee.",
     "exampleVi": "Vào tháng Bảy nhiều gia đình từ Berlin đi nghỉ ở vùng Biển Baltic."
    },
    {
     "de": "Nordsee",
     "article": "die",
     "plural": "–",
     "pos": "noun",
     "ipa": "ˈnɔʁtˌzeː",
     "vi": "Biển Bắc",
     "example": "An der Nordsee ist der Wind oft stärker als an der Ostsee.",
     "exampleVi": "Ở Biển Bắc gió thường mạnh hơn ở Biển Baltic."
    },
    {
     "de": "Alpen",
     "article": "die",
     "plural": "Alpen",
     "pos": "noun",
     "ipa": "ˈalpn̩",
     "vi": "dãy núi Alps (chỉ dùng ở số nhiều: in die Alpen / in den Alpen)",
     "example": "Im Winter fahren wir zum Skifahren in die Alpen.",
     "exampleVi": "Vào mùa đông chúng tôi đi lên dãy núi Alps để trượt tuyết."
    },
    {
     "de": "Wald",
     "article": "der",
     "plural": "Wälder",
     "pos": "noun",
     "ipa": "valt",
     "vi": "khu rừng (in den Wald / im Wald)",
     "example": "Am Sonntag machen wir einen langen Spaziergang im Wald.",
     "exampleVi": "Vào Chủ Nhật chúng tôi đi dạo bộ một quãng dài trong rừng."
    },
    {
     "de": "Schweiz",
     "article": "die",
     "plural": "–",
     "pos": "noun",
     "ipa": "ʃvaɪ̯ts",
     "vi": "nước Thụy Sĩ (luôn có mạo từ die: in die Schweiz / in der Schweiz)",
     "example": "Meine Tante lebt seit zehn Jahren in der Schweiz.",
     "exampleVi": "Dì của tôi sống ở Thụy Sĩ được mười năm rồi."
    },
    {
     "de": "Türkei",
     "article": "die",
     "plural": "–",
     "pos": "noun",
     "ipa": "tʏʁˈkaɪ̯",
     "vi": "nước Thổ Nhĩ Kỳ (luôn có mạo từ die: in die Türkei / in der Türkei)",
     "example": "Nächsten Herbst fliegen wir für zwei Wochen in die Türkei.",
     "exampleVi": "Mùa thu tới chúng tôi sẽ bay sang Thổ Nhĩ Kỳ trong hai tuần."
    },
    {
     "de": "Ausland",
     "article": "das",
     "plural": "–",
     "pos": "noun",
     "ipa": "ˈaʊ̯sˌlant",
     "vi": "nước ngoài (ins Ausland reisen = đi ra nước ngoài; im Ausland = ở nước ngoài)",
     "example": "Möchtest du später einmal im Ausland arbeiten?",
     "exampleVi": "Sau này bạn có muốn làm việc ở nước ngoài một thời gian không?"
    },
    {
     "de": "Reisepass",
     "article": "der",
     "plural": "Reisepässe",
     "pos": "noun",
     "ipa": "ˈʁaɪ̯zəˌpas",
     "vi": "hộ chiếu",
     "example": "Für eine Reise außerhalb der Europäischen Union brauchst du deinen Reisepass.",
     "exampleVi": "Cho một chuyến đi ra ngoài Liên minh Châu Âu bạn cần có hộ chiếu của mình."
    },
    {
     "de": "Visum",
     "article": "das",
     "plural": "Visa",
     "pos": "noun",
     "ipa": "ˈviːzʊm",
     "vi": "thị thực nhập cảnh (visa)",
     "example": "Braucht man für den Urlaub in diesem Land ein Visum?",
     "exampleVi": "Người ta có cần thị thực cho kỳ nghỉ ở đất nước này không?"
    },
    {
     "de": "Kultur",
     "article": "die",
     "plural": "Kulturen",
     "pos": "noun",
     "ipa": "kʊlˈtuːɐ̯",
     "vi": "văn hóa",
     "example": "Auf meinen Reisen lerne ich gern fremde Kulturen kennen.",
     "exampleVi": "Trong những chuyến đi của mình tôi thích tìm hiểu các nền văn hóa mới lạ."
    },
    {
     "de": "Landschaft",
     "article": "die",
     "plural": "Landschaften",
     "pos": "noun",
     "ipa": "ˈlantˌʃaft",
     "vi": "phong cảnh, cảnh quan thiên nhiên",
     "example": "Die Landschaft in den Bergen von Ha Giang ist atemberaubend.",
     "exampleVi": "Phong cảnh vùng núi Hà Giang đẹp ngoạn mục."
    },
    {
     "de": "planen",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "plant, plante, hat geplant",
     "ipa": "ˈplaːnən",
     "vi": "lên kế hoạch (+ Akk)",
     "example": "Wir planen schon jetzt unseren nächsten Sommerurlaub.",
     "exampleVi": "Ngay từ bây giờ chúng tôi đã lên kế hoạch cho kỳ nghỉ hè tới của mình."
    },
    {
     "de": "baden",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "badet, badete, hat gebadet",
     "ipa": "ˈbaːdn̩",
     "vi": "tắm (tắm biển, tắm hồ hoặc tắm bồn)",
     "example": "Die Kinder baden bei dem heißen Wetter den ganzen Tag im Meer.",
     "exampleVi": "Trời nóng bọn trẻ tắm biển suốt cả ngày."
    },
    {
     "de": "zelten",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "zeltet, zeltete, hat gezeltet",
     "ipa": "ˈtsɛltn̩",
     "vi": "cắm trại, ngủ lều",
     "example": "Als Studenten haben wir im Sommer oft am See gezeltet.",
     "exampleVi": "Hồi còn là sinh viên vào mùa hè chúng tôi thường cắm trại bên hồ."
    },
    {
     "de": "beliebt",
     "article": null,
     "plural": null,
     "pos": "adj",
     "ipa": "bəˈliːpt",
     "vi": "được yêu thích, phổ biến (bei + Dat)",
     "example": "Die Insel Mallorca ist bei deutschen Touristen sehr beliebt.",
     "exampleVi": "Hòn đảo Mallorca rất được du khách Đức yêu thích."
    },
    {
     "de": "Zelt",
     "article": "das",
     "plural": "Zelte",
     "pos": "noun",
     "ipa": "tsɛlt",
     "vi": "cái lều cắm trại",
     "example": "Bei dem starken Wind war es nicht einfach, das Zelt aufzubauen.",
     "exampleVi": "Dưới cơn gió mạnh, việc dựng lều không hề dễ dàng."
    },
    {
     "de": "Dusche",
     "article": "die",
     "plural": "Duschen",
     "pos": "noun",
     "ipa": "ˈduːʃə",
     "vi": "vòi hoa sen, buồng tắm đứng",
     "example": "In der Dusche gibt es heute Morgen leider kein warmes Wasser!",
     "exampleVi": "Sáng nay ở vòi tắm hoa sen tiếc là không có nước nóng!"
    },
    {
     "de": "Blick",
     "article": "der",
     "plural": "Blicke",
     "pos": "noun",
     "ipa": "blɪk",
     "vi": "tầm nhìn (der Meerblick = tầm nhìn hướng biển)",
     "example": "Von unserem Balkon haben wir einen herrlichen Blick auf das Meer.",
     "exampleVi": "Từ ban công của mình chúng tôi có một tầm nhìn tuyệt đẹp ra biển."
    },
    {
     "de": "Vollpension",
     "article": "die",
     "plural": "–",
     "pos": "noun",
     "ipa": "ˈfɔlpɑ̃ˌzjoːn",
     "vi": "chế độ bao ăn trọn 3 bữa (sáng, trưa, tối) tại khách sạn",
     "example": "Im Familienhotel haben wir Vollpension mit allen Getränken gebucht.",
     "exampleVi": "Tại khách sạn gia đình chúng tôi đã đặt chế độ ăn trọn ba bữa kèm mọi đồ uống."
    },
    {
     "de": "Empfang",
     "article": "der",
     "plural": "Empfänge",
     "pos": "noun",
     "ipa": "ɛmˈpfaŋ",
     "vi": "quầy tiếp tân (khách sạn); sóng (điện thoại, Wi-Fi)",
     "example": "In unserem Zimmer im dritten Stock haben wir leider keinen WLAN-Empfang.",
     "exampleVi": "Trong phòng của chúng tôi ở tầng ba tiếc là không bắt được sóng Wi-Fi."
    },
    {
     "de": "fehlen",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "fehlt, fehlte, hat gefehlt",
     "ipa": "ˈfeːlən",
     "vi": "thiếu, vắng mặt",
     "example": "Im Badezimmer fehlen noch zwei große Handtücher und der Föhn.",
     "exampleVi": "Trong phòng tắm vẫn còn thiếu hai chiếc khăn tắm lớn và máy sấy tóc."
    },
    {
     "de": "funktionieren",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "funktioniert, funktionierte, hat funktioniert",
     "ipa": "fʊŋktsi̯oˈniːʁən",
     "vi": "hoạt động, vận hành (máy móc, thiết bị)",
     "example": "Die Zimmerkarte funktioniert nicht, ich kann die Tür nicht öffnen.",
     "exampleVi": "Thẻ từ mở phòng không hoạt động, tôi không thể mở cửa được."
    },
    {
     "de": "stornieren",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "storniert, stornierte, hat storniert",
     "ipa": "ʃtɔʁˈniːʁən",
     "vi": "hủy đặt chỗ (phòng khách sạn, vé máy bay) (+ Akk)",
     "example": "Bis vierundzwanzig Stunden vor der Anreise können Sie das Zimmer kostenlos stornieren.",
     "exampleVi": "Trước giờ nhận phòng hai mươi tư tiếng Ngài có thể hủy đặt phòng miễn phí."
    },
    {
     "de": "Erlebnis",
     "article": "das",
     "plural": "Erlebnisse",
     "pos": "noun",
     "ipa": "ɛɐ̯ˈleːpnɪs",
     "vi": "trải nghiệm, kỷ niệm đáng nhớ",
     "example": "Die Bootsfahrt durch die Ha-Long-Bucht war ein unvergessliches Erlebnis.",
     "exampleVi": "Chuyến đi thuyền xuyên qua Vịnh Hạ Long là một trải nghiệm không thể nào quên."
    },
    {
     "de": "Altstadt",
     "article": "die",
     "plural": "Altstädte",
     "pos": "noun",
     "ipa": "ˈaltˌʃtat",
     "vi": "khu phố cổ",
     "example": "Am Nachmittag sind wir durch die historische Altstadt gebummelt.",
     "exampleVi": "Vào buổi chiều chúng tôi đã dạo bước qua khu phố cổ lịch sử."
    },
    {
     "de": "Schloss",
     "article": "das",
     "plural": "Schlösser",
     "pos": "noun",
     "ipa": "ʃlɔs",
     "vi": "lâu đài, cung điện",
     "example": "Jedes Jahr besuchen über eine Million Touristen das Schloss Neuschwanstein.",
     "exampleVi": "Mỗi năm có hơn một triệu du khách ghé thăm lâu đài Neuschwanstein."
    },
    {
     "de": "Burg",
     "article": "die",
     "plural": "Burgen",
     "pos": "noun",
     "ipa": "bʊʁk",
     "vi": "thành cổ, pháo đài trên núi",
     "example": "Von der alten Burg oben auf dem Berg hat man eine tolle Aussicht.",
     "exampleVi": "Từ tòa thành cổ trên đỉnh núi người ta có một tầm nhìn tuyệt đẹp."
    },
    {
     "de": "Führung",
     "article": "die",
     "plural": "Führungen",
     "pos": "noun",
     "ipa": "ˈfyːʁʊŋ",
     "vi": "chuyến tham quan có hướng dẫn viên thuyết minh",
     "example": "Um elf Uhr beginnt eine interessante Führung durch das Museum.",
     "exampleVi": "Lúc mười một giờ bắt đầu một chuyến tham quan có thuyết minh thú vị qua viện bảo tàng."
    },
    {
     "de": "Reiseführer",
     "article": "der",
     "plural": "Reiseführer",
     "pos": "noun",
     "ipa": "ˈʁaɪ̯zəˌfyːʁɐ",
     "vi": "cuốn sách cẩm nang du lịch; người hướng dẫn viên du lịch (nam)",
     "example": "Vor dem Urlaub kaufe ich mir immer einen guten Reiseführer als Buch.",
     "exampleVi": "Trước kỳ nghỉ tôi luôn mua cho mình một cuốn cẩm nang du lịch hay."
    },
    {
     "de": "Boot",
     "article": "das",
     "plural": "Boote",
     "pos": "noun",
     "ipa": "boːt",
     "vi": "chiếc thuyền, ca-nô",
     "example": "Am Nachmittag haben wir am See ein kleines Ruderboot gemietet.",
     "exampleVi": "Vào buổi chiều chúng tôi đã thuê một chiếc thuyền chèo nhỏ ở hồ."
    },
    {
     "de": "Schiff",
     "article": "das",
     "plural": "Schiffe",
     "pos": "noun",
     "ipa": "ʃɪf",
     "vi": "con tàu thủy, du thuyền lớn",
     "example": "Wir haben eine romantische Fahrt mit dem Schiff auf dem Rhein gemacht.",
     "exampleVi": "Chúng tôi đã thực hiện một chuyến đi lãng mạn bằng tàu thủy trên sông Rhein."
    },
    {
     "de": "Sonnenuntergang",
     "article": "der",
     "plural": "Sonnenuntergänge",
     "pos": "noun",
     "ipa": "ˈzɔnənˌʔʊntɐɡaŋ",
     "vi": "cảnh hoàng hôn (mặt trời lặn)",
     "example": "Am Abend haben wir am Strand den roten Sonnenuntergang fotografiert.",
     "exampleVi": "Vào buổi tối chúng tôi đã chụp ảnh cảnh hoàng hôn đỏ rực trên bãi biển."
    },
    {
     "de": "Stau",
     "article": "der",
     "plural": "Staus",
     "pos": "noun",
     "ipa": "ʃtaʊ̯",
     "vi": "cảnh tắc đường, kẹt xe (im Stau stehen = bị kẹt xe)",
     "example": "Auf der Rückfahrt standen wir drei Stunden im Stau auf der Autobahn.",
     "exampleVi": "Trên chuyến đi về chúng tôi đã bị kẹt xe ba tiếng đồng hồ trên đường cao tốc."
    },
    {
     "de": "Panne",
     "article": "die",
     "plural": "Pannen",
     "pos": "noun",
     "ipa": "ˈpanə",
     "vi": "sự cố hỏng xe giữa đường (eine Autopanne haben)",
     "example": "Kurz vor München hatten wir leider eine Autopanne.",
     "exampleVi": "Ngay trước khi tới München tiếc là chúng tôi bị hỏng xe giữa đường."
    },
    {
     "de": "genießen",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "genießt, genoss, hat genossen",
     "ipa": "ɡəˈniːsn̩",
     "vi": "tận hưởng, thưởng thức (+ Akk) (Partizip II: genossen)",
     "example": "Wir sitzen im Straßencafé und genießen die warme Frühlingssonne.",
     "exampleVi": "Chúng tôi ngồi ở quán cà phê vỉa hè và tận hưởng nắng xuân ấm áp."
    },
    {
     "de": "bummeln",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "bummelt, bummelte, ist gebummelt",
     "ipa": "ˈbʊml̩n",
     "vi": "đi dạo thong dong ngắm phố phường / cửa hàng (trợ động từ: sein)",
     "example": "Wir sind stundenlang gemütlich durch die kleinen Gassen gebummelt.",
     "exampleVi": "Chúng tôi đã thong dong dạo bước hàng giờ qua những con ngõ nhỏ."
    },
    {
     "de": "sich sonnen",
     "article": null,
     "plural": null,
     "pos": "verb",
     "forms": "sonnt sich, sonnte sich, hat sich gesonnt",
     "ipa": "zɪç ˈzɔnən",
     "vi": "tắm nắng",
     "example": "Meine Schwester sonnt sich den ganzen Nachmittag am Hotelpool.",
     "exampleVi": "Chị gái tôi tắm nắng suốt cả buổi chiều bên hồ bơi khách sạn."
    },
    {
     "de": "traumhaft",
     "article": null,
     "plural": null,
     "pos": "adj",
     "ipa": "ˈtʁaʊ̯mhaft",
     "vi": "đẹp như mơ, tuyệt diệu",
     "example": "Das Wetter und das Essen hier auf der Insel sind einfach traumhaft!",
     "exampleVi": "Thời tiết và đồ ăn ở đây trên hòn đảo này đơn giản là đẹp như mơ!"
    },
    {
     "de": "durch",
     "article": null,
     "plural": null,
     "pos": "prep",
     "ipa": "dʊʁç",
     "vi": "xuyên qua, đi dọc qua (+ Akkusativ)",
     "example": "Wir machen eine Führung durch das alte Schloss.",
     "exampleVi": "Chúng tôi tham gia một chuyến tham quan có thuyết minh đi qua tòa lâu đài cổ."
    }
   ],
   "dialogue": [
    {
     "speaker": "A",
     "name": "Rezeptionistin",
     "de": "Guten Abend! Kann ich Ihnen helfen?",
     "vi": "Chào buổi tối! Tôi có thể giúp gì cho anh ạ?"
    },
    {
     "speaker": "B",
     "name": "Minh",
     "de": "Guten Abend! Meine Frau und ich sind vor einer halben Stunde in Zimmer 308 eingezogen, aber leider gibt es dort gleich mehrere Probleme.",
     "vi": "Chào buổi tối! Vợ tôi và tôi vừa nhận phòng 308 cách đây nửa tiếng, nhưng tiếc là ở đó có liền một vài vấn đề."
    },
    {
     "speaker": "A",
     "name": "Rezeptionistin",
     "de": "Oh, das tut mir sehr leid zu hören! Was ist denn in Zimmer 308 nicht in Ordnung?",
     "vi": "Ồ, tôi rất lấy làm tiếc khi nghe vậy! Ở phòng 308 có chuyện gì không ổn thế ạ?"
    },
    {
     "speaker": "B",
     "name": "Minh",
     "de": "Erstens funktioniert die Klimaanlage überhaupt nicht, und es ist im Zimmer furchtbar heiß. Zweitens gibt es in der Dusche kein warmes Wasser und es fehlen die Handtücher!",
     "vi": "Thứ nhất là máy điều hòa nhiệt độ hoàn toàn không hoạt động và trong phòng nóng kinh khủng. Thứ hai là ở vòi sen không có nước nóng và còn bị thiếu khăn tắm nữa!"
    },
    {
     "speaker": "A",
     "name": "Rezeptionistin",
     "de": "Das darf natürlich nicht passieren! Ich entschuldige mich vielmals bei Ihnen! Ich kann sofort unseren Haustechniker und das Zimmermädchen in den dritten Stock schicken.",
     "vi": "Chuyện này tất nhiên không được phép xảy ra rồi! Tôi thành thật xin lỗi anh chị! Tôi có thể cử ngay nhân viên kỹ thuật và nhân viên buồng phòng lên tầng ba."
    },
    {
     "speaker": "B",
     "name": "Minh",
     "de": "Es gibt noch ein drittes Problem: Wir hatten online ein ruhiges Doppelzimmer mit Meerblick gebucht. Aber unser Zimmer liegt direkt über der Straße und man hört den ganzen Verkehrslärm!",
     "vi": "Còn có một vấn đề thứ ba nữa: Chúng tôi đã đặt trực tuyến một phòng đôi yên tĩnh có tầm nhìn hướng biển. Nhưng phòng của chúng tôi lại nằm ngay phía trên đường phố và nghe rõ toàn bộ tiếng ồn giao thông!"
    },
    {
     "speaker": "A",
     "name": "Rezeptionistin",
     "de": "Moment, ich prüfe sofort Ihre Buchung im Computer ... Sie haben völlig recht, Herr Tran! Da ist uns ein Fehler passiert. Wissen Sie was? Sie können sofort in Zimmer 412 im vierten Stock wechseln!",
     "vi": "Đợi chút, tôi kiểm tra ngay đơn đặt phòng của anh trên máy tính ... Anh hoàn toàn đúng, anh Trần! Chúng tôi đã có sự nhầm lẫn ở đây. Anh biết không? Anh chị có thể chuyển ngay sang phòng 412 ở tầng bốn!"
    },
    {
     "speaker": "B",
     "name": "Minh",
     "de": "Liegt Zimmer 412 denn auf der ruhigen Seite zum Meer?",
     "vi": "Phòng 412 có nằm ở phía yên tĩnh quay ra biển không chị?"
    },
    {
     "speaker": "A",
     "name": "Rezeptionistin",
     "de": "Ja, es hat einen großen Balkon mit direktem Meerblick, und die Klimaanlage dort funktioniert einwandfrei. Hier ist Ihre neue Zimmerkarte!",
     "vi": "Dạ có, phòng đó có một ban công lớn nhìn thẳng ra biển, và máy điều hòa ở đó hoạt động hoàn hảo. Đây là thẻ phòng mới của anh chị!"
    }
   ],
   "reading": {
    "title": "Zwei Urlaubspostkarten: Sonnige Grüße und ein Pechtag",
    "text": "POSTKARTE 1 – Von Mai und Lukas aus Griechenland:\nLiebe Sarah, lieber Tobias,\nsonnige Grüße von der griechischen Insel Kreta! Wir sind am Montagabend nach einem ruhigen Flug gut hier angekommen. Unsere kleine Ferienwohnung liegt direkt an der Küste, nur hundert Meter vom Strand entfernt. Wenn wir morgens aufwachen, hören wir das Meer und genießen beim Frühstück auf der Terrasse die traumhafte Aussicht! Das Wetter ist herrlich: Es ist jeden Tag sonnig bei 29 Grad. Gestern sind wir durch ein altes Fischerdorf gebummelt und haben am Hafen frischen gegrillten Fisch gegessen. Morgen wollen wir ein kleines Boot mieten. Schade, dass ihr nicht dabei seid!\nBis nächste Woche, eure Mai & euer Lukas\n\nPOSTKARTE 2 – Von Familie Becker aus den bayerischen Alpen:\nHallo liebe Nachbarn,\nviele Grüße aus unserem Wanderurlaub in den Alpen! Leider hatten wir bis jetzt nicht viel Glück mit dem Wetter und mit unserem Hotel. Schon auf der Hinfahrt am Samstag standen wir vier Stunden bei München im Stau. Als wir im Hotel angekommen sind, hat es in Strömen geregnet, und seit drei Tagen ist es hier kalt und neblig (nur 9 Grad!). Außerdem lag unser erstes Zimmer direkt neben dem Aufzug und war viel zu laut. Gestern haben wir uns an der Rezeption beschwert und das Zimmer gewechselt. Heute Nachmittag machen wir wenigstens eine Führung durch ein berühmtes Schloss in der Nähe. Wir hoffen sehr, dass morgen endlich die Sonne scheint!\nHerzliche Grüße, Thomas und Petra Becker",
    "vi": "Hai tấm bưu thiếp du lịch: Lời chào đầy nắng và một kỳ nghỉ kém may mắn\n\nBƯU THIẾP 1 – Từ Mai và Lukas gửi từ Hy Lạp:\nSarah và Tobias thân mến,\nGửi lời chào đầy nắng từ hòn đảo Crete của Hy Lạp! Bọn mình đã đến đây an toàn vào tối thứ Hai sau một chuyến bay êm ả. Căn hộ nghỉ dưỡng nhỏ của bọn mình nằm ngay sát bờ biển, chỉ cách bãi biển một trăm mét. Mỗi sáng khi thức dậy, bọn mình nghe thấy tiếng sóng biển và tận hưởng tầm nhìn đẹp như mơ khi ăn sáng ngoài sân hiên! Thời tiết tuyệt diệu: Ngày nào trời cũng nắng ở mức 29 độ. Hôm qua bọn mình đã đi dạo thong dong qua một làng chài cổ và ăn cá nướng tươi ở bến cảng. Ngày mai bọn mình muốn thuê một chiếc thuyền nhỏ. Tiếc là các cậu không có mặt ở đây cùng!\nHẹn gặp tuần tới nhé, Mai & Lukas của các cậu\n\nBƯU THIẾP 2 – Từ Gia đình Becker gửi từ dãy núi Alps bang Bayern:\nXin chào những người hàng xóm thân mến,\nGửi nhiều lời chào từ kỳ nghỉ đi bộ leo núi trên dãy Alps của chúng tôi! Tiếc là cho đến giờ chúng tôi không gặp nhiều may mắn với thời tiết cũng như với khách sạn của mình. Ngay trên đường đi vào hôm thứ Bảy, chúng tôi đã bị kẹt xe bốn tiếng đồng hồ ở gần München. Khi chúng tôi đến khách sạn thì trời mưa như trút nước, và ba ngày nay ở đây trời lạnh và mù sương (chỉ 9 độ!). Ngoài ra căn phòng đầu tiên của chúng tôi nằm ngay cạnh thang máy và quá ồn ào. Hôm qua chúng tôi đã phàn nàn ở quầy lễ tân và đổi phòng. Chiều nay ít nhất chúng tôi cũng tham gia một chuyến tham quan có thuyết minh qua một tòa lâu đài nổi tiếng ở gần đây. Chúng tôi rất hy vọng rằng ngày mai mặt trời cuối cùng cũng sẽ chiếu sáng!\nThân mến, Thomas và Petra Becker",
    "questions": [
     {
      "q": "Wo übernachten Mai und Lukas während ihres Urlaubs auf der Insel Kreta?",
      "options": [
       "In einem Zelt auf einem Campingplatz.",
       "In einer kleinen Ferienwohnung direkt an der Küste, hundert Meter vom Strand entfernt.",
       "In einem großen Fünf-Sterne-Hotel in den Bergen."
      ],
      "answer": 1
     },
     {
      "q": "Welche Probleme hatte Familie Becker in den Alpen?",
      "options": [
       "Sie standen vier Stunden im Stau, es regnet und ist kalt, und ihr erstes Zimmer neben dem Aufzug war zu laut.",
       "Sie haben ihre Reisepässe am Flughafen verloren.",
       "Das Essen im Fischerdorf war zu salzig."
      ],
      "answer": 0
     },
     {
      "q": "Was macht Familie Becker heute Nachmittag trotz des schlechten Wetters?",
      "options": [
       "Sie mieten ein Boot auf dem Meer.",
       "Sie fahren sofort wieder nach Hause zurück.",
       "Sie machen eine Führung durch ein berühmtes Schloss in der Nähe."
      ],
      "answer": 2
     }
    ],
    "glossary": []
   },
   "writing": {
    "task": "Sie machen gerade eine Woche Urlaub (z. B. auf der Insel Phú Quốc am Meer oder in Đà Lạt in den Bergen). Schreiben Sie eine Postkarte oder Nachricht (ca. 50–65 Wörter) an Ihre deutsche Freundin Anna:\n- Wo sind Sie genau (am Meer / auf einer Insel / in den Bergen) und in welcher Unterkunft wohnen Sie?\n- Wie ist das Wetter?\n- Was haben Sie gestern gemacht (im Perfekt) und was wollen Sie morgen machen?\n\n(Bạn đang đi nghỉ mát một tuần, ví dụ trên đảo Phú Quốc ngoài biển hoặc ở Đà Lạt trên núi. Hãy viết một tấm bưu thiếp hoặc tin nhắn khoảng 50–65 từ gửi cho người bạn Đức tên là Anna: nói rõ bạn đang ở đâu và nghỉ tại loại hình lưu trú nào, thời tiết ra sao, hôm qua bạn đã làm gì [dùng thì Perfekt] và ngày mai bạn muốn làm gì.)",
    "minWords": 50,
    "sample": "Liebe Anna,\n\nsonnige Grüße von der wunderschönen Insel Phú Quoc im Süden von Vietnam! Ich bin seit drei Tagen hier am Meer und übernachte mit meiner Familie in einer gemütlichen Ferienwohnung direkt am Strand. Das Wetter ist traumhaft: Die Sonne scheint jeden Tag bei dreißig Grad! Gestern haben wir eine Bootstour gemacht, sind im warmen Meer geschwommen und haben den Sonnenuntergang fotografiert. Morgen wollen wir über den Nachtmarkt bummeln.\n\nLiebe Grüße\nDein Minh"
   },
   "exercises": [
    {
     "type": "mcq",
     "q": "Chọn giới từ đúng để điền vào hai câu: „Wohin fahrt ihr im Sommer? – Wir fahren ___ Meer. Wir verbringen zwei Wochen ___ Meer.“",
     "options": [
      "nach ... im",
      "aufs ... auf dem",
      "ins ... im",
      "ans ... am"
     ],
     "answer": 3,
     "explain": "Với „das Meer“ (biển) và các vùng mặt nước: khi di chuyển tới (Wohin?) dùng „an + Akkusativ“ = „ans Meer“ (an das Meer); khi đang ở đó (Wo?) dùng „an + Dativ“ = „am Meer“ (an dem Meer)."
    },
    {
     "type": "mcq",
     "q": "Chọn giới từ đúng với tên quốc gia có mạo từ „die Schweiz“ (Thụy Sĩ): „Im Winter reisen wir ___ Schweiz, weil unsere Freunde ___ Schweiz wohnen.“",
     "options": [
      "an die ... an der",
      "in die ... in der",
      "nach ... in",
      "in der ... in die"
     ],
     "answer": 1,
     "explain": "„die Schweiz“ là quốc gia giống Cái luôn dùng kèm mạo từ: Đi tới đâu (Wohin? + Akkusativ) → „in die Schweiz“; Sống ở đâu (Wo? + Dativ) → „in der Schweiz“."
    },
    {
     "type": "mcq",
     "q": "Khi muốn nói „đi lên vùng núi / lên dãy Alps“ (Wohin?) và „đi bộ leo núi ở trên núi“ (Wo?), ta dùng cụm giới từ nào?",
     "options": [
      "an die Berge / an den Bergen",
      "in die Berge / in den Bergen",
      "auf die Berge / auf den Bergen",
      "nach Berge / bei Bergen"
     ],
     "answer": 1,
     "explain": "Với dãy núi số nhiều („die Berge“, „die Alpen“), tiếng Đức luôn dùng giới từ „in“: Wohin? → „in die Berge“ (Akkusativ); Wo? → „in den Bergen“ (Dativ số nhiều thêm -n)."
    },
    {
     "type": "mcq",
     "q": "Khi muốn nói „bay ra một hòn đảo“ (Wohin? – die Insel) và „nghỉ mát ở trên đảo“ (Wo?), ta dùng giới từ nào?",
     "options": [
      "auf die Insel / auf der Insel",
      "an die Insel / an der Insel",
      "nach die Insel / bei der Insel",
      "in die Insel / in der Insel"
     ],
     "answer": 0,
     "explain": "Với hòn đảo („die Insel“), tiếng Đức dùng giới từ „auf“: Wohin? → „auf die Insel“ (Akkusativ); Wo? → „auf der Insel“ (Dativ)."
    },
    {
     "type": "gap",
     "text": "Jeden Morgen liegen die Touristen ___ Strand und baden ___ Meer.",
     "answers": [
      "am",
      "im"
     ],
     "hint": "trên bãi biển (an dem) ... trong làn nước biển (in dem)",
     "vi": "Mỗi sáng các du khách nằm trên bãi biển và tắm trong làn nước biển.",
     "explain": "Nằm trên bãi biển (Wo?) là „am Strand“; còn bơi/tắm ở bên trong làn nước biển là „im Meer“."
    },
    {
     "type": "gap",
     "text": "Letztes Jahr sind wir ___ die Türkei geflogen, aber dieses Jahr fahren wir ___ Italien.",
     "answers": [
      "in",
      "nach"
     ],
     "hint": "Giới từ trước die Türkei và trước Italien",
     "vi": "Năm ngoái chúng tôi đã bay sang Thổ Nhĩ Kỳ, nhưng năm nay chúng tôi đi tới nước Ý.",
     "explain": "„die Türkei“ có mạo từ giống Cái nên dùng „in die Türkei“; còn „Italien“ không có mạo từ nên dùng „nach Italien“."
    },
    {
     "type": "gap",
     "text": "Für eine Reise ___ Ausland außerhalb von Europa braucht man einen gültigen ___ und oft ein Visum.",
     "answers": [
      "ins",
      "Reisepass"
     ],
     "hint": "in + das Ausland ... hộ chiếu",
     "vi": "Cho một chuyến đi ra nước ngoài bên ngoài Châu Âu người ta cần một cuốn hộ chiếu còn hạn và thường cần cả thị thực.",
     "explain": "Đi ra nước ngoài (Wohin?) là „ins Ausland“ (= in das Ausland); hộ chiếu là „der Reisepass“."
    },
    {
     "type": "gap",
     "text": "Im Juli fahren viele Berliner an ___ Ostsee oder an ___ Bodensee.",
     "answers": [
      "die",
      "den"
     ],
     "hint": "die Ostsee, der Bodensee (Wohin? + Akkusativ)",
     "vi": "Vào tháng Bảy nhiều người dân Berlin đi ra Biển Baltic hoặc ra hồ Bodensee.",
     "explain": "Sau „an“ (Wohin? + Akkusativ): „die Ostsee“ (Cái) → „an die Ostsee“; „der Bodensee“ (Đực) → „an den Bodensee“."
    },
    {
     "type": "order",
     "words": [
      "fahren",
      "im",
      "Wir",
      "Sommer",
      "ans",
      "Meer"
     ],
     "answer": "Wir fahren im Sommer ans Meer.",
     "answers": [
      "Wir fahren im Sommer ans Meer.",
      "Im Sommer fahren wir ans Meer.",
      "Ans Meer fahren wir im Sommer."
     ],
     "vi": "Vào mùa hè chúng tôi đi ra biển."
    },
    {
     "type": "order",
     "words": [
      "lebt",
      "seit",
      "Meine",
      "Tante",
      "fünf",
      "Jahren",
      "in",
      "der",
      "Schweiz"
     ],
     "answer": "Meine Tante lebt seit fünf Jahren in der Schweiz.",
     "answers": [
      "Meine Tante lebt seit fünf Jahren in der Schweiz.",
      "Seit fünf Jahren lebt meine Tante in der Schweiz.",
      "In der Schweiz lebt meine Tante seit fünf Jahren."
     ],
     "vi": "Dì của tôi sống ở Thụy Sĩ được năm năm rồi."
    },
    {
     "type": "order",
     "words": [
      "wandern",
      "in",
      "Wir",
      "gern",
      "den",
      "Bergen"
     ],
     "answer": "Wir wandern gern in den Bergen.",
     "answers": [
      "Wir wandern gern in den Bergen.",
      "In den Bergen wandern wir gern.",
      "Gern wandern wir in den Bergen."
     ],
     "vi": "Chúng tôi thích đi bộ đường dài ở trên núi."
    },
    {
     "type": "translate",
     "vi": "Vào mùa đông chúng tôi đi lên dãy núi Alps.",
     "answers": [
      "Im Winter fahren wir in die Alpen.",
      "Wir fahren im Winter in die Alpen."
     ]
    },
    {
     "type": "translate",
     "vi": "Năm ngoái chúng tôi đã ở trên một hòn đảo.",
     "answers": [
      "Letztes Jahr waren wir auf einer Insel.",
      "Wir waren letztes Jahr auf einer Insel."
     ]
    },
    {
     "type": "listen",
     "de": "Auf meinen Reisen ins Ausland lerne ich gern neue Kulturen kennen.",
     "vi": "Trong những chuyến đi ra nước ngoài tôi thích làm quen với những nền văn hóa mới."
    },
    {
     "type": "listen",
     "de": "Die Landschaft an der Küste von Zentralvietnam ist wunderschön.",
     "vi": "Phong cảnh ở vùng bờ biển miền Trung Việt Nam đẹp tuyệt vời."
    },
    {
     "type": "speak",
     "de": "Fliegst du diesen Sommer in die Türkei oder fährst du an die Ostsee?",
     "vi": "Mùa hè này bạn bay sang Thổ Nhĩ Kỳ hay đi ra Biển Baltic?"
    },
    {
     "type": "speak",
     "de": "Bei schönem Wetter liegen wir am Strand und baden im Meer.",
     "vi": "Khi thời tiết đẹp chúng tôi nằm trên bãi biển và tắm biển."
    },
    {
     "type": "match",
     "pairs": [
      [
       "ans Meer / am Meer",
       "đi ra biển (Wohin?) / ở biển (Wo?)"
      ],
      [
       "in die Berge / in den Bergen",
       "lên núi (Wohin?) / ở trên núi (Wo?)"
      ],
      [
       "in die Schweiz / in der Schweiz",
       "sang Thụy Sĩ (Wohin?) / ở Thụy Sĩ (Wo?)"
      ],
      [
       "auf die Insel / auf der Insel",
       "ra đảo (Wohin?) / ở trên đảo (Wo?)"
      ],
      [
       "ins Ausland / im Ausland",
       "ra nước ngoài / ở nước ngoài"
      ],
      [
       "der Reisepass & das Visum",
       "hộ chiếu & thị thực"
      ]
     ]
    },
    {
     "type": "mcq",
     "q": "Loại hình lưu trú nào là một căn hộ có đầy đủ nhà bếp riêng để các gia đình đi nghỉ mát có thể tự nấu ăn?",
     "options": [
      "Das Einzelzimmer",
      "Der Campingplatz",
      "Die Ferienwohnung (FeWo)",
      "Das Wartezimmer"
     ],
     "answer": 2,
     "explain": "„die Ferienwohnung“ (FeWo) là căn hộ nghỉ dưỡng cho khách du lịch thuê theo tuần/ngày, có trang bị bếp riêng."
    },
    {
     "type": "mcq",
     "q": "Khi muốn hủy một đơn đặt phòng khách sạn hoặc vé máy bay đã đặt trước, tiếng Đức dùng động từ nào?",
     "options": [
      "probieren",
      "funktionieren",
      "stornieren",
      "renovieren"
     ],
     "answer": 2,
     "explain": "„stornieren“ (+ Akkusativ) là thuật ngữ chuẩn dùng cho việc hủy đặt phòng khách sạn, vé tàu, vé máy bay hoặc đơn hàng (eine Buchung / ein Zimmer stornieren)."
    },
    {
     "type": "mcq",
     "q": "Trong câu „Im Badezimmer fehlen die Handtücher“, động từ „fehlen“ có nghĩa là gì?",
     "options": [
      "Được giặt sạch sẽ",
      "Đang treo trên tường",
      "Bị thiếu / chưa có",
      "Rất đắt tiền"
     ],
     "answer": 2,
     "explain": "„fehlen“ có nghĩa là bị thiếu hoặc vắng mặt (cái gì bị thiếu thì đóng vai trò làm chủ ngữ của fehlen!)."
    },
    {
     "type": "mcq",
     "q": "Sự khác biệt giữa „Halbpension“ và „Vollpension“ khi đặt khách sạn là gì?",
     "options": [
      "Halbpension gồm 2 bữa (bữa sáng + bữa tối); còn Vollpension gồm trọn cả 3 bữa (sáng, trưa, tối).",
      "Halbpension danh cho tre em; Vollpension danh cho nguoi gia.",
      "Halbpension là phòng nửa giường; Vollpension là phòng cả giường.",
      "Halbpension không có phòng tắm; Vollpension có phòng tắm."
     ],
     "answer": 0,
     "explain": "„die Halbpension“ = bao ăn 2 bữa (sáng và tối); „die Vollpension“ = bao ăn trọn 3 bữa (sáng, trưa, tối)."
    },
    {
     "type": "gap",
     "text": "Entschuldigung, in meinem Hotelzimmer ___ die Klimaanlage leider nicht, und es ist sehr heiß!",
     "answers": [
      "funktioniert"
     ],
     "hint": "funktionieren (ngôi sie)",
     "vi": "Xin lỗi, trong phòng khách sạn của tôi máy điều hòa tiếc là không hoạt động, và trời rất nóng!",
     "explain": "Khi máy móc/thiết bị hỏng không chạy, ta dùng „... funktioniert nicht“."
    },
    {
     "type": "gap",
     "text": "Wir hatten ein ruhiges Zimmer mit ___ gebucht, aber wir sehen vom Fenster nur den Parkplatz!",
     "answers": [
      "Meerblick"
     ],
     "hint": "tầm nhìn hướng biển",
     "vi": "Chúng tôi đã đặt một căn phòng yên tĩnh có tầm nhìn hướng biển, nhưng từ cửa sổ chúng tôi chỉ nhìn thấy bãi đỗ xe!",
     "explain": "„ein Zimmer mit Meerblick“ = phòng có tầm nhìn hướng biển."
    },
    {
     "type": "gap",
     "text": "Wegen des starken ___ von der Straße konnten wir die ganze Nacht nicht schlafen. Können wir bitte das Zimmer ___?",
     "answers": [
      "Lärms",
      "wechseln"
     ],
     "hint": "tiếng ồn (Genitiv) ... đổi (phòng)",
     "vi": "Vì tiếng ồn lớn từ đường phố nên chúng tôi đã không thể ngủ được cả đêm. Chúng tôi có thể xin đổi phòng được không?",
     "explain": "„der Lärm“ (tiếng ồn); „das Zimmer wechseln“ = đổi phòng."
    },
    {
     "type": "gap",
     "text": "Im Sommer schlafen die Jugendlichen gern im ___ auf einem ___ direkt am See.",
     "answers": [
      "Zelt",
      "Campingplatz"
     ],
     "hint": "trong lều ... trên khu cắm trại",
     "vi": "Vào mùa hè các bạn thanh niên thích ngủ trong lều tại một khu cắm trại ngay bên hồ.",
     "explain": "„im Zelt“ (trong lều) và „auf einem Campingplatz“ (trên khu cắm trại)."
    },
    {
     "type": "order",
     "words": [
      "funktioniert",
      "Die",
      "in",
      "Heizung",
      "meinem",
      "Zimmer",
      "nicht"
     ],
     "answer": "Die Heizung in meinem Zimmer funktioniert nicht.",
     "answers": [
      "Die Heizung in meinem Zimmer funktioniert nicht.",
      "In meinem Zimmer funktioniert die Heizung nicht."
     ],
     "vi": "Lò sưởi trong phòng của tôi không hoạt động."
    },
    {
     "type": "order",
     "words": [
      "fehlen",
      "Im",
      "noch",
      "Badezimmer",
      "zwei",
      "Handtücher"
     ],
     "answer": "Im Badezimmer fehlen noch zwei Handtücher.",
     "answers": [
      "Im Badezimmer fehlen noch zwei Handtücher.",
      "Zwei Handtücher fehlen noch im Badezimmer."
     ],
     "vi": "Trong phòng tắm vẫn còn thiếu hai chiếc khăn tắm."
    },
    {
     "type": "order",
     "words": [
      "möchten",
      "bitte",
      "Wir",
      "in",
      "ein",
      "ruhigeres",
      "Zimmer",
      "wechseln"
     ],
     "answer": "Wir möchten bitte in ein ruhigeres Zimmer wechseln.",
     "answers": [
      "Wir möchten bitte in ein ruhigeres Zimmer wechseln.",
      "In ein ruhigeres Zimmer möchten wir bitte wechseln."
     ],
     "vi": "Chúng tôi muốn xin chuyển sang một căn phòng yên tĩnh hơn."
    },
    {
     "type": "translate",
     "vi": "Ở vòi sen tiếc là không có nước nóng.",
     "answers": [
      "In der Dusche gibt es leider kein warmes Wasser.",
      "Leider gibt es in der Dusche kein warmes Wasser."
     ]
    },
    {
     "type": "translate",
     "vi": "Tôi có thể hủy đặt phòng miễn phí không?",
     "answers": [
      "Kann ich das Zimmer kostenlos stornieren?",
      "Kann ich die Buchung kostenlos stornieren?"
     ]
    },
    {
     "type": "listen",
     "de": "Von unserem Balkon im vierten Stock haben wir einen tollen Blick auf das Meer.",
     "vi": "Từ ban công ở tầng bốn chúng tôi có một tầm nhìn tuyệt đẹp ra biển."
    },
    {
     "type": "listen",
     "de": "Auf der Klassenfahrt haben wir in einer günstigen Jugendherberge übernachtet.",
     "vi": "Trong chuyến đi của lớp chúng tôi đã nghỉ qua đêm tại một nhà trọ thanh niên giá rẻ."
    },
    {
     "type": "speak",
     "de": "Entschuldigung, in unserem Zimmer haben wir leider keinen WLAN-Empfang.",
     "vi": "Xin lỗi, trong phòng của chúng tôi tiếc là không bắt được sóng Wi-Fi."
    },
    {
     "type": "speak",
     "de": "Mit Kindern mieten wir im Urlaub am liebsten eine Ferienwohnung.",
     "vi": "Khi đi cùng trẻ nhỏ trong kỳ nghỉ chúng tôi thích nhất là thuê một căn hộ nghỉ dưỡng."
    },
    {
     "type": "match",
     "pairs": [
      [
       "die Ferienwohnung (FeWo)",
       "căn hộ nghỉ dưỡng có bếp"
      ],
      [
       "die Jugendherberge",
       "nhà trọ thanh niên (hostel)"
      ],
      [
       "der Campingplatz & das Zelt",
       "khu cắm trại & cái lều"
      ],
      [
       "die Klimaanlage",
       "máy điều hòa nhiệt độ"
      ],
      [
       "stornieren",
       "hủy đặt phòng / hủy vé"
      ],
      [
       "das Zimmer wechseln",
       "đổi phòng"
      ]
     ]
    },
    {
     "type": "mcq",
     "q": "Chọn giới từ đúng: „Am Nachmittag sind wir gemütlich ___ die historische Altstadt gebummelt.“ (đi dạo xuyên qua khu phố cổ)",
     "options": [
      "durch",
      "aus",
      "von",
      "mit"
     ],
     "answer": 0,
     "explain": "Giới từ „durch“ (+ Akkusativ) mang nghĩa là đi xuyên qua, đi dạo khắp một không gian (durch die Altstadt, durch den Park, durch den Wald)."
    },
    {
     "type": "mcq",
     "q": "Cách viết lời chào mở đầu một tấm bưu thiếp gửi từ một hòn đảo („die Insel Rügen“) hoặc từ biển („das Meer“) nào sau đây là ĐÚNG?",
     "options": [
      "Sonnige Grüße in die Insel Rügen!",
      "Sonnige Grüße von der Insel Rügen / vom Meer!",
      "Sonnige Grüße nach der Insel Rügen!",
      "Sonnige Grüße aus die Insel Rügen / aus das Meer!"
     ],
     "answer": 1,
     "explain": "Lời chào gửi TỪ đâu tới (Woher?): với thành phố/quốc gia không mạo từ dùng „aus“ (Grüße aus Berlin/Italien); nhưng với Đảo (auf der Insel) và Biển/Hồ (am Meer/See) phải dùng „von + Dativ“: „Grüße von der Insel Rügen / vom Meer / vom Bodensee!“."
    },
    {
     "type": "mcq",
     "q": "Chọn dạng Partizip II đúng của động từ „genießen“ (tận hưởng, thưởng thức):",
     "options": [
      "gegenossen",
      "gegenießt",
      "genießt",
      "genossen"
     ],
     "answer": 3,
     "explain": "„genießen“ có tiền tố không tách „ge-“ và là động từ mạnh (ie → o): „hat genossen“."
    },
    {
     "type": "mcq",
     "q": "Khi đi ô tô trên đường cao tốc mà gặp „eine Autopanne“, điều đó có nghĩa là gì?",
     "options": [
      "Trời nắng đẹp",
      "Tìm được trạm xăng giá rẻ",
      "Đến nơi sớm hơn dự kiến",
      "Xe ô tô bị hỏng giữa đường"
     ],
     "answer": 3,
     "explain": "„die Panne / die Autopanne“ là sự cố xe bị hỏng kỹ thuật hoặc thủng lốp giữa đường; còn „der Stau“ là tắc đường, kẹt xe."
    },
    {
     "type": "gap",
     "text": "Auf der Autobahn war ein Unfall. Deshalb ___ wir zwei Stunden lang im ___.",
     "answers": [
      "standen",
      "Stau"
     ],
     "hint": "stehen (Präteritum ngôi wir) + cảnh kẹt xe",
     "vi": "Trên đường cao tốc có một vụ tai nạn. Vì vậy chúng tôi đã bị đứng kẹt xe suốt hai tiếng đồng hồ.",
     "explain": "Cụm từ cố định chỉ việc bị kẹt xe là „im Stau stehen“ (quá khứ: „wir standen im Stau“)."
    },
    {
     "type": "gap",
     "text": "Wir haben eine sehr interessante ___ durch das alte ___ Neuschwanstein gemacht.",
     "answers": [
      "Führung",
      "Schloss"
     ],
     "hint": "chuyến tham quan có thuyết minh ... lâu đài",
     "vi": "Chúng tôi đã thực hiện một chuyến tham quan có hướng dẫn viên rất thú vị qua tòa lâu đài cổ Neuschwanstein.",
     "explain": "„eine Führung durch das Schloss machen“ = tham gia tour có hướng dẫn viên thuyết minh qua lâu đài."
    },
    {
     "type": "gap",
     "text": "Von der alten Burg oben auf dem Berg hat man eine traumhafte ___ über die ganze Stadt.",
     "answers": [
      "Aussicht"
     ],
     "hint": "tầm nhìn toàn cảnh từ trên cao",
     "vi": "Từ tòa thành cổ trên đỉnh núi người ta có một tầm nhìn toàn cảnh đẹp như mơ khắp cả thành phố.",
     "explain": "„die Aussicht“ là tầm nhìn toàn cảnh từ trên cao nhìn xuống."
    },
    {
     "type": "gap",
     "text": "Wir sitzen auf der Terrasse, trinken einen Cappuccino und ___ den roten ___ am Meer.",
     "answers": [
      "genießen",
      "Sonnenuntergang"
     ],
     "hint": "tận hưởng ... cảnh hoàng hôn",
     "vi": "Chúng tôi ngồi ngoài sân hiên, uống một tách Cappuccino và tận hưởng cảnh hoàng hôn đỏ rực trên biển.",
     "explain": "„den Sonnenuntergang genießen“ = tận hưởng/thưởng thức cảnh hoàng hôn."
    },
    {
     "type": "order",
     "words": [
      "sind",
      "durch",
      "Wir",
      "die",
      "Altstadt",
      "gemütlich",
      "gebummelt"
     ],
     "answer": "Wir sind gemütlich durch die Altstadt gebummelt.",
     "answers": [
      "Wir sind gemütlich durch die Altstadt gebummelt.",
      "Durch die Altstadt sind wir gemütlich gebummelt.",
      "Gemütlich sind wir durch die Altstadt gebummelt."
     ],
     "vi": "Chúng tôi đã thong dong dạo bước qua khu phố cổ."
    },
    {
     "type": "order",
     "words": [
      "standen",
      "drei",
      "Wir",
      "Stunden",
      "im",
      "Stau"
     ],
     "answer": "Wir standen drei Stunden im Stau.",
     "answers": [
      "Wir standen drei Stunden im Stau.",
      "Drei Stunden standen wir im Stau.",
      "Im Stau standen wir drei Stunden."
     ],
     "vi": "Chúng tôi đã bị kẹt xe ba tiếng đồng hồ."
    },
    {
     "type": "order",
     "words": [
      "haben",
      "die",
      "Wir",
      "schöne",
      "Aussicht",
      "sehr",
      "genossen"
     ],
     "answer": "Wir haben die schöne Aussicht sehr genossen.",
     "answers": [
      "Wir haben die schöne Aussicht sehr genossen.",
      "Die schöne Aussicht haben wir sehr genossen."
     ],
     "vi": "Chúng tôi đã rất tận hưởng tầm nhìn toàn cảnh tươi đẹp."
    },
    {
     "type": "translate",
     "vi": "Gửi những lời chào đầy nắng từ bờ biển!",
     "answers": [
      "Sonnige Grüße vom Meer!",
      "Sonnige Grüße von der Küste!",
      "Herzliche Grüße vom Meer!"
     ]
    },
    {
     "type": "translate",
     "vi": "Hôm qua chúng tôi đã thuê một chiếc thuyền nhỏ.",
     "answers": [
      "Gestern haben wir ein kleines Boot gemietet.",
      "Wir haben gestern ein kleines Boot gemietet."
     ]
    },
    {
     "type": "listen",
     "de": "Am Nachmittag haben wir eine romantische Fahrt mit dem Schiff auf dem Rhein gemacht.",
     "vi": "Vào buổi chiều chúng tôi đã thực hiện một chuyến đi lãng mạn bằng tàu thủy trên sông Rhein."
    },
    {
     "type": "listen",
     "de": "Kurz vor dem Ziel hatten wir leider eine Autopanne und mussten warten.",
     "vi": "Ngay trước khi tới đích tiếc là chúng tôi bị hỏng xe giữa đường và đã phải chờ đợi."
    },
    {
     "type": "speak",
     "de": "Die Bootsfahrt durch die Bucht war ein unvergessliches Erlebnis.",
     "vi": "Chuyến đi thuyền xuyên qua vịnh là một trải nghiệm không thể nào quên."
    },
    {
     "type": "speak",
     "de": "Vor einer Reise kaufe ich mir immer einen guten Reiseführer.",
     "vi": "Trước một chuyến đi tôi luôn mua cho mình một cuốn sách cẩm nang du lịch hay."
    },
    {
     "type": "match",
     "pairs": [
      [
       "im Stau stehen",
       "bị tắc đường, kẹt xe"
      ],
      [
       "eine Autopanne haben",
       "bị hỏng xe giữa đường"
      ],
      [
       "durch die Altstadt bummeln",
       "dạo bước thong dong qua phố cổ"
      ],
      [
       "der Sonnenuntergang",
       "cảnh hoàng hôn"
      ],
      [
       "die Aussicht genießen",
       "tận hưởng tầm nhìn toàn cảnh"
      ],
      [
       "Grüße von der Insel / vom Meer!",
       "Lời chào từ hòn đảo / từ bờ biển!"
      ]
     ]
    }
   ]
  }
 ]
});
