import type { Metadata } from "next";
import PigLatinTranslator from "../../../calculators/converters/PigLatinTranslator";
import tool from "../../../data/tools/converters-pig-latin-translator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PigLatinTranslator />
    </>
  );
}
