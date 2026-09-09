import type { Metadata } from "next";
import CrosswordPuzzleGenerator from "../../../calculators/generators/CrosswordPuzzleGenerator";
import tool from "../../../data/tools/generators-crossword-puzzle-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CrosswordPuzzleGenerator />
    </>
  );
}
