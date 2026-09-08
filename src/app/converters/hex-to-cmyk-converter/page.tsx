import type { Metadata } from "next";
import HexToCmykConverter from "../../../calculators/converters/HexToCmykConverter";
import tool from "../../../data/tools/converters-hex-to-cmyk-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HexToCmykConverter />
    </>
  );
}
