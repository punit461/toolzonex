'use client';

import { useState, RefObject } from 'react';
import { Box, Button, Alert } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { elementToPdfBytes } from '../../utils/elementToPdf';
import { downloadBytes } from '../../calculators/pdf/pdfUtils';

interface PrintDownloadButtonsProps {
  targetRef: RefObject<HTMLDivElement | null>;
  fileName: string;
  printLabel?: string;
  downloadLabel?: string;
}

/** Print + Download PDF actions for a PrintableArea. Print is scoped to that element via the "print-area" CSS rule; Download rasterizes the same element into a PDF. */
const PrintDownloadButtons = ({ targetRef, fileName, printLabel = 'Print', downloadLabel = 'Download PDF' }: PrintDownloadButtonsProps) => {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!targetRef.current) return;
    setError('');
    setDownloading(true);
    try {
      const bytes = await elementToPdfBytes(targetRef.current);
      downloadBytes(bytes, fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
    } catch {
      setError('Could not generate a PDF. Try printing instead.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button startIcon={<PrintIcon />} variant="outlined" onClick={() => window.print()}>{printLabel}</Button>
        <Button startIcon={<DownloadIcon />} variant="contained" onClick={handleDownload} disabled={downloading}>
          {downloading ? 'Preparing...' : downloadLabel}
        </Button>
      </Box>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default PrintDownloadButtons;
