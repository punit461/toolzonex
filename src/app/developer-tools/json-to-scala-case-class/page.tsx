import type { Metadata } from "next";
import JsonToScalaCaseClass from "../../../calculators/developer-tools/JsonToScalaCaseClass";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/json-to-scala-case-class");

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
