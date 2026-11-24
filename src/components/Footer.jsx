import React from 'react';
import { Link } from 'react-router-dom';
import { Presentation, Heart, Shield, FileText, Send, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-600 flex items-center justify-center text-white font-bold">
                <Presentation className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">SLIDE AI</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              O‘zbek tilidagi eng ilg‘or sun’iy intellekt taqdimot yaratish platformasi. Mavzuni yozing va bir necha soniyada tayyor slaydlarni qabul qiling.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-400 bg-brand-950/60 border border-brand-900/60 px-3 py-1.5 rounded-lg w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O‘zbek tilida 100% moslashgan</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Mahsulot</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/create" className="hover:text-white transition-colors">Taqdimot yaratish</Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors">Imkoniyatlar</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">Mening taqdimotlarim</Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">PowerPoint PPTX eksport</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">PDF yuklab olish</span>
              </li>
            </ul>
          </div>

          {/* Resources & Help */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Qo‘llab-quvvatlash</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/help" className="hover:text-white transition-colors">Yordam markazi</Link>
              </li>
              <li>
                <Link to="/help#faq" className="hover:text-white transition-colors">Ko‘p beriladigan savollar</Link>
              </li>
              <li>
                <a href="https://t.me/l9farangiz" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  Telegram: @l9farangiz
                </a>
              </li>
              <li>
                <a href="mailto:fjumanazarova64@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                  fjumanazarova64@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Hujjatlar</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/help" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Shield className="w-3.5 h-3.5" />
                  Maxfiylik siyosati
                </Link>
              </li>
              <li>
                <Link to="/help" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <FileText className="w-3.5 h-3.5" />
                  Foydalanish shartlari
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-500">
                  Platforma ta’lim va biznes taqdimotlarini tezlashtirish maqsadida ishlab chiqilgan.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SLIDE AI. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>O‘zbekistonda mehr bilan yaratilgan</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
