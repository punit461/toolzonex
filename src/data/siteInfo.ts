/**
 * Who runs ToolZoneX and how to reach them -- the one place legal pages, the
 * contact form, the About page and the footer read these details from.
 *
 * CONTACT_EMAIL is the site's dedicated mailbox (hosted on Microsoft 365, per
 * the domain's MX record). It replaced two personal Gmail addresses that had
 * been hard-coded in different places (/about vs /contact and contact-sheet.gs).
 *
 * Only details the owner has published are used here. A postal address is
 * deliberately absent: none has been published, and inventing one would be
 * worse than leaving it out.
 */

export const SITE_NAME = 'ToolZoneX';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const OPERATOR_NAME = 'Punit Bharadwaj';
export const OPERATOR_LOCATION = 'Bengaluru, Karnataka, India';
export const CONTACT_EMAIL = 'punit@toolzonex.com';

/** Governing law and the courts that hear disputes (Terms, section 17). */
export const JURISDICTION = 'Bengaluru, Karnataka, India';

/**
 * Date the current Privacy, Cookie, Refund and Terms pages took effect. Bump it
 * whenever one of them changes in substance, not for typo fixes.
 */
export const LEGAL_EFFECTIVE_DATE = '26 September 2026';

/** How long contact-form messages are kept after the last reply (Privacy §6). */
export const CONTACT_RETENTION = '12 months';

/** Promised response time for privacy and grievance requests. */
export const PRIVACY_RESPONSE_TIME = '30 days';
