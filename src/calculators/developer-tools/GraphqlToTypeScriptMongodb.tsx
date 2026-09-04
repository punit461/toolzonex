'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { schemaToTypeScriptMongodb } from './graphqlEngine';

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

const GraphqlToTypeScriptMongodbContent = () => {
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
    schemaToTypeScriptMongodb(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">TypeScript + MongoDB Interfaces</Typography>
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

const GraphqlToTypeScriptMongodb = () => {
  const content = (
    <>
      <Typography variant="h2">Free GraphQL Schema to TypeScript MongoDB Converter</Typography>
      <Typography variant="body1">
        Paste a GraphQL SDL schema to generate TypeScript interfaces in the spirit of
        <code> graphql-codegen-typescript-mongodb</code>, with an approximate <code>_id</code> field added to
        every generated type.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your GraphQL schema definition language (SDL) into the input box, or click &quot;Load Example&quot;
        to see a sample run. The tool generates the same TypeScript interfaces as the plain GraphQL to
        TypeScript converter, then adds an optional <code>_id?: string;</code> field to every generated
        interface to approximate what Apollo&apos;s <code>graphql-codegen-typescript-mongodb</code> plugin
        would add for types backed by a MongoDB collection.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A <code>User</code> type generates its usual fields (<code>id</code>, <code>name</code>,
        <code>email</code>, <code>posts</code>) plus an added <code>_id?: string;</code> line and a comment
        noting that this is an approximation, not an exact reproduction of the real plugin&apos;s behavior.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough starting point for MongoDB-backed GraphQL resolver types.</li>
          <li>Seeing at a glance how an <code>_id</code> field would slot into your existing interfaces.</li>
          <li>Quick prototyping before setting up the real graphql-codegen plugin toolchain.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this an exact match for the real graphql-codegen-typescript-mongodb plugin?</Typography>
      <Typography variant="body1">
        No — this is explicitly a best-effort approximation. The real plugin only adds an <code>_id</code>
        field to types you&apos;ve explicitly mapped to a MongoDB collection (typically typed as
        <code> ObjectID</code> rather than <code>string</code>), and supports additional configuration this
        tool doesn&apos;t attempt to replicate. This tool adds <code>_id?: string;</code> to every generated
        interface as a rough, best-effort stand-in — treat it as a starting point, not a drop-in replacement
        for running the real codegen plugin.
      </Typography>
      <Typography variant="h3">How are custom scalars and nullability handled?</Typography>
      <Typography variant="body1">
        The same as the plain GraphQL to TypeScript converter — custom scalars map to <code>any</code> with
        a comment, and nullable fields become <code>field?: T | null</code>.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/graphql-to-typescript-mongodb" content={content}>
      <GraphqlToTypeScriptMongodbContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GraphqlToTypeScriptMongodb;
