import type { Metadata } from "next";
import AlphabetIndexGenerator from "../../../calculators/text-tools/AlphabetIndexGenerator";
import tool from "../../../data/tools/text-tools-alphabet-index-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <AlphabetIndexGenerator />
    </>
  );
}
