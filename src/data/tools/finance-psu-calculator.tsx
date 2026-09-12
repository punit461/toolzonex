import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/psu-calculator",
    navName: "PSU Salary Calculator",
    navDescription: "Public sector salary & take-home pay.",
    name: "PSU Salary Calculator",
    description: "Calculate gross pay, deductions (PF, ESI), and net pay for Indian public sector employees from basic pay and allowances.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccountBalanceWalletIcon fontSize="large" color="primary"/>,
    seoTitle: "PSU Salary Calculator - Public Sector Salary Calculator",
    seoDescription: "Free PSU salary calculator to estimate public sector gross pay, PF/ESI deductions, and net take-home pay in India.",
    keywords: ["PSU salary calculator", "public sector salary", "PSU pay calculator", "DA HRA calculator", "government salary calculator"],
    ogTitle: "PSU Salary Calculator - Public Sector Salary Calculator | ToolZoneX",
    ogDescription: "Calculate PSU gross pay, deductions, and net pay.",
    schemaName: "PSU Salary Calculator",
    schemaDescription: "Calculate gross pay, deductions, and net pay for public sector employees.",
    applicationCategory: "FinanceApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
