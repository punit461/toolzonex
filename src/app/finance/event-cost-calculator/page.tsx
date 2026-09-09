import type { Metadata } from "next";
import EventCostCalculator from "../../../calculators/finance/EventCostCalculator";
import tool from "../../../data/tools/finance-event-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EventCostCalculator />
    </>
  );
}
