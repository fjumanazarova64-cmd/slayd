import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_PRESENTATIONS } from '../utils/defaultSlides';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

const PresentationContext = createContext();

export function PresentationProvider({ children }) {
  const [presentations, setPresentations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load presentations on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = localStorage.getItem('slide_ai_presentations');
        if (stored) {
          setPresentations(JSON.parse(stored));
        } else {
          // Default initial presentation
          setPresentations(SAMPLE_PRESENTATIONS);
          localStorage.setItem('slide_ai_presentations', JSON.stringify(SAMPLE_PRESENTATIONS));
        }
      } catch (err) {
        console.error('Failed to load presentations:', err);
        setPresentations(SAMPLE_PRESENTATIONS);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save changes to localStorage
  const persist = (items) => {
    setPresentations(items);
    localStorage.setItem('slide_ai_presentations', JSON.stringify(items));
  };

  const getPresentationById = (id) => {
    return presentations.find(p => p.id === id) || null;
  };

  const savePresentation = (presentation) => {
    const index = presentations.findIndex(p => p.id === presentation.id);
    let updated;
    if (index >= 0) {
      updated = [...presentations];
      updated[index] = { ...presentation, updatedAt: new Date().toISOString() };
    } else {
      updated = [
        { ...presentation, createdAt: presentation.createdAt || new Date().toISOString() },
        ...presentations
      ];
    }
    persist(updated);
    return presentation;
  };

  const deletePresentation = (id) => {
    const updated = presentations.filter(p => p.id !== id);
    persist(updated);
  };

  const duplicatePresentation = (id) => {
    const source = presentations.find(p => p.id === id);
    if (!source) return null;
    const duplicated = {
      ...source,
      id: `pres-${Date.now()}`,
      title: `${source.title} (Nusxa)`,
      createdAt: new Date().toISOString(),
      slides: source.slides.map((s, idx) => ({ ...s, id: `slide-dup-${idx}-${Date.now()}` }))
    };
    persist([duplicated, ...presentations]);
    return duplicated;
  };

  return (
    <PresentationContext.Provider
      value={{
        presentations,
        loading,
        getPresentationById,
        savePresentation,
        deletePresentation,
        duplicatePresentation
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentations() {
  const context = useContext(PresentationContext);
  if (!context) throw new Error('usePresentations must be used within PresentationProvider');
  return context;
}
