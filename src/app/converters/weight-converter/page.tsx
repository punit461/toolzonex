import type { Metadata } from "next";
import WeightConverter from "../../../calculators/converters/WeightConverter";
import tool from "../../../data/tools/converters-weight-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WeightConverter />
    </>
  );
}
