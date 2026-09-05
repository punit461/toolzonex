import type { Metadata } from "next";
import RegexReplaceTester from "../../../calculators/developer-tools/RegexReplaceTester";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/regex-replace-tester");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RegexReplaceTester />
    </>
  );
}
