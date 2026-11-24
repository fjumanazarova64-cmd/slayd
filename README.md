# 🚀 SLIDE AI — Sun’iy Intellekt Taqdimot Yaratish Platformasi

<div align="center">
  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" alt="SLIDE AI Banner" width="100%" style="border-radius: 16px; max-height: 320px; object-fit: cover; margin-bottom: 20px;" />
  <p><strong>SlaydPlus (slaydplus.uz) analogi — O‘zbek tilidagi professional AI taqdimot yaratuvchi SaaS platformasi.</strong></p>
</div>

---

## 🌟 Asosiy Imkoniyatlar

1. **AI Yordamida Tezkor Taqdimot Yaratish**:
   - Mavzuni kiriting va bir necha soniyada to‘liq reja, sarlavhalar, ixcham tezislar va xulosa tayyorlang.
   - Slaydlar soni tanlash: 5, 10, 15 yoki 20 ta slayd.
   - Tilni tanlash: O‘zbekcha (100% tabiiy va orfoepik moslangan), English, Русский.
   - Taqdimot turlari: Ta’limiy, Biznes, Tibbiy, Texnologik, Tarixiy, Boshqa.

2. **Dizayn va Shablonlar**:
   - 5 xil zamonaviy premium ranglar palitrasi (Zamonaviy Ko‘k, Minimal Oq, Binafsha Premium, Zumrad Yashil, Quyosh Shom).
   - Har xil turdagi slayd maketlari (Bosh sahifa/Muqova, Ro‘yxat/Tezislar, 2 ustunli Diqqat karta, Rasm va Matn, Xulosa).

3. **Professional Muharrir (Editor)**:
   - To‘g‘ridan-to‘g‘ri slayd ustiga bosib matn va sarlavhalarni tahrirlash (inline editing).
   - Yangi slayd qo‘shish, o‘chirish, nusxalash va tartibini (yuqoriga/pastga) almashtirish.
   - Rasmlarni Unsplash orqali avtomatik joylash va o‘zgartirish.
   - Katta ekranda slayd-shou (namoyish) rejimi (klaviatura o‘ng/chap tugmalari va to‘liq ekran).

4. **Eksport Funksiyalari**:
   - **PowerPoint (PPTX)**: `pptxgenjs` orqali to‘liq tahrirlanadigan slaydlar (Microsoft PowerPoint, Google Slides, Keynote mos).
   - **PDF**: `jspdf` va `html2canvas` orqali yuqori aniqlikdagi (HD) taqdimot hujjati.

5. **Foydalanuvchi Tizimi va Saqlash**:
   - Ro‘yxatdan o‘tish va tizimga kirish (Supabase orqali bulutli yoki avtomatik LocalStorage orqali demo rejimida ishlaydi).
   - Barcha yaratilgan taqdimotlar shaxsiy kabinetda (Dashboard) saqlanib turadi.

---

## 🛠 Ishlatilgan Texnologiyalar

- **Frontend**: React 18, Vite 6, Tailwind CSS 3
- **Navigatsiya**: React Router v6
- **Ikonkalar**: Lucide React
- **Eksport**: `pptxgenjs`, `jspdf`, `html2canvas`
- **Animatsiyalar**: Canvas-Confetti, Tailwind transitions
- **Backend / DB (Ixtiyoriy)**: Supabase JS SDK (yoki oflayn demo rejimi)
- **AI Integratsiyasi**: Google Gemini API / OpenAI API / Smart Local Demo Engine

---

## 📁 Loyiha Papkalar Tuzilishi

