import type { Metadata } from "next";
import FancyTextGenerator from "../../../calculators/text-tools/FancyTextGenerator";
import tool from "../../../data/tools/text-tools-fancy-text-generator";
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
        <FancyTextGenerator />
      </ShellPropsProvider>
    </>
  );
}
