'use client';

import { Typography, Box, Paper } from '@mui/material';
import RouterLink from 'next/link';
import BlogShell, { RelatedTool } from '../../BlogShell';
import AdSenseUnit from '../../AdSenseUnit';

const relatedTools: RelatedTool[] = [
  {
    label: 'Income Tax Calculator',
    path: '/finance/income-tax-calculator',
    description: 'Compare your exact tax liability under both regimes for your income and deductions.'
  },
];

const relatedArticles = [
  { slug: 'new-tax-regime-fy-2025-26', title: "What's New in the Tax Regime for FY 2025-26", description: 'The specific slab and rebate changes that took effect this year.' },
  { slug: 'section-87a-rebate-guide', title: 'Section 87A Rebate: How It Makes Income Tax-Free', description: 'How the rebate pushes the effective tax-free threshold to ₹12 lakh under the new regime.' },
  { slug: 'hra-exemption-calculation', title: 'HRA Exemption Calculation Explained', description: 'One of the old regime’s biggest deductions for salaried tenants — only available if you stay with the old regime.' },
];

const tableSx = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  my: 2,
  '& th, & td': { border: '1px solid', borderColor: 'divider', px: 2, py: 1, textAlign: 'left', fontSize: '1rem' },
  '& th': { bgcolor: 'action.hover', fontWeight: 700 },
};

