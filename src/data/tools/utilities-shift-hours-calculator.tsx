import ScheduleIcon from '@mui/icons-material/Schedule';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/shift-hours-calculator",
    navName: "Shift Hours Calculator",
    navDescription: "Paid hours worked for a payroll timesheet.",
    name: "Shift Hours Calculator",
    description: "Calculate total paid hours worked for a shift from its start and end time and an unpaid break, including overnight shifts.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ScheduleIcon fontSize="large" color="primary"/>,
    seoTitle: "Shift Hours Calculator - Paid Hours for Payroll",
    seoDescription: "Free shift hours calculator. Enter a shift's start time, end time, and unpaid break to find total paid hours worked for payroll or a timesheet.",
    keywords: ["shift hours calculator", "timesheet hours calculator", "payroll hours calculator", "work shift calculator", "overnight shift hours calculator"],
    ogTitle: "Shift Hours Calculator - Paid Hours for Payroll | ToolZoneX",
    ogDescription: "Calculate total paid hours worked for a shift, including overnight shifts.",
    schemaName: "Shift Hours Calculator",
    schemaDescription: "Calculate total paid hours worked for a shift from start time, end time, and unpaid break duration.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the site's Time Duration Calculator?", answer: "The Time Duration Calculator finds the raw elapsed time between two clock times with no other adjustments. This tool is purpose-built for payroll: it also subtracts an unpaid break from the raw shift length to give the actual paid hours worked, which is the number that belongs on a timesheet." }, { question: "Should I subtract paid breaks too?", answer: "No — only unpaid breaks (like an unpaid lunch) should be subtracted here. Paid rest breaks are typically still counted as worked time under most employers' policies, so leave those out of the break field." }, { question: "Why does decimal hours matter for payroll?", answer: "Most payroll and timekeeping software calculates wages using decimal hours (like 7.67) rather than hours and minutes (7 hours 40 minutes), since decimal hours multiply directly by an hourly rate. This calculator shows both formats so you can use whichever your system expects." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
