import type { Metadata } from "next";
import StringEscaper from "../../../calculators/text-tools/StringEscaper";
import tool from "../../../data/tools/text-tools-string-escaper";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <StringEscaper />
    </>
  );
}
