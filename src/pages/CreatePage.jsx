import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Layers,
  Globe,
  LayoutGrid,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, LANGUAGES, SLIDE_COUNTS, THEMES } from '../utils/templates';
import SlideThemePicker from '../components/SlideThemePicker';
import { generatePresentation } from '../services/aiService';
import { usePresentations } from '../context/PresentationContext';

export default function CreatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { savePresentation } = usePresentations();

  const state = location.state || {};
  const [topic, setTopic] = useState(state.prefilledTopic || '');
  const [title, setTitle] = useState(state.prefilledTopic || '');
  const [slideCount, setSlideCount] = useState(state.prefilledCount || 5);
  const [language, setLanguage] = useState(state.prefilledLang || lang || 'uz');
  const [category, setCategory] = useState(state.prefilledCat || 'tech');
  const [theme, setTheme] = useState('pitch-dark');

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (topic && !title) {
      setTitle(topic);
    }
  }, [topic]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setProgress(5);
    setStatusMessage('Tayyorgarlik ko‘rilmoqda...');

    try {
      const presentation = await generatePresentation({
        topic: topic.trim(),
        slideCount,
        language,
        category,
        theme,
        onProgress: (pct, msg) => {
          setProgress(pct);
          setStatusMessage(msg);
        }
      });

      if (title.trim()) {
        presentation.title = title.trim();
        if (presentation.slides[0]) {
          presentation.slides[0].title = title.trim();
        }
      }

      savePresentation(presentation);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate(`/editor/${presentation.id}`);
      }, 700);
    } catch (err) {
      console.error(err);
      alert('Taqdimot yaratishda xatolik yuz berdi. Iltimos qayta urinib ko‘ring.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.create.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.create.title}
        </h1>
        <p className="text-sm text-slate-500">
          {t.create.desc}
        </p>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-100">
        <form onSubmit={handleGenerate} className="space-y-8">
          {/* Topic & Title */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.create.topicLabel}
              </label>
              <textarea
                rows={3}
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.create.topicPlaceholder}
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400 text-sm sm:text-base resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.create.nameLabel}
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.create.namePlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Slide Count, Language & Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-brand-600" />
                <span>{t.create.slideCountLabel}</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {SLIDE_COUNTS.map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setSlideCount(cnt)}
                    className={`py-2.5 text-center rounded-xl text-sm font-bold border transition-all ${
                      slideCount === cnt
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-brand-600" />
                <span>{t.create.languageLabel}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    className={`py-2.5 px-1 text-center rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                      language === l.code
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span className="truncate">{l.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <LayoutGrid className="w-4 h-4 text-brand-600" />
                <span>{t.create.categoryLabel}</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Theme picker */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              {t.create.themeLabel}
            </label>
            <SlideThemePicker selectedTheme={theme} onSelectTheme={setTheme} />
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 hover:from-brand-700 hover:to-accent-700 shadow-float hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              <span>{t.create.submitBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Progress & Generation Modal */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-100 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/30">
              <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {t.create.generatingTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {statusMessage || t.create.generatingWait}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-gradient-to-r from-brand-600 to-accent-600 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>SLIDE AI Intelligent Outline Engine</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
