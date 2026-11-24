import React from 'react';
import { THEMES } from '../utils/templates';
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  ChevronRight,
  ArrowUpRight,
  Calendar,
  Check
} from 'lucide-react';

export default function SlideCard({
  slide,
  themeId = 'pitch-dark',
  index = 0,
  totalSlides = 1,
  editable = false,
  onUpdateSlide,
  className = ''
}) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  const activeBg = slide.customBg || theme.bg;

  const handleTitleChange = (e) => {
    if (onUpdateSlide) onUpdateSlide({ ...slide, title: e.target.innerText });
  };

  const handleSubtitleChange = (e) => {
    if (onUpdateSlide) onUpdateSlide({ ...slide, subtitle: e.target.innerText });
  };

  const handleContentChange = (e) => {
    if (onUpdateSlide) onUpdateSlide({ ...slide, content: e.target.innerText });
  };

  const handleBulletChange = (idx, text) => {
    if (onUpdateSlide) {
      const updated = [...(slide.bullets || [])];
      updated[idx] = text;
      onUpdateSlide({ ...slide, bullets: updated });
    }
  };

  return (
    <div
      className={`relative aspect-presentation w-full rounded-2xl overflow-hidden p-6 sm:p-10 flex flex-col justify-between transition-all select-text ${activeBg} ${theme.textPrimary} ${className}`}
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
      }}
    >
      {/* Decorative ambient background blur lights for modern Pitch/Gamma feel */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between opacity-80 text-xs tracking-wider uppercase font-semibold">
        <div className="flex items-center gap-2.5">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide ${theme.badge}`}>
            SLIDE AI
          </span>
          {slide.categoryTag && (
            <span className="text-[11px] font-bold opacity-75">
              {slide.categoryTag}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold opacity-75">
            {index + 1} / {totalSlides}
          </span>
        </div>
      </div>

      {/* MAIN SLIDE BODY */}
      <div className="relative z-10 my-auto py-3">
        {/* LAYOUT 1: HERO TITLE COVER */}
        {slide.layout === 'title' ? (
          <div className="text-center max-w-4xl mx-auto space-y-4">
            {slide.badgeText && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>{slide.badgeText}</span>
              </div>
            )}
            <h1
              contentEditable={editable}
              suppressContentEditableWarning
              onBlur={handleTitleChange}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg p-1"
            >
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={handleSubtitleChange}
                className={`text-xs sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto opacity-90 outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg p-1 ${theme.textSecondary}`}
              >
                {slide.subtitle}
              </p>
            )}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold opacity-80">
              {slide.speaker && (
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-brand-400" />
                  <span>{slide.speaker}</span>
                </div>
              )}
              {slide.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{slide.date}</span>
                </div>
              )}
            </div>
          </div>
        ) : slide.layout === 'agenda' ? (
          /* LAYOUT 2: EXPLICIT REJA / AGENDA (Numbered modern cards) */
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                Bosqichlar
              </span>
              <h2
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={handleTitleChange}
                className="text-xl sm:text-3xl font-extrabold outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg"
              >
                {slide.title || 'Taqdimot Rejasi'}
              </h2>
              {slide.subtitle && (
                <p className={`text-xs sm:text-sm ${theme.textSecondary}`}>
                  {slide.subtitle}
                </p>
              )}
            </div>

            {/* Agenda list cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {(slide.agendaItems || [
                { num: '01', title: 'Kirish', desc: 'Mavzu dolzarbligi' },
                { num: '02', title: 'Tahlil', desc: 'Asosiy tushunchalar' },
                { num: '03', title: 'Statistika', desc: 'Muhim raqamlar' },
                { num: '04', title: 'Yechimlar', desc: 'Amaliy tajriba' },
                { num: '05', title: 'Xulosa', desc: 'Tavsiyalar' }
              ]).map((item, aIdx) => (
                <div
                  key={aIdx}
                  className={`p-4 rounded-2xl ${theme.cardBg} transition-all duration-200 group flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-black text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-lg border border-brand-500/20">
                      {item.num || `0${aIdx + 1}`}
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">{item.title}</h4>
                    <p className={`text-[11px] leading-relaxed line-clamp-2 ${theme.textSecondary}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : slide.layout === 'kpi' ? (
          /* LAYOUT 3: BIG METRICS & KPI NUMBERS */
          <div className="space-y-5 max-w-4xl mx-auto">
            <div className="space-y-1">
              <h2
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={handleTitleChange}
                className="text-xl sm:text-3xl font-extrabold outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg"
              >
                {slide.title}
              </h2>
              {slide.content && (
                <p
                  contentEditable={editable}
                  suppressContentEditableWarning
                  onBlur={handleContentChange}
                  className={`text-xs sm:text-sm ${theme.textSecondary}`}
                >
                  {slide.content}
                </p>
              )}
            </div>

            {/* 3 Large KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(slide.metrics || [
                { value: '+85%', label: 'Samaradorlik' },
                { value: '3.5x', label: 'Tezlashuv' },
                { value: '60%', label: 'Tejalgan vaqt' }
              ]).map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className={`p-5 rounded-2xl ${theme.cardBg} flex flex-col justify-between`}
                >
                  <div className="text-2xl sm:text-4xl font-black tracking-tight text-brand-400 mb-1">
                    {metric.value}
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold ${theme.textSecondary}`}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {slide.bullets && slide.bullets.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {slide.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span
                      contentEditable={editable}
                      suppressContentEditableWarning
                      onBlur={(e) => handleBulletChange(bIdx, e.target.innerText)}
                      className="outline-none"
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : slide.layout === 'grid' ? (
          /* LAYOUT 4: 3-GRID FEATURE CARDS */
          <div className="space-y-5 max-w-4xl mx-auto">
            <div>
              <h2
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={handleTitleChange}
                className="text-xl sm:text-3xl font-extrabold outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg"
              >
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className={`text-xs sm:text-sm mt-1 ${theme.textSecondary}`}>
                  {slide.subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(slide.gridItems || [
                { title: 'Tizimli yondashuv', desc: 'Har bir bosqichning aniq rejalashtirilishi' },
                { title: 'Ilg‘or texnologiya', desc: 'Zamonaviy vositalar integratsiyasi' },
                { title: 'Muvaffaqiyatli yakun', desc: 'O‘lchanadigan yuqori natijadorlik' }
              ]).map((item, gIdx) => (
                <div key={gIdx} className={`p-5 rounded-2xl ${theme.cardBg} space-y-2`}>
                  <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm">
                    {gIdx + 1}
                  </div>
                  <h4 className="text-sm font-bold">{item.title}</h4>
                  <p className={`text-xs leading-relaxed ${theme.textSecondary}`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : slide.layout === 'split' ? (
          /* LAYOUT 5: 2-COLUMN SPLIT WITH HIGHLIGHT */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h2
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={handleTitleChange}
                className="text-lg sm:text-2xl md:text-3xl font-bold outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg p-1"
              >
                {slide.title}
              </h2>
              {slide.content && (
                <p
                  contentEditable={editable}
                  suppressContentEditableWarning
                  onBlur={handleContentChange}
                  className={`text-xs sm:text-sm opacity-90 leading-relaxed outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg p-1 ${theme.textSecondary}`}
                >
                  {slide.content}
                </p>
              )}
              {slide.bullets && (
                <ul className="space-y-2 pt-1 text-xs sm:text-sm">
                  {slide.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 mt-1.5" />
                      <span
                        contentEditable={editable}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBulletChange(bIdx, e.target.innerText)}
                        className="outline-none"
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="md:col-span-5">
              <div className={`p-6 rounded-2xl ${theme.highlightBox || theme.cardBg} space-y-3 shadow-lg`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-400">
                  <Sparkles className="w-4 h-4" />
                  <span>{slide.highlightTitle || 'Asosiy Ko‘rsatkich'}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-95">
                  {slide.highlightText || 'Strategik tahlil va to‘g‘ri yechim natijani bir necha barobarga oshiradi.'}
                </p>
              </div>
            </div>
          </div>
        ) : slide.layout === 'image-text' ? (
          /* LAYOUT 6: IMAGE AND TEXT */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h2
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={handleTitleChange}
                className="text-lg sm:text-2xl md:text-3xl font-bold outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg p-1"
              >
                {slide.title}
              </h2>
              {slide.content && (
                <p
                  contentEditable={editable}
                  suppressContentEditableWarning
                  onBlur={handleContentChange}
                  className={`text-xs sm:text-sm opacity-90 leading-relaxed outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg p-1 ${theme.textSecondary}`}
                >
                  {slide.content}
                </p>
              )}
              {slide.bullets && (
                <ul className="space-y-2 pt-1 text-xs sm:text-sm">
                  {slide.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 mt-1.5" />
                      <span
                        contentEditable={editable}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBulletChange(bIdx, e.target.innerText)}
                        className="outline-none"
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video md:aspect-square bg-slate-900 relative">
                <img
                  src={slide.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ) : (
          /* LAYOUT 7: CONCLUSION & SUMMARY */
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Xulosa va Natijalar</span>
            </div>
            <h2
              contentEditable={editable}
              suppressContentEditableWarning
              onBlur={handleTitleChange}
              className="text-xl sm:text-3xl font-extrabold outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg p-1"
            >
              {slide.title || 'Xulosa'}
            </h2>
            {slide.content && (
              <p
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={handleContentChange}
                className={`text-xs sm:text-base opacity-90 outline-none focus:ring-2 focus:ring-brand-400/50 rounded-lg p-1 ${theme.textSecondary}`}
              >
                {slide.content}
              </p>
            )}

            {slide.bullets && slide.bullets.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
                {slide.bullets.map((bullet, bIdx) => (
                  <div
                    key={bIdx}
                    className={`p-3.5 rounded-xl text-xs sm:text-sm ${theme.cardBg} flex items-start gap-2.5`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span
                      contentEditable={editable}
                      suppressContentEditableWarning
                      onBlur={(e) => handleBulletChange(bIdx, e.target.innerText)}
                      className="outline-none"
                    >
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {slide.footerText && (
              <div className="pt-4">
                <span className="inline-block px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white/10 backdrop-blur-md border border-white/20">
                  {slide.footerText}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Slide Footer */}
      <div className="relative z-10 flex items-center justify-between text-[10px] opacity-60 pt-2 border-t border-white/10">
        <span>SLIDE AI — Zamonaviy Taqdimot Platformasi</span>
        <span>slaydplus.uz</span>
      </div>
    </div>
  );
}
