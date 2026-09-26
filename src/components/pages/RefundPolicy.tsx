'use client';

import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import LegalPage, { type LegalSection } from '../legal/LegalPage';
import { SITE_NAME, CONTACT_EMAIL } from '../../data/siteInfo';

const Mail = () => <MuiLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</MuiLink>;

const summary = (
  <p style={{ margin: 0 }}>
    Every tool on {SITE_NAME} is free. There are no paid plans, subscriptions, purchases or in-app payments, so
    there is never anything to refund.
  </p>
);

const sections: LegalSection[] = [
  {
    id: 'no-payments',
    title: 'We don’t take payments',
    body: (
      <p>
        {SITE_NAME} doesn’t sell products or services and doesn’t accept payments or donations. You never need to
        enter card or bank details to use any tool. If a page or a person claiming to be {SITE_NAME} asks you to
        pay, it isn’t us.
      </p>
    ),
  },
  {
    id: 'unexpected-charges',
    title: 'If you see a charge mentioning ToolZoneX',
    body: (
      <p>
        We can’t have charged you. Contact your bank or card provider to dispute it, and please let us know at{' '}
        <Mail /> so we can warn other visitors.
      </p>
    ),
  },
  {
    id: 'advertisers',
    title: 'Purchases from advertisers',
    body: (
      <p>
        Ads on this site are supplied by Google. If you buy something after clicking an ad, the sale is between you
        and that advertiser, and their refund and return policy applies. We don’t receive your payment details and
        can’t process refunds for advertisers.
      </p>
    ),
  },
  {
    id: 'future-paid-features',
    title: 'If we ever add paid features',
    body: (
      <p>
        We would publish clear pricing and refund terms on this page before charging anyone. Those terms would only
        apply to purchases made after they’re published.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions: <Mail />. See also our <MuiLink component={Link} href="/terms-of-service">Terms and Conditions</MuiLink>.
      </p>
    ),
  },
];

const RefundPolicy = () => <LegalPage title="Refund Policy" summary={summary} sections={sections} />;

export default RefundPolicy;
