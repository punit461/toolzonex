import type { Metadata } from "next";
import WeddingSeatingCalculator from "../../../calculators/utilities/WeddingSeatingCalculator";
import tool from "../../../data/tools/utilities-wedding-seating-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WeddingSeatingCalculator />
    </>
  );
}
