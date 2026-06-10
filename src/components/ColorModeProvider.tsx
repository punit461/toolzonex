'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PaletteMode } from '@mui/material/styles';

interface ColorModeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

const STORAGE_KEY = 'toolzonex-color-mode';

export default function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        setMode(stored);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setMode('dark');
      }
    } catch {
      // localStorage unavailable (SSR, private browsing)
    }
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const contextValue = useMemo(() => ({ mode, toggleColorMode }), [mode]);

  // Prevent flash: render children immediately but only apply mode after mount
  const effectiveMode = mounted ? mode : 'light';

  return (
    <ColorModeContext.Provider value={{ ...contextValue, mode: effectiveMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}
