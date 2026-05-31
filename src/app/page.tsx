'use client';

import { Box, Typography, Card, CardContent, CardActionArea, Chip } from '@mui/material';
import RouterLink from 'next/link';

import CalculateIcon from '@mui/icons-material/Calculate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import EventIcon from '@mui/icons-material/Event';
import SavingsIcon from '@mui/icons-material/Savings';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PercentIcon from '@mui/icons-material/Percent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DiamondIcon from '@mui/icons-material/Diamond';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import WorkIcon from '@mui/icons-material/Work';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LinkIcon from '@mui/icons-material/Link';
import EmailIcon from '@mui/icons-material/Email';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import CropIcon from '@mui/icons-material/Crop';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PhoneIcon from '@mui/icons-material/Phone';
import ComputerIcon from '@mui/icons-material/Computer';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import SendIcon from '@mui/icons-material/Send';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import SecurityIcon from '@mui/icons-material/Security';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import NumbersIcon from '@mui/icons-material/Numbers';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ArticleIcon from '@mui/icons-material/Article';

const categories = [
  {
    label: 'Finance',
    color: '#1a56db',
    tools: [
      { title: 'EMI Calculator', description: 'Calculate Home, Car & Personal Loan EMI.', path: '/finance/emi-calculator', icon: <CalculateIcon fontSize="large" color="primary" /> },
      { title: 'SIP Calculator', description: 'Estimate Mutual Fund SIP returns.', path: '/finance/sip-calculator', icon: <TrendingUpIcon fontSize="large" color="primary" /> },
      { title: 'GST Calculator', description: 'Add or remove GST from any amount.', path: '/finance/gst-calculator', icon: <ReceiptIcon fontSize="large" color="primary" /> },
      { title: 'Income Tax Calculator', description: 'Compare Old vs New Tax Regime.', path: '/finance/income-tax-calculator', icon: <AccountBalanceIcon fontSize="large" color="primary" /> },
      { title: 'PPF Calculator', description: 'Calculate PPF maturity with compounding.', path: '/finance/ppf-calculator', icon: <SavingsIcon fontSize="large" color="primary" /> },
      { title: 'Rent vs Buy Calculator', description: 'Is buying always better than renting?', path: '/finance/rent-vs-buy-calculator', icon: <HomeWorkIcon fontSize="large" color="primary" /> },
      { title: 'Gold Rate Calculator', description: 'Gold price with making charges & GST.', path: '/finance/gold-calculator', icon: <DiamondIcon fontSize="large" color="primary" /> },
      { title: 'Silver Rate Calculator', description: 'Silver price with making charges & GST.', path: '/finance/silver-calculator', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'SSY Calculator', description: 'Sukanya Samriddhi Yojana maturity value.', path: '/finance/ssy-calculator', icon: <ChildCareIcon fontSize="large" color="primary" /> },
      { title: 'Salary Increment Calculator', description: 'Calculate new CTC and monthly take-home.', path: '/finance/salary-increment-calculator', icon: <TrendingUpIcon fontSize="large" color="primary" /> },
      { title: 'Retirement Calculator', description: 'Calculate retirement corpus and required SIP.', path: '/finance/retirement-calculator', icon: <AccountBalanceIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Health',
    color: '#057a55',
    tools: [
      { title: 'BMI Calculator', description: 'Body Mass Index with Indian guidelines.', path: '/health/bmi-calculator', icon: <MonitorWeightIcon fontSize="large" color="primary" /> },
      { title: 'BMR Calculator', description: 'Basal Metabolic Rate using Mifflin-St Jeor.', path: '/health/bmr-calculator', icon: <FavoriteIcon fontSize="large" color="primary" /> },
      { title: 'TDEE Calculator', description: 'Total Daily Energy Expenditure by activity.', path: '/health/tdee-calculator', icon: <LocalDiningIcon fontSize="large" color="primary" /> },
      { title: 'PFT Calculator', description: 'Physical Fitness Test grading for Army, NDA & CDS.', path: '/health/pft-calculator', icon: <DirectionsRunIcon fontSize="large" color="primary" /> },
      { title: 'CFT Calculator', description: 'Combat Fitness Test grade for defence personnel.', path: '/health/cft-calculator', icon: <MilitaryTechIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Utilities',
    color: '#7e3af2',
    tools: [
      { title: 'Age Calculator', description: 'Exact age in years, months & days.', path: '/utilities/age-calculator', icon: <EventIcon fontSize="large" color="primary" /> },
      { title: 'Percentage Calculator', description: 'Percentages, changes, and X% of Y.', path: '/utilities/percentage-calculator', icon: <PercentIcon fontSize="large" color="primary" /> },
      { title: 'Date Calculator', description: 'Add days to a date or find duration.', path: '/utilities/date-calculator', icon: <CalendarMonthIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Tools',
    color: '#c27803',
    tools: [
      { title: 'Online Notepad', description: 'Free notepad with auto-save & word count.', path: '/tools/online-notepad', icon: <NoteAltIcon fontSize="large" color="primary" /> },
      { title: 'What Is My IP', description: 'Find your public IP address instantly.', path: '/tools/what-is-my-ip', icon: <PublicIcon fontSize="large" color="primary" /> },
      { title: 'WhatsApp Link Generator', description: 'Create WhatsApp click-to-chat links.', path: '/tools/whatsapp-link-generator', icon: <SendIcon fontSize="large" color="primary" /> },
      { title: 'Mailto Link Generator', description: 'Create email links with subject & body.', path: '/tools/mailto-link-generator', icon: <AttachEmailIcon fontSize="large" color="primary" /> },
      { title: 'Text Size Calculator', description: 'Character count, word count & reading time.', path: '/tools/text-size-calculator', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Email Extractor', description: 'Extract email addresses from any text.', path: '/tools/email-extractor', icon: <EmailIcon fontSize="large" color="primary" /> },
      { title: 'URL Extractor', description: 'Extract URLs and links from any text.', path: '/tools/url-extractor', icon: <LinkIcon fontSize="large" color="primary" /> },
      { title: 'EXIF Reader', description: 'Read image metadata and camera info.', path: '/tools/exif-reader', icon: <PhotoCameraIcon fontSize="large" color="primary" /> },
      { title: 'Phone Validator', description: 'Validate phone numbers with country code.', path: '/tools/phone-validator', icon: <PhoneIcon fontSize="large" color="primary" /> },
      { title: 'User Agent Parser', description: 'Parse browser and device from UA string.', path: '/tools/user-agent-parser', icon: <ComputerIcon fontSize="large" color="primary" /> },
      { title: 'Image Resizer', description: 'Resize images online easily.', path: '/tools/image-resizer', icon: <CropIcon fontSize="large" color="primary" /> },
      { title: 'Image Converter', description: 'Convert images between PNG, JPEG, WebP.', path: '/tools/image-converter', icon: <ImageIcon fontSize="large" color="primary" /> },
      { title: 'Online Image Editor', description: 'Edit images with filters & adjustments.', path: '/tools/online-image-editor', icon: <PhotoCameraIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Text Tools',
    color: '#0284c7',
    tools: [
      { title: 'Text Sorter', description: 'Sort lines alphabetically or by length.', path: '/tools/text-sorter', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Word Counter', description: 'Count words, characters, and reading time.', path: '/tools/word-counter', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Reverser', description: 'Reverse text, words, or letters.', path: '/tools/text-reverser', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Duplicates Remover', description: 'Remove duplicate lines from text.', path: '/tools/duplicates-remover', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Duplicate Word Finder', description: 'Find duplicate words in text.', path: '/tools/duplicate-word-finder', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Line Numbering', description: 'Add line numbers to text.', path: '/tools/line-numbering', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Stats Analyzer', description: 'Detailed text statistics and readability.', path: '/tools/text-stats-analyzer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'String Escaper', description: 'Escape or unescape JSON/HTML/URL.', path: '/tools/string-escaper', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Whitespace Cleaner', description: 'Remove extra spaces and empty lines.', path: '/tools/whitespace-cleaner', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Keyword Density', description: 'Analyze SEO keyword density.', path: '/tools/keyword-density-analyzer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Character Distribution', description: 'Analyze character frequencies.', path: '/tools/character-distribution-analyzer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Splitter', description: 'Split text into chunks.', path: '/tools/text-splitter', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Sentence Case Fixer', description: 'Fix capitalization errors.', path: '/tools/sentence-case-fixer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Prefix & Suffix', description: 'Add prefix or suffix to lines.', path: '/tools/line-prefix-suffix-tool', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Repeater', description: 'Repeat text multiple times.', path: '/tools/text-repeater', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Encryption', description: 'Encrypt text using Base64/ROT13.', path: '/tools/text-encryption-decryption', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Palindrome Checker', description: 'Check if text is a palindrome.', path: '/tools/palindrome-checker', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Case Mixer', description: 'Random or alternating casing.', path: '/tools/text-case-mixer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Word Wrap Tool', description: 'Wrap text to a column limit.', path: '/tools/word-wrap-tool', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Generators',
    color: '#e11d48',
    tools: [
      { title: 'Password Generator', description: 'Generate secure passwords.', path: '/tools/password-generator', icon: <SecurityIcon fontSize="large" color="primary" /> },
      { title: 'UUID Generator', description: 'Generate v4 UUIDs.', path: '/tools/uuid-generator', icon: <FingerprintIcon fontSize="large" color="primary" /> },
      { title: 'Random Number', description: 'Generate random numbers.', path: '/tools/random-number-generator', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Random String', description: 'Generate random strings.', path: '/tools/random-string-generator', icon: <TextFormatIcon fontSize="large" color="primary" /> },
      { title: 'Lorem Ipsum', description: 'Generate dummy text.', path: '/tools/lorem-ipsum-generator', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'Random Data', description: 'Generate fake names & addresses.', path: '/tools/random-data-generator', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'Business Name', description: 'Generate startup name ideas.', path: '/tools/business-name-generator', icon: <TextFormatIcon fontSize="large" color="primary" /> },
      { title: 'Acronym Generator', description: 'Convert phrases to acronyms.', path: '/tools/acronym-generator', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Hashtag Generator', description: 'Extract hashtags from text.', path: '/tools/hashtag-generator', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Coin Flip', description: 'Flip a virtual coin.', path: '/tools/coin-flip', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Typing Speed Test', description: 'Check WPM typing speed.', path: '/tools/typing-speed-test', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Wheel of Fortune', description: 'Spin wheel decision maker.', path: '/tools/wheel-of-fortune-spinner', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Sudoku Generator', description: 'Printable Sudoku puzzles.', path: '/tools/sudoku-generator', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Crossword Puzzle', description: 'Create custom crosswords.', path: '/tools/crossword-puzzle-generator', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Prompt Builder', description: 'Optimize ChatGPT prompts.', path: '/tools/prompt-builder', icon: <TextFormatIcon fontSize="large" color="primary" /> },
      { title: 'Multiplication Table', description: 'Printable math tables.', path: '/tools/multiplication-table-generator', icon: <NumbersIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Converters',
    color: '#8b5cf6',
    tools: [
      { title: 'JSON to CSV', description: 'Convert JSON to CSV format.', path: '/tools/json-to-csv', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'CSV to JSON', description: 'Convert CSV to JSON arrays.', path: '/tools/csv-to-json', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'XML to JSON', description: 'Parse XML to JSON data.', path: '/tools/xml-to-json', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'JSON to XML', description: 'Convert JSON to XML format.', path: '/tools/json-to-xml', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'Base64 Encode/Decode', description: 'Encode/decode base64 strings.', path: '/tools/base64-encode-decode', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'URL Encode/Decode', description: 'URL encode or decode text.', path: '/tools/url-encode-decode', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'HTML Entity Encoder', description: 'Encode/decode HTML entities.', path: '/tools/html-entity-encode-decode', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Markdown to HTML', description: 'Convert MD to raw HTML.', path: '/tools/markdown-to-html', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'PX to REM', description: 'Convert pixels to REM units.', path: '/tools/px-to-rem-converter', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'HEX to RGB', description: 'Convert HEX colors to RGB.', path: '/tools/hex-to-rgb', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'RGB to HEX', description: 'Convert RGB colors to HEX.', path: '/tools/rgb-to-hex', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Binary to Text', description: 'Decode binary code to text.', path: '/tools/binary-to-text', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Text to Binary', description: 'Encode text into binary.', path: '/tools/text-to-binary', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Morse Code Translator', description: 'Translate morse code text.', path: '/tools/morse-code-translator', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
    ],
  },
];

const Home = () => {
  return (
    <>
      {/* Hero */}
      <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 }, mb: 4 }}>
        {/* <Box component="img" src="/toolzonex/logo.png" alt="ToolZoneX" sx={{ height: { xs: 60, md: 80 }, mb: 3 }} /> */}
        <Typography variant="h1" gutterBottom sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' } }}>
          Smart Tools for Every Decision
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '580px', mx: 'auto', fontWeight: 400 }}>
          Finance, health, utilities, and online tools — built for India, designed to be fast.
        </Typography>
      </Box>

      {/* Tool grid by category */}
      {categories.map((cat) => (
        <Box key={cat.label} sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.75rem' } }}>
              {cat.label}
            </Typography>
            <Chip label={`${cat.tools.length} tools`} size="small" sx={{ bgcolor: cat.color, color: '#fff', fontWeight: 700 }} />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {cat.tools.map((tool) => (
              <Card
                key={tool.path}
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                }}
              >
                <CardActionArea component={RouterLink} href={tool.path} sx={{ height: '100%', p: 1 }}>
                  <CardContent>
                    <Box sx={{ mb: 1.5 }}>{tool.icon}</Box>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.05rem' }}>
                      {tool.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tool.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Home;
