/**
 * QR Code content encoders for various data types.
 * Each encoder produces a string that QR code readers can interpret.
 */

// ── Plain Text ──
export function encodeText(text: string): string {
  return text;
}

// ── URL ──
export function encodeUrl(url: string): string {
  // Add protocol if missing
  if (url && !url.match(/^https?:\/\//i)) {
    return `https://${url}`;
  }
  return url;
}

// ── Email (mailto) ──
export interface EmailData {
  to: string;
  subject?: string;
  body?: string;
  cc?: string;
  bcc?: string;
}

export function encodeEmail(data: EmailData): string {
  const params: string[] = [];
  if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
  if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
  if (data.cc) params.push(`cc=${encodeURIComponent(data.cc)}`);
  if (data.bcc) params.push(`bcc=${encodeURIComponent(data.bcc)}`);
  const query = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${data.to}${query}`;
}

// ── Phone ──
export function encodePhone(phone: string): string {
  return `tel:${phone}`;
}

// ── SMS ──
export interface SmsData {
  phone: string;
  message?: string;
}

export function encodeSms(data: SmsData): string {
  const msg = data.message ? `?body=${encodeURIComponent(data.message)}` : '';
  return `sms:${data.phone}${msg}`;
}

// ── WiFi ──
export interface WifiData {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

export function encodeWifi(data: WifiData): string {
  const hidden = data.hidden ? 'H:true' : '';
  const password = data.password ? `P:${escapeWifiSpecial(data.password)}` : '';
  return `WIFI:T:${data.encryption};S:${escapeWifiSpecial(data.ssid)};${password};${hidden};;`;
}

function escapeWifiSpecial(str: string): string {
  return str.replace(/([\\;,:".])/g, '\\$1');
}

// ── vCard 3.0 ──
export interface VCardData {
  firstName: string;
  lastName?: string;
  organization?: string;
  title?: string;
  phone?: string;
  mobile?: string;
  fax?: string;
  email?: string;
  website?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  note?: string;
}

export function encodeVCard(data: VCardData): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${data.lastName || ''};${data.firstName};;;`,
    `FN:${data.firstName}${data.lastName ? ' ' + data.lastName : ''}`,
  ];

  if (data.organization) lines.push(`ORG:${data.organization}`);
  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.phone) lines.push(`TEL;TYPE=WORK,VOICE:${data.phone}`);
  if (data.mobile) lines.push(`TEL;TYPE=CELL:${data.mobile}`);
  if (data.fax) lines.push(`TEL;TYPE=FAX:${data.fax}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.street || data.city || data.state || data.zip || data.country) {
    lines.push(`ADR;TYPE=WORK:;;${data.street || ''};${data.city || ''};${data.state || ''};${data.zip || ''};${data.country || ''}`);
  }
  if (data.note) lines.push(`NOTE:${data.note}`);

  lines.push('END:VCARD');
  return lines.join('\n');
}

// ── MeCard ──
export interface MeCardData {
  name: string;
  phone?: string;
  email?: string;
  url?: string;
  address?: string;
  note?: string;
}

export function encodeMeCard(data: MeCardData): string {
  let result = `MECARD:N:${data.name};`;
  if (data.phone) result += `TEL:${data.phone};`;
  if (data.email) result += `EMAIL:${data.email};`;
  if (data.url) result += `URL:${data.url};`;
  if (data.address) result += `ADR:${data.address};`;
  if (data.note) result += `NOTE:${data.note};`;
  result += ';';
  return result;
}

// ── Geo Location ──
export interface GeoData {
  latitude: number;
  longitude: number;
}

export function encodeGeo(data: GeoData): string {
  return `geo:${data.latitude},${data.longitude}`;
}

// ── Calendar Event (vEvent) ──
export interface VEventData {
  title: string;
  location?: string;
  description?: string;
  startDate: string; // ISO date string
  endDate?: string;  // ISO date string
}

export function encodeVEvent(data: VEventData): string {
  const formatDate = (iso: string) => {
    return iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '').replace('Z', '');
  };
  
  const lines: string[] = [
    'BEGIN:VEVENT',
    `SUMMARY:${data.title}`,
    `DTSTART:${formatDate(data.startDate)}`,
  ];
  
  if (data.endDate) lines.push(`DTEND:${formatDate(data.endDate)}`);
  if (data.location) lines.push(`LOCATION:${data.location}`);
  if (data.description) lines.push(`DESCRIPTION:${data.description}`);
  lines.push('END:VEVENT');
  
  return `BEGIN:VCALENDAR\nVERSION:2.0\n${lines.join('\n')}\nEND:VCALENDAR`;
}

// ── WhatsApp ──
export interface WhatsAppData {
  phone: string; // with country code, no + prefix needed
  message?: string;
}

export function encodeWhatsApp(data: WhatsAppData): string {
  const phone = data.phone.replace(/[^0-9]/g, '');
  const msg = data.message ? `?text=${encodeURIComponent(data.message)}` : '';
  return `https://wa.me/${phone}${msg}`;
}

// ── UPI Payment (India) ──
export interface UpiData {
  payeeVpa: string; // e.g. "user@upi"
  payeeName?: string;
  amount?: string;
  currency?: string;
  note?: string;
}

export function encodeUpi(data: UpiData): string {
  const params: string[] = [`pa=${encodeURIComponent(data.payeeVpa)}`];
  if (data.payeeName) params.push(`pn=${encodeURIComponent(data.payeeName)}`);
  if (data.amount) params.push(`am=${data.amount}`);
  params.push(`cu=${data.currency || 'INR'}`);
  if (data.note) params.push(`tn=${encodeURIComponent(data.note)}`);
  return `upi://pay?${params.join('&')}`;
}

// ── Crypto (Bitcoin/Ethereum) ──
export interface CryptoData {
  type: 'bitcoin' | 'ethereum';
  address: string;
  amount?: string;
  label?: string;
}

export function encodeCrypto(data: CryptoData): string {
  const params: string[] = [];
  if (data.amount) params.push(`amount=${data.amount}`);
  if (data.label) params.push(`label=${encodeURIComponent(data.label)}`);
  const query = params.length > 0 ? `?${params.join('&')}` : '';
  return `${data.type}:${data.address}${query}`;
}

// ── Content type metadata ──
export type QrContentType =
  | 'text' | 'url' | 'email' | 'phone' | 'sms'
  | 'wifi' | 'vcard' | 'mecard' | 'geo'
  | 'event' | 'whatsapp' | 'upi' | 'crypto';

export const QR_CONTENT_TYPES: { value: QrContentType; label: string }[] = [
  { value: 'text', label: 'Plain Text' },
  { value: 'url', label: 'URL' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'sms', label: 'SMS' },
  { value: 'wifi', label: 'WiFi' },
  { value: 'vcard', label: 'vCard (Contact)' },
  { value: 'mecard', label: 'MeCard' },
  { value: 'geo', label: 'Geo Location' },
  { value: 'event', label: 'Calendar Event' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'upi', label: 'UPI Payment' },
  { value: 'crypto', label: 'Crypto Address' },
];
