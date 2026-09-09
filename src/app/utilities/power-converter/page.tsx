import type { Metadata } from "next";
import PowerConverter from "../../../calculators/utilities/PowerConverter";
import tool from "../../../data/tools/utilities-power-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PowerConverter />
    </>
  );
}
