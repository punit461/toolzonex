'use client';

import { Typography, Box } from '@mui/material';
import ColorScreen from './ColorScreen';

const USE_CASES: Record<string, string[]> = {
  'Green Screen': [
    'Chroma-key backgrounds for video calls, streaming, or recording.',
    'Testing green-screen (chroma key) software or camera setups.',
    'Backdrop for product photography that needs a keyable background.',
  ],
  'Zoom Lighting Screen': [
    'Improvised ring light for video calls when you don’t have proper lighting.',
    'Brightening your face on a laptop webcam in a dim room.',
    'Quick fill light for casual video recording.',
  ],
};

const DEFAULT_USE_CASES = [
  'Testing your monitor for color accuracy, dead pixels, or backlight bleed.',
  'A plain, distraction-free backdrop for screen recording or streaming overlays.',
  'A calming full-color visual, or just for fun.',
];

const EXAMPLES: Record<string, string> = {
  'Green Screen': 'Open this page in fullscreen behind you during a video call, and most video-conferencing apps with virtual-background support can key it out as if you had a real green screen.',
  'Zoom Lighting Screen': 'Prop your laptop facing you at chest height, go fullscreen, and the bright warm light fills in shadows on your face during a video call.',
};
const DEFAULT_EXAMPLE = 'Go fullscreen on a second monitor to use it as a plain, distraction-free backdrop while screen recording or presenting.';

const EXTRA_FAQS: Record<string, { q: string; a: string }[]> = {
  'Blue Screen': [
    {
      q: 'Is this a Blue Screen of Death (BSOD) prank simulator?',
      a: 'No — this page is a plain, solid blue fullscreen display, not a fake Windows error message. If you\'re looking for a custom blue screen of death or a fake blue screen prank with actual Windows-style error text, use our dedicated Windows Blue Screen prank tool instead, which mimics the real "Your PC ran into a problem" screen.',
    },
  ],
};

function seoContent(colorName: string) {
  const useCases = USE_CASES[colorName] ?? DEFAULT_USE_CASES;
  const example = EXAMPLES[colorName] ?? DEFAULT_EXAMPLE;
  const extraFaqs = EXTRA_FAQS[colorName] ?? [];
  return (
    <>
      <Typography variant="h2">What is the {colorName}?</Typography>
      <Typography variant="body1">
        A simple fullscreen {colorName.toLowerCase().replace(' screen', '')} display. Useful for testing monitor
        color accuracy and dead pixels, as a plain backdrop for video calls or streaming overlays, as a calming
        visual, or just for fun.
      </Typography>
      <Typography variant="h2">How to use it</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click <strong>Click to Fullscreen</strong> (or press F / Space) to fill your entire screen.</li>
          <li>Press <strong>Esc</strong> at any time to exit fullscreen.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">{example}</Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          {useCases.map((uc) => <li key={uc}>{uc}</li>)}
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this work on mobile?</strong> Yes, tap the fullscreen button on any phone or tablet browser.</li>
          <li><strong>Will the color look exactly the same on every screen?</strong> Not necessarily — color rendering varies by display, brightness settings, and color profile.</li>
          {extraFaqs.map((faq) => (
            <li key={faq.q}><strong>{faq.q}</strong> {faq.a}</li>
          ))}
        </ul>
      </Box>
    </>
  );
}

export const BlackScreen = () => (
  <ColorScreen name="Black Screen" color="#000000" hintColor="rgba(255,255,255,0.4)" description="A simple fullscreen black screen. Free online black screen for testing, backgrounds, or fun." url="/utilities/black-screen" seoContent={seoContent('Black Screen')} />
);
export const RedScreen = () => (
  <ColorScreen name="Red Screen" color="#e11d48" hintColor="rgba(255,255,255,0.7)" description="A simple fullscreen red screen. Free online red screen for testing, backgrounds, or fun." url="/utilities/red-screen" seoContent={seoContent('Red Screen')} />
);
export const BlueScreen = () => (
  <ColorScreen name="Blue Screen" color="#1a56db" hintColor="rgba(255,255,255,0.7)" description="A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun." url="/utilities/blue-screen" seoContent={seoContent('Blue Screen')} />
);
export const GreenScreen = () => (
  <ColorScreen name="Green Screen" color="#00b140" hintColor="rgba(255,255,255,0.7)" description="A simple fullscreen chroma-key green screen. Free online green screen for backgrounds, testing, or streaming." url="/utilities/green-screen" seoContent={seoContent('Green Screen')} />
);
export const PinkScreen = () => (
  <ColorScreen name="Pink Screen" color="#ec4899" hintColor="rgba(255,255,255,0.7)" description="A simple fullscreen pink screen. Free online pink screen for testing, backgrounds, or fun." url="/utilities/pink-screen" seoContent={seoContent('Pink Screen')} />
);
export const PurpleScreen = () => (
  <ColorScreen name="Purple Screen" color="#7c3aed" hintColor="rgba(255,255,255,0.7)" description="A simple fullscreen purple screen. Free online purple screen for testing, backgrounds, or fun." url="/utilities/purple-screen" seoContent={seoContent('Purple Screen')} />
);
export const OrangeScreen = () => (
  <ColorScreen name="Orange Screen" color="#f97316" hintColor="rgba(0,0,0,0.5)" description="A simple fullscreen orange screen. Free online orange screen for testing, backgrounds, or fun." url="/utilities/orange-screen" seoContent={seoContent('Orange Screen')} />
);
export const YellowScreen = () => (
  <ColorScreen name="Yellow Screen" color="#eab308" hintColor="rgba(0,0,0,0.5)" description="A simple fullscreen yellow screen. Free online yellow screen for testing, backgrounds, or fun." url="/utilities/yellow-screen" seoContent={seoContent('Yellow Screen')} />
);
export const ZoomLightingScreen = () => (
  <ColorScreen name="Zoom Lighting Screen" color="#fff8ee" hintColor="rgba(0,0,0,0.4)" description="A bright, warm fullscreen light for video calls. Turn your screen into a ring light for better video lighting." url="/utilities/zoom-lighting-screen" seoContent={seoContent('Zoom Lighting Screen')} />
);
