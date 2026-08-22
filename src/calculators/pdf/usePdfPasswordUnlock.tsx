'use client';

import { useCallback, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert, Typography } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import { loadPossiblyEncrypted, loadWithPassword } from './pdfEncryption';

interface PendingUnlock {
  bytes: ArrayBuffer | Uint8Array;
  resolve: (doc: PDFDocument) => void;
  reject: (err: Error) => void;
}

/**
 * Loads a PDF that might be password-protected, prompting the user for a
 * password via a dialog when needed. Render `dialog` once near the root of
 * the component that calls `unlock`.
 */
export function usePdfPasswordUnlock() {
  const [pending, setPending] = useState<PendingUnlock | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const pendingRef = useRef<PendingUnlock | null>(null);

  const unlock = useCallback(async (bytes: ArrayBuffer | Uint8Array): Promise<PDFDocument> => {
    const result = await loadPossiblyEncrypted(bytes);
    if ('doc' in result) {
      return result.doc;
    }
    return new Promise<PDFDocument>((resolve, reject) => {
      const entry: PendingUnlock = { bytes, resolve, reject };
      pendingRef.current = entry;
      setPending(entry);
      setPassword('');
      setError('');
    });
  }, []);

  const closeDialog = () => {
    pendingRef.current?.reject(new Error('Password entry cancelled.'));
    pendingRef.current = null;
    setPending(null);
  };

  const submitPassword = async () => {
    if (!pending) return;
    setChecking(true);
    setError('');
    try {
      const doc = await loadWithPassword(pending.bytes, password);
      pendingRef.current = null;
      setPending(null);
      pending.resolve(doc);
    } catch {
      setError('Incorrect password. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  const dialog = (
    <Dialog open={!!pending} onClose={closeDialog} maxWidth="xs" fullWidth>
      <DialogTitle>Password Protected PDF</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This PDF is locked. Enter its password to unlock it — everything happens in your browser, the file and
          password are never uploaded anywhere.
        </Typography>
        <TextField
          autoFocus
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submitPassword(); }}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button variant="contained" onClick={submitPassword} disabled={checking || !password}>
          {checking ? 'Unlocking...' : 'Unlock'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { unlock, dialog };
}
