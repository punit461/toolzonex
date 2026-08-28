'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, ToggleButton, ToggleButtonGroup, Chip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Style = 'classic' | 'fun' | 'cool' | 'cute';

const NICKNAME_DICTIONARY: Record<string, string[]> = {
  william: ['Will', 'Bill', 'Billy', 'Liam', 'Willy', 'Willie'],
  robert: ['Rob', 'Bob', 'Bobby', 'Robbie', 'Robby'],
  richard: ['Rick', 'Ricky', 'Richie', 'Dick', 'Ricardo'],
  elizabeth: ['Liz', 'Beth', 'Eliza', 'Lizzy', 'Betty', 'Betsy', 'Elle'],
  michael: ['Mike', 'Mikey', 'Mick', 'Mickey', 'Mickael'],
  jennifer: ['Jen', 'Jenny', 'Jenn', 'Jenna'],
  christopher: ['Chris', 'Topher', 'Kit', 'Christo'],
  katherine: ['Kate', 'Katie', 'Kat', 'Kathy', 'Kit'],
  alexander: ['Alex', 'Xander', 'Al', 'Sasha', 'Lexi'],
  benjamin: ['Ben', 'Benny', 'Benji', 'Benjo'],
  samantha: ['Sam', 'Sammy', 'Sami'],
  nicholas: ['Nick', 'Nicky', 'Nico', 'Nicolas'],
  jessica: ['Jess', 'Jessie', 'Jessy'],
  daniel: ['Dan', 'Danny', 'Dani', 'Danno'],
  patricia: ['Pat', 'Patty', 'Trish', 'Patsy'],
  anthony: ['Tony', 'Ant', 'Anto', 'Antonio'],
  margaret: ['Maggie', 'Meg', 'Peggy', 'Marge', 'Maisy', 'Maisie'],
  jonathan: ['Jon', 'Johnny', 'Jono'],
  matthew: ['Matt', 'Matty', 'Matteo'],
  andrew: ['Andy', 'Drew', 'Ando'],
  joseph: ['Joe', 'Joey', 'Jo'],
  thomas: ['Tom', 'Tommy', 'Tommie'],
  charles: ['Charlie', 'Chuck', 'Chaz', 'Chuckles'],
  edward: ['Ed', 'Eddie', 'Ted', 'Teddy', 'Ned'],
  victoria: ['Vicky', 'Tori', 'Victo'],
  isabella: ['Bella', 'Izzy', 'Iz', 'Belle'],
  gabriel: ['Gabe', 'Gabi', 'Gabs'],
  natasha: ['Tasha', 'Nat', 'Nata'],
  sophia: ['Sophie', 'Soph', 'Phia'],
  emma: ['Em', 'Emmy', 'Emmie'],
  olivia: ['Liv', 'Livy', 'Ollie'],
  james: ['Jim', 'Jimmy', 'Jamie', 'Jimmie'],
  henry: ['Harry', 'Hank', 'Henny'],
  charlotte: ['Charlie', 'Lottie', 'Lotta'],
  amelia: ['Amy', 'Amelia', 'Mia', 'Melie'],
  harper: ['Harps', 'Harp', 'Harpy'],
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

const VOWELS = 'aeiou';

function generateNicknames(name: string, style: Style): string[] {
  const first = name.trim().split(/\s+/)[0] || '';
  if (!first) return [];
  const base = capitalize(first);
  const key = base.toLowerCase();
  const seen = new Set<string>([key]);
  const results: string[] = [];
  const add = (s: string) => {
    const k = s.toLowerCase();
    if (!seen.has(k)) { seen.add(k); results.push(s); }
  };

  const dict = NICKNAME_DICTIONARY[key];
  if (dict) dict.forEach(add);

  const lastChar = base.slice(-1).toLowerCase();

  if (style === 'classic' || style === 'fun') {
    if (base.length > 3) add(base.slice(0, 3) + 'y');
    if (base.length > 4) add(base.slice(0, 4));
    add(base + 'y');
    add(base + 'ie');
    add(base + 'o');
  }

  if (style === 'fun' || style === 'cool') {
    add(base + 'ster');
    add(base + 'inator');
    add(base + 'saurus');
    add(base + 'meister');
    add('The Great ' + base);
    add('Captain ' + base);
  }

  if (style === 'cute' || style === 'fun') {
    add(base + 'kins');
    add(base + 'boo');
    add(base + 'pie');
    add('Lil ' + base);
    add('Baby ' + base);
    add('Little ' + base);
    if (!VOWELS.includes(lastChar)) add(base + lastChar + 'y');
    add(base.slice(0, 2) + 'zy');
    add(base.slice(0, 3) + 'ers');
  }

  if (style === 'cool') {
    add(base + 'x');
    add(base + 'tron');
    add('Agent ' + base);
    add('Shadow ' + base);
    add('Neo' + base);
  }

  return results.slice(0, 20);
}

const NicknameGeneratorContent = () => {
  const [name, setName] = useState('');
  const [style, setStyle] = useState<Style>('classic');
  const [nicknames, setNicknames] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = () => {
    if (!name.trim()) return;
    setNicknames(generateNicknames(name, style));
  };

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 700, mx: 'auto' }}>
      <TextField
        label="Enter a real name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        placeholder="e.g. Alexander"
        onKeyDown={(e) => e.key === 'Enter' && generate()}
      />

      <ToggleButtonGroup
        value={style}
        exclusive
        onChange={(_, v) => v && setStyle(v)}
        fullWidth
      >
        <ToggleButton value="classic">Classic</ToggleButton>
        <ToggleButton value="fun">Fun</ToggleButton>
        <ToggleButton value="cool">Cool</ToggleButton>
        <ToggleButton value="cute">Cute</ToggleButton>
      </ToggleButtonGroup>

      <Button variant="contained" size="large" onClick={generate} fullWidth disabled={!name.trim()}>
        Generate Nicknames
      </Button>

      {nicknames.length > 0 && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
            {nicknames.map((n, idx) => (
              <Chip
                key={n}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {n}
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleCopy(n, idx); }} sx={{ ml: 0.5, p: 0 }}>
                      <ContentCopyIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Box>
                }
                color={copiedIdx === idx ? 'success' : 'primary'}
                variant="outlined"
                sx={{ fontSize: '0.95rem', py: 2 }}
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const NicknameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Nickname Generator — Create Nicknames from Names</Typography>
      <Typography variant="body1">
        Turn any real name into a collection of creative nicknames. Choose from classic diminutives,
        fun transformations, cool aliases, or cute variations. Over 35 common names have curated
        dictionary entries for authentic nicknames.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Enter a first name and select a style. Click &quot;Generate Nicknames&quot; to see up to 20
        suggestions. Well-known names pull from a curated dictionary first (like William → Will, Bill, Billy),
        then style-specific rules fill in the rest.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;Alexander&quot; with &quot;fun&quot; style might return Alex, Xander, Al, Sasha, Lexi,
        Alexy, Alexie, Alexo, Alexster, Alexinator, and more.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a cute nickname for a friend, partner, or new baby.</li>
          <li>Creative gamertag or Discord handle based on your real name.</li>
          <li>Creating character nicknames for writing or role-playing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from Nickname Finder?</Typography>
      <Typography variant="body1">
        Nickname Finder focuses on classic, well-known diminutives (Robert → Bob, Rob). This generator offers
        style-based creative transformations — fun, cool, and cute variations that go beyond traditional nicknames.
      </Typography>
      <Typography variant="h3">Does it work for non-English names?</Typography>
      <Typography variant="body1">
        The dictionary entries are English-focused, but the rule-based patterns (adding suffixes, shortening)
        work for most names using the Latin alphabet.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/nickname-generator" content={content}>
      <NicknameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NicknameGenerator;
