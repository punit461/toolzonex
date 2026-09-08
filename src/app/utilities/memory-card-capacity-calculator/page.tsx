import type { Metadata } from "next";
import MemoryCardCapacityCalculator from "../../../calculators/utilities/MemoryCardCapacityCalculator";
import tool from "../../../data/tools/utilities-memory-card-capacity-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MemoryCardCapacityCalculator />
    </>
  );
}
