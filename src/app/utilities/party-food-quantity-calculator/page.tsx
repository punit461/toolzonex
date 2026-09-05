import type { Metadata } from "next";
import PartyFoodQuantityCalculator from "../../../calculators/utilities/PartyFoodQuantityCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/party-food-quantity-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PartyFoodQuantityCalculator />
    </>
  );
}
