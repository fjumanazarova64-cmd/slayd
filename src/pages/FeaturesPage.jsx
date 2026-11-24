import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Globe,
  Sliders,
  FileCheck,
  Download,
  Shield,
  Smartphone,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-brand-600" />,
      title: 'Sun’iy Intellekt bilan Tezkor Yaratish',
      desc: 'Faqatgina mavzuni kiritasiz, qolgan barcha bosqichlarni (reja, sarlavha, qisqa tezislar, xulosa) AI avtomatik tuzib beradi.'
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      title: 'O‘zbek Tiliga 100% Moslashgan',
      desc: 'Boshqa xorijiy servislardan farqli o‘laroq, o‘zbek tili grammatikasi, terminologiyasi va uslubiga to‘liq mos keladigan matnlar yaratadi.'
    },
    {
      icon: <Download className="w-6 h-6 text-emerald-600" />,
      title: 'PowerPoint PPTX va PDF Eksport',
      desc: 'Yaratilgan slaydlar faqat rasmlar emas, balki Microsoft PowerPoint va Google Slides dasturlarida to‘liq ochiladigan va tahrirlanadigan vektor PPTX formatida eksport qilinadi.'
    },
    {
      icon: <Sliders className="w-6 h-6 text-purple-600" />,
      title: 'Moslashuvchan Onlayn Muharrir',
      desc: 'Har bir so‘zni, rasmni, slayd tartibini o‘zgartiring, yangi slaydlar qo‘shing yoki ortiqchalarini o‘chiring.'
    },
    {
      icon: <Layers className="w-6 h-6 text-orange-600" />,
      title: 'Zamonaviy Vizual Shablonlar',
      desc: 'Biznes, ta’lim, tibbiyot, texnologiya va tarix yo‘nalishlariga mos premium ranglar va shriftlar kombinatsiyasi.'
    },
    {
      icon: <Smartphone className="w-6 h-6 text-pink-600" />,
      title: 'Barcha Qurilmalarga Mos',
      desc: 'Kompyuter, planshet yoki smartfoningizdan qat’i nazar platforma juda qulay va tezkor ishlaydi.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          Platforma imkoniyatlari
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Taqdimot tayyorlashning zamonaviy usuli
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          SLIDE AI — talabalar, o‘qituvchilar, biznes vakillari va ma’ruzachilar uchun eng qulay taqdimot vositasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-soft hover:shadow-card transition-all duration-300 space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{f.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-brand-600 to-accent-600 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-float">
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          Vaqtingizni tejang va birinchi taqdimotingizni hoziroq yarating
        </h2>
        <p className="text-sm sm:text-base text-brand-100 max-w-xl mx-auto">
          Ro‘yxatdan o‘tish shart emas — darhol mavzu kiritib slaydlar generatsiya qiling!
        </p>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-brand-900 bg-white hover:bg-slate-50 transition-all shadow-md"
        >
          <span>Taqdimot yaratish</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
