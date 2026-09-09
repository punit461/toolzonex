import type { Metadata } from "next";
import Ean13BarcodeGenerator from "../../../calculators/developer-tools/Ean13BarcodeGenerator";
import tool from "../../../data/tools/developer-tools-ean13-barcode-generator";
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
        <Ean13BarcodeGenerator />
      </ShellPropsProvider>
    </>
  );
}
