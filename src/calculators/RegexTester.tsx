'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Alert, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const RegexTesterContent = () => {
  const [pattern, setPattern] = useState<string>('');
  const [testString, setTestString] = useState<string>('');
  
  // Flags
  const [flagG, setFlagG] = useState<boolean>(true);
  const [flagI, setFlagI] = useState<boolean>(false);
  const [flagM, setFlagM] = useState<boolean>(false);

  let matchResult = null;
  let error = null;
  let highlightElements: React.ReactNode[] = [];

  try {
    if (pattern) {
      const flags = `${flagG ? 'g' : ''}${flagI ? 'i' : ''}${flagM ? 'm' : ''}`;
      const regex = new RegExp(pattern, flags);
      
      if (testString) {
        if (flagG) {
          const matches = [...testString.matchAll(regex)];
          matchResult = matches.length > 0 ? matches : null;
          
          if (matches.length > 0) {
            let lastIndex = 0;
            matches.forEach((match, idx) => {
              const start = match.index!;
              const end = start + match[0].length;
              
              if (start > lastIndex) {
                highlightElements.push(testString.substring(lastIndex, start));
              }
              highlightElements.push(
                <span key={idx} style={{ backgroundColor: '#fef08a', color: '#854d0e', borderRadius: '2px' }}>
                  {testString.substring(start, end)}
                </span>
              );
              lastIndex = end;
            });
            if (lastIndex < testString.length) {
              highlightElements.push(testString.substring(lastIndex));
            }
          } else {
            highlightElements = [testString];
          }
        } else {
          const match = testString.match(regex);
          matchResult = match ? [match] : null;
          
          if (match) {
            const start = match.index!;
            const end = start + match[0].length;
            highlightElements.push(testString.substring(0, start));
            highlightElements.push(
              <span key="single" style={{ backgroundColor: '#fef08a', color: '#854d0e', borderRadius: '2px' }}>
                {testString.substring(start, end)}
              </span>
            );
            highlightElements.push(testString.substring(end));
          } else {
            highlightElements = [testString];
          }
        }
      }
    } else {
      highlightElements = [testString];
    }
  } catch (e: any) {
    error = e.message;
    highlightElements = [testString];
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 4 }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {/* Pattern & Flags */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'flex-start' }}>
          <TextField
            label="Regular Expression Pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            fullWidth
            placeholder="[a-zA-Z0-9]+"
            sx={{ flex: 1, fontFamily: 'monospace' }}
            error={!!error}
            helperText={error}
          />
          <Paper variant="outlined" sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
            <FormGroup row>
              <FormControlLabel control={<Checkbox checked={flagG} onChange={e => setFlagG(e.target.checked)} size="small" />} label="g (Global)" />
              <FormControlLabel control={<Checkbox checked={flagI} onChange={e => setFlagI(e.target.checked)} size="small" />} label="i (Ignore Case)" />
              <FormControlLabel control={<Checkbox checked={flagM} onChange={e => setFlagM(e.target.checked)} size="small" />} label="m (Multiline)" />
            </FormGroup>
          </Paper>
        </Box>

        {/* Test String */}
        <TextField
          label="Test String"
          multiline
          rows={6}
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against your regex..."
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />

        {/* Matches / Highlights */}
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Match Result</Typography>
          {!error && pattern && testString && matchResult && (
            <Alert severity="success" sx={{ mb: 2 }}>Found {matchResult.length} match(es)</Alert>
          )}
          {!error && pattern && testString && !matchResult && (
            <Alert severity="warning" sx={{ mb: 2 }}>No matches found</Alert>
          )}
          
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              minHeight: 150, 
              bgcolor: 'grey.50',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}
          >
            {highlightElements.length > 0 ? highlightElements : <Typography color="text.secondary">Matches will be highlighted here...</Typography>}
          </Paper>
        </Box>

      </Box>
    </Box>
  );
};

const RegexTester = () => {
  const content = (
    <>
      <Typography variant="h2">Online Regular Expression Tester and Checker</Typography>
      <Typography variant="body1">
        Test, check, and debug your regular expressions in real-time. This regex tester tool uses JavaScript&apos;s
        native regex engine to evaluate patterns against your test strings, acting as both a regular expression
        checker (flagging invalid syntax) and a regex analyzer that highlights every match instantly. Secure and
        fully client-side — your patterns and test strings never leave the browser.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type a regular expression pattern and a test string, toggle the g (global), i (ignore case), and m
        (multiline) flags as needed, and matches are highlighted live as you type — no need to click a
        separate &quot;run&quot; button.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pattern <code>\d+</code> against the string &quot;Order 42, Item 7&quot; highlights &quot;42&quot; and
        &quot;7&quot; as matches, since <code>\d+</code> matches one or more consecutive digits.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Debugging a regex pattern before using it in production code.</li>
          <li>Validating that a pattern correctly matches or excludes sample strings.</li>
          <li>Using it as a regular expression finder to see exactly which substrings a pattern captures.</li>
          <li>Checking a pattern's behavior online before porting it into Java, Python, or another language.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Which regex flavor does this use?</Typography>
      <Typography variant="body1">
        It uses standard JavaScript (ECMAScript) regular expression syntax, the same engine used natively in
        browsers and Node.js.
      </Typography>
      <Typography variant="h3">Can I check Java regex online with this tool?</Typography>
      <Typography variant="body1">
        This tool evaluates patterns using JavaScript&apos;s regex engine, not Java&apos;s <code>java.util.regex</code>.
        The two flavors are very close — most character classes, quantifiers, and groups behave the same — but
        they aren&apos;t 100% identical: named capture groups, lookbehind support, and some Unicode property
        escapes differ by engine and JavaScript runtime version. For patterns that must run exactly as they
        will in a Java application, verify edge cases (especially lookbehind and named groups) in a JVM before
        relying on results here.
      </Typography>
      <Typography variant="h3">Is this a regular expression checker or just a tester?</Typography>
      <Typography variant="body1">
        Both — it checks whether your pattern is valid (showing a syntax error if not) and tests it live
        against your sample text, highlighting every match as you type.
      </Typography>
      <Typography variant="h3">How do I find all matches, not just the first one?</Typography>
      <Typography variant="body1">
        Keep the &quot;g&quot; (Global) flag checked, which is on by default — the tool then acts as a regular
        expression finder that highlights every match in the test string, not only the first.
      </Typography>
      <Typography variant="h3">Does this work as an online regex analyzer for debugging patterns?</Typography>
      <Typography variant="body1">
        Yes — paste your pattern and sample text, toggle the g/i/m flags, and matches highlight live so you can
        see exactly what a regex does and does not capture before using it in code.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Regex Tester & Evaluator"
      description="Test, evaluate, and debug regular expressions online. Real-time regex matching and highlighting tool for developers."
      url="/developer-tools/regex-tester"
      content={content}
      category="Developer Tools"
    >
      <RegexTesterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RegexTester;
