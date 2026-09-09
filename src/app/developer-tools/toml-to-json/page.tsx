import type { Metadata } from "next";
import TomlToJson from "../../../calculators/developer-tools/TomlToJson";
import tool from "../../../data/tools/developer-tools-toml-to-json";
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
        <TomlToJson />
      </ShellPropsProvider>
    </>
  );
}
