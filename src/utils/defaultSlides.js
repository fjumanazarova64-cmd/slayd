export const SAMPLE_PRESENTATIONS = [
  {
    id: 'sample-ai-intro',
    title: 'Sun’iy Intellekt va Kelajak Kasblari',
    category: 'tech',
    theme: 'modern-blue',
    language: 'uz',
    createdAt: new Date().toISOString(),
    slides: [
      {
        id: 's1',
        layout: 'title',
        title: 'Sun’iy Intellekt va Kelajak Kasblari',
        subtitle: 'XXI asrda texnologiyalarning mehnat bozoriga ta’siri va yangi imkoniyatlar',
        categoryTag: 'Texnologiya & AI',
        speaker: 'SLIDE AI Platformasi',
        bullets: []
      },
      {
        id: 's2',
        layout: 'split',
        title: 'Kirish: AI Inqilobi Qanday Boshlandi?',
        content: 'Sun’iy intellekt texnologiyalari oddiy algoritmlardan inson ongiga o‘xshash generativ modellar bosqichiga yetib keldi. Bu jarayon nafaqat IT sohasini, balki barcha tarmoqlarni o‘zgartirmoqda.',
        highlightTitle: 'Asosiy O‘zgarish',
        highlightText: '2030-yilga borib jahon iqtisodiyotining 40% dan ortiq vazifalari AI yordamida avtomatlashishi kutilmoqda.',
        bullets: [
          'Katta ma’lumotlar (Big Data) tahlilining tezlashishi',
          'Generativ AI (ChatGPT, Midjourney, Claude) ommalashuvi',
          'Avtomatlashtirish darajasining keskin o‘sishi'
        ]
      },
      {
        id: 's3',
        layout: 'bullets',
        title: 'Talab Yuqori Bo‘ladigan Kelajak Kasblari',
        content: 'Bozorda yangi mutaxassisliklarga ehtiyoj har qachongidan ko‘ra tezroq oshmoqda:',
        bullets: [
          'Prompt Muhandisi (Prompt Engineer) — AI bilan samarali muloqot ustasi',
          'AI Etikasi va Kiberxavfsizlik mutaxassislari',
          'Katta ma’lumotlar va Machine Learning muhandislari',
          'Raqamli salomatlik va bioinformatika tahlilchilari'
        ]
      },
      {
        id: 's4',
        layout: 'image-text',
        title: 'Inson va AI Hamkorligi: Samaradorlik Kaliti',
        content: 'AI insonning o‘rnini bosmaydi, balki AIdan foydalana oladigan inson undan foydalanmaydigan mutaxassisni ortda qoldiradi. Ijodiy fikrlash, tanqidiy yondashuv va empatiya — insonning eng katta ustunligi bo‘lib qoladi.',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        bullets: [
          'Ijodiy va strategik qarorlar qabul qilish',
          'Hissiy intellekt va jamoada ishlash qobiliyati',
          'Doimiy yangi ko‘nikmalarni o‘rganish (Life-long learning)'
        ]
      },
      {
        id: 's5',
        layout: 'conclusion',
        title: 'Xulosa va Tavsiyalar',
        content: 'Kelajakka tayyor bo‘lish uchun har bir mutaxassis AI vositalarini o‘z sohasiga integratsiya qilishi shart.',
        bullets: [
          'Raqamli savodxonlikni muntazam oshirib boring',
          'AI vositalarini kundalik ish tartibingizga kiriting',
          'O‘zbek tilidagi AI resurslaridan unumli foydalaning'
        ],
        footerText: 'E’tiboringiz uchun rahmat! Savollar bormi?'
      }
    ]
  }
];
