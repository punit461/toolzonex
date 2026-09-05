import type { Metadata } from "next";
import ScreenViewingDistanceCalculator from "../../../calculators/utilities/ScreenViewingDistanceCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/screen-viewing-distance-calculator");

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
