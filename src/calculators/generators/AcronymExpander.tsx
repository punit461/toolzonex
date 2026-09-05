'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// ~140 common acronyms mapped to their common expansion(s). Some genuinely
// have more than one widely used meaning depending on context.
const ACRONYMS: Record<string, string[]> = {
  NASA: ['National Aeronautics and Space Administration'],
  FBI: ['Federal Bureau of Investigation'],
  CIA: ['Central Intelligence Agency'],
  CEO: ['Chief Executive Officer'],
  CFO: ['Chief Financial Officer'],
  COO: ['Chief Operating Officer'],
  CTO: ['Chief Technology Officer'],
  ASAP: ['As Soon As Possible'],
  DIY: ['Do It Yourself'],
  FAQ: ['Frequently Asked Questions'],
  HTML: ['HyperText Markup Language'],
  CSS: ['Cascading Style Sheets'],
  API: ['Application Programming Interface'],
  LOL: ['Laughing Out Loud'],
  ETA: ['Estimated Time of Arrival'],
  RSVP: ["Répondez S'il Vous Plaît (please respond)"],
  TBD: ['To Be Determined'],
  ATM: ['Automated Teller Machine'],
  PIN: ['Personal Identification Number'],
  ZIP: ['Zone Improvement Plan (ZIP code)'],
  SCUBA: ['Self-Contained Underwater Breathing Apparatus'],
  LASER: ['Light Amplification by Stimulated Emission of Radiation'],
  RADAR: ['Radio Detection and Ranging'],
  FYI: ['For Your Information'],
  BTW: ['By The Way'],
  IMO: ['In My Opinion'],
  IMHO: ['In My Humble Opinion'],
  TBA: ['To Be Announced'],
  RIP: ['Rest In Peace'],
  VIP: ['Very Important Person'],
  DOB: ['Date Of Birth'],
  ID: ['Identification'],
  OK: ['Oll Korrect (disputed origin; now just "okay")'],
  NGO: ['Non-Governmental Organization'],
  WHO: ['World Health Organization'],
  UNESCO: ['United Nations Educational, Scientific and Cultural Organization'],
  UNICEF: ["United Nations International Children's Emergency Fund"],
  NATO: ['North Atlantic Treaty Organization'],
  USB: ['Universal Serial Bus'],
  URL: ['Uniform Resource Locator'],
  URI: ['Uniform Resource Identifier'],
  SEO: ['Search Engine Optimization'],
  SEM: ['Search Engine Marketing'],
  AI: ['Artificial Intelligence'],
  ML: ['Machine Learning'],
  GPS: ['Global Positioning System'],
  GPU: ['Graphics Processing Unit'],
  CPU: ['Central Processing Unit'],
  RAM: ['Random Access Memory'],
  ROM: ['Read-Only Memory'],
  USA: ['United States of America'],
  UK: ['United Kingdom'],
  UN: ['United Nations'],
  EU: ['European Union'],
  WWW: ['World Wide Web'],
  HTTP: ['HyperText Transfer Protocol'],
  HTTPS: ['HyperText Transfer Protocol Secure'],
  FTP: ['File Transfer Protocol'],
  PDF: ['Portable Document Format'],
  JPEG: ['Joint Photographic Experts Group'],
  PNG: ['Portable Network Graphics'],
  GIF: ['Graphics Interchange Format'],
  IT: ['Information Technology'],
  HR: ['Human Resources'],
  PR: ['Public Relations'],
  QA: ['Quality Assurance'],
  RD: ['Research and Development'],
  ROI: ['Return On Investment'],
  KPI: ['Key Performance Indicator'],
  B2B: ['Business to Business'],
  B2C: ['Business to Consumer'],
  SaaS: ['Software as a Service'],
  CRM: ['Customer Relationship Management'],
  ERP: ['Enterprise Resource Planning'],
  IPO: ['Initial Public Offering'],
  LLC: ['Limited Liability Company'],
  Inc: ['Incorporated'],
  Ltd: ['Limited'],
  GDP: ['Gross Domestic Product'],
  IRS: ['Internal Revenue Service'],
  SSN: ['Social Security Number'],
  DMV: ['Department of Motor Vehicles'],
  FDA: ['Food and Drug Administration'],
  EPA: ['Environmental Protection Agency'],
  CDC: ['Centers for Disease Control and Prevention'],
  AKA: ['Also Known As'],
  ie: ['id est (that is)'],
  eg: ['exempli gratia (for example)'],
  etc: ['et cetera (and so on)'],
  PS: ['Postscript'],
  PM: ['Post Meridiem (afternoon)', 'Prime Minister', 'Project Manager'],
  AM: ['Ante Meridiem (morning)'],
  EOD: ['End Of Day'],
  COB: ['Close Of Business'],
  OOO: ['Out Of Office'],
  WFH: ['Work From Home'],
  NDA: ['Non-Disclosure Agreement'],
  MOU: ['Memorandum Of Understanding'],
  LGTM: ['Looks Good To Me'],
  BRB: ['Be Right Back'],
  TTYL: ['Talk To You Later'],
  IDK: ["I Don't Know"],
  TMI: ['Too Much Information'],
  YOLO: ['You Only Live Once'],
  FOMO: ['Fear Of Missing Out'],
  DM: ['Direct Message'],
  RT: ['Retweet'],
  IoT: ['Internet of Things'],
  VR: ['Virtual Reality'],
  AR: ['Augmented Reality'],
  UI: ['User Interface'],
  UX: ['User Experience'],
  SDK: ['Software Development Kit'],
  IDE: ['Integrated Development Environment'],
  OS: ['Operating System'],
  SQL: ['Structured Query Language'],
  JSON: ['JavaScript Object Notation'],
  XML: ['Extensible Markup Language'],
  CSV: ['Comma-Separated Values'],
  RGB: ['Red, Green, Blue'],
  CMYK: ['Cyan, Magenta, Yellow, Key (black)'],
  DPI: ['Dots Per Inch'],
  FPS: ['Frames Per Second'],
  LED: ['Light Emitting Diode'],
  LCD: ['Liquid Crystal Display'],
  HD: ['High Definition'],
  '4K': ['4000 (horizontal resolution, ~4096 pixels)'],
  WiFi: ['Wireless Fidelity (informal, not an official expansion)'],
  BT: ['Bluetooth'],
  NFC: ['Near Field Communication'],
  QR: ['Quick Response (QR code)'],
  MPH: ['Miles Per Hour'],
  KPH: ['Kilometers Per Hour'],
  BMI: ['Body Mass Index'],
  CPR: ['Cardiopulmonary Resuscitation'],
  ICU: ['Intensive Care Unit'],
  ER: ['Emergency Room'],
  GP: ['General Practitioner'],
  MD: ['Doctor of Medicine'],
  PhD: ['Doctor of Philosophy'],
  BA: ['Bachelor of Arts'],
  BS: ['Bachelor of Science'],
  MA: ['Master of Arts'],
  MBA: ['Master of Business Administration'],
  GPA: ['Grade Point Average'],
  SAT: ['Scholastic Assessment Test'],
  GRE: ['Graduate Record Examination'],
  PTO: ['Paid Time Off'],
  CV: ['Curriculum Vitae'],
};

