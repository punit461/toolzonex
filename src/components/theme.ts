import { createTheme, PaletteMode } from '@mui/material/styles';

/**
 * Type scale. One family (Geist Variable, loaded in layout.tsx via
 * @fontsource-variable/geist) with real weights -- the previous setup
 * registered a single 400-weight file under four names, so every 500/600/700
 * in here silently fell back to a system font's bold.
 *
 * Figures use tabular numerals throughout: this is a calculator site, and
 * results that shift width as digits change read as sloppy.
 */
const typography = {
  fontFamily: '"Geist Variable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontWeight: 600,
    fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
    lineHeight: 1.15,
    letterSpacing: '-0.022em',
  },
  h2: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.25,
    letterSpacing: '-0.015em',
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: 1.35,
    letterSpacing: '-0.01em',
  },
  h4: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.4 },
  h5: { fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.4 },
  h6: { fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.4 },
  body1: { fontSize: '1rem', lineHeight: 1.6 },
  body2: { fontSize: '0.875rem', lineHeight: 1.55 },
  caption: { fontSize: '0.8125rem', lineHeight: 1.45 },
  button: {
    textTransform: 'none' as const,
    fontWeight: 500,
    letterSpacing: 0,
  },
};

const shape = { borderRadius: 10 };

/**
 * Palette rule that carries the site's identity: the saturated brand violet
 * is reserved for computed results and primary actions. Navigation, cards and
 * chrome stay ink/slate, so colour reliably means "this is your answer".
 */
const lightPalette = {
  mode: 'light' as PaletteMode,
  primary: {
    main: '#4A3AFF',
    light: '#EEECFF',
    dark: '#3526D6',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#5B657A',
    light: '#F6F8FC',
    dark: '#101728',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#127A57',
    light: '#E6F3EE',
    dark: '#0C5B40',
    contrastText: '#FFFFFF',
  },
  // 5.16:1 on white (was #A3720B at 4.23:1, under the 4.5:1 WCAG AA minimum
  // for warning-coloured text and white-on-warning buttons).
  warning: {
    main: '#8F660A',
    light: '#FAF1DD',
    dark: '#735206',
    contrastText: '#FFFFFF',
  },
  // Never set before, so MUI's default #0288d1 applied: white chip text on it
  // measured under 4.5:1 on the blog index. 5.28:1 now.
  info: {
    main: '#0B6BCB',
    light: '#E7F1FB',
    dark: '#0A56A3',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#B4402A',
    light: '#FBE9E5',
    dark: '#8C3020',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#101728',
    secondary: '#5B657A',
    disabled: '#98A3B8',
  },
  divider: '#E3E7F0',
  action: {
    hover: '#F6F8FC',
    selected: '#EEECFF',
  },
};

const darkPalette = {
  mode: 'dark' as PaletteMode,
  primary: {
    main: '#8B7DFF',
    light: '#221F45',
    dark: '#A79CFF',
    contrastText: '#0D121C',
  },
  secondary: {
    main: '#98A3B8',
    light: '#161C2B',
    dark: '#EEF1F7',
    contrastText: '#0D121C',
  },
  success: {
    main: '#56C497',
    light: '#123227',
    dark: '#7FD6B2',
    contrastText: '#0D121C',
  },
  warning: {
    main: '#E0B04A',
    light: '#3A2F10',
    dark: '#EBC46A',
    contrastText: '#0D121C',
  },
  info: {
    main: '#6CB4F5',
    light: '#10263D',
    dark: '#8CC4F7',
    contrastText: '#0D121C',
  },
  error: {
    main: '#EF7A63',
    light: '#3A1C16',
    dark: '#F59B88',
    contrastText: '#0D121C',
  },
  background: {
    default: '#0D121C',
    paper: '#161C2B',
  },
  text: {
    primary: '#EEF1F7',
    secondary: '#98A3B8',
    disabled: '#6B7688',
  },
  divider: '#273044',
  action: {
    hover: '#161C2B',
    selected: '#221F45',
  },
};

