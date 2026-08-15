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
}

const PdfFileDropzone = ({ onFilesSelected, multiple = false, accept = 'application/pdf', label = 'PDF file', selectedNames = [] }: Props) => {
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
        </Box>
      ) : (
        <Box>
          <UploadFileIcon sx={{ fontSize: 40, mb: 1, color: 'text.secondary' }} />
          <Typography variant="body1">Click to select {multiple ? `${label}s` : `a ${label}`}, or drag and drop</Typography>
          <Typography variant="caption" color="text.secondary">Your file never leaves your browser</Typography>
        </Box>
      )}
      {selectedNames.length === 0 && (
        <Button size="small" sx={{ mt: 2 }} variant="outlined">Choose File{multiple ? 's' : ''}</Button>
      )}
    </Box>
  );
};

export default PdfFileDropzone;
