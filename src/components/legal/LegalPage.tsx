'use client';

import type { ReactNode } from 'react';
import { Box, Typography, Paper, Link as MuiLink } from '@mui/material';
import { LEGAL_EFFECTIVE_DATE } from '../../data/siteInfo';

export interface LegalSection {
  /** Anchor id, so sections can be linked to directly (e.g. /privacy-policy#your-rights). */
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  /** Plain-language summary shown above the full text. */
  summary?: ReactNode;
  sections: LegalSection[];
}

/**
 * Shared shell for the Privacy, Terms, Cookie and Refund pages: one h1, a dated
 * header, a linked table of contents and h2 sections, so heading levels never
 * skip and every section has a stable anchor to cite in an email or complaint.
 */
const LegalPage = ({ title, summary, sections }: LegalPageProps) => {
  return (
    <Box sx={{ maxWidth: 820, mx: 'auto', my: 4 }}>
      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Effective and last updated: {LEGAL_EFFECTIVE_DATE}
      </Typography>

      {summary && (
        <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, mb: 4, bgcolor: 'action.hover' }}>
          {summary}
        </Paper>
      )}

      <Box component="nav" aria-labelledby="legal-contents-heading" sx={{ mb: 5 }}>
        <Typography id="legal-contents-heading" variant="h2" sx={{ fontSize: '1.125rem', mb: 1.5 }}>
          Contents
        </Typography>
        <Box component="ol" sx={{ m: 0, pl: 3, columns: { md: 2 }, columnGap: 4 }}>
          {sections.map((s) => (
            <Box component="li" key={s.id} sx={{ mb: 0.75, breakInside: 'avoid' }}>
              <MuiLink href={`#${s.id}`}>{s.title}</MuiLink>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          typography: 'body1',
          '& p': { mt: 0, mb: 2 },
          '& ul, & ol': { mt: 0, mb: 2, pl: 3 },
          '& li': { mb: 0.75 },
          '& h3': { typography: 'h3', mt: 3, mb: 1.5 },
          '& table': { width: '100%', borderCollapse: 'collapse', mb: 2, fontSize: '0.9375rem' },
          '& th, & td': { textAlign: 'left', verticalAlign: 'top', p: 1.25, border: '1px solid', borderColor: 'divider' },
          '& th': { bgcolor: 'action.hover', fontWeight: 600 },
          '& .table-scroll': { overflowX: 'auto', mb: 2 },
        }}
      >
        {sections.map((s, i) => (
          <Box component="section" key={s.id} aria-labelledby={s.id} sx={{ mb: 5, scrollMarginTop: '80px' }}>
            <Typography id={s.id} variant="h2" sx={{ mb: 2, scrollMarginTop: '80px' }}>
              {i + 1}. {s.title}
            </Typography>
            {s.body}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LegalPage;
