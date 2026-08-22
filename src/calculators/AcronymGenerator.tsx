'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, ToggleButtonGroup, ToggleButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

// Curated list of well-known acronyms — not exhaustive, so lookups fall back
// to backronym generation below rather than pretending to have every acronym.
const KNOWN_ACRONYMS: Record<string, string> = {
  NASA: 'National Aeronautics and Space Administration',
  ASAP: 'As Soon As Possible',
  FYI: 'For Your Information',
  DIY: 'Do It Yourself',
  LOL: 'Laughing Out Loud',
  ATM: 'Automated Teller Machine',
  PDF: 'Portable Document Format',
  FAQ: 'Frequently Asked Questions',
  CEO: 'Chief Executive Officer',
  CFO: 'Chief Financial Officer',
  HR: 'Human Resources',
  IT: 'Information Technology',
  NGO: 'Non-Governmental Organization',
  WHO: 'World Health Organization',
  UNESCO: 'United Nations Educational, Scientific and Cultural Organization',
  NATO: 'North Atlantic Treaty Organization',
  RADAR: 'Radio Detection and Ranging',
  LASER: 'Light Amplification by Stimulated Emission of Radiation',
  SCUBA: 'Self-Contained Underwater Breathing Apparatus',
  AWOL: 'Absent Without Leave',
  ETA: 'Estimated Time of Arrival',
  RSVP: 'Répondez S\'il Vous Plaît',
  USB: 'Universal Serial Bus',
  HTML: 'HyperText Markup Language',
  URL: 'Uniform Resource Locator',
  SEO: 'Search Engine Optimization',
  AI: 'Artificial Intelligence',
  API: 'Application Programming Interface',
  GPS: 'Global Positioning System',
  BTW: 'By The Way',
  IMO: 'In My Opinion',
  TBD: 'To Be Determined',
  TBA: 'To Be Announced',
  RIP: 'Rest In Peace',
  VIP: 'Very Important Person',
  DOB: 'Date Of Birth',
  ID: 'Identification',
  OK: 'Oll Korrect (origin disputed, now just "okay")',
};

// A small word bank per starting letter, used to generate a playful backronym
// when the input isn't a recognized real-world acronym.
const WORD_BANK: Record<string, string[]> = {
  A: ['Amazing', 'Awesome', 'Active', 'Ancient', 'Agile'],
  B: ['Bold', 'Bright', 'Brave', 'Busy', 'Brilliant'],
  C: ['Clever', 'Curious', 'Creative', 'Calm', 'Cosmic'],
  D: ['Dynamic', 'Daring', 'Determined', 'Dazzling', 'Diligent'],
  E: ['Epic', 'Eager', 'Elegant', 'Energetic', 'Excellent'],
  F: ['Fast', 'Friendly', 'Fearless', 'Fun', 'Focused'],
  G: ['Great', 'Genuine', 'Golden', 'Graceful', 'Gutsy'],
  H: ['Happy', 'Honest', 'Heroic', 'Handy', 'Hopeful'],
  I: ['Innovative', 'Inspired', 'Incredible', 'Independent', 'Ideal'],
  J: ['Joyful', 'Jolly', 'Judicious', 'Jazzy', 'Just'],
  K: ['Keen', 'Kind', 'Knowledgeable', 'Kinetic', 'Krafty'],
  L: ['Lively', 'Loyal', 'Legendary', 'Lucky', 'Logical'],
  M: ['Mighty', 'Mindful', 'Modern', 'Magnetic', 'Motivated'],
  N: ['Noble', 'Nimble', 'Notable', 'Nifty', 'Novel'],
  O: ['Optimistic', 'Original', 'Outstanding', 'Open', 'Organized'],
  P: ['Positive', 'Powerful', 'Playful', 'Precise', 'Proud'],
  Q: ['Quick', 'Quirky', 'Quiet', 'Quality-driven', 'Quintessential'],
  R: ['Reliable', 'Radiant', 'Resourceful', 'Robust', 'Rapid'],
  S: ['Smart', 'Steady', 'Swift', 'Strong', 'Sincere'],
  T: ['Talented', 'Thoughtful', 'Tenacious', 'Trusted', 'Tireless'],
  U: ['Unique', 'Upbeat', 'Unstoppable', 'United', 'Uplifting'],
  V: ['Vibrant', 'Versatile', 'Visionary', 'Valiant', 'Vivid'],
  W: ['Wise', 'Willing', 'Witty', 'Wholesome', 'Wonderful'],
  X: ['eXtraordinary', 'eXpert', 'eXcellent', 'eXact', 'eXceptional'],
  Y: ['Youthful', 'Yielding', 'Yearning'],
  Z: ['Zealous', 'Zesty', 'Zippy'],
};

