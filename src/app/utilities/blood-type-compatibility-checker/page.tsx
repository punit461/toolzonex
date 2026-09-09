import type { Metadata } from "next";
import BloodTypeCompatibilityChecker from "../../../calculators/utilities/BloodTypeCompatibilityChecker";
import tool from "../../../data/tools/utilities-blood-type-compatibility-checker";
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
        <BloodTypeCompatibilityChecker />
      </ShellPropsProvider>
    </>
  );
}
