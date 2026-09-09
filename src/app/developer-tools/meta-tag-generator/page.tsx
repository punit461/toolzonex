import type { Metadata } from "next";
import MetaTagGenerator from "../../../calculators/developer-tools/MetaTagGenerator";
import tool from "../../../data/tools/developer-tools-meta-tag-generator";
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
        <MetaTagGenerator />
      </ShellPropsProvider>
    </>
  );
}
