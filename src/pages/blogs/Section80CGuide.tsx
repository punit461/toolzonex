'use client';

import { Typography } from '@mui/material';
import RouterLink from 'next/link';
import BlogShell from '../../components/BlogShell';

const Section80CGuide = () => (
  <BlogShell
    title="Section 80C: ₹1.5 Lakh Deduction — Complete Investment Guide"
    description="Section 80C lets you save up to ₹46,800 in taxes through qualifying investments. Here's every instrument covered, rules, and which ones actually make sense."
    url="/blog/section-80c-investment-guide"
    date="April 2026"
  >
    <Typography variant="body1">
      Section 80C is the single most popular tax-saving provision in India. It allows you to deduct up to ₹1,50,000 from your taxable income by investing in or paying for a prescribed list of instruments and expenses. At a 30% tax rate with cess, this saves up to <strong>₹46,800 per year</strong>.
    </Typography>

    <Typography variant="h2">Important: Only Available in the Old Regime</Typography>
    <Typography variant="body1">
      Section 80C deductions are <strong>not available</strong> if you choose the New Tax Regime for FY 2025-26. This is a critical consideration when deciding your regime. If your 80C investments are already maxed out at ₹1.5 lakh, the Old Regime may save you more tax.
    </Typography>

    <Typography variant="h2">The Combined Cap Rule</Typography>
    <Typography variant="body1">
      Sections 80C, 80CCC (pension plan premiums), and 80CCD(1) (employee NPS contribution) share a <strong>combined cap of ₹1,50,000</strong>. You cannot claim ₹1.5L under 80C and another ₹1.5L under 80CCC separately — they all draw from the same bucket.
    </Typography>

    <Typography variant="h2">What Qualifies Under Section 80C?</Typography>

    <Typography variant="h3">Investments</Typography>
    <ul>
      <li><strong>Employee Provident Fund (EPF):</strong> Your contribution (not employer's) is 80C eligible. Most salaried employees already use most of their 80C limit here without realising it.</li>
      <li><strong>Public Provident Fund (PPF):</strong> 15-year lock-in, tax-free returns. The EEE (Exempt-Exempt-Exempt) status makes it the gold standard for conservative investors.</li>
      <li><strong>Equity Linked Savings Scheme (ELSS):</strong> Mutual funds with 3-year lock-in and market-linked returns. The shortest lock-in among 80C options and potentially highest returns.</li>
      <li><strong>National Savings Certificate (NSC):</strong> 5-year government bond. Interest is reinvested and also qualifies for 80C each year, though taxable at maturity.</li>
      <li><strong>Tax Saving Fixed Deposits:</strong> 5-year bank FDs. Returns are taxable as per your slab rate, making them less efficient at higher income levels.</li>
      <li><strong>Sukanya Samriddhi Yojana (SSY):</strong> For the girl child, EEE benefits, up to ₹1.5L/year. Use our <RouterLink href="/finance/ssy-calculator">SSY Calculator</RouterLink> to project returns.</li>
      <li><strong>Senior Citizens Savings Scheme (SCSS):</strong> For individuals aged 60+, quarterly interest, high safety.</li>
    </ul>

    <Typography variant="h3">Payments & Expenses</Typography>
    <ul>
      <li><strong>Home loan principal repayment:</strong> The principal portion of your EMI is 80C eligible.</li>
      <li><strong>Life insurance premiums:</strong> Premium for policies on self, spouse, and children. The premium must not exceed 10% of sum assured for policies issued after April 2012.</li>
      <li><strong>Children's tuition fees:</strong> Up to two children, for full-time education in India. Only the tuition fee portion qualifies — not transport, hostel, or admission fees.</li>
      <li><strong>Stamp duty and registration:</strong> For a new house purchase in the year of purchase only.</li>
    </ul>

    <Typography variant="h2">Section 80CCD(1B) — The Extra ₹50,000</Typography>
    <Typography variant="body1">
      If you invest in the <strong>National Pension System (NPS)</strong>, you can claim an <em>additional</em> deduction of up to ₹50,000 under Section 80CCD(1B). This is over and above the ₹1.5L 80C limit. At 30% tax rate + cess, this extra deduction saves approximately ₹15,600 more per year.
    </Typography>

    <Typography variant="h2">How to Decide Which 80C Options to Use</Typography>
    <ul>
      <li><strong>Check your EPF first:</strong> If your basic salary is ₹1.25L/month, your EPF contribution alone (12%) is ₹1.5L/year — your entire 80C limit is already used.</li>
      <li><strong>Want market returns? Choose ELSS.</strong> The 3-year lock-in is the shortest, and historical returns have beaten fixed-income options.</li>
      <li><strong>Want safety and long-term EEE? Choose PPF.</strong></li>
      <li><strong>Home loan? The principal repayment takes care of 80C automatically.</strong></li>
      <li><strong>Don't over-invest just for 80C.</strong> The lock-in and interest rates matter too. Tax saving is a benefit, not the primary investment objective.</li>
    </ul>

    <Typography variant="h2">80C + Old Regime vs New Regime Math</Typography>
    <Typography variant="body1">
      If you invest ₹1.5L in 80C, you save up to ₹46,800 in tax (30% slab + 4% cess). But the New Regime's lower rates may still result in lower total tax even without 80C, especially at incomes below ₹15 lakh. Always compare using our <RouterLink href="/finance/income-tax-calculator">Income Tax Calculator</RouterLink>.
    </Typography>
  </BlogShell>
);

export default Section80CGuide;
