/**
 * Shared author identity for schema.org Article markup and visible bylines.
 * Punit Bharadwaj is ToolZoneX's sole builder and content author (see /about) —
 * attributing Article schema to a real named Person instead of just the
 * Organization strengthens E-E-A-T signals, particularly for YMYL-adjacent
 * finance/health content. Links reused here are the same ones already public
 * on the site's own /about page, nothing new.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const AUTHOR_NAME = 'Punit Bharadwaj';

export const AUTHOR_PERSON_SCHEMA = {
  '@type': 'Person',
  name: AUTHOR_NAME,
  jobTitle: 'AI/ML Engineer',
  url: `${SITE_URL}/about`,
  sameAs: [
    'https://punit461.github.io/',
    'https://github.com/punit461',
    'https://www.linkedin.com/in/punit461bhardwaj/',
  ],
};

export const ORGANIZATION_SAME_AS = [
  'https://github.com/punit461',
  'https://www.linkedin.com/in/punit461bhardwaj/',
];
