'use client';

import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import LegalPage, { type LegalSection } from '../legal/LegalPage';
import CookieSettingsButton from '../legal/CookieSettingsButton';
import { SITE_NAME, CONTACT_EMAIL } from '../../data/siteInfo';

/*
 * Inventory checked against the code on 2026-09-26: the site itself sets no
 * cookies (no document.cookie anywhere in src/); browser storage is limited to
 * the keys named below. Keep this table in step with any new localStorage /
 * IndexedDB key or third-party script.
 */

const summary = (
  <>
    <p style={{ marginTop: 0, fontWeight: 600 }}>The short version</p>
    <ul style={{ marginBottom: 0 }}>
      <li>{SITE_NAME} itself sets no cookies.</li>
      <li>A few tools save your preferences or notes in your browser. That data stays on your device.</li>
      <li>
        Google AdSense sets advertising cookies. In the EEA, UK and Switzerland, Google asks for your consent first,
        and you can change your choice below.
      </li>
      <li>Our visitor statistics (Cloudflare Web Analytics) don’t use cookies.</li>
    </ul>
  </>
);

const sections: LegalSection[] = [
  {
    id: 'what-are-cookies',
    title: 'What cookies and browser storage are',
    body: (
      <p>
        A cookie is a small file a website saves in your browser. Browser storage (localStorage and IndexedDB)
        does a similar job, but it’s only readable by the site that saved it and isn’t sent to any server
        automatically. “First-party” means set by {SITE_NAME}; “third-party” means set by another company whose
        service runs on our pages.
      </p>
    ),
  },
  {
    id: 'what-we-use',
    title: 'What this site uses',
    body: (
      <>
        <h3>Browser storage used by our tools (first-party)</h3>
        <p>These are only created when you use the feature, and they never leave your device:</p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Purpose</th><th scope="col">Kept until</th></tr>
            </thead>
            <tbody>
              <tr><td>toolzonex-color-mode</td><td>localStorage</td><td>Remembers light or dark theme</td><td>You clear it</td></tr>
              <tr><td>calcbharat_notepad</td><td>localStorage</td><td>Saves your Online Notepad text</td><td>You clear it</td></tr>
              <tr><td>ai-pomodoro-settings</td><td>localStorage</td><td>AI Pomodoro preferences</td><td>You clear it</td></tr>
              <tr><td>ai-pomodoro-db</td><td>IndexedDB</td><td>AI Pomodoro session history</td><td>You clear it</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          These are needed for the features you choose to use, so they don’t need consent. You can delete them at
          any time in your browser’s site-data settings.
        </p>

        <h3>Advertising cookies (third-party: Google)</h3>
        <p>
          Google AdSense and its partners set cookies to show ads, cap how often you see the same ad, measure
          performance and prevent fraud. Where permitted, they also personalise ads. Examples include{' '}
          <code>__gads</code> on this site and <code>IDE</code> on doubleclick.net. The full, current list is in{' '}
          <MuiLink href="https://policies.google.com/technologies/cookies">Google’s cookie policy</MuiLink>. In the
          EEA, UK and Switzerland, these cookies are only used as your consent choice allows.
        </p>

        <h3>Consent cookies (third-party: Google)</h3>
        <p>
          If Google’s consent message is shown to you, it saves your answer in cookies (such as <code>FCCDCF</code>)
          so it doesn’t ask again on every page.
        </p>

        <h3>Security (third-party: Cloudflare)</h3>
        <p>
          Our host, Cloudflare, may set a short-lived security cookie to tell people from bots. The contact form
          may also use Cloudflare Turnstile for this. These cookies are strictly necessary and aren’t used for
          advertising.
        </p>

        <h3>Analytics</h3>
        <p>
          Cloudflare Web Analytics counts visits without cookies and without tracking you across sites. We don’t
          use Google Analytics.
        </p>
      </>
    ),
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    body: (
      <>
        <p>
          <strong>EEA, UK and Switzerland:</strong> use the button below to reopen Google’s consent message and change
          or withdraw your choice at any time.
        </p>
        <CookieSettingsButton />
        <p><strong>Everyone:</strong></p>
        <ul>
          <li>
            Turn off personalised ads from Google in{' '}
            <MuiLink href="https://myadcenter.google.com/">Google My Ad Center</MuiLink>.
          </li>
          <li>
            Opt out of interest-based ads from many ad companies at{' '}
            <MuiLink href="https://optout.aboutads.info/">optout.aboutads.info</MuiLink> (US) or{' '}
            <MuiLink href="https://www.youronlinechoices.eu/">youronlinechoices.eu</MuiLink> (Europe).
          </li>
          <li>
            Block or delete cookies and site data in your browser settings. The tools still work without cookies,
            but the theme, notepad and Pomodoro features forget your data if you clear site storage.
          </li>
        </ul>
        <p>
          We don’t currently change behaviour in response to “Do Not Track” or Global Privacy Control signals. Use
          the options above instead.
        </p>
      </>
    ),
  },
  {
    id: 'changes-contact',
    title: 'Changes and contact',
    body: (
      <p>
        We’ll update this page, and the date at the top, before adding any new kind of cookie. Questions:{' '}
        <MuiLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</MuiLink>. See also our{' '}
        <MuiLink component={Link} href="/privacy-policy">Privacy Policy</MuiLink>.
      </p>
    ),
  },
];

const CookiePolicy = () => <LegalPage title="Cookie Policy" summary={summary} sections={sections} />;

export default CookiePolicy;
