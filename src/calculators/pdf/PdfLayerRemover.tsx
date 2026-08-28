'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { PDFName } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const PdfLayerRemoverContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ layerNames: string[] } | null>(null);
  const [noLayers, setNoLayers] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    setResult(null);
    setNoLayers(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const ocProperties = doc.catalog.getOCProperties();

      if (!ocProperties) {
        setNoLayers(true);
        setBusy(false);
        return;
      }

      const layerNames = ocProperties.getGroups().map((g) => g.name || '(unnamed layer)');
      doc.catalog.delete(PDFName.of('OCProperties'));

      setResult({ layerNames });
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-layers.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); setNoLayers(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Processing...' : 'Remove Layers'}
      </Button>

      {noLayers && (
        <Alert severity="info" sx={{ mt: 3 }}>
          This PDF has no optional content (layer) data — there is nothing to remove.
        </Alert>
      )}

      {result && (
        <Alert severity="success" sx={{ mt: 3 }}>
          Removed layer configuration for {result.layerNames.length} layer{result.layerNames.length !== 1 ? 's' : ''}
          {result.layerNames.length > 0 ? `: ${result.layerNames.join(', ')}` : ''}. All content is now always visible.
        </Alert>
      )}
    </Box>
  );
};

const PdfLayerRemover = () => {
  const content = (
    <>
      <Typography variant="h2">How PDF Layer Removal Works Here</Typography>
      <Box sx={{ typography: 'body1' }}>
        <p>
          Some PDFs (commonly ones exported from CAD software, Illustrator, or InDesign) organize content into
          Optional Content Groups (OCGs), often called &quot;layers&quot;, which a compatible viewer can toggle
          on or off. This tool removes the document&apos;s <code>/OCProperties</code> catalog entry, which is
          the layer visibility configuration. Without it, every viewer treats all content as simply part of the
          page — nothing is hidden or toggleable anymore, effectively flattening all layers into one always-visible
          document.
        </p>
      </Box>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload a PDF that contains layers.</li>
          <li>Click <strong>Remove Layers</strong> — the tool lists the layer names it found, then strips the layer configuration.</li>
          <li>Download the result. All content that was in any layer is now permanently visible, and the file no longer exposes any toggleable layers.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An architectural drawing exported with separate "Dimensions", "Furniture", and "Electrical" layers —
        some of which might be hidden by default — becomes a single flat page where everything from every layer
        is shown at once, with no layer panel left for a viewer to toggle.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Making sure every layer's content is visible before sharing a CAD or design export externally.</li>
          <li>Simplifying a layered PDF so viewers without layer-toggle support (or that mishandle default visibility) always show everything.</li>
          <li>Removing accidental hidden layers that might contain outdated or draft content.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this delete content that was in a hidden layer?</strong> No — nothing is deleted from the page content itself. Content that was hidden by default becomes visible, since there's no longer any layer configuration to hide it.</li>
          <li><strong>What if my PDF has no layers?</strong> The tool detects this and tells you there's nothing to remove — no file is altered or downloaded.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-layer-remover" content={content}>
      <PdfLayerRemoverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfLayerRemover;
