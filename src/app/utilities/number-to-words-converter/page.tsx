import type { Metadata } from "next";
import NumberToWordsConverter from "../../../calculators/utilities/NumberToWordsConverter";
import tool from "../../../data/tools/utilities-number-to-words-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <NumberToWordsConverter />
    </>
  );
}
