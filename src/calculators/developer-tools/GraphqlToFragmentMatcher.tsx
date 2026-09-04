'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { schemaToFragmentMatcher } from './graphqlEngine';

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

const GraphqlToFragmentMatcherContent = () => {
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
    schemaToFragmentMatcher(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">Fragment Matcher JSON</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Fragment matcher JSON will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const GraphqlToFragmentMatcher = () => {
  const content = (
    <>
      <Typography variant="h2">Free GraphQL Schema to Fragment Matcher Converter</Typography>
      <Typography variant="body1">
        Paste a GraphQL SDL schema to instantly generate Apollo Client&apos;s classic
        <code> IntrospectionFragmentMatcher</code> JSON shape, listing every concrete type that implements
        each interface and every member of each union in your schema.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your GraphQL schema definition language (SDL) into the input box, or click &quot;Load Example&quot;
        to see a sample run. The tool builds a real schema with GraphQL.js, finds every interface and union
        type, resolves their concrete possible types using the schema&apos;s own type relationships, and
        emits the <code>{'{ "__schema": { "types": [...] } }'}</code> JSON shape that Apollo Client&apos;s
        older <code>IntrospectionFragmentMatcher</code> expects.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A <code>union SearchResult = User | Post</code> generates a types entry with
        <code>{' "kind": "UNION", "name": "SearchResult"'}</code> and
        <code>{' "possibleTypes": [{"name": "User"}, {"name": "Post"}]'}</code>, letting Apollo Client
        correctly match fragments written against that union without a network round trip.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Configuring Apollo Client&apos;s cache to correctly match fragments on interfaces and unions.</li>
          <li>Avoiding &quot;Heuristic fragment matching going on&quot; warnings in older Apollo Client setups.</li>
          <li>Auditing which concrete types implement a given interface across a large schema.</li>
          <li>Keeping a fragment matcher file in sync after adding a new type to an existing union.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this still relevant for newer versions of Apollo Client?</Typography>
      <Typography variant="body1">
        Apollo Client 3+ generally recommends <code>possibleTypes</code> generated by
        <code> @graphql-codegen/fragment-matcher</code> instead of the older
        <code> IntrospectionFragmentMatcher</code> class, but the underlying data — which concrete types
        satisfy which interface or union — is the same, so this output is still useful as a reference or for
        projects still on the classic API.
      </Typography>
      <Typography variant="h3">What if my schema has no interfaces or unions?</Typography>
      <Typography variant="body1">
        The output&apos;s <code>types</code> array will simply be empty — there&apos;s nothing to resolve
        possible types for without at least one interface or union in the schema.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and resolution happen entirely client-side in your browser. Nothing you paste is sent
        to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/graphql-to-fragment-matcher" content={content}>
      <GraphqlToFragmentMatcherContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GraphqlToFragmentMatcher;
