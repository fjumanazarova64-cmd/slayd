import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Play,
  Edit3,
  Download,
  Trash2,
  Copy,
  Presentation,
  Calendar,
  Layers,
  FileDown,
  Sparkles
} from 'lucide-react';
import { usePresentations } from '../context/PresentationContext';
import { exportToPptx } from '../services/exportPptx';
import PresentationViewerModal from '../components/PresentationViewerModal';

export default function DashboardPage() {
  const { presentations, deletePresentation, duplicatePresentation } = usePresentations();
  const [selectedForView, setSelectedForView] = useState(null);
  const [exportingId, setExportingId] = useState(null);

  const handleDelete = (id, title) => {
    if (window.confirm(`"${title}" taqdimotini o‘chirishni xohlaysizmi?`)) {
      deletePresentation(id);
    }
  };

  const handleExport = async (pres) => {
    setExportingId(pres.id);
    try {
      await exportToPptx(pres);
    } catch (e) {
      alert('Eksportda xatolik: ' + e.message);
    } finally {
      setExportingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Mening taqdimotlarim
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Yaratilgan barcha taqdimotlaringizni shu yerdan tahrirlang, ko‘ring va yuklab oling.
          </p>
        </div>

        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 shadow-md shadow-brand-500/20 hover:scale-105 transition-all w-fit"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Yangi taqdimot</span>
        </Link>
      </div>

      {/* Grid of Presentations */}
      {presentations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
            <Presentation className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Hozircha taqdimotlar yo‘q</h3>
          <p className="text-sm text-slate-500 mb-6">
            Sun’iy intellekt yordamida birinchi taqdimotingizni bir necha soniyada yarating.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700"
          >
            <Sparkles className="w-4 h-4" />
            <span>Taqdimot yaratish</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {presentations.map((pres) => (
            <div
              key={pres.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header & Preview banner */}
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(pres.createdAt || Date.now()).toLocaleDateString('uz-UZ')}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                    <Layers className="w-3 h-3" />
                    {pres.slides?.length || 0} slayd
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base sm:text-lg line-clamp-2 group-hover:text-brand-600 transition-colors">
                  {pres.title}
                </h3>
              </div>

              {/* Slide 1 mini snippet */}
              <div className="px-5 py-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 line-clamp-2">
                  {pres.slides?.[1]?.title || pres.slides?.[0]?.subtitle || pres.title}
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-2 mt-3">
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/editor/${pres.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Tahrirlash</span>
                  </Link>
                  <button
                    onClick={() => setSelectedForView(pres)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    title="Katta ekranda ko‘rish"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleExport(pres)}
                    disabled={exportingId === pres.id}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors disabled:opacity-50"
                    title="PPTX yuklab olish"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => duplicatePresentation(pres.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Nusxasini yaratish"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pres.id, pres.title)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen player modal */}
      {selectedForView && (
        <PresentationViewerModal
          presentation={selectedForView}
          initialSlideIndex={0}
          onClose={() => setSelectedForView(null)}
        />
      )}
    </div>
  );
}