const NOUN_BANK: Record<string, string[]> = {
  A: ['Achiever', 'Analyst', 'Adventurer'],
  B: ['Builder', 'Believer', 'Backer'],
  C: ['Coder', 'Creator', 'Champion'],
  D: ['Doer', 'Designer', 'Dreamer'],
  E: ['Engineer', 'Explorer', 'Expert'],
  F: ['Founder', 'Finisher', 'Friend'],
  G: ['Guide', 'Genius', 'Guardian'],
  H: ['Helper', 'Hero', 'Hacker'],
  I: ['Innovator', 'Investor', 'Inventor'],
  J: ['Journeyer', 'Judge', 'Juggler'],
  K: ['Keeper', 'Knight', 'Key-player'],
  L: ['Leader', 'Learner', 'Listener'],
  M: ['Maker', 'Manager', 'Mentor'],
  N: ['Navigator', 'Networker', 'Notetaker'],
  O: ['Organizer', 'Optimizer', 'Operator'],
  P: ['Planner', 'Pioneer', 'Producer'],
  Q: ['Questioner', 'Quant', 'Quarterback'],
  R: ['Researcher', 'Runner', 'Rebel'],
  S: ['Strategist', 'Scientist', 'Solver'],
  T: ['Thinker', 'Teacher', 'Team-player'],
  U: ['Underdog', 'Upstart', 'Uniter'],
  V: ['Visionary', 'Volunteer', 'Voyager'],
  W: ['Writer', 'Worker', 'Winner'],
  X: ['X-factor'],
  Y: ['Yielder'],
  Z: ['Zealot'],
};

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateBackronym = (letters: string): string =>
  letters
    .split('')
    .map((letter, i) => {
      const upper = letter.toUpperCase();
      if (i === letters.length - 1 && NOUN_BANK[upper]) return pick(NOUN_BANK[upper]);
      return WORD_BANK[upper] ? pick(WORD_BANK[upper]) : upper;
    })
    .join(' ');

