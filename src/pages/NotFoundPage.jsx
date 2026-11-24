import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-7xl font-black bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent mb-4">
        404
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Sahifa topilmadi</h2>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        Siz qidirayotgan sahifa mavjud emas yoki o‘chirilgan bo‘lishi mumkin.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md"
      >
        <Home className="w-4 h-4" />
        <span>Bosh sahifaga qaytish</span>
      </Link>
    </div>
  );
}
