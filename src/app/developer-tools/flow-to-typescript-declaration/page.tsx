import type { Metadata } from "next";
import FlowToTypeScriptDeclaration from "../../../calculators/developer-tools/FlowToTypeScriptDeclaration";
import tool from "../../../data/tools/developer-tools-flow-to-typescript-declaration";
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
        <FlowToTypeScriptDeclaration />
      </ShellPropsProvider>
    </>
  );
}
