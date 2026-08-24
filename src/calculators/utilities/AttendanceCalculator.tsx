'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const AttendanceCalculator = () => {
  const [attended, setAttended] = useState<number>(60);
  const [total, setTotal] = useState<number>(75);
  const [target, setTarget] = useState<number>(75);

  const { currentPercent, message, extraValue, extraLabel } = useMemo(() => {
    const a = Number.isNaN(attended) ? 0 : attended;
    const t = Number.isNaN(total) ? 0 : total;
    const tgt = Number.isNaN(target) ? 0 : target;

    const currentPercent = t > 0 ? (a / t) * 100 : 0;

    if (t <= 0 || tgt <= 0) {
      return { currentPercent, message: 'Enter your attended and total classes to see results.', extraValue: null, extraLabel: '' };
    }

    if (currentPercent >= tgt) {
      if (tgt >= 100) {
        return { currentPercent, message: `You're meeting your ${tgt}% target.`, extraValue: 0, extraLabel: 'More classes you can miss and stay at target' };
      }
      const maxSkip = Math.floor(a / (tgt / 100) - t);
      return {
        currentPercent,
        message: `You're above your ${tgt}% target.`,
        extraValue: Math.max(0, maxSkip),
        extraLabel: 'More classes you can miss and stay at target',
      };
    }

    if (tgt >= 100) {
      return { currentPercent, message: `A ${tgt}% target can never be reached again after missing a class.`, extraValue: null, extraLabel: '' };
    }

    const needed = (tgt / 100 * t - a) / (1 - tgt / 100);
    return {
      currentPercent,
      message: `You're below your ${tgt}% target.`,
      extraValue: Math.max(0, Math.ceil(needed)),
      extraLabel: 'Classes you must attend in a row to hit target',
    };
  }, [attended, total, target]);

  const isShort = currentPercent < target;

  const content = (
    <>
      <Typography variant="h2">How to Use the Attendance Calculator</Typography>
      <Typography variant="body1">
        Enter the number of classes you&apos;ve attended, the total number of classes held so far, and the
        attendance percentage your college or school requires (commonly 75%). The calculator instantly shows
        your current attendance percentage, plus either how many more classes you can safely skip while staying
        at target, or how many classes in a row you need to attend to reach it.
      </Typography>

      <Typography variant="h2">How the &quot;classes you can miss&quot; figure is calculated</Typography>
      <Typography variant="body1">
        If you&apos;re already at or above target, the calculator assumes you attend zero more classes and works
        out how many additional classes can be held (and skipped) before your percentage would drop below
        target. If you&apos;re below target, it instead works out how many classes in a row you&apos;d need to
        attend — assuming no more are skipped — to climb back up to target.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With 60 classes attended out of 75 held (80%) and a 75% target, you can miss 5 more classes and still be
        at exactly 75% (60 ÷ 80 = 75%). If instead you&apos;d attended only 50 of 75 (66.7%), you&apos;d need to
        attend the next 25 classes in a row to climb back to a 75% average.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking how many college lectures you can afford to skip without falling short of the minimum attendance requirement.</li>
          <li>Working out how many classes in a row you must attend to recover from a low attendance percentage.</li>
          <li>Tracking attendance progress through a semester against a fixed target percentage.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is 75% attendance so common as a minimum requirement?</Typography>
      <Typography variant="body1">
        Many universities and boards, especially in India, set 75% as the minimum eligibility to sit for exams,
        balancing regular classroom participation against reasonable allowance for illness or emergencies. Some
        institutions or specific courses may set a different threshold, so always confirm your own requirement.
      </Typography>
      <Typography variant="h3">Does this account for classes that haven&apos;t happened yet?</Typography>
      <Typography variant="body1">
        The &quot;classes you can miss&quot; figure assumes those future classes will happen and you&apos;ll
        skip them, while the &quot;classes you must attend&quot; figure assumes you attend every one of them —
        it can&apos;t know your actual future schedule, so treat both as planning estimates.
      </Typography>
      <Typography variant="h3">What if my target is 100%?</Typography>
      <Typography variant="body1">
        At a 100% target, you can never miss a single class and stay on target, and once you&apos;ve missed even
        one, that target becomes mathematically unreachable again — a 100% target really only works if attendance
        has been perfect from day one.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/attendance-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Classes Attended"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(attended) ? '' : attended}
              onChange={(e) => setAttended(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Total Classes Held"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(total) ? '' : total}
              onChange={(e) => setTotal(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Target Attendance %"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(target) ? '' : target}
              onChange={(e) => setTarget(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Current Attendance</Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, color: isShort ? '#ef4444' : 'primary.main', mb: 2 }}>
              {currentPercent.toFixed(2)}%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{message}</Typography>
            {extraValue !== null && (
              <Box sx={{ mt: 1, pt: 3, borderTop: '1px solid #E5E5E5', width: '100%' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{extraValue}</Typography>
                <Typography variant="body2" color="text.secondary">{extraLabel}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AttendanceCalculator;
