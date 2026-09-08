import type { Metadata } from "next";
import GuidGenerator from "../../../calculators/generators/GuidGenerator";
import tool from "../../../data/tools/generators-guid-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GuidGenerator />
    </>
  );
}
