const CURRENCIES = [
  {
    code: 'GBP', name: 'İngiliz Sterlini', symbol: '£', flag: '🇬🇧',
    keywords: ['pound', 'sterlin', 'ingiliz', 'gbp'],
    valid: [
      { note: '£5 (Polimer)' },
      { note: '£10 (Polimer)' },
      { note: '£20 (Polimer)' },
      { note: '£50 (Polimer)' },
    ],
    invalid: [
      { note: 'Eski kağıt £5 (pre-2016)', warn: 'Tedavülden kalktı' },
      { note: 'Eski kağıt £10 (pre-2017)', warn: 'Tedavülden kalktı' },
      { note: 'Eski kağıt £20/£50 (pre-2021)', warn: 'Tedavülden kalktı' },
    ]
  },
  {
    code: 'AUD', name: 'Avustralya Doları', symbol: 'A$', flag: '🇦🇺',
    keywords: ['avustralya', 'aud'],
    valid: [
      { note: 'A$5' }, { note: 'A$10' }, { note: 'A$20' }, { note: 'A$50' }, { note: 'A$100' }
    ],
    invalid: []
  },
  {
    code: 'CAD', name: 'Kanada Doları', symbol: 'C$', flag: '🇨🇦',
    keywords: ['kanada', 'cad'],
    valid: [
      { note: 'C$5' }, { note: 'C$10' }, { note: 'C$20' }, { note: 'C$50' }, { note: 'C$100' }
    ],
    invalid: [
      { note: 'Kağıt notlar (pre-2011)', warn: 'Eski seri, geçersiz' }
    ]
  },
  {
    code: 'USD', name: 'Amerikan Doları', symbol: '$', flag: '🇺🇸',
    keywords: ['dolar', 'amerikan', 'usd'],
    valid: [
      { note: '$1' }, { note: '$5' }, { note: '$10' },
      { note: '$20' }, { note: '$50' }, { note: '$100' },
      { note: '$2', warn: 'Nadir, dikkatli kontrol et' }
    ],
    invalid: [
      { note: '$100 pre-2013', warn: 'Güvenlik şeridi yok, almayın' }
    ]
  },
  {
    code: 'CHF', name: 'İsviçre Frangı', symbol: 'Fr.', flag: '🇨🇭',
    keywords: ['frank', 'isviçre', 'chf'],
    valid: [
      { note: 'Fr.10' }, { note: 'Fr.20' }, { note: 'Fr.50' },
      { note: 'Fr.100' }, { note: 'Fr.200' }, { note: 'Fr.1000' }
    ],
    invalid: [
      { note: '8. Seri (tüm değerler)', warn: '2021\'de geri çağrıldı, geçersiz' }
    ]
  },
  {
    code: 'CNY', name: 'Çin Yuanı', symbol: '¥', flag: '🇨🇳',
    keywords: ['çin', 'yuan', 'renminbi', 'cny'],
    valid: [
      { note: '¥1' }, { note: '¥5' }, { note: '¥10' },
      { note: '¥20' }, { note: '¥50' }, { note: '¥100' }
    ],
    invalid: []
  },
  {
    code: 'SAR', name: 'Suudi Riyali', symbol: '﷼', flag: '🇸🇦',
    keywords: ['riyal', 'suudi', 'sar', 'arabistan'],
    valid: [
      { note: '﷼1' }, { note: '﷼5' }, { note: '﷼10' },
      { note: '﷼50' }, { note: '﷼100' }, { note: '﷼500' }
    ],
    invalid: [
      { note: '﷼200 Beyaz G20 Hatıra', warn: 'G20 hatıra banknotu, geçersiz' }
    ]
  },
  {
    code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺',
    keywords: ['euro', 'avrupa', 'eur'],
    valid: [
      { note: '€5' }, { note: '€10' }, { note: '€20' },
      { note: '€50' }, { note: '€100' }, { note: '€200' },
      { note: '€500', warn: 'Tedavülde ama çoğu yer almıyor' }
    ],
    invalid: []
  },
  {
    code: 'JPY', name: 'Japon Yeni', symbol: '¥', flag: '🇯🇵',
    keywords: ['yen', 'japon', 'jpy'],
    valid: [
      { note: '¥1000' }, { note: '¥5000' }, { note: '¥10000' },
      { note: '¥2000', warn: 'Çok nadir, dikkatli kontrol et' }
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
