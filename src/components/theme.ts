import { createTheme, PaletteMode } from '@mui/material/styles';

// Shared typography and shape (mode-independent)
const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '2.5rem',
    letterSpacing: '-0.03em',
    '@media (min-width:600px)': {
      fontSize: '3.5rem',
      letterSpacing: '-0.05em',
    },
  },
  h2: {
    fontWeight: 600,
    fontSize: '2rem',
    letterSpacing: '-0.02em',
    '@media (min-width:600px)': {
      fontSize: '2.5rem',
      letterSpacing: '-0.03em',
    },
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.5rem',
  },
  button: {
    textTransform: 'none' as const,
    fontWeight: 500,
  },
};

const shape = { borderRadius: 8 };

// Palette per mode
const lightPalette = {
  mode: 'light' as PaletteMode,
  primary: {
    main: '#171717',
    light: '#F3F4F6',
    dark: '#0A0A0A',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#404040',
    light: '#F1F5F9',
    dark: '#1A1A1A',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#D4AF37',
    light: '#FDF6E3',
    dark: '#A68B2A',
    contrastText: '#171717',
  },
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#171717',
    secondary: '#404040',
  },
  divider: '#E5E5E5',
};

const darkPalette = {
  mode: 'dark' as PaletteMode,
  primary: {
    main: '#E5E5E5',
    light: '#1E293B',
    dark: '#F8FAFC',
    contrastText: '#0F172A',
  },
  secondary: {
    main: '#94A3B8',
    light: '#1E293B',
    dark: '#E2E8F0',
    contrastText: '#0F172A',
  },
  warning: {
    main: '#D4AF37',
    light: '#2A2517',
    dark: '#F5D76E',
    contrastText: '#0F172A',
  },
  background: {
    default: '#0F172A',
    paper: '#1E293B',
  },
  text: {
    primary: '#F1F5F9',
    secondary: '#94A3B8',
  },
  divider: '#334155',
};

export function createAppTheme(mode: PaletteMode) {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  return createTheme({
    palette,
    typography,
    shape,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '12px 24px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: `1px solid ${palette.divider}`,
          },
        },
      },
    },
  });
}

// Default export for backward compatibility (light theme)
const theme = createAppTheme('light');
export default theme;
