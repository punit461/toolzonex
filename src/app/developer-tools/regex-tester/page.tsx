import type { Metadata } from "next";
import RegexTester from "../../../calculators/developer-tools/RegexTester";
import tool from "../../../data/tools/developer-tools-regex-tester";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RegexTester />
    </>
  );
}
