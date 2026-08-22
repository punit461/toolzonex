'use client';

import { Typography, Box } from '@mui/material';
import RouterLink from 'next/link';
import BlogShell, { RelatedTool } from '../../components/BlogShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const relatedTools: RelatedTool[] = [
  {
    label: 'LLM Cost Calculator',
    path: '/ai/llm-cost-calculator',
    description: 'Estimate the cost of a single call or a full month of traffic across OpenAI, Anthropic, and Google models.',
  },
  {
    label: 'GPU Cost Calculator',
    path: '/ai/gpu-cost-calculator',
    description: 'Compare cloud GPU rental rates if you\'re self-hosting a model instead of calling an API.',
  },
];

const LlmApiPricingGuide = () => {
  return (
    <BlogShell
      title="How Much Do LLM API Calls Actually Cost? A Practical Guide"
      description="LLM pricing is split into input and output tokens, and the two rarely cost the same. Here's how the major providers charge, what actually drives your bill, and how to estimate it before you ship."
      url="/blog/llm-api-pricing-guide"
      date="August 2026"
      relatedTools={relatedTools}
    >
      <Typography variant="body1">
        If you&apos;ve ever been surprised by an OpenAI, Anthropic, or Google Gemini bill, it&apos;s usually
        because of one detail teams overlook until it&apos;s too late: <strong>input tokens and output tokens
        are priced separately, and output is almost always the more expensive half.</strong>
      </Typography>

      <Typography variant="h2">The two numbers that matter</Typography>
      <Typography variant="body1">
        Every major provider prices per million tokens, split into:
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Input tokens</strong> — your prompt, system instructions, conversation history, and any retrieved context (RAG chunks, tool results) you send with the request.</li>
          <li><strong>Output tokens</strong> — what the model generates back. This is typically 3-5x more expensive per token than input, since generation is the computationally heavier half of the request.</li>
        </ul>
      </Box>
      <Typography variant="body1">
        That asymmetry is why a chatbot that echoes short answers is cheap, while a coding assistant or
        long-form writing tool that generates thousands of output tokens per response can get expensive fast —
        even if the input prompt is identical.
      </Typography>

      <Typography variant="h2">Roughly what things cost today</Typography>
      <Typography variant="body1">
        Pricing changes often, but as a snapshot (checked against provider documentation as of August 2026),
        cost per million tokens spans a wide range depending on model tier:
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Small/fast models</strong> (GPT-4o mini, Gemini 2.5 Flash-Lite) — a few cents per million input tokens, well under a dollar for output. Good for classification, extraction, and high-volume simple tasks.</li>
          <li><strong>Mid-tier models</strong> (Gemini 2.5 Flash, Claude Haiku) — roughly $0.30-$1 per million input, $2-5 per million output. The default choice for most production chat and agent workloads.</li>
          <li><strong>Frontier models</strong> (GPT-4.1, GPT-4o, Claude Sonnet, Gemini 2.5 Pro) — $2-3 per million input, $8-15 per million output. Reserved for tasks that genuinely need the strongest reasoning.</li>
          <li><strong>Top-tier/flagship models</strong> (Claude Opus, Claude Fable) — $5-10 per million input, $25-50 per million output — the most capable tier, priced accordingly.</li>
        </ul>
      </Box>
      <Typography variant="body1">
        These bands shift constantly as providers release new models and cut prices on older ones, so always
        check current rates before budgeting — the <RouterLink href="/ai/llm-cost-calculator">LLM Cost
        Calculator</RouterLink> keeps a running set of current per-model rates you can plug your own volume into.
      </Typography>

      <Typography variant="h2">The lever most teams miss: prompt caching</Typography>
      <Typography variant="body1">
        If your requests repeat the same system prompt, few-shot examples, or long context (a codebase, a
        document, a big tool schema) across many calls, prompt caching can cut costs substantially — providers
        discount cached input tokens because they don&apos;t need to reprocess content they&apos;ve already
        seen recently. For any app sending the same large context repeatedly, this is usually the single
        biggest cost lever available, often bigger than switching to a cheaper model.
      </Typography>

      <Typography variant="h2">A worked example</Typography>
      <Typography variant="body1">
        Say you&apos;re running a support chatbot that handles 50,000 conversations a month, each averaging
        800 input tokens (system prompt + history) and 300 output tokens (the reply). At a mid-tier model&apos;s
        rates (~$0.30/1M input, ~$2.50/1M output), that&apos;s roughly:
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Input: 50,000 × 800 = 40M tokens → ~$12</li>
          <li>Output: 50,000 × 300 = 15M tokens → ~$37.50</li>
          <li>Total: ~$50/month</li>
        </ul>
      </Box>
      <Typography variant="body1">
        Swap in a frontier model at 10x the per-token rate and the same volume jumps to roughly $500/month —
        which is exactly why picking the right model tier for the task, not just the most capable one, is the
        first cost decision worth making.
      </Typography>

      <Typography variant="h2">API calls vs. self-hosting</Typography>
      <Typography variant="body1">
        Paying per token only makes sense up to a point. At very high, steady volume, self-hosting an
        open-weight model on rented GPU hardware can be cheaper than API calls — but it trades a predictable
        per-token bill for infrastructure to manage (uptime, scaling, batching) and upfront GPU cost. If
        you&apos;re evaluating that tradeoff, the <RouterLink href="/ai/gpu-cost-calculator">GPU Cost
        Calculator</RouterLink> breaks down current hourly rental rates across GPU tiers, from budget inference
        cards to multi-GPU hyperscaler instances.
      </Typography>

      <Typography variant="h2">Before you ship</Typography>
      <Typography variant="body1">
        Run your expected monthly volume through the <RouterLink href="/ai/llm-cost-calculator">LLM Cost
        Calculator</RouterLink> before committing to a model in production. It&apos;s a five-minute check that
        catches the two most common surprises: underestimating output token volume, and picking a
        frontier-tier model for a task a cheaper one would handle just as well.
      </Typography>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </BlogShell>
  );
};

export default LlmApiPricingGuide;
