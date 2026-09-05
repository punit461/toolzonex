'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, TextField, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner'] as const;
type Meal = (typeof MEALS)[number];

const MealPlannerGeneratorContent = () => {
  const [plan, setPlan] = useState<Record<string, Record<Meal, string>>>(() => {
    const initial: Record<string, Record<Meal, string>> = {};
    DAYS.forEach((day) => {
      initial[day] = { Breakfast: '', Lunch: '', Dinner: '' };
    });
    return initial;
  });

  const updateMeal = (day: string, meal: Meal, value: string) =>
    setPlan((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: value } }));

  const plainText = useMemo(() => {
    const lines: string[] = ['WEEKLY MEAL PLAN', ''];
    DAYS.forEach((day) => {
      lines.push(day.toUpperCase());
      MEALS.forEach((meal) => {
        const val = plan[day][meal].trim();
        lines.push(`  ${meal}: ${val || '—'}`);
      });
      lines.push('');
    });
    return lines.join('\n');
  }, [plan]);

  const copyText = async () => {
    try { await navigator.clipboard.writeText(plainText); } catch {}
  };

  return (
    <Box>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3, overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Meal</TableCell>
              {DAYS.map((day) => (
                <TableCell key={day} sx={{ fontWeight: 700 }}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {MEALS.map((meal) => (
              <TableRow key={meal}>
                <TableCell sx={{ fontWeight: 600 }}>{meal}</TableCell>
                {DAYS.map((day) => (
                  <TableCell key={day} sx={{ minWidth: 130 }}>
                    <TextField
                      size="small"
                      fullWidth
                      variant="standard"
                      placeholder="—"
                      value={plan[day][meal]}
                      onChange={(e) => updateMeal(day, meal, e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" fontWeight={600}>Printable Preview</Typography>
        <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyText}>Copy as Text</Button>
      </Stack>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
          {plainText}
        </Typography>
      </Paper>
    </Box>
  );
};

const MealPlannerGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Meal Planner Generator</Typography>
      <Typography variant="body1">
        Fill in the 7-day grid running Monday through Sunday, entering what you plan to eat for Breakfast,
        Lunch, and Dinner in each day&apos;s column. Every cell is an editable text field, so you can type
        specific dish names, ingredients, or just a quick reminder. As you fill it in, the printable preview
        below builds a clean, plain-text version of your full week of meals, ready to copy or print for the
        fridge.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;Oatmeal with berries&quot; under Monday&apos;s Breakfast, &quot;Leftover stir-fry&quot;
        under Monday&apos;s Lunch, and &quot;Grilled salmon & veggies&quot; under Monday&apos;s Dinner produces a
        preview listing all three meals clearly under the Monday heading.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a full week of meals in advance to simplify grocery shopping.</li>
          <li>Coordinating who&apos;s cooking what across a household by meal slot.</li>
          <li>Printing a meal plan to stick on the fridge for the week ahead.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Weekly Planner Generator?</strong> The Weekly Planner Generator is a general-purpose grid for free-form daily tasks, one open text box per day. This Meal Planner Generator is structured specifically around Breakfast, Lunch, and Dinner slots for each day, making it purpose-built for meal planning rather than general to-dos.</li>
          <li><strong>Do I have to fill in every meal for every day?</strong> No — leave any cell blank and it simply shows as a dash in the printable preview, so partial weeks work fine too.</li>
          <li><strong>Is my meal plan saved between visits?</strong> No — it resets on reload since it&apos;s generated fresh in your browser each time, so copy or print it if you want to keep a lasting copy for the week.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/meal-planner-generator" content={content}>
      <MealPlannerGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MealPlannerGenerator;
