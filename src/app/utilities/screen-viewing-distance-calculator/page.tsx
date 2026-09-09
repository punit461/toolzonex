import type { Metadata } from "next";
import ScreenViewingDistanceCalculator from "../../../calculators/utilities/ScreenViewingDistanceCalculator";
import tool from "../../../data/tools/utilities-screen-viewing-distance-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ScreenViewingDistanceCalculator />
    </>
  );
}
