import type { Metadata } from "next";
import CmykToHexConverter from "../../../calculators/converters/CmykToHexConverter";
import tool from "../../../data/tools/converters-cmyk-to-hex-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CmykToHexConverter />
    </>
  );
}
