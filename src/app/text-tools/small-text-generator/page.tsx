import type { Metadata } from "next";
import SmallTextGenerator from "../../../calculators/text-tools/SmallTextGenerator";
import tool from "../../../data/tools/text-tools-small-text-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
