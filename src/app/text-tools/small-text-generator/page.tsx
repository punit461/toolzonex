import type { Metadata } from "next";
import SmallTextGenerator from "../../../calculators/text-tools/SmallTextGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/small-text-generator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SmallTextGenerator />
    </>
  );
}
