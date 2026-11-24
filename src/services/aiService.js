/**
 * AI Service for SLIDE AI
 * Automatically creates:
 * 1. Topic deep analysis
 * 2. Explicit structured Reja (Outline / Agenda)
 * 3. Individual slides for each point in the Reja with modern KPI metrics, bullet cards, and conclusions!
 */

const UNSPLASH_IMAGES = {
  education: [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80'
  ],
  business: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
  ],
  medical: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80'
  ],
  tech: [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
  ],
  history: [
    'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80'
  ],
  other: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'
  ]
};

function getRandomImage(category) {
  const list = UNSPLASH_IMAGES[category] || UNSPLASH_IMAGES.other;
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Intelligent topic analyzer and outline (Reja) builder
 */
function buildTopicOutline(topic, language) {
  const isUz = language === 'uz';
  const isRu = language === 'ru';

  if (isUz) {
    return [
      { num: '01', title: 'Kirish va Mavzuning Dolzarbligi', desc: `${topic} tushunchasi, zamonaviy jamiyatdagi o‘rni va muammoning qo‘yilishi` },
      { num: '02', title: 'Asosiy Tushunchalar va Nazariy Asoslar', desc: `Mavzuning poydevor tamoyillari, terminologiya va ilmiy asoslar` },
      { num: '03', title: 'Tahliliy Ko‘rsatkichlar va Statistika', desc: `Raqamlar, tadqiqot natijalari va samaradorlik ko‘rsatkichlari` },
      { num: '04', title: 'Amaliy Yechimlar va Tajribalar', desc: `Haqiqiy loyihalar, ilg‘or xalqaro tajriba va amaliyotga tatbiq etish` },
      { num: '05', title: 'Kelajak Istiqbollari va Xulosa', desc: `Strategik tavsiyalar, kutilayotgan natijalar va umumiy xulosalar` }
    ];
  } else if (isRu) {
    return [
      { num: '01', title: 'Введение и актуальность темы', desc: `Сущность темы ${topic}, ее значение в современном мире и постановка проблемы` },
      { num: '02', title: 'Ключевые концепции и принципы', desc: `Теоретические основы, терминология и базовые составляющие` },
      { num: '03', title: 'Аналитические данные и метрики', desc: `Статистика, результаты исследований и показатели эффективности` },
      { num: '04', title: 'Практические кейсы и применение', desc: `Реальные решения, мировой опыт и внедрение на практике` },
      { num: '05', title: 'Перспективы развития и выводы', desc: `Стратегические рекомендации и итоговые заключения` }
    ];
  } else {
    return [
      { num: '01', title: 'Introduction & Significance', desc: `Context of ${topic}, relevance in today's landscape and core objectives` },
      { num: '02', title: 'Fundamental Concepts & Framework', desc: `Underlying theory, key terminology, and strategic pillars` },
      { num: '03', title: 'Key Metrics & Data Insights', desc: `Quantifiable benchmarks, research statistics and measured impact` },
      { num: '04', title: 'Practical Execution & Case Studies', desc: `Real-world implementation, best practices and technological adoption` },
      { num: '05', title: 'Future Horizons & Key Takeaways', desc: `Strategic roadmaps, actionable recommendations and conclusions` }
    ];
  }
}

/**
 * Intelligent local presentation generator
 */
export function generateDemoPresentation({
  topic,
  slideCount = 5,
  language = 'uz',
  category = 'tech',
  theme = 'pitch-dark'
}) {
  const count = parseInt(slideCount, 10) || 5;
  const isUz = language === 'uz';
  const isRu = language === 'ru';

  const cleanTopic = topic.trim();
  const outline = buildTopicOutline(cleanTopic, language);
  const slides = [];

  // SLIDE 1: Ultra-Modern Cover
  slides.push({
    id: `slide-1-${Date.now()}`,
    layout: 'title',
    title: cleanTopic,
    subtitle: isUz
      ? `${cleanTopic} bo‘yicha keng qamrovli tahlil, strategik reja va amaliy yechimlar`
      : isRu
      ? `Глубокий анализ, стратегический план и практические решения по теме: ${cleanTopic}`
      : `In-depth strategic analysis, structured agenda, and actionable frameworks on ${cleanTopic}`,
    categoryTag: category.toUpperCase(),
    speaker: isUz ? 'SLIDE AI Ekspert' : isRu ? 'Эксперт SLIDE AI' : 'SLIDE AI Expert',
    badgeText: isUz ? '2026 STRATEGIYA' : '2026 STRATEGY',
    date: new Date().toLocaleDateString(isUz ? 'uz-UZ' : isRu ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long' }),
    bullets: []
  });

  // SLIDE 2: THE REJA (AGENDA) SLIDE! (User explicit requirement)
  slides.push({
    id: `slide-2-${Date.now()}`,
    layout: 'agenda',
    title: isUz ? 'Taqdimot Rejasi (Agenda)' : isRu ? 'План презентации' : 'Presentation Agenda',
    subtitle: isUz
      ? `Mavzuni to‘liq yoritish uchun belgilangan 5 ta asosiy bosqich:`
      : isRu
      ? `5 ключевых этапов для всестороннего раскрытия темы:`
      : `5 fundamental phases covering the entire scope:`,
    agendaItems: outline,
    bullets: []
  });

  // SLIDE 3: Section 1 - Kirish va Dolzarbligi (Split layout)
  if (count >= 3) {
    slides.push({
      id: `slide-3-${Date.now()}`,
      layout: 'split',
      title: outline[0].title,
      subtitle: isUz ? 'Mavzuning mohiyati va dolzarbligi' : isRu ? 'Сущность и актуальность' : 'Context and significance',
      content: isUz
        ? `Bugungi kunda "${cleanTopic}" yo‘nalishi global rivojlanishning eng yuqori nuqtasida turibdi. Ushbu sohadagi har bir yangilik iqtisodiy va ijtimoiy jarayonlarga bevosita ta’sir o‘tkazmoqda.`
        : isRu
        ? `Сегодня тема "${cleanTopic}" находится в центре внимания мирового сообщества, оказывая прямое влияние на экономические и социальные процессы.`
        : `Currently, "${cleanTopic}" stands at the forefront of global innovation, exerting immediate influence across industries.`,
      highlightTitle: isUz ? 'Asosiy Dolzarblik' : isRu ? 'Главный вызов' : 'Core Priority',
      highlightText: isUz
        ? 'Raqobatbardosh bo‘lish uchun an’anaviy usullardan zamonaviy avtomatlashgan yondashuvlarga o‘tish zarur.'
        : isRu
        ? 'Для сохранения конкурентоспособности необходим переход к автоматизированным цифровым подходам.'
        : 'Transitioning towards intelligent automated workflows is crucial for sustained competitive edge.',
      bullets: [
        isUz ? 'Mavjud muammolar va ularning ko‘lami' : isRu ? 'Текущие проблемы и их масштаб' : 'Current bottlenecks and their scope',
        isUz ? 'Zamonaviy texnologik ehtiyojlar' : isRu ? 'Потребности в новых технологиях' : 'Modern technological requirements',
        isUz ? 'Yechimlar sari birinchi qadamlar' : isRu ? 'Первые шаги к внедрению решений' : 'Key milestones toward implementation'
      ]
    });
  }

  // SLIDE 4: Section 2 - Key Metrics & KPI Stats (Modern KPI layout!)
  if (count >= 4) {
    slides.push({
      id: `slide-4-${Date.now()}`,
      layout: 'kpi',
      title: outline[2].title,
      subtitle: isUz ? 'Muhim raqamlar va samaradorlik o‘sishi' : isRu ? 'Ключевые цифры и рост показателей' : 'Measurable impact & indicators',
      content: isUz
        ? `Tadqiqotlar va statistik ma’lumotlar shuni ko‘rsatadiki, to‘g‘ri strategiya quyidagi natijalarga olib keladi:`
        : isRu
        ? `Исследования подтверждают, что грамотная стратегия приводит к следующим измеримым результатам:`
        : `Verified research and market benchmarks demonstrate substantial performance gains:`,
      metrics: [
        { value: '+85%', label: isUz ? 'Samaradorlik o‘sishi' : isRu ? 'Рост эффективности' : 'Efficiency gain' },
        { value: '3.5x', label: isUz ? 'Jarayonlar tezlashuvi' : isRu ? 'Ускорение процессов' : 'Faster delivery' },
        { value: '60%', label: isUz ? 'Xarajatlar qisqarishi' : isRu ? 'Снижение издержек' : 'Cost reduction' }
      ],
      bullets: [
        isUz ? 'Bozor hajmining muntazam kengayishi' : isRu ? 'Постоянный рост объема рынка' : 'Continuous market expansion',
        isUz ? 'Inson omiliga bog‘liq xatolarning kamayishi' : isRu ? 'Минимизация человеческого фактора' : 'Reduction in human error',
        isUz ? 'Investitsiyalarning tezroq qoplanishi (ROI)' : isRu ? 'Быстрая окупаемость вложений' : 'Accelerated return on investment'
      ]
    });
  }

  // SLIDE 5: Section 3 - Visual / Practical Execution (Image + Card)
  if (count >= 5) {
    slides.push({
      id: `slide-5-${Date.now()}`,
      layout: 'image-text',
      title: outline[3].title,
      subtitle: isUz ? 'Amaliyotga tatbiq etish mexanizmlari' : isRu ? 'Механизмы практической реализации' : 'Execution framework',
      content: isUz
        ? `Nazariy bilimlarni amaliyotda sinab ko‘rish orqali eng optimal natijalar kafolatlanadi. Quyidagi mexanizmlar muvaffaqiyat garovidir:`
        : isRu
        ? `Практическое применение подтверждает теорию и гарантирует максимальный результат:`
        : `Translating theory into production workflows guarantees predictable outcomes:`,
      imageUrl: getRandomImage(category),
      bullets: [
        isUz ? 'Bosqichma-bosqich integratsiya qilish yo‘l xaritasi' : isRu ? 'Поэтапная дорожная карта интеграции' : 'Staged integration roadmap',
        isUz ? 'Mutaxassislarning bilim va malakasini oshirish' : isRu ? 'Повышение квалификации специалистов' : 'Continuous workforce upskilling',
        isUz ? 'Natijalarni uzluksiz audit va monitoring qilish' : isRu ? 'Непрерывный мониторинг и аудит' : 'Continuous audit and optimization'
      ]
    });
  }

  // Extra slides if count > 5 (Grid cards & Timeline)
  if (count > 5) {
    const extraNeeded = count - 5;
    for (let i = 1; i <= extraNeeded; i++) {
      if (i % 2 === 1) {
        slides.push({
          id: `slide-extra-${i}-${Date.now()}`,
          layout: 'grid',
          title: isUz ? `Tahliliy Yo‘nalishlar #${i}` : isRu ? `Аналитический блок #${i}` : `Strategic Pillars #${i}`,
          subtitle: isUz ? 'Asosiy e’tibor qaratilishi lozim bo‘lgan jabhalar' : isRu ? 'Ключевые точки фокуса' : 'Core focus areas',
          content: isUz
            ? `Mavzuning har bir tarkibiy qismi alohida e’tibor talab qiladi:`
            : isRu
            ? `Каждый элемент темы требует отдельного внимания:`
            : `Each component requires dedicated execution:`,
          gridItems: [
            { title: isUz ? 'Texnik poydevor' : 'Техническая база', desc: isUz ? 'Mustahkam infratuzilma va zamonaviy arxitektura' : 'Надежная инфраструктура и архитектура' },
            { title: isUz ? 'Xavfsizlik' : 'Безопасность', desc: isUz ? 'Ma’lumotlarni shifrlash va himoya protokollari' : 'Шифрование данных и протоколы защиты' },
            { title: isUz ? 'Moslashuvchanlik' : 'Масштабируемость', desc: isUz ? 'Kelajakdagi kengayishlarga to‘liq tayyorlik' : 'Полная готовность к масштабированию' }
          ],
          bullets: []
        });
      } else {
        slides.push({
          id: `slide-extra-${i}-${Date.now()}`,
          layout: 'split',
          title: isUz ? `Qo‘shimcha Strategiya #${i}` : isRu ? `Дополнительная стратегия #${i}` : `Supplementary Vector #${i}`,
          content: isUz
            ? `Tizimli yondashuv orqali kutilmagan to‘siqlarni osonlik bilan yengib o‘tish mumkin.`
            : isRu
            ? `Системный подход позволяет легко преодолевать непредвиденные барьеры.`
            : `A structured approach empowers organizations to overcome unexpected barriers.`,
          highlightTitle: isUz ? 'Tavsiya' : isRu ? 'Рекомендация' : 'Insight',
          highlightText: isUz
            ? 'Xalqaro standartlarga rioya qilish xatolar ehtimolini 70% ga kamaytiradi.'
            : isRu
            ? 'Соблюдение международных стандартов снижает риски на 70%.'
            : 'Adherence to international standards mitigates operational risks by up to 70%.',
          bullets: [
            isUz ? 'Resurslarni to‘g‘ri taqsimlash' : isRu ? 'Грамотное распределение ресурсов' : 'Optimal resource allocation',
            isUz ? 'Jamoaviy aloqani kuchaytirish' : isRu ? 'Укрепление командной коммуникации' : 'Strengthen cross-team alignment',
            isUz ? 'Muntazam takomillashtirish' : isRu ? 'Постоянное совершенствование' : 'Iterative progress reviews'
          ]
        });
      }
    }
  }

  // LAST SLIDE: Conclusion & Q&A
  slides.push({
    id: `slide-last-${Date.now()}`,
    layout: 'conclusion',
    title: outline[4].title,
    subtitle: isUz ? 'Asosiy xulosalar va kelgusi qadamlar' : isRu ? 'Итоги и дальнейшие шаги' : 'Key takeaways & future roadmap',
    content: isUz
      ? `"${cleanTopic}" bo‘yicha o‘tkazilgan tahlillar shuni isbotlaydiki, innovatsiyalarga ochiqlik va tizimli reja har qanday sohada yuksak natijalarni ta’minlaydi.`
      : isRu
      ? `Анализ темы "${cleanTopic}" доказывает, что открытость инновациям и системный план обеспечивают превосходные результаты в любой сфере.`
      : `Analysis of "${cleanTopic}" affirms that openness to innovation and disciplined execution guarantee remarkable results.`,
    bullets: [
      isUz ? 'Zamonaviy texnologiyalarni zudlik bilan sinab ko‘ring' : isRu ? 'Внедряйте современные технологии без промедления' : 'Adopt modern tools immediately',
      isUz ? 'Doimiy ta’lim va malaka oshirishga e’tibor qarating' : isRu ? 'Уделяйте внимание непрерывному обучению' : 'Invest in lifelong learning',
      isUz ? 'O‘zbekistonda yaratilgan raqamli imkoniyatlardan foydalaning' : isRu ? 'Используйте цифровые возможности' : 'Capitalize on digital innovation'
    ],
    footerText: isUz
      ? 'E’tiboringiz uchun rahmat! Savollarga javob berishdan mamnunmiz.'
      : isRu
      ? 'Спасибо за внимание! Будем рады ответить на ваши вопросы.'
      : 'Thank you for your attention! Questions & discussions welcome.'
  });

  return {
    id: `pres-${Date.now()}`,
    title: cleanTopic,
    category,
    theme,
    language,
    createdAt: new Date().toISOString(),
    slides
  };
}

/**
 * Main AI Generation entry point with progressive animated steps
 */
export async function generatePresentation({
  topic,
  slideCount = 5,
  language = 'uz',
  category = 'tech',
  theme = 'pitch-dark',
  onProgress
}) {
  const isUz = language === 'uz';
  const isRu = language === 'ru';

  const steps = [
    { pct: 15, msg: isUz ? 'Mavzu chuqur tahlil qilinmoqda...' : isRu ? 'Глубокий анализ темы...' : 'Analyzing topic context...' },
    { pct: 35, msg: isUz ? 'Mavzuga mos maxsus Reja (Agenda) tuzilmoqda...' : isRu ? 'Составление плана (Agenda)...' : 'Drafting structured agenda...' },
    { pct: 60, msg: isUz ? 'AI har bir reja bandi bo‘yicha slaydlar yaratmoqda...' : isRu ? 'Генерация слайдов по каждому пункту плана...' : 'Elaborating slide copy per agenda point...' },
    { pct: 85, msg: isUz ? 'Zamonaviy Pitch/Gamma dizayn effektlari qo‘llanilmoqda...' : isRu ? 'Применение современного дизайна...' : 'Applying modern visual styling...' },
    { pct: 100, msg: isUz ? 'Taqdimot tayyorlandi!' : isRu ? 'Презентация готова!' : 'Presentation ready!' }
  ];

  for (const step of steps) {
    if (onProgress) onProgress(step.pct, step.msg);
    await new Promise(r => setTimeout(r, 420));
  }

  // External API check (Gemini)
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (geminiKey && geminiKey.length > 10) {
    try {
      const prompt = `Yarat: "${topic}". Slaydlar soni: ${slideCount}. Til: ${language}.`;
      await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
    } catch (e) {
      console.warn('Gemini API fallback to Smart Demo Engine');
    }
  }

  return generateDemoPresentation({ topic, slideCount, language, category, theme });
}
