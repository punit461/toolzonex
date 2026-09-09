import type { Metadata } from "next";
import UpsideDownText from "../../../calculators/text-tools/UpsideDownText";
import tool from "../../../data/tools/text-tools-upside-down-text";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <UpsideDownText />
    </>
  );
}
