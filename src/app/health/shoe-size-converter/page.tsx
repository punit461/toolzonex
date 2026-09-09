import type { Metadata } from "next";
import ShoeSizeConverter from "../../../calculators/health/ShoeSizeConverter";
import tool from "../../../data/tools/health-shoe-size-converter";
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
        <ShoeSizeConverter />
      </ShellPropsProvider>
    </>
  );
}
