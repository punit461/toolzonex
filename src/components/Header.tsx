'use client';

import React, { useState, useRef } from 'react';
import {
  AppBar, Toolbar, Box, Button, IconButton, Drawer,
  List, ListItemButton, ListItemText, Divider, useScrollTrigger,
  Slide, Paper, Popper, Grow, ClickAwayListener, MenuList, MenuItem,
  Collapse
} from '@mui/material';
import RouterLink from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useColorMode } from './ColorModeProvider';
import { categories as toolCategories } from '@/data/toolCategories';
import { featuredToolsByGroup, type FeaturedTool } from '@/data/featuredTools';
import CommandPalette from './CommandPalette';

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
interface DashboardLink { label: string; path: string }
interface NavCategory {
  label: string;
  /** Curated shortlist, not the full inventory -- see featuredTools.ts. */
  tools: FeaturedTool[];
  /** Real inventory size, shown on the "view all" link. */
  totalTools: number;
  dashboardLinks: DashboardLink[];
}

const NAV_GROUPS: { label: string; sourceCategories: string[] }[] = [
  { label: 'AI Tools', sourceCategories: ['AI'] },
  { label: 'Finance & Health', sourceCategories: ['Finance', 'Paycheck Calculators', 'Health'] },
  { label: 'Math & Utilities', sourceCategories: ['Time & Productivity', 'Utilities', 'Screens'] },
  { label: 'Text & Content', sourceCategories: ['Text Tools', 'Generators'] },
  { label: 'Dev & Converters', sourceCategories: ['Converters', 'Developer Tools'] },
  { label: 'Web Tools', sourceCategories: ['Tools', 'PDF Tools'] },
];

// Maps each source category (Batch 1's per-category dashboards) to its
// dashboard route -- categories that share one dashboard (e.g. Paycheck
// Calculators folds into Finance) map to the same path so a nav group
// spanning them only produces one "view all" link, not a duplicate.
const CATEGORY_DASHBOARD_ROUTES: Record<string, string> = {
  Finance: '/finance',
  'Paycheck Calculators': '/finance',
  Health: '/health',
  Utilities: '/utilities',
  'Time & Productivity': '/utilities',
  Screens: '/utilities',
  Converters: '/converters',
  'Text Tools': '/text-tools',
  Generators: '/generators',
  'Developer Tools': '/developer-tools',
  Tools: '/tools',
  'PDF Tools': '/tools/pdf-tools',
  AI: '/ai',
};

const DASHBOARD_LABELS: Record<string, string> = {
  '/finance': 'Finance',
  '/health': 'Health',
  '/utilities': 'Utilities',
  '/converters': 'Converters',
  '/text-tools': 'Text Tools',
  '/generators': 'Generators',
  '/developer-tools': 'Developer Tools',
  '/tools': 'Tools',
  '/tools/pdf-tools': 'PDF Tools',
  '/ai': 'AI',
};

/**
 * Each menu shows a curated shortlist (src/data/featuredTools.ts) plus a
 * "view all" link into the category hub, which carries the full inventory.
 *
 * It used to flat-map every tool in the group instead: 336 links in the Math
 * & Utilities menu, laid out in 240px columns, produced a panel ~5,760px wide
 * that ran clean off a 1440px screen. It also meant ~1,350 identical nav
 * links on every page, which thins internal link equity and buries the hubs.
 */
const navCategories: NavCategory[] = NAV_GROUPS.map((group) => {
  const dashboardPaths = Array.from(
    new Set(group.sourceCategories.map((cat) => CATEGORY_DASHBOARD_ROUTES[cat]).filter(Boolean))
  );
  const totalTools = toolCategories
    .filter((cat) => group.sourceCategories.includes(cat.label))
    .reduce((sum, cat) => sum + cat.tools.length, 0);

  return {
    label: group.label,
    tools: featuredToolsByGroup[group.label] ?? [],
    totalTools,
    dashboardLinks: dashboardPaths.map((path) => ({ label: DASHBOARD_LABELS[path], path })),
  };
});

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
              elevation={2}
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleClose}
              sx={{
                mt: 1,
                borderRadius: 3,
                overflow: 'hidden',
                width: category.tools.length > 6 ? 560 : 300,
                maxWidth: 'calc(100vw - 32px)',
              }}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box>
                  <MenuList
                    sx={{
                      py: 1,
                      display: 'grid',
                      gridTemplateColumns: category.tools.length > 6 ? '1fr 1fr' : '1fr',
                      columnGap: 0.5,
                    }}
                  >
                    {category.tools.map((tool) => (
                      <MenuItem
                        key={tool.path}
                        component={RouterLink}
                        href={tool.path}
                        onClick={() => setOpen(false)}
                        sx={{ fontSize: '0.875rem', py: 0.75, borderRadius: 1.5, mx: 1 }}
                      >
                        {tool.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                  {category.dashboardLinks.length > 0 && (
                    <MenuList sx={{ py: 0.5, borderTop: '1px solid', borderColor: 'divider' }}>
                      {category.dashboardLinks.map((link) => (
                        <MenuItem
                          key={link.path}
                          component={RouterLink}
                          href={link.path}
                          onClick={() => setOpen(false)}
                          sx={{ fontSize: '0.8125rem', py: 0.75, borderRadius: 1.5, mx: 1, fontWeight: 600, color: 'primary.main' }}
                        >
                          All {link.label} tools
                          <ArrowForwardIcon sx={{ fontSize: '0.9rem', ml: 0.75 }} />
                        </MenuItem>
                      ))}
                    </MenuList>
                  )}
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
          {category.dashboardLinks.map((link) => (
            <ListItemButton
              key={link.path}
              component={RouterLink}
              href={link.path}
              onClick={onClose}
              sx={{ pl: 4, py: 0.6, borderTop: '1px solid', borderColor: 'divider' }}
            >
              <ListItemText
                primary={`All ${link.label} tools`}
                slotProps={{ primary: { sx: { fontSize: '0.85rem', fontWeight: 600, color: 'primary.main' } } }}
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
  const { mode, toggleColorMode } = useColorMode();

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
            <Box component="img" src={mode === 'dark' ? '/logo-tzx-dark.webp' : '/logo-tzx.webp'} alt="ToolZoneX" width={103} height={38} sx={{ height: 38, width: 'auto' }} />
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

          {/* Search — sitewide Cmd/Ctrl+K palette, visible at every breakpoint */}
          <Box sx={{ ml: { xs: 0, sm: 2 } }}>
            <CommandPalette />
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
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
              <Box component="img" src={mode === 'dark' ? '/logo-tzx-dark.webp' : '/logo-tzx.webp'} alt="ToolZoneX" width={98} height={36} sx={{ height: 36, width: 'auto' }} />
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
