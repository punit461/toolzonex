import type { Metadata } from "next";
import GifMaker from "../../../calculators/generators/GifMaker";
import tool from "../../../data/tools/generators-gif-maker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GifMaker />
    </>
  );
}
