import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentModal({ plan, onClose, onSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('click'); // 'click' | 'payme' | 'uzum' | 'card'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatCard = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    return raw.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      return `${raw.slice(0, 2)}/${raw.slice(2, 4)}`;
    }
    return raw;
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      // Save pro status in localStorage
      localStorage.setItem('slide_ai_is_pro', 'true');
      if (onSuccess) onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                Xavfsiz To‘lov
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {plan?.name || 'SLIDE AI PRO'} obunasi
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                To‘lov summasi: <span className="font-extrabold text-slate-900 text-sm">{plan?.price || '49,000'} {plan?.currency || 'so‘m'}</span> / {plan?.period || 'oyiga'}
              </p>
            </div>

            {/* Payment Methods */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                To‘lov tizimini tanlang:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'click', name: 'Click', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                  { id: 'payme', name: 'Payme', color: 'bg-teal-50 text-teal-700 border-teal-200' },
                  { id: 'uzum', name: 'Uzum Bank', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                  { id: 'card', name: 'Humo/Uzcard', color: 'bg-slate-50 text-slate-700 border-slate-200' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m.id)}
                    className={`py-3 px-2 rounded-xl text-xs font-extrabold border-2 text-center transition-all ${
                      selectedMethod === m.id
                        ? 'border-brand-600 ring-2 ring-brand-500/20 bg-brand-50 text-brand-700 shadow-sm'
                        : `${m.color} hover:opacity-80`
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Inputs Form */}
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Karta raqami (Uzcard / Humo / Visa)
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    placeholder="8600 0000 0000 0000"
                    maxLength={19}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Amal qilish muddati
                  </label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                    placeholder="OO/YY"
                    maxLength={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Telefon raqam
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 hover:from-brand-700 hover:to-accent-700 transition-all shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>To‘lov tekshirilmoqda...</span>
                    </div>
                  ) : (
                    <>
                      <span>To‘lovni tasdiqlash ({plan?.price || '49,000'} {plan?.currency || 'so‘m'})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>256-bit SSL xavfsiz shifrlangan to‘lov</span>
              </div>
            </form>
          </div>
        ) : (
          /* Payment Success view */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              To‘lov muvaffaqiyatli amalga oshirildi!
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Tabriklaymiz! Sizning hisobingizga <strong>{plan?.name || 'SLIDE AI PRO'}</strong> obunasi muvaffaqiyatli faollashtirildi.
            </p>
            <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 text-xs text-brand-800 font-semibold max-w-xs mx-auto">
              Cheksiz slaydlar, PPTX va 4K PDF yuklab olish imkoniyati ochildi.
            </div>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md"
              >
                Davom etish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
