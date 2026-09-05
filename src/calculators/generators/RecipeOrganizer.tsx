'use client';

import { useState } from 'react';
import { Box, Typography, Paper, TextField, Stack, Button, IconButton, MenuItem, Select, Grid, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Category = 'Breakfast' | 'Main' | 'Dessert' | 'Snack';
const CATEGORIES: Category[] = ['Breakfast', 'Main', 'Dessert', 'Snack'];

interface Recipe {
  id: number;
  name: string;
  category: Category;
  ingredients: string;
  instructions: string;
  prepTime: string;
}

let nextId = 1;
const makeRecipe = (): Recipe => ({ id: nextId++, name: '', category: 'Main', ingredients: '', instructions: '', prepTime: '' });

const RecipeOrganizerContent = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([makeRecipe()]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const addRecipe = () => {
    const r = makeRecipe();
    setRecipes((prev) => [...prev, r]);
    setSelectedId(r.id);
  };
  const removeRecipe = (id: number) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    if (selectedId === id) setSelectedId(null);
  };
  const updateRecipe = (id: number, patch: Partial<Recipe>) =>
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const savedRecipes = recipes.filter((r) => r.name.trim());
  const filtered = filter === 'All' ? savedRecipes : savedRecipes.filter((r) => r.category === filter);
  const selected = recipes.find((r) => r.id === selectedId);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 4 }}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" fontWeight={600}>Your Recipes</Typography>
          <Select size="small" value={filter} onChange={(e) => setFilter(e.target.value as Category | 'All')}>
            <MenuItem value="All">All</MenuItem>
            {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </Stack>
        <Stack spacing={1} sx={{ mb: 2 }}>
          {filtered.length === 0 && (
            <Typography variant="body2" color="text.secondary">No recipes yet — add one to get started.</Typography>
          )}
          {filtered.map((r) => (
            <Paper
              key={r.id}
              variant="outlined"
              sx={{ p: 1.5, cursor: 'pointer', borderColor: selectedId === r.id ? 'primary.main' : undefined }}
              onClick={() => setSelectedId(r.id)}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography fontWeight={600}>{r.name}</Typography>
                  <Chip label={r.category} size="small" sx={{ mt: 0.5 }} />
                  {r.prepTime && <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>{r.prepTime}</Typography>}
                </Box>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); removeRecipe(r.id); }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addRecipe} variant="outlined">Add Recipe</Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          {selected ? `Editing: ${selected.name || 'Untitled Recipe'}` : 'Select or Add a Recipe to Edit'}
        </Typography>
        {selected ? (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={2}>
              <TextField label="Recipe Name" fullWidth value={selected.name} onChange={(e) => updateRecipe(selected.id, { name: e.target.value })} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select fullWidth size="small" value={selected.category} onChange={(e) => updateRecipe(selected.id, { category: e.target.value as Category })}>
                    {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField size="small" fullWidth label="Prep Time" placeholder="e.g. 30 min" value={selected.prepTime} onChange={(e) => updateRecipe(selected.id, { prepTime: e.target.value })} />
                </Grid>
              </Grid>
              <TextField label="Ingredients" fullWidth multiline minRows={4} placeholder="One ingredient per line" value={selected.ingredients} onChange={(e) => updateRecipe(selected.id, { ingredients: e.target.value })} />
              <TextField label="Instructions" fullWidth multiline minRows={4} placeholder="Step-by-step instructions" value={selected.instructions} onChange={(e) => updateRecipe(selected.id, { instructions: e.target.value })} />
            </Stack>
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Click a recipe on the left, or add a new one.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const RecipeOrganizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Recipe Organizer</Typography>
      <Typography variant="body1">
        Click &quot;Add Recipe&quot; to create a new entry, then fill in its name, category (Breakfast, Main,
        Dessert, or Snack), ingredients, instructions, and prep time. Click any recipe card on the left to
        select and edit it, and use the category filter to browse just the recipes in one group. Everything is
        organized and browsable in one place for your current session — a full catalog of complete recipes, not
        just a single dish at a time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding a recipe named &quot;Banana Pancakes&quot; under the Breakfast category with its full ingredient
        list, step-by-step instructions, and a 20-minute prep time creates a browsable card you can click back
        into any time during your session, and filter to alongside other Breakfast recipes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cataloging a personal recipe collection organized by meal category.</li>
          <li>Drafting and refining several recipes side by side before saving them elsewhere.</li>
          <li>Browsing recipes by category when deciding what to cook.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Recipe Converter?</strong> The Recipe Converter scales a single recipe&apos;s ingredient quantities up or down for a different serving size. This Recipe Organizer does no scaling math at all — instead it organizes and catalogs multiple full recipes, each with its complete name, category, ingredients, instructions, and prep time.</li>
          <li><strong>Are my recipes saved permanently?</strong> No — this tool keeps recipes only in your browser&apos;s memory for the current session, with no persistence to a server or file. Copy out any recipe details you want to keep before closing the tab.</li>
          <li><strong>Can I have recipes in multiple categories?</strong> Each recipe has one category, but you can add as many recipes as you like across all four categories and filter the list to see just one category at a time.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/recipe-organizer" content={content}>
      <RecipeOrganizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RecipeOrganizer;
