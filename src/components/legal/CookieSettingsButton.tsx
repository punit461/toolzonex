'use client';

import { useState } from 'react';
import { Box, Button, Typography, Link as MuiLink } from '@mui/material';

/**
 * Re-opens Google's consent message (AdSense "Privacy & messaging", a
 * Google-certified TCF CMP) so a visitor can change or withdraw consent.
 *
 * That message only runs where it applies -- the EEA, UK and Switzerland, once
 * it's published in the AdSense account -- and it's the only thing that defines
 * window.__tcfapi on this site. Everywhere else there is no consent record to
 * reopen, so the button says so and points to the controls that do work there,
 * instead of silently doing nothing.
 *
 * API: https://developers.google.com/funding-choices/fc-api-docs -- functions
 * must be invoked through googlefc.callbackQueue, which layout.tsx initialises
 * before the AdSense script loads.
 */

interface GoogleFc {
  callbackQueue?: Array<unknown>;
  showRevocationMessage?: () => void;
}

type ConsentWindow = Window & { googlefc?: GoogleFc; __tcfapi?: unknown };

const CookieSettingsButton = () => {
  const [note, setNote] = useState<string | null>(null);

  const openSettings = () => {
    const w = window as ConsentWindow;
    if (typeof w.__tcfapi === 'function' && w.googlefc?.callbackQueue) {
      w.googlefc.callbackQueue.push(() => w.googlefc?.showRevocationMessage?.());
      setNote(null);
    } else {
      setNote(
        'Google’s consent message isn’t shown in your region, so there’s no saved choice to change here. ' +
          'You can still turn off personalised ads in Google My Ad Center, or block and delete cookies in your browser settings.',
      );
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Button variant="contained" onClick={openSettings}>
        Privacy and cookie settings
      </Button>
      <Box role="status" aria-live="polite">
        {note && (
          <Typography variant="body2" sx={{ mt: 1.5 }}>
            {note}{' '}
            <MuiLink href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">
              Open Google My Ad Center
            </MuiLink>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CookieSettingsButton;
