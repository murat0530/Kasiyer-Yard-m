const CURRENCIES = [
  {
    code: 'GBP', name: 'İngiliz Sterlini', symbol: '£', flag: '🇬🇧',
    color: '#5C2D91',
    keywords: ['pound', 'sterlin', 'ingiliz', 'gbp'],
    valid: [
      { note: '£5',  img: 'img/gbp5.jpg',   imgb: 'img/gbp5b.jpg' },
      { note: '£10', img: 'img/gbp10.jpg',  imgb: 'img/gbp10b.jpg' },
      { note: '£20', img: 'img/gbp20.jpg',  imgb: 'img/gbp20b.jpg' },
      { note: '£50', img: 'img/gbp50.jpg',  imgb: 'img/gbp50b.jpg' },
    ],
    invalid: [
      { note: 'Eski kağıt £5 (pre-2016)',      img: null, warn: 'Tedavülden kalktı' },
      { note: 'Eski kağıt £10 (pre-2017)',     img: null, warn: 'Tedavülden kalktı' },
      { note: 'Eski kağıt £20/£50 (pre-2021)', img: null, warn: 'Tedavülden kalktı' },
    ]
  },
  {
    code: 'AUD', name: 'Avustralya Doları', symbol: 'A$', flag: '🇦🇺',
    color: '#00573F',
    keywords: ['avustralya', 'aud'],
    valid: [
      { note: 'A$5',   img: 'img/aud5.jpg',   imgb: 'img/aud5b.jpg' },
      { note: 'A$10',  img: 'img/aud10.jpg',  imgb: 'img/aud10b.jpg' },
      { note: 'A$20',  img: null,              imgb: null },
      { note: 'A$50',  img: 'img/aud50.jpg',  imgb: 'img/aud50b.jpg' },
      { note: 'A$100', img: 'img/aud100.jpg', imgb: 'img/aud100b.jpg' },
    ],
    invalid: []
  },
  {
    code: 'CAD', name: 'Kanada Doları', symbol: 'C$', flag: '🇨🇦',
    color: '#D31921',
    keywords: ['kanada', 'cad'],
    valid: [
      { note: 'C$5',   img: 'img/cad5.jpg',   imgb: 'img/cad5b.jpg' },
      { note: 'C$10',  img: null,              imgb: null },
      { note: 'C$20',  img: null,              imgb: null },
      { note: 'C$50',  img: 'img/cad50.png',  imgb: 'img/cad50b.png' },
      { note: 'C$100', img: 'img/cad100.png', imgb: 'img/cad100b.png' },
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
      { note: '$1',   img: 'img/usd1.jpg',   imgb: 'img/usd1b.jpg' },
      { note: '$5',   img: 'img/usd5.jpg',   imgb: 'img/usd5b.jpg' },
      { note: '$10',  img: 'img/usd10.jpg',  imgb: 'img/usd10b.jpg' },
      { note: '$20',  img: 'img/usd20.jpg',  imgb: 'img/usd20b.jpg' },
      { note: '$50',  img: 'img/usd50.jpg',  imgb: 'img/usd50b.jpg' },
      { note: '$100', img: 'img/usd100.jpg', imgb: 'img/usd100b.jpg' },
      { note: '$2',   img: null, imgb: null,  warn: 'Nadir, dikkat' },
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
      { note: 'Fr.10',   img: 'img/chf10.jpg',   imgb: 'img/chf10b.jpg' },
      { note: 'Fr.20',   img: 'img/chf20.jpg',   imgb: 'img/chf20b.jpg' },
      { note: 'Fr.50',   img: 'img/chf50.jpg',   imgb: 'img/chf50b.jpg' },
      { note: 'Fr.100',  img: 'img/chf100.jpg',  imgb: 'img/chf100b.jpg' },
      { note: 'Fr.200',  img: 'img/chf200.jpg',  imgb: 'img/chf200b.jpg' },
      { note: 'Fr.1000', img: 'img/chf1000.jpg', imgb: 'img/chf1000b.jpg' },
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
      { note: '€5',   img: 'img/eur5.png',   imgb: 'img/eur5b.png' },
      { note: '€10',  img: 'img/eur10.png',  imgb: 'img/eur10b.png' },
      { note: '€20',  img: 'img/eur20.jpg',  imgb: 'img/eur20b.jpg' },
      { note: '€50',  img: 'img/eur50.png',  imgb: 'img/eur50b.png' },
      { note: '€100', img: 'img/eur100.jpg', imgb: 'img/eur100b.jpg' },
      { note: '€200', img: 'img/eur200.jpg', imgb: 'img/eur200b.jpg' },
      { note: '€500', img: null, imgb: null,  warn: 'Çoğu yer almıyor, dikkat' },
    ],
    invalid: []
  },
  {
    code: 'JPY', name: 'Japon Yeni', symbol: '¥', flag: '🇯🇵',
    color: '#1A237E',
    keywords: ['yen', 'japon', 'jpy'],
    valid: [
      { note: '¥1000',  img: 'img/jpy1000.jpg',  imgb: 'img/jpy1000b.jpg' },
      { note: '¥5000',  img: 'img/jpy5000.jpg',  imgb: 'img/jpy5000b.jpg' },
      { note: '¥10000', img: 'img/jpy10000.jpg', imgb: 'img/jpy10000b.jpg' },
      { note: '¥2000',  img: null, imgb: null,    warn: 'Çok nadir, dikkat' },
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
