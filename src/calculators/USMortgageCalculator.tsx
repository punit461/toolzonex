'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, InputAdornment, Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

// PMI is conventionally required below 20% down and cancels once the loan
// balance drops to 78% of the original home price (Homeowners Protection Act).
const PMI_DOWN_PAYMENT_THRESHOLD_PCT = 20;
const PMI_CANCEL_LTV_PCT = 78;

const formatUSD = (value: number) =>
  `$${Math.round(value).toLocaleString('en-US')}`;

const USMortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [termYears, setTermYears] = useState<15 | 30>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [propertyTaxPct, setPropertyTaxPct] = useState<number>(1.1);
  const [annualInsurance, setAnnualInsurance] = useState<number>(1500);
  const [pmiPct, setPmiPct] = useState<number>(0.5);
  const [hoaMonthly, setHoaMonthly] = useState<number>(0);

  const result = useMemo(() => {
    const downPaymentAmount = homePrice * (downPaymentPct / 100);
    const loanAmount = Math.max(0, homePrice - downPaymentAmount);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = termYears * 12;

    const monthlyPI = monthlyRate === 0
      ? loanAmount / numPayments
      : loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1);

    const monthlyPropertyTax = (homePrice * (propertyTaxPct / 100)) / 12;
    const monthlyInsurance = annualInsurance / 12;
    const pmiRequired = downPaymentPct < PMI_DOWN_PAYMENT_THRESHOLD_PCT;
    const monthlyPmiFull = pmiRequired ? (loanAmount * (pmiPct / 100)) / 12 : 0;

    const rows: { year: number; balance: number; cumulativeInterest: number }[] = [];
    let balance = loanAmount;
    let cumulativeInterest = 0;
    let totalPmiPaid = 0;
    let pmiCancelMonth: number | null = null;

    rows.push({ year: 0, balance, cumulativeInterest: 0 });

    for (let month = 1; month <= numPayments; month++) {
      const interestPortion = balance * monthlyRate;
      const principalPortion = monthlyPI - interestPortion;
      balance = Math.max(0, balance - principalPortion);
      cumulativeInterest += interestPortion;

      const ltv = (balance / homePrice) * 100;
      const pmiStillActive = pmiRequired && ltv > PMI_CANCEL_LTV_PCT;
      if (pmiStillActive) {
        totalPmiPaid += monthlyPmiFull;
      } else if (pmiRequired && pmiCancelMonth === null) {
        pmiCancelMonth = month;
      }

      if (month % 12 === 0) {
        rows.push({ year: month / 12, balance, cumulativeInterest });
      }
    }

    const currentMonthlyPmi = pmiRequired && pmiCancelMonth === null ? monthlyPmiFull : 0;
    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance + currentMonthlyPmi + hoaMonthly;

    return {
      loanAmount,
      downPaymentAmount,
      monthlyPI,
      monthlyPropertyTax,
      monthlyInsurance,
      currentMonthlyPmi,
      pmiRequired,
      pmiCancelYears: pmiCancelMonth ? Math.ceil(pmiCancelMonth / 12) : null,
      totalPmiPaid,
      totalMonthlyPayment,
      totalInterestPaid: cumulativeInterest,
      totalCost: loanAmount + cumulativeInterest,
      rows,
    };
  }, [homePrice, downPaymentPct, termYears, interestRate, propertyTaxPct, annualInsurance, pmiPct, hoaMonthly]);

  const content = (
    <>
      <Typography variant="h2">How this calculator works</Typography>
      <Typography variant="body1">
        Your monthly mortgage payment is more than just principal and interest — lenders bundle in property
        taxes, homeowners insurance, and (if your down payment is under 20%) private mortgage insurance (PMI)
        into an escrow payment. Together these are often called <strong>PITI</strong> (Principal, Interest,
        Taxes, Insurance). This calculator projects your full monthly PITI payment plus any HOA dues, and
        amortizes the loan month-by-month so PMI automatically drops off once your balance falls to 78% of the
        original home price, per the federal Homeowners Protection Act.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $400,000 home with 20% down ($80,000) financed over 30 years at 6.5% has a $320,000 loan. Principal
        and interest alone runs about $2,022/month; add typical property tax and insurance and the full payment
        lands closer to $2,500-2,700/month depending on your area&apos;s tax rate. Because the down payment is
        20%, no PMI applies.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating full monthly payment (PITI) before house-hunting, not just principal and interest.</li>
          <li>Comparing a 15-year vs. 30-year term to see the interest cost tradeoff.</li>
          <li>Checking whether a smaller down payment (with PMI) or waiting to save 20% makes more financial sense.</li>
          <li>Seeing how many years of PMI you&apos;d actually pay before it cancels automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between a 15-year and 30-year mortgage?</Typography>
      <Typography variant="body1">
        A 15-year term has a higher monthly payment but a lower interest rate and dramatically less total
        interest paid over the life of the loan, since the balance is paid down faster. A 30-year term lowers
        the monthly payment but roughly doubles the total interest paid at the same rate.
      </Typography>
      <Typography variant="h3">When does PMI go away?</Typography>
      <Typography variant="body1">
        By law, lenders must automatically cancel PMI once your loan balance reaches 78% of the original home
        value, assuming payments are current. You can also request cancellation earlier, once you reach 80%
        equity, if the loan is in good standing.
      </Typography>
      <Typography variant="h3">Does this include closing costs?</Typography>
      <Typography variant="body1">
        No — this calculator projects the recurring monthly payment (PITI + HOA) and amortization only.
        Closing costs (typically 2-5% of the loan amount) are a separate, one-time expense paid at signing.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="US Mortgage Calculator"
      description="Estimate your full monthly mortgage payment (PITI) with property tax, insurance, PMI, and a year-by-year amortization chart."
      url="/finance/mortgage-calculator"
      content={content}
      category="Finance"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Home Price</Typography>
            <TextField
              fullWidth type="number" value={homePrice} onFocus={(e) => e.target.select()}
              onChange={(e) => setHomePrice(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>
              Down Payment ({downPaymentPct}% = {formatUSD(result.downPaymentAmount)})
            </Typography>
            <Slider
              value={downPaymentPct} min={0} max={50} step={1}
              onChange={(_, value) => setDownPaymentPct(value as number)}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Loan Term</Typography>
            <ToggleButtonGroup
              exclusive value={termYears}
              onChange={(_, value) => value !== null && setTermYears(value)}
            >
              <ToggleButton value={15}>15 years</ToggleButton>
              <ToggleButton value={30}>30 years</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Interest Rate</Typography>
            <TextField
              fullWidth type="number" value={interestRate} onFocus={(e) => e.target.select()}
              onChange={(e) => setInterestRate(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <Box>
              <Typography gutterBottom>Property Tax Rate (annual)</Typography>
              <TextField
                fullWidth type="number" value={propertyTaxPct} onFocus={(e) => e.target.select()}
                onChange={(e) => setPropertyTaxPct(e.target.value === '' ? 0 : Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
              />
            </Box>
            <Box>
              <Typography gutterBottom>Home Insurance (annual)</Typography>
              <TextField
                fullWidth type="number" value={annualInsurance} onFocus={(e) => e.target.select()}
                onChange={(e) => setAnnualInsurance(e.target.value === '' ? 0 : Number(e.target.value))}
                slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <Box>
              <Typography gutterBottom>PMI Rate (if &lt;20% down)</Typography>
              <TextField
                fullWidth type="number" value={pmiPct} onFocus={(e) => e.target.select()}
                onChange={(e) => setPmiPct(e.target.value === '' ? 0 : Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
              />
            </Box>
            <Box>
              <Typography gutterBottom>HOA Dues (monthly)</Typography>
              <TextField
                fullWidth type="number" value={hoaMonthly} onFocus={(e) => e.target.select()}
                onChange={(e) => setHoaMonthly(e.target.value === '' ? 0 : Number(e.target.value))}
                slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              />
            </Box>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              Total Monthly Payment
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
              {formatUSD(result.totalMonthlyPayment)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Principal & Interest</Typography>
                <Typography variant="h6">{formatUSD(result.monthlyPI)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Property Tax</Typography>
                <Typography variant="h6">{formatUSD(result.monthlyPropertyTax)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Insurance</Typography>
                <Typography variant="h6">{formatUSD(result.monthlyInsurance)}</Typography>
              </Box>
              {result.pmiRequired && (
                <Box>
                  <Typography variant="body2" color="text.secondary">PMI</Typography>
                  <Typography variant="h6">{formatUSD(result.currentMonthlyPmi)}</Typography>
                </Box>
              )}
              {hoaMonthly > 0 && (
                <Box>
                  <Typography variant="body2" color="text.secondary">HOA</Typography>
                  <Typography variant="h6">{formatUSD(hoaMonthly)}</Typography>
                </Box>
              )}
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Loan amount: {formatUSD(result.loanAmount)} · Total interest over {termYears} years: {formatUSD(result.totalInterestPaid)}
              {result.pmiRequired && result.pmiCancelYears && ` · PMI cancels after ~${result.pmiCancelYears} years`}
            </Typography>

            <Box sx={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.rows} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a56db" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#1a56db" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <RechartsTooltip formatter={(value: number) => formatUSD(value)} labelFormatter={(year) => `Year ${year}`} />
                  <Area type="monotone" dataKey="balance" stroke="#1a56db" fill="url(#balanceGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default USMortgageCalculator;
