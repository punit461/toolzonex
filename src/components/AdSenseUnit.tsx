'use client';

import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

interface AdSenseUnitProps {
  slotId?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseUnit({ slotId, style, className }: AdSenseUnitProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const adSlot = slotId || process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (isDev || !publisherId || !adSlot) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [publisherId, adSlot, isDev]);

  if (isDev) {
    return (
      <Box 
        sx={{ 
          border: '1px dashed #ccc', 
          backgroundColor: '#f9f9f9', 
          padding: 2, 
          textAlign: 'center',
          my: 3,
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
      >
        <Typography variant="body2" color="textSecondary">
          AdSense Unit Placeholder (Development Mode)<br/>
          {adSlot ? `Slot ID: ${adSlot}` : 'No Slot ID configured'}
        </Typography>
      </Box>
    );
  }

  if (!publisherId || !adSlot) return null;

  return (
    <Box sx={{ my: 3, overflow: 'hidden', textAlign: 'center', ...style }} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </Box>
  );
}
