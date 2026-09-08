import type { Metadata } from "next";
import HexToRgbConverter from "../../../calculators/converters/HexToRgbConverter";
import tool from "../../../data/tools/converters-hex-to-rgb";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HexToRgbConverter />
    </>
  );
}
