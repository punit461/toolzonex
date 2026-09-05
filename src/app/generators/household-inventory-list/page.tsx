import type { Metadata } from "next";
import HouseholdInventoryList from "../../../calculators/generators/HouseholdInventoryList";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/household-inventory-list");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HouseholdInventoryList />
    </>
  );
}
