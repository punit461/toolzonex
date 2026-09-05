'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// Standard IEEE 802.3 / zlib CRC-32 polynomial, table-based implementation.
const CRC32_POLYNOMIAL = 0xedb88320;

let crcTable: Uint32Array | null = null;

function getCrcTable(): Uint32Array {
  if (crcTable) return crcTable;
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? (CRC32_POLYNOMIAL ^ (c >>> 1)) >>> 0 : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  crcTable = table;
  return table;
}

function crc32(text: string): string {
  const table = getCrcTable();
  const bytes = new TextEncoder().encode(text);
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = (table[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8)) >>> 0;
  }
  crc = (crc ^ 0xffffffff) >>> 0;
  return crc.toString(16).toUpperCase().padStart(8, '0');
}

const Crc32GeneratorContent = () => {
  const [text, setText] = useState<string>('Hello, world!');

  const hash = useMemo(() => (text ? crc32(text) : ''), [text]);

  const copyResult = async () => {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
    } catch {
      // ignore
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Text to Hash"
        multiline
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here..."
        fullWidth
        sx={{ fontFamily: 'monospace' }}
      />

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>CRC-32 Checksum</Typography>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'monospace' }}>{hash || '—'}</Typography>
          <IconButton onClick={copyResult} sx={{ color: 'white' }} title="Copy to clipboard">
            <ContentCopyIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

const Crc32Generator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the CRC32 Generator</Typography>
      <Typography variant="body1">
        Type or paste any text and this tool instantly computes its CRC-32 checksum — a widely used 32-bit
        error-detection code. The text is first encoded as UTF-8 bytes, then run through the standard
        IEEE 802.3 / zlib CRC-32 algorithm (polynomial 0xEDB88320) using a table-based implementation, the
        same approach used by tools like gzip, PNG, and ZIP file formats.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        CRC32(text) = 32-bit checksum of UTF-8 bytes, IEEE 802.3 polynomial 0xEDB88320
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The text &quot;Hello, world!&quot; produces the CRC-32 checksum <code>EBE6C6E6</code>, shown as an
        8-character uppercase hexadecimal string. Any change to the input — even a single character — produces
        a completely different checksum.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying that a piece of text or file content hasn&apos;t been corrupted or altered.</li>
          <li>Generating quick checksums for cache keys, deduplication, or data integrity checks in code.</li>
          <li>Understanding or reproducing CRC-32 values used by ZIP, PNG, or gzip file formats.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is CRC-32 the same as a cryptographic hash like SHA-256?</strong> No — CRC-32 is designed for fast error detection (catching accidental corruption), not security. It is not collision-resistant against a deliberate attacker, so it should never be used to verify data integrity against tampering or for password hashing. Use SHA-256 or a similar cryptographic hash function for security-sensitive purposes.</li>
          <li><strong>Why does this tool use UTF-8 encoding before hashing?</strong> CRC-32 operates on raw bytes, not characters, so the input text must first be converted to bytes. UTF-8 is the standard, most widely compatible text encoding, matching what most CRC-32 implementations in other languages and tools use by default.</li>
          <li><strong>Does this match the CRC-32 value used by ZIP or PNG files?</strong> Yes — this tool implements the IEEE 802.3 / zlib CRC-32 variant (polynomial 0xEDB88320), which is the same variant used by the ZIP file format, PNG chunk checksums, and gzip. Some other systems use different CRC polynomials, which would produce different results for the same input.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/crc32-generator" content={content}>
      <Crc32GeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Crc32Generator;
