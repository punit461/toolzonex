'use client';

import { Box, Typography, Button } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';

interface Props {
  name: string;
  color: string;
  /** Text color for the hint shown inside the fullscreen area (contrast with `color`). */
  hintColor?: string;
  description: string;
  url: string;
  seoContent: React.ReactNode;
}

const ColorScreenBase = ({ name, color, hintColor = 'rgba(255,255,255,0.6)' }: Pick<Props, 'name' | 'color' | 'hintColor'>) => {
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Button variant="contained" size="large" startIcon={<FullscreenIcon />} onClick={toggle}>
          Click to Fullscreen
        </Button>
        <Typography variant="caption" color="text.secondary">
          Press F or Space for fullscreen &bull; Esc to exit
        </Typography>
      </Box>

      <Box
        ref={targetRef}
        onClick={toggle}
        sx={{
          bgcolor: color,
          height: isFullscreen ? '100%' : 320,
          borderRadius: isFullscreen ? 0 : 2,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(isFullscreen && { position: 'fixed', inset: 0, zIndex: 1300 }),
        }}
      >
        {!isFullscreen && (
          <Typography sx={{ color: hintColor, fontSize: '0.9rem' }}>
            Click to go fullscreen
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const ColorScreen = ({ name, color, hintColor, description, url, seoContent }: Props) => {
  return (
    <CalculatorShell
      title={name}
      description={description}
      url={url}
      content={seoContent}
      category="Utilities"
    >
      <ColorScreenBase name={name} color={color} hintColor={hintColor} />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ColorScreen;
