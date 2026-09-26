'use client';

import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: "Are the calculators completely free to use?",
    answer: "Yes! All the tools and calculators on ToolZoneX are 100% free to use. There are no paywalls, hidden charges, or premium subscriptions required."
  },
  {
    question: "Do you store my personal financial data?",
    answer: "No. Calculations happen in your web browser, so your salary, loan amounts and health numbers aren't sent to us or stored by us. A few tools that need live data — exchange rates, IP lookup and PDF translation — contact an outside service and say so on the page. Our Privacy Policy lists them."
  },
  {
    question: "How accurate are these calculators?",
    answer: "We use standard, published formulas and rates, and fix errors as soon as they're reported. Results are still estimates for information and education: rules and rates change, and your situation may differ. For tax filing, investments or medical decisions, check with a qualified professional or the official source."
  },
  {
    question: "Why does the BMI calculator use Indian-specific categories?",
    answer: "Research, including a WHO expert consultation, has found that South Asians face higher metabolic risk at lower body weights. Indian clinical guidelines therefore treat a BMI of 23 or more as overweight for adults, rather than the international 25. BMI is a screening measure, not a diagnosis — talk to a doctor about your own health."
  },
  {
    question: "Will you be adding more tools in the future?",
    answer: "We add and improve tools based on what people ask for. If you have a specific tool request, get in touch through the Contact page."
  },
  {
    question: "Can I use this website on my mobile phone?",
    answer: "Yes. The site is designed to work on phones, tablets and desktop computers. If something doesn't work on your device, please tell us so we can fix it."
  }
];

const FAQ = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      
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
