import { Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BlogShell from '../../components/BlogShell';

const NewRegime2025 = () => (
  <BlogShell
    title="New Tax Regime FY 2025-26: Every Change Explained"
    description="Budget 2025 brought major changes to the New Tax Regime — new slabs, higher standard deduction, and a wider rebate. Here's everything that changed."
    url="/blog/new-tax-regime-fy-2025-26"
    date="April 2026"
  >
    <Typography variant="body1">
      The Union Budget 2025 made the New Tax Regime significantly more attractive. If you haven't revisited your tax planning for FY 2025-26, now is the time. Here is a complete breakdown of what changed and what it means for your wallet.
    </Typography>

    <Typography variant="h2">Completely Revised Slab Structure</Typography>
    <Typography variant="body1">
      The most dramatic change is the slab restructuring. The old "New Regime" slabs from FY 2023-24 have been replaced with a fresh set of seven slabs:
    </Typography>
    <ul>
      <li><strong>Up to ₹4,00,000</strong> — Nil</li>
      <li><strong>₹4,00,001 – ₹8,00,000</strong> — 5%</li>
      <li><strong>₹8,00,001 – ₹12,00,000</strong> — 10%</li>
      <li><strong>₹12,00,001 – ₹16,00,000</strong> — 15%</li>
      <li><strong>₹16,00,001 – ₹20,00,000</strong> — 20%</li>
      <li><strong>₹20,00,001 – ₹24,00,000</strong> — 25%</li>
      <li><strong>Above ₹24,00,000</strong> — 30%</li>
    </ul>
    <Typography variant="body1">
      The nil slab now extends to ₹4 lakh (up from ₹3 lakh), and every intermediate slab has been widened. For a person earning ₹15 lakh, this alone saves several thousand rupees compared to last year.
    </Typography>

    <Typography variant="h2">Standard Deduction Raised to ₹75,000</Typography>
    <Typography variant="body1">
      The standard deduction for salaried individuals and pensioners in the New Regime has been raised from ₹50,000 to <strong>₹75,000</strong>. This means the first ₹75,000 of your salary is now completely exempt before slabs are even applied.
    </Typography>
    <Typography variant="body1">
      Practical implication: If you earn exactly ₹12,75,000 in gross salary, your taxable income after the ₹75,000 deduction is ₹12,00,000 — which qualifies for the full Section 87A rebate. Your total tax liability becomes <strong>zero</strong>.
    </Typography>

    <Typography variant="h2">Section 87A Rebate Extended to ₹12 Lakh</Typography>
    <Typography variant="body1">
      Under the New Regime, the Section 87A rebate now covers all taxpayers with taxable income up to ₹12 lakh. The rebate amount equals the full computed tax, so anyone earning up to ₹12 lakh taxable income pays <strong>zero tax</strong>.
    </Typography>
    <Typography variant="body1">
      Combined with the ₹75,000 standard deduction, salaried taxpayers with gross CTC up to <strong>₹12,75,000</strong> have effectively zero income tax liability under the New Regime.
    </Typography>

    <Typography variant="h2">What Remains Restricted in the New Regime</Typography>
    <Typography variant="body1">
      The New Regime still does not allow most exemptions and deductions:
    </Typography>
    <ul>
      <li>HRA exemption under Section 10(13A)</li>
      <li>Section 80C (PPF, ELSS, LIC, home loan principal)</li>
      <li>Section 80D (health insurance)</li>
      <li>Section 80E (education loan interest)</li>
      <li>Section 80G (donations)</li>
      <li>Home loan interest deduction under Section 24(b) for self-occupied property</li>
    </ul>
    <Typography variant="body1">
      Employer's NPS contribution under Section 80CCD(2) remains deductible in both regimes.
    </Typography>

    <Typography variant="h2">Should You Switch to the New Regime?</Typography>
    <Typography variant="body1">
      The New Regime makes sense if your total Old Regime deductions (80C + HRA + 80D + home loan) are relatively modest. For most people earning below ₹15 lakh with limited investments, the New Regime will now result in lower or equal tax.
    </Typography>
    <Typography variant="body1">
      The best approach: calculate your liability under both regimes. Use our{' '}
      <RouterLink to="/finance/income-tax-calculator">Income Tax Calculator</RouterLink>{' '}
      to run the comparison instantly with your actual numbers.
    </Typography>

    <Typography variant="h2">New Regime is Now the Default</Typography>
    <Typography variant="body1">
      If you do not explicitly choose the Old Regime with your employer (via a declaration), the New Regime applies automatically. Employees who want the Old Regime must inform their employer before the end of the financial year.
    </Typography>
  </BlogShell>
);

export default NewRegime2025;
