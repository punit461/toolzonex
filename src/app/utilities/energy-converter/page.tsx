import type { Metadata } from "next";
import EnergyConverter from "../../../calculators/utilities/EnergyConverter";
import tool from "../../../data/tools/utilities-energy-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EnergyConverter />
    </>
  );
}
