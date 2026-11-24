import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Mail, Send, Sparkles } from 'lucide-react';

export default function HelpPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'SLIDE AI qanday ishlaydi?',
      a: 'Siz taqdimot mavzusini kiritasiz, slaydlar soni va tilni tanlaysiz. Sun’iy intellekt mavzuni tahlil qilib, sarlavhalar, xulosalar, qisqa va aniq ma’lumotlar hamda mos dizaynni avtomatik yaratib beradi.'
    },
    {
      q: 'Yaratilgan taqdimotni PowerPoint (PPTX) formatida yuklab olsam bo‘ladimi?',
      a: 'Ha, albatta! "PPTX" tugmasini bosishingiz bilan fayl to‘liq tahrirlanadigan slaydlar holatida yuklab olinadi. Uni Microsoft PowerPoint, Google Slides yoki Apple Keynote dasturlarida ochishingiz va o‘zgartirishingiz mumkin.'
    },
    {
      q: 'PDF formatida yuklab olish mumkinmi?',
      a: 'Ha, platformada to‘g‘ridan-to‘g‘ri yuqori sifatli (HD) PDF formatida slaydlar ketma-ketligini saqlab olish imkoniyati mavjud.'
    },
    {
      q: 'Xizmat bepulmi yoki to‘lov talab qilinadimi?',
      a: 'Hozirgi vaqtda barcha asosiy funksiyalar va demo taqdimot yaratish mutlaqo bepul. Siz bemalol mavzu kiritib, slaydlar yaratishingiz va yuklab olishingiz mumkin.'
    },
    {
      q: 'Taqdimot yaratilgandan keyin matn va rasmlarni o‘zgartira olamanmi?',
      a: 'Ha, taqdimot yaratilgach maxsus qulay onlayn muharrir (Editor) ochiladi. Unda har bir slayd matnini to‘g‘ridan-to‘g‘ri o‘zgartirish, yangi bandlar qo‘shish, slaydlar tartibini almashtirish va yangi slayd qo‘shish mumkin.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          Qo‘llab-quvvatlash
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Yordam va ko‘p beriladigan savollar
        </h1>
        <p className="text-sm sm:text-base text-slate-500">
          Savolingiz bormi? Quyidagi javoblarni ko‘rib chiqing yoki biz bilan bog‘laning.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-soft"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left font-bold text-slate-800 flex items-center justify-between gap-4 text-sm sm:text-base hover:bg-slate-50"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-brand-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Telegram orqali bog‘lanish</h4>
            <p className="text-xs text-slate-500 mt-1">Savollaringiz bo‘lsa, Telegram orqali javob beramiz.</p>
            <a
              href="https://t.me/l9farangiz"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-xs font-bold text-brand-600 hover:underline"
            >
              Telegram: @l9farangiz →
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Elektron pochta</h4>
            <p className="text-xs text-slate-500 mt-1">Taklif va hamkorlik uchun murojaat qiling.</p>
            <a
              href="mailto:fjumanazarova64@gmail.com"
              className="mt-3 inline-block text-xs font-bold text-brand-600 hover:underline"
            >
              fjumanazarova64@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
