import type { Metadata } from "next";
import RegexEscapeTool from "../../../calculators/developer-tools/RegexEscapeTool";
import tool from "../../../data/tools/developer-tools-regex-escape-tool";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RegexEscapeTool />
    </>
  );
}
