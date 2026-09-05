'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Occasion = 'Birthday' | 'Holiday/Festival' | 'Thank You' | 'Congratulations' | 'Invitation' | 'Get Well';

const OCCASIONS: Occasion[] = ['Birthday', 'Holiday/Festival', 'Thank You', 'Congratulations', 'Invitation', 'Get Well'];

// {name} is replaced with the entered name, or removed gracefully if left blank.
const MESSAGES: Record<Occasion, string[]> = {
  Birthday: [
    'Happy birthday, {name}! Wishing you a day filled with laughter, good food, and everyone you love around you.',
    'Another year older, and somehow even more amazing. Happy birthday, {name}!',
    'Hope your birthday is as wonderful as you are, {name}. Here is to a great year ahead.',
    "Happy birthday, {name}! May this year bring you closer to everything you're working toward.",
    "Wishing you the happiest of birthdays, {name} — you deserve every bit of celebration coming your way.",
    'Cheers to you, {name}! Another trip around the sun and still going strong. Happy birthday.',
    "Happy birthday, {name}! Take today to celebrate exactly how far you've come.",
    'Sending you warm wishes on your birthday, {name}. Hope it is a great one.',
    'Happy birthday, {name}! May the year ahead bring new adventures and even better memories.',
    'To another year of being wonderful — happy birthday, {name}!',
  ],
  'Holiday/Festival': [
    'Wishing you and your loved ones a warm and joyful holiday season, {name}!',
    'May this festive season bring peace, happiness, and good company your way, {name}.',
    "Happy holidays, {name}! Hope this season is filled with warmth, rest, and celebration.",
    'Sending festive wishes your way, {name} — may the season bring you joy and togetherness.',
    'Wishing you a bright and beautiful holiday, {name}, surrounded by the people who matter most.',
    'May this holiday season be as special as you are, {name}. Warmest wishes to you and your family.',
    'Happy festivities, {name}! Hope the season brings good food, good company, and a well-earned break.',
    'Wishing you all the joy and warmth of the season, {name}.',
    'May this holiday fill your home with laughter and your heart with gratitude, {name}.',
    'Sending you cheer and warm wishes this holiday season, {name}.',
  ],
  'Thank You': [
    'Thank you so much, {name} — your help truly meant a lot to me.',
    "I can't thank you enough, {name}. What you did made all the difference.",
    'Just wanted to say thank you, {name}. I really appreciate everything you did.',
    'Thank you, {name}, for your time, effort, and kindness — it did not go unnoticed.',
    "I'm so grateful for you, {name}. Thank you for always showing up when it matters.",
    'Thank you, {name}! You went above and beyond, and I noticed every bit of it.',
    "A heartfelt thank you, {name}. I couldn't have done this without you.",
    "Thank you for everything, {name} — your support means more than you know.",
    'Sending my sincere thanks, {name}. You made a real difference.',
    "I truly appreciate you, {name}. Thank you for being there.",
  ],
  Congratulations: [
    'Congratulations, {name}! You worked so hard for this, and it shows.',
    "Huge congratulations, {name}! So proud of you and everything you've accomplished.",
    'Congrats, {name}! This achievement is so well deserved.',
    'Way to go, {name}! Congratulations on this amazing milestone.',
    "Congratulations, {name} — you earned every bit of this success.",
    'So happy for you, {name}! Congratulations on this incredible achievement.',
    'Congratulations, {name}! Your hard work and dedication really paid off.',
    'Cheers to you, {name}! Congratulations on such a well-earned win.',
    "Amazing news, {name} — congratulations on reaching this milestone!",
    'Congratulations, {name}! Excited to see what you accomplish next.',
  ],
  Invitation: [
    "You're invited, {name}! We'd love for you to join us in celebrating this special occasion.",
    'Please join us, {name} — your presence would mean so much to us.',
    "We're hosting something special and would love to have you there, {name}. Hope you can make it!",
    "You're warmly invited, {name}. Come celebrate with us!",
    'Save the date, {name} — we would be so happy to have you join us.',
    "It wouldn't be the same without you, {name}. Please come celebrate with us!",
    'We are putting together a small gathering and would love for you to be there, {name}.',
    "Join us for a celebration, {name}! We can't wait to see you there.",
    'You are cordially invited, {name}, to join us for this special day.',
    "We'd be honored to have you there, {name}. Hope to see you soon!",
  ],
  'Get Well': [
    'Wishing you a fast and full recovery, {name}. Sending you strength and good thoughts.',
    "Thinking of you, {name}, and hoping you feel better with each passing day.",
    'Get well soon, {name}! Sending you comfort, rest, and healing energy.',
    "Sending you healing thoughts, {name}. Take all the time you need to rest and recover.",
    'Hope you feel better very soon, {name}. Take good care of yourself.',
    'Wishing you comfort and a speedy recovery, {name}. Thinking of you.',
    "Get well soon, {name} — we're all rooting for you to feel like yourself again.",
    "Sending warm thoughts your way, {name}. Rest up and take it easy.",
    'Hoping today brings you a little more strength and comfort, {name}.',
    "Take care of yourself, {name}. Wishing you a smooth and speedy recovery.",
  ],
};

