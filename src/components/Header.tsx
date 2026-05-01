'use client';

import { useState, useRef } from 'react';
import {
  AppBar, Toolbar, Box, Button, IconButton, Drawer,
  List, ListItemButton, ListItemText, Divider, useScrollTrigger,
  Slide, Paper, Popper, Grow, ClickAwayListener, MenuList, MenuItem,
  Typography, Collapse
} from '@mui/material';
import RouterLink from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface HideOnScrollProps { children: React.ReactElement }
const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger();
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
};

// ── Shared navigation data ────────────────────────────────────────
interface NavTool { label: string; path: string }
interface NavCategory { label: string; tools: NavTool[] }

const navCategories: NavCategory[] = [
  {
    label: 'Finance',
    tools: [
      { label: 'EMI Calculator', path: '/finance/emi-calculator' },
      { label: 'SIP Calculator', path: '/finance/sip-calculator' },
      { label: 'GST Calculator', path: '/finance/gst-calculator' },
      { label: 'Income Tax Calculator', path: '/finance/income-tax-calculator' },
      { label: 'PPF Calculator', path: '/finance/ppf-calculator' },
      { label: 'Rent vs Buy Calculator', path: '/finance/rent-vs-buy-calculator' },
      { label: 'Gold Rate Calculator', path: '/finance/gold-calculator' },
      { label: 'Silver Rate Calculator', path: '/finance/silver-calculator' },
      { label: 'SSY Calculator', path: '/finance/ssy-calculator' },
      { label: 'Salary Increment Calculator', path: '/finance/salary-increment-calculator' },
      { label: 'Retirement Calculator', path: '/finance/retirement-calculator' },
    ],
  },
  {
    label: 'Health',
    tools: [
      { label: 'BMI Calculator', path: '/health/bmi-calculator' },
      { label: 'BMR Calculator', path: '/health/bmr-calculator' },
      { label: 'TDEE Calculator', path: '/health/tdee-calculator' },
      { label: 'PFT Calculator', path: '/health/pft-calculator' },
      { label: 'CFT Calculator', path: '/health/cft-calculator' },
    ],
  },
  {
    label: 'Utilities',
    tools: [
      { label: 'Age Calculator', path: '/utilities/age-calculator' },
      { label: 'Percentage Calculator', path: '/utilities/percentage-calculator' },
      { label: 'Date Calculator', path: '/utilities/date-calculator' },
    ],
  },
  {
    label: 'Tools',
    tools: [
      { label: 'Online Notepad', path: '/tools/online-notepad' },
    ],
  },
];

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

  // Split Finance tools into 2 columns, others single column
  const cols = category.tools.length > 5 ? 2 : 1;
  const half = Math.ceil(category.tools.length / 2);
  const col1 = cols === 2 ? category.tools.slice(0, half) : category.tools;
  const col2 = cols === 2 ? category.tools.slice(half) : [];

  return (
    <Box onMouseLeave={handleClose}>
      <Button
        ref={anchorRef}
        color="inherit"
        endIcon={open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        onMouseEnter={handleOpen}
        sx={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'none', px: 1.5 }}
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
              elevation={8}
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleClose}
              sx={{ mt: 0.5, borderRadius: 2, overflow: 'hidden', minWidth: cols === 2 ? 380 : 220 }}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box>
                  <Box sx={{ px: 2, py: 1, bgcolor: '#F9F9F9', borderBottom: '1px solid #E5E5E5' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.secondary' }}>
                      {category.label}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    {/* Column 1 */}
                    <MenuList sx={{ py: 0.5, flex: 1 }}>
                      {col1.map((tool) => (
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
                    {/* Column 2 (Finance only) */}
                    {col2.length > 0 && (
                      <>
                        <Divider orientation="vertical" flexItem />
                        <MenuList sx={{ py: 0.5, flex: 1 }}>
                          {col2.map((tool) => (
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
                      </>
                    )}
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

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5', color: 'text.primary' }}
      >
        <Toolbar sx={{ maxWidth: '1200px', width: '100%', margin: '0 auto', px: { xs: 2, md: 3 }, minHeight: 64 }}>

          {/* Logo */}
          <Box
            component={RouterLink}
            href="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', mr: 2 }}
          >
            <Box component="img" src="/toolzonex/logo.png" alt="ToolZoneX" sx={{ height: 44, width: 'auto' }} />
          </Box>

          {/* Home button — desktop */}
          <Button
            component={RouterLink}
            href="/"
            startIcon={<HomeIcon />}
            color="inherit"
            sx={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'none', px: 1.5, display: { xs: 'none', md: 'flex' } }}
          >
            Home
          </Button>

          {/* Desktop dropdown nav */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {navCategories.map((cat) => (
              <DropdownButton key={cat.label} category={cat} />
            ))}
            <Button
              component={RouterLink}
              href="/blog"
              color="inherit"
              sx={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'none', px: 1.5 }}
            >
              Blog
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 280, pt: 2, height: '100%', overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 1 }}>
              <Box component="img" src="/toolzonex/logo.png" alt="ToolZoneX" sx={{ height: 36 }} />
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
