import type { Metadata } from "next";
import MemoryCardCapacityCalculator from "../../../calculators/utilities/MemoryCardCapacityCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/memory-card-capacity-calculator");

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
