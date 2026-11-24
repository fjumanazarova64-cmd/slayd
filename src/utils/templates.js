export const THEMES = [
  {
    id: 'pitch-dark',
    name: 'Pitch Qora (Zamonaviy)',
    description: 'Pitch.com va Gamma uslubidagi qora gradient va shisha effektlar',
    bg: 'bg-gradient-to-br from-slate-950 via-[#0B0F19] to-slate-900',
    cardBg: 'bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] hover:border-white/25',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-400',
    accent: 'bg-blue-600 text-white',
    badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    highlightBox: 'bg-gradient-to-br from-blue-950/40 to-indigo-950/40 border border-blue-500/30',
    pptx: {
      bgColor: '0B0F19',
      titleColor: 'FFFFFF',
      bodyColor: '94A3B8',
      accentColor: '3B82F6',
      cardBgColor: '1E293B'
    }
  },
  {
    id: 'aurora-violet',
    name: 'Aurora Binafsha',
    description: 'Yumshoq binafsha va pushti neon nurlari bilan boyitilgan zamonaviy fon',
    bg: 'bg-gradient-to-br from-[#12072B] via-[#1D0C3E] to-[#0A0318]',
    cardBg: 'bg-purple-950/30 backdrop-blur-xl border border-purple-500/25 hover:border-purple-400/40',
    textPrimary: 'text-white',
    textSecondary: 'text-purple-200/70',
    accent: 'bg-purple-600 text-white',
    badge: 'bg-purple-500/25 text-purple-300 border border-purple-400/40',
    highlightBox: 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30',
    pptx: {
      bgColor: '12072B',
      titleColor: 'FFFFFF',
      bodyColor: 'E9D5FF',
      accentColor: 'A855F7',
      cardBgColor: '2A134E'
    }
  },
  {
    id: 'clean-minimal',
    name: 'Minimal Oq (Studiya)',
    description: 'Toza, yorug‘ va o‘qishga nihoyatda qulay zamonaviy oq dizayn',
    bg: 'bg-gradient-to-br from-white via-slate-50 to-blue-50/30',
    cardBg: 'bg-white/80 backdrop-blur-md shadow-card border border-slate-200/90 hover:border-brand-300',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accent: 'bg-brand-600 text-white',
    badge: 'bg-brand-50 text-brand-700 border border-brand-200',
    highlightBox: 'bg-blue-50/70 border border-blue-200',
    pptx: {
      bgColor: 'FFFFFF',
      titleColor: '0F172A',
      bodyColor: '475569',
      accentColor: '2563EB',
      cardBgColor: 'F1F5F9'
    }
  },
  {
    id: 'emerald-matrix',
    name: 'Zumrad FinTech',
    description: 'Biznes, moliyaviy texnologiyalar va o‘sish uchun jozibali zumrad rang',
    bg: 'bg-gradient-to-br from-[#021A12] via-[#04281C] to-[#010F0A]',
    cardBg: 'bg-emerald-950/30 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-400/40',
    textPrimary: 'text-white',
    textSecondary: 'text-emerald-200/70',
    accent: 'bg-emerald-500 text-white',
    badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    highlightBox: 'bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-500/30',
    pptx: {
      bgColor: '021A12',
      titleColor: 'FFFFFF',
      bodyColor: 'A7F3D0',
      accentColor: '10B981',
      cardBgColor: '0B3C2D'
    }
  },
  {
    id: 'sunset-amber',
    name: 'Shom Kahrabo',
    description: 'Issiq kahrabo va to‘q qizil gradientlar, ijodiy va marketing taqdimotlari',
    bg: 'bg-gradient-to-br from-[#200A05] via-[#2F1108] to-[#120502]',
    cardBg: 'bg-orange-950/30 backdrop-blur-xl border border-orange-500/20 hover:border-orange-400/40',
    textPrimary: 'text-white',
    textSecondary: 'text-orange-200/70',
    accent: 'bg-orange-500 text-white',
    badge: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    highlightBox: 'bg-gradient-to-br from-orange-950/40 to-amber-950/40 border border-orange-500/30',
    pptx: {
      bgColor: '200A05',
      titleColor: 'FFFFFF',
      bodyColor: 'FED7AA',
      accentColor: 'F97316',
      cardBgColor: '38160B'
    }
  },
  {
    id: 'cyber-neon',
    name: 'Cyberpunk Neon',
    description: 'IT, kiberxavfsizlik va startaplar uchun to‘q ko‘k va firuza neon uyg‘unligi',
    bg: 'bg-gradient-to-br from-[#060D1F] via-[#091535] to-[#040814]',
    cardBg: 'bg-cyan-950/20 backdrop-blur-xl border border-cyan-500/25 hover:border-cyan-400/40',
    textPrimary: 'text-white',
    textSecondary: 'text-cyan-200/70',
    accent: 'bg-cyan-500 text-slate-950',
    badge: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30',
    highlightBox: 'bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-500/30',
    pptx: {
      bgColor: '060D1F',
      titleColor: 'FFFFFF',
      bodyColor: 'A5F3FC',
      accentColor: '06B6D4',
      cardBgColor: '0F2347'
    }
  }
];

