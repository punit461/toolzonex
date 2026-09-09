import type { Metadata } from "next";
import WheelSpinner from "../../../calculators/generators/WheelSpinner";
import tool from "../../../data/tools/generators-wheel-spinner";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WheelSpinner />
    </>
  );
}
