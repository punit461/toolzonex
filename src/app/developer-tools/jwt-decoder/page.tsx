import type { Metadata } from "next";
import JwtDecoder from "../../../calculators/developer-tools/JwtDecoder";
import tool from "../../../data/tools/developer-tools-jwt-decoder";
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
        <JwtDecoder />
      </ShellPropsProvider>
    </>
  );
}
