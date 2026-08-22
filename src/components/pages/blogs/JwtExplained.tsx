'use client';

import { Typography, Box } from '@mui/material';
import RouterLink from 'next/link';
import BlogShell, { RelatedTool } from '../../BlogShell';
import AdSenseUnit from '../../AdSenseUnit';

const relatedTools: RelatedTool[] = [
  {
    label: 'JWT Decoder',
    path: '/developer-tools/jwt-decoder',
    description: 'Paste any JWT and see its header and payload decoded into readable JSON instantly.',
  },
];

const JwtExplained = () => {
  return (
    <BlogShell
      title="JWT Explained: What's Actually Inside a JSON Web Token"
      description="A JWT looks like random noise, but it's just base64url — no secret key needed to read it. Here's what's actually inside, and the mistake that trips up almost every implementation."
      url="/blog/jwt-explained"
      date="August 2026"
      relatedTools={relatedTools}
    >
      <Typography variant="body1">
        A JSON Web Token looks like a wall of gibberish — <code>eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NSJ9.abc123</code>
        {' '}— but it&apos;s not encrypted. It&apos;s just three base64url-encoded JSON objects stuck together
        with dots. Anyone can decode a JWT and read its contents without any secret key at all. That distinction
        — encoded, not encrypted — is the single most important thing to understand about how JWTs actually work.
      </Typography>

      <Typography variant="h2">The three parts</Typography>
      <Typography variant="body1">
        Split the token on its dots and you get three segments, each independently base64url-decodable:
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Header</strong> — a small JSON object naming the signing algorithm (e.g. <code>HS256</code>,
            {' '}<code>RS256</code>) and token type. Nothing sensitive here, just metadata about how to verify it.
          </li>
          <li>
            <strong>Payload</strong> — the actual data, called <em>claims</em>: things like a user ID
            (<code>sub</code>), an expiry timestamp (<code>exp</code>), an issuer (<code>iss</code>), and
            whatever custom fields the issuing service adds (roles, permissions, session data). This is plain
            JSON, base64-encoded for transport — not hidden.
          </li>
          <li>
            <strong>Signature</strong> — the only part that actually requires a secret. It&apos;s a cryptographic
            signature over the header and payload, computed with a key only the issuing server holds. This is
            what makes the token <em>tamper-evident</em>: change one character of the payload and the signature
            no longer matches.
          </li>
        </ul>
      </Box>

      <Typography variant="h2">Encoded, not encrypted — why it matters</Typography>
      <Typography variant="body1">
        Because the payload is just base64, never put secrets in it — passwords, API keys, or anything you
        wouldn&apos;t want a user to read directly, since any JWT sitting in a browser&apos;s localStorage or a
        network request can be decoded by anyone in a few seconds. What the signature <em>does</em> guarantee is
        integrity: if a client tries to edit the payload to escalate their own role or extend their own expiry,
        the signature check fails on the server and the token is rejected.
      </Typography>

      <Typography variant="h2">The mistake that keeps showing up: not checking <code>exp</code></Typography>
      <Typography variant="body1">
        A shockingly common implementation bug is verifying a JWT&apos;s signature but forgetting to check
        whether it has actually expired. The signature only proves the token wasn&apos;t tampered with — it
        says nothing about whether it&apos;s still valid. A correct verification step checks the signature
        <em>and</em> the <code>exp</code> claim (and often <code>nbf</code>/&quot;not before&quot; and
        <code>iss</code>/issuer) before trusting anything in the payload. Most JWT libraries do this
        automatically if you use their verify function — the risk shows up when someone hand-rolls decoding
        logic and skips it.
      </Typography>

      <Typography variant="h2">A worked example</Typography>
      <Typography variant="body1">
        A decoded payload might look like:
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <pre style={{ background: 'rgba(127,127,127,0.1)', padding: '12px', borderRadius: 8, overflowX: 'auto' }}>
{`{
  "sub": "user_12345",
  "role": "editor",
  "iat": 1755878400,
  "exp": 1755882000
}`}
        </pre>
      </Box>
      <Typography variant="body1">
        <code>iat</code> (issued at) and <code>exp</code> (expiry) are Unix timestamps. A server checks the
        current time against <code>exp</code> on every request — once it&apos;s passed, the token is rejected
        regardless of how valid its signature still is.
      </Typography>

      <Typography variant="h2">Try it yourself</Typography>
      <Typography variant="body1">
        Paste any JWT into the <RouterLink href="/developer-tools/jwt-decoder">JWT Decoder</RouterLink> to see
        its header and payload broken out instantly — useful for debugging an auth flow or just understanding
        what a third-party API is actually putting in the tokens it hands you. It decodes only, and never
        verifies or transmits the signature, so it&apos;s safe to use on real tokens while debugging locally.
      </Typography>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </BlogShell>
  );
};

export default JwtExplained;
