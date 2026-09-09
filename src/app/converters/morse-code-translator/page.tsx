import type { Metadata } from "next";
import MorseCodeTranslator from "../../../calculators/converters/MorseCodeTranslator";
import tool from "../../../data/tools/converters-morse-code-translator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MorseCodeTranslator />
    </>
  );
}
