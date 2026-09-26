'use client';

import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import LegalPage, { type LegalSection } from '../legal/LegalPage';
import {
  SITE_NAME, SITE_URL, OPERATOR_NAME, OPERATOR_LOCATION, CONTACT_EMAIL,
  CONTACT_RETENTION, PRIVACY_RESPONSE_TIME,
} from '../../data/siteInfo';

/*
 * Every statement here was checked against the code on 2026-09-26. If you add a
 * tool that talks to an outside service, add it to "Tools that use outside
 * services"; if you switch on Google Analytics or Turnstile, update
 * "Analytics" / "When you contact us" and the Cookie Policy in the same change.
 */

const Mail = () => <MuiLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</MuiLink>;
const Internal = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <MuiLink component={Link} href={href}>{children}</MuiLink>
);

const summary = (
  <>
    <p style={{ marginTop: 0, fontWeight: 600 }}>The short version</p>
    <ul style={{ marginBottom: 0 }}>
      <li>There are no accounts, sign-ups or payments on {SITE_NAME}.</li>
      <li>
        Calculators and most file tools run in your browser. What you type, and the files you open, are not
        sent to us.
      </li>
      <li>
        A few tools need an outside service (exchange rates, IP lookup, PDF translation, font previews and
        AI model downloads). Each one is listed below with what it sends.
      </li>
      <li>
        We only receive personal data when you contact us. We use it to reply, and delete it after{' '}
        {CONTACT_RETENTION}.
      </li>
      <li>
        Google AdSense shows ads and uses cookies to do it. In the EEA, UK and Switzerland, Google asks for your
        consent first.
      </li>
      <li>We don’t sell your personal data.</li>
    </ul>
  </>
);

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          {SITE_NAME} ({SITE_URL}) is run by {OPERATOR_NAME}, an individual based in {OPERATOR_LOCATION}. In this
          policy, “we” and “us” mean {OPERATOR_NAME}. We decide how the personal data described here is used, so
          we are its data fiduciary under India’s Digital Personal Data Protection Act, 2023 (DPDP Act), and its
          controller under the EU and UK GDPR where those laws apply.
        </p>
        <p>
          Contact for anything in this policy, including privacy requests and grievances: <Mail />. {OPERATOR_NAME}{' '}
          handles these personally and also acts as grievance officer.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What we collect and why',
    body: (
      <>
        <h3>When you contact us</h3>
        <p>
          The <Internal href="/contact">contact form</Internal> asks for your email address and message (both
          required), and optionally your name and a subject. It adds the time you sent it. We use this only to
          read and reply to your message. The form sends it to a Google Apps Script we control. That script saves
          it in a Google Sheet and emails a copy to our Gmail inbox, both in our own Google account. If you email
          us directly instead, we receive whatever your email contains.
        </p>
        <p>
          The form may use Cloudflare Turnstile to block automated spam. Turnstile checks signals from your
          browser (including your IP address) to tell people from bots. It doesn’t use this to track you across
          sites.
        </p>

        <h3>When you use the tools</h3>
        <p>
          Calculators, converters, generators, text tools and most PDF and image tools run in your browser.
          Numbers you enter, text you paste and files you open are processed on your own device and are not sent
          to us. This includes health figures, salary and loan amounts, and any photos you use with the Face Shape
          Detector.
        </p>
        <p>A few tools save data in your browser so it’s still there next time. It stays on your device and we can’t see it:</p>
        <ul>
          <li>Your light or dark theme choice.</li>
          <li>Text you type into the Online Notepad.</li>
          <li>AI Pomodoro sessions, settings and focus history.</li>
        </ul>
        <p>
          AI Pomodoro can use your camera to measure focus, but only if you switch that feature on and allow
          camera access. The video is analysed in your browser. It is never recorded or sent anywhere.
        </p>

        <h3 id="outside-services">Tools that use outside services</h3>
        <p>
          These tools contact another company’s server. That service receives your IP address and normal browser
          details, and anything else listed below. It handles that data under its own privacy policy.
        </p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr><th scope="col">Tool</th><th scope="col">Service</th><th scope="col">What it receives</th></tr>
            </thead>
            <tbody>
              <tr><td>Currency converters</td><td>Frankfurter (api.frankfurter.dev)</td><td>The currencies you pick, not the amount</td></tr>
              <tr><td>What Is My IP</td><td>ipapi.co, or api.ipify.org as a fallback</td><td>Your IP address, looked up as soon as the page opens</td></tr>
              <tr><td>Translate PDF</td><td>MyMemory (api.mymemory.translated.net)</td><td>The text taken from your PDF. Don’t use it for confidential documents</td></tr>
              <tr><td>Font Library</td><td>Google Fonts</td><td>Requests for the fonts being previewed</td></tr>
              <tr><td>Face Shape Detector, AI Pomodoro</td><td>jsDelivr and Google Cloud Storage</td><td>Download requests for the AI model files. Your photo and camera video are not sent</td></tr>
              <tr><td>Some PDF tools</td><td>cdnjs (Cloudflare)</td><td>A download request for the PDF.js library. Your PDF is not sent</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Advertising</h3>
        <p>
          We show ads through Google AdSense. Google and its partners use cookies and similar identifiers to serve
          ads, limit how often you see them, measure them and detect fraud. Where allowed, they also personalise
          ads based on your visits to this and other websites. Google receives your IP address and browser
          details for this. See{' '}
          <MuiLink href="https://policies.google.com/technologies/partner-sites">
            how Google uses information from sites that use its services
          </MuiLink>{' '}
          and our <Internal href="/cookie-policy">Cookie Policy</Internal>. You can turn off personalised ads at any
          time in <MuiLink href="https://myadcenter.google.com/">Google My Ad Center</MuiLink>.
        </p>

        <h3>Analytics</h3>
        <p>
          We use Cloudflare Web Analytics to count page views. It doesn’t use cookies and doesn’t track you across
          websites. It records things like the page, the referring site, browser type and country. We don’t use
          Google Analytics. If that changes, we’ll update this policy first and ask for consent where the law
          requires it.
        </p>

        <h3>Hosting and security</h3>
        <p>
          The site is served through Cloudflare. Like any web host, Cloudflare processes your IP address and
          request details (such as the page requested and your browser) to deliver pages and protect the site
          from attacks and abuse.
        </p>
      </>
    ),
  },
  {
    id: 'legal-basis',
    title: 'Our legal basis',
    body: (
      <>
        <p>
          <strong>India (DPDP Act):</strong> we process contact-form data with your consent. You give it by ticking
          the box on the form, and you can withdraw it at any time (see <MuiLink href="#your-rights">Your rights</MuiLink>).
          Emails you send us directly are data you’ve given us voluntarily for a specific purpose: getting a reply.
        </p>
        <p>
          <strong>EEA and UK (GDPR):</strong> we reply to your messages on the basis of your consent and our
          legitimate interest in answering questions about the site. Advertising cookies rely on your consent,
          collected through Google’s consent message. Security processing by our host relies on our legitimate
          interest in keeping the site safe.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep data',
    body: (
      <ul>
        <li>
          Contact messages, and our replies, are deleted {CONTACT_RETENTION} after our last exchange with you.
          They’re deleted sooner if you ask, or if you withdraw consent, unless the law requires us to keep them.
        </li>
        <li>Data saved in your browser stays until you clear it. You control this, not us.</li>
        <li>Google, Cloudflare and the services in the table above keep data under their own policies.</li>
      </ul>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share data with',
    body: (
      <>
        <p>We don’t sell your personal data, and we don’t share contact messages with anyone for marketing. Data reaches:</p>
        <ul>
          <li>Google, which stores contact messages for us (in Gmail and Google Sheets) and runs AdSense.</li>
          <li>Cloudflare, our host and spam protection.</li>
          <li>The services named in <MuiLink href="#outside-services">Tools that use outside services</MuiLink>, only when you use those tools.</li>
          <li>Authorities, if the law requires it, or to protect our rights or someone’s safety.</li>
        </ul>
        <p>
          <strong>US state privacy laws:</strong> some US states treat advertising cookies as “sharing” personal
          information for targeted advertising. To opt out of personalised ads from Google, use Google My Ad
          Center. We don’t currently respond to “Do Not Track” or Global Privacy Control browser signals.
        </p>
      </>
    ),
  },
  {
    id: 'transfers',
    title: 'Where data is processed',
    body: (
      <p>
        We’re based in India, and our providers (Google, Cloudflare and the services listed above) run servers
        in many countries, including the United States. So your data may be processed outside your country. Where
        the GDPR applies, Google and Cloudflare use recognised transfer safeguards, such as the European
        Commission’s standard contractual clauses.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>Depending on where you live, you can ask us to:</p>
        <ul>
          <li>tell you what personal data we hold about you, how we use it, and who we’ve shared it with;</li>
          <li>correct, complete or update it;</li>
          <li>delete it;</li>
          <li>stop using it, or restrict how we use it (EEA/UK);</li>
          <li>give you a copy in a portable format (EEA/UK);</li>
          <li>withdraw your consent. This is as easy as giving it, and doesn’t affect what we did before;</li>
          <li>record a nominee who can exercise these rights if you die or become unable to (India).</li>
        </ul>
        <p>
          Email <Mail /> with the subject “Privacy request”, from the address you used to contact us so we can find
          your messages. We’ll reply within {PRIVACY_RESPONSE_TIME}. To change your advertising cookie choices, use
          the button in our <Internal href="/cookie-policy#your-choices">Cookie Policy</Internal>.
        </p>
      </>
    ),
  },
  {
    id: 'complaints',
    title: 'Complaints and grievances',
    body: (
      <>
        <p>
          If you’re unhappy with how we handle your data, email <Mail /> with the subject “Grievance” first. We’ll
          respond within {PRIVACY_RESPONSE_TIME}.
        </p>
        <p>If that doesn’t resolve it, you can complain to:</p>
        <ul>
          <li>the Data Protection Board of India, once you’ve used our grievance process (DPDP Act);</li>
          <li>your local data protection authority, if you’re in the EEA;</li>
          <li>
            the Information Commissioner’s Office (<MuiLink href="https://ico.org.uk/make-a-complaint/">ico.org.uk</MuiLink>),
            if you’re in the UK.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <>
        <p>
          {SITE_NAME} is a general-audience site. It isn’t aimed at children, and we don’t knowingly collect
          personal data from anyone under 18 without a parent’s or guardian’s consent. If you’re under 18, please
          ask a parent or guardian before using the contact form. If you think a child has sent us personal data,
          email us and we’ll delete it.
        </p>
        <p>
          The Alphabet Learning Tool is designed for a parent or teacher to use with a child, and collects nothing.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        The whole site uses HTTPS. Contact messages are stored only in our own Google account, and only{' '}
        {OPERATOR_NAME} can access them. No system is perfectly secure. If a breach affects your personal data, we’ll
        tell you and the relevant authorities as the law requires.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If we change how we handle personal data, we’ll update this page and the date at the top first. For
        significant changes, we’ll also post a notice on the site. If a change needs fresh consent, we’ll ask for it.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        {OPERATOR_NAME}, {OPERATOR_LOCATION}. Email: <Mail />. For other ways to reach us, see the{' '}
        <Internal href="/contact">contact page</Internal>.
      </p>
    ),
  },
];

const PrivacyPolicy = () => <LegalPage title="Privacy Policy" summary={summary} sections={sections} />;

export default PrivacyPolicy;
