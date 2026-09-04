'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { schemaToJava } from './graphqlEngine';

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

const GraphqlToJavaContent = () => {
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
    schemaToJava(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">Java Classes</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Java output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const GraphqlToJava = () => {
  const content = (
    <>
      <Typography variant="h2">Free GraphQL Schema to Java Converter</Typography>
      <Typography variant="body1">
        Paste a GraphQL SDL schema to instantly generate matching Java POJO classes and enums, with
        getters and setters stubbed out for every field.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your GraphQL schema definition language (SDL) into the input box, or click &quot;Load Example&quot;
        to see a sample run. The tool builds a real schema with GraphQL.js, then walks every object,
        interface, and input type into a plain Java class with private fields plus public getters and
        setters, and every enum into a real Java <code>enum</code>. Scalars map onto boxed Java types
        (<code>String</code>, <code>Integer</code>, <code>Double</code>, <code>Boolean</code>), and list
        types become <code>List&lt;T&gt;</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A <code>Post</code> type with <code>id: ID!</code> and <code>title: String!</code> generates a
        <code> public class Post</code> with <code>private String id;</code> and
        <code> private String title;</code>, plus matching <code>getId()</code>/<code>setId()</code> and
        <code> getTitle()</code>/<code>setTitle()</code> methods.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Bootstrapping Java DTOs for a GraphQL client or server implementation on the JVM.</li>
          <li>Speeding up manual POJO authoring when adopting a GraphQL schema in a Java codebase.</li>
          <li>Reviewing how a schema&apos;s types would map onto a statically typed, object-oriented language.</li>
          <li>Generating a starting point for graphql-java resolver return types.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are GraphQL non-null and list rules reflected in the Java output?</Typography>
      <Typography variant="body1">
        List types become <code>List&lt;T&gt;</code> regardless of nullability, since Java has no built-in
        non-null type annotation without an extra dependency — the tool keeps the generated classes simple
        and lets you add validation or <code>@NonNull</code> annotations yourself where needed.
      </Typography>
      <Typography variant="h3">How are custom scalars handled?</Typography>
      <Typography variant="body1">
        Any scalar beyond the five built-ins (<code>String</code>, <code>Int</code>, <code>Float</code>,
        <code>Boolean</code>, <code>ID</code>) maps to Java&apos;s <code>Object</code> as a safe fallback —
        replace it with your actual scalar&apos;s Java representation by hand.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and code generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/graphql-to-java" content={content}>
      <GraphqlToJavaContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GraphqlToJava;
