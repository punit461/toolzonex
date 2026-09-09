import type { Metadata } from "next";
import BingoCardGenerator from "../../../calculators/generators/BingoCardGenerator";
import tool from "../../../data/tools/generators-bingo-card-generator";
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
        <BingoCardGenerator />
      </ShellPropsProvider>
    </>
  );
}