const AcronymGeneratorContent = () => {
  const [mode, setMode] = useState<'toAcronym' | 'toWords'>('toAcronym');

  const [text, setText] = useState('');
  const [acronym, setAcronym] = useState('');

  const generateAcronym = () => {
    if (!text.trim()) {
      setAcronym('');
      return;
    }

    // Ignore stop words in acronym generation like 'and', 'or', 'of', 'the'
    const stopwords = ['and', 'or', 'of', 'the', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'with'];

    const words = text
      .replace(/[^a-zA-Z\s]/g, '') // Remove punctuation
      .split(/\s+/)
      .filter(w => w.length > 0 && !stopwords.includes(w.toLowerCase()));

    const result = words.map(word => word[0].toUpperCase()).join('');
    setAcronym(result);
  };

  const [letters, setLetters] = useState('');
  const [expansion, setExpansion] = useState<{ text: string; isKnown: boolean } | null>(null);

  const expandAcronym = () => {
    const cleaned = letters.replace(/[^a-zA-Z]/g, '').toUpperCase();
    if (!cleaned) {
      setExpansion(null);
      return;
    }
    const known = KNOWN_ACRONYMS[cleaned];
    if (known) {
      setExpansion({ text: known, isKnown: true });
    } else {
      setExpansion({ text: generateBackronym(cleaned), isKnown: false });
    }
  };

  const copyResult = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, value) => value && setMode(value)}
        fullWidth
      >
        <ToggleButton value="toAcronym">Phrase → Acronym</ToggleButton>
        <ToggleButton value="toWords">Acronym → Words</ToggleButton>
      </ToggleButtonGroup>

      {mode === 'toAcronym' ? (
        <>
          <Box>
            <TextField
              label="Enter Phrase or Title"
              placeholder="e.g. National Aeronautics and Space Administration"
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            />

            <Button variant="contained" onClick={generateAcronym} size="large">
              Generate Acronym
            </Button>
          </Box>

          {acronym && (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '0.1em', mb: 2, color: 'primary.main' }}>
                {acronym}
              </Typography>
              <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => copyResult(acronym)}>
                Copy Acronym
              </Button>
            </Paper>
          )}
        </>
      ) : (
        <>
          <Box>
            <TextField
              label="Enter an Acronym"
              placeholder="e.g. NASA"
              value={letters}
              onChange={(e) => setLetters(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={expandAcronym} size="large">
                Expand Acronym
              </Button>
              {expansion && !expansion.isKnown && (
                <Button variant="outlined" startIcon={<CasinoIcon />} onClick={expandAcronym} size="large">
                  Reroll
                </Button>
              )}
            </Box>
          </Box>

          {expansion && (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
                {expansion.text}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {expansion.isKnown
                  ? 'Recognized meaning from our common-acronyms list.'
                  : `Not a recognized acronym — this is a generated backronym for "${letters.replace(/[^a-zA-Z]/g, '').toUpperCase()}".`}
              </Typography>
              <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => copyResult(expansion.text)}>
                Copy
              </Button>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

const AcronymGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">What is an Acronym Generator?</Typography>
      <Typography variant="body1">
        This tool works both ways. <strong>Phrase → Acronym</strong> takes a long phrase or title (like "World
        Health Organization") and converts it into a concise acronym ("WHO") — it works as a
        <strong> word abbreviation generator</strong> or <strong>abbreviations maker</strong>, automatically
        ignoring common stop words like "and", "the", and "of". <strong>Acronym → Words</strong> does the
        reverse: enter an existing acronym and it looks up its real meaning if it's a recognized one (from a
        curated list of common acronyms), or generates a fun <strong>backronym</strong> — a sentence built one
        word per letter — if it isn't, making it an <strong>acronymic sentence generator</strong> as well.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Phrase → Acronym: &quot;National Aeronautics and Space Administration&quot; becomes &quot;NASA&quot; —
        the word &quot;and&quot; is automatically skipped. &quot;As Soon As Possible&quot; becomes
        &quot;ASAP&quot;, and &quot;For Your Information&quot; becomes &quot;FYI&quot;. Acronym → Words:
        entering &quot;NASA&quot; returns its real meaning, &quot;National Aeronautics and Space
        Administration&quot;; entering letters that aren&apos;t a recognized acronym, like
        &quot;SEOX&quot;, instead generates a playful backronym such as &quot;Smart Energetic Optimistic
        X-factor&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a short name or brand acronym from a longer company or project name.</li>
          <li>Generating memorable acronyms for study or presentation titles.</li>
          <li>Turning a long team, department, or product name into a short abbreviation people can say quickly.</li>
          <li>Making a quick abbreviation for a repeated phrase in notes, documentation, or messaging.</li>
          <li>Looking up what a common acronym stands for.</li>
          <li>Generating a fun backronym sentence to fit an existing set of initials — e.g. for a team name or username.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it always skip small words like &quot;and&quot; and &quot;the&quot;?</Typography>
      <Typography variant="body1">
        Yes, common stop words (and, or, of, the, a, an, in, on, at, for, to, with) are excluded by default so
        the acronym reads more naturally.
      </Typography>
      <Typography variant="h3">How do I create an abbreviation from a phrase?</Typography>
      <Typography variant="body1">
        Type or paste the full phrase or title into the input box and click &quot;Generate Acronym&quot; — the
        tool takes the first letter of each significant word (skipping stop words) and joins them into an
        uppercase abbreviation.
      </Typography>
      <Typography variant="h3">Can this tool expand an acronym back into the full words it stands for?</Typography>
      <Typography variant="body1">
        Yes, in the &quot;Acronym → Words&quot; mode. For well-known acronyms (like NASA, ASAP, or WHO) it
        returns the real, recognized meaning from a curated list. That list isn&apos;t exhaustive — for
        anything it doesn&apos;t recognize, it instead generates a backronym: a plausible-sounding sentence
        built one word per letter, clearly labeled as generated rather than an official meaning. Click
        &quot;Reroll&quot; to get a different backronym for the same letters.
      </Typography>
      <Typography variant="h3">Is this the same as an abbreviation maker?</Typography>
      <Typography variant="body1">
        Yes — &quot;acronym generator,&quot; &quot;abbreviation maker,&quot; and &quot;word abbreviation
        generator&quot; all describe the same phrase-to-acronym conversion this tool performs.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Acronym Generator"
      description="Instantly convert phrases or titles into acronyms. Free online abbreviation maker."
      url="/generators/acronym-generator"
      content={content}
      category="Generators"
    >
      <AcronymGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AcronymGenerator;
