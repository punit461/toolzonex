import type { Metadata } from "next";
import BakingPanConverter from "../../../calculators/utilities/BakingPanConverter";
import tool from "../../../data/tools/utilities-baking-pan-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BakingPanConverter />
    </>
  );
}
