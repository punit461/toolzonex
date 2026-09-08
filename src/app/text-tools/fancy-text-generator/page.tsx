import type { Metadata } from "next";
import FancyTextGenerator from "../../../calculators/text-tools/FancyTextGenerator";
import tool from "../../../data/tools/text-tools-fancy-text-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FancyTextGenerator />
    </>
  );
}
