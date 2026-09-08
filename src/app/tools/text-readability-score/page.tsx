import type { Metadata } from "next";
import TextReadabilityScore from "../../../calculators/tools/TextReadabilityScore";
import tool from "../../../data/tools/tools-text-readability-score";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TextReadabilityScore />
    </>
  );
}
