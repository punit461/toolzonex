import type { Metadata } from "next";
import VerticalTextGenerator from "../../../calculators/generators/VerticalTextGenerator";
import tool from "../../../data/tools/generators-vertical-text-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <VerticalTextGenerator />
    </>
  );
}
