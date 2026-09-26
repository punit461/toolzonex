'use client';

import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import LegalPage, { type LegalSection } from '../legal/LegalPage';
import {
  SITE_NAME, SITE_URL, OPERATOR_NAME, OPERATOR_LOCATION, CONTACT_EMAIL, JURISDICTION, PRIVACY_RESPONSE_TIME,
} from '../../data/siteInfo';

const Mail = () => <MuiLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</MuiLink>;
const Internal = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <MuiLink component={Link} href={href}>{children}</MuiLink>
);

const summary = (
  <p style={{ margin: 0 }}>
    {SITE_NAME} gives you free tools to use at your own discretion. Results are estimates, not professional advice.
    Please use the tools lawfully, and only on files and data you have the right to use. The full terms are below.
  </p>
);

const sections: LegalSection[] = [
  {
    id: 'about-these-terms',
    title: 'About these terms',
    body: (
      <>
        <p>
          These terms apply to your use of {SITE_NAME} at {SITE_URL} (the “site”), which is run by {OPERATOR_NAME},{' '}
          {OPERATOR_LOCATION} (“we”, “us”). By using the site you agree to these terms. If you don’t agree, please
          don’t use the site.
        </p>
        <p>
          Our <Internal href="/privacy-policy">Privacy Policy</Internal>, <Internal href="/cookie-policy">Cookie Policy</Internal>{' '}
          and <Internal href="/refund-policy">Refund Policy</Internal> also apply.
        </p>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: 'Who can use the site',
    body: (
      <p>
        Anyone can use the tools. If you’re under 18, please use the site with the involvement of a parent or
        guardian, and ask them before sending us your details through the contact form.
      </p>
    ),
  },
  {
    id: 'the-service',
    title: 'The service',
    body: (
      <p>
        The tools are free and need no account. We may add, change or remove tools, or take the site offline, at any
        time and without notice. We don’t promise that any tool will stay available.
      </p>
    ),
  },
  {
    id: 'not-advice',
    title: 'Results are estimates, not professional advice',
    body: (
      <>
        <p>Everything on the site is general information, provided for convenience and education. In particular:</p>
        <ul>
          <li>
            <strong>Finance, tax, loans and investments:</strong> results depend on the inputs and assumptions you
            use. Tax rules, interest rates and government schemes change. Check with a qualified professional or the
            official source (for example the Income Tax Department or CBIC) before filing, investing or borrowing.
          </li>
          <li>
            <strong>Health, fitness, pregnancy and nutrition:</strong> results are general estimates. They are not a
            diagnosis or medical advice. Talk to a doctor before acting on them. In an emergency, contact your local
            emergency services.
          </li>
          <li>
            <strong>Construction, engineering and electrical estimates:</strong> have them checked by a qualified
            professional before buying materials or doing work.
          </li>
          <li>
            <strong>Legal, visa and official requirements</strong> (for example passport photo sizes): confirm them
            with the relevant authority.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'accuracy',
    title: 'Accuracy and availability',
    body: (
      <p>
        We work to keep formulas, rates and rules correct, but mistakes and outdated figures can happen. Data from
        outside services, such as exchange rates, may be delayed or wrong. Please check any result that matters
        before relying on it. If you spot an error, tell us at <Mail /> and we’ll fix it.
      </p>
    ),
  },
  {
    id: 'your-files',
    title: 'Your files and inputs',
    body: (
      <>
        <p>
          Most tools process your files and inputs in your browser. The few that send data to an outside service say
          so on the page and in the <Internal href="/privacy-policy#outside-services">Privacy Policy</Internal>. You
          keep all rights in your files, and we claim no rights in them.
        </p>
        <p>
          Only use a tool on files and content you own or are authorised to use. This includes tools that unlock PDFs
          or remove restrictions, watermarks or metadata. Using them to get around protection on someone else’s work
          may break copyright law.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    body: (
      <>
        <p>You agree not to use the site:</p>
        <ul>
          <li>to break any law, or to infringe anyone’s rights, including copyright, privacy and trademarks;</li>
          <li>
            to use generated sample data (fake names, addresses, phone numbers, companies, profiles, licence plates
            and the like) to impersonate a real person, deceive anyone, commit fraud, or get around identity or KYC
            checks. Generated data is for testing, design and entertainment only;
          </li>
          <li>
            to use prank screens (fake error, update or broken-screen displays) to frighten someone in a harmful way,
            or to trick anyone into paying money or handing over access. For example, fake tech-support scams. Keep
            pranks harmless, and reveal them;
          </li>
          <li>to send spam, malware or abusive messages through the contact form;</li>
          <li>
            to attack, overload, scrape at scale or otherwise interfere with the site, or to get around any security
            measure.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Our content and trademarks',
    body: (
      <>
        <p>
          The {SITE_NAME} name, logo and written content belong to {OPERATOR_NAME}. You may use the tools and share
          links to any page. Please don’t copy large parts of the site to republish elsewhere. The site’s source code
          is published at{' '}
          <MuiLink href="https://github.com/punit461/toolzonex">github.com/punit461/toolzonex</MuiLink>. Any rights to
          reuse that code are only those set out in the repository’s licence.
        </p>
        <p>
          Other product and company names mentioned on the site are trademarks of their owners. Examples include
          Windows and Microsoft, Google, Zoom, DVD, Powerball and YouTube. We use these names only to describe what a
          tool does or works with. {SITE_NAME} isn’t affiliated with, endorsed by or sponsored by any of these owners.
        </p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Ads, links and outside services',
    body: (
      <p>
        The site shows ads from Google and links to other websites, and some tools use outside services. We don’t
        control, and aren’t responsible for, third-party content, products or practices. Your dealings with
        advertisers and linked sites are between you and them.
      </p>
    ),
  },
  {
    id: 'disclaimer',
    title: 'No warranty',
    body: (
      <p>
        The site and its tools are provided “as is” and “as available”, free of charge. To the fullest extent the
        law allows, we give no warranties of any kind, express or implied. This includes warranties of accuracy,
        fitness for a particular purpose and uninterrupted or error-free operation.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <>
        <p>
          To the fullest extent the law allows, we aren’t liable for any indirect, incidental or consequential loss.
          Nor are we liable for loss of data, profit or opportunity, arising from your use of the site or reliance on
          any result. This applies even if we were told such loss was possible. You use the tools at your own risk.
          Please keep your own copies of any files you process.
        </p>
        <p>
          Nothing in these terms limits any liability, or any right you have as a consumer, that the law doesn’t
          allow to be limited.
        </p>
      </>
    ),
  },
  {
    id: 'indemnity',
    title: 'Responsibility for misuse',
    body: (
      <p>
        If you break these terms or misuse the site, and someone makes a claim against us because of it, you agree to
        cover the reasonable costs that claim causes us, to the extent the law allows.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these terms. The date at the top shows when they last changed. The version on this page when
        you use the site is the one that applies.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law and disputes',
    body: (
      <p>
        These terms are governed by the laws of India, and the courts at {JURISDICTION} have jurisdiction. If you’re
        a consumer living elsewhere, you keep any protections your local law gives you that can’t be waived. Before
        starting a formal dispute, please email <Mail /> so we can try to resolve it informally.
      </p>
    ),
  },
  {
    id: 'general',
    title: 'General',
    body: (
      <p>
        If any part of these terms can’t be enforced, the rest still applies. If we don’t enforce a term straight
        away, we haven’t given up the right to enforce it later.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact and grievances',
    body: (
      <p>
        {OPERATOR_NAME}, {OPERATOR_LOCATION}. Email: <Mail />. {OPERATOR_NAME} is also the grievance officer for this
        site, and will respond to complaints within {PRIVACY_RESPONSE_TIME}.
      </p>
    ),
  },
];

const TermsOfService = () => <LegalPage title="Terms and Conditions" summary={summary} sections={sections} />;

export default TermsOfService;
