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
    label: 'Finance & Health',
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
      { label: 'Loan Calculator', path: '/finance/loan-calculator' },
      { label: 'BMI Calculator', path: '/health/bmi-calculator' },
      { label: 'BMR Calculator', path: '/health/bmr-calculator' },
      { label: 'TDEE Calculator', path: '/health/tdee-calculator' },
      { label: 'PFT Calculator', path: '/health/pft-calculator' },
      { label: 'CFT Calculator', path: '/health/cft-calculator' },
      { label: 'Sleep Time Calculator', path: '/health/sleep-time-calculator' },
      { label: 'Body Fat Calculator', path: '/health/body-fat-calculator' },
      { label: 'Calorie Calculator', path: '/health/calorie-calculator' },
    ],
  },
  {
    label: 'Math & Utilities',
    tools: [
      { label: 'Timer', path: '/utilities/timer' },
      { label: 'Stopwatch', path: '/utilities/stopwatch' },
      { label: 'Focus Timer', path: '/utilities/focus-timer' },
      { label: 'Current Time Display', path: '/utilities/current-time-display' },
      { label: 'Age Calculator', path: '/utilities/age-calculator' },
      { label: 'Percentage Calculator', path: '/utilities/percentage-calculator' },
      { label: 'Date Calculator', path: '/utilities/date-calculator' },
      { label: 'Margin Calculator', path: '/utilities/margin-calculator' },
      { label: 'Discount Calculator', path: '/utilities/discount-calculator' },
      { label: 'Tip Calculator', path: '/utilities/tip-calculator' },
      { label: 'Aspect Ratio Calculator', path: '/utilities/aspect-ratio-calculator' },
      { label: 'Rule of Three', path: '/utilities/rule-of-three-calculator' },
      { label: 'Time Calculator', path: '/utilities/time-calculator' },
      { label: 'Time Zone Converter', path: '/utilities/time-zone-converter' },
      { label: 'Basic Calculator', path: '/utilities/basic-calculator' },
      { label: 'Scientific Calculator', path: '/utilities/scientific-calculator' },
      { label: 'Prime Number Checker', path: '/utilities/prime-number-checker' },
      { label: 'Barcode Generator', path: '/utilities/barcode-generator' },
      { label: 'Game Score Tracker', path: '/utilities/game-score-tracker' },
      { label: 'Algorithm Visualizer', path: '/utilities/algorithm-visualizer' },
      { label: 'Alphabet Learning Tool', path: '/utilities/alphabet-learning-tool' },
      { label: 'Number to Words', path: '/utilities/number-to-words-converter' },
      { label: 'Roman Numeral Converter', path: '/utilities/roman-numeral-converter' },
    ],
  },
  {
    label: 'Text & Content',
    tools: [
      { label: 'Text Sorter', path: '/tools/text-sorter' },
      { label: 'Word Counter', path: '/tools/word-counter' },
      { label: 'Text Reverser', path: '/tools/text-reverser' },
      { label: 'Duplicates Remover', path: '/tools/duplicates-remover' },
      { label: 'Duplicate Word Finder', path: '/tools/duplicate-word-finder' },
      { label: 'Line Numbering', path: '/tools/line-numbering' },
      { label: 'Text Stats Analyzer', path: '/tools/text-stats-analyzer' },
      { label: 'String Escaper', path: '/tools/string-escaper' },
      { label: 'Whitespace Cleaner', path: '/tools/whitespace-cleaner' },
      { label: 'Keyword Density', path: '/tools/keyword-density-analyzer' },
      { label: 'Character Distribution', path: '/tools/character-distribution-analyzer' },
      { label: 'Text Splitter', path: '/tools/text-splitter' },
      { label: 'Sentence Case Fixer', path: '/tools/sentence-case-fixer' },
      { label: 'Prefix & Suffix', path: '/tools/line-prefix-suffix-tool' },
      { label: 'Text Repeater', path: '/tools/text-repeater' },
      { label: 'Text Encryption', path: '/tools/text-encryption-decryption' },
      { label: 'Palindrome Checker', path: '/tools/palindrome-checker' },
      { label: 'Text Case Mixer', path: '/tools/text-case-mixer' },
      { label: 'Word Wrap Tool', path: '/tools/word-wrap-tool' },
      { label: 'Password Generator', path: '/tools/password-generator' },
      { label: 'UUID Generator', path: '/tools/uuid-generator' },
      { label: 'Random Number Generator', path: '/tools/random-number-generator' },
      { label: 'Random String Generator', path: '/tools/random-string-generator' },
      { label: 'Lorem Ipsum Generator', path: '/tools/lorem-ipsum-generator' },
      { label: 'Random Data Generator', path: '/tools/random-data-generator' },
      { label: 'Business Name Generator', path: '/tools/business-name-generator' },
      { label: 'Acronym Generator', path: '/tools/acronym-generator' },
      { label: 'Hashtag Generator', path: '/tools/hashtag-generator' },
      { label: 'Coin Flip', path: '/tools/coin-flip' },
      { label: 'Typing Speed Test', path: '/tools/typing-speed-test' },
      { label: 'Wheel of Fortune', path: '/tools/wheel-of-fortune-spinner' },
      { label: 'Sudoku Generator', path: '/tools/sudoku-generator' },
      { label: 'Crossword Puzzle', path: '/tools/crossword-puzzle-generator' },
      { label: 'Prompt Builder', path: '/tools/prompt-builder' },
      { label: 'Multiplication Table', path: '/tools/multiplication-table-generator' },
      { label: 'Random Line Picker', path: '/tools/random-line-picker' },
      { label: 'Vertical Text', path: '/tools/vertical-text-generator' },
    ],
  },
  {
    label: 'Dev & Converters',
    tools: [
      { label: 'JSON Formatter', path: '/tools/json-formatter' },
      { label: 'Regex Tester', path: '/tools/regex-tester' },
      { label: 'JWT Decoder', path: '/tools/jwt-decoder' },
      { label: 'CSS Minifier', path: '/tools/css-minifier' },
      { label: 'JS Minifier', path: '/tools/js-minifier' },
      { label: 'HTML Minifier', path: '/tools/html-minifier' },
      { label: 'CSS Grid Generator', path: '/tools/css-grid-generator' },
      { label: 'Box Shadow Generator', path: '/tools/box-shadow-generator' },
      { label: 'Gradient Generator', path: '/tools/gradient-generator' },
      { label: 'Flexbox Generator', path: '/tools/flexbox-generator' },
      { label: 'QR Code Generator', path: '/tools/qr-code-generator' },
      { label: 'Cron Job Parser', path: '/tools/cron-job-parser' },
      { label: 'SQL Formatter', path: '/tools/sql-formatter' },
      { label: 'JSON to CSV', path: '/tools/json-to-csv' },
      { label: 'CSV to JSON', path: '/tools/csv-to-json' },
      { label: 'XML to JSON', path: '/tools/xml-to-json' },
      { label: 'JSON to XML', path: '/tools/json-to-xml' },
      { label: 'Base64 Encode/Decode', path: '/tools/base64-encode-decode' },
      { label: 'URL Encode/Decode', path: '/tools/url-encode-decode' },
      { label: 'HTML Entity Encode/Decode', path: '/tools/html-entity-encode-decode' },
      { label: 'Markdown to HTML', path: '/tools/markdown-to-html' },
      { label: 'PX to REM', path: '/tools/px-to-rem-converter' },
      { label: 'HEX to RGB', path: '/tools/hex-to-rgb' },
      { label: 'RGB to HEX', path: '/tools/rgb-to-hex' },
      { label: 'Binary to Text', path: '/tools/binary-to-text' },
      { label: 'Text to Binary', path: '/tools/text-to-binary' },
      { label: 'Morse Code Translator', path: '/tools/morse-code-translator' },
      { label: 'YAML to JSON', path: '/tools/yaml-to-json-converter' },
      { label: 'JSON to YAML', path: '/tools/json-to-yaml-converter' },
      { label: 'Base64 to Image', path: '/tools/base64-to-image' },
      { label: 'Image to Base64', path: '/tools/image-to-base64' },
    ],
  },
  {
    label: 'Web Tools',
    tools: [
      { label: 'Online Notepad', path: '/tools/online-notepad' },
      { label: 'Email Extractor', path: '/tools/email-extractor' },
      { label: 'EXIF Reader', path: '/tools/exif-reader' },
      { label: 'Image Converter', path: '/tools/image-converter' },
      { label: 'Mailto Link Generator', path: '/tools/mailto-link-generator' },
      { label: 'Online Image Editor', path: '/tools/online-image-editor' },
      { label: 'Phone Validator', path: '/tools/phone-validator' },
      { label: 'Text Size Calculator', path: '/tools/text-size-calculator' },
      { label: 'URL Extractor', path: '/tools/url-extractor' },
      { label: 'User Agent Parser', path: '/tools/user-agent-parser' },
      { label: 'What is My IP', path: '/tools/what-is-my-ip' },
      { label: 'WhatsApp Link Generator', path: '/tools/whatsapp-link-generator' },
      { label: 'Text Diff Tool', path: '/tools/text-diff-tool' },
      { label: 'Password Strength', path: '/tools/password-strength-checker' },
      { label: 'Readability Score', path: '/tools/text-readability-score' },
      { label: 'Word Frequency', path: '/tools/word-frequency-analyzer' },
      { label: 'Text Merger', path: '/tools/text-merger' },
      { label: 'Color Palette Generator', path: '/tools/color-palette-generator' },
      { label: 'Contrast Checker', path: '/tools/contrast-checker' },
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
              sx={{ mt: 0.5, borderRadius: 2, overflow: 'hidden', minWidth: cols * 240 }}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box>
                  <Box sx={{ px: 2, py: 1, bgcolor: '#F9F9F9', borderBottom: '1px solid #E5E5E5' }}>
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

  const allTools = navCategories.flatMap(cat => 
    cat.tools.map(tool => ({ ...tool, category: cat.label }))
  );

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
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
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

          <Box sx={{ flexGrow: 1 }} />

          {/* Search Bar */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 2, width: 280 }}>
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
                        <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    sx: { 
                      borderRadius: 8, 
                      bgcolor: '#f1f5f9', 
                      '& fieldset': { border: 'none' },
                      '&:hover': { bgcolor: '#e2e8f0' },
                      fontSize: '0.9rem'
                    }
                  }}
                />
              )}
            />
          </Box>

          {/* Mobile hamburger */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'flex-end' }}>
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
