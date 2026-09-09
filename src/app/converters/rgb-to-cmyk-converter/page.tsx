import type { Metadata } from "next";
import RgbToCmykConverter from "../../../calculators/converters/RgbToCmykConverter";
import tool from "../../../data/tools/converters-rgb-to-cmyk-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RgbToCmykConverter />
    </>
  );
}
