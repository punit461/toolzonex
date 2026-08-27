'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Stack, IconButton, Divider, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { downloadBytes } from './pdfUtils';
import { PDFDocument, StandardFonts, rgb } from '@cantoo/pdf-lib';

interface LineItem {
  description: string;
  quantity: string;
  rate: string;
}

const emptyItem = (): LineItem => ({ description: '', quantity: '1', rate: '0' });

const GeneratePdfInvoiceContent = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [fromName, setFromName] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [toName, setToName] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [items, setItems] = useState<LineItem[]>([emptyItem()]);
  const [taxRate, setTaxRate] = useState('10');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const updateItem = (idx: number, field: keyof LineItem, value: string) => {
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const calcSubtotal = () => items.reduce((sum, it) => sum + (parseFloat(it.quantity) || 0) * (parseFloat(it.rate) || 0), 0);
  const calcTax = () => calcSubtotal() * (parseFloat(taxRate) || 0) / 100;
  const calcTotal = () => calcSubtotal() + calcTax();

  const handleGenerate = async () => {
    setError('');
    if (!fromName.trim()) { setError('Enter your name or company (From).'); return; }
    if (!toName.trim()) { setError('Enter the recipient name (To).'); return; }
    if (items.length === 0 || items.every((it) => !it.description.trim())) { setError('Add at least one line item with a description.'); return; }
    setBusy(true);
    try {
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
      const page = doc.addPage([612, 792]);

      const margin = 50;
      let y = 742;

      // Header
      page.drawText('INVOICE', { x: margin, y, size: 28, font: fontBold, color: rgb(0.15, 0.15, 0.15) });
      y -= 30;
      page.drawText(`Invoice #: ${invoiceNumber}`, { x: margin, y, size: 11, font });
      y -= 18;
      page.drawText(`Date: ${invoiceDate}`, { x: margin, y, size: 11, font });
      y -= 30;

      // From / To
      const halfW = 250;
      page.drawText('From:', { x: margin, y, size: 11, font: fontBold });
      y -= 16;
      const fromLines = [fromName, ...fromAddress.split('\n')].filter(Boolean);
      for (const line of fromLines) {
        page.drawText(line, { x: margin, y, size: 10, font, maxWidth: halfW });
        y -= 14;
      }
      y -= 10;

      let yRight = 742 - 48;
      page.drawText('To:', { x: margin + halfW + 40, y: yRight, size: 11, font: fontBold });
      yRight -= 16;
      const toLines = [toName, ...toAddress.split('\n')].filter(Boolean);
      for (const line of toLines) {
        page.drawText(line, { x: margin + halfW + 40, y: yRight, size: 10, font, maxWidth: halfW });
        yRight -= 14;
      }
      y = Math.min(y, yRight) - 15;

      // Table header
      const colX = [margin, margin + 280, margin + 360, margin + 430];
      page.drawRectangle({ x: margin, y: y - 4, width: 512, height: 20, color: rgb(0.93, 0.93, 0.93) });
      page.drawText('Description', { x: colX[0] + 4, y, size: 10, font: fontBold });
      page.drawText('Qty', { x: colX[1], y, size: 10, font: fontBold });
      page.drawText('Rate', { x: colX[2], y, size: 10, font: fontBold });
      page.drawText('Amount', { x: colX[3], y, size: 10, font: fontBold });
      y -= 22;

      // Line items
      for (const item of items) {
        const qty = parseFloat(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        const amount = qty * rate;
        page.drawText(item.description || '-', { x: colX[0] + 4, y, size: 10, font, maxWidth: 260 });
        page.drawText(String(qty), { x: colX[1], y, size: 10, font });
        page.drawText(`$${rate.toFixed(2)}`, { x: colX[2], y, size: 10, font });
        page.drawText(`$${amount.toFixed(2)}`, { x: colX[3], y, size: 10, font });
        y -= 18;
      }

      // Totals
      y -= 10;
      page.drawLine({ start: { x: margin + 320, y: y + 8 }, end: { x: margin + 512, y: y + 8 }, thickness: 1, color: rgb(0.8, 0.8, 0.8) });
      const sub = calcSubtotal();
      const tax = calcTax();
      const total = calcTotal();
      page.drawText('Subtotal:', { x: margin + 370, y, size: 11, font });
      page.drawText(`$${sub.toFixed(2)}`, { x: colX[3], y, size: 11, font });
      y -= 18;
      page.drawText(`Tax (${parseFloat(taxRate) || 0}%):`, { x: margin + 370, y, size: 11, font });
      page.drawText(`$${tax.toFixed(2)}`, { x: colX[3], y, size: 11, font });
      y -= 22;
      page.drawText('Total:', { x: margin + 370, y, size: 13, font: fontBold });
      page.drawText(`$${total.toFixed(2)}`, { x: colX[3], y, size: 13, font: fontBold });

      // Notes
      if (notes.trim()) {
        y -= 40;
        page.drawText('Notes:', { x: margin, y, size: 11, font: fontBold });
        y -= 16;
        for (const line of notes.split('\n')) {
          page.drawText(line, { x: margin, y, size: 10, font, maxWidth: 400 });
          y -= 14;
        }
      }

      const pdfBytes = await doc.save();
      downloadBytes(pdfBytes, `${invoiceNumber.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
    } catch {
      setError('Could not generate the invoice PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="Invoice Number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} fullWidth />
          <TextField label="Date" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} fullWidth slotProps={{ inputLabel: { shrink: true } }} />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="From (Name / Company)" value={fromName} onChange={(e) => setFromName(e.target.value)} fullWidth />
          <TextField label="To (Name / Company)" value={toName} onChange={(e) => setToName(e.target.value)} fullWidth />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="From Address" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} multiline rows={2} fullWidth placeholder="Street, City, State, ZIP" />
          <TextField label="To Address" value={toAddress} onChange={(e) => setToAddress(e.target.value)} multiline rows={2} fullWidth placeholder="Street, City, State, ZIP" />
        </Stack>

        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle2">Line Items</Typography>

        {items.map((item, idx) => (
          <Stack key={idx} direction="row" spacing={1} alignItems="center">
            <TextField
              label="Description"
              value={item.description}
              onChange={(e) => updateItem(idx, 'description', e.target.value)}
              size="small"
              sx={{ flex: 3 }}
            />
            <TextField
              label="Qty"
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Rate"
              type="number"
              value={item.rate}
              onChange={(e) => updateItem(idx, 'rate', e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              inputProps={{ min: 0 }}
            />
            <IconButton onClick={() => removeItem(idx)} disabled={items.length <= 1} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}

        <Button startIcon={<AddIcon />} onClick={addItem} size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Line Item
        </Button>

        <Divider sx={{ my: 1 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="Tax Rate (%)" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} sx={{ width: 140 }} inputProps={{ min: 0 }} />
          <Paper variant="outlined" sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 180 }}>
            <Typography variant="body2">Subtotal: ${calcSubtotal().toFixed(2)}</Typography>
            <Typography variant="body2">Tax: ${calcTax().toFixed(2)}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total: ${calcTotal().toFixed(2)}</Typography>
          </Paper>
        </Stack>

        <TextField label="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} multiline rows={2} fullWidth placeholder="Payment terms, thank you note, etc." />
      </Stack>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleGenerate} disabled={busy}>
        {busy ? 'Generating...' : 'Generate Invoice PDF'}
      </Button>
    </Box>
  );
};

const GeneratePdfInvoice = () => {
  const content = (
    <>
      <Typography variant="h2">How to Generate an Electronic PDF Invoice</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Fill in the invoice number, date, and your (From) and recipient (To) details.</li>
          <li>Add line items with description, quantity, and rate — subtotals, tax, and total are calculated automatically.</li>
          <li>Optionally set a tax rate and add notes, then click <strong>Generate Invoice PDF</strong>.</li>
          <li>Download a professional invoice PDF instantly.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Create an invoice for three consulting hours at $150/hr with 10% tax. The tool calculates a $450.00
        subtotal, $45.00 tax, and a $495.00 total — all formatted into a clean, professional PDF ready to
        send to your client.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Freelancers generating invoices for client work on the fly.</li>
          <li>Small businesses creating professional invoices without accounting software.</li>
          <li>Generating a quick pro-forma invoice for a one-time sale or service.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I customize the layout?</strong> The invoice uses a standard professional format with your details, line items, and totals. For full layout customization, generate the invoice and edit it in a PDF editor.</li>
          <li><strong>Does it support multiple currencies?</strong> The PDF uses the $ symbol by default. You can type a currency symbol in the rate field if needed, though the calculation uses numeric values.</li>
          <li><strong>Is my data uploaded anywhere?</strong> No — the invoice is generated entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/generate-electronic-pdf-invoice" content={content}>
      <GeneratePdfInvoiceContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GeneratePdfInvoice;
