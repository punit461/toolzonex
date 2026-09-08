import type { Metadata } from "next";
import ShoeSizeConverter from "../../../calculators/health/ShoeSizeConverter";
import tool from "../../../data/tools/health-shoe-size-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ShoeSizeConverter />
    </>
  );
}
