import type { Metadata } from "next";
import DeckMaterialCalculator from "../../../calculators/utilities/DeckMaterialCalculator";
import tool from "../../../data/tools/utilities-deck-material-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DeckMaterialCalculator />
    </>
  );
}
