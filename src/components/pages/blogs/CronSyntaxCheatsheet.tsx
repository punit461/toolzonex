'use client';

import { Typography, Box } from '@mui/material';
import RouterLink from 'next/link';
import BlogShell, { RelatedTool } from '../../BlogShell';
import AdSenseUnit from '../../AdSenseUnit';

const relatedTools: RelatedTool[] = [
  {
    label: 'Cron Expression Parser',
    path: '/developer-tools/cron-job-parser',
    description: 'Paste any cron expression and see exactly when it will run, in plain English.',
  },
];

const CronSyntaxCheatsheet = () => {
  return (
    <BlogShell
      title="Cron Syntax Cheatsheet: How to Read Any Crontab Schedule"
      description="Five fields, one order, and a handful of special characters — once the pattern clicks, you can read any cron expression at a glance. Here's the reference."
      url="/blog/cron-syntax-cheatsheet"
      date="August 2026"
      relatedTools={relatedTools}
      slug="cron-syntax-cheatsheet"
      category="tools"
    >
      <Typography variant="body1">
        Every cron schedule — whether it&apos;s a Linux crontab entry, a Kubernetes CronJob, or a GitHub Actions
        <code>schedule</code> trigger — follows the same five-field format. Once you know the order, reading any
        expression is just pattern matching.
      </Typography>

      <Typography variant="h2">The five fields, in order</Typography>
      <Box sx={{ typography: 'body1' }}>
        <pre style={{ background: 'rgba(127,127,127,0.1)', padding: '12px', borderRadius: 8, overflowX: 'auto' }}>
{`┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-6, Sunday=0)
│ │ │ │ │
* * * * *`}
        </pre>
      </Box>
      <Typography variant="body1">
        Every field is either a specific value, a wildcard, or one of a few special characters. Mixing those up
        — especially the last two fields — is the single most common source of "why didn&apos;t this run when I
        expected" bugs.
      </Typography>

      <Typography variant="h2">The special characters</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><code>*</code> — any value. &quot;Every minute&quot;, &quot;every hour&quot;, etc. depending on the field.</li>
          <li><code>,</code> — a list. <code>1,15</code> in the day-of-month field means &quot;the 1st and the 15th&quot;.</li>
          <li><code>-</code> — a range. <code>9-17</code> in the hour field means &quot;every hour from 9am to 5pm&quot;.</li>
          <li><code>/</code> — a step. <code>*/15</code> in the minute field means &quot;every 15 minutes&quot;.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common patterns, decoded</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><code>* * * * *</code> — every minute.</li>
          <li><code>0 * * * *</code> — the top of every hour (minute 0).</li>
          <li><code>0 0 * * *</code> — every day at midnight.</li>
          <li><code>0 9 * * 1-5</code> — 9am, Monday through Friday only — a typical "business hours" job.</li>
          <li><code>*/15 * * * *</code> — every 15 minutes, all day.</li>
          <li><code>0 0 1 * *</code> — midnight on the 1st of every month.</li>
          <li><code>0 0 * * 0</code> — midnight every Sunday.</li>
        </ul>
      </Box>

      <Typography variant="h2">The gotcha: day-of-month AND day-of-week together</Typography>
      <Typography variant="body1">
        When <em>both</em> the day-of-month and day-of-week fields are restricted (i.e. neither is <code>*</code>),
        most cron implementations run the job if <strong>either</strong> condition matches — not both. So
        <code>0 0 15 * 1</code> (&quot;midnight on the 15th, OR every Monday&quot;) will fire on both the 15th
        of the month and every Monday, which surprises almost everyone the first time they hit it. If you only
        want the 15th specifically, leave day-of-week as <code>*</code>.
      </Typography>

      <Typography variant="h2">A note on time zones</Typography>
      <Typography variant="body1">
        Cron expressions don&apos;t carry a time zone — they run in whatever time zone the executing system (or
        platform) is configured for. A server crontab typically runs in the machine&apos;s local time or UTC
        depending on its config; GitHub Actions schedules always run in UTC regardless of where you are. Always
        confirm the executing environment&apos;s time zone before trusting a schedule against wall-clock time,
        especially around daylight saving transitions.
      </Typography>

      <Typography variant="h2">Try it yourself</Typography>
      <Typography variant="body1">
        Paste any expression into the <RouterLink href="/developer-tools/cron-job-parser">Cron Expression
        Parser</RouterLink> to see it translated into plain English instantly — faster than working through the
        five fields by hand, and a good sanity check before you ship a schedule to production.
      </Typography>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </BlogShell>
  );
};

export default CronSyntaxCheatsheet;
