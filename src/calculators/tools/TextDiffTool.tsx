'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import * as diff from 'diff';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import LineNumberedTextarea from '../../components/ui/LineNumberedTextarea';
import LineNumberedOutput, { OutputLine } from '../../components/ui/LineNumberedOutput';
import { LINE_HEIGHT, FONT_SIZE, MONO_FONT } from '../../components/ui/LineNumberedTextarea';

type ViewMode = 'inline' | 'side-by-side';

interface SideBySideRow {
  leftNum: number | null;
  leftText: string | null;
  leftType: 'unchanged' | 'removed' | 'empty';
  rightNum: number | null;
  rightText: string | null;
  rightType: 'unchanged' | 'added' | 'empty';
}

// Word-level diff parts don't respect line boundaries, so split them back
// into lines to number the inline (merged) view.
const buildInlineLines = (parts: diff.Change[]): OutputLine[] => {
  const lines: OutputLine['segments'][] = [[]];
  parts.forEach((part) => {
    const chunks = part.value.split('\n');
    chunks.forEach((chunk, idx) => {
      if (chunk !== '') {
        lines[lines.length - 1].push({ text: chunk, added: part.added, removed: part.removed });
      }
      if (idx < chunks.length - 1) {
        lines.push([]);
      }
    });
  });
  return lines.map((segments, i) => ({ number: i + 1, segments }));
};

// Line-level diff aligned into two columns: removed lines only occupy the
// left column, added lines only occupy the right column.
const buildSideBySideRows = (parts: diff.Change[]): SideBySideRow[] => {
  const rows: SideBySideRow[] = [];
  let leftNum = 1;
  let rightNum = 1;
  parts.forEach((part) => {
    const lines = part.value.split('\n');
    if (lines[lines.length - 1] === '') lines.pop();
    lines.forEach((line) => {
      if (part.added) {
        rows.push({ leftNum: null, leftText: null, leftType: 'empty', rightNum: rightNum++, rightText: line, rightType: 'added' });
      } else if (part.removed) {
        rows.push({ leftNum: leftNum++, leftText: line, leftType: 'removed', rightNum: null, rightText: null, rightType: 'empty' });
      } else {
        rows.push({ leftNum: leftNum++, leftText: line, leftType: 'unchanged', rightNum: rightNum++, rightText: line, rightType: 'unchanged' });
      }
    });
  });
  return rows;
};

const sideRowBg = (type: SideBySideRow['leftType'] | SideBySideRow['rightType']) => {
  if (type === 'removed') return 'rgba(252, 165, 165, 0.35)';
  if (type === 'added') return 'rgba(187, 247, 208, 0.35)';
  if (type === 'empty') return 'action.hover';
  return 'transparent';
};

const SideBySideDiffOutput = ({ rows }: { rows: SideBySideRow[] }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: '48px 1fr 48px 1fr',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      bgcolor: 'background.paper',
      overflow: 'hidden',
      fontFamily: MONO_FONT,
      fontSize: FONT_SIZE,
    }}
  >
    {rows.map((row, i) => (
      <Box key={i} sx={{ display: 'contents' }}>
        <Box sx={{ px: 1, py: 0.5, minHeight: LINE_HEIGHT, textAlign: 'right', color: 'text.secondary', bgcolor: 'action.hover', borderRight: '1px solid', borderColor: 'divider', userSelect: 'none' }}>
          {row.leftNum ?? ''}
        </Box>
        <Box sx={{ px: 1.5, py: 0.5, minHeight: LINE_HEIGHT, whiteSpace: 'pre-wrap', wordBreak: 'break-word', bgcolor: sideRowBg(row.leftType), borderRight: '1px solid', borderColor: 'divider' }}>
          {row.leftText ?? ''}
        </Box>
        <Box sx={{ px: 1, py: 0.5, minHeight: LINE_HEIGHT, textAlign: 'right', color: 'text.secondary', bgcolor: 'action.hover', borderRight: '1px solid', borderColor: 'divider', userSelect: 'none' }}>
          {row.rightNum ?? ''}
        </Box>
        <Box sx={{ px: 1.5, py: 0.5, minHeight: LINE_HEIGHT, whiteSpace: 'pre-wrap', wordBreak: 'break-word', bgcolor: sideRowBg(row.rightType) }}>
          {row.rightText ?? ''}
        </Box>
      </Box>
    ))}
  </Box>
);

