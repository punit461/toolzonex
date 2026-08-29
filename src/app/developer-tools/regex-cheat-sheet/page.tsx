import type { Metadata } from "next";
import RegexCheatSheet from "../../../calculators/developer-tools/RegexCheatSheet";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/regex-cheat-sheet");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RegexCheatSheet />
    </>
  );
}
