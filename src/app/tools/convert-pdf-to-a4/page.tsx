import type { Metadata } from "next";
import ConvertPdfToA4 from "../../../calculators/pdf/ConvertPdfToA4";
import tool from "../../../data/tools/tools-convert-pdf-to-a4";
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
        <ConvertPdfToA4 />
      </ShellPropsProvider>
    </>
  );
}