const OldVsNewTax = () => {
  return (
    <BlogShell
      title="Old vs. New Tax Regime: Which Should You Choose? (FY 2025-26)"
      description="A comprehensive guide to the Old and New tax regimes in India for FY 2025-26, with full slab-rate tables, a quick-verdict heuristic, and how to pick the right one for you."
      url="/blog/old-vs-new-tax-regime"
      date="September 2026"
      relatedTools={relatedTools}
      relatedArticles={relatedArticles}
      slug="old-vs-new-tax-regime"
      category="finance"
    >
      <Typography variant="body1">
        Filing income tax returns in India comes with a major decision: the Old Tax Regime or the New Tax Regime? Since FY 2025-26, the New Regime is the default and has become significantly more attractive after the Budget 2025 changes &mdash; but the Old Regime can still win for taxpayers with large deductions. Here is the full slab-by-slab comparison and how to decide.
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, my: 3, bgcolor: 'primary.50', borderColor: 'primary.main' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Quick verdict</Typography>
        <Typography variant="body1" sx={{ mb: 0 }}>
          If your total deductions (80C, 80D, HRA, home loan interest, NPS, etc.) add up to <strong>less than about ₹3.75-4.25 lakh</strong> a year, the New Regime almost always wins. Above that, run the numbers &mdash; the Old Regime can pull ahead once deductions get large enough to offset its higher slab rates.
        </Typography>
      </Paper>

      <Typography variant="h2">New Tax Regime Slabs (FY 2025-26)</Typography>
      <Typography variant="body1">
        The New Regime offers lower rates across the board but forgoes almost every deduction except the standard deduction. Budget 2025 raised the basic exemption limit to ₹4 lakh and widened the slabs:
      </Typography>
      <Box component="table" sx={tableSx}>
        <thead>
          <tr><th>Income Slab</th><th>Tax Rate</th></tr>
        </thead>
        <tbody>
          <tr><td>₹0 &ndash; ₹4,00,000</td><td>Nil</td></tr>
          <tr><td>₹4,00,001 &ndash; ₹8,00,000</td><td>5%</td></tr>
          <tr><td>₹8,00,001 &ndash; ₹12,00,000</td><td>10%</td></tr>
          <tr><td>₹12,00,001 &ndash; ₹16,00,000</td><td>15%</td></tr>
          <tr><td>₹16,00,001 &ndash; ₹20,00,000</td><td>20%</td></tr>
          <tr><td>₹20,00,001 &ndash; ₹24,00,000</td><td>25%</td></tr>
          <tr><td>Above ₹24,00,000</td><td>30%</td></tr>
        </tbody>
      </Box>
      <Typography variant="body1">
        Standard deduction: <strong>₹75,000</strong> for salaried individuals. Thanks to the Section 87A rebate (up to ₹60,000), taxable income up to <strong>₹12 lakh is effectively tax-free</strong> under this regime &mdash; ₹12.75 lakh gross salary after the standard deduction.
      </Typography>

      <Typography variant="h2">Old Tax Regime Slabs (FY 2025-26)</Typography>
      <Typography variant="body1">
        The Old Regime keeps its long-standing, narrower slabs but lets you claim close to 70 deductions and exemptions on top of them:
      </Typography>
      <Box component="table" sx={tableSx}>
        <thead>
          <tr><th>Income Slab</th><th>Tax Rate</th></tr>
        </thead>
        <tbody>
          <tr><td>₹0 &ndash; ₹2,50,000</td><td>Nil</td></tr>
          <tr><td>₹2,50,001 &ndash; ₹5,00,000</td><td>5%</td></tr>
          <tr><td>₹5,00,001 &ndash; ₹10,00,000</td><td>20%</td></tr>
          <tr><td>Above ₹10,00,000</td><td>30%</td></tr>
        </tbody>
      </Box>
      <Typography variant="body1">
        Standard deduction: <strong>₹50,000</strong>. The Section 87A rebate here tops out at ₹12,500, making income up to <strong>₹5 lakh effectively tax-free</strong> &mdash; far lower than the New Regime&apos;s ₹12 lakh threshold. The trade-off is the deductions available on top:
      </Typography>
      <ul>
        <li><strong>Section 80C:</strong> Up to ₹1.5 lakh for PPF, ELSS, EPF, life insurance premiums, and more.</li>
        <li><strong>Section 80D:</strong> Health insurance premiums (₹25,000-₹1 lakh depending on age).</li>
        <li><strong>HRA:</strong> House Rent Allowance exemption for salaried tenants.</li>
        <li><strong>Home Loan Interest:</strong> Up to ₹2 lakh under Section 24(b) for a self-occupied property.</li>
        <li><strong>NPS (80CCD):</strong> An additional ₹50,000 over and above the 80C limit.</li>
      </ul>

      <Typography variant="h2">Pros and Cons</Typography>
      <Typography variant="h3">New Regime</Typography>
      <ul>
        <li><strong>Pro:</strong> Lower rates, ₹12 lakh effective tax-free threshold, simpler filing (no proof-of-investment paperwork).</li>
        <li><strong>Pro:</strong> Better cash flow &mdash; no pressure to lock money into 80C-eligible instruments.</li>
        <li><strong>Con:</strong> Forfeits HRA, home loan interest, 80C/80D, and most other deductions.</li>
      </ul>
      <Typography variant="h3">Old Regime</Typography>
      <ul>
        <li><strong>Pro:</strong> Rewards disciplined savers &mdash; PPF, ELSS, insurance, and a home loan can add up to well over ₹3.5-4 lakh in deductions.</li>
        <li><strong>Pro:</strong> HRA exemption alone can be substantial for tenants in metro cities.</li>
        <li><strong>Con:</strong> Higher slab rates and a much lower ₹5 lakh tax-free threshold if you don&apos;t have enough deductions to offset it.</li>
      </ul>

      <Typography variant="h2">How to Make the Choice</Typography>
      <Typography variant="body1">
        Add up your realistic annual deductions: 80C investments, health insurance, HRA, home loan interest, and NPS. If that total is comfortably above ₹4 lakh, model both regimes before assuming the New Regime wins by default &mdash; it no longer always does, especially for higher earners with a home loan and full 80C utilization.
      </Typography>

      <Typography variant="h3">Run the Numbers</Typography>
      <Typography variant="body1">
        The only reliable way to decide is to calculate your exact tax liability under both regimes for your real numbers. Use our free <RouterLink href="/finance/income-tax-calculator">Income Tax Calculator</RouterLink> &mdash; enter your salary and deductions once and it shows both regimes side by side.
      </Typography>

      <Typography variant="h2">Conclusion</Typography>
      <Typography variant="body1">
        There is no permanent one-size-fits-all answer &mdash; and the rules change most years, as FY 2025-26 shows. Re-run the comparison at the start of every financial year, especially if your deductions, salary, or the slabs themselves have changed, and always confirm your final numbers before declaring your regime to your employer.
      </Typography>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </BlogShell>
  );
};

export default OldVsNewTax;
