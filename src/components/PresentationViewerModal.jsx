import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import SlideCard from './SlideCard';

export default function PresentationViewerModal({ presentation, initialSlideIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = presentation?.slides || [];
  const currentSlide = slides[currentIndex];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, slides.length]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fadeIn select-none">
      {/* Top Controls */}
      <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">{presentation.title}</span>
          <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full text-slate-300">
            {currentIndex + 1} / {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="To'liq ekran"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors"
            title="Yopish (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 flex items-center justify-center py-6 px-2 sm:px-12 relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 disabled:hover:bg-white/10 transition-all"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* The Slide */}
        <div className="w-full max-w-5xl shadow-2xl">
          {currentSlide && (
            <SlideCard
              slide={currentSlide}
              themeId={presentation.theme}
              index={currentIndex}
              totalSlides={slides.length}
              editable={false}
            />
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentIndex === slides.length - 1}
          className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 disabled:hover:bg-white/10 transition-all"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Bottom Thumbnails navigation bar */}
      <div className="pt-4 flex items-center justify-center gap-2 overflow-x-auto max-w-3xl mx-auto py-2">
        {slides.map((s, idx) => (
          <button
            key={s.id || idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-14 h-9 rounded-md border text-[10px] font-bold transition-all flex items-center justify-center ${
              currentIndex === idx
                ? 'border-brand-500 bg-brand-500 text-white scale-110 shadow-lg'
                : 'border-white/20 bg-white/5 text-slate-300 hover:bg-white/15'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