```text
demoooo/
├── public/                 # Statik resurslar
├── src/
│   ├── components/         # Qayta ishlatiluvchi UI komponentlar
│   │   ├── AuthModal.jsx               # Kirish / Ro'yxatdan o'tish modali
│   │   ├── Footer.jsx                  # Sayt podvali
│   │   ├── Navbar.jsx                  # Yuqori navigatsiya paneli
│   │   ├── PresentationViewerModal.jsx # To'liq ekrandagi namoyish (Slide Show)
│   │   ├── SlideCard.jsx               # Slayd kartasi va maketlar rendereri
│   │   └── SlideThemePicker.jsx        # Ranglar palitrasi tanlagichi
│   ├── context/            # React Context ma'lumotlar boshqaruvi
│   │   ├── AuthContext.jsx             # Foydalanuvchi sessiyasi (Supabase/Local)
│   │   └── PresentationContext.jsx     # Taqdimotlarni saqlash va boshqarish
│   ├── pages/              # Asosiy sahifalar
│   │   ├── CreatePage.jsx              # AI taqdimot yaratish formasi & progress
│   │   ├── DashboardPage.jsx           # Mening taqdimotlarim shaxsiy kabineti
│   │   ├── EditorPage.jsx              # Taqdimot muharriri (chap/o'rta/o'ng panel)
│   │   ├── FeaturesPage.jsx            # Imkoniyatlar sahifasi
│   │   ├── HelpPage.jsx                # Yordam va FAQ sahifasi
│   │   ├── HomePage.jsx                # Bosh sahifa (Hero, Namunalar, CTA)
│   │   └── NotFoundPage.jsx            # 404 xatolik sahifasi
│   ├── services/           # Xizmatlar va eksport
│   │   ├── aiService.js                # AI generator (Gemini / OpenAI / Demo)
│   │   ├── exportPdf.js                # PDF formatga yuklash
│   │   ├── exportPptx.js               # PPTX PowerPoint formatga yuklash
│   │   └── supabaseClient.js           # Supabase mijozi
│   ├── styles/
│   │   └── index.css                   # Tailwind va maxsus stillar
│   ├── utils/
│   │   ├── defaultSlides.js            # Boshlang'ich namunaviy taqdimot
│   │   └── templates.js                # Mavzular, toifalar va tillar
│   ├── App.jsx             # Asosiy marshrutlash (Routes)
│   └── main.jsx            # Ilova kirish nuqtasi
├── .env.example            # Muhit sozlamalari namunasi
├── index.html              # Asosiy HTML hujjati
├── package.json            # Kutubxonalar ro'yxati
├── postcss.config.js       # PostCSS sozlamasi
├── tailwind.config.js      # Tailwind konfiguratsiyasi
├── vercel.json             # Vercel SPA routing sozlamasi
└── vite.config.js          # Vite konfiguratsiyasi
```

---

## ⚡ VS Code’da Ishga Tushirish Bo‘yicha Yo‘riqnoma

1. **Terminalni oching va qaramliklarni o‘rnating** (agar o‘rnatilmagan bo‘lsa):
   ```bash
   npm install
   ```

2. **Loyihani ishlab chiqish (Development) rejimida ishga tushiring**:
   ```bash
   npm run dev
   ```

3. Brauzeringizda oching:
   ```
   http://localhost:3000
   ```

---

## 🔑 AI API va Supabase Sozlash (Ixtiyoriy)

Loyiha **hech qanday API kalitsiz ham 100% to‘liq ishlaydi** (o‘rnatilgan intellektual generator mavjud).
Agar xohlasangiz, `.env` fayl yarating va quyidagi kalitlarni kiriting:

```env
# Google Gemini API (Ixtiyoriy)
VITE_GEMINI_API_KEY=AIzaSy...

# Supabase (Ixtiyoriy)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

---

## 🌐 GitHub va Vercel’ga Joylashtirish (Deploy)

### 1. GitHub’ga yuklash:
```bash
git init
git add .
git commit -m "Initial commit: SLIDE AI platform"
git branch -M main
git remote add origin https://github.com/sizning-username/slide-ai.git
git push -u origin main
```

### 2. Vercel’ga ulash:
1. [vercel.com](https://vercel.com) ga kiring.
2. "Add New Project" tugmasini bosing va GitHub dagi `slide-ai` repozitoriyasini tanlang.
3. Framework: **Vite** avtomatik aniqlanadi.
4. "Deploy" tugmasini bosing. Loyihangiz bir necha daqiqada butun dunyo uchun ochiq ishga tushadi!

---

## 📬 Bog‘lanish va Aloqa

- **Telegram**: [@l9farangiz](https://t.me/l9farangiz)
- **Elektron pochta**: [fjumanazarova64@gmail.com](mailto:fjumanazarova64@gmail.com)

---

© 2026 SLIDE AI. O‘zbekiston.
