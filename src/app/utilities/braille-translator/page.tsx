import type { Metadata } from "next";
import BrailleTranslator from "../../../calculators/utilities/BrailleTranslator";
import tool from "../../../data/tools/utilities-braille-translator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BrailleTranslator />
    </>
  );
}
