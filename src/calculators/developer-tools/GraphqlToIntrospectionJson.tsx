'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { schemaToIntrospectionJson } from './graphqlEngine';

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

const GraphqlToIntrospectionJsonContent = () => {
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
    schemaToIntrospectionJson(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">Introspection JSON</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Introspection JSON will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const GraphqlToIntrospectionJson = () => {
  const content = (
    <>
      <Typography variant="h2">Free GraphQL Schema to Introspection JSON Converter</Typography>
      <Typography variant="body1">
        Paste a GraphQL SDL schema to instantly run a real introspection query against it and get back the
        standard introspection JSON result — the same shape tools like GraphiQL, Apollo Studio, and
        codegen pipelines consume to understand your schema.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your GraphQL schema definition language (SDL) into the input box, or click &quot;Load Example&quot;
        to see a sample run. The tool builds a real <code>GraphQLSchema</code> from your SDL using the
        reference <code>graphql</code> library, executes the standard introspection query against it, and
        shows you the resulting JSON.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given a schema with a <code>User</code> type implementing a <code>Node</code> interface, the
        introspection output includes a <code>__schema.types</code> array describing every type, its kind,
        its fields, and their argument and return types — exactly what a client needs to validate queries
        against your schema without a live server.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a static introspection snapshot for tools that need one without a running server.</li>
          <li>Feeding introspection JSON into Apollo Client&apos;s IntrospectionFragmentMatcher setup.</li>
          <li>Debugging what a schema actually exposes, field by field and type by type.</li>
          <li>Producing fixture data for tests that mock a GraphQL schema.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this real introspection or a hand-rolled approximation?</Typography>
      <Typography variant="body1">
        It&apos;s real — the tool builds an actual <code>GraphQLSchema</code> from your SDL and executes the
        standard <code>getIntrospectionQuery()</code> query against it with the reference GraphQL.js engine,
        so the output matches exactly what a live GraphQL server would return.
      </Typography>
      <Typography variant="h3">What happens if my SDL has a syntax error?</Typography>
      <Typography variant="body1">
        The schema build step will fail with a descriptive error message shown above the input, telling you
        roughly where the SDL is invalid, rather than producing partial or incorrect output.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and introspection happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/graphql-to-introspection-json" content={content}>
      <GraphqlToIntrospectionJsonContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GraphqlToIntrospectionJson;
