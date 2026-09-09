import type { Metadata } from "next";
import LengthConverter from "../../../calculators/converters/LengthConverter";
import tool from "../../../data/tools/converters-length-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LengthConverter />
    </>
  );
}
