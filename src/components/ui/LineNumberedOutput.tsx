'use client';

import { Box } from '@mui/material';
import { LINE_HEIGHT, FONT_SIZE, PADDING_Y, MONO_FONT } from './LineNumberedTextarea';

export interface OutputSegment {
  text: string;
  added?: boolean;
  removed?: boolean;
}

export interface OutputLine {
  number: number | null;
  segments: OutputSegment[];
  /** Row-level highlight, used when a whole line was added/removed (side-by-side view). */
  lineType?: 'added' | 'removed' | 'empty';
}

const segmentStyle = (segment: OutputSegment) => ({
  color: segment.added ? '#166534' : segment.removed ? '#991b1b' : 'inherit',
  backgroundColor: segment.added ? '#bbf7d0' : segment.removed ? '#fca5a5' : 'transparent',
  textDecoration: segment.removed ? 'line-through' : 'none',
  padding: segment.added || segment.removed ? '0 2px' : 0,
  borderRadius: '3px',
});

const rowBg = (lineType?: OutputLine['lineType']) => {
  if (lineType === 'added') return 'rgba(187, 247, 208, 0.35)';
  if (lineType === 'removed') return 'rgba(252, 165, 165, 0.35)';
  if (lineType === 'empty') return 'action.hover';
  return 'transparent';
};

/** Read-only, line-numbered rendering of diff output. Shares sizing with LineNumberedTextarea so inputs and outputs line up visually. */
const LineNumberedOutput = ({ lines, maxRows = 30 }: { lines: OutputLine[]; maxRows?: number }) => {
  const visibleRows = Math.min(Math.max(lines.length, 1), maxRows);
  const boxHeight = visibleRows * LINE_HEIGHT + PADDING_Y * 2;

  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{
          flexShrink: 0,
          width: 48,
          height: boxHeight,
          overflowY: 'hidden',
          boxSizing: 'border-box',
          pt: `${PADDING_Y}px`,
          pr: 1,
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'action.hover',
          userSelect: 'none',
          fontFamily: MONO_FONT,
          fontSize: FONT_SIZE,
          color: 'text.secondary',
          textAlign: 'right',
        }}
      >
        {lines.map((line, i) => (
          <Box key={i} sx={{ height: LINE_HEIGHT, lineHeight: `${LINE_HEIGHT}px` }}>
            {line.number ?? ''}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          flex: 1,
          height: boxHeight,
          boxSizing: 'border-box',
          overflow: 'auto',
          px: 2,
          py: `${PADDING_Y}px`,
          fontFamily: MONO_FONT,
          fontSize: FONT_SIZE,
          whiteSpace: 'pre',
        }}
      >
        {lines.map((line, i) => (
          <Box key={i} sx={{ height: LINE_HEIGHT, lineHeight: `${LINE_HEIGHT}px`, bgcolor: rowBg(line.lineType) }}>
            {line.segments.length === 0 ? ' ' : line.segments.map((segment, j) => (
              <span key={j} style={segmentStyle(segment)}>{segment.text}</span>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LineNumberedOutput;