const TextDiffToolContent = () => {
  const [originalText, setOriginalText] = useState<string>('The quick brown fox jumps over the lazy dog.\nThis is a second line.');
  const [modifiedText, setModifiedText] = useState<string>('The fast brown fox jumps over the lazy dog.\nThis is a second line.\nAnd here is a third line.');

  const [viewMode, setViewMode] = useState<ViewMode>('inline');
  const [inlineLines, setInlineLines] = useState<OutputLine[]>([]);
  const [sideRows, setSideRows] = useState<SideBySideRow[]>([]);
  const [hasCompared, setHasCompared] = useState(false);

  const compareText = () => {
    setInlineLines(buildInlineLines(diff.diffWordsWithSpace(originalText, modifiedText)));
    setSideRows(buildSideBySideRows(diff.diffLines(originalText, modifiedText)));
    setHasCompared(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

      {/* Input Panels */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Original Text</Typography>
          <LineNumberedTextarea
            value={originalText}
            onChange={setOriginalText}
            placeholder="Paste the original text here..."
            minRows={10}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Modified Text</Typography>
          <LineNumberedTextarea
            value={modifiedText}
            onChange={setModifiedText}
            placeholder="Paste the modified text here..."
            minRows={10}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" size="large" onClick={compareText} sx={{ px: 6 }}>
          Compare Text
        </Button>
      </Box>

      {/* Output Panel */}
      {hasCompared && (
        <Paper variant="outlined" sx={{ p: 4, bgcolor: '#fafafa' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
            <Typography variant="h6">Difference Result</Typography>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              size="small"
              onChange={(_, next) => next && setViewMode(next)}
            >
              <ToggleButton value="inline">
                <ViewStreamIcon sx={{ mr: 1 }} fontSize="small" /> Inline
              </ToggleButton>
              <ToggleButton value="side-by-side">
                <ViewColumnIcon sx={{ mr: 1 }} fontSize="small" /> Side by Side
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#fca5a5', borderRadius: 0.5 }} />
              <Typography variant="body2">Removed</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#bbf7d0', borderRadius: 0.5 }} />
              <Typography variant="body2">Added</Typography>
            </Box>
          </Box>

          {viewMode === 'inline' ? (
            <LineNumberedOutput lines={inlineLines} />
          ) : (
            <SideBySideDiffOutput rows={sideRows} />
          )}
        </Paper>
      )}

    </Box>
  );
};

const TextDiffTool = () => {
  const content = (
    <>
      <Typography variant="h2">Free Online Text Diff Tool</Typography>
      <Typography variant="body1">
        Compare two text documents to see exactly what changed. Our diff checker highlights the differences word-by-word, making it easy to spot additions and deletions between versions of an essay, code snippet, or article.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your original text on the left and the edited version on the right — added and removed words are
        highlighted instantly. Switch between an inline merged view or a side-by-side view, both with line
        numbers, using the toggle above the result.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Comparing &quot;The quick brown fox&quot; with &quot;The quick red fox jumps&quot; highlights
        &quot;brown&quot; as removed and &quot;red&quot; and &quot;jumps&quot; as added.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing two drafts of an essay or article to see what was edited.</li>
          <li>Spotting changes between two versions of a code snippet or config file.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it compare whole words or individual characters?</Typography>
      <Typography variant="body1">
        The comparison highlights differences at the word level, making changes easier to read than a
        character-by-character diff.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between inline and side-by-side view?</Typography>
      <Typography variant="body1">
        Inline view merges both texts into one numbered passage with removals struck through and additions
        highlighted. Side-by-side view lists the original and modified text in two numbered columns, similar to
        a code review diff, so you can see each version&apos;s line numbers independently.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/text-diff-tool"
      content={content}
    >
      <TextDiffToolContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextDiffTool;
