import type { Metadata } from "next";
import BakingPanConverter from "../../../calculators/utilities/BakingPanConverter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/baking-pan-converter");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BakingPanConverter />
    </>
  );
}
