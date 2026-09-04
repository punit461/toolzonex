'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Level = 0 | 1 | 2 | 3;

const PAYMENT_OPTIONS: { value: Level; label: string }[] = [
  { value: 3, label: 'Always on time, no missed payments' },
  { value: 2, label: 'Usually on time, rare late payment' },
  { value: 1, label: 'Occasionally late (a few times a year)' },
  { value: 0, label: 'Frequently late or have missed payments' },
];

const UTILIZATION_OPTIONS: { value: Level; label: string }[] = [
  { value: 3, label: 'Under 10% of available credit used' },
  { value: 2, label: '10-30% of available credit used' },
  { value: 1, label: '30-50% of available credit used' },
  { value: 0, label: 'Over 50% of available credit used' },
];

const HISTORY_OPTIONS: { value: Level; label: string }[] = [
  { value: 3, label: 'Over 10 years' },
  { value: 2, label: '5-10 years' },
  { value: 1, label: '2-5 years' },
  { value: 0, label: 'Under 2 years' },
];

const MIX_OPTIONS: { value: Level; label: string }[] = [
  { value: 3, label: 'Good mix (cards, loans, mortgage, etc.)' },
  { value: 2, label: 'A couple of different credit types' },
  { value: 1, label: 'Just one type (e.g. only credit cards)' },
  { value: 0, label: 'Little to no credit history' },
];

const INQUIRY_OPTIONS: { value: Level; label: string }[] = [
  { value: 3, label: 'None in the last year' },
  { value: 2, label: '1-2 in the last year' },
  { value: 1, label: '3-5 in the last year' },
  { value: 0, label: '6 or more in the last year' },
];

const WEIGHTS = { payment: 0.35, utilization: 0.30, history: 0.15, mix: 0.10, inquiries: 0.10 };

function levelToRange(score01: number): { label: string; range: string } {
  if (score01 >= 0.9) return { label: 'Exceptional', range: '800-850' };
  if (score01 >= 0.72) return { label: 'Very Good', range: '740-799' };
  if (score01 >= 0.55) return { label: 'Good', range: '670-739' };
  if (score01 >= 0.35) return { label: 'Fair', range: '580-669' };
  return { label: 'Poor', range: '300-579' };
}

const CreditScoreEstimator = () => {
  const [payment, setPayment] = useState<Level>(3);
  const [utilization, setUtilization] = useState<Level>(2);
  const [history, setHistory] = useState<Level>(2);
  const [mix, setMix] = useState<Level>(2);
  const [inquiries, setInquiries] = useState<Level>(2);

  const result = useMemo(() => {
    const score01 =
      (payment / 3) * WEIGHTS.payment +
      (utilization / 3) * WEIGHTS.utilization +
      (history / 3) * WEIGHTS.history +
      (mix / 3) * WEIGHTS.mix +
      (inquiries / 3) * WEIGHTS.inquiries;
    return levelToRange(score01);
  }, [payment, utilization, history, mix, inquiries]);

  const content = (
    <>
      <Alert severity="warning" sx={{ mb: 2 }}>
        <strong>This is not your real credit score.</strong> Actual FICO and VantageScore scores are calculated
        by credit bureaus using your full, precise credit report — data this tool has no access to. This
        calculator gives only a rough educational estimate. Check your actual score through your bank, credit
        card issuer, or a credit bureau (Equifax, Experian, or TransUnion).
      </Alert>

      <Typography variant="h2">How This Estimate Is Calculated</Typography>
      <Typography variant="body1">
        Real credit scores are built from five weighted factor categories used in the standard FICO scoring
        model: payment history (~35%), amounts owed / credit utilization (~30%), length of credit history
        (~15%), credit mix (~10%), and new credit / recent inquiries (~10%). Answer a simple qualitative
        question for each factor, and this tool applies those same approximate weights to estimate which broad
        score range you likely fall into.
      </Typography>
      <Typography variant="body1">
        Because the inputs are qualitative categories rather than your exact credit report data, the result is
        always shown as a range, never a precise number — a real credit score depends on many more granular
        details than this simplified model can capture.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Someone who always pays on time, uses under 10% of their available credit, has over 10 years of credit
        history, holds a good mix of credit types, and has had no recent credit inquiries would land in the
        &quot;Exceptional&quot; estimated range (800-850). Someone with frequent late payments and high credit
        utilization would land in the &quot;Poor&quot; estimated range (300-579), regardless of the other
        factors.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough sense of your credit standing before checking your real score.</li>
          <li>Understanding which of the five FICO factors matters most.</li>
          <li>Seeing how paying down credit card balances might improve your standing.</li>
          <li>Learning what credit bureaus look at, in simple terms.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this my actual credit score?</Typography>
      <Typography variant="body1">
        No. This is an educational estimate based on the standard FICO factor weightings and simple qualitative
        answers. Your real score is calculated by credit bureaus from your full credit report and can differ
        significantly from this estimate. Always check an actual credit bureau (Equifax, Experian, TransUnion)
        or your bank/card issuer for your real score.
      </Typography>
      <Typography variant="h3">Why does this only give a range instead of an exact number?</Typography>
      <Typography variant="body1">
        Real credit scoring models use precise numeric data from your credit report — exact balances, exact
        account ages, exact inquiry dates — that this tool doesn&apos;t have access to. Simple category answers
        can only support a broad estimated range, not a precise score.
      </Typography>
      <Typography variant="h3">What&apos;s the single biggest factor I can control?</Typography>
      <Typography variant="body1">
        Payment history (~35%) and credit utilization (~30%) together make up about two-thirds of a typical FICO
        score — paying on time, every time, and keeping credit card balances low relative to your limits are
        generally the two most impactful habits.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/credit-score-estimator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Payment History</InputLabel>
            <Select label="Payment History" value={payment} onChange={(e) => setPayment(e.target.value as Level)}>
              {PAYMENT_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Credit Utilization</InputLabel>
            <Select label="Credit Utilization" value={utilization} onChange={(e) => setUtilization(e.target.value as Level)}>
              {UTILIZATION_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Length of Credit History</InputLabel>
            <Select label="Length of Credit History" value={history} onChange={(e) => setHistory(e.target.value as Level)}>
              {HISTORY_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Credit Mix</InputLabel>
            <Select label="Credit Mix" value={mix} onChange={(e) => setMix(e.target.value as Level)}>
              {MIX_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>New Credit / Recent Inquiries</InputLabel>
            <Select label="New Credit / Recent Inquiries" value={inquiries} onChange={(e) => setInquiries(e.target.value as Level)}>
              {INQUIRY_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>Estimated Score Range</Typography>
            <Typography variant="h3" fontWeight={800} color="primary.main">{result.range}</Typography>
            <Typography variant="h6" color="text.secondary" mt={1}>{result.label}</Typography>
            <Typography variant="body2" color="text.secondary" mt={3}>
              Rough educational estimate only — not your real credit score.
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CreditScoreEstimator;
