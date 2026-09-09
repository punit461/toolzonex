import type { Metadata } from "next";
import TimeConverter from "../../../calculators/converters/TimeConverter";
import tool from "../../../data/tools/converters-time-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TimeConverter />
    </>
  );
}
