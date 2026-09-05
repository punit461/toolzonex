'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, IconButton, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function cleanSegment(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, '');
}

const ProductSkuGeneratorContent = () => {
  const [categoryCode, setCategoryCode] = useState('SHRT');
  const [attributes, setAttributes] = useState<string[]>(['BLU', 'M']);
  const [sequence, setSequence] = useState('42');
  const [padLength, setPadLength] = useState('4');
  const [separator, setSeparator] = useState('-');
  const [copied, setCopied] = useState(false);

  const updateAttribute = (idx: number, value: string) => {
    setAttributes((prev) => prev.map((a, i) => (i === idx ? value : a)));
  };

  const addAttribute = () => setAttributes((prev) => [...prev, '']);
  const removeAttribute = (idx: number) => setAttributes((prev) => prev.filter((_, i) => i !== idx));

  const pad = parseInt(padLength, 10);
  const seqNum = sequence.trim() === '' ? '' : sequence.trim();
  const paddedSeq =
    seqNum !== '' && !isNaN(Number(seqNum)) && !isNaN(pad) && pad > 0
      ? Number(seqNum).toString().padStart(pad, '0')
      : cleanSegment(seqNum);

  const segments = [cleanSegment(categoryCode), ...attributes.map(cleanSegment), cleanSegment(paddedSeq)].filter(
    (s) => s.length > 0
  );
  const sku = segments.join(separator);

  const copySku = async () => {
    try {
      await navigator.clipboard.writeText(sku);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={3}>
        <TextField
          label="Category Code"
          placeholder="e.g. SHRT"
          value={categoryCode}
          onChange={(e) => setCategoryCode(e.target.value)}
          fullWidth
          helperText="A short code for the product category or line."
        />

        <Box>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            Attribute Codes
          </Typography>
          <Stack spacing={1.5}>
            {attributes.map((attr, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField
                  label={`Attribute ${idx + 1}`}
                  placeholder="e.g. BLU, M, COTTON"
                  value={attr}
                  onChange={(e) => updateAttribute(idx, e.target.value)}
                  fullWidth
                  size="small"
                />
                <IconButton
                  aria-label="Remove attribute"
                  onClick={() => removeAttribute(idx)}
                  disabled={attributes.length === 0}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addAttribute} sx={{ mt: 1.5 }} size="small">
            Add Attribute
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Sequence Number"
            type="number"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            fullWidth
          />
          <TextField
            label="Pad To Digits"
            type="number"
            value={padLength}
            onChange={(e) => setPadLength(e.target.value)}
            fullWidth
            helperText="0 to disable padding"
          />
        </Box>

        <TextField
          select
          SelectProps={{ native: true }}
          label="Separator"
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
          fullWidth
        >
          <option value="-">Hyphen ( - )</option>
          <option value="_">Underscore ( _ )</option>
          <option value=".">Period ( . )</option>
          <option value="">None</option>
        </TextField>
      </Stack>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Generated SKU
        </Typography>
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'primary.main',
            color: 'white',
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {sku || '—'}
          </Typography>
          <IconButton onClick={copySku} disabled={!sku} sx={{ color: 'white' }} aria-label="Copy SKU">
            <ContentCopyIcon />
          </IconButton>
        </Paper>
        {copied && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
            Copied to clipboard!
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Each segment is uppercased and stripped of spaces automatically, then joined with your chosen
          separator. Empty attribute fields are skipped.
        </Typography>
      </Box>
    </Box>
  );
};

const ProductSkuGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Product SKU Generator</Typography>
      <Typography variant="body1">
        Enter a short category code, add one or more attribute codes (like a color code and a size code),
        and set a sequence number. The tool combines them into a structured SKU string, uppercased and
        joined with your chosen separator. Use the pad-to-digits setting to keep your sequence numbers a
        consistent length, like <code>0042</code> instead of <code>42</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A category code of <code>SHRT</code>, attribute codes <code>BLU</code> and <code>M</code>, a
        sequence number of <code>42</code> padded to 4 digits, and a hyphen separator produces{' '}
        <code>SHRT-BLU-M-0042</code> — a readable SKU for &quot;shirt, blue, medium, item #42&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting up a consistent SKU naming convention for a new product catalog.</li>
          <li>Generating SKUs in bulk for product variants that differ by color, size, or material.</li>
          <li>Standardizing inventory codes across a small business or online store.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>How is this different from a random ID generator?</strong> A random ID generator
            produces an opaque string with no inherent meaning. This tool instead builds a structured,
            human-readable code from meaningful components you define — category, attributes, and sequence —
            so anyone can look at the SKU and understand roughly what it represents.
          </li>
          <li>
            <strong>Can I add more than two attribute codes?</strong> Yes — click &quot;Add Attribute&quot;
            as many times as you need for extra dimensions like material, style, or warehouse location.
          </li>
          <li>
            <strong>Does the tool check for duplicate SKUs?</strong> No — it only formats the SKU string
            you build from your inputs. You&apos;ll still need to check new SKUs against your existing
            catalog to avoid collisions.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/product-sku-generator" content={content}>
      <ProductSkuGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default ProductSkuGenerator;
