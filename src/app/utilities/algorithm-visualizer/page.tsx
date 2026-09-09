import type { Metadata } from "next";
import SortingAlgorithmVisualizer from "../../../calculators/utilities/SortingAlgorithmVisualizer";
import tool from "../../../data/tools/utilities-algorithm-visualizer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
