import type { Metadata } from "next";
import ChessRatingCalculator from "../../../calculators/utilities/ChessRatingCalculator";
import tool from "../../../data/tools/utilities-chess-rating-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ChessRatingCalculator />
    </>
  );
}
