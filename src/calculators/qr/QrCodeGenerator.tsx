'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box, TextField, Typography, Button, Paper, Slider, Select, MenuItem,
  FormControl, InputLabel, Grid, Switch, FormControlLabel, Tabs, Tab,
  Accordion, AccordionSummary, AccordionDetails, Alert, IconButton, Tooltip,
  ToggleButton, ToggleButtonGroup
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CropDinIcon from '@mui/icons-material/CropDin';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EditIcon from '@mui/icons-material/Edit';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import {
  QrContentType, QR_CONTENT_TYPES,
  encodeText, encodeUrl, encodeEmail, encodePhone, encodeSms,
  encodeWifi, encodeVCard, encodeMeCard, encodeGeo, encodeVEvent,
  encodeWhatsApp, encodeUpi, encodeCrypto,
  EmailData, SmsData, WifiData, VCardData, MeCardData,
  GeoData, VEventData, WhatsAppData, UpiData, CryptoData
} from './encoders';

// Dot/corner style options
const DOT_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

// qr-code-styling's own corner renderers only support 3 border shapes and 2 center
// shapes natively. The extra styles below ('dots' / 'squircle' / 'cornerflow' / the
// center's 'rounded') are drawn ourselves by swapping the SVG clip-path the library
// generates for each finder pattern — see applyCustomCornerStyles().
type CornerStyleKind = 'native' | 'dots' | 'squircle' | 'cornerflow' | 'rounded';

interface CornerStyleOption {
  value: string;
  label: string;
  nativeType: 'square' | 'dot' | 'extra-rounded';
  kind: CornerStyleKind;
}

const CORNER_SQUARE_STYLES: CornerStyleOption[] = [
  { value: 'square', label: 'Square', nativeType: 'square', kind: 'native' },
  { value: 'circle', label: 'Circle', nativeType: 'dot', kind: 'native' },
  { value: 'dots', label: 'Dots', nativeType: 'square', kind: 'dots' },
  { value: 'rounded', label: 'Rounded', nativeType: 'extra-rounded', kind: 'native' },
  { value: 'squircle', label: 'Squircle', nativeType: 'square', kind: 'squircle' },
  { value: 'cornerflow', label: 'Cornerflow', nativeType: 'square', kind: 'cornerflow' },
];

// 'dots' was dropped here — a speckled finder-pattern center risked breaking scannability
// and wasn't rendering reliably; the border keeps its own 'dots' ring, which is fine.
const CORNER_DOT_STYLES: CornerStyleOption[] = [
  { value: 'square', label: 'Square', nativeType: 'square', kind: 'native' },
  { value: 'circle', label: 'Circle', nativeType: 'dot', kind: 'native' },
  { value: 'rounded', label: 'Rounded', nativeType: 'square', kind: 'rounded' },
  { value: 'squircle', label: 'Squircle', nativeType: 'square', kind: 'squircle' },
  { value: 'cornerflow', label: 'Cornerflow', nativeType: 'square', kind: 'cornerflow' },
];

// ── Corner shape geometry (shared by the live SVG overlay and the picker icons) ──

