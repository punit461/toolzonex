import type { Metadata } from "next";
import FlipText from "../../../calculators/text-tools/FlipText";
import tool from "../../../data/tools/text-tools-flip-text";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FlipText />
    </>
  );
}
