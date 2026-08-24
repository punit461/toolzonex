'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, InputAdornment, MenuItem, Select } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// US CPI-U annual average index (1982-84=100), BLS. Recent years are
// approximate and should be refreshed against bls.gov periodically.
const CPI_DATA: Record<number, number> = {
  1960: 29.6, 1961: 29.9, 1962: 30.2, 1963: 30.6, 1964: 31.0,
  1965: 31.5, 1966: 32.4, 1967: 33.4, 1968: 34.8, 1969: 36.7,
  1970: 38.8, 1971: 40.5, 1972: 41.8, 1973: 44.4, 1974: 49.3,
  1975: 53.8, 1976: 56.9, 1977: 60.6, 1978: 65.2, 1979: 72.6,
  1980: 82.4, 1981: 90.9, 1982: 96.5, 1983: 99.6, 1984: 103.9,
  1985: 107.6, 1986: 109.6, 1987: 113.6, 1988: 118.3, 1989: 124.0,
  1990: 130.7, 1991: 136.2, 1992: 140.3, 1993: 144.5, 1994: 148.2,
  1995: 152.4, 1996: 156.9, 1997: 160.5, 1998: 163.0, 1999: 166.6,
  2000: 172.2, 2001: 177.1, 2002: 179.9, 2003: 184.0, 2004: 188.9,
  2005: 195.3, 2006: 201.6, 2007: 207.3, 2008: 215.3, 2009: 214.5,
  2010: 218.1, 2011: 224.9, 2012: 229.6, 2013: 233.0, 2014: 236.7,
  2015: 237.0, 2016: 240.0, 2017: 245.1, 2018: 251.1, 2019: 255.7,
  2020: 258.8, 2021: 271.0, 2022: 292.7, 2023: 304.7, 2024: 313.7,
  2025: 320.6,
};

const YEARS = Object.keys(CPI_DATA).map(Number).sort((a, b) => a - b);
const MIN_YEAR = YEARS[0];
const MAX_YEAR = YEARS[YEARS.length - 1];

const formatUSD = (value: number) =>
  `$${Math.round(value).toLocaleString('en-US')}`;

const InflationCalculator = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [startYear, setStartYear] = useState<number>(2000);
  const [endYear, setEndYear] = useState<number>(2025);

  const { equivalentAmount, totalInflationPct, annualizedRate } = useMemo(() => {
    const startIndex = CPI_DATA[startYear];
    const endIndex = CPI_DATA[endYear];
    if (!startIndex || !endIndex || amount <= 0) {
      return { equivalentAmount: 0, totalInflationPct: 0, annualizedRate: 0 };
    }

    const ratio = endIndex / startIndex;
    const equivalent = amount * ratio;
    const totalPct = (ratio - 1) * 100;
    const years = Math.abs(endYear - startYear);
    const annualized = years > 0 ? (Math.pow(ratio, 1 / years) - 1) * 100 : 0;

    return { equivalentAmount: equivalent, totalInflationPct: totalPct, annualizedRate: annualized };
  }, [amount, startYear, endYear]);

  const content = (
    <>
      <Typography variant="h2">How this inflation calculator works</Typography>
      <Typography variant="body1">
        This calculator uses the US <strong>Consumer Price Index for All Urban Consumers (CPI-U)</strong>, the
        Bureau of Labor Statistics&apos; standard measure of inflation, to convert an amount of money from one
        year&apos;s purchasing power to another&apos;s. It answers questions like &quot;what would $1,000 from
        2000 be worth in 2025?&quot; or, run in reverse, &quot;what would today&apos;s $1,000 have been worth
        back in 1990?&quot;
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Equivalent Amount = Amount × (CPI in End Year ÷ CPI in Start Year)
      </Box>
      <Typography variant="body1">
        The CPI index tracks the average price of a fixed basket of goods and services over time. Dividing the
        end year&apos;s index by the start year&apos;s gives the cumulative inflation ratio between the two
        dates, which is then applied to your amount.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        $1,000 in 2000 is equivalent to roughly $1,862 in 2025 — the CPI-U index rose from about 172.2 to 320.6
        over those 25 years, a cumulative inflation of about 86%, or an annualized rate of roughly 2.5% per year.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adjusting historical salaries, prices, or budgets into today&apos;s dollars for comparison.</li>
          <li>Understanding how much purchasing power savings have lost sitting in cash over decades.</li>
          <li>Estimating the annualized inflation rate over a specific historical period.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is CPI-U and where does this data come from?</Typography>
      <Typography variant="body1">
        CPI-U is the Consumer Price Index for All Urban Consumers, published monthly by the US Bureau of Labor
        Statistics. This calculator uses annual average index values from 1960 through 2025; the most recent
        year&apos;s figure is approximate and may be revised — check bls.gov for the official, up-to-date index.
      </Typography>
      <Typography variant="h3">Can I calculate purchasing power going backward in time?</Typography>
      <Typography variant="body1">
        Yes — set the start year later than the end year (e.g. start 2025, end 1990) and the calculator applies
        the same ratio in reverse, showing what today&apos;s amount would have been worth in the earlier year.
      </Typography>
      <Typography variant="h3">Does this account for regional cost-of-living differences?</Typography>
      <Typography variant="body1">
        No — CPI-U is a national US average. Actual inflation experienced in a specific city, or for a specific
        household&apos;s spending mix (housing, healthcare, etc.), can run higher or lower than the national
        average shown here.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/inflation-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Amount</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(amount) ? '' : amount}
              onChange={(e) => setAmount(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Start Year</Typography>
            <Select fullWidth value={startYear} onChange={(e) => setStartYear(Number(e.target.value))}>
              {YEARS.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>End Year</Typography>
            <Select fullWidth value={endYear} onChange={(e) => setEndYear(Number(e.target.value))}>
              {YEARS.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Data covers {MIN_YEAR}-{MAX_YEAR} (US CPI-U annual average).
          </Typography>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Equivalent Amount in {endYear}</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatUSD(equivalentAmount)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Inflation</Typography>
                <Typography variant="h6">{totalInflationPct.toFixed(1)}%</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Annualized Rate</Typography>
                <Typography variant="h6">{annualizedRate.toFixed(2)}%</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InflationCalculator;
