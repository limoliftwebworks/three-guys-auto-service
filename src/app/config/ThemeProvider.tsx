'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface ThemeContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default theme color is purple
  const [themeColor, setThemeColorState] = useState('#a259e6');
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state once component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Load theme color from localStorage on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('themeColor');
      if (savedColor) {
        setThemeColorState(savedColor);
        // Apply as CSS variable to document root
        document.documentElement.style.setProperty('--theme-color', savedColor);
        document.documentElement.style.setProperty('--theme-color-light', `${savedColor}22`);
      }
    }
  }, []);
  
  // Function to set theme color and persist it
  const setThemeColor = (color: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeColor', color);
    }
    
    // Apply as CSS variable to document root
    document.documentElement.style.setProperty('--theme-color', color);
    document.documentElement.style.setProperty('--theme-color-light', `${color}22`);
    
    setThemeColorState(color);
  };
  
  // Prevent hydration issues by only rendering context provider after client-side mount
  if (!mounted) {
    return <>{children}</>;
  }
  
  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 