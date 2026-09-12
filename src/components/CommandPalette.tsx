'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog, Box, Autocomplete, TextField, InputAdornment, Popper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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

/**
 * The options list normally renders in a floating, absolutely-positioned
 * Popper. Inside the Dialog's Paper that meant an element escaping its parent
 * box, so the Paper grew a scrollbar on *both* axes and clipped the results.
 * Pinning the Popper to static flow lets the dialog size to its own content.
 * The !important beats popper.js, which sets position/transform inline.
 */
const InlinePopper = styled(Popper)`
  position: static !important;
  transform: none !important;
  width: 100% !important;
`;

/**
 * Matching every tool is fine for a 30-item page filter, but this palette
 * searches all ~1,350 of them: an empty query matched everything and rendered
 * the entire catalogue into the DOM, and a single letter still matches
 * hundreds. Cap what actually gets mounted.
 */
const MAX_RESULTS = 50;

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
  const hasQuery = inputValue.trim().length > 0;

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
        slotProps={{ paper: { sx: { position: 'fixed', top: { xs: 16, sm: 80 }, m: { xs: 2, sm: 0 }, borderRadius: 3, overflow: 'hidden' } } }}
      >
        <Box onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); handleClose(); } }}>
          <Autocomplete
            open={hasQuery}
            disablePortal
            PopperComponent={InlinePopper}
            options={allTools}
            groupBy={(option) => option.category}
            inputValue={inputValue}
            onInputChange={(_event, value) => setInputValue(value)}
            getOptionLabel={(option) => option.label}
            filterOptions={(options, state) => {
              const query = state.inputValue.trim();
              if (!query) return [];
              const matches: SearchOption[] = [];
              for (const option of options) {
                if (toolMatchesQuery(`${option.label} ${option.description}`, query)) {
                  matches.push(option);
                  if (matches.length === MAX_RESULTS) break;
                }
              }
              return matches;
            }}
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
              paper: { sx: { boxShadow: 'none', borderRadius: 0, borderTop: '1px solid', borderColor: 'divider', m: 0 } },
              listbox: {
                sx: {
                  maxHeight: { xs: '60vh', sm: 420 },
                  overflowX: 'hidden',
                  '& .MuiAutocomplete-option': { display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
                },
              },
            }}
          />

          {!hasQuery && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ px: 3, pb: 2.5, pt: 0.5 }}
            >
              Start typing to search {allTools.length.toLocaleString('en-IN')} tools.
            </Typography>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default CommandPalette;
