import React from 'react';
import { THEMES } from '../utils/templates';
import { Check } from 'lucide-react';

export default function SlideThemePicker({ selectedTheme, onSelectTheme }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {THEMES.map((theme) => {
        const isSelected = selectedTheme === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelectTheme(theme.id)}
            className={`group relative rounded-xl p-3 text-left border-2 transition-all flex flex-col justify-between overflow-hidden h-28 ${
              isSelected
                ? 'border-brand-600 ring-2 ring-brand-500/20 shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Visual gradient swatch background */}
            <div className={`absolute inset-0 ${theme.bg} opacity-90 transition-opacity group-hover:opacity-100`} />

            {/* Check badge */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${theme.badge}`}>
                {theme.name}
              </span>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-white text-brand-600 flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>

            {/* Mock preview lines */}
            <div className="relative z-10 space-y-1.5 pt-2">
              <div className="h-2 w-3/4 bg-white/70 rounded-full" />
              <div className="h-1.5 w-1/2 bg-white/40 rounded-full" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
