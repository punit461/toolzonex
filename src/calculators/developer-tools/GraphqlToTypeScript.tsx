'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { schemaToTypeScript } from './graphqlEngine';

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

const GraphqlToTypeScriptContent = () => {
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
    schemaToTypeScript(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">TypeScript Interfaces</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'TypeScript output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const GraphqlToTypeScript = () => {
  const content = (
    <>
      <Typography variant="h2">Free GraphQL Schema to TypeScript Converter</Typography>
      <Typography variant="body1">
        Paste a GraphQL SDL schema to instantly generate matching TypeScript <code>interface</code>
        declarations and string-literal union types, with GraphQL&apos;s nullability rules mapped onto
        TypeScript&apos;s optional and nullable field syntax.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your GraphQL schema definition language (SDL) into the input box, or click &quot;Load Example&quot;
        to see a sample run. The tool builds a real schema with GraphQL.js, then walks every object,
        interface, and input type into a TypeScript interface, and every enum into a union of string
        literals. Scalars map onto their closest TypeScript equivalent, list types become arrays, and any
        field that isn&apos;t wrapped in GraphQL&apos;s non-null (<code>!</code>) marker becomes
        <code>{' field?: T | null'}</code> to reflect that it can be both omitted and explicitly null.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A <code>User</code> type with <code>id: ID!</code>, <code>email: String</code>, and
        <code> posts: [Post!]!</code> generates <code>id: string;</code>, <code>email?: string | null;</code>,
        and <code>posts: Post[];</code> — the non-null list of non-null posts stays a plain required array,
        while the nullable scalar becomes optional and nullable.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Bootstrapping TypeScript types for a GraphQL API client without running a full codegen setup.</li>
          <li>Checking at a glance how a schema&apos;s nullability rules translate into TypeScript.</li>
          <li>Reviewing a schema design by reading its generated interfaces.</li>
          <li>Speeding up a manual TypeScript migration for a project already using GraphQL SDL.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How are custom scalars handled?</Typography>
      <Typography variant="body1">
        Any scalar beyond the five built-ins (<code>String</code>, <code>Int</code>, <code>Float</code>,
        <code>Boolean</code>, <code>ID</code>) maps to TypeScript&apos;s <code>any</code>, and the tool adds
        a comment above the generated interfaces naming every custom scalar it encountered so you can refine
        the type by hand.
      </Typography>
      <Typography variant="h3">Why does a nullable field get both <code>?</code> and <code>| null</code>?</Typography>
      <Typography variant="body1">
        GraphQL&apos;s nullable fields can be two different things: absent from the response entirely, or
        present with an explicit <code>null</code> value. TypeScript&apos;s optional marker (<code>?</code>)
        only covers the first case, so the tool adds <code>| null</code> as well to cover both.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/graphql-to-typescript" content={content}>
      <GraphqlToTypeScriptContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GraphqlToTypeScript;
