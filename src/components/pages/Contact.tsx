'use client';

import { useRef, useState } from 'react';
import Script from 'next/script';
import NextLink from 'next/link';
import {
  Box, Typography, Container, Paper, TextField, Button,
  Alert, CircularProgress, Divider, Link, FormControlLabel, Checkbox,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { CONTACT_EMAIL, CONTACT_RETENTION, OPERATOR_NAME, OPERATOR_LOCATION } from '../../data/siteInfo';

// ─────────────────────────────────────────────────────────────────────────────
// Google Sheets integration via Apps Script web-app URL.
// Set NEXT_PUBLIC_CONTACT_SHEET_URL in your .env file to enable. Leave blank to
// fall back to mailto: behaviour (no sheet, just email client opens).
// ─────────────────────────────────────────────────────────────────────────────
const SHEET_URL = process.env.NEXT_PUBLIC_CONTACT_SHEET_URL as string | undefined;

// ─────────────────────────────────────────────────────────────────────────────
// Turnstile widget. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY to enable; blank skips
// rendering it entirely (form works exactly as before).
//
// This site is a static export with no server, so the widget here can only
// gate the submit button client-side — it cannot itself stop a bot that skips
// the page and POSTs straight to the Apps Script URL. The token is only real
// protection once SHEET_URL's Apps Script calls Cloudflare's siteverify API
// with the secret key and rejects the write on failure. That check has to be
// added in the Apps Script project itself (outside this repo); this file just
// forwards the token as `turnstileToken` in the payload for it to read.
// ─────────────────────────────────────────────────────────────────────────────
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string | undefined;

type TurnstileWidgetId = string;
type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: { sitekey: string; action: string; callback: (token: string) => void }
  ) => TurnstileWidgetId;
  reset: (widgetId: TurnstileWidgetId) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  // DPDP-style consent: an unticked box the visitor must tick themselves, tied
  // to one stated purpose (replying). Never pre-checked.
  const [consent, setConsent] = useState(false);

  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<TurnstileWidgetId | null>(null);

  const renderTurnstile = () => {
    if (!turnstileContainer.current || turnstileWidgetId.current !== null || !TURNSTILE_SITE_KEY) return;
    turnstileWidgetId.current = window.turnstile!.render(turnstileContainer.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: 'contact',
      callback: setTurnstileToken,
    });
  };

  const isValid = email.trim() && message.trim() && consent && (!TURNSTILE_SITE_KEY || turnstileToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      // Required fields are enforced by the browser before submit fires, so the
      // only way to land here is a missing spam-check token.
      setStatus('error');
      setErrorMsg('Please complete the spam check above, then send again.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    const payload = {
      timestamp: new Date().toISOString(),
      name: name.trim() || '(not given)',
      email: email.trim(),
      subject: subject.trim() || '(no subject)',
      message: message.trim(),
      ...(TURNSTILE_SITE_KEY ? { turnstileToken } : {}),
    };

    if (SHEET_URL) {
      // ── Google Sheets path ──────────────────────────────────────
      // mode: 'no-cors' skips the preflight OPTIONS request which Apps Script
      // doesn't handle. The response will be opaque (unreadable) but the POST
      // body IS delivered and the sheet row IS written. We treat it as success.
      try {
        await fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(payload),
        });
        setStatus('success');
        setName(''); setSubject(''); setMessage(''); setConsent(false);
      } catch {
        setStatus('error');
        setErrorMsg('Network error. Please try again or email us directly.');
      } finally {
        if (turnstileWidgetId.current !== null) {
          window.turnstile!.reset(turnstileWidgetId.current);
          setTurnstileToken('');
        }
      }
    } else {
      // ── Fallback: open mailto ───────────────────────────────────
      const body = `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`;
      window.open(
        `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(payload.subject || 'ToolZoneX Enquiry')}&body=${encodeURIComponent(body)}`
      );
      setStatus('success');
      setName(''); setSubject(''); setMessage(''); setConsent(false);
    }
  };

  return (
    <Container maxWidth="md">

      <Box sx={{ my: 6 }}>
        <Typography variant="h1" gutterBottom sx={{ fontWeight: 800 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          Have a question, found a bug, or want a new calculator? We'd love to hear from you.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 6 }}>
          {/* Left — info */}
          <Box>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <EmailIcon color="primary" aria-hidden="true" />
                <Typography component="h2" sx={{ fontWeight: 700, fontSize: '1rem' }}>Email us directly</Typography>
              </Box>
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                underline="hover"
                sx={{ fontSize: '0.875rem', wordBreak: 'break-all' }}
              >
                {CONTACT_EMAIL}
              </Link>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Typography component="h2" sx={{ fontWeight: 700, fontSize: '1rem', mb: 1 }}>Who runs ToolZoneX</Typography>
              <Typography variant="body2" color="text.secondary">
                {OPERATOR_NAME}, an individual developer based in {OPERATOR_LOCATION}. ToolZoneX has no paid products
                and never asks for payment details.
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <Typography component="h2" sx={{ fontWeight: 700, fontSize: '1rem', mb: 1 }}>Common topics</Typography>
              <Typography variant="body2" color="text.secondary" component="div">
                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
                  <li>Calculator bugs or wrong results</li>
                  <li>Feature requests</li>
                  <li>Partnership & advertising</li>
                  <li>Content corrections</li>
                  <li>Privacy requests and grievances</li>
                </ul>
              </Typography>
            </Paper>
          </Box>

          {/* Right — form */}
          <Paper variant="outlined" sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 2 }}>
            {status === 'success' ? (
              <Alert severity="success" sx={{ borderRadius: 2 }}>
                <Typography sx={{ fontWeight: 700 }}>Message sent</Typography>
                <Typography variant="body2">
                  Thanks for getting in touch. We&apos;ll reply to <strong>{email || 'your email address'}</strong> as soon as we can.
                </Typography>
              </Alert>
            ) : (
              // No `noValidate`: the browser's own required-field checks run on submit,
              // focus the first missing field and announce why — unlike the old
              // permanently-disabled button, which gave keyboard and screen-reader
              // users no clue what was missing.
              <Box component="form" onSubmit={handleSubmit} aria-labelledby="contact-form-heading" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography id="contact-form-heading" variant="h6" component="h2" sx={{ fontWeight: 700 }}>Send us a message</Typography>
                <Divider />

                {status === 'error' && (
                  <Alert severity="error">{errorMsg}</Alert>
                )}

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <TextField
                    label="Email address"
                    type="email"
                    variant="outlined"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Name (optional)"
                    variant="outlined"
                    autoComplete="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Box>

                <TextField
                  label="Subject (optional)"
                  variant="outlined"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Bug in EMI calculator"
                />

                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={5}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />

                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={consent}
                        onChange={e => setConsent(e.target.checked)}
                        required
                        slotProps={{ input: { 'aria-describedby': 'contact-privacy-notice' } }}
                      />
                    }
                    label="I agree that ToolZoneX may use my email address, message and (if given) name and subject to reply to me."
                    sx={{ alignItems: 'flex-start', '& .MuiCheckbox-root': { pt: 0.5 } }}
                  />
                  <Typography id="contact-privacy-notice" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {SHEET_URL
                      ? <>Your message is stored in our Google account (Google Sheets and Gmail), used only to reply, and deleted {CONTACT_RETENTION} after our last reply. </>
                      : <>Sending opens your email app with your message ready to send to {CONTACT_EMAIL}. We use it only to reply, and delete it {CONTACT_RETENTION} after our last reply. </>}
                    You can withdraw consent or ask us to delete your message at any time by emailing {CONTACT_EMAIL}.
                    See our{' '}
                    <Link component={NextLink} href="/privacy-policy">Privacy Policy</Link>.
                  </Typography>
                </Box>

                {TURNSTILE_SITE_KEY && <Box ref={turnstileContainer} />}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={status === 'sending'}
                  sx={{ alignSelf: 'flex-start', minWidth: 160 }}
                  startIcon={status === 'sending' ? <CircularProgress size={18} color="inherit" /> : undefined}
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>

      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderTurnstile}
        />
      )}
    </Container>
  );
};

export default Contact;
