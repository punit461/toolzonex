import type { Metadata } from "next";
import UnitConverter from "../../../calculators/utilities/UnitConverter";
import tool from "../../../data/tools/utilities-unit-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <UnitConverter />
    </>
  );
}
