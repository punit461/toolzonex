'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box, TextField, Typography, Button, Paper, Slider, Select, MenuItem,
  FormControl, InputLabel, Grid, Switch, FormControlLabel, Tabs, Tab,
  Accordion, AccordionSummary, AccordionDetails, Alert, IconButton, Tooltip
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';
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

const CORNER_SQUARE_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

const CORNER_DOT_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
];

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

  // Render QR code
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const renderQR = async () => {
      const QRCodeStyling = (await import('qr-code-styling')).default;
      
      const data = getEncodedData();
      if (!data) return;

      const options: any = {
        width: size,
        height: size,
        margin: margin,
        data: data,
        dotsOptions: {
          color: fgColor,
          type: dotStyle,
        },
        cornersSquareOptions: {
          color: fgColor,
          type: cornerSquareStyle === 'square' ? 'square' : cornerSquareStyle,
        },
        cornersDotOptions: {
          color: fgColor,
          type: cornerDotStyle,
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
    };

    renderQR();
  }, [getEncodedData, size, margin, fgColor, bgColor, dotStyle, cornerSquareStyle, cornerDotStyle, errorCorrection, logoFile, logoSize]);

  // Download handlers
  const downloadPNG = () => { qrInstance.current?.download({ name: 'qrcode', extension: 'png' }); };
  const downloadSVG = () => { qrInstance.current?.download({ name: 'qrcode', extension: 'svg' }); };
  const downloadJPEG = () => { qrInstance.current?.download({ name: 'qrcode', extension: 'jpeg' }); };

  const copyToClipboard = async () => {
    if (!qrContainerRef.current) return;
    const canvas = qrContainerRef.current.querySelector('canvas');
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch { /* clipboard not available */ }
  };

  // Logo upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLogoFile(reader.result as string);
    };
    reader.readAsDataURL(file);
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
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
              
              {/* Size & Margin */}
              <Box>
                <Typography variant="body2" color="text.secondary">Size: {size}px</Typography>
                <Slider value={size} min={150} max={500} step={10} onChange={(_, val) => setSize(val as number)} />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Margin: {margin}px</Typography>
                <Slider value={margin} min={0} max={50} step={5} onChange={(_, val) => setMargin(val as number)} />
              </Box>

              {/* Colors */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Foreground" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} fullWidth sx={{ '& input': { height: 40, cursor: 'pointer' } }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Background" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} fullWidth sx={{ '& input': { height: 40, cursor: 'pointer' } }} />
                </Grid>
              </Grid>

              {/* Dot Style */}
              <FormControl fullWidth size="small">
                <InputLabel>Dot Style</InputLabel>
                <Select value={dotStyle} label="Dot Style" onChange={(e) => setDotStyle(e.target.value)}>
                  {DOT_STYLES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
                </Select>
              </FormControl>

              {/* Corner Styles */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Corner Square</InputLabel>
                    <Select value={cornerSquareStyle} label="Corner Square" onChange={(e) => setCornerSquareStyle(e.target.value)}>
                      {CORNER_SQUARE_STYLES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Corner Dot</InputLabel>
                    <Select value={cornerDotStyle} label="Corner Dot" onChange={(e) => setCornerDotStyle(e.target.value)}>
                      {CORNER_DOT_STYLES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Error Correction */}
              <FormControl fullWidth size="small">
                <InputLabel>Error Correction</InputLabel>
                <Select value={errorCorrection} label="Error Correction" onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}>
                  {ERROR_CORRECTION_LEVELS.map((l) => <MenuItem key={l.value} value={l.value}>{l.label}</MenuItem>)}
                </Select>
              </FormControl>
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
              <Button variant="outlined" component="label" startIcon={<ImageIcon />}>
                {logoFile ? 'Change Logo' : 'Upload Logo'}
                <input type="file" hidden accept="image/*" onChange={handleLogoUpload} />
              </Button>
              {logoFile && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box component="img" src={logoFile} alt="Logo preview" sx={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 1, border: '1px solid', borderColor: 'divider' }} />
                    <Button size="small" color="error" onClick={() => setLogoFile(null)}>Remove</Button>
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
        • <strong>Corner Styles:</strong> Square, Dot, Extra Rounded for both corner squares and corner dots<br/>
        • <strong>Colors:</strong> Custom foreground and background colors<br/>
        • <strong>Logo:</strong> Upload your brand logo with adjustable size and automatic dot excavation<br/>
        • <strong>Export:</strong> Download as PNG, SVG, or JPEG; copy to clipboard
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="QR Code Generator"
      description="Create custom QR codes for URLs, WiFi, vCard, UPI, WhatsApp, email and more. Custom dot styles, colors, logo upload. Free PNG/SVG/JPEG download."
      url="/tools/qr-code-generator"
      content={content}
      category="Tools"
    >
      <QrCodeGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default QrCodeGenerator;