function buildMessage(template: string, name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return template
      .replace(/,\s*\{name\}/g, '')
      .replace(/\{name\},\s*/g, '')
      .replace(/\{name\}/g, 'there');
  }
  return template.replace(/\{name\}/g, trimmed);
}

const OccasionMessageGeneratorContent = () => {
  const [occasion, setOccasion] = useState<Occasion>('Birthday');
  const [name, setName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const list = MESSAGES[occasion];
    const template = list[Math.floor(Math.random() * list.length)];
    setMessage(buildMessage(template, name));
  };

  const copyMessage = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5, textAlign: 'center' }}>
          Occasion
        </Typography>
        <ToggleButtonGroup
          exclusive
          value={occasion}
          onChange={(_, val) => {
            if (val) {
              setOccasion(val);
              setMessage(null);
            }
          }}
          sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {OCCASIONS.map((o) => (
            <ToggleButton key={o} value={o} sx={{ textTransform: 'none' }}>
              {o}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <TextField
        label="Recipient's Name (optional)"
        placeholder="e.g. Sarah"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ maxWidth: 320, width: '100%' }}
      />

      <Button variant="contained" size="large" startIcon={<CardGiftcardIcon />} onClick={generate}>
        Generate Message
      </Button>

      {message && (
        <Paper variant="outlined" sx={{ p: 3, maxWidth: 560, width: '100%', position: 'relative' }}>
          <Typography variant="body1" sx={{ pr: 4 }}>
            {message}
          </Typography>
          <IconButton
            size="small"
            onClick={copyMessage}
            aria-label="Copy message"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          {copied && (
            <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 1 }}>
              Copied!
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

const OccasionMessageGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Occasion Message Generator</Typography>
      <Typography variant="body1">
        Choose an occasion — Birthday, Holiday/Festival, Thank You, Congratulations, Invitation, or Get
        Well — optionally enter the recipient&apos;s name, and click &quot;Generate Message&quot; for a
        ready-to-use message drawn from a hand-written collection of 8-12 messages for that occasion. If you
        enter a name, it&apos;s inserted naturally into the message; leave it blank for a generic version.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing Congratulations and entering &quot;Sarah&quot; might generate: &quot;Congratulations, Sarah!
        You worked so hard for this, and it shows.&quot; Leaving the name blank instead produces a version
        without a specific name inserted.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Writing a birthday card message when you are stuck for words.</li>
          <li>Sending a quick, genuine thank-you text after someone helps you out.</li>
          <li>Finding the right wording for a holiday card, invitation, or congratulations text.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Does this replace five separate message generators?</strong> Yes — this single tool
            covers Holiday/Festival greetings, thank-you messages, congratulations messages, and invitation
            messages, plus birthday and get-well messages, all in one place with an occasion selector.
          </li>
          <li>
            <strong>Can I edit the generated message afterward?</strong> Yes — copy it with the copy icon
            and edit the text freely before sending. These messages are meant as a strong starting point,
            not a final, uneditable script.
          </li>
          <li>
            <strong>What happens if I leave the name field blank?</strong> The message automatically
            adjusts its wording to read naturally without a specific name, rather than leaving an awkward
            gap or placeholder text.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/occasion-message-generator" content={content}>
      <OccasionMessageGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default OccasionMessageGenerator;