export const CATEGORIES = [
  { id: 'education', name: 'Ta’limiy', icon: 'GraduationCap', desc: 'Darslar, ma’ruzalar, diplom va ilmiy ishlar' },
  { id: 'business', name: 'Biznes & Startap', icon: 'Briefcase', desc: 'Sarmoya, hisobotlar va strategiya' },
  { id: 'medical', name: 'Tibbiyot', icon: 'HeartPulse', desc: 'Sog‘liqni saqlash va farmatsevtika' },
  { id: 'tech', name: 'IT & Texnologiya', icon: 'Cpu', desc: 'Dasturlash, AI, kiberxavfsizlik va innovatsiyalar' },
  { id: 'history', name: 'Tarixiy & Madaniy', icon: 'History', desc: 'Tarix, shaxslar va madaniy meros' },
  { id: 'other', name: 'Umumiy / Boshqa', icon: 'Sparkles', desc: 'Har qanday erkin mavzular va g‘oyalar' }
];

export const LANGUAGES = [
  { code: 'uz', name: 'O‘zbekcha', flag: '🇺🇿' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
];

export const SLIDE_COUNTS = [5, 10, 15, 20];

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Boshlang‘ich',
    price: '0',
    period: 'doimiy bepul',
    description: 'Taqdimotlarni sinab ko‘rish va kichik loyihalar uchun',
    badge: 'Bepul',
    features: [
      '3 tagacha taqdimot saqlash',
      'Bir taqdimotda 5 tagacha slayd',
      'Standart AI generatsiyasi',
      'PDF yuklab olish',
      'Standart dizayn shablonlari'
    ],
    buttonText: 'Hozirgi tarif',
    popular: false,
    highlight: false
  },
  {
    id: 'pro',
    name: 'SLIDE AI PRO',
    price: '49,000',
    currency: 'so‘m',
    period: 'oyiga',
    yearlyPrice: '390,000 so‘m / yiliga (35% chegirma)',
    description: 'Talabalar, o‘qituvchilar va ma’ruzachilar uchun eng zo‘r tanlov',
    badge: 'Eng Ommabop 🔥',
    features: [
      'Cheksiz taqdimotlar yaratish',
      '20 tagacha slayd yaratish imkoni',
      'Avtomatik chuqur Reja (Agenda) tuzish',
      'PowerPoint (PPTX) to‘liq tahrirlanadigan eksport',
      'Yuqori sifatli HD/4K PDF yuklash',
      'Barcha premium fonlar va shablonlar',
      'Suv belgisisiz (No watermark)',
      'AI bilan matnlarni boyitish vositasi'
    ],
    buttonText: 'PRO ga o‘tish',
    popular: true,
    highlight: true
  },
  {
    id: 'business',
    name: 'Biznes / Jamoa',
    price: '119,000',
    currency: 'so‘m',
    period: 'oyiga',
    yearlyPrice: '990,000 so‘m / yiliga',
    description: 'Kompaniyalar, agentliklar va jamoalar uchun',
    badge: 'Cheksiz Imkoniyat',
    features: [
      'Barcha PRO imkoniyatlari',
      '5 tagacha jamoa a’zolari',
      'Kompaniya logotipi va shaxsiy brendingi',
      'Shaxsiy AI model (Google Gemini 1.5 Pro / Claude)',
      '24/7 shaxsiy menejer va ustuvor qo‘llab-quvvatlash',
      'API orqali avtomatlashtirish'
    ],
    buttonText: 'Biznes tarifini tanlash',
    popular: false,
    highlight: false
  }
];
