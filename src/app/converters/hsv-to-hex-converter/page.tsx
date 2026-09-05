import type { Metadata } from "next";
import HsvToHexConverter from "../../../calculators/converters/HsvToHexConverter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/converters/hsv-to-hex-converter");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HsvToHexConverter />
    </>
  );
}
