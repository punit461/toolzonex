import type { Metadata } from "next";
import ImageColorPicker from "../../../calculators/tools/ImageColorPicker";
import tool from "../../../data/tools/tools-image-color-picker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ImageColorPicker />
    </>
  );
}
