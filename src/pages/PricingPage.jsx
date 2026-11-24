import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, HelpCircle } from 'lucide-react';
import { PRICING_PLANS } from '../utils/templates';
import PaymentModal from '../components/PaymentModal';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

  const handleSelectPlan = (plan) => {
    if (plan.id === 'free') {
      alert('Siz allaqachon bepul tarifdasiz!');
      return;
    }
    setSelectedPlan(plan);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>Shaffof va Qulay Narxlar</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          O‘zingizga mos tarif rejasini tanlang
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Bepul sinab ko‘ring yoki PRO imkoniyatlarni oching — cheksiz taqdimotlar, PPTX va 4K PDF yuklash.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between relative ${
              plan.highlight
                ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white shadow-2xl ring-2 ring-brand-500 scale-105 z-10'
                : 'bg-white text-slate-900 border border-slate-200/80 shadow-soft hover:shadow-card'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-brand-600 to-accent-600 text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-md">
                {plan.badge}
              </div>
            )}

            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className={`text-xs mt-1 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                {plan.currency && <span className="text-sm font-semibold">{plan.currency}</span>}
                <span className={`text-xs ml-1 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                  / {plan.period}
                </span>
              </div>

              {plan.yearlyPrice && (
                <div className="mb-6 -mt-3 text-xs text-brand-400 font-semibold">
                  {plan.yearlyPrice}
                </div>
              )}

              {/* Feature list */}
              <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-brand-400' : 'text-brand-600'}`} />
                    <span className={plan.highlight ? 'text-slate-300' : 'text-slate-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan(plan)}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-sm ${
                plan.highlight
                  ? 'bg-gradient-to-r from-brand-500 to-accent-600 hover:from-brand-600 hover:to-accent-700 text-white shadow-float'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Security Banner */}
      <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-emerald-600 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-slate-900">Xavfsiz va Ishonchli To‘lov</h4>
            <p className="text-xs text-slate-500">
              Click, Payme, Uzum Bank va xalqaro kartalar orqali bir necha soniyada obuna bo‘ling.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="px-2.5 py-1 bg-white rounded-lg border">Click</span>
          <span className="px-2.5 py-1 bg-white rounded-lg border">Payme</span>
          <span className="px-2.5 py-1 bg-white rounded-lg border">Uzum</span>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}
