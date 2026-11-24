import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Presentation, Sparkles, User, LogOut, Globe, Crown, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGES } from '../utils/templates';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();

  const isPro = localStorage.getItem('slide_ai_is_pro') === 'true';

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-600 flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Presentation className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-brand-900 to-brand-600 bg-clip-text text-transparent">
                  SLIDE AI
                </span>
                {isPro ? (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-amber-500 text-white rounded-md flex items-center gap-0.5 shadow-sm">
                    <Crown className="w-2.5 h-2.5" />
                    PRO
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-brand-50 text-brand-600 border border-brand-200 rounded-md">
                    AI 2.0
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-medium -mt-1">
                Pitch & Gamma analogi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.nav.home}
            </Link>
            <Link
              to="/create"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/create') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-brand-500" />
              {t.nav.create}
            </Link>
            <Link
              to="/pricing"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/pricing') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-500" />
              <span>Ta’riflar (PRO)</span>
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/dashboard') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.nav.dashboard}
            </Link>
            <Link
              to="/help"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/help') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.nav.help}
            </Link>
          </nav>

          {/* Language Switcher & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{LANGUAGES.find(l => l.code === lang)?.flag}</span>
                <span>{lang.toUpperCase()}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 animate-fadeIn">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => { setLang(item.code); setLangMenuOpen(false); }}
                      className={`w-full px-3 py-1.5 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 ${
                        lang === item.code ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{item.flag}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt="avatar"
                    className="w-6 h-6 rounded-full bg-brand-100"
                  />
                  <span className="max-w-[100px] truncate">{user.name || user.email}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                  title={t.nav.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuth('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-brand-600 rounded-lg hover:bg-slate-50"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 rounded-lg shadow-sm"
                >
                  {t.nav.register}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-1.5 rounded-lg border text-xs font-bold"
            >
              {LANGUAGES.find(l => l.code === lang)?.flag}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold">
              {t.nav.home}
            </Link>
            <Link to="/create" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-brand-600 bg-brand-50/50">
              {t.nav.create}
            </Link>
            <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-amber-600">
              Ta’riflar (PRO)
            </Link>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold">
              {t.nav.dashboard}
            </Link>
            <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setMobileMenuOpen(false); }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border ${
                    lang === l.code ? 'bg-brand-50 text-brand-700 border-brand-300' : 'bg-slate-50'
                  }`}
                >
                  {l.flag} {l.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {showAuthModal && (
        <AuthModal initialMode={authMode} onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}
