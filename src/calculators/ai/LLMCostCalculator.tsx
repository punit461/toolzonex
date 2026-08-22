'use client';

import { useMemo, useState } from 'react';
import {
  Box, TextField, Typography, MenuItem, Select, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Accordion, AccordionSummary, AccordionDetails, Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ModelPricing {
  id: string;
  label: string;
  provider: string;
  inputPer1M: number;
  outputPer1M: number;
}

// Approximate published API pricing per 1M tokens (USD), checked August 2026.
// Providers change pricing without notice -- always confirm on the official
// pricing page before making a purchasing decision.
const MODELS: ModelPricing[] = [
  { id: 'gpt-4o-mini', label: 'GPT-4o mini', provider: 'OpenAI', inputPer1M: 0.15, outputPer1M: 0.60 },
  { id: 'gpt-4.1', label: 'GPT-4.1', provider: 'OpenAI', inputPer1M: 2.00, outputPer1M: 8.00 },
  { id: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI', inputPer1M: 2.50, outputPer1M: 10.00 },
  { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite', provider: 'Google', inputPer1M: 0.10, outputPer1M: 0.40 },
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', provider: 'Google', inputPer1M: 0.30, outputPer1M: 2.50 },
  { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (≤200K)', provider: 'Google', inputPer1M: 1.25, outputPer1M: 10.00 },
  { id: 'claude-haiku-4.5', label: 'Claude Haiku 4.5', provider: 'Anthropic', inputPer1M: 1.00, outputPer1M: 5.00 },
  { id: 'claude-sonnet-5', label: 'Claude Sonnet 5', provider: 'Anthropic', inputPer1M: 3.00, outputPer1M: 15.00 },
  { id: 'claude-opus-5', label: 'Claude Opus 5', provider: 'Anthropic', inputPer1M: 5.00, outputPer1M: 25.00 },
  { id: 'claude-fable-5', label: 'Claude Fable 5', provider: 'Anthropic', inputPer1M: 10.00, outputPer1M: 50.00 },
];

const COLORS = ['#1a56db', '#e11d48'];

// Rough, widely-used approximation for English text; real tokenizers vary by model.
const CHARS_PER_TOKEN = 4;

const formatUSD = (value: number) => {
  if (value < 0.01 && value > 0) {
    return `$${value.toFixed(6)}`;
  }
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
};

const LLMCostCalculator = () => {
  const [modelId, setModelId] = useState('gpt-4o-mini');
  const [inputTokens, setInputTokens] = useState<number>(1000);
  const [outputTokens, setOutputTokens] = useState<number>(500);
  const [monthlyRequests, setMonthlyRequests] = useState<number>(10000);

  const [promptText, setPromptText] = useState('');
  const [responseText, setResponseText] = useState('');

  const estimatedInputTokens = useMemo(
    () => Math.ceil(promptText.length / CHARS_PER_TOKEN),
    [promptText]
  );
  const estimatedOutputTokens = useMemo(
    () => Math.ceil(responseText.length / CHARS_PER_TOKEN),
    [responseText]
  );

  const applyEstimate = () => {
    if (promptText) setInputTokens(estimatedInputTokens);
    if (responseText) setOutputTokens(estimatedOutputTokens);
  };

  const selectedModel = useMemo(
    () => MODELS.find((m) => m.id === modelId) ?? MODELS[0],
    [modelId]
  );

  const { inputCost, outputCost, costPerRequest, monthlyCost } = useMemo(() => {
    const inCost = (inputTokens / 1_000_000) * selectedModel.inputPer1M;
    const outCost = (outputTokens / 1_000_000) * selectedModel.outputPer1M;
    return {
      inputCost: inCost,
      outputCost: outCost,
      costPerRequest: inCost + outCost,
      monthlyCost: (inCost + outCost) * monthlyRequests,
    };
  }, [inputTokens, outputTokens, selectedModel, monthlyRequests]);

  const chartData = [
    { name: 'Input tokens', value: inputCost },
    { name: 'Output tokens', value: outputCost },
  ];

  const comparisonRows = useMemo(() => {
    return MODELS
      .map((m) => {
        const cost = (inputTokens / 1_000_000) * m.inputPer1M + (outputTokens / 1_000_000) * m.outputPer1M;
        return { ...m, cost, monthlyCost: cost * monthlyRequests };
      })
      .sort((a, b) => a.cost - b.cost);
  }, [inputTokens, outputTokens, monthlyRequests]);

  const content = (
    <>
      <Typography variant="h2">How LLM API pricing works</Typography>
      <Typography variant="body1">
        Most LLM providers charge separately for <strong>input tokens</strong> (the prompt, context, and any
        retrieved documents you send) and <strong>output tokens</strong> (what the model generates back). Output
        tokens are almost always priced higher than input tokens because generation is more compute-intensive
        than reading. A token is roughly 4 characters or about 0.75 words of English text, though this varies by
        model and language.
      </Typography>

      <Typography variant="h2">Ways to reduce LLM API costs</Typography>
      <Typography variant="body1">
        <strong>Prompt caching</strong> — most providers now discount repeated context (system prompts, long
        documents) by 50-90% on cache hits.<br />
        <strong>Batch APIs</strong> — OpenAI and Anthropic both offer ~50% discounts for non-real-time batch
        processing.<br />
        <strong>Right-size the model</strong> — smaller models (GPT-4o mini, Gemini Flash-Lite, Claude Haiku) cost
        10-50x less than flagship models and are often good enough for classification, extraction, or
        summarization tasks.<br />
        <strong>Trim context</strong> — every token of unnecessary context in a long conversation history gets
        re-billed on every turn.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Sending 10,000 requests/month, each with 1,000 input tokens and 500 output tokens, gives a rough sense
        of monthly spend once multiplied by a model&apos;s per-token pricing — enter your own numbers above for
        an exact estimate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting an LLM-powered feature before launch.</li>
          <li>Comparing costs across OpenAI, Anthropic, and Google models for the same workload.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this pricing accurate?</Typography>
      <Typography variant="body1">
        These figures are approximate, checked against provider documentation as of August 2026. AI API pricing
        changes frequently — always confirm current rates on the provider&apos;s official pricing page before
        budgeting or billing a customer.
      </Typography>
      <Typography variant="h3">How accurate is the token estimate from pasted text?</Typography>
      <Typography variant="body1">
        The ~4-characters-per-token estimate is a common rule of thumb for English text, but actual tokenizers
        differ per model family and count non-English text, code, and whitespace differently. For exact counts,
        use the provider&apos;s official tokenizer.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/ai/llm-cost-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Model</Typography>
            <Select
              fullWidth
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
            >
              {MODELS.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.provider} — {m.label} (${m.inputPer1M}/${m.outputPer1M} per 1M)
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <Box>
              <Typography gutterBottom>Input tokens</Typography>
              <TextField
                fullWidth
                type="number"
                value={inputTokens}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setInputTokens(e.target.value === '' ? 0 : Number(e.target.value))}
              />
            </Box>
            <Box>
              <Typography gutterBottom>Output tokens</Typography>
              <TextField
                fullWidth
                type="number"
                value={outputTokens}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setOutputTokens(e.target.value === '' ? 0 : Number(e.target.value))}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Requests per month</Typography>
            <TextField
              fullWidth
              type="number"
              value={monthlyRequests}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setMonthlyRequests(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">req/mo</InputAdornment> } }}
            />
          </Box>

          <Accordion sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Don&apos;t know your token counts? Estimate from text
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                Estimated at ~{CHARS_PER_TOKEN} characters per token. Paste your prompt and expected response below.
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="Paste your prompt / system message / context here..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                ≈ {estimatedInputTokens.toLocaleString()} input tokens
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="Paste an example response here..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                sx={{ mt: 2, mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                ≈ {estimatedOutputTokens.toLocaleString()} output tokens
              </Typography>
              <Chip
                label="Use these estimates"
                color="primary"
                onClick={applyEstimate}
                clickable
                disabled={!promptText && !responseText}
              />
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Cost per Request</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
              {formatUSD(costPerRequest)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Input Cost</Typography>
                <Typography variant="h6">{formatUSD(inputCost)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Output Cost</Typography>
                <Typography variant="h6">{formatUSD(outputCost)}</Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">
                Monthly cost at {monthlyRequests.toLocaleString()} requests
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {formatUSD(monthlyCost)}
              </Typography>
            </Box>

            {(inputCost > 0 || outputCost > 0) && (
              <Box sx={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: number) => formatUSD(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Compare across models
        </Typography>
        <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>Model</TableCell>
                <TableCell align="right">Per 1M (in/out)</TableCell>
                <TableCell align="right">Cost / Request</TableCell>
                <TableCell align="right">Monthly Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comparisonRows.map((row) => (
                <TableRow
                  key={row.id}
                  selected={row.id === modelId}
                  hover
                  onClick={() => setModelId(row.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{row.provider} — {row.label}</TableCell>
                  <TableCell align="right">${row.inputPer1M} / ${row.outputPer1M}</TableCell>
                  <TableCell align="right">{formatUSD(row.cost)}</TableCell>
                  <TableCell align="right">{formatUSD(row.monthlyCost)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LLMCostCalculator;
