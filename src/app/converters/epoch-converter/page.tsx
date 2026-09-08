import type { Metadata } from "next";
import EpochConverter from "../../../calculators/converters/EpochConverter";
import tool from "../../../data/tools/converters-epoch-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EpochConverter />
    </>
  );
}