const AcronymExpanderContent = () => {
  const [query, setQuery] = useState('NASA');

  const cleaned = query.trim().toUpperCase();
  const match = useMemo(() => (cleaned ? ACRONYMS[cleaned] : undefined), [cleaned]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <TextField
        label="Enter an Acronym"
        placeholder="e.g. NASA, FYI, ASAP, CIA"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {cleaned && (
        match ? (
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>{cleaned}</Typography>
            {match.map((m, i) => (
              <Typography key={i} variant="body1" sx={{ mb: 0.5 }}>
                {match.length > 1 ? `${i + 1}. ` : ''}{m}
              </Typography>
            ))}
            {match.length > 1 && (
              <Typography variant="caption" color="text.secondary">
                This acronym has more than one common meaning depending on context.
              </Typography>
            )}
          </Paper>
        ) : (
          <Alert severity="info">&quot;{cleaned}&quot; wasn&apos;t found in our list of common acronyms. Try another one.</Alert>
        )
      )}
    </Box>
  );
};

const AcronymExpander = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Acronym Expander</Typography>
      <Typography variant="body1">
        Type any acronym you&apos;ve come across — like NASA, FYI, or CIA — into the search box, and the tool
        looks it up in a curated list of roughly 140 common acronyms spanning technology, business, medicine,
        government, and everyday chat shorthand. Some acronyms genuinely have more than one widely recognized
        meaning depending on context (like PM, which can mean &quot;afternoon&quot;, &quot;Prime Minister&quot;,
        or &quot;Project Manager&quot;), and those cases list every common meaning.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>CIA</code> returns &quot;Central Intelligence Agency&quot;. Typing <code>ASAP</code> returns
        &quot;As Soon As Possible&quot;. Typing <code>PM</code> returns all three common meanings so you can pick
        the one that fits your context.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly figuring out what an unfamiliar acronym in an email or article stands for.</li>
          <li>Checking whether an acronym has multiple common meanings before using it in writing.</li>
          <li>Learning common business, tech, and government acronyms.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Acronym Generator?</strong> The Acronym Generator (in Phrase → Acronym mode) works in the opposite direction — you type a full phrase or title and it creates an acronym from it. This Acronym Expander goes the other way: you already have an acronym you&apos;ve encountered somewhere, and it tells you what it commonly stands for.</li>
          <li><strong>What if an acronym isn&apos;t in the list?</strong> The list covers roughly 140 of the most common acronyms across everyday, tech, and business use. It&apos;s not exhaustive, so a very obscure or niche acronym may not be found.</li>
          <li><strong>Why do some acronyms show more than one meaning?</strong> Many acronyms are genuinely ambiguous — for example, &quot;PM&quot; can mean several different things depending on whether you&apos;re talking about time of day, government, or project management. This tool lists every common meaning rather than guessing which one you meant.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/acronym-expander" content={content}>
      <AcronymExpanderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AcronymExpander;
