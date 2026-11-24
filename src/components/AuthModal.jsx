import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, isSupabaseConfigured } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi. Qayta urinib ko‘ring.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('foydalanuvchi@slideai.uz');
    setPassword('demo123456');
    setName('Azizbek');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-tr from-brand-600 to-accent-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-brand-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {mode === 'login' ? 'Tizimga kirish' : 'Ro‘yxatdan o‘tish'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {mode === 'login'
              ? 'Taqdimotlaringizni boshqarish uchun hisobingizga kiring'
              : 'SLIDE AI bilan bir necha daqiqada taqdimotlar yarating'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Ismingiz
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ali Valiyev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email manzil
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="misol@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Parol
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="kamida 6 ta belgi"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 transition-all shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Kirish' : 'Hisob yaratish'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="mt-4 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={fillDemo}
            className="text-xs text-brand-600 hover:text-brand-800 font-medium inline-flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Demo hisob ma’lumotlarini avtomatik to‘ldirish
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              Hisobingiz yo‘qmi?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-semibold text-brand-600 hover:underline"
              >
                Ro‘yxatdan o‘ting
              </button>
            </p>
          ) : (
            <p>
              Hisobingiz bormi?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-brand-600 hover:underline"
              >
                Kirish
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
