'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function parseTimeToMinutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

const ShiftHoursCalculator = () => {
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:30');
  const [crossesMidnight, setCrossesMidnight] = useState<'same' | 'next'>('same');
  const [breakMinutes, setBreakMinutes] = useState<string>('30');

  const { hours, minutes, paidMinutes, decimalHours, shiftMinutes } = useMemo(() => {
    const startMin = parseTimeToMinutes(startTime);
    const endMin = parseTimeToMinutes(endTime);
    const brk = Math.max(0, parseFloat(breakMinutes) || 0);
    if (startMin === null || endMin === null) {
      return { hours: 0, minutes: 0, paidMinutes: 0, decimalHours: 0, shiftMinutes: 0 };
    }
    let diff = endMin - startMin;
    if (crossesMidnight === 'next') diff += 24 * 60;
    if (diff < 0) diff += 24 * 60;
    const paid = Math.max(0, diff - brk);
    return {
      hours: Math.floor(paid / 60),
      minutes: Math.round(paid % 60),
      paidMinutes: paid,
      decimalHours: paid / 60,
      shiftMinutes: diff,
    };
  }, [startTime, endTime, crossesMidnight, breakMinutes]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Paid Hours for a Work Shift</Typography>
      <Typography variant="body1">
        This calculator is built specifically for payroll and timesheet use: enter a shift&apos;s clock-in and
        clock-out time, along with any unpaid break time, and it works out the total paid hours for that shift.
        It correctly handles overnight shifts that cross midnight, and shows the result as both hours-and-minutes
        and decimal hours — the format most payroll systems expect.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Paid Hours = (End Time − Start Time) − Unpaid Break
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A shift from 9:00 AM to 5:30 PM with a 30-minute unpaid lunch break is 8 hours 30 minutes on the clock,
        minus the 30-minute break, for 8 paid hours (8.00 decimal hours). An overnight shift from 10:00 PM to
        6:00 AM with a 20-minute break — with &quot;Ends Next Day&quot; selected — comes to 8 hours on the
        clock minus 20 minutes, for 7 hours 40 minutes paid (7.67 decimal hours).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Filling out a timesheet with accurate paid hours for a shift.</li>
          <li>Checking a payroll calculation for an overnight or graveyard shift.</li>
          <li>Converting a shift&apos;s hours and minutes into decimal hours for payroll software.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the site&apos;s Time Duration Calculator?</Typography>
      <Typography variant="body1">
        The Time Duration Calculator finds the raw elapsed time between two clock times with no other
        adjustments. This tool is purpose-built for payroll: it also subtracts an unpaid break from the raw
        shift length to give the actual paid hours worked, which is the number that belongs on a timesheet.
      </Typography>
      <Typography variant="h3">Should I subtract paid breaks too?</Typography>
      <Typography variant="body1">
        No — only unpaid breaks (like an unpaid lunch) should be subtracted here. Paid rest breaks are typically
        still counted as worked time under most employers&apos; policies, so leave those out of the break field.
      </Typography>
      <Typography variant="h3">Why does decimal hours matter for payroll?</Typography>
      <Typography variant="body1">
        Most payroll and timekeeping software calculates wages using decimal hours (like 7.67) rather than
        hours and minutes (7 hours 40 minutes), since decimal hours multiply directly by an hourly rate. This
        calculator shows both formats so you can use whichever your system expects.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/shift-hours-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Shift Start Time</Typography>
            <TextField
              fullWidth
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Shift End Time</Typography>
            <TextField
              fullWidth
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <ToggleButtonGroup
              color="primary"
              value={crossesMidnight}
              exclusive
              fullWidth
              onChange={(_, value) => { if (value) setCrossesMidnight(value); }}
            >
              <ToggleButton value="same" sx={{ fontWeight: 600 }}>Ends Same Day</ToggleButton>
              <ToggleButton value="next" sx={{ fontWeight: 600 }}>Ends Next Day</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <TextField
            fullWidth
            label="Unpaid Break"
            type="number"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(e.target.value)}
            onFocus={(e) => e.target.select()}
            helperText="Minutes of unpaid break time during the shift (e.g. a lunch break)."
          />
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Paid Hours</Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
              {hours}h {minutes}m
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              ({decimalHours.toFixed(2)} decimal hours)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Shift length before break: {Math.floor(shiftMinutes / 60)}h {Math.round(shiftMinutes % 60)}m
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ShiftHoursCalculator;
