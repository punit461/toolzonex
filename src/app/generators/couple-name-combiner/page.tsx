import type { Metadata } from "next";
import CoupleNameCombiner from "../../../calculators/generators/CoupleNameCombiner";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/couple-name-combiner");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CoupleNameCombiner />
    </>
  );
}
