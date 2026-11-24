import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Save,
  Download,
  Play,
  Plus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Palette,
  Layout,
  Type,
  Image as ImageIcon,
  Check,
  ChevronLeft,
  FileDown,
  Sparkles,
  Loader2,
  Crown,
  Wand2,
  Layers,
  HelpCircle
} from 'lucide-react';
import { usePresentations } from '../context/PresentationContext';
import { useLanguage } from '../context/LanguageContext';
import { THEMES } from '../utils/templates';
import SlideCard from '../components/SlideCard';
import PresentationViewerModal from '../components/PresentationViewerModal';
import PaymentModal from '../components/PaymentModal';
import { exportToPptx } from '../services/exportPptx';
import { exportToPdf } from '../services/exportPdf';

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPresentationById, savePresentation } = usePresentations();
  const { t, lang } = useLanguage();

  const [presentation, setPresentation] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showViewer, setShowViewer] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('layout'); // 'layout' | 'content' | 'bg' | 'ai'
  const [isExportingPptx, setIsExportingPptx] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isAiWorking, setIsAiWorking] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const slideCaptureRef = useRef(null);
  const isPro = localStorage.getItem('slide_ai_is_pro') === 'true';

  useEffect(() => {
    const found = getPresentationById(id);
    if (found) {
      setPresentation(JSON.parse(JSON.stringify(found)));
    } else {
      navigate('/dashboard');
    }
  }, [id]);

  if (!presentation) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  const slides = presentation.slides || [];
  const currentSlide = slides[activeSlideIndex] || slides[0];

  // Slide CRUD Actions
  const handleUpdateCurrentSlide = (updatedSlide) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex] = updatedSlide;
    setPresentation({ ...presentation, slides: newSlides });
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: `slide-new-${Date.now()}`,
      layout: 'grid',
      title: 'Yangi Slayd Sarlavhasi',
      subtitle: 'Qisqacha tavsif',
      content: 'Bu yerga slayd haqida ma’lumot yozing.',
      bullets: [
        'Birinchi muhim fikr',
        'Ikkinchi dolzarb yo‘nalish',
        'Kutilayotgan natijalar'
      ]
    };
    const newSlides = [...slides, newSlide];
    setPresentation({ ...presentation, slides: newSlides });
    setActiveSlideIndex(newSlides.length - 1);
  };

  const handleDuplicateSlide = (idx) => {
    const target = slides[idx];
    const duplicated = {
      ...JSON.parse(JSON.stringify(target)),
      id: `slide-dup-${Date.now()}`,
      title: `${target.title} (Nusxa)`
    };
    const newSlides = [...slides];
    newSlides.splice(idx + 1, 0, duplicated);
    setPresentation({ ...presentation, slides: newSlides });
    setActiveSlideIndex(idx + 1);
  };

  const handleDeleteSlide = (idx) => {
    if (slides.length <= 1) {
      alert('Taqdimotda kamida 1 ta slayd bo‘lishi kerak!');
      return;
    }
    const newSlides = slides.filter((_, i) => i !== idx);
    setPresentation({ ...presentation, slides: newSlides });
    if (activeSlideIndex >= newSlides.length) {
      setActiveSlideIndex(newSlides.length - 1);
    }
  };

  const handleMoveSlide = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= slides.length) return;
    const newSlides = [...slides];
    const temp = newSlides[idx];
    newSlides[idx] = newSlides[targetIdx];
    newSlides[targetIdx] = temp;
    setPresentation({ ...presentation, slides: newSlides });
    setActiveSlideIndex(targetIdx);
  };

  // Background Customization
  const handleApplyTheme = (themeId, applyToAll = false) => {
    if (applyToAll) {
      const updatedSlides = slides.map(s => ({ ...s, customBg: null }));
      setPresentation({ ...presentation, theme: themeId, slides: updatedSlides });
    } else {
      const themeObj = THEMES.find(t => t.id === themeId);
      handleUpdateCurrentSlide({ ...currentSlide, customBg: themeObj?.bg });
    }
  };

  const handleCustomSolidBg = (colorClass, applyToAll = false) => {
    if (applyToAll) {
      const updatedSlides = slides.map(s => ({ ...s, customBg: colorClass }));
      setPresentation({ ...presentation, slides: updatedSlides });
    } else {
      handleUpdateCurrentSlide({ ...currentSlide, customBg: colorClass });
    }
  };

  // AI Assistant helpers
  const handleAiExpand = () => {
    setIsAiWorking(true);
    setTimeout(() => {
      const existing = currentSlide.bullets || [];
      const newItems = [
        'Amaliyotga tatbiq etish mexanizmini bosqichma-bosqich takomillashtirish',
        'Zamonaviy monitoring tizimini joriy etish orqali xavflarni minimallashtirish'
      ];
      handleUpdateCurrentSlide({
        ...currentSlide,
        bullets: [...existing, ...newItems],
        content: `${currentSlide.content || ''} Ushbu yo‘nalish chuqur strategik tahlil va innovatsion vositalarni talab qiladi.`
      });
      setIsAiWorking(false);
    }, 700);
  };

  const handleAiSummary = () => {
    setIsAiWorking(true);
    setTimeout(() => {
      handleUpdateCurrentSlide({
        ...currentSlide,
        highlightTitle: 'AI Xulosasi',
        highlightText: 'Asosiy maqsad — jarayonlarni to‘liq optimallashtirish va samaradorlikni 2x ga oshirish.'
      });
      setIsAiWorking(false);
    }, 600);
  };

  const handleSave = () => {
    savePresentation(presentation);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Export PPTX
  const handleExportPptx = async () => {
    setIsExportingPptx(true);
    try {
      await exportToPptx(presentation);
    } catch (e) {
      alert('PPTX fayl yaratishda xatolik: ' + e.message);
    } finally {
      setIsExportingPptx(false);
    }
  };

  // Export PDF
  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    try {
      if (slideCaptureRef.current) {
        const slideNodes = slideCaptureRef.current.querySelectorAll('.slide-capture-node');
        await exportToPdf(Array.from(slideNodes), presentation.title);
      }
    } catch (e) {
      alert('PDF yaratishda xatolik: ' + e.message);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const layoutOptions = [
    { id: 'title', label: 'Bosh Sarlavha (Muqova)' },
    { id: 'agenda', label: 'Reja / Agenda (Bosqichlar)' },
    { id: 'kpi', label: 'Katta Statistika / KPI' },
    { id: 'grid', label: '3-ustunli Kartalar' },
    { id: 'split', label: '2-ustunli / Diqqat karta' },
    { id: 'image-text', label: 'Rasm va Matn' },
    { id: 'conclusion', label: 'Xulosa & Minnatdorlik' }
  ];

  const solidBgs = [
    { label: 'Pitch Dark', class: 'bg-[#0B0F19]' },
    { label: 'Deep Blue', class: 'bg-[#0A1128]' },
    { label: 'Deep Purple', class: 'bg-[#180A2E]' },
    { label: 'Emerald Deep', class: 'bg-[#042016]' },
    { label: 'Sunset Crimson', class: 'bg-[#260B08]' },
    { label: 'Pure Slate', class: 'bg-slate-900' }
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-100 overflow-hidden">
      {/* Top Action Header Bar */}
      <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            title="Taqdimotlar ro‘yxati"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <input
              type="text"
              value={presentation.title}
              onChange={(e) => setPresentation({ ...presentation, title: e.target.value })}
              className="font-bold text-sm sm:text-base text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:outline-none px-1"
            />
            <span className="text-[10px] text-slate-400 px-1">
              {slides.length} {t.editor.slidesCount} • Barcha o‘zgarishlar saqlanadi
            </span>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {!isPro && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>PRO ga o‘tish</span>
            </button>
          )}

          <button
            onClick={() => setShowViewer(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.editor.fullscreen}</span>
          </button>

          {/* Export PDF */}
          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors disabled:opacity-50"
            title="PDF formatida yuklab olish"
          >
            {isExportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
            <span>PDF</span>
          </button>

          {/* Export PPTX */}
          <button
            onClick={handleExportPptx}
            disabled={isExportingPptx}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors disabled:opacity-50"
            title="PowerPoint PPTX yuklab olish"
          >
            {isExportingPptx ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span>PPTX</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              saveSuccess ? 'bg-emerald-600 text-white' : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
            }`}
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>{t.editor.saved}</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{t.editor.save}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR: Slide Thumbnails */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.editor.slidesList} ({slides.length})
            </span>
            <button
              onClick={handleAddSlide}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-brand-50 text-brand-700 hover:bg-brand-100"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.editor.addSlide}</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {slides.map((s, idx) => (
              <div
                key={s.id || idx}
                onClick={() => setActiveSlideIndex(idx)}
                className={`group relative p-2 rounded-xl border-2 cursor-pointer transition-all ${
                  activeSlideIndex === idx
                    ? 'border-brand-600 bg-brand-50/50 shadow-md ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                  <span>#{idx + 1} • {s.layout?.toUpperCase()}</span>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleMoveSlide(idx, -1); }}
                      disabled={idx === 0}
                      className="p-1 hover:text-brand-600 disabled:opacity-20"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleMoveSlide(idx, 1); }}
                      disabled={idx === slides.length - 1}
                      className="p-1 hover:text-brand-600 disabled:opacity-20"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDuplicateSlide(idx); }}
                      className="p-1 hover:text-brand-600"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteSlide(idx); }}
                      className="p-1 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden pointer-events-none transform scale-[0.98] origin-top">
                  <SlideCard
                    slide={s}
                    themeId={presentation.theme}
                    index={idx}
                    totalSlides={slides.length}
                    editable={false}
                    className="!p-3 !aspect-presentation !text-[6px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER CANVAS */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="w-full max-w-4xl relative">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">
                Matn ustiga bosib bevosita tahrirlashingiz mumkin (Gamma/Pitch uslubi)
              </span>
              <span className="font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                16:9 HD Formati
              </span>
            </div>

            {/* Active Slide Canvas */}
            <div className="shadow-2xl rounded-2xl overflow-hidden ring-1 ring-slate-900/10">
              <SlideCard
                slide={currentSlide}
                themeId={presentation.theme}
                index={activeSlideIndex}
                totalSlides={slides.length}
                editable={true}
                onUpdateSlide={handleUpdateCurrentSlide}
              />
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR: Inspector, Background, AI */}
        <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            {[
              { id: 'layout', label: t.editor.tabLayout },
              { id: 'bg', label: t.editor.tabStyle },
              { id: 'content', label: t.editor.tabContent },
              { id: 'ai', label: 'AI ✨' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-600 text-brand-600 bg-brand-50/30'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* TAB 1: LAYOUT */}
            {activeTab === 'layout' && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t.editor.layoutTitle}
                </label>
                <div className="space-y-2">
                  {layoutOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleUpdateCurrentSlide({ ...currentSlide, layout: opt.id })}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                        currentSlide.layout === opt.id
                          ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {currentSlide.layout === opt.id && <Check className="w-4 h-4 text-brand-600" />}
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Slayd rasmi (URL)
                  </label>
                  <input
                    type="url"
                    value={currentSlide.imageUrl || ''}
                    onChange={(e) => handleUpdateCurrentSlide({ ...currentSlide, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: BACKGROUND & STYLES (User explicit requirement) */}
            {activeTab === 'bg' && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t.editor.bgGradients}
                    </label>
                    <button
                      type="button"
                      onClick={() => handleApplyTheme(presentation.theme, true)}
                      className="text-[11px] font-bold text-brand-600 hover:underline"
                    >
                      {t.editor.bgApplyAll}
                    </button>
                  </div>

                  <div className="space-y-2">
                    {THEMES.map((th) => (
                      <button
                        key={th.id}
                        onClick={() => handleApplyTheme(th.id, false)}
                        className={`w-full p-2.5 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                          presentation.theme === th.id
                            ? 'border-brand-600 ring-2 ring-brand-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg ${th.bg} shadow-sm border border-white/20`} />
                          <span className="text-xs font-bold text-slate-800">{th.name}</span>
                        </div>
                        {presentation.theme === th.id && (
                          <Check className="w-4 h-4 text-brand-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.editor.bgSolid}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {solidBgs.map((sb, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCustomSolidBg(sb.class, false)}
                        className={`h-10 rounded-xl ${sb.class} border border-white/20 hover:scale-105 transition-transform flex items-center justify-center`}
                        title={sb.label}
                      >
                        {currentSlide.customBg === sb.class && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CONTENT */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.editor.titleInput}
                  </label>
                  <input
                    type="text"
                    value={currentSlide.title || ''}
                    onChange={(e) => handleUpdateCurrentSlide({ ...currentSlide, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.editor.contentInput}
                  </label>
                  <textarea
                    rows={3}
                    value={currentSlide.content || ''}
                    onChange={(e) => handleUpdateCurrentSlide({ ...currentSlide, content: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                {currentSlide.bullets && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {t.editor.bulletsTitle}
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(currentSlide.bullets || []), 'Yangi band'];
                          handleUpdateCurrentSlide({ ...currentSlide, bullets: updated });
                        }}
                        className="text-[11px] font-bold text-brand-600 hover:underline"
                      >
                        {t.editor.addBullet}
                      </button>
                    </div>
                    <div className="space-y-2">
                      {currentSlide.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={b}
                            onChange={(e) => {
                              const updated = [...currentSlide.bullets];
                              updated[bIdx] = e.target.value;
                              handleUpdateCurrentSlide({ ...currentSlide, bullets: updated });
                            }}
                            className="flex-1 p-2 rounded-lg border border-slate-200 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = currentSlide.bullets.filter((_, i) => i !== bIdx);
                              handleUpdateCurrentSlide({ ...currentSlide, bullets: updated });
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: AI ASSISTANT */}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 border border-brand-200/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-brand-900">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span>AI Yordamchi Vositalari</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Slayddagi matnlarni bir klik bilan kengaytiring, xulosalang yoki yangi g‘oyalar qo‘shing.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleAiExpand}
                    disabled={isAiWorking}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-left text-xs font-bold text-slate-800 flex items-center justify-between transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-purple-600" />
                      <span>{t.editor.aiExpand}</span>
                    </div>
                    {isAiWorking && <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />}
                  </button>

                  <button
                    onClick={handleAiSummary}
                    disabled={isAiWorking}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-left text-xs font-bold text-slate-800 flex items-center justify-between transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-600" />
                      <span>{t.editor.aiSummary}</span>
                    </div>
                    {isAiWorking && <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-600" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Hidden Container for HD PDF slide capture */}
      <div
        ref={slideCaptureRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '-9999px',
          width: '1280px',
          pointerEvents: 'none'
        }}
      >
        {slides.map((s, idx) => (
          <div key={idx} className="slide-capture-node" style={{ width: '1280px', height: '720px' }}>
            <SlideCard
              slide={s}
              themeId={presentation.theme}
              index={idx}
              totalSlides={slides.length}
              editable={false}
              className="!w-[1280px] !h-[720px] !rounded-none"
            />
          </div>
        ))}
      </div>

      {showViewer && (
        <PresentationViewerModal
          presentation={presentation}
          initialSlideIndex={activeSlideIndex}
          onClose={() => setShowViewer(false)}
        />
      )}

      {showUpgradeModal && (
        <PaymentModal
          onClose={() => setShowUpgradeModal(false)}
          onSuccess={() => setShowUpgradeModal(false)}
        />
      )}
    </div>
  );
}
