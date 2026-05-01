'use client';

import { Typography } from '@mui/material';
import RouterLink from 'next/link';
import BlogShell from '../../components/BlogShell';

const SsyBenefits = () => {
  return (
    <BlogShell
      title="Securing Your Daughter's Future with Sukanya Samriddhi Yojana (SSY)"
      description="A detailed guide to the SSY scheme, its benefits, interest rates, and why every parent should consider it."
      url="/blog/sukanya-samriddhi-yojana-benefits"
      date="May 2026"
    >
      <Typography variant="body1">
        Launched under the Government of India's "Beti Bachao, Beti Padhao" campaign, the Sukanya Samriddhi Yojana (SSY) is one of the most powerful tax-saving investment schemes available today. It is exclusively designed to help parents build a substantial corpus for their daughter's higher education and marriage.
      </Typography>

      <Typography variant="h2">Why SSY Beats Other Fixed-Income Investments</Typography>
      
      <Typography variant="h3">1. Unmatched Interest Rates</Typography>
      <Typography variant="body1">
        SSY consistently offers a higher interest rate compared to Public Provident Fund (PPF) and Bank Fixed Deposits. Currently offering 8.2% p.a., the power of compounding over a 21-year period creates massive wealth.
      </Typography>

      <Typography variant="h3">2. EEE Tax Benefit</Typography>
      <Typography variant="body1">
        Like the PPF, SSY falls under the coveted "Exempt-Exempt-Exempt" status. 
        - Your annual investments (up to ₹1.5 Lakhs) are tax-deductible under Section 80C.
        - The interest earned every year is completely tax-free.
        - The final maturity amount is completely tax-free.
      </Typography>

      <Typography variant="h2">Important Rules to Know</Typography>
      <ul>
        <li><strong>Age Limit:</strong> The account must be opened before the girl child turns 10 years old.</li>
        <li><strong>Investment Tenure:</strong> You only need to deposit money for 15 years. The account continues to earn interest without any new deposits until maturity at 21 years.</li>
        <li><strong>Partial Withdrawal:</strong> You can withdraw up to 50% of the balance once the girl reaches 18 years of age or passes the 10th standard, specifically for higher education expenses.</li>
      </ul>

      <Typography variant="h2">Visualizing the Growth</Typography>
      <Typography variant="body1">
        If you invest ₹1,00,000 every year for 15 years, your total investment is ₹15,00,000. By the time the account matures in 21 years, the corpus will grow to nearly ₹46 Lakhs! 
      </Typography>
      <Typography variant="body1">
        You can plug your own numbers into our <RouterLink href="/calculators/ssy-calculator">SSY Calculator</RouterLink> to see exactly how much you can save based on your budget.
      </Typography>
    </BlogShell>
  );
};

export default SsyBenefits;
