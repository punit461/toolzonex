import type { Metadata } from "next";
import AreaConverter from "../../../calculators/converters/AreaConverter";
import tool from "../../../data/tools/converters-area-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AreaConverter />
    </>
  );
}
