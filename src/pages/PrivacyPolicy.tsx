import { Box, Typography, Container, Paper } from '@mui/material';
import SEOHead from '../components/SEOHead';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <SEOHead 
        title="Privacy Policy" 
        description="Privacy policy for ToolZoneX outlining how we handle user data and advertising." 
        url="/privacy-policy"
      />
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" gutterBottom sx={{ mb: 4 }}>
          Privacy Policy
        </Typography>
        <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E5E5', borderRadius: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Last Updated: 2026
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            At ToolZoneX, accessible from https://toolzonex.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ToolZoneX and how we use it.
          </Typography>

          <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
            Data Processing & Local Calculation
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            All mathematical calculations on ToolZoneX (e.g., EMI, SIP, BMI) are performed client-side. This means the numbers you enter are processed directly within your web browser. We do not transmit or store your personal financial numbers, health metrics, or calculation inputs on our servers.
          </Typography>

          <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
            Google AdSense and DoubleClick DART Cookie
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our website and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads
          </Typography>

          <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
            Log Files
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ToolZoneX follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </Typography>

          <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
            Consent
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
