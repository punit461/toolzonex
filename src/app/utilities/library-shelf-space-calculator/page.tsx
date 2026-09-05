import type { Metadata } from "next";
import LibraryShelfSpaceCalculator from "../../../calculators/utilities/LibraryShelfSpaceCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/library-shelf-space-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LibraryShelfSpaceCalculator />
    </>
  );
}
