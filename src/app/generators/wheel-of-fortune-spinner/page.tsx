import type { Metadata } from "next";
import WheelOfFortuneSpinner from "../../../calculators/generators/WheelOfFortuneSpinner";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/wheel-of-fortune-spinner");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WheelOfFortuneSpinner />
    </>
  );
}
