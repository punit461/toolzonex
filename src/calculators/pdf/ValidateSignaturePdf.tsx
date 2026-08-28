'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, List, ListItem, ListItemText, Divider } from '@mui/material';
import { PDFDocument, PDFDict, PDFName, PDFString, PDFHexString, PDFNumber } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface SignatureField {
  name: string;
  signer?: string;
  reason?: string;
  date?: string;
  location?: string;
}

interface ValidationResult {
  hasAcroForm: boolean;
  sigFlags: number | null;
  signatures: SignatureField[];
}

function textOf(obj: unknown): string | undefined {
  if (obj instanceof PDFString || obj instanceof PDFHexString) return obj.decodeText();
  return undefined;
}

const ValidateSignaturePdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCheck = async () => {
    setError('');
    setResult(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      const acroFormDict = doc.catalog.AcroForm();
      let sigFlags: number | null = null;
      if (acroFormDict instanceof PDFDict) {
        const flags = acroFormDict.lookup(PDFName.of('SigFlags'));
        if (flags instanceof PDFNumber) sigFlags = flags.asNumber();
      }

      const signatures: SignatureField[] = [];
      const acroForm = doc.catalog.getAcroForm();
      if (acroForm) {
        for (const [field] of acroForm.getFields()) {
          const ft = field.dict.lookup(PDFName.of('FT'));
          const isSigField = ft instanceof PDFName && ft.asString() === '/Sig';
          if (!isSigField) continue;

          const name = field.getFullyQualifiedName() ?? field.getPartialName() ?? '(unnamed field)';
          const value = field.dict.lookup(PDFName.of('V'));
          const sigDict = value instanceof PDFDict ? value : undefined;

          signatures.push({
            name,
            signer: sigDict ? textOf(sigDict.lookup(PDFName.of('Name'))) : undefined,
            reason: sigDict ? textOf(sigDict.lookup(PDFName.of('Reason'))) : undefined,
            date: sigDict ? textOf(sigDict.lookup(PDFName.of('M'))) : undefined,
            location: sigDict ? textOf(sigDict.lookup(PDFName.of('Location'))) : undefined,
          });
        }
      }

      setResult({ hasAcroForm: acroFormDict instanceof PDFDict, sigFlags, signatures });
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not read this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {result && (
        <Box sx={{ mt: 3 }}>
          <Alert severity={result.signatures.length > 0 ? 'info' : 'warning'} sx={{ mb: 2 }}>
            {result.signatures.length > 0
              ? `Found ${result.signatures.length} signature field${result.signatures.length !== 1 ? 's' : ''} in this PDF's form structure.`
              : 'No signature fields were found in this PDF\'s AcroForm structure.'}
          </Alert>

          <Alert severity="warning" sx={{ mb: 2 }}>
            This only detects whether a signature dictionary is present and reads any metadata fields inside it. It
            does <strong>not</strong> perform cryptographic trust validation — no certificate chain, revocation, or
            timestamp checking is done, since that requires a full PKI stack this browser-based tool doesn&apos;t have.
            A field being present here does not mean the signature is valid or untampered.
          </Alert>

          {result.signatures.length > 0 && (
            <List dense sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
              {result.signatures.map((sig, i) => (
                <Box key={i}>
                  {i > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={sig.name}
                      secondary={
                        <>
                          {sig.signer && <>Signer: {sig.signer}<br /></>}
                          {sig.reason && <>Reason: {sig.reason}<br /></>}
                          {sig.date && <>Date: {sig.date}<br /></>}
                          {sig.location && <>Location: {sig.location}<br /></>}
                          {!sig.signer && !sig.reason && !sig.date && !sig.location && 'No readable metadata in this signature dictionary.'}
                        </>
                      }
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          )}
        </Box>
      )}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCheck} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Checking...</> : 'Check for Signatures'}
      </Button>
    </Box>
  );
};

const ValidateSignaturePdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Check a PDF for Digital Signatures</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>Check for Signatures</strong> — the tool looks for a signature dictionary in the PDF&apos;s form (AcroForm) structure.</li>
          <li>Review any signer name, reason, date, or location fields found inside each signature.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A contract signed in Adobe Acrobat contains a signature field named &quot;Signature1&quot; with a signer name,
        the reason &quot;I agree to the terms of this document&quot;, and a signing date. This tool surfaces that
        metadata so you can see who claims to have signed it and when — without needing a PDF reader with
        signature-panel support.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly checking whether a received PDF contains any signature fields at all.</li>
          <li>Reading the signer name, reason, or date embedded in a signature without opening desktop software.</li>
          <li>Spot-checking documents before routing them into a workflow that expects a signed PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this verify the signature is valid or trustworthy?</strong> No. This is presence-and-metadata detection only. Verifying a cryptographic signature means checking the signed hash against the document, validating a certificate chain up to a trusted root, and checking revocation status — none of that is possible in a static, offline browser tool. Use a full PDF reader like Adobe Acrobat, or a dedicated PKI validation service, for actual trust verification.</li>
          <li><strong>Why does it say a signature was found but shows no signer name?</strong> Not every signature dictionary populates the optional Name/Reason/Location fields — some signing tools only embed the cryptographic data itself, with signer identity carried entirely in the certificate rather than as plain metadata.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/validate-signature-pdf" content={content}>
      <ValidateSignaturePdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ValidateSignaturePdf;
