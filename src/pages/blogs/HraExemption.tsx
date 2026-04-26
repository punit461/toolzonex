import { Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BlogShell from '../../components/BlogShell';

const HraExemption = () => (
  <BlogShell
    title="HRA Exemption: How to Calculate and Maximise It"
    description="House Rent Allowance (HRA) is one of the biggest tax-saving opportunities for salaried employees under the Old Regime. Learn the formula, examples, and tips."
    url="/blog/hra-exemption-calculation"
    date="April 2026"
  >
    <Typography variant="body1">
      For salaried employees living in rented accommodation, HRA exemption can save tens of thousands in taxes each year. However, the calculation involves three competing limits — and the least of the three wins.
    </Typography>

    <Typography variant="h2">Who Can Claim HRA?</Typography>
    <ul>
      <li>You must be a <strong>salaried employee</strong> receiving HRA as part of your salary structure.</li>
      <li>You must actually be <strong>living in a rented house</strong>.</li>
      <li>HRA is <strong>only available under the Old Regime</strong>. New Regime taxpayers cannot claim this exemption.</li>
      <li>If you own a house in the same city but rent another, you generally cannot claim both HRA and home loan benefits simultaneously.</li>
    </ul>

    <Typography variant="h2">The Three-Limit Formula</Typography>
    <Typography variant="body1">
      The exempt HRA is the <strong>minimum</strong> of these three amounts:
    </Typography>
    <ol>
      <li><strong>Actual HRA received</strong> from your employer</li>
      <li><strong>Rent paid minus 10% of Basic Salary</strong> (annual)</li>
      <li><strong>50% of Basic Salary</strong> if you live in a metro city (Mumbai, Delhi, Kolkata, Chennai), or <strong>40% of Basic Salary</strong> for non-metros</li>
    </ol>

    <Typography variant="h2">Worked Example</Typography>
    <Typography variant="body1">
      Suppose you live in Delhi (metro) and your salary structure is:
    </Typography>
    <ul>
      <li>Basic Salary: ₹5,00,000 per year</li>
      <li>HRA Received: ₹2,40,000 per year</li>
      <li>Rent Paid: ₹2,00,000 per year</li>
    </ul>
    <Typography variant="body1">Calculation:</Typography>
    <ul>
      <li>Limit 1: Actual HRA = ₹2,40,000</li>
      <li>Limit 2: Rent – 10% of Basic = ₹2,00,000 – ₹50,000 = ₹1,50,000</li>
      <li>Limit 3: 50% of Basic (metro) = ₹2,50,000</li>
      <li><strong>HRA Exemption = ₹1,50,000</strong> (the minimum)</li>
    </ul>
    <Typography variant="body1">
      The remaining ₹90,000 (₹2,40,000 – ₹1,50,000) is added to taxable salary.
    </Typography>

    <Typography variant="h2">Tips to Maximise HRA Exemption</Typography>
    <ul>
      <li><strong>Pay rent to parents:</strong> If you live with your parents, you can pay them rent and claim HRA. Your parents must declare this as income. This works well if their tax rate is lower than yours.</li>
      <li><strong>Negotiate a higher basic salary structure:</strong> A higher basic means limits 2 and 3 move in your favour.</li>
      <li><strong>Keep rent receipts:</strong> You need receipts for rent above ₹1 lakh per year. If annual rent exceeds ₹1 lakh, you also need the landlord's PAN.</li>
      <li><strong>Prefer metro classification:</strong> If you live in a metro, the 50% factor gives you more room than the 40% for non-metros.</li>
    </ul>

    <Typography variant="h2">HRA Without Salary (80GG)</Typography>
    <Typography variant="body1">
      If you are self-employed or your employer doesn't pay HRA, you can claim rent deduction under <strong>Section 80GG</strong> — but only under the Old Regime. The limit is the least of: rent paid minus 10% of total income, 25% of total income, or ₹5,000 per month. You must file Form 10BA to claim this.
    </Typography>

    <Typography variant="h2">New Regime Users: No HRA</Typography>
    <Typography variant="body1">
      If you opt for the New Regime, you cannot claim HRA exemption at all. If rent makes up a large part of your expenses and your employer pays significant HRA, this could tip the balance in favour of the Old Regime. Use our{' '}
      <RouterLink to="/finance/income-tax-calculator">Income Tax Calculator</RouterLink>{' '}
      to compare both regimes with your actual HRA figures.
    </Typography>
  </BlogShell>
);

export default HraExemption;
