import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, getStoredTheme, setStoredTheme, resolveTheme } from '../lib/storage';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => 
    resolveTheme(getStoredTheme())
  );

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);
    setResolvedTheme(resolveTheme(newTheme));
  };

  useEffect(() => {
    const updateResolvedTheme = () => {
      setResolvedTheme(resolveTheme(theme));
    };

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateResolvedTheme);

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    
    return () => {
      mediaQuery.removeEventListener('change', updateResolvedTheme);
    };
  }, [theme, resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
