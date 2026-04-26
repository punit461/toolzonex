import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Finance calculators
import EMICalculator from './calculators/EMICalculator';
import SIPCalculator from './calculators/SIPCalculator';
import GSTCalculator from './calculators/GSTCalculator';
import IncomeTaxCalculator from './calculators/IncomeTaxCalculator';
import PPFCalculator from './calculators/PPFCalculator';
import RentVsBuyCalculator from './calculators/RentVsBuyCalculator';
import GoldRateCalculator from './calculators/GoldRateCalculator';
import SilverRateCalculator from './calculators/SilverRateCalculator';
import SSYCalculator from './calculators/SSYCalculator';
import GratuityCalculator from './calculators/GratuityCalculator';

// Health calculators
import BMICalculator from './calculators/BMICalculator';
import BMRCalculator from './calculators/BMRCalculator';
import TDEECalculator from './calculators/TDEECalculator';
import PFTCalculator from './calculators/PFTCalculator';
import CFTCalculator from './calculators/CFTCalculator';

// Utility calculators
import AgeCalculator from './calculators/AgeCalculator';
import PercentageCalculator from './calculators/PercentageCalculator';
import DateCalculator from './calculators/DateCalculator';

// Tools
import OnlineNotepad from './calculators/OnlineNotepad';

// Blog
import BlogList from './pages/BlogList';
import SipRetirement from './pages/blogs/SipRetirement';
import OldVsNewTax from './pages/blogs/OldVsNewTax';
import GstImpact from './pages/blogs/GstImpact';
import BudgetingRule from './pages/blogs/BudgetingRule';
import ImproveCibilScore from './pages/blogs/ImproveCibilScore';
import RentingVsBuying from './pages/blogs/RentingVsBuying';
import PpfGuide from './pages/blogs/PpfGuide';
import CompoundInterest from './pages/blogs/CompoundInterest';
import SsyBenefits from './pages/blogs/SsyBenefits';
import UnderstandingGratuity from './pages/blogs/UnderstandingGratuity';
import NewRegime2025 from './pages/blogs/NewRegime2025';
import Rebate87A from './pages/blogs/Rebate87A';
import HraExemption from './pages/blogs/HraExemption';
import Section80CGuide from './pages/blogs/Section80CGuide';

// Static pages
import About from './pages/About';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* ── Finance ──────────────────────────────── */}
          <Route path="finance/emi-calculator" element={<EMICalculator />} />
          <Route path="finance/sip-calculator" element={<SIPCalculator />} />
          <Route path="finance/gst-calculator" element={<GSTCalculator />} />
          <Route path="finance/income-tax-calculator" element={<IncomeTaxCalculator />} />
          <Route path="finance/ppf-calculator" element={<PPFCalculator />} />
          <Route path="finance/rent-vs-buy-calculator" element={<RentVsBuyCalculator />} />
          <Route path="finance/gold-calculator" element={<GoldRateCalculator />} />
          <Route path="finance/silver-calculator" element={<SilverRateCalculator />} />
          <Route path="finance/ssy-calculator" element={<SSYCalculator />} />
          <Route path="finance/gratuity-calculator" element={<GratuityCalculator />} />

          {/* ── Health ───────────────────────────────── */}
          <Route path="health/bmi-calculator" element={<BMICalculator />} />
          <Route path="health/bmr-calculator" element={<BMRCalculator />} />
          <Route path="health/tdee-calculator" element={<TDEECalculator />} />
          <Route path="health/pft-calculator" element={<PFTCalculator />} />
          <Route path="health/cft-calculator" element={<CFTCalculator />} />

          {/* ── Utilities ────────────────────────────── */}
          <Route path="utilities/age-calculator" element={<AgeCalculator />} />
          <Route path="utilities/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="utilities/date-calculator" element={<DateCalculator />} />

          {/* ── Tools ────────────────────────────────── */}
          <Route path="tools/online-notepad" element={<OnlineNotepad />} />

          {/* ── Legacy redirects (keep old /calculators/* working) ── */}
          <Route path="calculators/emi-calculator" element={<Navigate to="/finance/emi-calculator" replace />} />
          <Route path="calculators/sip-calculator" element={<Navigate to="/finance/sip-calculator" replace />} />
          <Route path="calculators/gst-calculator" element={<Navigate to="/finance/gst-calculator" replace />} />
          <Route path="calculators/income-tax-calculator" element={<Navigate to="/finance/income-tax-calculator" replace />} />
          <Route path="calculators/ppf-calculator" element={<Navigate to="/finance/ppf-calculator" replace />} />
          <Route path="calculators/rent-vs-buy-calculator" element={<Navigate to="/finance/rent-vs-buy-calculator" replace />} />
          <Route path="calculators/gold-calculator" element={<Navigate to="/finance/gold-calculator" replace />} />
          <Route path="calculators/silver-calculator" element={<Navigate to="/finance/silver-calculator" replace />} />
          <Route path="calculators/ssy-calculator" element={<Navigate to="/finance/ssy-calculator" replace />} />
          <Route path="calculators/gratuity-calculator" element={<Navigate to="/finance/gratuity-calculator" replace />} />
          <Route path="calculators/bmi-calculator" element={<Navigate to="/health/bmi-calculator" replace />} />
          <Route path="calculators/bmr-calculator" element={<Navigate to="/health/bmr-calculator" replace />} />
          <Route path="calculators/tdee-calculator" element={<Navigate to="/health/tdee-calculator" replace />} />
          <Route path="calculators/age-calculator" element={<Navigate to="/utilities/age-calculator" replace />} />
          <Route path="calculators/percentage-calculator" element={<Navigate to="/utilities/percentage-calculator" replace />} />
          <Route path="calculators/date-calculator" element={<Navigate to="/utilities/date-calculator" replace />} />

          {/* ── Blog ─────────────────────────────────── */}
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/sip-early-retirement" element={<SipRetirement />} />
          <Route path="blog/old-vs-new-tax-regime" element={<OldVsNewTax />} />
          <Route path="blog/understanding-gst" element={<GstImpact />} />
          <Route path="blog/50-30-20-budgeting-rule" element={<BudgetingRule />} />
          <Route path="blog/improve-cibil-score" element={<ImproveCibilScore />} />
          <Route path="blog/renting-vs-buying-home" element={<RentingVsBuying />} />
          <Route path="blog/complete-guide-to-ppf" element={<PpfGuide />} />
          <Route path="blog/power-of-compound-interest" element={<CompoundInterest />} />
          <Route path="blog/sukanya-samriddhi-yojana-benefits" element={<SsyBenefits />} />
          <Route path="blog/understanding-gratuity-india" element={<UnderstandingGratuity />} />
          <Route path="blog/new-tax-regime-fy-2025-26" element={<NewRegime2025 />} />
          <Route path="blog/section-87a-rebate-guide" element={<Rebate87A />} />
          <Route path="blog/hra-exemption-calculation" element={<HraExemption />} />
          <Route path="blog/section-80c-investment-guide" element={<Section80CGuide />} />

          {/* ── Static pages ─────────────────────────── */}
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
