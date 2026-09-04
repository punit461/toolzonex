'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { schemaToAst } from './graphqlEngine';

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

const GraphqlToSchemaAstContent = () => {
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
    schemaToAst(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">Simplified AST (JSON)</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'AST output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const GraphqlToSchemaAst = () => {
  const content = (
    <>
      <Typography variant="h2">Free GraphQL Schema to AST Converter</Typography>
      <Typography variant="body1">
        Paste a GraphQL SDL schema to parse it into an abstract syntax tree and see a clean, readable JSON
        view of every type definition — its kind, name, and fields — without the location and token noise
        of a raw parser AST.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your GraphQL schema definition language (SDL) into the input box, or click &quot;Load Example&quot;
        to see a sample run. The tool parses your SDL into a document of definitions, then walks each
        definition — object types, interfaces, input types, enums, unions, and scalars — into a simplified
        JSON structure showing its kind, name, and field or value names and types.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A <code>type User implements Node {'{'} id: ID! name: String! {'}'}</code> definition becomes a JSON
        entry with <code>kind: &quot;ObjectTypeDefinition&quot;</code>, <code>name: &quot;User&quot;</code>,
        an <code>interfaces</code> array listing <code>Node</code>, and a <code>fields</code> array listing
        each field name paired with its GraphQL type string (<code>ID!</code>, <code>String!</code>).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Understanding how a parser sees your schema without wading through raw location metadata.</li>
          <li>Debugging why a schema fails to parse by inspecting the definitions that did parse.</li>
          <li>Feeding a simplified structure into a custom codegen or documentation script.</li>
          <li>Learning the shape of GraphQL&apos;s type system definitions while studying the spec.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why isn&apos;t this the full raw AST from the parser?</Typography>
      <Typography variant="body1">
        The raw AST that GraphQL.js produces includes a <code>loc</code> object with source line/column
        offsets on every single node, which adds a lot of noise without adding insight for most use cases.
        This tool strips that out and keeps only the parts you usually care about: type kind, name, and
        field/value structure.
      </Typography>
      <Typography variant="h3">Does this validate my schema, or just parse it?</Typography>
      <Typography variant="body1">
        Only parsing — syntactic validity is checked, but semantic rules (like whether an interface&apos;s
        fields are actually implemented) are not. Use the GraphQL to Introspection JSON tool if you need a
        fully built and validated schema.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing happens entirely client-side in your browser. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/graphql-to-schema-ast" content={content}>
      <GraphqlToSchemaAstContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GraphqlToSchemaAst;
