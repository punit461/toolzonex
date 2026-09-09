import type { Metadata } from "next";
import WheelOfFortuneSpinner from "../../../calculators/generators/WheelOfFortuneSpinner";
import tool from "../../../data/tools/generators-wheel-of-fortune-spinner";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
