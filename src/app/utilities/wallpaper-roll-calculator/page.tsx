import type { Metadata } from "next";
import WallpaperRollCalculator from "../../../calculators/utilities/WallpaperRollCalculator";
import tool from "../../../data/tools/utilities-wallpaper-roll-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WallpaperRollCalculator />
    </>
  );
}