export function createAppTheme(mode: PaletteMode) {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  // Keyboard focus must be visible (WCAG 2.4.7). MUI's default for ButtonBase is
  // a faint ripple; this adds a solid ring only for keyboard focus (.Mui-focusVisible),
  // so mouse clicks look unchanged.
  const focusRing = { outline: `2px solid ${palette.primary.main}`, outlineOffset: '2px' };
  const insetFocusRing = { ...focusRing, outlineOffset: '-2px' };

  return createTheme({
    palette,
    typography,
    shape,
    components: {
      MuiTypography: {
        defaultProps: {
          // h4-h6 and the subtitles are used across ~2,100 places as a text
          // size for results, card titles and labels ("₹ 54,13,879", "Monthly
          // EMI"), not as document headings. Rendered as <h4>-<h6> they broke
          // the heading outline on 257 of 266 audited pages (axe heading-order).
          // Real headings in those styles set component="h2"/"h3" explicitly.
          variantMapping: {
            h1: 'h1', h2: 'h2', h3: 'h3',
            h4: 'p', h5: 'p', h6: 'p',
            subtitle1: 'p', subtitle2: 'p',
            body1: 'p', body2: 'p', inherit: 'p',
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: { '&.Mui-focusVisible': focusRing },
        },
      },
      // Items inside menus, lists, tabs and cards sit in overflow-hidden
      // containers, where an outside ring would be clipped.
      MuiMenuItem: { styleOverrides: { root: { '&.Mui-focusVisible': insetFocusRing } } },
      MuiListItemButton: { styleOverrides: { root: { '&.Mui-focusVisible': insetFocusRing } } },
      MuiTab: { styleOverrides: { root: { '&.Mui-focusVisible': insetFocusRing } } },
      MuiCardActionArea: { styleOverrides: { root: { '&.Mui-focusVisible': insetFocusRing } } },
      MuiLink: {
        // Underlined by default: links inside sentences must be distinguishable
        // without relying on colour (WCAG 1.4.1). Nav and footer column links
        // opt out with textDecoration: 'none'.
        defaultProps: { underline: 'always' as const },
        styleOverrides: { root: { '&:focus-visible': { ...focusRing, borderRadius: 2 } } },
      },
      // Selected toggle text in primary.main measured under 4.5:1 on its own
      // tinted background in dark mode; primary.dark is the higher-contrast
      // shade in both palettes.
      MuiToggleButton: {
        styleOverrides: {
          root: { '&.Mui-selected.MuiToggleButton-primary': { color: palette.primary.dark } },
        },
      },
      // Accordion titles default to <h3>; on this site accordions sit directly
      // under the page's h1 (FAQ, tool options), so h3 skipped a level.
      MuiAccordion: {
        defaultProps: { slotProps: { heading: { component: 'h2' } } },
      },
      // Field outlines are the only cue to where an input is; MUI's default
      // (23% black) is ~1.8:1. These are >=3:1 against the page (WCAG 1.4.11).
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: { borderColor: mode === 'dark' ? '#6B7688' : '#878FA2' },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          'html, body': {
            fontVariantNumeric: 'tabular-nums',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '10px 20px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          sizeLarge: { padding: '13px 26px' },
          sizeSmall: { padding: '6px 14px' },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
          // Elevations are differentiated by role rather than stamping one
          // shadow on everything: outlined = inert surface, 1 = a raised
          // panel, 2+ = something genuinely floating (menus, dialogs).
          outlined: {
            borderColor: palette.divider,
          },
          elevation1: {
            boxShadow: 'none',
            border: `1px solid ${palette.divider}`,
          },
          elevation2: {
            boxShadow:
              mode === 'dark'
                ? '0 8px 24px -12px rgba(0,0,0,0.7)'
                : '0 8px 24px -12px rgba(16,23,40,0.18)',
            border: `1px solid ${palette.divider}`,
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            border: `1px solid ${palette.divider}`,
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
      },
    },
  });
}

// Default export for backward compatibility (light theme)
const theme = createAppTheme('light');
export default theme;
