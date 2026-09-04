'use client';

import { useMemo, useState } from 'react';
import {
  Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem,
  IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface StorageUnit {
  id: string;
  label: string;
  toBits: number;
}

const UNITS: StorageUnit[] = [
  { id: 'bit', label: 'Bit (b)', toBits: 1 },
  { id: 'byte', label: 'Byte (B)', toBits: 8 },
  { id: 'kb', label: 'Kilobyte (KB)', toBits: 8 * 1024 },
  { id: 'mb', label: 'Megabyte (MB)', toBits: 8 * 1024 ** 2 },
  { id: 'gb', label: 'Gigabyte (GB)', toBits: 8 * 1024 ** 3 },
  { id: 'tb', label: 'Terabyte (TB)', toBits: 8 * 1024 ** 4 },
  { id: 'pb', label: 'Petabyte (PB)', toBits: 8 * 1024 ** 5 },
];

function convert(value: number, from: StorageUnit, to: StorageUnit): number {
  return (value * from.toBits) / to.toBits;
}

function formatResult(value: number): string {
  if (!isFinite(value)) return '0';
  if (value === 0) return '0';
  const abs = Math.abs(value);
  if (abs >= 1e9 || abs < 1e-6) return value.toExponential(6);
  return parseFloat(value.toPrecision(10)).toLocaleString('en-US', { maximumFractionDigits: 10 });
}

const StorageConverterContent = () => {
  const [fromId, setFromId] = useState('gb');
  const [toId, setToId] = useState('mb');
  const [value, setValue] = useState<number>(1);

  const fromUnit = UNITS.find((u) => u.id === fromId)!;
  const toUnit = UNITS.find((u) => u.id === toId)!;

  const result = useMemo(() => convert(value, fromUnit, toUnit), [value, fromUnit, toUnit]);

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' }, gap: 2, alignItems: 'end' }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography gutterBottom>From</Typography>
          <TextField
            fullWidth
            type="number"
            value={value}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setValue(e.target.value === '' ? 0 : Number(e.target.value))}
            sx={{ mb: 1.5 }}
          />
          <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select value={fromId} label="Unit" onChange={(e) => setFromId(e.target.value)}>
              {UNITS.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <IconButton onClick={swap} sx={{ justifySelf: 'center', mb: { xs: 0, md: 1.5 } }} aria-label="Swap units">
          <SwapHorizIcon sx={{ transform: { xs: 'rotate(90deg)', md: 'none' } }} />
        </IconButton>

        <Box sx={{ minWidth: 0 }}>
          <Typography gutterBottom>To</Typography>
          <TextField
            fullWidth
            value={formatResult(result)}
            InputProps={{ readOnly: true }}
            sx={{ mb: 1.5 }}
          />
          <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select value={toId} label="Unit" onChange={(e) => setToId(e.target.value)}>
              {UNITS.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          {fromUnit.label} to other storage units
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>Unit</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {UNITS.filter((u) => u.id !== fromId).map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.label}</TableCell>
                  <TableCell align="right">{formatResult(convert(value, fromUnit, u))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const StorageConverter = () => {
  const content = (
    <>
      <Typography variant="h2">Digital Storage Converter</Typography>
      <Typography variant="body1">
        Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes. Enter a value,
        choose your source and target units, and see the converted result along with a full comparison table
        against every other unit.
      </Typography>

      <Typography variant="h2">Binary vs. Decimal Storage Units</Typography>
      <Typography variant="body1">
        There are two competing conventions for storage units. The <strong>decimal (SI)</strong> convention
        treats a kilobyte as exactly 1,000 bytes, a megabyte as 1,000,000 bytes, and so on — this is how hard
        drive manufacturers typically advertise capacity. The <strong>binary (IEC)</strong> convention treats a
        kilobyte as 1,024 bytes, a megabyte as 1,024² bytes, and so on — this is how operating systems like
        Windows and macOS typically report file and disk sizes, and it&apos;s the reason a drive labeled
        &quot;1TB&quot; shows up as roughly 931GB in your file explorer.
      </Typography>
      <Typography variant="body1">
        This calculator uses the <strong>binary (1024-based) convention</strong> throughout — 1 KB = 1,024
        bytes, 1 MB = 1,024 KB, 1 GB = 1,024 MB, and so on — since that matches how most operating systems,
        file managers, and everyday computing tools display file and storage sizes.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        1 Byte = 8 Bits · 1 KB = 1,024 Bytes · 1 MB = 1,024 KB · 1 GB = 1,024 MB · 1 TB = 1,024 GB · 1 PB = 1,024 TB
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2.5 GB video file is 2.5 × 1,024 = 2,560 MB, or 2.5 × 1,024³ bytes. Converting the other way, a
        500,000 KB download is 500,000 ÷ 1,024 ≈ 488.28 MB.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a file will fit on a USB drive, SD card, or cloud storage plan.</li>
          <li>Converting a download or file size between the units your software and OS display.</li>
          <li>Estimating bandwidth or data usage in bits vs. bytes (internet speeds are usually quoted in bits per second).</li>
          <li>Comparing advertised drive capacity to the size your computer actually reports.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Why does my 1TB hard drive show less than 1,000GB of space?</strong> Manufacturers advertise
            capacity using the decimal convention (1TB = 1,000,000,000,000 bytes), but your operating system
            reports it using the binary convention this calculator uses (1TB ≈ 1,099,511,627,776 bytes) — the
            same physical bytes, just measured with a different-sized &quot;GB.&quot;
          </li>
          <li>
            <strong>What&apos;s the difference between a bit and a byte?</strong> A byte is 8 bits. Internet
            connection speeds are almost always advertised in bits per second (Mbps), while file sizes are
            almost always shown in bytes (MB) — dividing a download&apos;s megabit speed by 8 gives you the
            expected megabyte-per-second transfer rate.
          </li>
          <li>
            <strong>Are KiB, MiB, and GiB the same as this tool&apos;s KB, MB, and GB?</strong> Yes in value —
            KiB/MiB/GiB are the technically precise IEC names for binary (1,024-based) units. This tool uses the
            more commonly searched KB/MB/GB labels but calculates them using the binary convention those
            IEC units represent.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/storage-converter" content={content}>
      <StorageConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StorageConverter;
