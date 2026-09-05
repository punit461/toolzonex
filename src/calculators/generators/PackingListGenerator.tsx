'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Button, Checkbox, FormControlLabel, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PrintIcon from '@mui/icons-material/Print';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type PackItem = { name: string; perDay?: boolean };

const BASE_ITEMS: PackItem[] = [
  { name: 'Underwear', perDay: true },
  { name: 'Socks', perDay: true },
  { name: 'T-shirts', perDay: true },
  { name: 'Toothbrush & toothpaste' },
  { name: 'Phone charger' },
  { name: 'Wallet / ID' },
  { name: 'Medications' },
];

const TRIP_TYPES: Record<string, PackItem[]> = {
  Beach: [
    { name: 'Swimsuit' },
    { name: 'Sunscreen' },
    { name: 'Sunglasses' },
    { name: 'Beach towel' },
    { name: 'Flip-flops' },
    { name: 'Sun hat' },
    { name: 'After-sun lotion' },
  ],
  Business: [
    { name: 'Laptop & charger' },
    { name: 'Dress shirts', perDay: true },
    { name: 'Dress pants / skirt' },
    { name: 'Dress shoes' },
    { name: 'Business cards' },
    { name: 'Blazer / suit jacket' },
    { name: 'Notebook & pen' },
  ],
  Camping: [
    { name: 'Tent' },
    { name: 'Sleeping bag' },
    { name: 'Sleeping pad' },
    { name: 'Flashlight / headlamp' },
    { name: 'Camp stove' },
    { name: 'Insect repellent' },
    { name: 'First-aid kit' },
    { name: 'Hiking boots' },
  ],
  'Winter/Cold Weather': [
    { name: 'Winter coat' },
    { name: 'Thermal base layers', perDay: true },
    { name: 'Gloves' },
    { name: 'Wool hat' },
    { name: 'Scarf' },
    { name: 'Snow boots' },
    { name: 'Hand warmers' },
  ],
  International: [
    { name: 'Passport' },
    { name: 'Travel adapter' },
    { name: 'Local currency / travel card' },
    { name: 'Copies of documents' },
    { name: 'Travel insurance info' },
    { name: 'Language phrasebook / app' },
  ],
  'Weekend Getaway': [
    { name: 'Comfortable shoes' },
    { name: 'Light jacket' },
    { name: 'Toiletry bag' },
    { name: 'Camera' },
    { name: 'Snacks for the road' },
  ],
};

const PackingListGeneratorContent = () => {
  const [tripType, setTripType] = useState<string>('Beach');
  const [days, setDays] = useState<number>(5);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allItems = useMemo(() => {
    const specific = TRIP_TYPES[tripType] || [];
    const combined = [...BASE_ITEMS, ...specific];
    return combined.map((item) => {
      if (item.perDay) {
        const qty = Math.max(1, days + 1);
        return { ...item, label: `${item.name} (x${qty})` };
      }
      return { ...item, label: item.name };
    });
  }, [tripType, days]);

  const toggle = (name: string) => {
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const copyList = async () => {
    const text = allItems.map((item) => `- [${checked[item.name] ? 'x' : ' '}] ${item.label}`).join('\n');
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  const printList = () => {
    window.print();
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Trip Type</InputLabel>
          <Select value={tripType} label="Trip Type" onChange={(e) => setTripType(e.target.value)}>
            {Object.keys(TRIP_TYPES).map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Trip Length (days)"
          type="number"
          value={days}
          onChange={(e) => setDays(Math.max(1, parseInt(e.target.value, 10) || 1))}
          fullWidth
          InputProps={{ inputProps: { min: 1, max: 60 } }}
        />
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>{tripType} Packing List ({days} day{days !== 1 ? 's' : ''})</Typography>
          <Stack direction="row" spacing={1}>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList}>Copy</Button>
            <Button size="small" startIcon={<PrintIcon />} onClick={printList}>Print</Button>
          </Stack>
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {allItems.map((item) => (
            <FormControlLabel
              key={item.name}
              control={<Checkbox checked={!!checked[item.name]} onChange={() => toggle(item.name)} />}
              label={
                <Typography sx={{ textDecoration: checked[item.name] ? 'line-through' : 'none', color: checked[item.name] ? 'text.secondary' : 'text.primary' }}>
                  {item.label}
                </Typography>
              }
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

const PackingListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Packing List Generator</Typography>
      <Typography variant="body1">
        Select your trip type — Beach, Business, Camping, Winter/Cold Weather, International, or Weekend
        Getaway — and enter your trip length in days. The tool builds a packing checklist combining general
        essentials (documents, toiletries, chargers) with items specific to your trip type (like sunscreen for
        the beach or a tent for camping). Quantity-based items such as underwear and socks automatically scale
        with trip length, using days + 1 so you always have a spare. Check items off as you pack, then copy or
        print the list.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing &quot;Camping&quot; with a trip length of 4 days generates a list including a tent, sleeping
        bag, and insect repellent, plus 5 pairs of underwear and 5 pairs of socks (4 days + 1 spare each).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Making sure nothing essential is forgotten before a trip.</li>
          <li>Quickly generating a checklist for a spontaneous weekend getaway.</li>
          <li>Printing a physical packing checklist to follow while packing a suitcase.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does the list update automatically when I change trip length?</strong> Yes — quantity-based items like underwear and socks recalculate instantly whenever you change the number of days, using days + 1 as the quantity.</li>
          <li><strong>Can I check off items as I pack?</strong> Yes — click any item to mark it packed; checked items appear crossed out.</li>
          <li><strong>Can I save my progress?</strong> Checked items are only kept for your current browser session and reset on reload, so copy or print your list if you need a lasting copy.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/packing-list-generator" content={content}>
      <PackingListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PackingListGenerator;
