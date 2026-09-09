import type { Metadata } from "next";
import TileGroutCalculator from "../../../calculators/utilities/TileGroutCalculator";
import tool from "../../../data/tools/utilities-tile-grout-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TileGroutCalculator />
    </>
  );
}
