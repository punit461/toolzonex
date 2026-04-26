import { Typography } from '@mui/material';
import BlogShell from '../../components/BlogShell';

const BudgetingRule = () => {
  return (
    <BlogShell
      title="The 50/30/20 Rule: A Beginner's Guide to Budgeting"
      description="Master your personal finances by applying the simple yet effective 50/30/20 budgeting rule to your monthly income."
      url="/blog/50-30-20-budgeting-rule"
      date="March 2026"
    >
      <Typography variant="body1">
        Budgeting doesn't have to mean tracking every single penny on a complicated spreadsheet. If you find traditional budgeting overwhelming, the 50/30/20 rule is the perfect starting point for taking control of your finances.
      </Typography>

      <Typography variant="h2">What is the 50/30/20 Rule?</Typography>
      <Typography variant="body1">
        Popularized by Senator Elizabeth Warren, this rule breaks down your after-tax income into three distinct categories:
      </Typography>
      <ul>
        <li><strong>50% for Needs</strong></li>
        <li><strong>30% for Wants</strong></li>
        <li><strong>20% for Savings and Debt Repayment</strong></li>
      </ul>

      <Typography variant="h2">Breaking Down the Categories</Typography>
      
      <Typography variant="h3">1. 50% for Needs</Typography>
      <Typography variant="body1">
        Needs are your absolute essentials—the bills you must pay and the things necessary for survival. This includes:
      </Typography>
      <ul>
        <li>Rent or EMI payments</li>
        <li>Groceries and basic utilities (electricity, water)</li>
        <li>Health insurance and transportation</li>
      </ul>
      <Typography variant="body1">
        If your needs take up more than 50% of your income, you may need to look at downsizing your lifestyle, such as moving to a more affordable apartment or carpooling.
      </Typography>

      <Typography variant="h3">2. 30% for Wants</Typography>
      <Typography variant="body1">
        Wants are all the non-essentials that enhance your lifestyle. You could survive without them, but they make life enjoyable. This includes:
      </Typography>
      <ul>
        <li>Dining out and ordering in</li>
        <li>Netflix subscriptions and entertainment</li>
        <li>Vacations and shopping</li>
      </ul>

      <Typography variant="h3">3. 20% for Savings and Investing</Typography>
      <Typography variant="body1">
        This is the most critical category for your future self. It involves:
      </Typography>
      <ul>
        <li>Building an emergency fund (at least 6 months of expenses)</li>
        <li>Investing in SIPs, PPF, or Fixed Deposits</li>
        <li>Paying off high-interest debt (like credit cards)</li>
      </ul>

      <Typography variant="h2">Why This Rule Works</Typography>
      <Typography variant="body1">
        The 50/30/20 rule works because it provides a framework without being overly restrictive. It ensures you are saving a healthy chunk of your income while still giving you permission to enjoy your money guilt-free through the "Wants" category.
      </Typography>

      <Typography variant="h2">Conclusion</Typography>
      <Typography variant="body1">
        Financial freedom starts with understanding where your money goes. By applying the 50/30/20 rule, you can balance your present desires with your future needs, building wealth slowly and steadily over time.
      </Typography>
    </BlogShell>
  );
};

export default BudgetingRule;
