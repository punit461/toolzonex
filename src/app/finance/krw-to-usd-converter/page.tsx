import type { Metadata } from "next";
import KrwToUsdConverter from "../../../calculators/finance/KrwToUsdConverter";
import tool from "../../../data/tools/finance-krw-to-usd-converter";
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
        <KrwToUsdConverter />
      </ShellPropsProvider>
    </>
  );
}
