import type { Metadata } from "next";
import BodyFatPercentageCalculator from "../../../calculators/health/BodyFatPercentageCalculator";
import tool from "../../../data/tools/health-body-fat-percentage-calculator";
import { getShellProps } from "../../../utils/resolveShellProps";
import { ShellPropsProvider } from "../../../components/CalculatorShell";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  const shellProps = getShellProps(tool);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ShellPropsProvider value={shellProps}>
        <BodyFatPercentageCalculator />
      </ShellPropsProvider>
    </>
  );
}
