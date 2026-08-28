'use client';

import { Box, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfLabelCropper from './PdfLabelCropper';

const AmazonLabelCropper = () => {
  const content = (
    <>
      <Typography variant="h2">How to Crop an Amazon Shipping Label</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the shipping label PDF downloaded from Amazon Seller Central (FBA or Easy Ship).</li>
          <li>Amazon label PDFs frequently include a packing slip or SKU summary alongside the label on the same page — try <strong>Top Half</strong> or <strong>Bottom Half</strong> and check the preview.</li>
          <li>If neither preset isolates just the label, switch to <strong>Custom (inches)</strong> and enter the exact region — a standard thermal label is 4 inches wide by 6 inches tall.</li>
          <li>Click <strong>Crop Amazon Label &amp; Download</strong> to get a PDF trimmed to just the label on every page.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An Amazon Easy Ship label PDF with 10 orders, each page containing the shipping label plus a packing
        slip beneath it, becomes a clean 10-page PDF where every page is just the label — ready for a 4×6
        thermal printer without cutting off any barcode.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing Amazon FBA or Easy Ship labels on a thermal printer without manual trimming.</li>
          <li>Removing the packing slip or SKU summary Amazon adds below the shipping label.</li>
          <li>Batch-cropping a multi-order label PDF in one pass instead of handling each shipment separately.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why doesn&apos;t a preset line up with my label?</strong> Amazon&apos;s label layout varies between FBA, Easy Ship, and self-ship ordertypes. Use the live preview and switch to Custom to enter the exact box in inches.</li>
          <li><strong>Does this work for multi-order bulk label PDFs?</strong> Yes — the same crop region is applied to every page, so a bulk PDF with many orders is cropped in one pass.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — cropping happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/amazon-label-cropper" content={content}>
      <PdfLabelCropper platformName="Amazon" fileSuffix="amazon-label" />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AmazonLabelCropper;
