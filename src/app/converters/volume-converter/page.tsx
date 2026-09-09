import type { Metadata } from "next";
import VolumeConverter from "../../../calculators/converters/VolumeConverter";
import tool from "../../../data/tools/converters-volume-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <VolumeConverter />
    </>
  );
}
