import type { Metadata } from "next";
import ColorPaletteExtractorText from "../../../calculators/converters/ColorPaletteExtractorText";
import tool from "../../../data/tools/converters-color-palette-extractor-text";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
