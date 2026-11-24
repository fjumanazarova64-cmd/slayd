import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Supabase session listener
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    } else {
      // Local fallback auth
      const savedUser = localStorage.getItem('slide_ai_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error(e);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data.user;
    } else {
      // Local demo login
      const demoUser = {
        id: 'usr-' + Date.now(),
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      setUser(demoUser);
      localStorage.setItem('slide_ai_user', JSON.stringify(demoUser));
      return demoUser;
    }
  };

  const register = async (email, password, name) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
      if (error) throw error;
      return data.user;
    } else {
      // Local demo register
      const demoUser = {
        id: 'usr-' + Date.now(),
        email,
        name: name || email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      setUser(demoUser);
      localStorage.setItem('slide_ai_user', JSON.stringify(demoUser));
      return demoUser;
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('slide_ai_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
