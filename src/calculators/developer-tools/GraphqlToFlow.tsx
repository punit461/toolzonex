'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { schemaToFlow } from './graphqlEngine';

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

const GraphqlToFlowContent = () => {
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
    schemaToFlow(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">Flow Types</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Flow output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const GraphqlToFlow = () => {
  const content = (
    <>
      <Typography variant="h2">Free GraphQL Schema to Flow Converter</Typography>
      <Typography variant="body1">
        Paste a GraphQL SDL schema to instantly generate matching Flow exact object types, with
        GraphQL&apos;s nullability rules mapped onto Flow&apos;s <code>?Type</code> maybe-type syntax.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your GraphQL schema definition language (SDL) into the input box, or click &quot;Load Example&quot;
        to see a sample run. The tool builds a real schema with GraphQL.js, then walks every object,
        interface, and input type into a Flow exact object type (<code>{'{| ... |}'}</code>), and every enum
        into a union of string literals. Scalars map onto their closest Flow equivalent, list types become
        <code>Array&lt;T&gt;</code>, and nullable fields (anything not wrapped in GraphQL&apos;s <code>!</code>
        marker) are marked with Flow&apos;s <code>?Type</code> syntax.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A <code>User</code> type with <code>id: ID!</code>, <code>email: String</code>, and
        <code> posts: [Post!]!</code> generates <code>id: string,</code>, <code>email?: ?string,</code>, and
        <code> posts: Array&lt;Post&gt;,</code> inside a <code>{'type User = {| ... |};'}</code> declaration.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Bootstrapping Flow types for a GraphQL API client in a Flow-typed codebase.</li>
          <li>Comparing how the same schema reads in Flow versus TypeScript syntax.</li>
          <li>Reviewing a schema&apos;s shape without setting up a full Flow codegen pipeline.</li>
          <li>Speeding up manual Flow type authoring for projects already using GraphQL SDL.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why are the generated object types &quot;exact&quot; ({'{| |}'})?</Typography>
      <Typography variant="body1">
        Exact object types (<code>{'{| ... |}'}</code>) reject extra properties that aren&apos;t declared,
        which matches how a GraphQL response is shaped — it only ever contains the fields your query
        selected, so an exact type is the more accurate default.
      </Typography>
      <Typography variant="h3">How are custom scalars handled?</Typography>
      <Typography variant="body1">
        Any scalar beyond the five built-ins (<code>String</code>, <code>Int</code>, <code>Float</code>,
        <code>Boolean</code>, <code>ID</code>) maps to Flow&apos;s <code>any</code>, with a comment listing
        every custom scalar encountered so you can refine it by hand.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/graphql-to-flow" content={content}>
      <GraphqlToFlowContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GraphqlToFlow;
