'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog, Box, Autocomplete, TextField, InputAdornment } from '@mui/material';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import { categories } from '@/data/toolCategories';
import { toolMatchesQuery } from '@/utils/search';

interface SearchOption {
  label: string;
  path: string;
  description: string;
  category: string;
}

const allTools: SearchOption[] = categories.flatMap((cat) =>
  cat.tools.map((tool) => ({ label: tool.title, path: tool.path, description: tool.description, category: cat.label }))
);

const isApplePlatform = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform);

/**
 * Sitewide Cmd/Ctrl+K search. Reuses the same toolMatchesQuery + categories
 * data every other in-page search (CategoryDashboard, homepage) already
 * uses, just surfaced as a global palette instead of a per-page text field.
 */
const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleClose = useCallback(() => {
    setOpen(false);
    setInputValue('');
  }, []);

  const handleSelect = useCallback((path: string) => {
    router.push(path);
    handleClose();
  }, [router, handleClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); } }}
        role="button"
        tabIndex={0}
        aria-label="Search tools"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          borderRadius: 10,
          bgcolor: 'action.hover',
          border: '1px solid',
          borderColor: 'divider',
          px: 1.25,
          height: 36,
          minWidth: { xs: 36, sm: 160, md: 220 },
          justifyContent: { xs: 'center', sm: 'flex-start' },
          color: 'text.secondary',
          transition: 'all 0.2s ease',
          '&:hover': { borderColor: 'primary.main', bgcolor: 'action.selected' },
        }}
      >
        <SearchIcon fontSize="small" sx={{ opacity: 0.7, flexShrink: 0 }} />
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, fontSize: '0.85rem', flexGrow: 1, whiteSpace: 'nowrap' }}>
          Search tools...
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            alignItems: 'center',
            fontSize: '0.7rem',
            fontFamily: 'monospace',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            px: 0.6,
            py: 0.1,
            flexShrink: 0,
          }}
        >
          {isApplePlatform ? '⌘K' : 'Ctrl K'}
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        slotProps={{ paper: { sx: { position: 'fixed', top: { xs: 16, sm: 80 }, m: { xs: 2, sm: 0 }, borderRadius: 3 } } }}
      >
        <Box onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); handleClose(); } }}>
          <Autocomplete
            open
            disablePortal
            options={allTools}
            groupBy={(option) => option.category}
            inputValue={inputValue}
            onInputChange={(_event, value) => setInputValue(value)}
            getOptionLabel={(option) => option.label}
            filterOptions={(options, state) =>
              options.filter((option) => toolMatchesQuery(`${option.label} ${option.description}`, state.inputValue))
            }
            onChange={(_event, newValue) => {
              if (newValue) handleSelect(newValue.path);
            }}
            noOptionsText="No tools found"
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                placeholder="Search tools..."
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  sx: { fontSize: '1.1rem', p: 2 },
                }}
              />
            )}
            slotProps={{
              listbox: { sx: { maxHeight: { xs: '60vh', sm: 420 } } },
            }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default CommandPalette;
