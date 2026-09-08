import type { Metadata } from "next";
import InvisibleCharacterDetector from "../../../calculators/text-tools/InvisibleCharacterDetector";
import tool from "../../../data/tools/text-tools-invisible-character-detector";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <InvisibleCharacterDetector />
    </>
  );
}
