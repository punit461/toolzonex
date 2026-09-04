'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, IconButton, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

interface ChannelRow {
  id: number;
  name: string;
  spend: string;
  leads: string;
}

const DEFAULT_ROWS: ChannelRow[] = [
  { id: 1, name: 'Google Ads', spend: '2000', leads: '80' },
  { id: 2, name: 'Facebook Ads', spend: '1200', leads: '60' },
];

const CostPerLeadCalculator = () => {
  const [totalSpend, setTotalSpend] = useState('3200');
  const [totalLeads, setTotalLeads] = useState('140');
  const [rows, setRows] = useState<ChannelRow[]>(DEFAULT_ROWS);
  const [nextId, setNextId] = useState(DEFAULT_ROWS.length + 1);

  const addRow = () => {
    setRows([...rows, { id: nextId, name: 'New Channel', spend: '0', leads: '0' }]);
    setNextId(nextId + 1);
  };

  const removeRow = (id: number) => setRows(rows.filter((r) => r.id !== id));

  const updateRow = (id: number, field: 'name' | 'spend' | 'leads', value: string) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const overallCpl = useMemo(() => {
    const spend = parseFloat(totalSpend) || 0;
    const leads = parseFloat(totalLeads) || 0;
    return leads > 0 ? spend / leads : 0;
  }, [totalSpend, totalLeads]);

  const channelBreakdown = useMemo(() => {
    return rows.map((r) => {
      const spend = parseFloat(r.spend) || 0;
      const leads = parseFloat(r.leads) || 0;
      return { ...r, spend, leads, cpl: leads > 0 ? spend / leads : 0 };
    });
  }, [rows]);

  const content = (
    <>
      <Typography variant="h2">How Cost Per Lead (CPL) Is Calculated</Typography>
      <Typography variant="body1">
        Cost per lead measures how much you spend, on average, to generate a single lead from your marketing or
        advertising efforts. It sits early in the marketing funnel — spend generates leads, leads convert into
        customers — making CPL a useful checkpoint before conversion rate or customer acquisition cost come
        into play. This calculator computes an overall CPL from total spend and leads, and optionally breaks
        it down by channel if you add rows for each marketing channel&apos;s spend and leads.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Cost Per Lead = Total Spend ÷ Number of Leads
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A campaign spending $3,200 total that generates 140 leads has an overall cost per lead of about $22.86.
        Breaking it down, Google Ads spending $2,000 for 80 leads costs $25.00 per lead, while Facebook Ads
        spending $1,200 for 60 leads costs $20.00 per lead — showing Facebook is currently the more efficient
        channel for lead generation.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing lead generation efficiency across ad platforms or marketing channels.</li>
          <li>Deciding where to shift budget based on which channel produces the cheapest leads.</li>
          <li>Setting a target CPL benchmark before launching a new campaign.</li>
          <li>Tracking CPL trends over time as campaigns are optimized.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Where does CPL fit in the marketing funnel?</Typography>
      <Typography variant="body1">
        Marketing spend first generates leads (measured by CPL), and those leads then convert into paying
        customers (measured by conversion rate and customer acquisition cost). A low CPL is only good news if
        those leads actually convert — a channel generating cheap but low-quality leads can end up costing more
        per customer than a channel with a higher CPL but better lead quality.
      </Typography>
      <Typography variant="h3">How is CPL different from CPC?</Typography>
      <Typography variant="body1">
        Cost per click (CPC) measures spend per ad click, regardless of whether that click converts into a
        lead. Cost per lead measures spend per actual lead (like a form submission or sign-up) — a more
        meaningful metric since not every click results in a lead.
      </Typography>
      <Typography variant="h3">What counts as a &quot;lead&quot;?</Typography>
      <Typography variant="body1">
        It depends on your business — a lead could be a form submission, a phone call, a newsletter sign-up, or
        a sales inquiry. Define it consistently across channels so your CPL comparisons are measuring the same
        thing everywhere.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/cost-per-lead-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Total Marketing Spend"
            type="number"
            value={totalSpend}
            onChange={(e) => setTotalSpend(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Total Leads Generated"
            type="number"
            value={totalLeads}
            onChange={(e) => setTotalLeads(e.target.value)}
            fullWidth
          />
        </Box>

        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="body2">Overall Cost Per Lead</Typography>
          <Typography variant="h3" fontWeight="bold">{money(overallCpl)}</Typography>
        </Paper>
      </Box>

      <Typography variant="subtitle1" fontWeight={600} mb={2}>Optional: Breakdown by Channel</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Channel</TableCell>
              <TableCell>Spend</TableCell>
              <TableCell>Leads</TableCell>
              <TableCell>Cost Per Lead</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {channelBreakdown.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <TextField
                    value={row.name}
                    onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                    size="small"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={rows.find((r) => r.id === row.id)?.spend ?? ''}
                    onChange={(e) => updateRow(row.id, 'spend', e.target.value)}
                    size="small"
                    variant="standard"
                    slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={rows.find((r) => r.id === row.id)?.leads ?? ''}
                    onChange={(e) => updateRow(row.id, 'leads', e.target.value)}
                    size="small"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>{money(row.cpl)}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => removeRow(row.id)} aria-label="Remove channel">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Button startIcon={<AddIcon />} onClick={addRow} sx={{ mt: 2 }}>
        Add Channel
      </Button>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CostPerLeadCalculator;
