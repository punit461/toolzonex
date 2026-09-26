'use client';

import { useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';

interface Props {
  onFilesSelected: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
  selectedNames?: string[];
  /** Overrides the privacy caption for tools that send something off-device (Translate PDF sends the extracted text). */
  privacyNote?: string;
}

const PdfFileDropzone = ({ onFilesSelected, multiple = false, accept = 'application/pdf', label = 'PDF file', selectedNames = [], privacyNote = 'Your file never leaves your browser' }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    onFilesSelected(Array.from(fileList));
  };

  return (
    <Box
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      sx={{
        border: '2px dashed',
        borderColor: isDragOver ? 'primary.main' : 'divider',
        borderRadius: 2,
        p: 4,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: isDragOver ? 'action.hover' : 'transparent',
        transition: 'all 0.15s',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      {selectedNames.length > 0 ? (
        <Box>
          <DescriptionIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          {selectedNames.map((name) => (
            <Typography key={name} variant="body2" sx={{ wordBreak: 'break-all' }}>{name}</Typography>
          ))}
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Click or drop to replace
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{privacyNote}</Typography>
        </Box>
      ) : (
        <Box>
          <UploadFileIcon sx={{ fontSize: 40, mb: 1, color: 'text.secondary' }} />
          <Typography variant="body1">Click to select {multiple ? `${label}s` : `a ${label}`}, or drag and drop</Typography>
          <Typography variant="caption" color="text.secondary">{privacyNote}</Typography>
        </Box>
      )}
      {/* The keyboard route into every PDF tool: the dashed area is mouse-only,
          and this button used to vanish once a file was chosen, leaving
          keyboard users no way to pick a different one. */}
      <Button
        size="small"
        sx={{ mt: 2 }}
        variant="outlined"
        onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
      >
        {selectedNames.length > 0 ? `Replace file${multiple ? 's' : ''}` : `Choose File${multiple ? 's' : ''}`}
      </Button>
    </Box>
  );
};

export default PdfFileDropzone;
