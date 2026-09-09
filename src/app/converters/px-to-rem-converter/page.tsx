import type { Metadata } from "next";
import PxToRemConverter from "../../../calculators/converters/PxToRemConverter";
import tool from "../../../data/tools/converters-px-to-rem-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PxToRemConverter />
    </>
  );
}