function roundedRectPath(x: number, y: number, w: number, h: number, radiusRatio = 0.28): string {
  const r = Math.min(w, h) * radiusRatio;
  return `M ${x + r} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + h - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}

function squirclePath(x: number, y: number, w: number, h: number, n = 4, steps = 48): string {
  const cx = x + w / 2, cy = y + h / 2, a = w / 2, b = h / 2;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t), s = Math.sin(t);
    const px = cx + Math.sign(c) * Math.pow(Math.abs(c), 2 / n) * a;
    const py = cy + Math.sign(s) * Math.pow(Math.abs(s), 2 / n) * b;
    d += `${i === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${py.toFixed(2)} `;
  }
  return d + 'Z';
}

// Asymmetric rounded square — large radius on one corner, tight on the other three.
// Drawn in the canonical (top-left finder, unrotated) frame; the library applies its
// own per-corner rotation transform on top, which reorients it correctly everywhere else.
function cornerflowPath(x: number, y: number, w: number, h: number): string {
  const rBig = Math.min(w, h) * 0.55;
  const rSmall = Math.min(w, h) * 0.08;
  return `M ${x + rSmall} ${y} H ${x + w - rSmall} A ${rSmall} ${rSmall} 0 0 1 ${x + w} ${y + rSmall} V ${y + h - rBig} A ${rBig} ${rBig} 0 0 1 ${x + w - rBig} ${y + h} H ${x + rSmall} A ${rSmall} ${rSmall} 0 0 1 ${x} ${y + h - rSmall} V ${y + rSmall} A ${rSmall} ${rSmall} 0 0 1 ${x + rSmall} ${y} Z`;
}

function ringDots(x: number, y: number, w: number, h: number, perSide = 3, dotRatio = 0.14): { cx: number; cy: number; r: number }[] {
  const r = Math.min(w, h) * dotRatio;
  const fracs = Array.from({ length: perSide }, (_, i) => (i + 1) / (perSide + 1));
  const pts: { cx: number; cy: number }[] = [];
  fracs.forEach((f) => pts.push({ cx: x + f * w, cy: y + r }));
  fracs.forEach((f) => pts.push({ cx: x + f * w, cy: y + h - r }));
  fracs.forEach((f) => pts.push({ cx: x + r, cy: y + f * h }));
  fracs.forEach((f) => pts.push({ cx: x + w - r, cy: y + f * h }));
  return pts.map((p) => ({ ...p, r }));
}

// Turns a solid shape into a ring by punching an inset copy of itself out of the middle
// (evenodd fill-rule, applied by the caller). Border shapes must stay rings — a solid
// block there paints over the finder pattern's required light gap and the center style,
// and breaks the QR's scannability.
function ringPath(pathBuilder: (x: number, y: number, w: number, h: number) => string, x: number, y: number, w: number, h: number, insetRatio = 1 / 7): string {
  const inset = Math.min(w, h) * insetRatio;
  return `${pathBuilder(x, y, w, h)} ${pathBuilder(x + inset, y + inset, w - 2 * inset, h - 2 * inset)}`;
}

function buildCustomClipShapes(kind: CornerStyleKind, x: number, y: number, w: number, h: number, isBorder: boolean): string {
  switch (kind) {
    // 'dots' only appears in CORNER_SQUARE_STYLES (border) — see the note above CORNER_DOT_STYLES.
    case 'dots': {
      const pts = ringDots(x, y, w, h, 3, 0.14);
      return pts.map((p) => `<circle cx="${p.cx.toFixed(2)}" cy="${p.cy.toFixed(2)}" r="${p.r.toFixed(2)}" />`).join('');
    }
    case 'squircle':
      return isBorder
        ? `<path clip-rule="evenodd" d="${ringPath(squirclePath, x, y, w, h)}" />`
        : `<path d="${squirclePath(x, y, w, h)}" />`;
    case 'cornerflow':
      return isBorder
        ? `<path clip-rule="evenodd" d="${ringPath(cornerflowPath, x, y, w, h)}" />`
        : `<path d="${cornerflowPath(x, y, w, h)}" />`;
    case 'rounded':
      return `<path d="${roundedRectPath(x, y, w, h, 0.28)}" />`;
    default:
      return '';
  }
}

// Small live preview icon for each picker option, built from the exact same geometry
// functions used for the real corner overlay, so the dropdown never lies about the shape.
function CornerStyleIcon({ option, isBorder }: { option: CornerStyleOption; isBorder: boolean }) {
  const size = 20;
  const pad = 3;
  const w = size - pad * 2;
  const h = w;
  let inner: React.ReactNode;
  if (option.kind === 'native') {
    if (option.nativeType === 'square') inner = <rect x={pad} y={pad} width={w} height={h} />;
    else if (option.nativeType === 'dot') inner = <circle cx={size / 2} cy={size / 2} r={w / 2} />;
    else inner = <path d={roundedRectPath(pad, pad, w, h, 0.4)} />;
  } else if (option.kind === 'dots') {
    const pts = ringDots(pad, pad, w, h, 2, 0.16);
    inner = <>{pts.map((p, i) => <circle key={i} cx={p.cx} cy={p.cy} r={p.r} />)}</>;
  } else if (option.kind === 'squircle') {
    inner = isBorder
      ? <path fillRule="evenodd" d={ringPath(squirclePath, pad, pad, w, h)} />
      : <path d={squirclePath(pad, pad, w, h)} />;
  } else if (option.kind === 'cornerflow') {
    inner = isBorder
      ? <path fillRule="evenodd" d={ringPath(cornerflowPath, pad, pad, w, h)} />
      : <path d={cornerflowPath(pad, pad, w, h)} />;
  } else {
    inner = <path d={roundedRectPath(pad, pad, w, h, 0.28)} />;
  }
  return (
    <Box component="svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} sx={{ flexShrink: 0, color: 'text.primary' }}>
      <g fill="currentColor">{inner}</g>
    </Box>
  );
}

// Compact color picker: a small clickable swatch + hex value, instead of a full-width field.
function ColorSwatchInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        component="input"
        type="color"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        sx={{
          width: 36, height: 36, p: 0, border: '1px solid', borderColor: 'divider',
          borderRadius: 1, cursor: 'pointer', appearance: 'none', flexShrink: 0,
          '&::-webkit-color-swatch-wrapper': { p: 0 },
          '&::-webkit-color-swatch': { border: 'none', borderRadius: 1 },
        }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>{label}</Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', lineHeight: 1.4 }}>{value}</Typography>
      </Box>
    </Box>
  );
}

// "Basic auto" background removal: samples the corner pixels as the background color
// and fades out anything close to it — works well for logos on a flat/solid background.
function removeBackgroundFromCanvas(canvas: HTMLCanvasElement, threshold = 32) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;

  const corners = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]];
  let r = 0, g = 0, b = 0;
  corners.forEach(([x, y]) => {
    const i = (y * width + x) * 4;
    r += data[i]; g += data[i + 1]; b += data[i + 2];
  });
  r /= 4; g /= 4; b /= 4;

  const softEdge = threshold * 0.8;
  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - r, dg = data[i + 1] - g, db = data[i + 2] - b;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist < threshold) {
      data[i + 3] = 0;
    } else if (dist < threshold + softEdge) {
      const fade = (dist - threshold) / softEdge;
      data[i + 3] = Math.round(data[i + 3] * Math.min(1, Math.max(0, fade)));
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

const ERROR_CORRECTION_LEVELS = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%) — Best for logos' },
];

// ── Content Form Components ──

function TextForm({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <TextField label="Text" value={value} onChange={(e) => onChange(e.target.value)} fullWidth multiline rows={3} placeholder="Enter any text..." />;
}

function UrlForm({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <TextField label="URL" value={value} onChange={(e) => onChange(e.target.value)} fullWidth placeholder="https://example.com" />;
}

function EmailForm({ data, onChange }: { data: EmailData; onChange: (d: EmailData) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="To" value={data.to} onChange={(e) => onChange({ ...data, to: e.target.value })} fullWidth required />
      <TextField label="CC" value={data.cc || ''} onChange={(e) => onChange({ ...data, cc: e.target.value })} fullWidth />
      <TextField label="BCC" value={data.bcc || ''} onChange={(e) => onChange({ ...data, bcc: e.target.value })} fullWidth />
      <TextField label="Subject" value={data.subject || ''} onChange={(e) => onChange({ ...data, subject: e.target.value })} fullWidth />
      <TextField label="Body" value={data.body || ''} onChange={(e) => onChange({ ...data, body: e.target.value })} fullWidth multiline rows={2} />
    </Box>
  );
}

function PhoneForm({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <TextField label="Phone Number" value={value} onChange={(e) => onChange(e.target.value)} fullWidth placeholder="+91 98765 43210" />;
}

function SmsForm({ data, onChange }: { data: SmsData; onChange: (d: SmsData) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Phone Number" value={data.phone} onChange={(e) => onChange({ ...data, phone: e.target.value })} fullWidth required />
      <TextField label="Message" value={data.message || ''} onChange={(e) => onChange({ ...data, message: e.target.value })} fullWidth multiline rows={2} />
    </Box>
  );
}

function WifiForm({ data, onChange }: { data: WifiData; onChange: (d: WifiData) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Network Name (SSID)" value={data.ssid} onChange={(e) => onChange({ ...data, ssid: e.target.value })} fullWidth required />
      <FormControl fullWidth>
        <InputLabel>Encryption</InputLabel>
        <Select value={data.encryption} label="Encryption" onChange={(e) => onChange({ ...data, encryption: e.target.value as WifiData['encryption'] })}>
          <MenuItem value="WPA">WPA/WPA2</MenuItem>
          <MenuItem value="WEP">WEP</MenuItem>
          <MenuItem value="nopass">None (Open)</MenuItem>
        </Select>
      </FormControl>
      {data.encryption !== 'nopass' && (
        <TextField label="Password" value={data.password || ''} onChange={(e) => onChange({ ...data, password: e.target.value })} fullWidth />
      )}
      <FormControlLabel control={<Switch checked={data.hidden || false} onChange={(e) => onChange({ ...data, hidden: e.target.checked })} />} label="Hidden Network" />
    </Box>
  );
}

function VCardForm({ data, onChange }: { data: VCardData; onChange: (d: VCardData) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}><TextField label="First Name" value={data.firstName} onChange={(e) => onChange({ ...data, firstName: e.target.value })} fullWidth required /></Grid>
        <Grid item xs={6}><TextField label="Last Name" value={data.lastName || ''} onChange={(e) => onChange({ ...data, lastName: e.target.value })} fullWidth /></Grid>
      </Grid>
      <TextField label="Organization" value={data.organization || ''} onChange={(e) => onChange({ ...data, organization: e.target.value })} fullWidth />
      <TextField label="Job Title" value={data.title || ''} onChange={(e) => onChange({ ...data, title: e.target.value })} fullWidth />
      <Grid container spacing={2}>
        <Grid item xs={6}><TextField label="Phone" value={data.phone || ''} onChange={(e) => onChange({ ...data, phone: e.target.value })} fullWidth /></Grid>
        <Grid item xs={6}><TextField label="Mobile" value={data.mobile || ''} onChange={(e) => onChange({ ...data, mobile: e.target.value })} fullWidth /></Grid>
      </Grid>
      <TextField label="Email" value={data.email || ''} onChange={(e) => onChange({ ...data, email: e.target.value })} fullWidth />
      <TextField label="Website" value={data.website || ''} onChange={(e) => onChange({ ...data, website: e.target.value })} fullWidth />
      <TextField label="Street Address" value={data.street || ''} onChange={(e) => onChange({ ...data, street: e.target.value })} fullWidth />
      <Grid container spacing={2}>
        <Grid item xs={6}><TextField label="City" value={data.city || ''} onChange={(e) => onChange({ ...data, city: e.target.value })} fullWidth /></Grid>
        <Grid item xs={6}><TextField label="State" value={data.state || ''} onChange={(e) => onChange({ ...data, state: e.target.value })} fullWidth /></Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}><TextField label="ZIP Code" value={data.zip || ''} onChange={(e) => onChange({ ...data, zip: e.target.value })} fullWidth /></Grid>
        <Grid item xs={6}><TextField label="Country" value={data.country || ''} onChange={(e) => onChange({ ...data, country: e.target.value })} fullWidth /></Grid>
      </Grid>
      <TextField label="Note" value={data.note || ''} onChange={(e) => onChange({ ...data, note: e.target.value })} fullWidth multiline rows={2} />
    </Box>
  );
}

function MeCardForm({ data, onChange }: { data: MeCardData; onChange: (d: MeCardData) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Name" value={data.name} onChange={(e) => onChange({ ...data, name: e.target.value })} fullWidth required />
      <TextField label="Phone" value={data.phone || ''} onChange={(e) => onChange({ ...data, phone: e.target.value })} fullWidth />
      <TextField label="Email" value={data.email || ''} onChange={(e) => onChange({ ...data, email: e.target.value })} fullWidth />
      <TextField label="URL" value={data.url || ''} onChange={(e) => onChange({ ...data, url: e.target.value })} fullWidth />
      <TextField label="Address" value={data.address || ''} onChange={(e) => onChange({ ...data, address: e.target.value })} fullWidth />
    </Box>
  );
}

function GeoForm({ data, onChange }: { data: GeoData; onChange: (d: GeoData) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Latitude" type="number" value={data.latitude} onChange={(e) => onChange({ ...data, latitude: parseFloat(e.target.value) || 0 })} fullWidth />
      <TextField label="Longitude" type="number" value={data.longitude} onChange={(e) => onChange({ ...data, longitude: parseFloat(e.target.value) || 0 })} fullWidth />
    </Box>
  );
}

function EventForm({ data, onChange }: { data: VEventData; onChange: (d: VEventData) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Event Title" value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })} fullWidth required />
      <TextField label="Location" value={data.location || ''} onChange={(e) => onChange({ ...data, location: e.target.value })} fullWidth />
      <TextField label="Start Date & Time" type="datetime-local" value={data.startDate} onChange={(e) => onChange({ ...data, startDate: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} />
      <TextField label="End Date & Time" type="datetime-local" value={data.endDate || ''} onChange={(e) => onChange({ ...data, endDate: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} />
      <TextField label="Description" value={data.description || ''} onChange={(e) => onChange({ ...data, description: e.target.value })} fullWidth multiline rows={2} />
    </Box>
  );
}

function WhatsAppForm({ data, onChange }: { data: WhatsAppData; onChange: (d: WhatsAppData) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Phone (with country code)" value={data.phone} onChange={(e) => onChange({ ...data, phone: e.target.value })} fullWidth placeholder="+919876543210" required />
      <TextField label="Message (optional)" value={data.message || ''} onChange={(e) => onChange({ ...data, message: e.target.value })} fullWidth multiline rows={2} />
    </Box>
  );
}

function UpiForm({ data, onChange }: { data: UpiData; onChange: (d: UpiData) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="UPI ID (VPA)" value={data.payeeVpa} onChange={(e) => onChange({ ...data, payeeVpa: e.target.value })} fullWidth placeholder="user@upi" required />
      <TextField label="Payee Name" value={data.payeeName || ''} onChange={(e) => onChange({ ...data, payeeName: e.target.value })} fullWidth />
      <TextField label="Amount (₹)" value={data.amount || ''} onChange={(e) => onChange({ ...data, amount: e.target.value })} fullWidth type="number" />
      <TextField label="Note / Description" value={data.note || ''} onChange={(e) => onChange({ ...data, note: e.target.value })} fullWidth />
    </Box>
  );
}

function CryptoForm({ data, onChange }: { data: CryptoData; onChange: (d: CryptoData) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Cryptocurrency</InputLabel>
        <Select value={data.type} label="Cryptocurrency" onChange={(e) => onChange({ ...data, type: e.target.value as CryptoData['type'] })}>
          <MenuItem value="bitcoin">Bitcoin</MenuItem>
          <MenuItem value="ethereum">Ethereum</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Wallet Address" value={data.address} onChange={(e) => onChange({ ...data, address: e.target.value })} fullWidth required />
      <TextField label="Amount (optional)" value={data.amount || ''} onChange={(e) => onChange({ ...data, amount: e.target.value })} fullWidth />
      <TextField label="Label (optional)" value={data.label || ''} onChange={(e) => onChange({ ...data, label: e.target.value })} fullWidth />
    </Box>
  );
}

// ── Main Component ──

const QrCodeGeneratorContent = () => {
  // Content state
  const [contentType, setContentType] = useState<QrContentType>('url');
  const [textValue, setTextValue] = useState('https://example.com');
  const [emailData, setEmailData] = useState<EmailData>({ to: '' });
  const [smsData, setSmsData] = useState<SmsData>({ phone: '' });
  const [wifiData, setWifiData] = useState<WifiData>({ ssid: '', encryption: 'WPA' });
  const [vcardData, setVcardData] = useState<VCardData>({ firstName: '' });
  const [mecardData, setMecardData] = useState<MeCardData>({ name: '' });
  const [geoData, setGeoData] = useState<GeoData>({ latitude: 0, longitude: 0 });
  const [eventData, setEventData] = useState<VEventData>({ title: '', startDate: '' });
  const [whatsappData, setWhatsappData] = useState<WhatsAppData>({ phone: '' });
  const [upiData, setUpiData] = useState<UpiData>({ payeeVpa: '' });
  const [cryptoData, setCryptoData] = useState<CryptoData>({ type: 'bitcoin', address: '' });

  // Style state
  const [size, setSize] = useState(300);
  const [margin, setMargin] = useState(10);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [dotStyle, setDotStyle] = useState('square');
  const [cornerSquareStyle, setCornerSquareStyle] = useState('square');
  const [cornerDotStyle, setCornerDotStyle] = useState('square');
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(0.3);

  // Logo editor (crop / shape / background removal) — logoRawUrl is the untouched
  // upload; logoFile (above) is the final processed image actually sent to qr-code-styling.
  const [logoRawUrl, setLogoRawUrl] = useState<string | null>(null);
  const [logoShape, setLogoShape] = useState<'square' | 'rounded' | 'round'>('square');
  const [logoCrop, setLogoCrop] = useState<Crop>();
  const [removeBg, setRemoveBg] = useState(false);
  const [editingLogo, setEditingLogo] = useState(false);
  const logoDisplayRef = useRef<HTMLImageElement>(null);

  // QR instance
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<any>(null);
  const [copied, setCopied] = useState(false);

  // Generate encoded string from current content type
  const getEncodedData = useCallback((): string => {
    switch (contentType) {
      case 'text': return encodeText(textValue);
      case 'url': return encodeUrl(textValue);
      case 'email': return encodeEmail(emailData);
      case 'phone': return encodePhone(textValue);
      case 'sms': return encodeSms(smsData);
      case 'wifi': return encodeWifi(wifiData);
      case 'vcard': return encodeVCard(vcardData);
      case 'mecard': return encodeMeCard(mecardData);
      case 'geo': return encodeGeo(geoData);
      case 'event': return encodeVEvent(eventData);
      case 'whatsapp': return encodeWhatsApp(whatsappData);
      case 'upi': return encodeUpi(upiData);
      case 'crypto': return encodeCrypto(cryptoData);
      default: return textValue;
    }
  }, [contentType, textValue, emailData, smsData, wifiData, vcardData, mecardData, geoData, eventData, whatsappData, upiData, cryptoData]);

  // Swap in a custom clip-path shape for each finder pattern's border/center when a
  // non-native style is selected. The library already rotates each clip-path to face
  // the right corner, so we only need to preserve that transform on our replacement.
  const applyCustomCornerStyles = useCallback(() => {
    const svg = qrContainerRef.current?.querySelector('svg');
    if (!svg) return;

    const squareCfg = CORNER_SQUARE_STYLES.find((s) => s.value === cornerSquareStyle);
    const dotCfg = CORNER_DOT_STYLES.find((s) => s.value === cornerDotStyle);

    const processGroup = (idFragment: string, cfg: CornerStyleOption | undefined, isBorder: boolean) => {
      if (!cfg || cfg.kind === 'native') return;
      const rects = svg.querySelectorAll(`rect[clip-path*="${idFragment}"]`);
      rects.forEach((rect) => {
        const clipUrl = rect.getAttribute('clip-path');
        const match = clipUrl?.match(/#([\w-]+)/);
        if (!match) return;
        const clipPathEl = svg.querySelector(`#${CSS.escape(match[1])}`);
        if (!clipPathEl) return;
        const x = parseFloat(rect.getAttribute('x') || '0');
        const y = parseFloat(rect.getAttribute('y') || '0');
        const w = parseFloat(rect.getAttribute('width') || '0');
        const h = parseFloat(rect.getAttribute('height') || '0');
        const transform = clipPathEl.firstElementChild?.getAttribute('transform') || '';
        clipPathEl.innerHTML = buildCustomClipShapes(cfg.kind, x, y, w, h, isBorder);
        if (transform) {
          Array.from(clipPathEl.children).forEach((child) => child.setAttribute('transform', transform));
        }
      });
    };

    processGroup('corners-square-color', squareCfg, true);
    processGroup('corners-dot-color', dotCfg, false);
  }, [cornerSquareStyle, cornerDotStyle]);

  // Render QR code
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const renderQR = async () => {
      const QRCodeStyling = (await import('qr-code-styling')).default;

      const data = getEncodedData();
      if (!data) return;

      const squareCfg = CORNER_SQUARE_STYLES.find((s) => s.value === cornerSquareStyle);
      const dotCfg = CORNER_DOT_STYLES.find((s) => s.value === cornerDotStyle);

      const options: any = {
        width: size,
        height: size,
        margin: margin,
        data: data,
        type: 'svg',
        dotsOptions: {
          color: fgColor,
          type: dotStyle,
        },
        cornersSquareOptions: {
          color: fgColor,
          type: squareCfg?.nativeType || 'square',
        },
        cornersDotOptions: {
          color: fgColor,
          type: dotCfg?.nativeType || 'square',
        },
        backgroundOptions: {
          color: bgColor,
        },
        qrOptions: {
          errorCorrectionLevel: errorCorrection,
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 5,
          imageSize: logoSize,
          hideBackgroundDots: true,
        },
      };

      if (logoFile) {
        options.image = logoFile;
      }

      if (qrInstance.current) {
        qrInstance.current.update(options);
      } else {
        qrInstance.current = new QRCodeStyling(options);
        if (qrContainerRef.current) {
          qrContainerRef.current.innerHTML = '';
          qrInstance.current.append(qrContainerRef.current);
        }
      }

      applyCustomCornerStyles();
    };

    renderQR();
  }, [getEncodedData, size, margin, fgColor, bgColor, dotStyle, cornerSquareStyle, cornerDotStyle, errorCorrection, logoFile, logoSize, applyCustomCornerStyles]);

  // Rasterize the live (already customized) preview SVG onto a canvas for PNG/JPEG
  // export and clipboard copy — the library's own download() renders from its internal
  // model, which wouldn't reflect our clip-path overrides above.
  const rasterizePreview = useCallback((onReady: (canvas: HTMLCanvasElement) => void) => {
    const svg = qrContainerRef.current?.querySelector('svg');
    if (!svg) return;
    const markup = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = size * scale;
      canvas.height = size * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      onReady(canvas);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [size]);

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download handlers
  const downloadPNG = () => {
    rasterizePreview((canvas) => canvas.toBlob((blob) => blob && triggerDownload(blob, 'qrcode.png'), 'image/png'));
  };
  const downloadSVG = () => {
    const svg = qrContainerRef.current?.querySelector('svg');
    if (!svg) return;
    const markup = new XMLSerializer().serializeToString(svg);
    triggerDownload(new Blob([markup], { type: 'image/svg+xml' }), 'qrcode.svg');
  };
  const downloadJPEG = () => {
    rasterizePreview((canvas) => canvas.toBlob((blob) => blob && triggerDownload(blob, 'qrcode.jpeg'), 'image/jpeg', 0.95));
  };

  const copyToClipboard = async () => {
    rasterizePreview((canvas) => {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch { /* clipboard not available */ }
      }, 'image/png');
    });
  };

  // Logo upload — opens the crop/shape editor rather than using the image as-is.
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLogoRawUrl(reader.result as string);
      setLogoCrop(undefined);
      setRemoveBg(false);
      setEditingLogo(true);
    };
    reader.readAsDataURL(file);
  };

  // Start with the whole image selected — the image itself is always shown in full
  // (no scrolling), so the user only drags the crop box in to trim something out.
  const handleLogoImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setLogoCrop({ unit: 'px', width, height, x: 0, y: 0 });
  };

  // Crop, mask to the chosen shape, optionally strip the background, then hand the
  // resulting PNG to the QR renderer via logoFile — same as a plain upload used to.
  // The output keeps the crop's own aspect ratio (free-form crop, not forced square).
  const applyLogoEdit = () => {
    const img = logoDisplayRef.current;
    if (!img || !logoRawUrl) return;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const box = logoCrop && logoCrop.width > 0 && logoCrop.height > 0
      ? logoCrop
      : { x: 0, y: 0, width: img.width, height: img.height };

    const cropW = box.width * scaleX;
    const cropH = box.height * scaleY;
    const scale = 512 / Math.max(cropW, cropH);
    const outW = Math.max(1, Math.round(cropW * scale));
    const outH = Math.max(1, Math.round(cropH * scale));

    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.beginPath();
    if (logoShape === 'round') {
      ctx.ellipse(outW / 2, outH / 2, outW / 2, outH / 2, 0, 0, Math.PI * 2);
    } else if (logoShape === 'rounded') {
      const r = Math.min(outW, outH) * 0.22;
      ctx.moveTo(r, 0);
      ctx.arcTo(outW, 0, outW, outH, r);
      ctx.arcTo(outW, outH, 0, outH, r);
      ctx.arcTo(0, outH, 0, 0, r);
      ctx.arcTo(0, 0, outW, 0, r);
    } else {
      ctx.rect(0, 0, outW, outH);
    }
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, box.x * scaleX, box.y * scaleY, cropW, cropH, 0, 0, outW, outH);
    ctx.restore();

    if (removeBg) removeBackgroundFromCanvas(canvas);

    setLogoFile(canvas.toDataURL('image/png'));
    setEditingLogo(false);
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoRawUrl(null);
    setEditingLogo(false);
  };

  // Render content form based on type
  const renderContentForm = () => {
    switch (contentType) {
      case 'text': return <TextForm value={textValue} onChange={setTextValue} />;
      case 'url': return <UrlForm value={textValue} onChange={setTextValue} />;
      case 'email': return <EmailForm data={emailData} onChange={setEmailData} />;
      case 'phone': return <PhoneForm value={textValue} onChange={setTextValue} />;
      case 'sms': return <SmsForm data={smsData} onChange={setSmsData} />;
      case 'wifi': return <WifiForm data={wifiData} onChange={setWifiData} />;
      case 'vcard': return <VCardForm data={vcardData} onChange={setVcardData} />;
      case 'mecard': return <MeCardForm data={mecardData} onChange={setMecardData} />;
      case 'geo': return <GeoForm data={geoData} onChange={setGeoData} />;
      case 'event': return <EventForm data={eventData} onChange={setEventData} />;
      case 'whatsapp': return <WhatsAppForm data={whatsappData} onChange={setWhatsappData} />;
      case 'upi': return <UpiForm data={upiData} onChange={setUpiData} />;
      case 'crypto': return <CryptoForm data={cryptoData} onChange={setCryptoData} />;
      default: return null;
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 380px' }, gap: 4 }}>
      {/* Left: Content & Style Controls */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
        
        {/* Content Type Selection */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Content Type</Typography>
          <Tabs
            value={contentType}
            onChange={(_, v) => setContentType(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 2, '& .MuiTab-root': { minWidth: 'auto', fontSize: '0.8rem', textTransform: 'none' } }}
          >
            {QR_CONTENT_TYPES.map((t) => (
              <Tab key={t.value} value={t.value} label={t.label} />
            ))}
          </Tabs>
          {renderContentForm()}
        </Paper>

        {/* Style Controls */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>QR Style</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

              {/* Colors — compact swatches instead of two full-width fields */}
              <Box sx={{ display: 'flex', gap: 3 }}>
                <ColorSwatchInput label="Foreground" value={fgColor} onChange={setFgColor} />
                <ColorSwatchInput label="Background" value={bgColor} onChange={setBgColor} />
              </Box>

              {/* Size / Margin / Error Correction — one row */}
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary" noWrap>Size: {size}px</Typography>
                  <Slider size="small" value={size} min={150} max={500} step={10} onChange={(_, val) => setSize(val as number)} />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary" noWrap>Margin: {margin}px</Typography>
                  <Slider size="small" value={margin} min={0} max={50} step={5} onChange={(_, val) => setMargin(val as number)} />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Error Correction</InputLabel>
                    <Select value={errorCorrection} label="Error Correction" onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}>
                      {ERROR_CORRECTION_LEVELS.map((l) => <MenuItem key={l.value} value={l.value}>{l.label}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Dot / Border / Center style — one row so it reads as one related group */}
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Dot Style</InputLabel>
                    <Select value={dotStyle} label="Dot Style" onChange={(e) => setDotStyle(e.target.value)}>
                      {DOT_STYLES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Border Style</InputLabel>
                    <Select
                      value={cornerSquareStyle}
                      label="Border Style"
                      onChange={(e) => setCornerSquareStyle(e.target.value)}
                      renderValue={(v) => {
                        const opt = CORNER_SQUARE_STYLES.find((s) => s.value === v);
                        return opt ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CornerStyleIcon option={opt} isBorder /> {opt.label}
                          </Box>
                        ) : v;
                      }}
                    >
                      {CORNER_SQUARE_STYLES.map((s) => (
                        <MenuItem key={s.value} value={s.value} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <CornerStyleIcon option={s} isBorder /> {s.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Center Style</InputLabel>
                    <Select
                      value={cornerDotStyle}
                      label="Center Style"
                      onChange={(e) => setCornerDotStyle(e.target.value)}
                      renderValue={(v) => {
                        const opt = CORNER_DOT_STYLES.find((s) => s.value === v);
                        return opt ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CornerStyleIcon option={opt} isBorder={false} /> {opt.label}
                          </Box>
                        ) : v;
                      }}
                    >
                      {CORNER_DOT_STYLES.map((s) => (
                        <MenuItem key={s.value} value={s.value} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <CornerStyleIcon option={s} isBorder={false} /> {s.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Logo Upload */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Logo / Image</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Alert severity="info" sx={{ fontSize: '0.8rem' }}>
                Use High error correction (H) when adding a logo to maintain scannability.
              </Alert>

              {!logoRawUrl && (
                <Button variant="outlined" component="label" startIcon={<ImageIcon />}>
                  Upload Logo
                  <input type="file" hidden accept="image/*" onChange={handleLogoUpload} />
                </Button>
              )}

              {logoRawUrl && editingLogo && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1, display: 'flex', justifyContent: 'center' }}>
                    <ReactCrop crop={logoCrop} onChange={(c) => setLogoCrop(c)} circularCrop={logoShape === 'round'}>
                      <Box
                        component="img"
                        ref={logoDisplayRef}
                        src={logoRawUrl}
                        alt="Logo to crop"
                        onLoad={handleLogoImageLoad}
                        sx={{ display: 'block', maxWidth: '100%', maxHeight: 320, width: 'auto', height: 'auto' }}
                      />
                    </ReactCrop>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    Drag a corner of the box to select the area you want — the full image is always shown, no scrolling needed.
                  </Typography>

                  <ToggleButtonGroup value={logoShape} exclusive onChange={(_, v) => v && setLogoShape(v)} size="small" fullWidth>
                    <ToggleButton value="square"><CropSquareIcon fontSize="small" sx={{ mr: 1 }} /> Square</ToggleButton>
                    <ToggleButton value="rounded"><CropDinIcon fontSize="small" sx={{ mr: 1 }} /> Rounded</ToggleButton>
                    <ToggleButton value="round"><RadioButtonUncheckedIcon fontSize="small" sx={{ mr: 1 }} /> Round</ToggleButton>
                  </ToggleButtonGroup>

                  <FormControlLabel
                    control={<Switch checked={removeBg} onChange={(e) => setRemoveBg(e.target.checked)} />}
                    label="Remove background (auto — best for a solid-color background)"
                  />

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" onClick={applyLogoEdit} sx={{ flex: 1 }}>Apply</Button>
                    <Button variant="text" color="error" onClick={removeLogo}>Cancel</Button>
                  </Box>
                </Box>
              )}

              {logoFile && !editingLogo && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={logoFile}
                      alt="Logo preview"
                      sx={{
                        width: 48, height: 48, objectFit: 'contain', border: '1px solid', borderColor: 'divider',
                        borderRadius: logoShape === 'round' ? '50%' : logoShape === 'rounded' ? '22%' : 0,
                      }}
                    />
                    <Button size="small" startIcon={<EditIcon fontSize="small" />} onClick={() => setEditingLogo(true)}>Edit</Button>
                    <Button size="small" color="error" onClick={removeLogo}>Remove</Button>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Logo Size: {Math.round(logoSize * 100)}%</Typography>
                    <Slider value={logoSize} min={0.1} max={0.5} step={0.05} onChange={(_, val) => setLogoSize(val as number)} />
                  </Box>
                </>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Right: Preview & Download */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, position: { lg: 'sticky' }, top: { lg: 80 }, alignSelf: 'start' }}>
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" color="text.secondary">Live Preview</Typography>
          <Box
            ref={qrContainerRef}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 200,
              minWidth: 200,
              '& canvas, & svg': { maxWidth: '100%', height: 'auto' },
            }}
          />
        </Paper>

        {/* Download Buttons */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadPNG} sx={{ flex: 1 }}>PNG</Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadSVG} sx={{ flex: 1 }}>SVG</Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={downloadJPEG} sx={{ flex: 1 }}>JPEG</Button>
        </Box>
        <Tooltip title={copied ? 'Copied!' : 'Copy to Clipboard'}>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} fullWidth>
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

const QrCodeGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free QR Code Generator — All Types</Typography>
      <Typography variant="body1">
        Generate QR codes for URLs, text, WiFi networks, vCards, emails, UPI payments, WhatsApp messages, geo locations, calendar events, and more. Customize dot styles, colors, corners, and add your logo. Download as PNG, SVG, or JPEG.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Choose a QR type, fill in its fields (like a URL or WiFi password), customize the style, and download
        the generated code.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering a website URL and clicking generate produces a scannable QR code that opens that page when
        scanned with a phone camera.
      </Typography>

      <Typography variant="h2">Supported QR Code Types</Typography>
      <Typography variant="body1">
        • <strong>URL & Text</strong> — Link to any website or embed plain text<br/>
        • <strong>WiFi</strong> — Share network credentials (WPA/WEP/Open)<br/>
        • <strong>vCard & MeCard</strong> — Full contact details (name, phone, email, address, org)<br/>
        • <strong>Email</strong> — Pre-filled mailto with subject, body, CC, BCC<br/>
        • <strong>UPI Payment</strong> — Indian UPI pay links with amount & note<br/>
        • <strong>WhatsApp</strong> — Direct message links with pre-filled text<br/>
        • <strong>Geo Location</strong> — GPS coordinates on a map<br/>
        • <strong>Calendar Event</strong> — iCal event with date, time, location<br/>
        • <strong>Crypto</strong> — Bitcoin & Ethereum wallet addresses
      </Typography>

      <Typography variant="h2">Customization Features</Typography>
      <Typography variant="body1">
        • <strong>Dot Styles:</strong> Square, Rounded, Dots, Classy, Classy Rounded, Extra Rounded<br/>
        • <strong>Border &amp; Center Styles:</strong> Square, Circle, Dots, Rounded, Squircle, Cornerflow — independently for the finder pattern border and its center<br/>
        • <strong>Colors:</strong> Custom foreground and background colors<br/>
        • <strong>Logo:</strong> Upload your brand logo with adjustable size and automatic dot excavation<br/>
        • <strong>Export:</strong> Download as PNG, SVG, or JPEG; copy to clipboard
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sharing WiFi credentials at a cafe or office without typing a long password.</li>
          <li>Adding a scannable link to business cards, flyers, or product packaging.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Do these QR codes expire?</Typography>
      <Typography variant="body1">
        No — the QR code itself never expires; it will keep working as long as the underlying data (like a
        URL) it points to remains valid.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="QR Code Generator"
      description="Create custom QR codes for URLs, WiFi, vCard, UPI, WhatsApp, email and more. Custom dot styles, colors, logo upload. Free PNG/SVG/JPEG download."
      url="/developer-tools/qr-code-generator"
      content={content}
      category="Developer Tools"
    >
      <QrCodeGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default QrCodeGenerator;
