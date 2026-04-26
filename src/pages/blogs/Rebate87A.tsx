import { Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BlogShell from '../../components/BlogShell';

const Rebate87A = () => (
  <BlogShell
    title="Section 87A Rebate: Pay Zero Tax up to ₹12.75 Lakh in FY 2025-26"
    description="Section 87A rebate can make your entire income tax liability zero. Here's exactly how it works under both regimes for FY 2025-26, with examples."
    url="/blog/section-87a-rebate-guide"
    date="April 2026"
  >
    <Typography variant="body1">
      Section 87A is one of the most powerful but misunderstood provisions in Indian income tax law. It allows eligible taxpayers to receive a rebate that can reduce their entire tax liability to zero. For FY 2025-26, the New Regime has made this even more generous.
    </Typography>

    <Typography variant="h2">What is Section 87A?</Typography>
    <Typography variant="body1">
      Section 87A provides a tax rebate to resident individuals whose total taxable income falls within a specified threshold. The rebate is applied <em>after</em> computing the slab tax but <em>before</em> adding the health and education cess. The rebate amount equals the lesser of the computed tax or the statutory cap.
    </Typography>

    <Typography variant="h2">How it Works in FY 2025-26</Typography>

    <Typography variant="h3">New Regime</Typography>
    <Typography variant="body1">
      If your taxable income is <strong>₹12,00,000 or less</strong>, the rebate equals your full tax liability — meaning you pay <strong>zero tax</strong>. The statutory rebate cap is ₹60,000.
    </Typography>
    <Typography variant="body1">
      Combined with the ₹75,000 standard deduction, a salaried employee with gross salary up to ₹12,75,000 pays zero tax.
    </Typography>

    <Typography variant="h3">Old Regime</Typography>
    <Typography variant="body1">
      If your taxable income is <strong>₹5,00,000 or less</strong>, the rebate equals the lesser of your computed tax or ₹12,500. This effectively makes income up to ₹5 lakh tax-free even under the Old Regime.
    </Typography>

    <Typography variant="h2">Worked Example — New Regime</Typography>
    <ul>
      <li>Gross Salary: ₹12,50,000</li>
      <li>Less Standard Deduction: ₹75,000</li>
      <li><strong>Taxable Income: ₹11,75,000</strong></li>
      <li>Slab Tax: ₹0 (0-4L) + ₹20,000 (4-8L @5%) + ₹37,500 (8-11.75L @10%) = ₹57,500</li>
      <li>Section 87A Rebate: ₹57,500 (full rebate, income ≤ ₹12L)</li>
      <li><strong>Tax after rebate: ₹0 + 4% cess = ₹0</strong></li>
    </ul>

    <Typography variant="h2">What Happens if Income is Just Above ₹12 Lakh?</Typography>
    <Typography variant="body1">
      If your taxable income is ₹12,00,001 — just ₹1 above the threshold — you lose the entire rebate. Your tax jumps from zero to approximately ₹60,000 + cess. This "cliff effect" means taxpayers near the ₹12 lakh threshold should carefully evaluate whether incremental income actually benefits them after tax.
    </Typography>
    <Typography variant="body1">
      The government has provided marginal relief in some cases, but it's always worth calculating precisely using our{' '}
      <RouterLink to="/finance/income-tax-calculator">Income Tax Calculator</RouterLink>.
    </Typography>

    <Typography variant="h2">Key Rules to Remember</Typography>
    <ul>
      <li>Only <strong>resident individuals</strong> can claim the rebate. NRIs are not eligible.</li>
      <li>The rebate is computed on <strong>normal slab income only</strong>. Special-rate income (like short-term capital gains) does not benefit from the rebate in most cases.</li>
      <li>The rebate is applied before cess — cess is charged on the tax after rebate.</li>
      <li>The income threshold is checked on <strong>total income (taxable)</strong>, not gross salary.</li>
    </ul>

    <Typography variant="h2">Old Regime vs New Regime Rebate</Typography>
    <ul>
      <li><strong>New Regime:</strong> Income ≤ ₹12L → rebate up to ₹60,000 → tax = zero</li>
      <li><strong>Old Regime:</strong> Income ≤ ₹5L → rebate up to ₹12,500 → tax = zero</li>
    </ul>

    <Typography variant="h2">Bottom Line</Typography>
    <Typography variant="body1">
      Section 87A effectively creates a zero-tax zone. Under the New Regime in FY 2025-26, this zone extends to ₹12.75 lakh gross salary for salaried individuals — making the New Regime the clear winner for most middle-income taxpayers who don't have large deductions.
    </Typography>
  </BlogShell>
);

export default Rebate87A;
