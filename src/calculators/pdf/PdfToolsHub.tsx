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
  { slug: 'number-pdf-pages', name: 'Add Page Numbers', desc: 'Number every page.' },
  { slug: 'watermark-pdf', name: 'Watermark PDF', desc: 'Add a diagonal text watermark.' },
  { slug: 'flatten-pdf', name: 'Flatten PDF', desc: 'Make form fields permanent.' },
  { slug: 'jpg-to-pdf', name: 'JPG to PDF', desc: 'Convert images into a PDF.' },
  { slug: 'text-to-pdf', name: 'Text to PDF', desc: 'Convert plain text into a PDF.' },
  { slug: 'csv-to-pdf', name: 'CSV to PDF', desc: 'Convert a CSV into a PDF table.' },
  { slug: 'word-to-pdf', name: 'Word to PDF', desc: 'Convert a .docx file into a PDF.' },
  { slug: 'excel-to-pdf', name: 'Excel to PDF', desc: 'Convert a spreadsheet into a PDF table.' },
  { slug: 'html-to-pdf', name: 'HTML to PDF', desc: 'Convert HTML markup into a PDF.' },
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
