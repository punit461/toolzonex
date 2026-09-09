import type { Metadata } from "next";
import Ripemd160Generator from "../../../calculators/developer-tools/Ripemd160Generator";
import tool from "../../../data/tools/developer-tools-ripemd160-generator";
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
        <Ripemd160Generator />
      </ShellPropsProvider>
    </>
  );
}
