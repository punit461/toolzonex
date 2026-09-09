import type { Metadata } from "next";
import SoundexCalculator from "../../../calculators/text-tools/SoundexCalculator";
import tool from "../../../data/tools/text-tools-soundex-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SoundexCalculator />
    </>
  );
}
