'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { renderExcelSheetToCanvas } from './excelToImage';

const ExcelToJpgContent = () => {
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
      setResultUrl(canvas.toDataURL('image/jpeg', 0.92));
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
    a.download = file.name.replace(/\.(xlsx|xls)$/i, '') + '.jpg';
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
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Converting...</> : 'Convert to JPG'}
      </Button>

      {resultUrl && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2, textAlign: 'center' }}>
          <Box
            component="img"
            src={resultUrl}
            alt="Spreadsheet rendered as image"
            sx={{ maxWidth: '100%', maxHeight: 500, objectFit: 'contain', borderRadius: 1, mb: 2 }}
          />
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>Download JPG</Button>
        </Paper>
      )}
    </Box>
  );
};

const ExcelToJpg = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert Excel to JPG</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload an <code>.xlsx</code> or <code>.xls</code> file.</li>
          <li>Click <strong>Convert to JPG</strong> — the first sheet with data is rendered as a table image, with the first row bolded as a header.</li>
          <li>Preview the result, then click <strong>Download JPG</strong>.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A small expense-tracking spreadsheet with headers and 20 rows becomes a single JPG image showing the
        table exactly as its cell values appear — easy to paste into a chat, slide, or document that doesn&apos;t
        accept spreadsheet files.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sharing a quick snapshot of spreadsheet data in a chat app or presentation.</li>
          <li>Embedding a small table as an image in a document or webpage.</li>
          <li>Turning a data table into a shareable image without exposing the underlying formulas.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Which sheet gets converted?</strong> The first sheet in the workbook that contains data. Other sheets are ignored — split them into separate files first if you need images of each.</li>
          <li><strong>Are charts, colors, or cell formatting preserved?</strong> No — cell values are rendered into a plain bordered table; Excel-specific formatting, charts, and conditional formatting are not carried over.</li>
          <li><strong>Is there a size limit for very large sheets?</strong> Very wide or tall sheets produce a very large image, since the whole table is rendered at once — consider trimming the sheet to just the rows and columns you need first.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — reading and rendering both happen entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/excel-to-jpg" content={content}>
      <ExcelToJpgContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExcelToJpg;
