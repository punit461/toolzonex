'use client';

import React, { useState, useRef } from 'react';
import {
  AppBar, Toolbar, Box, Button, IconButton, Drawer,
  List, ListItemButton, ListItemText, Divider, useScrollTrigger,
  Slide, Paper, Popper, Grow, ClickAwayListener, MenuList, MenuItem,
  Typography, Collapse, Autocomplete, TextField, InputAdornment
} from '@mui/material';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useColorMode } from './ColorModeProvider';
import { categories as toolCategories } from '@/data/toolCategories';

interface HideOnScrollProps { children: React.ReactElement }
const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger({ threshold: 20 });
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
};

// ── Shared navigation data ────────────────────────────────────────
// Derived from the same registry that drives the homepage grid
// (src/data/toolCategories.tsx) instead of a separate hand-maintained
// list — the two had already drifted twice (AI Pomodoro and Image
// Resizer were both missing from this nav after being added to the
// homepage). Deriving means that can't happen again.
interface NavTool { label: string; path: string }
interface NavCategory { label: string; tools: NavTool[] }

const NAV_GROUPS: { label: string; sourceCategories: string[] }[] = [
  { label: 'AI Tools', sourceCategories: ['AI'] },
  { label: 'Finance & Health', sourceCategories: ['Finance', 'Health'] },
  { label: 'Math & Utilities', sourceCategories: ['Time & Productivity', 'Utilities'] },
  { label: 'Text & Content', sourceCategories: ['Text Tools', 'Generators'] },
  { label: 'Dev & Converters', sourceCategories: ['Converters', 'Developer Tools'] },
  { label: 'Web Tools', sourceCategories: ['Tools'] },
];

const navCategories: NavCategory[] = NAV_GROUPS.map((group) => ({
  label: group.label,
  tools: toolCategories
    .filter((cat) => group.sourceCategories.includes(cat.label))
    .flatMap((cat) => cat.tools.map((tool) => ({ label: tool.title, path: tool.path }))),
}));

// ── Desktop Mega-Dropdown ──────────────────────────────────────────
interface DropdownButtonProps { category: NavCategory }

