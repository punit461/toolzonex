'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { renderExcelSheetToCanvas } from './excelToImage';

const ExcelToPngContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState('');

  const handleConvert = async () => {
    setError('');
    setResultUrl('');
    if (!file) { setError('Choose an Excel file first.'); return; }
    setBusy(true);
    try {
      const canvas = await renderExcelSheetToCanvas(file);
      setResultUrl(canvas.toDataURL('image/png'));
    } catch {
      setError('Could not convert this file. Make sure it is a valid Excel (.xlsx or .xls) file with data in it.');
    } finally {
      setBusy(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl || !file) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = file.name.replace(/\.(xlsx|xls)$/i, '') + '.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box>
      <PdfFileDropzone
        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onFilesSelected={(files) => { setFile(files[0] ?? null); setResultUrl(''); }}
        label="Excel file"
        selectedNames={file ? [file.name] : []}
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Converting...</> : 'Convert to PNG'}
      </Button>

      {resultUrl && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2, textAlign: 'center' }}>
          <Box
            component="img"
            src={resultUrl}
            alt="Spreadsheet rendered as image"
            sx={{ maxWidth: '100%', maxHeight: 500, objectFit: 'contain', borderRadius: 1, mb: 2 }}
          />
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>Download PNG</Button>
        </Paper>
      )}
    </Box>
  );
};

const ExcelToPng = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert Excel to PNG</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload an <code>.xlsx</code> or <code>.xls</code> file.</li>
          <li>Click <strong>Convert to PNG</strong> — the first sheet with data is rendered as a table image, with the first row bolded as a header.</li>
          <li>Preview the result, then click <strong>Download PNG</strong>.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A pricing table with headers and 15 rows becomes a single crisp PNG image showing the table exactly as
        its cell values appear — with PNG&apos;s lossless compression, text and gridlines stay sharp, which
        matters for tables you plan to zoom into or print.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Embedding a sharp, lossless table image in documentation or a webpage.</li>
          <li>Sharing spreadsheet data as an image without JPEG compression artifacts around text edges.</li>
          <li>Turning a data table into a shareable image without exposing the underlying formulas.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why choose PNG over JPG?</strong> PNG is lossless, so text and gridlines in a table stay perfectly sharp with no compression artifacts — better than JPG for tables with fine text, at the cost of a somewhat larger file.</li>
          <li><strong>Which sheet gets converted?</strong> The first sheet in the workbook that contains data. Other sheets are ignored — split them into separate files first if you need images of each.</li>
          <li><strong>Are charts, colors, or cell formatting preserved?</strong> No — cell values are rendered into a plain bordered table; Excel-specific formatting, charts, and conditional formatting are not carried over.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — reading and rendering both happen entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/excel-to-png" content={content}>
      <ExcelToPngContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExcelToPng;
