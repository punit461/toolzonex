'use client';

import { Box, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfLabelCropper from './PdfLabelCropper';

const FlipkartLabelCropper = () => {
  const content = (
    <>
      <Typography variant="h2">How to Crop a Flipkart Shipping Label</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the shipping label PDF downloaded from Flipkart Seller Hub.</li>
          <li>Flipkart labels typically place the barcode and address block in one half of the page, with the tax invoice or manifest details in the other half — try <strong>Top Half</strong> or <strong>Bottom Half</strong> and check the preview.</li>
          <li>If the preset doesn&apos;t match, switch to <strong>Custom (inches)</strong> and set the exact region — a standard thermal label is 4 inches wide by 6 inches tall.</li>
          <li>Click <strong>Crop Flipkart Label &amp; Download</strong> to get a PDF trimmed to just the label on every page.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A Flipkart bulk label PDF with 15 shipments, each on its own A4 page with the label in the upper half
        and invoice text below, becomes a clean 15-page PDF where every page is just the label — ready to print
        directly on a 4×6 thermal printer with no wasted paper.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing Flipkart shipping labels on a thermal printer without manually trimming each page.</li>
          <li>Stripping out the tax invoice section Flipkart bundles onto the same page as the label.</li>
          <li>Batch-cropping a multi-shipment manifest PDF in one pass instead of one label at a time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why doesn&apos;t a preset line up with my label?</strong> Flipkart&apos;s label layout can vary by shipment type and courier partner. Use the live preview and switch to Custom to enter the exact box in inches.</li>
          <li><strong>Does this work for multi-shipment bulk label PDFs?</strong> Yes — the same crop region is applied to every page, so a bulk manifest with many shipments is cropped in one pass.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — cropping happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/flipkart-label-cropper" content={content}>
      <PdfLabelCropper platformName="Flipkart" fileSuffix="flipkart-label" />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlipkartLabelCropper;
