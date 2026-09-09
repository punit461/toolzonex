import type { Metadata } from "next";
import PressureConverter from "../../../calculators/converters/PressureConverter";
import tool from "../../../data/tools/converters-pressure-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PressureConverter />
    </>
  );
}