const DropdownButton = ({ category }: DropdownButtonProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const handleMenuMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const maxPerCol = 14;
  const cols = Math.ceil(category.tools.length / maxPerCol);
  
  const columns = Array.from({ length: cols }, (_, i) => 
    category.tools.slice(i * maxPerCol, (i + 1) * maxPerCol)
  );

  return (
    <Box onMouseLeave={handleClose}>
      <Button
        ref={anchorRef}
        color="inherit"
        endIcon={open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        onMouseEnter={handleOpen}
        sx={{
          fontWeight: 500,
          fontSize: '0.8rem',
          textTransform: 'none',
          px: 1.25,
          py: 0.75,
          borderRadius: 2,
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
          '&:hover': { bgcolor: 'action.hover' },
          ...(open && { bgcolor: 'action.selected' }),
        }}
      >
        {category.label}
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'top left' }}>
            <Paper
              elevation={12}
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleClose}
              sx={{
                mt: 1,
                borderRadius: 3,
                overflow: 'hidden',
                minWidth: cols * 240,
                border: '1px solid',
                borderColor: 'divider',
                backdropFilter: 'blur(20px)',
              }}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box>
                  <Box sx={{ px: 2, py: 1, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.secondary' }}>
                      {category.label}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    {columns.map((col, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <Divider orientation="vertical" flexItem />}
                        <MenuList sx={{ py: 0.5, flex: 1 }}>
                          {col.map((tool) => (
                            <MenuItem
                              key={tool.path}
                              component={RouterLink}
                              href={tool.path}
                              onClick={() => setOpen(false)}
                              sx={{ fontSize: '0.875rem', py: 0.75, borderRadius: 1, mx: 0.5 }}
                            >
                              {tool.label}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

// ── Mobile Accordion Category ──────────────────────────────────────
interface MobileAccordionProps { category: NavCategory; onClose: () => void }

const MobileAccordion = ({ category, onClose }: MobileAccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setExpanded(!expanded)} sx={{ py: 1 }}>
        <ListItemText
          primary={category.label}
          slotProps={{ primary: { sx: { fontWeight: 700, fontSize: '0.95rem' } } }}
        />
        {expanded ? <ExpandLessIcon fontSize="small" color="action" /> : <ExpandMoreIcon fontSize="small" color="action" />}
      </ListItemButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List disablePadding>
          {category.tools.map((tool) => (
            <ListItemButton
              key={tool.path}
              component={RouterLink}
              href={tool.path}
              onClick={onClose}
              sx={{ pl: 4, py: 0.6 }}
            >
              <ListItemText
                primary={tool.label}
                slotProps={{ primary: { sx: { fontSize: '0.85rem', color: 'text.secondary' } } }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <Divider />
    </>
  );
};

// ── Main Header ────────────────────────────────────────────────────
const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const { mode, toggleColorMode } = useColorMode();

  const allTools = navCategories.flatMap(cat => 
    cat.tools.map(tool => ({ ...tool, category: cat.label }))
  );

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(15, 23, 42, 0.85)'
              : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ maxWidth: '1280px', width: '100%', margin: '0 auto', px: { xs: 2, md: 3 }, minHeight: 60, gap: 1 }}>

          {/* Logo */}
          <Box
            component={RouterLink}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              mr: 3,
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 0.8 },
            }}
          >
            <Box component="img" src={mode === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="ToolZoneX" sx={{ height: 38, width: 'auto' }} />
          </Box>

          {/* Desktop dropdown nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.25, alignItems: 'center' }}>
            {navCategories.map((cat) => (
              <DropdownButton key={cat.label} category={cat} />
            ))}
            <Button
              component={RouterLink}
              href="/blog"
              color="inherit"
              sx={{
                fontWeight: 500,
                fontSize: '0.8rem',
                textTransform: 'none',
                px: 1.25,
                py: 0.75,
                borderRadius: 2,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              Blog
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search Bar */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 2, width: 240 }}>
            <Autocomplete
              freeSolo
              options={allTools}
              groupBy={(option) => option.category}
              getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
              onChange={(event, newValue) => {
                if (typeof newValue === 'object' && newValue !== null) {
                  router.push(newValue.path);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search tools..."
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ color: 'text.secondary', opacity: 0.7 }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 10,
                      bgcolor: 'action.hover',
                      border: '1px solid',
                      borderColor: 'divider',
                      '& fieldset': { border: 'none' },
                      '&:hover': { borderColor: 'primary.main', bgcolor: 'action.selected' },
                      '&.Mui-focused': { borderColor: 'primary.main', bgcolor: 'background.paper', boxShadow: '0 0 0 3px rgba(59,130,246,0.1)' },
                      fontSize: '0.85rem',
                      height: 36,
                      transition: 'all 0.2s ease',
                    }
                  }}
                />
              )}
            />
          </Box>

          {/* Dark mode toggle — desktop */}
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            sx={{
              ml: 1.5,
              display: { xs: 'none', md: 'flex' },
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: 'action.hover',
              transition: 'all 0.2s ease',
              '&:hover': { bgcolor: 'action.selected', transform: 'rotate(15deg)' },
            }}
            aria-label="Toggle dark mode"
          >
            {mode === 'dark' ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
          </IconButton>

          {/* Mobile hamburger */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'flex-end' }}>
            <IconButton onClick={toggleColorMode} color="inherit" aria-label="Toggle dark mode" sx={{ mr: 0.5 }}>
              {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
            <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 280, pt: 2, height: '100%', overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 1 }}>
              <Box component="img" src={mode === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="ToolZoneX" sx={{ height: 36 }} />
              <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
            </Box>
            <Divider sx={{ mb: 1 }} />

            {/* Home link */}
            <List disablePadding>
              <ListItemButton component={RouterLink} href="/" onClick={() => setDrawerOpen(false)}>
                <HomeIcon sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} />
                <ListItemText primary="Home" slotProps={{ primary: { sx: { fontWeight: 700 } } }} />
              </ListItemButton>
              <Divider />

              {/* Accordion categories */}
              {navCategories.map((cat) => (
                <MobileAccordion key={cat.label} category={cat} onClose={() => setDrawerOpen(false)} />
              ))}

              {/* Blog */}
              <ListItemButton component={RouterLink} href="/blog" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Blog" slotProps={{ primary: { sx: { fontWeight: 700, fontSize: '0.95rem' } } }} />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
