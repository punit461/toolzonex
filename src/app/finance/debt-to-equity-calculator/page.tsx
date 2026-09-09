import type { Metadata } from "next";
import DebtToEquityCalculator from "../../../calculators/finance/DebtToEquityCalculator";
import tool from "../../../data/tools/finance-debt-to-equity-calculator";
import { getShellProps } from "../../../utils/resolveShellProps";
import { ShellPropsProvider } from "../../../components/CalculatorShell";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  const shellProps = getShellProps(tool);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ShellPropsProvider value={shellProps}>
        <DebtToEquityCalculator />
      </ShellPropsProvider>
    </>
  );
}
