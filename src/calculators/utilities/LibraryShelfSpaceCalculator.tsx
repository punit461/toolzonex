'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type BookType = 'Paperback' | 'Hardcover' | 'Custom';
type Unit = 'in' | 'ft';

const SPINE_WIDTHS: Record<BookType, number> = {
  Paperback: 0.75,
  Hardcover: 1.25,
  Custom: 1,
};

const LibraryShelfSpaceCalculator = () => {
  const [bookCount, setBookCount] = useState('500');
  const [bookType, setBookType] = useState<BookType>('Paperback');
  const [customWidth, setCustomWidth] = useState('1');
  const [shelfLength, setShelfLength] = useState('36');
  const [unit, setUnit] = useState<Unit>('in');

  useEffect(() => {
    if (bookType !== 'Custom') setCustomWidth(String(SPINE_WIDTHS[bookType]));
  }, [bookType]);

  const result = useMemo(() => {
    const count = parseFloat(bookCount) || 0;
    const width = parseFloat(customWidth) || 0;
    const lengthInput = parseFloat(shelfLength) || 0;
    const shelfInches = unit === 'ft' ? lengthInput * 12 : lengthInput;

    const totalSpace = count * width; // inches
    const shelvesNeeded = shelfInches > 0 ? Math.ceil(totalSpace / shelfInches) : 0;

    return { totalSpace, shelvesNeeded };
  }, [bookCount, customWidth, shelfLength, unit]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Library Shelf Space Calculator</Typography>
      <Typography variant="body1">
        Enter the number of books you need to shelve, pick a book-type preset for average spine width
        (or enter a custom value), and enter the length of a single shelf. The calculator multiplies your
        book count by the average spine width to get the total linear space needed, then divides by your
        shelf length to find how many shelves that requires.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Linear Space = Books × Avg. Spine Width
        <br />
        Shelves Needed = ROUND UP(Total Space / Shelf Length)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        500 paperback books at an average spine width of 0.75 in need 500 × 0.75 = 375 in of total linear
        shelf space. On 36 in shelves, that&apos;s 375 / 36 ≈ 10.4, rounded up to 11 shelves needed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning how many shelves or bookcases are needed for a home library or classroom collection.</li>
          <li>Estimating shelving requirements for a library renovation or new book acquisition.</li>
          <li>Comparing shelf space needs between paperback-heavy and hardcover-heavy collections.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does hardcover take up more space than paperback?</strong> Hardcover books have thicker covers, sturdier binding, and often use heavier paper stock, giving them a wider average spine — commonly around 1.25 in versus roughly 0.75 in for a typical paperback.</li>
          <li><strong>Should I use a custom spine width for a mixed collection?</strong> Yes — if your collection mixes paperbacks, hardcovers, oversized art books, or reference volumes, measure a representative sample of your actual books and enter that average under &quot;Custom&quot; for a more accurate estimate.</li>
          <li><strong>Does this leave room for growth or loose shelving?</strong> No — it calculates the space needed to fit your current book count snugly. Many librarians and organizers leave 10-20% of shelf space empty for future additions and easier browsing, so consider adding a buffer to your shelf count.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/library-shelf-space-calculator" content={content}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={(_, val: Unit | null) => { if (val) setUnit(val); }}
          size="small"
        >
          <ToggleButton value="in">Inches</ToggleButton>
          <ToggleButton value="ft">Feet</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Number of Books" type="number" value={bookCount} onChange={(e) => setBookCount(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField select label="Book Type" value={bookType} onChange={(e) => setBookType(e.target.value as BookType)} fullWidth>
            <MenuItem value="Paperback">Paperback (~0.75 in)</MenuItem>
            <MenuItem value="Hardcover">Hardcover (~1.25 in)</MenuItem>
            <MenuItem value="Custom">Custom</MenuItem>
          </TextField>
          <TextField
            label="Average Spine Width (in)"
            type="number"
            value={customWidth}
            onChange={(e) => setCustomWidth(e.target.value)}
            onFocus={(e) => e.target.select()}
            fullWidth
            disabled={bookType !== 'Custom'}
          />
          <TextField label={`Shelf Length (${unit})`} type="number" value={shelfLength} onChange={(e) => setShelfLength(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Shelves Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result.shelvesNeeded}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Linear Space Needed</Typography>
            <Typography fontWeight={600}>{result.totalSpace.toFixed(1)} in</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LibraryShelfSpaceCalculator;
