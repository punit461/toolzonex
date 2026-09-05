'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface AgeGroup {
  label: string;
  min: number;
  max: number;
}

const AGE_GROUPS: AgeGroup[] = [
  { label: 'Newborn (0-3 months)', min: 14, max: 17 },
  { label: 'Infant (4-11 months)', min: 12, max: 15 },
  { label: 'Toddler (1-2 years)', min: 11, max: 14 },
  { label: 'Preschool (3-5 years)', min: 10, max: 13 },
  { label: 'School Age (6-13 years)', min: 9, max: 11 },
  { label: 'Teen (14-17 years)', min: 8, max: 10 },
  { label: 'Young Adult (18-25 years)', min: 7, max: 9 },
  { label: 'Adult (26-64 years)', min: 7, max: 9 },
  { label: 'Older Adult (65+ years)', min: 7, max: 8 },
];

const IdealSleepDurationCalculator = () => {
  const [groupIndex, setGroupIndex] = useState(7);

  const group = useMemo(() => AGE_GROUPS[groupIndex], [groupIndex]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Ideal Sleep Duration Calculator</Typography>
      <Typography variant="body1">
        Select your age group to see the recommended range of total sleep hours per night, based on commonly
        published sleep-duration guidelines from sleep health organizations. This answers a different question
        than a bedtime calculator: rather than telling you a specific clock time to go to bed or wake up, it
        tells you how many total hours of sleep you should be aiming to get each night based on your age.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Recommended Sleep Range = Published Guideline Range for Selected Age Group
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An adult aged 26-64 should generally aim for 7-9 hours of sleep per night. A teenager aged 14-17, by
        contrast, needs more — typically 8-10 hours — reflecting the higher sleep needs of adolescent
        development.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether you or a family member is getting an age-appropriate amount of sleep.</li>
          <li>Setting a nightly sleep goal as part of a broader health or wellness routine.</li>
          <li>Understanding how recommended sleep needs change as a child grows into adulthood.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Sleep Time Calculator?</strong> The Sleep Time Calculator works out a specific bedtime or wake-up time based on 90-minute sleep cycles. This tool answers a completely different question — how many total hours of sleep you should be getting per night based on your age — without reference to any particular clock time.</li>
          <li><strong>Why do sleep needs decrease with age?</strong> Sleep needs are highest during infancy and childhood when the body and brain are developing rapidly, and gradually decrease through adolescence into adulthood, where needs stabilize before dipping slightly in older age.</li>
          <li><strong>What if I regularly sleep less than the recommended range?</strong> Occasional short sleep is normal, but consistently sleeping below the recommended range for your age group is linked to a range of health effects over time. If you struggle to get enough sleep regularly, it&apos;s worth discussing with a healthcare provider.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/health/ideal-sleep-duration-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Age Group</InputLabel>
            <Select
              value={groupIndex}
              label="Age Group"
              onChange={(e: SelectChangeEvent<number>) => setGroupIndex(Number(e.target.value))}
            >
              {AGE_GROUPS.map((g, i) => (
                <MenuItem key={g.label} value={i}>{g.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Recommended Sleep</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">{group.label}</Typography>
            <Typography variant="h3" fontWeight="bold">{group.min}-{group.max} hours</Typography>
            <Typography variant="body2">per night</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default IdealSleepDurationCalculator;
