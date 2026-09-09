import type { Metadata } from "next";
import ColorWheel from "../../../calculators/tools/ColorWheel";
import tool from "../../../data/tools/tools-color-wheel";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ColorWheel />
    </>
  );
}
