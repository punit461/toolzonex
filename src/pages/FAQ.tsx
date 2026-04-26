import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SEOHead from '../components/SEOHead';

const faqs = [
  {
    question: "Are the calculators completely free to use?",
    answer: "Yes! All the tools and calculators on ToolZoneX are 100% free to use. There are no paywalls, hidden charges, or premium subscriptions required."
  },
  {
    question: "Do you store my personal financial data?",
    answer: "Absolutely not. All mathematical calculations happen directly inside your web browser (client-side). We do not transmit, save, or store your salary, loan amounts, or health metrics on our servers."
  },
  {
    question: "How accurate are these calculators?",
    answer: "We use standard financial and mathematical formulas to ensure high accuracy. However, they are designed for informational and educational purposes. For official tax filing or medical decisions, we always recommend consulting a certified professional."
  },
  {
    question: "Why does the BMI calculator use Indian-specific categories?",
    answer: "Studies show that South Asians, including Indians, are at a higher risk of metabolic diseases at lower body weights compared to Caucasian populations. Therefore, the Indian Ministry of Health recommends a stricter BMI threshold (overweight starts at 23 instead of 25) to provide a more accurate health assessment."
  },
  {
    question: "Will you be adding more tools in the future?",
    answer: "Yes! We are constantly working on building more India-centric financial, fitness, and lifestyle calculators. If you have a specific tool request, feel free to reach out to us via the Contact page."
  },
  {
    question: "Can I use this website on my mobile phone?",
    answer: "Yes, ToolZoneX is fully optimized for mobile devices. It works perfectly on smartphones, tablets, and desktop computers alike."
  }
];

const FAQ = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <SEOHead 
        title="Frequently Asked Questions (FAQ)" 
        description="Find answers to the most commonly asked questions about ToolZoneX and our calculators." 
        url="/faq"
      />
      
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h1" gutterBottom sx={{ fontWeight: 800 }}>
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Everything you need to know about ToolZoneX.
        </Typography>
      </Box>

      <Box>
        {faqs.map((faq, index) => (
          <Accordion key={index} elevation={0} sx={{ border: '1px solid #E5E5E5', mb: 2, borderRadius: '8px !important', '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 600, fontSize: '1.1rem', py: 1 }}>
              {faq.question}
            </AccordionSummary>
            <AccordionDetails sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.6, pb: 3 }}>
              {faq.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ;
