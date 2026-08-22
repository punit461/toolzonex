import type { Metadata } from "next";
import SortingAlgorithmVisualizer from "../../../calculators/utilities/SortingAlgorithmVisualizer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/algorithm-visualizer");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SortingAlgorithmVisualizer />
    </>
  );
}
