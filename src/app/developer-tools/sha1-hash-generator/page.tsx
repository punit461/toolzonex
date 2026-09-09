import type { Metadata } from "next";
import Sha1HashGenerator from "../../../calculators/developer-tools/Sha1HashGenerator";
import tool from "../../../data/tools/developer-tools-sha1-hash-generator";
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
        <Sha1HashGenerator />
      </ShellPropsProvider>
    </>
  );
}
