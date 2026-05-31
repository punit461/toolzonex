'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const PromptBuilderContent = () => {
  const [role, setRole] = useState('Expert Programmer');
  const [task, setTask] = useState('write a React component');
  const [context, setContext] = useState('using Material UI and TypeScript');
  const [format, setFormat] = useState('Markdown with code blocks');
  const [tone, setTone] = useState('Professional and concise');

  const generatedPrompt = `Act as a ${role}.\n\nYour task is to ${task}.\n\nContext and details: ${context}.\n\nPlease format your response as: ${format}.\n\nTone: ${tone}.`;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <FormControl fullWidth>
          <InputLabel>Role / Persona</InputLabel>
          <Select value={role} label="Role / Persona" onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="Expert Programmer">Expert Programmer</MenuItem>
            <MenuItem value="Copywriter">Copywriter</MenuItem>
            <MenuItem value="Data Analyst">Data Analyst</MenuItem>
            <MenuItem value="Marketing Manager">Marketing Manager</MenuItem>
            <MenuItem value="Teacher / Educator">Teacher / Educator</MenuItem>
            <MenuItem value="Creative Writer">Creative Writer</MenuItem>
            <MenuItem value="Business Consultant">Business Consultant</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Task / Goal"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="e.g. write a blog post about AI"
          fullWidth
        />

        <TextField
          label="Context / Details"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. the target audience is beginners"
          multiline
          rows={3}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Output Format</InputLabel>
          <Select value={format} label="Output Format" onChange={(e) => setFormat(e.target.value)}>
            <MenuItem value="Markdown with code blocks">Markdown with code blocks</MenuItem>
            <MenuItem value="Bullet point list">Bullet point list</MenuItem>
            <MenuItem value="Step-by-step guide">Step-by-step guide</MenuItem>
            <MenuItem value="JSON object">JSON object</MenuItem>
            <MenuItem value="Formal email">Formal email</MenuItem>
            <MenuItem value="Table">Table</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Tone</InputLabel>
          <Select value={tone} label="Tone" onChange={(e) => setTone(e.target.value)}>
            <MenuItem value="Professional and concise">Professional & Concise</MenuItem>
            <MenuItem value="Friendly and conversational">Friendly & Conversational</MenuItem>
            <MenuItem value="Humorous and witty">Humorous & Witty</MenuItem>
            <MenuItem value="Academic and rigorous">Academic & Rigorous</MenuItem>
            <MenuItem value="Persuasive and energetic">Persuasive & Energetic</MenuItem>
          </Select>
        </FormControl>

      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Generated AI Prompt:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyPrompt}>
            Copy Prompt
          </Button>
        </Box>
        
        <Paper sx={{ p: 3, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', minHeight: 300 }}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {generatedPrompt}
          </Typography>
        </Paper>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Copy this prompt and paste it into ChatGPT, Claude, Gemini, or any other LLM for optimal results.
        </Typography>
      </Box>

    </Box>
  );
};

const PromptBuilder = () => {
  const content = (
    <>
      <Typography variant="h2">Why use a Prompt Builder?</Typography>
      <Typography variant="body1">
        A structured prompt yields significantly better results from AI models like ChatGPT or Claude. By explicitly defining the Role, Task, Context, Format, and Tone, you give the AI exactly what it needs to produce high-quality, targeted outputs without needing multiple revisions.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="AI Prompt Builder"
      description="Create optimized and structured prompts for ChatGPT, Claude, and Gemini to get better AI responses."
      url="/tools/prompt-builder"
      content={content}
      category="Tools"
    >
      <PromptBuilderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PromptBuilder;
