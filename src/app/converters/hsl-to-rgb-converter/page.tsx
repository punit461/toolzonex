import type { Metadata } from "next";
import HslToRgbConverter from "../../../calculators/converters/HslToRgbConverter";
import tool from "../../../data/tools/converters-hsl-to-rgb-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HslToRgbConverter />
    </>
  );
}
