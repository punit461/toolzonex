import type { Metadata } from "next";
import HumanToCatAgeCalculator from "../../../calculators/utilities/HumanToCatAgeCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/human-to-cat-age-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HumanToCatAgeCalculator />
    </>
  );
}
