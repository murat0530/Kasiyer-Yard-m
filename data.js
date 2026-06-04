const CURRENCIES = [
  {
    code: 'GBP', name: 'İngiliz Sterlini', symbol: '£', flag: '🇬🇧',
    color: '#5C2D91',
    keywords: ['pound', 'sterlin', 'ingiliz', 'gbp'],
    valid: [
      { note: '£5',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/New_fiver.jpg/600px-New_fiver.jpg' },
      { note: '£10', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/New_ten_pound_note.jpg/600px-New_ten_pound_note.jpg' },
      { note: '£20', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Turner_Twenty_Pound_Note.jpg/600px-Turner_Twenty_Pound_Note.jpg' },
      { note: '£50', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Alan_Turing_50_Pound_note_front.jpg/600px-Alan_Turing_50_Pound_note_front.jpg' },
    ],
    invalid: [
      { note: 'Eski kağıt £5 (pre-2016)',    img: null, warn: 'Tedavülden kalktı' },
      { note: 'Eski kağıt £10 (pre-2017)',   img: null, warn: 'Tedavülden kalktı' },
      { note: 'Eski kağıt £20/£50 (pre-2021)', img: null, warn: 'Tedavülden kalktı' },
    ]
  },
  {
    code: 'AUD', name: 'Avustralya Doları', symbol: 'A$', flag: '🇦🇺',
    color: '#00573F',
    keywords: ['avustralya', 'aud'],
    valid: [
      { note: 'A$5',  img: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/2016_Australian_five_dollar_note_obverse.jpg/600px-2016_Australian_five_dollar_note_obverse.jpg' },
      { note: 'A$10', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/2017_Australian_ten_dollar_note_obverse.jpg/600px-2017_Australian_ten_dollar_note_obverse.jpg' },
      { note: 'A$20', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Australian_20_dollar_note_Reverse_Fourth_Series.jpeg/600px-Australian_20_dollar_note_Reverse_Fourth_Series.jpeg' },
      { note: 'A$50', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/2018_Australian_fifty_dollar_note_obverse.jpg/600px-2018_Australian_fifty_dollar_note_obverse.jpg' },
      { note: 'A$100',img: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Australian_100_dollar_note_Obverse_Fourth_Series.jpeg/600px-Australian_100_dollar_note_Obverse_Fourth_Series.jpeg' },
    ],
    invalid: []
  },
  {
    code: 'CAD', name: 'Kanada Doları', symbol: 'C$', flag: '🇨🇦',
    color: '#D31921',
    keywords: ['kanada', 'cad'],
    valid: [
      { note: 'C$5',  img: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Canadian_%245_note_specimen_-_face.jpg/600px-Canadian_%245_note_specimen_-_face.jpg' },
      { note: 'C$10', img: null },
      { note: 'C$20', img: null },
      { note: 'C$50', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Canadian_%2450_note_specimen_-_face.png/600px-Canadian_%2450_note_specimen_-_face.png' },
      { note: 'C$100',img: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Canadian_%24100_note_specimen_-_face.png/600px-Canadian_%24100_note_specimen_-_face.png' },
    ],
    invalid: [
      { note: 'Eski kağıt seri (pre-2011)', img: null, warn: 'Geçersiz' },
    ]
  },
  {
    code: 'USD', name: 'Amerikan Doları', symbol: '$', flag: '🇺🇸',
    color: '#2E7D32',
    keywords: ['dolar', 'amerikan', 'usd'],
    valid: [
      { note: '$1',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Obverse_of_the_series_2021_%241_Federal_Reserve_Note.jpg/600px-Obverse_of_the_series_2021_%241_Federal_Reserve_Note.jpg' },
      { note: '$5',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Obverse_of_the_series_2021_%245_Federal_Reserve_Note.jpg/600px-Obverse_of_the_series_2021_%245_Federal_Reserve_Note.jpg' },
      { note: '$10',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Obverse_of_the_series_2021_%2410_Federal_Reserve_Note.jpg/600px-Obverse_of_the_series_2021_%2410_Federal_Reserve_Note.jpg' },
      { note: '$20',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Obverse_of_the_series_2017A_%2420_Federal_Reserve_Note.jpg/600px-Obverse_of_the_series_2017A_%2420_Federal_Reserve_Note.jpg' },
      { note: '$50',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Obverse_of_the_%2450_Federal_Reserve_Note.jpg/600px-Obverse_of_the_%2450_Federal_Reserve_Note.jpg' },
      { note: '$100', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Obverse_of_the_series_2021_%24100_Federal_Reserve_Note.jpg/600px-Obverse_of_the_series_2021_%24100_Federal_Reserve_Note.jpg' },
      { note: '$2',   img: null, warn: 'Nadir, dikkat' },
    ],
    invalid: [
      { note: '$100 pre-2013', img: null, warn: 'Güvenlik şeridi yok, almayın' },
    ]
  },
  {
    code: 'CHF', name: 'İsviçre Frangı', symbol: 'Fr.', flag: '🇨🇭',
    color: '#C41E3A',
    keywords: ['frank', 'isviçre', 'chf'],
    valid: [
      { note: 'Fr.10',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/CHF_10_9_front.jpg/600px-CHF_10_9_front.jpg' },
      { note: 'Fr.20',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/CHF_20_9_front.jpg/600px-CHF_20_9_front.jpg' },
      { note: 'Fr.50',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/CHF_50_9_front.jpg/600px-CHF_50_9_front.jpg' },
      { note: 'Fr.100',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/CHF_100_9_front.jpg/600px-CHF_100_9_front.jpg' },
      { note: 'Fr.200',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/CHF_200_9_front.jpg/600px-CHF_200_9_front.jpg' },
      { note: 'Fr.1000', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/CHF_1000_9_front.jpg/600px-CHF_1000_9_front.jpg' },
    ],
    invalid: [
      { note: '8. Seri (tüm değerler)', img: null, warn: '2021\'de geri çağrıldı' },
    ]
  },
  {
    code: 'CNY', name: 'Çin Yuanı', symbol: '¥', flag: '🇨🇳',
    color: '#CC0001',
    keywords: ['çin', 'yuan', 'renminbi', 'cny'],
    valid: [
      { note: '¥1',   img: null },
      { note: '¥5',   img: null },
      { note: '¥10',  img: null },
      { note: '¥20',  img: null },
      { note: '¥50',  img: null },
      { note: '¥100', img: null },
    ],
    invalid: []
  },
  {
    code: 'SAR', name: 'Suudi Riyali', symbol: '﷼', flag: '🇸🇦',
    color: '#006C35',
    keywords: ['riyal', 'suudi', 'sar', 'arabistan'],
    valid: [
      { note: '﷼1',   img: null },
      { note: '﷼5',   img: null },
      { note: '﷼10',  img: null },
      { note: '﷼50',  img: null },
      { note: '﷼100', img: null },
      { note: '﷼500', img: null },
    ],
    invalid: [
      { note: '﷼200 G20 Beyaz Hatıra', img: null, warn: 'Hatıra parası, geçersiz' },
    ]
  },
  {
    code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺',
    color: '#003087',
    keywords: ['euro', 'avrupa', 'eur'],
    valid: [
      { note: '€5',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/EUR_5_obverse_%282013_issue%29.png/600px-EUR_5_obverse_%282013_issue%29.png' },
      { note: '€10',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/EUR_10_obverse_%282014_issue%29.png/600px-EUR_10_obverse_%282014_issue%29.png' },
      { note: '€20',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/The_Europa_series_20_%E2%82%AC_obverse_side.jpg/600px-The_Europa_series_20_%E2%82%AC_obverse_side.jpg' },
      { note: '€50',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/The_Europa_series_50_%E2%82%AC_obverse_side.png/600px-The_Europa_series_50_%E2%82%AC_obverse_side.png' },
      { note: '€100', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/The_Europa_series_100_%E2%82%AC_obverse_side.jpg/600px-The_Europa_series_100_%E2%82%AC_obverse_side.jpg' },
      { note: '€200', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/The_Europa_series_200_%E2%82%AC_obverse_side.jpg/600px-The_Europa_series_200_%E2%82%AC_obverse_side.jpg' },
      { note: '€500', img: null, warn: 'Çoğu yer almıyor, dikkat' },
    ],
    invalid: []
  },
  {
    code: 'JPY', name: 'Japon Yeni', symbol: '¥', flag: '🇯🇵',
    color: '#1A237E',
    keywords: ['yen', 'japon', 'jpy'],
    valid: [
      { note: '¥1000',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Series_F_1%2C000_yen_note_front.jpg/600px-Series_F_1%2C000_yen_note_front.jpg' },
      { note: '¥5000',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Series_F_5000_yen_front.jpg/600px-Series_F_5000_yen_front.jpg' },
      { note: '¥10000', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Series_F_10000_yen_front.jpg/600px-Series_F_10000_yen_front.jpg' },
      { note: '¥2000',  img: null, warn: 'Çok nadir, dikkat' },
    ],
    invalid: []
  }
];

const PHRASES = [
  {
    lang: 'Çince', flag: '🇨🇳',
    items: [
      { tr: 'Kaç para?', native: '多少钱？' },
      { tr: 'Lütfen bekleyin', native: '请稍等' },
      { tr: 'Teşekkürler', native: '谢谢' },
      { tr: 'Bu banknot geçersiz', native: '这张钞票无效' },
      { tr: 'Başka banknot var mı?', native: '你有其他钞票吗？' },
      { tr: 'Kabul edemiyorum', native: '我无法接受' },
    ]
  },
  {
    lang: 'İngilizce', flag: '🇬🇧',
    items: [
      { tr: 'Kaç para?', native: 'How much?' },
      { tr: 'Lütfen bekleyin', native: 'Please wait' },
      { tr: 'Teşekkürler', native: 'Thank you' },
      { tr: 'Bu banknot geçersiz', native: 'This banknote is invalid' },
      { tr: 'Başka banknot var mı?', native: 'Do you have another banknote?' },
      { tr: 'Kabul edemiyorum', native: 'I cannot accept this' },
    ]
  },
  {
    lang: 'Arapça', flag: '🇸🇦',
    items: [
      { tr: 'Kaç para?', native: 'كم السعر؟' },
      { tr: 'Lütfen bekleyin', native: 'انتظر من فضلك' },
      { tr: 'Teşekkürler', native: 'شكراً' },
      { tr: 'Bu banknot geçersiz', native: 'هذه الورقة النقدية غير صالحة' },
      { tr: 'Başka banknot var mı?', native: 'هل لديك ورقة نقدية أخرى؟' },
      { tr: 'Kabul edemiyorum', native: 'لا أستطيع قبول هذا' },
    ]
  },
  {
    lang: 'Japonca', flag: '🇯🇵',
    items: [
      { tr: 'Kaç para?', native: 'いくらですか？' },
      { tr: 'Lütfen bekleyin', native: '少々お待ちください' },
      { tr: 'Teşekkürler', native: 'ありがとうございます' },
      { tr: 'Bu banknot geçersiz', native: 'この紙幣は無効です' },
      { tr: 'Başka banknot var mı?', native: '別のお札はありますか？' },
    ]
  },
  {
    lang: 'Fransızca', flag: '🇫🇷',
    items: [
      { tr: 'Kaç para?', native: 'Combien ça coûte?' },
      { tr: 'Lütfen bekleyin', native: 'Un moment s\'il vous plaît' },
      { tr: 'Teşekkürler', native: 'Merci' },
      { tr: 'Bu banknot geçersiz', native: 'Ce billet est invalide' },
      { tr: 'Başka banknot var mı?', native: 'Avez-vous un autre billet?' },
    ]
  }
];
