import type { Metadata } from "next";
import WallAreaCalculator from "../../../calculators/utilities/WallAreaCalculator";
import tool from "../../../data/tools/utilities-wall-area-calculator";
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
        <WallAreaCalculator />
      </ShellPropsProvider>
    </>
  );
}
