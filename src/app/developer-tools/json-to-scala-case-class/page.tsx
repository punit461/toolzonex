import type { Metadata } from "next";
import JsonToScalaCaseClass from "../../../calculators/developer-tools/JsonToScalaCaseClass";
import tool from "../../../data/tools/developer-tools-json-to-scala-case-class";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToScalaCaseClass />
    </>
  );
}
