'use client';

import { useState } from 'react';
import {
  Box, Typography, Container, Paper, TextField, Button,
  Alert, CircularProgress, Divider, Link,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

// ─────────────────────────────────────────────────────────────────────────────
// Google Sheets integration via Apps Script web-app URL.
// Set NEXT_PUBLIC_CONTACT_SHEET_URL in your .env file to enable. Leave blank to
// fall back to mailto: behaviour (no sheet, just email client opens).
// ─────────────────────────────────────────────────────────────────────────────
const SHEET_URL = process.env.NEXT_PUBLIC_CONTACT_SHEET_URL as string | undefined;
const CONTACT_EMAIL = 'punit461bharadwaj@gmail.com';

type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValid = name.trim() && email.trim() && message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setStatus('sending');
    setErrorMsg('');

    const payload = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim() || '(no subject)',
      message: message.trim(),
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
        setName(''); setEmail(''); setSubject(''); setMessage('');
      } catch {
        setStatus('error');
        setErrorMsg('Network error. Please try again or email us directly.');
      }
    } else {
      // ── Fallback: open mailto ───────────────────────────────────
      const body = `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`;
      window.open(
        `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(payload.subject || 'ToolZoneX Enquiry')}&body=${encodeURIComponent(body)}`
      );
      setStatus('success');
      setName(''); setEmail(''); setSubject(''); setMessage('');
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
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #E5E5E5', borderRadius: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <EmailIcon color="primary" />
                <Typography sx={{ fontWeight: 700 }}>Email us directly</Typography>
              </Box>
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                underline="hover"
                sx={{ fontSize: '0.875rem', wordBreak: 'break-all' }}
              >
                {CONTACT_EMAIL}
              </Link>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, border: '1px solid #E5E5E5', borderRadius: 2 }}>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>Common topics</Typography>
              <Typography variant="body2" color="text.secondary" component="div">
                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
                  <li>Calculator bugs or wrong results</li>
                  <li>Feature requests</li>
                  <li>Partnership & advertising</li>
                  <li>Content corrections</li>
                  <li>General questions</li>
                </ul>
              </Typography>
            </Paper>
          </Box>

          {/* Right — form */}
          <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E5E5', borderRadius: 2 }}>
            {status === 'success' ? (
              <Alert severity="success" sx={{ borderRadius: 2 }}>
                <Typography sx={{ fontWeight: 700 }}>Message sent!</Typography>
                <Typography variant="body2">
                  Thanks for reaching out. We'll get back to you at <strong>{email || 'your email'}</strong> as soon as possible.
                </Typography>
              </Alert>
            ) : (
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Send us a message</Typography>
                <Divider />

                {status === 'error' && (
                  <Alert severity="error">{errorMsg}</Alert>
                )}

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <TextField
                    label="Your Name"
                    variant="outlined"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Box>

                <TextField
                  label="Subject"
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
                  placeholder="Tell us what's on your mind…"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!isValid || status === 'sending'}
                  sx={{ alignSelf: 'flex-start', minWidth: 160 }}
                  startIcon={status === 'sending' ? <CircularProgress size={18} color="inherit" /> : undefined}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </Button>

                <Typography variant="caption" color="text.secondary">
                  {SHEET_URL
                    ? 'Your message will be saved securely and we will reply by email.'
                    : `No reply service configured yet. You can email us directly at ${CONTACT_EMAIL}`}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
