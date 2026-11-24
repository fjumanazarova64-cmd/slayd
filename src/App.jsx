import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditorPage from './pages/EditorPage';
import DashboardPage from './pages/DashboardPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/editor/:id" element={<EditorPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
