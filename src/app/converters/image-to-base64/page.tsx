import type { Metadata } from "next";
import ImageToBase64Converter from "../../../calculators/converters/ImageToBase64Converter";
import tool from "../../../data/tools/converters-image-to-base64";
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
        <ImageToBase64Converter />
      </ShellPropsProvider>
    </>
  );
}
