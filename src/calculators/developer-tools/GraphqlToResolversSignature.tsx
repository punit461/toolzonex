'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { schemaToResolversSignature } from './graphqlEngine';

const SAMPLE = `type Query {
  user(id: ID!): User
}

interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
  email: String
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
}

union SearchResult = User | Post
`;

const GraphqlToResolversSignatureContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    schemaToResolversSignature(input).then((result) => {
      if (ignore) return;
      setOutput(result.output);
      setError(result.error ?? null);
    });
    return () => {
      ignore = true;
    };
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste GraphQL Schema (SDL)</Typography>
        <TextField
          multiline
          rows={18}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={SAMPLE}
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="outlined" size="small" onClick={() => setInput(SAMPLE)} sx={{ alignSelf: 'flex-start' }}>
          Load Example
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Resolver Signatures</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Resolver signatures will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const GraphqlToResolversSignature = () => {
  const content = (
    <>
      <Typography variant="h2">Free GraphQL Schema to Resolvers Signature Converter</Typography>
      <Typography variant="body1">
        Paste a GraphQL SDL schema to instantly generate resolver map stubs for every field on your
        <code> Query</code>, <code>Mutation</code>, and <code>Subscription</code> root types — a ready-made
        skeleton for wiring up your server logic.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your GraphQL schema definition language (SDL) into the input box, or click &quot;Load Example&quot;
        to see a sample run. The tool builds a real schema with GraphQL.js, finds the <code>Query</code>,
        <code>Mutation</code>, and <code>Subscription</code> root types (whichever are present), and emits a
        <code>(parent, args, context, info) =&gt; ReturnType</code> stub for every field, grouped by root
        type, with a comment listing each field&apos;s arguments when it has any.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A <code>Query {'{'} user(id: ID!): User {'}'}</code> field generates a <code>Query</code> block
        containing <code>{'// args: { id: ID! }'}</code> followed by
        <code> user: (parent, args, context, info) =&gt; User,</code> — a stub ready to fill in with your
        actual data-fetching logic.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Scaffolding a resolver map when starting a new Apollo Server or graphql-js server project.</li>
          <li>Making sure every field in a schema has a corresponding resolver stub before implementation.</li>
          <li>Reviewing a schema&apos;s surface area by seeing every resolvable field at a glance.</li>
          <li>Onboarding a new contributor by handing them a checklist of resolvers still to implement.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this generate real resolver logic?</Typography>
      <Typography variant="body1">
        No — it generates signature stubs only. Each resolver body is left empty for you to fill in with
        your actual data-fetching or mutation logic; the tool&apos;s job is to make sure you don&apos;t miss
        a field and to show you each field&apos;s arguments and return type up front.
      </Typography>
      <Typography variant="h3">What if my schema has no Mutation or Subscription type?</Typography>
      <Typography variant="body1">
        The tool only emits a block for root types that actually exist in your schema — if you have no
        <code> Mutation</code> or <code>Subscription</code> type defined, those sections are simply omitted.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and stub generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/graphql-to-resolvers-signature" content={content}>
      <GraphqlToResolversSignatureContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GraphqlToResolversSignature;
