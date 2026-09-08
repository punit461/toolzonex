import type { Metadata } from "next";
import ColorPaletteLibrary from "../../../calculators/tools/ColorPaletteLibrary";
import tool from "../../../data/tools/tools-color-palette-library";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ColorPaletteLibrary />
    </>
  );
}
