'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { schemaToComponents } from './graphqlEngine';

const SAMPLE = `query GetUser {
  user(id: "1") {
    id
    name
    email
  }
}
`;

const GraphqlToComponentsContent = () => {
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
    schemaToComponents(input).then((result) => {
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
        <Typography variant="subtitle1" fontWeight="600">Paste GraphQL Operation (query / mutation), not a schema</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">React Component Scaffold</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Component scaffold will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const GraphqlToComponents = () => {
  const content = (
    <>
      <Typography variant="h2">Free GraphQL Operation to React Component Scaffold Generator</Typography>
      <Typography variant="body1">
        Paste a GraphQL <strong>operation</strong> — a <code>query</code> or <code>mutation</code>, not a
        full schema — to generate a starting-point React component scaffold: a props/data interface and a
        component body with an Apollo Client <code>useQuery</code> stub already wired up.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a GraphQL operation into the input box, or click &quot;Load Example&quot; to see a sample run.
        Unlike the other GraphQL tools on this site, this one takes an operation (a <code>query</code> or
        <code> mutation</code> block with a selection set) rather than a schema. The tool parses the
        operation, reads its top-level selected fields, and generates a component that embeds your query
        text in a <code>gql</code> tag, calls <code>useQuery</code>, and renders each top-level field as a
        placeholder <code>{'<div>{data?.fieldName}</div>'}</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A <code>query GetUser {'{ user(id: "1") { id name email } }'}</code> operation generates a
        <code> UserView</code> component with a <code>UserQueryData</code> interface describing a
        <code> user</code> field, a <code>useQuery&lt;UserQueryData&gt;(QUERY)</code> call, and a
        <code> {'<div>{data?.user}</div>'}</code> placeholder for you to replace with real markup.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a quick starting skeleton when wiring a new GraphQL query into a React component.</li>
          <li>Reminding yourself of the boilerplate shape for an Apollo Client <code>useQuery</code> hook.</li>
          <li>Speeding up the first draft of a component before filling in real UI and styling.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is the generated component complete and ready to run?</Typography>
      <Typography variant="body1">
        No — this is intentionally a best-effort scaffold, not complete, runnable, or styled code. It
        assumes you&apos;re using Apollo Client and its <code>useQuery</code> hook; if you use a different
        GraphQL client (Relay, urql, raw fetch, etc.), you&apos;ll need to swap that part out entirely. The
        JSX placeholders (<code>{'<div>{data?.fieldName}</div>'}</code>) are unstyled stand-ins, loading and
        error handling are minimal, and you&apos;ll still need to build the actual UI, choose your GraphQL
        client if not Apollo, and handle loading/error states properly before shipping it.
      </Typography>
      <Typography variant="h3">Why does it want an operation instead of a schema?</Typography>
      <Typography variant="body1">
        A component renders the result of running one specific query or mutation, not an entire schema — so
        this tool needs the actual operation (with its selection set) to know which fields the component
        should expect back in <code>data</code>.
      </Typography>
      <Typography variant="h3">Is my operation uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and scaffold generation happen entirely client-side in your browser. Nothing you paste
        is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/graphql-to-components" content={content}>
      <GraphqlToComponentsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GraphqlToComponents;
