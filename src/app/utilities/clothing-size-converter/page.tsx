import type { Metadata } from "next";
import ClothingSizeConverter from "../../../calculators/utilities/ClothingSizeConverter";
import tool from "../../../data/tools/utilities-clothing-size-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ClothingSizeConverter />
    </>
  );
}
