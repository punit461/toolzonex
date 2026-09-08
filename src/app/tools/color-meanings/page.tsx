import type { Metadata } from "next";
import ColorMeanings from "../../../calculators/tools/ColorMeanings";
import tool from "../../../data/tools/tools-color-meanings";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ColorMeanings />
    </>
  );
}
