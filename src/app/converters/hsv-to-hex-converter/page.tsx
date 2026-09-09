import type { Metadata } from "next";
import HsvToHexConverter from "../../../calculators/converters/HsvToHexConverter";
import tool from "../../../data/tools/converters-hsv-to-hex-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HsvToHexConverter />
    </>
  );
}
