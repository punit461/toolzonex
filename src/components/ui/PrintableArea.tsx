'use client';

import { forwardRef } from 'react';
import { Box, BoxProps } from '@mui/material';

/**
 * Wraps printable tool output. The "print-area" class is targeted by the
 * @media print rule in globals.css, which hides everything else on the
 * page (header, footer, ads, SEO copy) so window.print() only prints this
 * element. Also usable as the capture target for html2canvas-based PDF
 * downloads (see elementToPdfBytes).
 */
const PrintableArea = forwardRef<HTMLDivElement, BoxProps>(({ children, className, ...rest }, ref) => (
  <Box ref={ref} className={['print-area', className].filter(Boolean).join(' ')} {...rest}>
    {children}
  </Box>
));

PrintableArea.displayName = 'PrintableArea';

export default PrintableArea;
