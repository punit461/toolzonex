'use client';

import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

const PDF_TOOLS = [
  { slug: 'pdf-editor', name: 'PDF Editor', desc: 'Visually delete, rotate, reorder, merge & watermark pages.' },
  { slug: 'merge-pdf', name: 'Merge PDF', desc: 'Combine multiple PDFs into one.' },
  { slug: 'split-pdf', name: 'Split PDF', desc: 'Split a PDF into multiple files.' },
  { slug: 'rotate-pdf', name: 'Rotate PDF', desc: 'Rotate all pages by 90/180/270°.' },
  { slug: 'delete-pdf-pages', name: 'Delete PDF Pages', desc: 'Remove specific pages.' },
  { slug: 'extract-pdf-pages', name: 'Extract PDF Pages', desc: 'Pull specific pages into a new file.' },
  { slug: 'organize-pdf', name: 'Organize PDF', desc: 'Reorder pages.' },
  { slug: 'reorder-pdf-pages', name: 'Reorder PDF Pages', desc: 'Drag and drop to rearrange page order.' },
  { slug: 'number-pdf-pages', name: 'Add Page Numbers', desc: 'Number every page.' },
  { slug: 'watermark-pdf', name: 'Watermark PDF', desc: 'Add a diagonal text watermark.' },
  { slug: 'flatten-pdf', name: 'Flatten PDF', desc: 'Make form fields permanent.' },
  { slug: 'compress-pdf', name: 'Compress PDF', desc: 'Shrink a PDF\'s file size.' },
  { slug: 'pdf-to-text', name: 'PDF to Text', desc: 'Extract text from a PDF.' },
  { slug: 'jpg-to-pdf', name: 'JPG to PDF', desc: 'Convert images into a PDF.' },
  { slug: 'text-to-pdf', name: 'Text to PDF', desc: 'Convert plain text into a PDF.' },
  { slug: 'csv-to-pdf', name: 'CSV to PDF', desc: 'Convert a CSV into a PDF table.' },
  { slug: 'word-to-pdf', name: 'Word to PDF', desc: 'Convert a .docx file into a PDF.' },
  { slug: 'excel-to-pdf', name: 'Excel to PDF', desc: 'Convert a spreadsheet into a PDF table.' },
  { slug: 'html-to-pdf', name: 'HTML to PDF', desc: 'Convert HTML markup into a PDF.' },
  { slug: 'convert-pdf-to-legal', name: 'Convert PDF to Legal Size', desc: 'Scale every page to fit US Legal size.' },
  { slug: 'convert-pdf-to-letter', name: 'Convert PDF to Letter Size', desc: 'Scale every page to fit US Letter size.' },
  { slug: 'pdf-split-by-page-range', name: 'Split PDF by Page Range', desc: 'Split a PDF into files by page range.' },
  { slug: 'pdf-merge-selected-pages', name: 'Merge Selected PDF Pages', desc: 'Merge specific pages from multiple PDFs.' },
  { slug: 'pdf-file-information-viewer', name: 'PDF File Information Viewer', desc: 'View file size, page count, version & more.' },
  { slug: 'pdf-font-counter', name: 'PDF Font Counter', desc: 'Count distinct fonts used in a PDF.' },
  { slug: 'pdf-reading-time', name: 'PDF Reading Time Calculator', desc: 'Estimate how long a PDF takes to read.' },
  { slug: 'pdf-page-aspect-ratio', name: 'PDF Page Aspect Ratio Checker', desc: 'Check the aspect ratio of PDF pages.' },
  { slug: 'rotate-pdf-pages', name: 'Rotate Specific PDF Pages', desc: 'Rotate individual pages independently.' },
  { slug: 'xml-to-pdf', name: 'XML to PDF', desc: 'Convert formatted XML into a PDF.' },
  { slug: 'add-barcode-to-pdf', name: 'Add Barcode to PDF', desc: 'Stamp a barcode onto a PDF page.' },
  { slug: 'extract-hyperlinks', name: 'Extract Hyperlinks from PDF', desc: 'List every clickable link in a PDF.' },
  { slug: 'meesho-label-cropper', name: 'Meesho Label Cropper', desc: 'Crop Meesho shipping labels to 4x6.' },
  { slug: 'flipkart-label-cropper', name: 'Flipkart Label Cropper', desc: 'Crop Flipkart shipping labels to 4x6.' },
  { slug: 'amazon-label-cropper', name: 'Amazon Label Cropper', desc: 'Crop Amazon shipping labels to 4x6.' },
  { slug: 'sign-pdf', name: 'Sign PDF', desc: 'Draw or type a signature onto a PDF.' },
  { slug: 'merge-pdf-pages-into-image', name: 'Merge PDF Pages into Image', desc: 'Stack PDF pages into one image.' },
  { slug: 'pdf-to-bmp', name: 'PDF to BMP', desc: 'Convert PDF pages to BMP images.' },
  { slug: 'translate-pdf', name: 'Translate PDF', desc: "Translate a PDF's text online." },
  { slug: 'pdf-to-llamaindex-json', name: 'PDF to LlamaIndex JSON', desc: 'Convert a PDF into LlamaIndex JSON.' },
  { slug: 'prepare-pdf-for-ai', name: 'Prepare PDF for AI', desc: 'Clean and chunk PDF text for LLMs.' },
  { slug: 'pdf-workflow', name: 'PDF Workflow Builder', desc: 'Chain two PDF operations together.' },
  { slug: 'excel-to-jpg', name: 'Excel to JPG', desc: 'Render a spreadsheet as a JPG image.' },
  { slug: 'excel-to-png', name: 'Excel to PNG', desc: 'Render a spreadsheet as a PNG image.' },
  { slug: 'pdf-color-inverter', name: 'PDF Color Inverter', desc: 'Invert every color like a photo negative.' },
  { slug: 'pdf-grayscale-converter', name: 'PDF Grayscale Converter', desc: 'Convert a color PDF to grayscale.' },
  { slug: 'pdf-black-and-white-converter', name: 'PDF Black & White Converter', desc: 'Threshold a PDF into pure black and white.' },
  { slug: 'pdf-font-extractor', name: 'PDF Font Extractor', desc: "List a PDF's fonts and embedding status." },
  { slug: 'pdf-transparency-flattener', name: 'PDF Transparency Flattener', desc: 'Flatten transparency onto an opaque background.' },
  { slug: 'pdf-ink-saver', name: 'PDF Ink Saver', desc: 'Lighten a PDF to save ink when printing.' },
  { slug: 'pdf-safe-print-optimizer', name: 'PDF Safe Print Optimizer', desc: 'Add a safety margin so nothing gets clipped.' },
  { slug: 'pdf-layer-remover', name: 'PDF Layer Remover', desc: 'Remove optional content layers from a PDF.' },
  { slug: 'pdf-watermark-remover-simple', name: 'PDF Watermark Remover (Simple)', desc: 'Remove watermark/stamp annotations.' },
  { slug: 'pdf-page-number-remover', name: 'PDF Page Number Remover', desc: 'Cover the page-number area with white.' },
  { slug: 'pdf-difference-highlighter', name: 'PDF Difference Highlighter', desc: 'Highlight pixel differences between two PDFs.' },
  { slug: 'pdf-object-counter', name: 'PDF Object Counter', desc: 'Count pages, images, fonts & PDF objects.' },
  { slug: 'ocr-pdf', name: 'OCR PDF', desc: 'Extract text from scanned PDFs using in-browser OCR.' },
  { slug: 'pdf-to-word', name: 'PDF to Word', desc: 'Extract PDF text into an editable .docx file.' },
  { slug: 'pdf-to-powerpoint', name: 'PDF to PowerPoint', desc: 'Turn each PDF page into a slide image in a .pptx.' },
  { slug: 'powerpoint-to-pdf', name: 'PowerPoint to PDF', desc: 'Extract embedded slide images from a .pptx into a PDF.' },
  { slug: 'pdf-to-tiff', name: 'PDF to TIFF', desc: 'Convert PDF pages into a multi-page TIFF image.' },
  { slug: 'digital-sign-pdf', name: 'Digital Sign PDF', desc: 'Add a visual signature block with a SHA-256 hash.' },
  { slug: 'validate-signature-pdf', name: 'Validate PDF Signature', desc: 'Detect signature fields and metadata in a PDF.' },
  { slug: 'repair-pdf', name: 'Repair PDF', desc: 'Recover a corrupt or malformed PDF\'s structure.' },
  { slug: 'change-pdf-text-color', name: 'Change PDF Text Color', desc: 'Recolor dark text using a pixel-based approximation.' },
  { slug: 'pdf-to-pdfa-converter', name: 'PDF to PDF/A Converter', desc: 'Apply PDF/A-style metadata for archival hygiene.' },
  { slug: 'pdf-page-counter', name: 'PDF Page Counter', desc: 'Count pages in a PDF instantly.' },
  { slug: 'pdf-file-size-viewer', name: 'PDF File Size Viewer', desc: 'Check PDF file size and metadata.' },
  { slug: 'pdf-page-size-detector', name: 'PDF Page Size Detector', desc: 'Check PDF page dimensions.' },
  { slug: 'pdf-orientation-detector', name: 'PDF Orientation Detector', desc: 'Check if PDF pages are portrait or landscape.' },
  { slug: 'pdf-rotation-detector', name: 'PDF Rotation Detector', desc: 'Check rotation angle of each PDF page.' },
  { slug: 'pdf-password-strength-checker', name: 'PDF Password Checker', desc: 'Check if a PDF is password-protected.' },
  { slug: 'pdf-page-dimension-viewer', name: 'PDF Dimension Viewer', desc: 'View PDF page dimensions in multiple units.' },
  { slug: 'add-pdf-border', name: 'Add Border to PDF', desc: 'Add a coloured border to every PDF page.' },
  { slug: 'pdf-text-statistics', name: 'PDF Text Statistics', desc: 'Word count & text analysis for PDFs.' },
  { slug: 'pdf-keyword-frequency', name: 'PDF Keyword Frequency', desc: 'Find how often words appear in a PDF.' },
  { slug: 'pdf-dpi-checker', name: 'PDF DPI Checker', desc: 'Check the effective DPI of a PDF.' },
  { slug: 'pdf-version-checker', name: 'PDF Version Checker', desc: 'Check the PDF version of a file.' },
  { slug: 'pdf-bookmark-viewer', name: 'PDF Bookmark Viewer', desc: 'View PDF bookmarks and table of contents.' },
  { slug: 'pdf-outline-viewer', name: 'PDF Outline Viewer', desc: 'View the structural outline of a PDF.' },
  { slug: 'pdf-font-viewer', name: 'PDF Font Viewer', desc: 'Check what fonts are used in a PDF.' },
  { slug: 'pdf-image-counter', name: 'PDF Image Counter', desc: 'Count how many images are in a PDF.' },
  { slug: 'pdf-link-counter', name: 'PDF Link Counter', desc: 'Count hyperlinks in a PDF file.' },
  { slug: 'convert-pdf-to-a4', name: 'Convert PDF to A4', desc: 'Convert any PDF to A4 page size.' },
  { slug: 'resize-pdf-pages', name: 'Resize PDF Pages', desc: 'Change PDF page size to custom dimensions.' },
  { slug: 'crop-pdf', name: 'Crop PDF', desc: 'Crop margins from PDF pages.' },
  { slug: 'create-blank-pdf', name: 'Create Blank PDF', desc: 'Create empty PDF pages.' },
  { slug: 'pdf-to-base64', name: 'PDF to Base64', desc: 'Convert a PDF to a Base64 string.' },
  { slug: 'pdf-rasterizer', name: 'PDF Rasterizer', desc: 'Convert PDF pages to PNG images.' },
  { slug: 'pdf-thumbnail-sheet', name: 'PDF Thumbnail Sheet', desc: 'Create a contact sheet of PDF pages.' },
  { slug: 'pdf-preview-generator', name: 'PDF Preview Generator', desc: 'Preview all pages of a PDF as thumbnails.' },
  { slug: 'pdf-snapshot-tool', name: 'PDF Snapshot Tool', desc: 'Capture a PDF page as a high-resolution image.' },
  { slug: 'add-blank-last-page', name: 'Add Blank Last Page', desc: 'Append a blank page at the end of a PDF.' },
  { slug: 'add-cover-page', name: 'Add Cover Page', desc: 'Insert a blank or titled cover page at the beginning.' },
  { slug: 'add-date-to-pdf', name: 'Add Date to PDF', desc: 'Stamp today\'s date on every page of a PDF.' },
  { slug: 'add-pdf-footer', name: 'Add PDF Footer', desc: 'Add custom text footer to every page.' },
  { slug: 'add-pdf-header', name: 'Add PDF Header', desc: 'Add custom text header to every page.' },
  { slug: 'add-pdf-margins', name: 'Add PDF Margins', desc: 'Add extra white space around PDF pages.' },
  { slug: 'add-timestamp-to-pdf', name: 'Add Timestamp to PDF', desc: 'Stamp date and time on every page of a PDF.' },
  { slug: 'duplicate-pdf-pages', name: 'Duplicate PDF Pages', desc: 'Duplicate specific pages in a PDF.' },
  { slug: 'insert-blank-pages', name: 'Insert Blank Pages', desc: 'Insert blank pages at specific positions.' },
  { slug: 'pdf-contact-sheet-generator', name: 'PDF Contact Sheet', desc: 'Create a grid of page thumbnails from a PDF.' },
  { slug: 'pdf-split-by-size', name: 'PDF Split by Size', desc: 'Split a PDF into parts under a target file size.' },
  { slug: 'pdf-page-crop-by-pixels', name: 'PDF Page Crop', desc: 'Crop PDF pages by specifying margins in mm.' },
  { slug: 'remove-cover-page', name: 'Remove Cover Page', desc: 'Remove the first page from a PDF.' },
  { slug: 'reverse-pdf-pages', name: 'Reverse PDF Pages', desc: 'Reverse the order of all pages in a PDF.' },
  { slug: 'pdf-to-csv', name: 'PDF to CSV', desc: 'Extract tables from a PDF into CSV format.' },
  { slug: 'pdf-to-html', name: 'PDF to HTML', desc: 'Convert a PDF into a simple HTML page.' },
  { slug: 'remove-pdf-margins', name: 'Remove PDF Margins', desc: 'Strip crop, trim, and bleed margins from PDF pages.' },
  { slug: 'remove-hyperlinks', name: 'Remove Hyperlinks', desc: 'Strip hyperlink annotations from PDF pages.' },
  { slug: 'flip-pdf-horizontally', name: 'Flip PDF Horizontally', desc: 'Mirror every page left-to-right.' },
  { slug: 'flip-pdf-vertically', name: 'Flip PDF Vertically', desc: 'Mirror every page top-to-bottom.' },
  { slug: 'pdf-metadata-viewer', name: 'PDF Metadata Viewer', desc: 'View all properties of a PDF.' },
  { slug: 'pdf-metadata-editor', name: 'PDF Metadata Editor', desc: 'Edit PDF document properties.' },
  { slug: 'pdf-metadata-remover', name: 'PDF Metadata Remover', desc: 'Strip all metadata from a PDF.' },
  { slug: 'protect-pdf', name: 'Protect PDF', desc: 'Password-protect a PDF file.' },
  { slug: 'unlock-pdf', name: 'Unlock PDF', desc: 'Remove password from a PDF.' },
  { slug: 'remove-pdf-bookmarks', name: 'Remove PDF Bookmarks', desc: 'Remove all bookmarks from a PDF.' },
  { slug: 'pdf-to-xml', name: 'PDF to XML', desc: 'Convert a PDF to XML format.' },
  { slug: 'compare-two-pdfs', name: 'Compare Two PDFs', desc: 'Compare two PDF files side by side.' },
  { slug: 'remove-header-footer', name: 'Remove Header & Footer', desc: 'Remove headers and footers from a PDF.' },
  { slug: 'extract-pdf-bookmarks', name: 'Extract PDF Bookmarks', desc: 'Extract bookmarks and outlines from a PDF.' },
  { slug: 'pdf-attachment-extractor', name: 'PDF Attachment Extractor', desc: 'Extract embedded file attachments from a PDF.' },
  { slug: 'remove-blank-pages', name: 'Remove Blank Pages', desc: 'Remove blank or empty pages from a PDF.' },
  { slug: 'pdf-to-image', name: 'PDF to Image', desc: 'Convert PDF pages to PNG images.' },
  { slug: 'pdf-to-png', name: 'PDF to PNG', desc: 'Export PDF pages as lossless PNG files.' },
  { slug: 'pdf-to-jpg', name: 'PDF to JPG', desc: 'Convert PDF pages to JPG images.' },
  { slug: 'pdf-to-webp', name: 'PDF to WebP', desc: 'Convert PDF pages to modern WebP images.' },
  { slug: 'extract-images-from-pdf', name: 'Extract Images from PDF', desc: 'Pull embedded images out of a PDF.' },
  { slug: 'pdf-booklet-creator', name: 'PDF Booklet Creator', desc: 'Arrange pages for booklet printing.' },
  { slug: 'pdf-n-up-creator', name: 'PDF N-Up Creator', desc: 'Print multiple PDF pages on one sheet.' },
  { slug: 'pdf-poster-creator', name: 'PDF Poster Creator', desc: 'Tile a PDF page across multiple sheets for poster printing.' },
  { slug: 'pdf-recompress-images', name: 'PDF Recompress Images', desc: 'Recompress images to shrink PDF file size.' },
  { slug: 'pdf-image-quality-optimizer', name: 'PDF Image Quality Optimizer', desc: 'Fine-tune image quality in a PDF with a slider.' },
  { slug: 'pdf-annotation-remover', name: 'PDF Annotation Remover', desc: 'Strip all comments and annotations from a PDF.' },
  { slug: 'pdf-comment-extractor', name: 'PDF Comment Extractor', desc: 'Pull all annotations out of a PDF and view them.' },
  { slug: 'pdf-to-excel', name: 'PDF to Excel', desc: 'Extract tables from a PDF into Excel format.' },
  { slug: 'pdf-image-resolution-changer', name: 'PDF Image Resolution Changer', desc: 'Change the DPI resolution of images in a PDF.' },
  { slug: 'detect-blank-pages', name: 'Detect Blank Pages', desc: 'Find blank or empty pages in a PDF.' },
  { slug: 'mirror-pdf-pages', name: 'Mirror PDF Pages', desc: 'Create a mirror/spread layout from PDF pages.' },
  { slug: 'remove-pdf-border', name: 'Remove PDF Border', desc: 'Remove visible borders from PDF pages.' },
  { slug: 'pdf-duplex-print-optimizer', name: 'PDF Duplex Print Optimizer', desc: 'Prepare a PDF for double-sided printing.' },
  { slug: 'pdf-attachment-remover', name: 'PDF Attachment Remover', desc: 'Remove embedded file attachments from a PDF.' },
  { slug: 'pdf-embedded-image-exporter', name: 'PDF Embedded Image Exporter', desc: 'Extract all embedded images from a PDF.' },
  { slug: 'pdf-style-editor', name: 'PDF Style Editor', desc: 'Change the visual style of PDF pages.' },
  { slug: 'add-overlay-to-pdf-online', name: 'Add Overlay to PDF', desc: 'Add a text overlay to every PDF page.' },
  { slug: 'add-stamp-to-pdf-page', name: 'Add Stamp to PDF', desc: 'Stamp text diagonally across every PDF page.' },
  { slug: 'pdf-sanitizer', name: 'PDF Sanitizer', desc: 'Remove JavaScript, embedded files, and other risks from a PDF.' },
  { slug: 'pdf-thumbnail-generator', name: 'PDF Thumbnail Generator', desc: 'Generate thumbnail previews for every page in a PDF.' },
  { slug: 'merge-pdf-pages-image', name: 'Merge PDF Pages into Single Image', desc: 'Combine all PDF pages into one tall image.' },
  { slug: 'remove-pdf-images', name: 'Remove PDF Images', desc: 'Strip all images from a PDF file.' },
  { slug: 'remove-restrictions', name: 'Remove PDF Restrictions', desc: 'Remove printing, copying, and editing restrictions.' },
  { slug: 'email-to-pdf', name: 'Email to PDF', desc: 'Convert email content to a PDF document.' },
  { slug: 'generate-electronic-pdf-invoice', name: 'Generate PDF Invoice', desc: 'Create a professional invoice PDF from form inputs.' },
  { slug: 'pdf-color-detector', name: 'PDF Color Detector', desc: 'Find dominant colors in any PDF file.' },
  { slug: 'annotate-pdf', name: 'Annotate PDF', desc: 'Add text annotations and notes to PDF pages.' },
  { slug: 'fill-sign-pdf', name: 'Fill & Sign PDF', desc: 'Fill in text fields and draw a signature on a PDF.' },
  { slug: 'enhance-pdf-online-free', name: 'Enhance PDF Online', desc: 'Improve PDF quality by re-rendering at higher resolution.' },
  { slug: 'pdf-builder', name: 'PDF Builder', desc: 'Create a new PDF from typed text content.' },
  { slug: 'resize-and-rescale-pdf-online', name: 'Resize & Rescale PDF', desc: 'Scale all pages by a percentage from 50% to 200%.' },
  { slug: 'online-pdf-viewer', name: 'Online PDF Viewer', desc: 'View PDF pages in the browser without downloading.' },
  { slug: 'redact-pdf', name: 'Redact PDF', desc: 'Black out content from PDF pages.' },
  { slug: 'add-qr-code-to-pdf', name: 'Add QR Code to PDF', desc: 'Add a scannable QR code to every PDF page.' },
  { slug: 'crop-aadhar-card', name: 'Crop Aadhar Card', desc: 'Crop an Aadhar card PDF or image to standard size.' },
  { slug: 'pdf-margin-adjuster', name: 'PDF Margin Adjuster', desc: 'Adjust top, right, bottom, and left margins of a PDF.' },
];

const PdfToolsHub = () => {
  return (
    <Box>
      <Breadcrumbs items={[{ label: 'Tools' }, { label: 'PDF Tools' }]} />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" gutterBottom>
          PDF Tools
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Merge, split, rotate, watermark, and convert PDFs — all free, and all processed entirely in your
          browser. Your files are never uploaded anywhere.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {PDF_TOOLS.map((t) => (
          <Card key={t.slug} variant="outlined">
            <CardActionArea component={Link} href={`/tools/${t.slug}`}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{t.name}</Typography>
                <Typography variant="body2" color="text.secondary">{t.desc}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PdfToolsHub;
