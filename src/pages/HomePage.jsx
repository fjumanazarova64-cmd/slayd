import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Download,
  Edit3,
  Layers,
  Crown,
  FileDown,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, LANGUAGES, SLIDE_COUNTS } from '../utils/templates';
import { SAMPLE_PRESENTATIONS } from '../utils/defaultSlides';
import SlideCard from '../components/SlideCard';

export default function HomePage() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState(5);
  const [language, setLanguage] = useState(lang || 'uz');
  const [category, setCategory] = useState('tech');

  const samplePres = SAMPLE_PRESENTATIONS[0];
  const [previewSlideIdx, setPreviewSlideIdx] = useState(0);

  const handleStartGeneration = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    navigate('/create', {
      state: {
        prefilledTopic: topic,
        prefilledCount: slideCount,
        prefilledLang: language,
        prefilledCat: category
      }
    });
  };

  const sampleTopics = [
    'Sun’iy Intellekt va Kelajak Kasblari',
    'Startap loyihani noldan ishga tushirish',
    'Zamonaviy tibbiyotda gen muhandisligi',
    'Amir Temur davlati va diplomatiyasi',
    'Kiberxavfsizlik asoslari va shaxsiy ma’lumotlar'
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-gradient-to-tr from-brand-400/20 via-accent-500/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs sm:text-sm font-semibold shadow-sm animate-pulse-glow">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>{t.home.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.home.heroTitle1} <br />
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 bg-clip-text text-transparent">
              {t.home.heroTitle2}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.home.heroDesc}
          </p>
        </div>

        {/* Hero Generator Card */}
        <div className="mt-10 max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 relative">
          <form onSubmit={handleStartGeneration} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.home.topicLabel}
              </label>
              <textarea
                rows={3}
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.home.topicPlaceholder}
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400 text-sm sm:text-base resize-none"
              />
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">{t.home.samples}</span>
              {sampleTopics.slice(0, 3).map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopic(item)}
                  className="text-xs bg-slate-50 hover:bg-brand-50 hover:text-brand-600 border border-slate-200/60 px-2.5 py-1 rounded-lg text-slate-600 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {t.home.slideCount}
                </label>
                <select
                  value={slideCount}
                  onChange={(e) => setSlideCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700"
                >
                  {SLIDE_COUNTS.map(count => (
                    <option key={count} value={count}>{count} {t.home.slidesUnit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {t.home.language}
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700"
                >
                  {LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {t.home.category}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 hover:from-brand-700 hover:to-accent-700 shadow-float hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-5 h-5" />
              <span>{t.home.createBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Live Presentation Preview Showcase */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">
              {t.home.previewTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.home.previewSubtitle}
            </p>
          </div>

          <div className="bg-slate-900/5 p-3 sm:p-5 rounded-3xl border border-slate-200/70 shadow-card">
            <SlideCard
              slide={samplePres.slides[previewSlideIdx]}
              themeId={samplePres.theme}
              index={previewSlideIdx}
              totalSlides={samplePres.slides.length}
              editable={false}
            />

            <div className="flex items-center justify-center gap-2 mt-4 overflow-x-auto py-1">
              {samplePres.slides.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setPreviewSlideIdx(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    previewSlideIdx === idx
                      ? 'bg-brand-600 text-white shadow'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  #{idx + 1}
                </button>
              ))}

              <Link
                to={`/editor/${samplePres.id}`}
                className="ml-3 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold border border-emerald-200"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {t.home.openEditor}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            {t.home.howItWorksBadge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            {t.home.howItWorksTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.home.howItWorksDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-soft group hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-black text-2xl mb-6">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.home.step1Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.home.step1Desc}</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-soft group hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-2xl mb-6">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.home.step2Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.home.step2Desc}</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-soft group hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-2xl mb-6">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.home.step3Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.home.step3Desc}</p>
          </div>
        </div>
      </section>

      {/* Pricing / PRO Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-white/10">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Crown className="w-3.5 h-3.5" />
              <span>SLIDE AI PRO</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Cheksiz slaydlar, maxsus fonlar va PPTX eksport
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Click, Payme va Uzum orqali oson to‘lang. Talabalar va mutaxassislar uchun maxsus narxlar.
            </p>
          </div>

          <Link
            to="/pricing"
            className="px-6 py-3.5 rounded-2xl font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg text-sm shrink-0 flex items-center gap-2"
          >
            <span>Tariflarni ko‘rish</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
