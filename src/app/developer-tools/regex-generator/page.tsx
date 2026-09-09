import type { Metadata } from "next";
import RegexGenerator from "../../../calculators/developer-tools/RegexGenerator";
import tool from "../../../data/tools/developer-tools-regex-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RegexGenerator />
    </>
  );
}
