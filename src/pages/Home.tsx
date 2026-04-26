import { Box, Typography, Card, CardContent, CardActionArea, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import CalculateIcon from '@mui/icons-material/Calculate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import EventIcon from '@mui/icons-material/Event';
import SavingsIcon from '@mui/icons-material/Savings';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PercentIcon from '@mui/icons-material/Percent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DiamondIcon from '@mui/icons-material/Diamond';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import WorkIcon from '@mui/icons-material/Work';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const categories = [
  {
    label: 'Finance',
    color: '#1a56db',
    tools: [
      { title: 'EMI Calculator', description: 'Calculate Home, Car & Personal Loan EMI.', path: '/finance/emi-calculator', icon: <CalculateIcon fontSize="large" color="primary" /> },
      { title: 'SIP Calculator', description: 'Estimate Mutual Fund SIP returns.', path: '/finance/sip-calculator', icon: <TrendingUpIcon fontSize="large" color="primary" /> },
      { title: 'GST Calculator', description: 'Add or remove GST from any amount.', path: '/finance/gst-calculator', icon: <ReceiptIcon fontSize="large" color="primary" /> },
      { title: 'Income Tax Calculator', description: 'Compare Old vs New Tax Regime.', path: '/finance/income-tax-calculator', icon: <AccountBalanceIcon fontSize="large" color="primary" /> },
      { title: 'PPF Calculator', description: 'Calculate PPF maturity with compounding.', path: '/finance/ppf-calculator', icon: <SavingsIcon fontSize="large" color="primary" /> },
      { title: 'Rent vs Buy Calculator', description: 'Is buying always better than renting?', path: '/finance/rent-vs-buy-calculator', icon: <HomeWorkIcon fontSize="large" color="primary" /> },
      { title: 'Gold Rate Calculator', description: 'Gold price with making charges & GST.', path: '/finance/gold-calculator', icon: <DiamondIcon fontSize="large" color="primary" /> },
      { title: 'Silver Rate Calculator', description: 'Silver price with making charges & GST.', path: '/finance/silver-calculator', icon: <ChangeHistoryIcon fontSize="large" color="primary" /> },
      { title: 'SSY Calculator', description: 'Sukanya Samriddhi Yojana maturity value.', path: '/finance/ssy-calculator', icon: <ChildCareIcon fontSize="large" color="primary" /> },
      { title: 'Gratuity Calculator', description: 'Calculate your gratuity entitlement.', path: '/finance/gratuity-calculator', icon: <WorkIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Health',
    color: '#057a55',
    tools: [
      { title: 'BMI Calculator', description: 'Body Mass Index with Indian guidelines.', path: '/health/bmi-calculator', icon: <MonitorWeightIcon fontSize="large" color="primary" /> },
      { title: 'BMR Calculator', description: 'Basal Metabolic Rate using Mifflin-St Jeor.', path: '/health/bmr-calculator', icon: <FavoriteIcon fontSize="large" color="primary" /> },
      { title: 'TDEE Calculator', description: 'Total Daily Energy Expenditure by activity.', path: '/health/tdee-calculator', icon: <LocalDiningIcon fontSize="large" color="primary" /> },
      { title: 'PFT Calculator', description: 'Physical Fitness Test grading for Army, NDA & CDS.', path: '/health/pft-calculator', icon: <DirectionsRunIcon fontSize="large" color="primary" /> },
      { title: 'CFT Calculator', description: 'Combat Fitness Test grade for defence personnel.', path: '/health/cft-calculator', icon: <MilitaryTechIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Utilities',
    color: '#7e3af2',
    tools: [
      { title: 'Age Calculator', description: 'Exact age in years, months & days.', path: '/utilities/age-calculator', icon: <EventIcon fontSize="large" color="primary" /> },
      { title: 'Percentage Calculator', description: 'Percentages, changes, and X% of Y.', path: '/utilities/percentage-calculator', icon: <PercentIcon fontSize="large" color="primary" /> },
      { title: 'Date Calculator', description: 'Add days to a date or find duration.', path: '/utilities/date-calculator', icon: <CalendarMonthIcon fontSize="large" color="primary" /> },
    ],
  },
  {
    label: 'Tools',
    color: '#c27803',
    tools: [
      { title: 'Online Notepad', description: 'Free notepad with auto-save & word count.', path: '/tools/online-notepad', icon: <NoteAltIcon fontSize="large" color="primary" /> },
    ],
  },
];

const Home = () => {
  return (
    <>
      <SEOHead
        title="ToolZoneX — Smart Tools for Every Decision"
        description="Free online calculators for Finance, Health, and Utilities — EMI, SIP, Income Tax, BMI, Gold Rate, PPF, GST and more. Instant, accurate results."
        url="/"
      />

      {/* Hero */}
      <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 }, mb: 4 }}>
        {/* <Box component="img" src="/logo.png" alt="ToolZoneX" sx={{ height: { xs: 60, md: 80 }, mb: 3 }} /> */}
        <Typography variant="h1" gutterBottom sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' } }}>
          Smart Tools for Every Decision
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '580px', mx: 'auto', fontWeight: 400 }}>
          Finance, health, and everyday calculators — built for India, designed to be fast.
        </Typography>
      </Box>

      {/* Tool grid by category */}
      {categories.map((cat) => (
        <Box key={cat.label} sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.75rem' } }}>
              {cat.label}
            </Typography>
            <Chip label={`${cat.tools.length} tools`} size="small" sx={{ bgcolor: cat.color, color: '#fff', fontWeight: 700 }} />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {cat.tools.map((tool) => (
              <Card
                key={tool.path}
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                }}
              >
                <CardActionArea component={RouterLink} to={tool.path} sx={{ height: '100%', p: 1 }}>
                  <CardContent>
                    <Box sx={{ mb: 1.5 }}>{tool.icon}</Box>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.05rem' }}>
                      {tool.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tool.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Home;
