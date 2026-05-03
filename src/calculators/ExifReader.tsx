'use client';

import { useState, useRef } from 'react';
import { Box, Button, Typography, Paper, Alert, Grid, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import exifr from 'exifr';
import CalculatorShell from '../components/CalculatorShell';

interface ExifData {
  Make?: string;
  Model?: string;
  DateTimeOriginal?: string;
  ExposureTime?: string;
  FNumber?: number;
  ISO?: number;
  FocalLength?: number;
  GPSLatitude?: number;
  GPSLongitude?: number;
  ImageWidth?: number;
  ImageHeight?: number;
  Orientation?: number;
  Software?: string;
  LensModel?: string;
}

const ExifReaderContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError('');
    setFile(selectedFile);
    setExifData(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);

    // Extract EXIF data
    setLoading(true);
    try {
      const data = await exifr.parse(selectedFile, {
        pick: ['Make', 'Model', 'DateTimeOriginal', 'ExposureTime', 'FNumber', 'ISO', 'FocalLength', 'GPSLatitude', 'GPSLongitude', 'ImageWidth', 'ImageHeight', 'Orientation', 'Software', 'LensModel']
      });
      
      if (data) {
        setExifData(data as ExifData);
      } else {
        setError('No EXIF data found in this image. Try a photo taken with a smartphone or camera.');
      }
    } catch (err) {
      setError('Failed to read EXIF data. Make sure this is a valid image file.');
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (key: string, value: any): string => {
    if (value === undefined || value === null) return 'N/A';
    
    switch (key) {
      case 'FNumber':
        return `f/${value}`;
      case 'ExposureTime':
        if (value < 1) return `1/${Math.round(1/value)}s`;
        return `${value}s`;
      case 'FocalLength':
        return `${value}mm`;
      case 'GPSLatitude':
      case 'GPSLongitude':
        return value.toFixed(6);
      case 'DateTimeOriginal':
        return new Date(value).toLocaleString();
      default:
        return String(value);
    }
  };

  const ExifItem = ({ label, value }: { label: string; value: any }) => (
    <Grid item xs={6} sm={4}>
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Grid>
  );

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={() => fileInputRef.current?.click()}
          fullWidth
          sx={{ mb: 3 }}
        >
          Select Image
        </Button>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {preview && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box component="img" src={preview} alt="Preview" sx={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }} />
          </Paper>
        )}
      </Box>

      {exifData && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Image Information
            </Typography>
            <Grid container spacing={2}>
              <ExifItem label="Camera Make" value={exifData.Make || 'N/A'} />
              <ExifItem label="Camera Model" value={exifData.Model || 'N/A'} />
              <ExifItem label="Date Taken" value={exifData.DateTimeOriginal ? new Date(exifData.DateTimeOriginal).toLocaleString() : 'N/A'} />
              <ExifItem label="Exposure" value={formatValue('ExposureTime', exifData.ExposureTime)} />
              <ExifItem label="Aperture" value={formatValue('FNumber', exifData.FNumber)} />
              <ExifItem label="ISO" value={exifData.ISO || 'N/A'} />
              <ExifItem label="Focal Length" value={formatValue('FocalLength', exifData.FocalLength)} />
              <ExifItem label="Lens" value={exifData.LensModel || 'N/A'} />
              <ExifItem label="Dimensions" value={exifData.ImageWidth ? `${exifData.ImageWidth} × ${exifData.ImageHeight}` : 'N/A'} />
            </Grid>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const ExifReader = () => {
  const content = (
    <>
      <Typography variant="h2">What is EXIF Data?</Typography>
      <Typography variant="body1">
        EXIF (Exchangeable Image File Format) data contains metadata stored within image files. 
        This includes camera settings like ISO, aperture, shutter speed, focal length, and the date 
        the photo was taken. Most smartphones and digital cameras automatically add EXIF data to photos.
      </Typography>

      <Typography variant="h2">How to use the EXIF Reader?</Typography>
      <Typography variant="body1">
        Click the "Select Image" button to upload a photo from your device. The tool will automatically 
        extract and display all EXIF data embedded in the image. This includes camera model, lens information, 
        exposure settings, and GPS coordinates (if available).
      </Typography>

      <Typography variant="h2">Why check EXIF data?</Typography>
      <Typography variant="body1">
        Checking EXIF data helps you understand how a photo was taken. You can see camera settings to 
        improve your photography skills, verify image metadata, or check if location data is embedded. 
        You can also remove EXIF data for privacy before sharing images online.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="EXIF Reader"
      description="Extract and view EXIF metadata from images. See camera settings, lens information, and photo details instantly."
      url="/tools/exif-reader"
      content={content}
      category="Tools"
    >
      <ExifReaderContent />
    </CalculatorShell>
  );
};

export default ExifReader;