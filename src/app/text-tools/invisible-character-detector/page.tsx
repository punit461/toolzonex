import type { Metadata } from "next";
import InvisibleCharacterDetector from "../../../calculators/text-tools/InvisibleCharacterDetector";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/invisible-character-detector");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <InvisibleCharacterDetector />
    </>
  );
}
