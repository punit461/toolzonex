import type { ReactNode } from 'react';

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
import SendIcon from '@mui/icons-material/Send';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import SecurityIcon from '@mui/icons-material/Security';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import NumbersIcon from '@mui/icons-material/Numbers';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ArticleIcon from '@mui/icons-material/Article';
import TimerIcon from '@mui/icons-material/Timer';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MemoryIcon from '@mui/icons-material/Memory';
import StraightenIcon from '@mui/icons-material/Straighten';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import ScaleIcon from '@mui/icons-material/Scale';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FaceIcon from '@mui/icons-material/Face';
import HeightIcon from '@mui/icons-material/Height';

// Single source of truth for the homepage tool grid (src/app/page.tsx)
// AND the header nav (src/components/Header.tsx, which derives its nav
// groups from these categories -- see NAV_GROUPS in Header.tsx). Add a
// tool here once and it appears in both places automatically. Adding a
// brand-new category label? Add a matching entry to NAV_GROUPS in
// Header.tsx too, or it won't be reachable from the nav.
export interface ToolEntry {
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
}

export interface ToolCategory {
  label: string;
  color: string;
  tools: ToolEntry[];
}

export const categories: ToolCategory[] = [
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
      { title: 'SSY Calculator', description: 'Sukanya Samriddhi Yojana returns.', path: '/finance/ssy-calculator', icon: <SavingsIcon fontSize="large" color="primary" /> },
      { title: 'Salary Increment', description: 'Calculate salary hike percentage.', path: '/finance/salary-increment-calculator', icon: <TrendingUpIcon fontSize="large" color="primary" /> },
      { title: 'Retirement Calculator', description: 'Plan your retirement corpus.', path: '/finance/retirement-calculator', icon: <AccountBalanceIcon fontSize="large" color="primary" /> },
      { title: 'Loan Calculator', description: 'Calculate EMI and total interest.', path: '/finance/loan-calculator', icon: <AccountBalanceIcon fontSize="large" color="primary" /> },
      { title: '401(k) Calculator', description: 'Project US retirement balance with employer match.', path: '/finance/401k-calculator', icon: <SavingsIcon fontSize="large" color="primary" /> },
      { title: 'VAT Calculator', description: 'Add or remove VAT for UK, EU & more.', path: '/finance/vat-calculator', icon: <ReceiptIcon fontSize="large" color="primary" /> },
      { title: 'Paycheck Calculator', description: 'US take-home pay by state, after federal tax & FICA.', path: '/finance/paycheck-calculator', icon: <CalculateIcon fontSize="large" color="primary" /> },
      { title: 'Gratuity Calculator', description: 'Calculate your end-of-service gratuity amount.', path: '/finance/gratuity-calculator', icon: <ReceiptIcon fontSize="large" color="primary" /> },
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
      { title: 'Sleep Time Calculator', description: 'Calculate 90-min sleep cycles.', path: '/health/sleep-time-calculator', icon: <FavoriteIcon fontSize="large" color="primary" /> },
      { title: 'Body Fat Calculator', description: 'Estimate body fat percentage.', path: '/health/body-fat-calculator', icon: <MonitorWeightIcon fontSize="large" color="primary" /> },
      { title: 'Calorie Calculator', description: 'Daily calorie needs for weight goals.', path: '/health/calorie-calculator', icon: <LocalDiningIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Time & Productivity',
    color: '#eab308',
    tools: [
      { title: 'AI Pomodoro', description: 'Focus timer with session dashboard & stats.', path: '/tools/ai-pomodoro', icon: <TimerIcon fontSize="large" color="primary" /> },
      { title: 'Timer', description: 'Online countdown timer.', path: '/utilities/timer', icon: <EventIcon fontSize="large" color="primary" /> },
      { title: 'Stopwatch', description: 'Online stopwatch with laps.', path: '/utilities/stopwatch', icon: <EventIcon fontSize="large" color="primary" /> },
      { title: 'Focus Timer', description: 'Pomodoro technique timer.', path: '/utilities/focus-timer', icon: <EventIcon fontSize="large" color="primary" /> },
      { title: 'Current Time Display', description: 'World clock and local time.', path: '/utilities/current-time-display', icon: <PublicIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Utilities',
    color: '#7e3af2',
    tools: [
      { title: 'Age Calculator', description: 'Exact age in years, months & days.', path: '/utilities/age-calculator', icon: <EventIcon fontSize="large" color="primary" /> },
      { title: 'Percentage Calculator', description: 'Percentages, changes, and X% of Y.', path: '/utilities/percentage-calculator', icon: <PercentIcon fontSize="large" color="primary" /> },
      { title: 'Date Calculator', description: 'Add days to a date or find duration.', path: '/utilities/date-calculator', icon: <CalendarMonthIcon fontSize="large" color="primary" /> },
      { title: 'Margin Calculator', description: 'Calculate profit margin & markup.', path: '/utilities/margin-calculator', icon: <PercentIcon fontSize="large" color="primary" /> },
      { title: 'Discount Calculator', description: 'Calculate final price & savings.', path: '/utilities/discount-calculator', icon: <PercentIcon fontSize="large" color="primary" /> },
      { title: 'Tip Calculator', description: 'Calculate restaurant tips & split bills.', path: '/utilities/tip-calculator', icon: <PercentIcon fontSize="large" color="primary" /> },
      { title: 'Tip Screen', description: 'Fullscreen tipping display for restaurants & POS.', path: '/utilities/tip-screen', icon: <FullscreenIcon fontSize="large" color="primary" /> },
      { title: 'Fullscreen Test Screens', description: 'Color screens, pixel test, DVD screensaver & pranks.', path: '/utilities/screen-test', icon: <FullscreenIcon fontSize="large" color="primary" /> },
      { title: 'Aspect Ratio', description: 'Find proportional dimensions.', path: '/utilities/aspect-ratio-calculator', icon: <CropIcon fontSize="large" color="primary" /> },
      { title: 'Rule of Three', description: 'Solve proportional problems.', path: '/utilities/rule-of-three-calculator', icon: <CalculateIcon fontSize="large" color="primary" /> },
      { title: 'Time Calculator', description: 'Add/subtract time durations.', path: '/utilities/time-calculator', icon: <EventIcon fontSize="large" color="primary" /> },
      { title: 'Time Zone Converter', description: 'Convert local time globally.', path: '/utilities/time-zone-converter', icon: <PublicIcon fontSize="large" color="primary" /> },
      { title: 'Basic Calculator', description: 'Standard math operations.', path: '/utilities/basic-calculator', icon: <CalculateIcon fontSize="large" color="primary" /> },
      { title: 'Scientific Calculator', description: 'Advanced math operations.', path: '/utilities/scientific-calculator', icon: <CalculateIcon fontSize="large" color="primary" /> },
      { title: 'Prime Number Checker', description: 'Check prime or composite.', path: '/utilities/prime-number-checker', icon: <CalculateIcon fontSize="large" color="primary" /> },
      { title: 'Barcode Generator', description: 'Create 1D barcodes instantly.', path: '/utilities/barcode-generator', icon: <CropIcon fontSize="large" color="primary" /> },
      { title: 'Game Score Tracker', description: 'Live scoreboard & leaderboard.', path: '/utilities/game-score-tracker', icon: <EventIcon fontSize="large" color="primary" /> },
      { title: 'Algorithm Visualizer', description: 'Watch sorting algorithms in real-time.', path: '/utilities/algorithm-visualizer', icon: <CalculateIcon fontSize="large" color="primary" /> },
      { title: 'Alphabet Learning Tool', description: 'ABC flashcards with emojis & sound.', path: '/utilities/alphabet-learning-tool', icon: <EventIcon fontSize="large" color="primary" /> },
      { title: 'Number to Words', description: 'Convert numbers to English words.', path: '/utilities/number-to-words-converter', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Roman Numeral', description: 'Numbers to Roman numerals.', path: '/utilities/roman-numeral-converter', icon: <NumbersIcon fontSize="large" color="primary" /> },
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
      { title: 'Text Diff Tool', description: 'Compare two texts to see differences.', path: '/tools/text-diff-tool', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Password Strength', description: 'Test your password security.', path: '/tools/password-strength-checker', icon: <SecurityIcon fontSize="large" color="primary" /> },
      { title: 'Readability Score', description: 'Calculate Flesch-Kincaid grade level.', path: '/tools/text-readability-score', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'Word Frequency', description: 'Find the most used words in text.', path: '/tools/word-frequency-analyzer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Merger', description: 'Merge two lists of text line by line.', path: '/tools/text-merger', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Color Palette Generator', description: 'Generate beautiful random colors.', path: '/tools/color-palette-generator', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Contrast Checker', description: 'Check WCAG color accessibility.', path: '/tools/contrast-checker', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'PDF Tools', description: 'Merge, split, rotate, watermark & convert PDFs.', path: '/tools/pdf-tools', icon: <PictureAsPdfIcon fontSize="large" color="primary" /> },
      { title: 'Face Shape Detector', description: 'Find your face shape from a photo.', path: '/tools/face-shape-detector', icon: <FaceIcon fontSize="large" color="primary" /> },
      { title: 'Height Comparison', description: 'Compare heights with scaled bars.', path: '/tools/height-comparison', icon: <HeightIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Text Tools',
    color: '#0284c7',
    tools: [
      { title: 'Text Sorter', description: 'Sort lines alphabetically or by length.', path: '/text-tools/text-sorter', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Word Counter', description: 'Count words, characters, and reading time.', path: '/text-tools/word-counter', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Reverser', description: 'Reverse text, words, or letters.', path: '/text-tools/text-reverser', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Duplicates Remover', description: 'Remove duplicate lines from text.', path: '/text-tools/duplicates-remover', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Duplicate Word Finder', description: 'Find duplicate words in text.', path: '/text-tools/duplicate-word-finder', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Line Numbering', description: 'Add line numbers to text.', path: '/text-tools/line-numbering', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Stats Analyzer', description: 'Detailed text statistics and readability.', path: '/text-tools/text-stats-analyzer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'String Escaper', description: 'Escape or unescape JSON/HTML/URL.', path: '/text-tools/string-escaper', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Whitespace Cleaner', description: 'Remove extra spaces and empty lines.', path: '/text-tools/whitespace-cleaner', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Keyword Density', description: 'Analyze SEO keyword density.', path: '/text-tools/keyword-density-analyzer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Character Distribution', description: 'Analyze character frequencies.', path: '/text-tools/character-distribution-analyzer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Splitter', description: 'Split text into chunks.', path: '/text-tools/text-splitter', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Sentence Case Fixer', description: 'Fix capitalization errors.', path: '/text-tools/sentence-case-fixer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Prefix & Suffix', description: 'Add prefix or suffix to lines.', path: '/text-tools/line-prefix-suffix-tool', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Repeater', description: 'Repeat text multiple times.', path: '/text-tools/text-repeater', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Encryption', description: 'Encrypt text using Base64/ROT13.', path: '/text-tools/text-encryption-decryption', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Palindrome Checker', description: 'Check if text is a palindrome.', path: '/text-tools/palindrome-checker', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Text Case Mixer', description: 'Random or alternating casing.', path: '/text-tools/text-case-mixer', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Word Wrap Tool', description: 'Wrap text to a column limit.', path: '/text-tools/word-wrap-tool', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Word Scrambler', description: 'Scramble letters in words or text.', path: '/text-tools/word-scrambler', icon: <ShuffleIcon fontSize="large" color="primary" /> },
      { title: 'Leetspeak Converter', description: 'Convert text to 1337 speak.', path: '/text-tools/leetspeak-converter', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Generators',
    color: '#e11d48',
    tools: [
      { title: 'Password Generator', description: 'Generate secure passwords.', path: '/generators/password-generator', icon: <SecurityIcon fontSize="large" color="primary" /> },
      { title: 'UUID Generator', description: 'Generate v4 UUIDs.', path: '/generators/uuid-generator', icon: <FingerprintIcon fontSize="large" color="primary" /> },
      { title: 'Random Number', description: 'Generate random numbers.', path: '/generators/random-number-generator', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Random String', description: 'Generate random strings.', path: '/generators/random-string-generator', icon: <TextFormatIcon fontSize="large" color="primary" /> },
      { title: 'Lorem Ipsum', description: 'Generate dummy text.', path: '/generators/lorem-ipsum-generator', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'Random Data', description: 'Generate fake names & addresses.', path: '/generators/random-data-generator', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'Business Name', description: 'Generate startup name ideas.', path: '/generators/business-name-generator', icon: <TextFormatIcon fontSize="large" color="primary" /> },
      { title: 'Acronym Generator', description: 'Convert phrases to acronyms.', path: '/generators/acronym-generator', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Hashtag Generator', description: 'Extract hashtags from text.', path: '/generators/hashtag-generator', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Coin Flip', description: 'Flip a virtual coin.', path: '/generators/coin-flip', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Typing Speed Test', description: 'Check WPM typing speed.', path: '/generators/typing-speed-test', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Wheel of Fortune', description: 'Spin wheel decision maker.', path: '/generators/wheel-of-fortune-spinner', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Sudoku Generator', description: 'Printable Sudoku puzzles.', path: '/generators/sudoku-generator', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Crossword Puzzle', description: 'Create custom crosswords.', path: '/generators/crossword-puzzle-generator', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Prompt Builder', description: 'Optimize ChatGPT prompts.', path: '/generators/prompt-builder', icon: <TextFormatIcon fontSize="large" color="primary" /> },
      { title: 'Multiplication Table', description: 'Printable math tables.', path: '/generators/multiplication-table-generator', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Random Line Picker', description: 'Pick a random winner from a list.', path: '/generators/random-line-picker', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Vertical Text', description: 'Convert text to vertical format.', path: '/generators/vertical-text-generator', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Converters',
    color: '#8b5cf6',
    tools: [
      { title: 'JSON to CSV', description: 'Convert JSON to CSV format.', path: '/converters/json-to-csv', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'CSV to JSON', description: 'Convert CSV to JSON arrays.', path: '/converters/csv-to-json', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'XML to JSON', description: 'Parse XML to JSON data.', path: '/converters/xml-to-json', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'JSON to XML', description: 'Convert JSON to XML format.', path: '/converters/json-to-xml', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'Base64 Encode/Decode', description: 'Encode/decode base64 strings.', path: '/converters/base64-encode-decode', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'URL Encode/Decode', description: 'URL encode or decode text.', path: '/converters/url-encode-decode', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'HTML Entity Encoder', description: 'Encode/decode HTML entities.', path: '/converters/html-entity-encode-decode', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'Markdown to HTML', description: 'Convert MD to raw HTML.', path: '/converters/markdown-to-html', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'PX to REM', description: 'Convert pixels to REM units.', path: '/converters/px-to-rem-converter', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'HEX to RGB', description: 'Convert HEX colors to RGB.', path: '/converters/hex-to-rgb', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'RGB to HEX', description: 'Convert RGB colors to HEX.', path: '/converters/rgb-to-hex', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Binary to Text', description: 'Decode binary code to text.', path: '/converters/binary-to-text', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Text to Binary', description: 'Encode text into binary.', path: '/converters/text-to-binary', icon: <NumbersIcon fontSize="large" color="primary" /> },
      { title: 'Morse Code Translator', description: 'Translate morse code text.', path: '/converters/morse-code-translator', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
      { title: 'YAML to JSON', description: 'Convert YAML to JSON format.', path: '/converters/yaml-to-json-converter', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'JSON to YAML', description: 'Convert JSON to YAML format.', path: '/converters/json-to-yaml-converter', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'Base64 to Image', description: 'Decode Base64 strings to images.', path: '/converters/base64-to-image', icon: <ImageIcon fontSize="large" color="primary" /> },
      { title: 'Image to Base64', description: 'Encode images to Base64 strings.', path: '/converters/image-to-base64', icon: <ImageIcon fontSize="large" color="primary" /> },
      { title: 'Length Converter', description: 'Convert meters, feet, miles, inches & more.', path: '/converters/length-converter', icon: <StraightenIcon fontSize="large" color="primary" /> },
      { title: 'Temperature Converter', description: 'Convert Celsius, Fahrenheit & Kelvin.', path: '/converters/temperature-converter', icon: <DeviceThermostatIcon fontSize="large" color="primary" /> },
      { title: 'Area Converter', description: 'Convert square meters, acres, hectares & more.', path: '/converters/area-converter', icon: <CropSquareIcon fontSize="large" color="primary" /> },
      { title: 'Volume Converter', description: 'Convert liters, gallons, cups & more.', path: '/converters/volume-converter', icon: <LocalDrinkIcon fontSize="large" color="primary" /> },
      { title: 'Weight Converter', description: 'Convert kilograms, pounds, ounces & more.', path: '/converters/weight-converter', icon: <ScaleIcon fontSize="large" color="primary" /> },
      { title: 'Time Converter', description: 'Convert seconds, minutes, hours, days & more.', path: '/converters/time-converter', icon: <ScheduleIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Developer Tools',
    color: '#0ea5e9',
    tools: [
      { title: 'JSON Formatter', description: 'Format and validate JSON data.', path: '/developer-tools/json-formatter', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'Regex Tester', description: 'Test and debug regex patterns.', path: '/developer-tools/regex-tester', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'JWT Decoder', description: 'Decode JSON Web Tokens securely.', path: '/developer-tools/jwt-decoder', icon: <SecurityIcon fontSize="large" color="primary" /> },
      { title: 'CSS Minifier', description: 'Compress CSS code instantly.', path: '/developer-tools/css-minifier', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'JS Minifier', description: 'Compress JavaScript code instantly.', path: '/developer-tools/js-minifier', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'HTML Minifier', description: 'Compress HTML payload size.', path: '/developer-tools/html-minifier', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'CSS Grid Generator', description: 'Visually generate CSS Grids.', path: '/developer-tools/css-grid-generator', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Box Shadow Generator', description: 'Create CSS drop shadows.', path: '/developer-tools/box-shadow-generator', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Gradient Generator', description: 'Generate CSS linear gradients.', path: '/developer-tools/gradient-generator', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'Flexbox Generator', description: 'Generate CSS Flexbox layouts.', path: '/developer-tools/flexbox-generator', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'QR Code Generator', description: 'Create custom QR codes free.', path: '/developer-tools/qr-code-generator', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'Cron Job Parser', description: 'Translate cron to plain English.', path: '/developer-tools/cron-job-parser', icon: <ArticleIcon fontSize="large" color="primary" /> },
      { title: 'SQL Formatter', description: 'Beautify messy SQL queries.', path: '/developer-tools/sql-formatter', icon: <ArticleIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'AI',
    color: '#7c3aed',
    tools: [
      { title: 'LLM API Cost Calculator', description: 'Estimate GPT, Claude & Gemini token costs.', path: '/ai/llm-cost-calculator', icon: <SmartToyIcon fontSize="large" color="primary" /> },
      { title: 'GPU Cloud Cost Calculator', description: 'Estimate A100, H100 & RTX cloud GPU rental costs.', path: '/ai/gpu-cost-calculator', icon: <MemoryIcon fontSize="large" color="primary" /> },
    ],
  },
];
