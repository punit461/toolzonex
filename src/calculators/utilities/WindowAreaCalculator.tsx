'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface WindowRow {
  id: string;
  name: string;
  width: string;
  height: string;
}

let nextId = 4;

const WindowAreaCalculator = () => {
  const [windows, setWindows] = useState<WindowRow[]>([
    { id: '1', name: 'Living Room Window', width: '36', height: '48' },
    { id: '2', name: 'Bedroom Window', width: '30', height: '54' },
    { id: '3', name: 'Kitchen Window', width: '24', height: '36' },
  ]);

  const addWindow = () => setWindows([...windows, { id: String(nextId++), name: `Window ${windows.length + 1}`, width: '', height: '' }]);
  const removeWindow = (id: string) => setWindows(windows.filter((w) => w.id !== id));
  const updateWindow = (id: string, field: 'name' | 'width' | 'height', val: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, [field]: val } : w)));
  };

  const { rows, totalAreaSqFt } = useMemo(() => {
    const rows = windows.map((w) => {
      const wIn = parseFloat(w.width) || 0;
      const hIn = parseFloat(w.height) || 0;
      const areaSqFt = (wIn * hIn) / 144;
      return { ...w, areaSqFt };
    });
    const totalAreaSqFt = rows.reduce((sum, r) => sum + r.areaSqFt, 0);
    return { rows, totalAreaSqFt };
  }, [windows]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Total Window Area</Typography>
      <Typography variant="body1">
        Add each window with its width and height in inches, and this calculator converts every window to
        square feet and adds them up into a total glazing area. That total is useful any time you need a
        window&apos;s area rather than the fabric width around it — estimating window film, blinds or shades,
        or the amount of glass needed for a replacement.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Window Area (sq ft) = (Width in × Height in) ÷ 144
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 36&quot; × 48&quot; window has an area of (36 × 48) ÷ 144 = 12 sq ft. Add a 30&quot; × 54&quot; window
        (11.25 sq ft) and a 24&quot; × 36&quot; window (6 sq ft), and the total glazing area across all three
        windows is 29.25 sq ft.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much window film or privacy tint to order for a room or whole house.</li>
          <li>Figuring out total glass area for a window replacement quote.</li>
          <li>Sizing blinds, shades, or curtains that are priced or sold by area rather than by width alone.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Curtain Size Calculator?</Typography>
      <Typography variant="body1">
        The Curtain Size Calculator figures out how wide to cut curtain fabric based on a fullness ratio applied
        to the rod width — it doesn&apos;t calculate area at all. This calculator instead measures the actual
        glazed area of the window itself, which is what you need for film, blinds, or glass, not fabric width.
      </Typography>
      <Typography variant="h3">Should I measure the glass only, or the whole window frame?</Typography>
      <Typography variant="body1">
        It depends on what you&apos;re estimating for — use the visible glass area for film or tint, and the
        full frame opening (including the frame) for blinds or shades that mount inside the window recess.
      </Typography>
      <Typography variant="h3">Does this account for waste when ordering film or glass?</Typography>
      <Typography variant="body1">
        No — this gives the raw total area only. Add a buffer of around 10% on top of the total when ordering
        film or glass to account for trimming, cutting mistakes, and irregular window shapes.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/window-area-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Windows</Typography>
          <Stack spacing={2}>
            {rows.map((w, index) => (
              <Stack key={w.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 24, color: 'text.secondary' }}>#{index + 1}</Typography>
                <TextField
                  label="Window Name" size="small" fullWidth
                  value={w.name}
                  onChange={(e) => updateWindow(w.id, 'name', e.target.value)}
                />
                <TextField
                  label="Width (in)" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={w.width}
                  onChange={(e) => updateWindow(w.id, 'width', e.target.value)}
                />
                <TextField
                  label="Height (in)" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={w.height}
                  onChange={(e) => updateWindow(w.id, 'height', e.target.value)}
                />
                <IconButton color="error" size="small" onClick={() => removeWindow(w.id)} disabled={windows.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addWindow} sx={{ mt: 2 }}>Add Window</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Total Window Area</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{totalAreaSqFt.toFixed(2)} sq ft</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WindowAreaCalculator;
