import type { Metadata } from "next";
import RandomColorPaletteGenerator from "../../../calculators/generators/RandomColorPaletteGenerator";
import tool from "../../../data/tools/generators-random-color-palette-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomColorPaletteGenerator />
    </>
  );
}
