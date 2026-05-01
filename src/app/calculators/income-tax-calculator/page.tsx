import { redirect } from 'next/navigation';

export default function RedirectPage() {
  redirect('/finance/income-tax-calculator');
}
