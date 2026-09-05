'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, TextField, MenuItem, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Context = 'Personal Relationship' | 'Work/Professional' | 'Minor Mistake' | 'More Serious Situation';

const CONTEXTS: Context[] = ['Personal Relationship', 'Work/Professional', 'Minor Mistake', 'More Serious Situation'];

function buildApology(context: Context, details: string): string {
  const detailClause = details.trim() ? ` for ${details.trim()}` : '';

  switch (context) {
    case 'Personal Relationship':
      return `I want to say I'm truly sorry${detailClause}. I know my actions affected you, and that wasn't my intention, but I understand the impact it had regardless. You mean a lot to me, and I want to make things right between us. I'm listening if you'd like to talk more about how you're feeling, and I'll work on doing better going forward.`;
    case 'Work/Professional':
      return `I'd like to formally apologize${detailClause}. I take full responsibility for this and understand the inconvenience or impact it may have caused. I'm committed to putting things right and making sure this doesn't happen again. Please let me know if there's anything I can do to help resolve the situation, and thank you for your understanding.`;
    case 'Minor Mistake':
      return `Sorry about that${detailClause} — that was on me. I appreciate your patience, and I'll be more careful going forward. Let me know if there's anything I can do to help sort it out.`;
    case 'More Serious Situation':
      return `I owe you a real apology${detailClause}. I recognize this was a serious issue, and I don't want to minimize how it affected you. I'm genuinely sorry, and I understand if it takes time to rebuild trust. I'm committed to reflecting on what happened and doing the work needed to change. Please let me know what you need from me going forward.`;
    default:
      return '';
  }
}

const ApologyGeneratorContent = () => {
  const [context, setContext] = useState<Context>('Personal Relationship');
  const [details, setDetails] = useState('');
  const [edited, setEdited] = useState<string | null>(null);

  const generated = useMemo(() => buildApology(context, details), [context, details]);
  const displayed = edited ?? generated;

  const regenerate = () => setEdited(null);

  const copy = async () => {
    try { await navigator.clipboard.writeText(displayed); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={3}>
        <TextField select label="Context" value={context} onChange={(e) => { setContext(e.target.value as Context); setEdited(null); }} fullWidth>
          {CONTEXTS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField
          label="What happened (optional)"
          value={details}
          onChange={(e) => { setDetails(e.target.value); setEdited(null); }}
          fullWidth
          multiline
          rows={3}
          placeholder="e.g. missing your birthday dinner"
          helperText="Describe briefly what you're apologizing for — it will be woven into the message."
        />
      </Stack>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Your Apology (editable)</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy}>Copy</Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 0 }}>
          <TextField
            value={displayed}
            onChange={(e) => setEdited(e.target.value)}
            multiline
            minRows={8}
            fullWidth
            variant="standard"
            slotProps={{ input: { disableUnderline: true, sx: { p: 2 } } }}
          />
        </Paper>
        {edited !== null && (
          <Button size="small" onClick={regenerate} sx={{ mt: 1 }}>Reset to Generated Version</Button>
        )}
      </Box>
    </Box>
  );
};

const ApologyGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Apology Generator</Typography>
      <Typography variant="body1">
        Choose the context that best fits your situation — Personal Relationship, Work/Professional, Minor
        Mistake, or a More Serious Situation — and optionally describe what happened in a few words. The tool
        combines your context and details into a sincere, genuine-toned apology message that you can then
        edit freely in the text box before copying it to send.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing &quot;Personal Relationship&quot; with the detail &quot;missing your birthday dinner&quot;
        produces an apology that opens with &quot;I want to say I&apos;m truly sorry for missing your birthday
        dinner...&quot; and continues with a sincere, relationship-appropriate tone.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Drafting a starting point for a heartfelt apology text or message to a friend or partner.</li>
          <li>Writing a professional apology email to a colleague or client after a mistake.</li>
          <li>Finding the right words after a more serious disagreement, before personalizing the message further.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Should I send the generated text exactly as-is?</strong> It's best used as a starting draft — edit the text directly in the box to add your own voice and specific details before sending, since a truly sincere apology usually benefits from personal touches.</li>
          <li><strong>Is this a joke or sarcastic apology generator?</strong> No — this tool is intentionally designed to produce respectful, sincere-toned messages for genuine apologies, not humor or sarcasm.</li>
          <li><strong>What if my situation doesn't fit neatly into one category?</strong> Pick whichever context feels closest, then use the optional details field and direct editing to adjust the tone and specifics until it matches your actual situation.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/apology-generator" content={content}>
      <ApologyGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ApologyGenerator;
