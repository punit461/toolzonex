'use client';

import React from 'react';
import { Paper, SxProps, Theme } from '@mui/material';

interface ResultCardProps {
  variant?: 'default' | 'mono' | 'metric';
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * Reusable result display card with proper contrast in both light and dark modes.
 * - `default`: subtle background, standard text
 * - `mono`: monospace-friendly, for IPs/hashes/tokens
 * - `metric`: centered numeric output for calculators
 */
export default function ResultCard({ variant = 'default', children, sx }: ResultCardProps) {
  const variantStyles: Record<string, SxProps<Theme>> = {
    default: {
      bgcolor: 'primary.light',
      color: 'text.primary',
      border: '1px solid',
      borderColor: 'divider',
    },
    mono: {
      bgcolor: 'primary.light',
      color: 'text.primary',
      border: '1px solid',
      borderColor: 'divider',
      fontFamily: 'monospace',
    },
    metric: {
      bgcolor: 'primary.light',
      color: 'text.primary',
      border: '1px solid',
      borderColor: 'divider',
      textAlign: 'center',
    },
  };

  return (
    <Paper
      elevation={0}
      sx={[
        {
          p: { xs: 3, md: 4 },
          borderRadius: 2,
        },
        variantStyles[variant] as any,
        ...(Array.isArray(sx) ? sx : [sx]),
      ] as any}
    >
      {children}
    </Paper>
  );
}
