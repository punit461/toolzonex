import type { Metadata } from "next";
import GraphqlToTypeScriptMongodb from "../../../calculators/developer-tools/GraphqlToTypeScriptMongodb";
import tool from "../../../data/tools/developer-tools-graphql-to-typescript-mongodb";
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
        <GraphqlToTypeScriptMongodb />
      </ShellPropsProvider>
    </>
  );
}
