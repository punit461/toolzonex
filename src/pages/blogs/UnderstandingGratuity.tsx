'use client';

import { Typography , Box} from '@mui/material';
import RouterLink from 'next/link';
import BlogShell, { RelatedTool } from '../../components/BlogShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const relatedTools: RelatedTool[] = [
  {
    label: 'Gratuity Calculator',
    path: '/finance/gratuity-calculator',
    description: 'Calculate your exact gratuity payout based on your basic salary and years of service.'
  },
];

const UnderstandingGratuity = () => {
  return (
    <BlogShell
      title="Understanding Gratuity: Eligibility, Calculation, and Tax Rules"
      description="Everything you need to know about Gratuity in India, from eligibility criteria to calculating your final payout."
      url="/blog/understanding-gratuity-india"
      date="May 2026"
      relatedTools={relatedTools}
    >
      <Typography variant="body1">
        Gratuity is a financial reward provided by an employer to an employee for rendering continuous service for a certain period. It acts as a significant financial buffer when you switch jobs or retire, but many employees don't fully understand how it works.
      </Typography>

      <Typography variant="h2">Who is Eligible?</Typography>
      <Typography variant="body1">
        According to the Payment of Gratuity Act, 1972, an employee becomes eligible for gratuity only after completing <strong>5 continuous years of service</strong> with the same organization. 
      </Typography>
      <Typography variant="body1">
        There is a common exception: If an employee passes away or becomes disabled due to disease or an accident, the 5-year continuous service rule is waived, and the gratuity is paid out to the nominee or employee.
      </Typography>

      <Typography variant="h2">How is Gratuity Calculated?</Typography>
      <Typography variant="body1">
        The calculation is straightforward but relies on two key inputs: your Last Drawn Salary (Basic + Dearness Allowance) and your Years of Service.
      </Typography>
      <Typography variant="body1" sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: 1, fontFamily: 'monospace' }}>
        Gratuity = (15 × Last Drawn Salary × Years of Service) / 26
      </Typography>
      <Typography variant="body1">
        Why 26? Because a month is considered to have 26 working days. Why 15? Because gratuity is paid for 15 days of wages for every completed year of service. Any service exceeding 6 months is rounded up to the next full year.
      </Typography>

      <Typography variant="h2">Tax Implications</Typography>
      <Typography variant="body1">
        The government has made gratuity highly tax-efficient. For government employees, the entire gratuity amount is tax-free. For non-government employees covered under the Act, gratuity is tax-free up to a maximum limit of ₹20 Lakhs in a lifetime. Any amount exceeding this threshold is added to your taxable income.
      </Typography>

      <Typography variant="h2">Check Your Eligibility and Payout</Typography>
      <Typography variant="body1">
        Instead of doing the math manually, you can use our <RouterLink href="/calculators/gratuity-calculator">Online Gratuity Calculator</RouterLink>. Just enter your basic salary, DA, and years of service, and it will instantly show your estimated payout and whether it crosses the tax-free limit.
      </Typography>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </BlogShell>
  );
};

export default UnderstandingGratuity;
