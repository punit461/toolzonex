'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface IngredientRow {
  id: number;
  name: string;
  quantity: string;
  unit: string;
}

const DEFAULT_INGREDIENTS: IngredientRow[] = [
  { id: 1, name: 'Flour', quantity: '2', unit: 'cups' },
  { id: 2, name: 'Sugar', quantity: '1', unit: 'cup' },
  { id: 3, name: 'Butter', quantity: '0.5', unit: 'cup' },
  { id: 4, name: 'Eggs', quantity: '2', unit: '' },
];

const RecipeConverterContent = () => {
  const [originalServings, setOriginalServings] = useState('4');
  const [desiredServings, setDesiredServings] = useState('6');
  const [ingredients, setIngredients] = useState<IngredientRow[]>(DEFAULT_INGREDIENTS);
  const [nextId, setNextId] = useState(DEFAULT_INGREDIENTS.length + 1);

  const addIngredient = () => {
    setIngredients([...ingredients, { id: nextId, name: 'Ingredient', quantity: '1', unit: '' }]);
    setNextId(nextId + 1);
  };
  const removeIngredient = (id: number) => setIngredients(ingredients.filter((i) => i.id !== id));
  const updateIngredient = (id: number, field: 'name' | 'quantity' | 'unit', v: string) =>
    setIngredients(ingredients.map((i) => (i.id === id ? { ...i, [field]: v } : i)));

  const orig = parseFloat(originalServings);
  const desired = parseFloat(desiredServings);
  const validScale = !isNaN(orig) && !isNaN(desired) && orig > 0 && desired > 0;
  const scaleFactor = validScale ? desired / orig : 1;

  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
        <TextField label="Original Servings" type="number" value={originalServings} onChange={(e) => setOriginalServings(e.target.value)} fullWidth />
        <TextField label="Desired Servings" type="number" value={desiredServings} onChange={(e) => setDesiredServings(e.target.value)} fullWidth />
      </Box>

      <Stack spacing={2} sx={{ mb: 3 }}>
        {ingredients.map((i) => (
          <Box key={i.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField label="Ingredient" value={i.name} onChange={(e) => updateIngredient(i.id, 'name', e.target.value)} size="small" sx={{ flex: 2 }} />
            <TextField label="Quantity" type="number" value={i.quantity} onChange={(e) => updateIngredient(i.id, 'quantity', e.target.value)} size="small" sx={{ flex: 1 }} />
            <TextField label="Unit" value={i.unit} onChange={(e) => updateIngredient(i.id, 'unit', e.target.value)} size="small" sx={{ flex: 1 }} />
            <IconButton onClick={() => removeIngredient(i.id)} size="small" aria-label="Remove ingredient">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addIngredient} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Ingredient
        </Button>
      </Stack>

      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Scaled Recipe {validScale && `(× ${scaleFactor.toFixed(2)})`}
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell align="right">Original</TableCell>
              <TableCell align="right">Scaled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((i) => {
              const qty = parseFloat(i.quantity) || 0;
              const scaled = validScale ? qty * scaleFactor : qty;
              return (
                <TableRow key={i.id}>
                  <TableCell>{i.name}</TableCell>
                  <TableCell align="right">{qty} {i.unit}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>{scaled.toFixed(2)} {i.unit}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const RecipeConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Recipe Converter</Typography>
      <Typography variant="body1">
        Scaling a recipe up or down means multiplying every ingredient&apos;s quantity by the same factor —
        the ratio of the servings you want to the servings the recipe was written for. Enter the recipe&apos;s
        original serving count, the number of servings you actually want, and list each ingredient with its
        quantity and unit. The calculator applies the same scaling factor to every row automatically.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Scaled Quantity = Original Quantity × (Desired Servings ÷ Original Servings)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A recipe written for 4 servings that calls for 2 cups of flour, scaled up to 6 servings, needs
        2 × (6 ÷ 4) = 3 cups of flour. Every other ingredient in the recipe is scaled by that same 1.5×
        factor, keeping the proportions between ingredients identical to the original.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Doubling or tripling a recipe to cook for a larger group or meal-prep in bulk.</li>
          <li>Shrinking a recipe down to cook a smaller batch for one or two people.</li>
          <li>Adjusting a recipe found online that was written for a different serving size than you need.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does scaling work the same for every ingredient?</strong> Mostly, but not perfectly for everything — leavening agents (baking powder, baking soda, yeast), spices, and salt don&apos;t always scale linearly in large batches, so taste and adjust seasoning-related ingredients rather than following the math exactly at extreme scale factors.</li>
          <li><strong>What about cooking time when I scale a recipe?</strong> Cooking and baking times generally don&apos;t scale proportionally with quantity — a doubled batch in a larger pan often needs only slightly longer, not twice as long. Watch for visual and temperature doneness cues rather than just multiplying the time.</li>
          <li><strong>Can I mix different units in the same recipe?</strong> Yes — each ingredient row has its own unit field, so you can list flour in cups, butter in tablespoons, and salt in teaspoons in the same recipe. The scaling factor applies to the quantity number regardless of unit.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/recipe-converter" content={content}>
      <RecipeConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RecipeConverter;
