import type { Metadata } from "next";
import HexToHsvConverter from "../../../calculators/converters/HexToHsvConverter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/converters/hex-to-hsv-converter");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HexToHsvConverter />
    </>
  );
}
