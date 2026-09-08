import type { Metadata } from "next";
import ZalgoTextGenerator from "../../../calculators/generators/ZalgoTextGenerator";
import tool from "../../../data/tools/generators-zalgo-text-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ZalgoTextGenerator />
    </>
  );
}
