import type { Metadata } from "next";
import Base64ToImageConverter from "../../../calculators/converters/Base64ToImageConverter";
import tool from "../../../data/tools/converters-base64-to-image";
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
        <Base64ToImageConverter />
      </ShellPropsProvider>
    </>
  );
}
