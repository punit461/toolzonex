'use client';

import { useState } from 'react';
import { Box, Typography, Paper, TextField, LinearProgress, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const PasswordStrengthCheckerContent = () => {
  const [password, setPassword] = useState('');

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: 'None', color: 'inherit' };
    
    if (pass.length > 8) score += 1;
    if (pass.length > 12) score += 1;
    if (pass.length >= 16) score += 1;
    
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    // Penalties
    if (/^[A-Za-z]+$/.test(pass)) score -= 1; // Only letters
    if (/^[0-9]+$/.test(pass)) score -= 1; // Only numbers
    
    score = Math.max(0, Math.min(score, 6));

    if (score < 2) return { score, label: 'Very Weak', color: 'error' };
    if (score < 4) return { score, label: 'Weak', color: 'warning' };
    if (score < 5) return { score, label: 'Good', color: 'info' };
    return { score, label: 'Strong', color: 'success' };
  };

  const strength = calculateStrength(password);
  
  const rules = [
    { label: 'At least 12 characters', pass: password.length >= 12 },
    { label: 'Contains uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', pass: /[a-z]/.test(password) },
    { label: 'Contains number', pass: /[0-9]/.test(password) },
    { label: 'Contains symbol (e.g. !@#$%)', pass: /[^A-Za-z0-9]/.test(password) }
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Enter Password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          placeholder="Start typing to check strength..."
        />
        
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">Strength:</Typography>
            <Typography variant="body2" color={`${strength.color}.main`} fontWeight="bold">
              {strength.label}
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={password.length === 0 ? 0 : Math.max(5, (strength.score / 6) * 100)} 
            color={strength.color as any}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
      </Box>

      {/* Rules Panel */}
      <Box>
        <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Password Requirements</Typography>
          <List disablePadding>
            {rules.map((rule, idx) => (
              <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {rule.pass ? <CheckCircleIcon color="success" fontSize="small" /> : <CancelIcon color="error" fontSize="small" />}
                </ListItemIcon>
                <ListItemText 
                  primary={rule.label} 
                  primaryTypographyProps={{ color: rule.pass ? 'text.primary' : 'text.secondary', fontWeight: rule.pass ? 'bold' : 'normal' }}
                />
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(25, 118, 210, 0.1)', borderRadius: 2 }}>
            <Typography variant="body2" color="primary.dark">
              <strong>Tip:</strong> The best passwords are long phrases or combinations of random words that are easy for you to remember but impossible for computers to guess.
            </Typography>
          </Box>
        </Paper>
      </Box>

    </Box>
  );
};

const PasswordStrengthChecker = () => {
  const content = (
    <>
      <Typography variant="h2">Free Password Strength Checker</Typography>
      <Typography variant="body1">
        Check how secure your password is instantly. This tool analyzes your password against common security rules including length, character variety, and complexity. Your password is analyzed securely right here in your browser and is never sent to any server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Password Strength Checker"
      description="Check the strength of your password instantly in the browser. Learn how to create secure passwords with our free analyzer."
      url="/tools/password-strength-checker"
      content={content}
      category="Tools"
    >
      <PasswordStrengthCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PasswordStrengthChecker;
