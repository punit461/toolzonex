'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type InputMode = 'area' | 'dimensions';
type Arrangement = 'standard' | 'lecture' | 'group' | 'custom';

const ARRANGEMENT_SQFT: Record<Exclude<Arrangement, 'custom'>, number> = {
  standard: 18,
  lecture: 13.5,
  group: 27.5,
};

const ARRANGEMENT_LABELS: Record<Arrangement, string> = {
  standard: 'Standard Desks (~15-20 sq ft/student)',
  lecture: 'Lecture-Style (~12-15 sq ft/student)',
  group: 'Group Tables (~25-30 sq ft/student)',
  custom: 'Custom',
};

const ClassroomCapacityCalculator = () => {
  const [mode, setMode] = useState<InputMode>('area');
  const [area, setArea] = useState('900');
  const [length, setLength] = useState('30');
  const [width, setWidth] = useState('30');
  const [arrangement, setArrangement] = useState<Arrangement>('standard');
  const [sqftPerStudent, setSqftPerStudent] = useState('18');

  const applyArrangement = (value: Arrangement) => {
    setArrangement(value);
    if (value !== 'custom') setSqftPerStudent(String(ARRANGEMENT_SQFT[value]));
  };

  const result = useMemo(() => {
    const roomArea = mode === 'area' ? parseFloat(area) || 0 : (parseFloat(length) || 0) * (parseFloat(width) || 0);
    const perStudent = parseFloat(sqftPerStudent) || 0;
    const capacity = perStudent > 0 ? Math.floor(roomArea / perStudent) : 0;

    return { roomArea, capacity };
  }, [mode, area, length, width, sqftPerStudent]);

  const content = (
    <>
      <Typography variant="h2">How Classroom Capacity Is Calculated</Typography>
      <Typography variant="body1">
        Maximum recommended classroom capacity depends on both the room&apos;s total floor area and how much
        space each student needs, which varies significantly by seating arrangement. Standard individual desks
        need roughly 15-20 sq ft per student, lecture-style seating (rows facing forward) is more space-efficient
        at around 12-15 sq ft per student, and group tables for collaborative work need more room per student,
        typically 25-30 sq ft, to allow for shared table space and movement. Pick a preset arrangement or enter
        a custom space-per-student figure to get a recommended maximum headcount.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Room Area = Length × Width
        <br />
        Maximum Capacity = ⌊Room Area ÷ Space Per Student⌋
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 900 sq ft classroom (30 × 30 ft) using standard desks at 18 sq ft per student fits a maximum of 50
        students. The same room set up with group tables at 27.5 sq ft per student fits only 32 students, since
        that arrangement needs more space per person.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning maximum enrollment for a classroom before assigning a course to it.</li>
          <li>Comparing how different seating arrangements affect how many students a room holds.</li>
          <li>Checking whether a room meets recommended per-student space guidelines.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this account for fire code or legal occupancy limits?</Typography>
      <Typography variant="body1">
        No — this calculates a recommended educational capacity based on comfortable per-student space for
        learning, not fire code maximum occupancy, which is a separate legal limit set by local building and
        fire codes and may be higher or lower than this estimate.
      </Typography>
      <Typography variant="h3">Why does group table seating need more space per student?</Typography>
      <Typography variant="body1">
        Group arrangements need room for shared table surfaces, chairs pulled out on multiple sides, and space
        for the teacher and students to move between groups — all of which adds up to more square footage per
        student than rows of individual desks.
      </Typography>
      <Typography variant="h3">Should I subtract space for the teacher&apos;s desk or storage?</Typography>
      <Typography variant="body1">
        For a more accurate estimate, subtract the area used by fixed furniture, storage, or a teacher&apos;s
        desk from the total room area before entering it, since the per-student space guidelines assume that
        area is available for student seating.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/classroom-capacity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} fullWidth>
            <ToggleButton value="area">Direct Area</ToggleButton>
            <ToggleButton value="dimensions">L × W</ToggleButton>
          </ToggleButtonGroup>

          {mode === 'area' ? (
            <TextField
              label="Room Area"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
            />
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="Length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
              />
              <TextField
                label="Width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
              />
            </Box>
          )}

          <FormControl fullWidth>
            <InputLabel>Seating Arrangement</InputLabel>
            <Select
              value={arrangement}
              label="Seating Arrangement"
              onChange={(e) => applyArrangement(e.target.value as Arrangement)}
            >
              {(Object.keys(ARRANGEMENT_LABELS) as Arrangement[]).map((key) => (
                <MenuItem key={key} value={key}>{ARRANGEMENT_LABELS[key]}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Space Per Student"
            type="number"
            value={sqftPerStudent}
            onChange={(e) => {
              setSqftPerStudent(e.target.value);
              setArrangement('custom');
            }}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Maximum Recommended Capacity</Typography>
            <Typography variant="h3" fontWeight="bold">{result.capacity} students</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Room Area</Typography>
            <Typography fontWeight={600}>{result.roomArea.toFixed(0)} sq ft</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ClassroomCapacityCalculator;
