'use client';

import { Box, Typography, Card, CardActionArea, CardContent, Chip } from '@mui/material';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { STATE_TAX_CONFIGS } from './stateTax';

const LIVE_STATES = Object.values(STATE_TAX_CONFIGS);

const PaycheckHub = () => {
  return (
    <Box>
      <Breadcrumbs items={[{ label: 'Finance' }, { label: 'Paycheck Calculator by State' }]} />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" gutterBottom>
          US Paycheck Calculator by State
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Use this paycheck calculator by state to estimate your take-home pay after federal tax, Social
          Security, and Medicare, plus each state&apos;s own income tax rules. Pick your state below to open its
          dedicated paycheck calculator. More states are being added regularly.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {LIVE_STATES.map((state) => (
          <Card key={state.slug} variant="outlined">
            <CardActionArea component={Link} href={`/finance/${state.slug}-paycheck-calculator`}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6">{state.name}</Typography>
                  {!state.hasIncomeTax && <Chip label="No state tax" size="small" color="success" variant="outlined" />}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {state.hasIncomeTax
                    ? `Calculate take-home pay with ${state.name} state income tax.`
                    : `Calculate take-home pay — ${state.name} has no state income tax.`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PaycheckHub;
