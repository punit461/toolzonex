'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const MarkupCalculatorContent = () => {
  const [cost, setCost] = useState('50');
  const [markup, setMarkup] = useState('40');

  const result = useMemo(() => {
    const c = parseFloat(cost) || 0;
    const m = parseFloat(markup) || 0;

    const sellingPrice = c * (1 + m / 100);
    const profit = sellingPrice - c;
    const marginPct = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

    return { sellingPrice, profit, marginPct };
  }, [cost, markup]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Cost Price"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Desired Markup"
          type="number"
          value={markup}
          onChange={(e) => setMarkup(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            Selling Price = Cost × (1 + Markup %)
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Selling Price</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.sellingPrice)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Profit</Typography>
          <Typography fontWeight={600} color="success.main">{money(result.profit)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Equivalent Profit Margin</Typography>
          <Typography fontWeight={600}>{result.marginPct.toFixed(2)}%</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const MarkupCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Markup Calculator Work?</Typography>
      <Typography variant="body1">
        Enter the cost price of a product and the markup percentage you want to apply. The calculator
        multiplies cost by (1 + markup ÷ 100) to get the selling price, and the difference between
        selling price and cost is your profit.
      </Typography>

      <Typography variant="h2">Markup vs. Margin: The Key Difference</Typography>
      <Typography variant="body1">
        Markup and margin are both expressed as percentages, but they measure different things, and
        confusing the two is one of the most common pricing mistakes. Markup is profit expressed as a
        percentage of the cost price. Margin is profit expressed as a percentage of the selling price.
        A 40% markup on a $50 cost gives a $70 selling price and $20 profit — but that same $20 profit
        on a $70 selling price is only a 28.6% margin, not 40%. The two numbers only converge at 0%; the
        higher the percentage, the further apart markup and margin become.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A product costing $50 with a 40% markup sells for $50 × 1.40 = $70, generating $20 of profit.
        That $20 profit represents a 28.6% margin on the $70 selling price — a smaller number than the
        40% markup, even though they describe the exact same transaction.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting retail prices from wholesale or supplier cost.</li>
          <li>Standardizing pricing rules across a product catalog using a consistent markup percentage.</li>
          <li>Converting a target markup into the resulting margin to compare against industry margin benchmarks.</li>
          <li>Quickly quoting a sale price when only the cost and a desired markup are known.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Should I price based on markup or margin?</Typography>
      <Typography variant="body1">
        Either works, but be clear about which one you&apos;re using — many retailers think in markup
        (easy to calculate from cost) while financial statements and profitability benchmarks are
        usually expressed as margin (percentage of revenue). This calculator shows both so you can see
        the relationship for any given pricing decision.
      </Typography>
      <Typography variant="h3">Why is margin always lower than markup for the same price?</Typography>
      <Typography variant="body1">
        Because margin divides profit by the larger selling price, while markup divides the same profit
        by the smaller cost price — dividing by a bigger number always produces a smaller percentage.
      </Typography>
      <Typography variant="h3">What markup should I use?</Typography>
      <Typography variant="body1">
        It varies widely by industry — retail markups commonly range from 20% to 100%+ depending on the
        product category, competition, and what customers are willing to pay. There&apos;s no universal
        correct number; it should cover your costs, desired margin, and market positioning.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/markup-calculator" content={content}>
      <MarkupCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MarkupCalculator;
