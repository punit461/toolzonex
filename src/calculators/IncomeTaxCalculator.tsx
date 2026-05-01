'use client';

import { useState, useMemo } from 'react';
import {
  Box, Typography, TextField, ToggleButtonGroup, ToggleButton,
  InputAdornment, Accordion, AccordionSummary, AccordionDetails,
  Divider, Chip, Alert, Switch, FormControlLabel, Table,
  TableBody, TableRow, TableCell, Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalculatorShell from '../components/CalculatorShell';

// ── Tax Engine ─────────────────────────────────────────────────────

const NEW_SLABS = [[0,400000,0],[400000,800000,.05],[800000,1200000,.10],[1200000,1600000,.15],[1600000,2000000,.20],[2000000,2400000,.25],[2400000,Infinity,.30]];
const getOldSlabs = (age: string) =>
  age === 'super'  ? [[0,500000,0],[500000,1000000,.20],[1000000,Infinity,.30]] :
  age === 'senior' ? [[0,300000,0],[300000,500000,.05],[500000,1000000,.20],[1000000,Infinity,.30]] :
                     [[0,250000,0],[250000,500000,.05],[500000,1000000,.20],[1000000,Infinity,.30]];

function slabTax(income: number, slabs: number[][]) {
  let tax = 0;
  for (const [from, to, rate] of slabs) {
    if (income <= from) break;
    tax += (Math.min(income, to) - from) * rate;
  }
  return tax;
}

function calcHRA(basic: number, received: number, rent: number, metro: boolean) {
  if (!received || !rent || rent <= basic * 0.1) return 0;
  return Math.max(0, Math.min(received, rent - basic * 0.1, basic * (metro ? 0.5 : 0.4)));
}

function calcRebate(income: number, tax: number, regime: string) {
  if (regime === 'new') return income <= 1200000 ? tax : 0;
  return income <= 500000 ? Math.min(tax, 12500) : 0;
}

function calcSurcharge(income: number, tax: number) {
  if (income <= 5000000) return 0;
  if (income <= 10000000) return tax * 0.10;
  if (income <= 20000000) return tax * 0.15;
  if (income <= 50000000) return tax * 0.25;
  return tax * 0.37;
}

interface Result {
  grossIncome: number; stdDeduction: number; hraExemption: number;
  deductions: number; taxableIncome: number; rawTax: number;
  rebate: number; surcharge: number; cess: number;
  totalTax: number; netPayable: number; effectiveRate: number;
}

function compute(
  regime: string, age: string,
  grossSalary: number, otherIncome: number,
  basic: number, hraReceived: number, rentPaid: number, metro: boolean,
  d80C: number, d80CCD1B: number,
  d80DSelf: number, selfSenior: boolean,
  d80DParents: number, parentsSenior: boolean,
  homeLoanInt: number, eduLoanInt: number, tds: number
): Result {
  const stdDed = regime === 'new' ? 75000 : 50000;
  const hraExemption = regime === 'old' ? calcHRA(basic, hraReceived, rentPaid, metro) : 0;
  let deductions = 0;
  if (regime === 'old') {
    deductions =
      Math.min(d80C, 150000) +
      Math.min(d80CCD1B, 50000) +
      Math.min(d80DSelf, selfSenior ? 50000 : 25000) +
      Math.min(d80DParents, parentsSenior ? 50000 : 25000) +
      Math.min(homeLoanInt, 200000) +
      eduLoanInt;
  }
  const grossIncome = Math.max(0, grossSalary + otherIncome);
  const taxableIncome = Math.max(0, grossIncome - stdDed - hraExemption - deductions);
  const slabs = regime === 'new' ? NEW_SLABS : getOldSlabs(age);
  const rawTax = slabTax(taxableIncome, slabs);
  const rebate = calcRebate(taxableIncome, rawTax, regime);
  const taxAfterRebate = Math.max(0, rawTax - rebate);
  const surcharge = calcSurcharge(taxableIncome, taxAfterRebate);
  const cess = Math.round((taxAfterRebate + surcharge) * 0.04);
  const totalTax = Math.round(taxAfterRebate + surcharge + cess);
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
  return {
    grossIncome, stdDeduction: stdDed, hraExemption, deductions,
    taxableIncome, rawTax, rebate, surcharge, cess,
    totalTax, netPayable: Math.max(0, totalTax - tds), effectiveRate,
  };
}

// ── Helpers ────────────────────────────────────────────────────────
const fmt = (n: number) => '₹ ' + Math.round(n).toLocaleString('en-IN');
const pct = (n: number) => n.toFixed(2) + '%';

const Row = ({ label, value, bold, color }: { label: string; value: string; bold?: boolean; color?: string }) => (
  <TableRow>
    <TableCell sx={{ py: 0.8, color: 'text.secondary', fontSize: '0.85rem', border: 0 }}>{label}</TableCell>
    <TableCell align="right" sx={{ py: 0.8, fontWeight: bold ? 700 : 400, color: color || 'text.primary', fontSize: '0.85rem', border: 0 }}>{value}</TableCell>
  </TableRow>
);

function ResultPanel({ r, label, tds }: { r: Result; label: string; tds: number }) {
  return (
    <Box sx={{ p: 3, bgcolor: '#F9FAFB', borderRadius: 2, border: '1px solid #E5E5E5', height: '100%' }}>
      <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary' }}>{label}</Typography>
      <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main', my: 1 }}>{fmt(r.totalTax)}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Effective rate: {pct(r.effectiveRate)}</Typography>

      {r.netPayable > 0
        ? <Alert severity="warning" sx={{ mb: 2, py: 0.5 }}>Tax payable: {fmt(r.netPayable)}</Alert>
        : tds > 0 ? <Alert severity="success" sx={{ mb: 2, py: 0.5 }}>Refund expected: {fmt(Math.abs(r.totalTax - tds))}</Alert>
        : null
      }

      <Divider sx={{ mb: 1 }} />
      <Table size="small">
        <TableBody>
          <Row label="Gross Income" value={fmt(r.grossIncome)} />
          <Row label="Standard Deduction" value={`− ${fmt(r.stdDeduction)}`} />
          {r.hraExemption > 0 && <Row label="HRA Exemption" value={`− ${fmt(r.hraExemption)}`} />}
          {r.deductions > 0 && <Row label="Chapter VI-A Deductions" value={`− ${fmt(r.deductions)}`} />}
          <Row label="Taxable Income" value={fmt(r.taxableIncome)} bold />
          <Row label="Slab Tax" value={fmt(r.rawTax)} />
          {r.rebate > 0 && <Row label="Rebate u/s 87A" value={`− ${fmt(r.rebate)}`} color="#22c55e" />}
          {r.surcharge > 0 && <Row label="Surcharge" value={fmt(r.surcharge)} />}
          <Row label="Health & Education Cess (4%)" value={fmt(r.cess)} />
          <Row label="Total Tax Liability" value={fmt(r.totalTax)} bold />
          {tds > 0 && <Row label="TDS Already Deducted" value={`− ${fmt(tds)}`} color="#22c55e" />}
          <Row label={r.netPayable > 0 ? 'Tax Payable' : 'Refund'} value={fmt(Math.abs(r.totalTax - tds))} bold color={r.netPayable > 0 ? '#ef4444' : '#22c55e'} />
        </TableBody>
      </Table>
    </Box>
  );
}

// ── Component ──────────────────────────────────────────────────────
const IncomeTaxCalculator = () => {
  const [regime, setRegime] = useState<'new' | 'old' | 'compare'>('new');
  const [age, setAge] = useState<'below60' | 'senior' | 'super'>('below60');
  const [grossSalary, setGrossSalary] = useState(1000000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [basic, setBasic] = useState(400000);
  const [hraReceived, setHraReceived] = useState(200000);
  const [rentPaid, setRentPaid] = useState(180000);
  const [metro, setMetro] = useState(true);
  const [d80C, setD80C] = useState(150000);
  const [d80CCD1B, setD80CCD1B] = useState(50000);
  const [d80DSelf, setD80DSelf] = useState(25000);
  const [selfSenior, setSelfSenior] = useState(false);
  const [d80DParents, setD80DParents] = useState(25000);
  const [parentsSenior, setParentsSenior] = useState(false);
  const [homeLoanInt, setHomeLoanInt] = useState(0);
  const [eduLoanInt, setEduLoanInt] = useState(0);
  const [tds, setTds] = useState(0);

  const newResult = useMemo(() => compute('new', age, grossSalary, otherIncome, basic, hraReceived, rentPaid, metro, d80C, d80CCD1B, d80DSelf, selfSenior, d80DParents, parentsSenior, homeLoanInt, eduLoanInt, tds), [regime, age, grossSalary, otherIncome, basic, hraReceived, rentPaid, metro, d80C, d80CCD1B, d80DSelf, selfSenior, d80DParents, parentsSenior, homeLoanInt, eduLoanInt, tds]);
  const oldResult = useMemo(() => compute('old', age, grossSalary, otherIncome, basic, hraReceived, rentPaid, metro, d80C, d80CCD1B, d80DSelf, selfSenior, d80DParents, parentsSenior, homeLoanInt, eduLoanInt, tds), [age, grossSalary, otherIncome, basic, hraReceived, rentPaid, metro, d80C, d80CCD1B, d80DSelf, selfSenior, d80DParents, parentsSenior, homeLoanInt, eduLoanInt, tds]);

  const saving = oldResult.totalTax - newResult.totalTax;
  const betterRegime = saving > 0 ? 'New Regime' : saving < 0 ? 'Old Regime' : 'Both Equal';

  const numFld = (label: string, val: number, set: (n: number) => void, prefix = '₹') => (
    <TextField fullWidth size="small" label={label} type="number" value={val}
      onFocus={e => e.target.select()}
      onChange={e => set(Math.max(0, Number(e.target.value)))}
      slotProps={{ input: { startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : undefined } }}
      sx={{ mb: 2 }} />
  );

  const content = (
    <>
      <Typography variant="h2">How India's Income Tax is Calculated</Typography>
      <Typography variant="body1">India uses a slab-based tax system. Your income is taxed at progressively higher rates as it crosses each slab threshold. Only the income <em>within</em> each slab is taxed at that rate — not your entire income.</Typography>
      <Typography variant="h2">New Regime Slabs (FY 2025-26)</Typography>
      <Paper elevation={0} sx={{ border: '1px solid #E5E5E5', borderRadius: 2, overflow: 'hidden', my: 1 }}>
        <Table size="small">
          <TableBody>
            {[['Up to ₹4,00,000','Nil'],['₹4,00,001 – ₹8,00,000','5%'],['₹8,00,001 – ₹12,00,000','10%'],['₹12,00,001 – ₹16,00,000','15%'],['₹16,00,001 – ₹20,00,000','20%'],['₹20,00,001 – ₹24,00,000','25%'],['Above ₹24,00,000','30%']].map(([slab, rate]) => (
              <TableRow key={slab}><TableCell sx={{ fontSize: '0.85rem' }}>{slab}</TableCell><TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{rate}</TableCell></TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Typography variant="h2">Section 87A Rebate</Typography>
      <Typography variant="body1">Under the New Regime, if your taxable income is ₹12 lakh or less, a full rebate makes your tax liability zero — even though you technically fall in a taxable slab. This effectively means no tax up to ₹12.75 lakh (₹12L + ₹75K standard deduction).</Typography>
      <Typography variant="body1">Under the Old Regime, the rebate of up to ₹12,500 applies when income is ≤ ₹5 lakh.</Typography>
      <Typography variant="h2">Key Deductions (Old Regime Only)</Typography>
      <ul>
        <li><strong>Section 80C:</strong> PPF, ELSS, LIC, EPF, home loan principal, tuition fees — capped at ₹1.5 lakh</li>
        <li><strong>Section 80CCD(1B):</strong> Extra NPS contribution — up to ₹50,000 over the 80C limit</li>
        <li><strong>Section 80D:</strong> Health insurance — ₹25K self/family (₹50K if senior), ₹25K parents (₹50K if senior parents)</li>
        <li><strong>Section 24(b):</strong> Home loan interest — up to ₹2 lakh for self-occupied property</li>
        <li><strong>Section 80E:</strong> Education loan interest — no monetary cap, available 8 years</li>
        <li><strong>HRA Exemption:</strong> Least of actual HRA, rent paid minus 10% of basic, or 50%/40% of basic (metro/non-metro)</li>
      </ul>
    </>
  );

  const showNew = regime === 'new' || regime === 'compare';
  const showOld = regime === 'old' || regime === 'compare';

  return (
    <CalculatorShell
      title="Income Tax Calculator FY 2025-26"
      description="Calculate your income tax for FY 2025-26 (AY 2026-27) under New and Old Regime. Includes HRA, 80C, 80D, NPS, home loan, rebate 87A, surcharge, and cess."
      url="/finance/income-tax-calculator"
      content={content}
    >
      {/* Regime selector */}
      <Box sx={{ mb: 4 }}>
        <Typography gutterBottom sx={{ fontWeight: 600 }}>Tax Regime</Typography>
        <ToggleButtonGroup fullWidth exclusive value={regime} onChange={(_, v) => { if (v) setRegime(v); }} color="primary">
          <ToggleButton value="new" sx={{ fontWeight: 700 }}>New Regime</ToggleButton>
          <ToggleButton value="old" sx={{ fontWeight: 700 }}>Old Regime</ToggleButton>
          <ToggleButton value="compare" sx={{ fontWeight: 700 }}>Compare Both</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Age group */}
      <Box sx={{ mb: 4 }}>
        <Typography gutterBottom sx={{ fontWeight: 600 }}>Age Group (affects Old Regime slabs)</Typography>
        <ToggleButtonGroup fullWidth exclusive value={age} onChange={(_, v) => { if (v) setAge(v); }} color="primary" size="small">
          <ToggleButton value="below60">Below 60</ToggleButton>
          <ToggleButton value="senior">Senior (60–79)</ToggleButton>
          <ToggleButton value="super">Super Senior (80+)</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
        {/* Left: Inputs */}
        <Box>
          {/* Income */}
          <Accordion defaultExpanded disableGutters elevation={0} sx={{ border: '1px solid #E5E5E5', borderRadius: 2, mb: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>Income Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {numFld('Gross Salary / Annual CTC', grossSalary, setGrossSalary)}
              {numFld('Other Income (interest, rent, etc.)', otherIncome, setOtherIncome)}
            </AccordionDetails>
          </Accordion>

          {/* HRA — old regime only */}
          {(regime === 'old' || regime === 'compare') && (
            <Accordion disableGutters elevation={0} sx={{ border: '1px solid #E5E5E5', borderRadius: 2, mb: 2, '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 700 }}>HRA Exemption <Chip label="Old Regime only" size="small" sx={{ ml: 1, fontSize: '0.7rem' }} /></Typography>
              </AccordionSummary>
              <AccordionDetails>
                {numFld('Basic Salary (Annual)', basic, setBasic)}
                {numFld('HRA Received (Annual)', hraReceived, setHraReceived)}
                {numFld('Rent Paid (Annual)', rentPaid, setRentPaid)}
                <FormControlLabel control={<Switch checked={metro} onChange={e => setMetro(e.target.checked)} />} label="Metro city (Mumbai, Delhi, Kolkata, Chennai)" />
              </AccordionDetails>
            </Accordion>
          )}

          {/* Deductions — old regime only */}
          {(regime === 'old' || regime === 'compare') && (
            <Accordion disableGutters elevation={0} sx={{ border: '1px solid #E5E5E5', borderRadius: 2, mb: 2, '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 700 }}>Deductions <Chip label="Old Regime only" size="small" sx={{ ml: 1, fontSize: '0.7rem' }} /></Typography>
              </AccordionSummary>
              <AccordionDetails>
                {numFld('Section 80C (PPF, ELSS, LIC… max ₹1.5L)', d80C, setD80C)}
                {numFld('Section 80CCD(1B) – NPS (max ₹50K)', d80CCD1B, setD80CCD1B)}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Health Insurance – Self & Family</Typography>
                <FormControlLabel control={<Switch checked={selfSenior} onChange={e => setSelfSenior(e.target.checked)} />} label="Self is Senior Citizen (limit ₹50K)" sx={{ mb: 1 }} />
                {numFld(`80D – Self/Family (max ₹${selfSenior ? '50,000' : '25,000'})`, d80DSelf, setD80DSelf)}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Health Insurance – Parents</Typography>
                <FormControlLabel control={<Switch checked={parentsSenior} onChange={e => setParentsSenior(e.target.checked)} />} label="Parents are Senior Citizens (limit ₹50K)" sx={{ mb: 1 }} />
                {numFld(`80D – Parents (max ₹${parentsSenior ? '50,000' : '25,000'})`, d80DParents, setD80DParents)}
                {numFld('Home Loan Interest 24(b) (max ₹2L)', homeLoanInt, setHomeLoanInt)}
                {numFld('Education Loan Interest 80E (no cap)', eduLoanInt, setEduLoanInt)}
              </AccordionDetails>
            </Accordion>
          )}

          {/* TDS */}
          <Accordion disableGutters elevation={0} sx={{ border: '1px solid #E5E5E5', borderRadius: 2, mb: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>TDS / Advance Tax Paid</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {numFld('Total TDS Deducted (from Form 16 / AIS)', tds, setTds)}
              <Typography variant="caption" color="text.secondary">Your employer deducts TDS on salary. Check Form 16 or AIS on the income tax portal.</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Right: Results */}
        <Box>
          {regime === 'compare' && (
            <Alert severity={saving > 0 ? 'success' : saving < 0 ? 'info' : 'warning'} sx={{ mb: 2 }}>
              <strong>{betterRegime}</strong> saves you {fmt(Math.abs(saving))} in taxes this year.
            </Alert>
          )}
          <Box sx={{ display: 'grid', gridTemplateColumns: regime === 'compare' ? '1fr 1fr' : '1fr', gap: 2 }}>
            {showNew && <ResultPanel r={newResult} label="New Regime (FY 2025-26)" tds={tds} />}
            {showOld && <ResultPanel r={oldResult} label="Old Regime (FY 2025-26)" tds={tds} />}
          </Box>

          {regime === 'compare' && (
            <Box sx={{ mt: 3, p: 3, bgcolor: '#F0FDF4', borderRadius: 2, border: '1px solid #BBF7D0' }}>
              <Typography sx={{ fontWeight: 700 }} gutterBottom>Regime Recommendation</Typography>
              <Typography variant="body2" color="text.secondary">
                {saving > 0
                  ? `New Regime saves ₹${Math.abs(saving).toLocaleString('en-IN')}. Consider switching if your deductions under the Old Regime are less impactful.`
                  : saving < 0
                  ? `Old Regime saves ₹${Math.abs(saving).toLocaleString('en-IN')}. Your deductions (80C, HRA, 80D etc.) are working in your favour — stick with the Old Regime.`
                  : 'Both regimes give the same tax liability under your current inputs.'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </CalculatorShell>
  );
};

export default IncomeTaxCalculator;
