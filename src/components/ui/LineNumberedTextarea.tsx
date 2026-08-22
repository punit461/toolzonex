'use client';

import { useRef } from 'react';
import { Box } from '@mui/material';

// Shared sizing so line numbers stay pixel-aligned with text across tools
// (online notepad, text diff, etc). Wrapping is disabled on purpose here —
// numbers only line up with text when lines don't visually wrap.
export const LINE_HEIGHT = 24;
export const FONT_SIZE = 15;
export const PADDING_Y = 12;
export const MONO_FONT = '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

interface LineNumberedTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
}

const LineNumberedTextarea = ({ value, onChange, placeholder, minRows = 10, maxRows = 30 }: LineNumberedTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lineCount = value.split('\n').length;
  const visibleRows = Math.min(Math.max(lineCount, minRows), maxRows);
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
        '&:focus-within': {
          borderColor: 'primary.main',
          borderWidth: '2px',
          m: '-1px',
        },
      }}
    >
      <Box
        ref={gutterRef}
        aria-hidden
        sx={{
          flexShrink: 0,
          width: 48,
          height: boxHeight,
          overflow: 'hidden',
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
        {Array.from({ length: lineCount }, (_, i) => (
          <Box key={i} sx={{ height: LINE_HEIGHT, lineHeight: `${LINE_HEIGHT}px` }}>
            {i + 1}
          </Box>
        ))}
      </Box>

      <Box
        component="textarea"
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        sx={{
          flex: 1,
          height: boxHeight,
          boxSizing: 'border-box',
          border: 'none',
          outline: 'none',
          resize: 'none',
          bgcolor: 'transparent',
          color: 'text.primary',
          px: 2,
          py: `${PADDING_Y}px`,
          fontFamily: MONO_FONT,
          fontSize: FONT_SIZE,
          lineHeight: `${LINE_HEIGHT}px`,
          whiteSpace: 'pre',
          overflow: 'auto',
        }}
      />
    </Box>
  );
};

export default LineNumberedTextarea;
