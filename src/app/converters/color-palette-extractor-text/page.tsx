import type { Metadata } from "next";
import ColorPaletteExtractorText from "../../../calculators/converters/ColorPaletteExtractorText";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/converters/color-palette-extractor-text");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ColorPaletteExtractorText />
    </>
  );
}
