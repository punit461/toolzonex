'use client';

import { Box, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfLabelCropper from './PdfLabelCropper';

const MeeshoLabelCropper = () => {
  const content = (
    <>
      <Typography variant="h2">How to Crop a Meesho Shipping Label</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the shipping label PDF you downloaded from the Meesho Supplier Panel.</li>
          <li>Meesho label PDFs often print the barcode/address label in one half of the page and order or SKU details in the other — try <strong>Top Half</strong> or <strong>Bottom Half</strong> and check the preview.</li>
          <li>If neither preset lines up with your label, switch to <strong>Custom (inches)</strong> and enter the exact region — a standard thermal label is 4 inches wide by 6 inches tall.</li>
          <li>Click <strong>Crop Meesho Label &amp; Download</strong> to get a PDF trimmed to just the label on every page.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A Meesho bulk label PDF with 20 orders, one per A4 page with the label crammed into the top portion and
        blank space or invoice text below, becomes a clean 20-page PDF where every page is just the 4×6 label —
        ready to send straight to a thermal label printer without wasting paper on the empty margin.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing Meesho shipping labels on a 4×6 thermal printer without manual trimming.</li>
          <li>Removing the order/invoice section that Meesho sometimes bundles onto the same page as the label.</li>
          <li>Batch-processing many order labels at once instead of cropping each one by hand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why doesn&apos;t a preset line up with my label?</strong> Meesho occasionally changes its label layout, and label position can vary by seller settings. Use the preview and switch to Custom to enter the exact box in inches.</li>
          <li><strong>Does this work for multi-order bulk label PDFs?</strong> Yes — the same crop region is applied to every page, so a bulk PDF with dozens of orders is cropped in one pass.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — cropping happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/meesho-label-cropper" content={content}>
      <PdfLabelCropper platformName="Meesho" fileSuffix="meesho-label" />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MeeshoLabelCropper;
