import type { Metadata } from "next";
import BoxShadowGenerator from "../../../calculators/developer-tools/BoxShadowGenerator";
import tool from "../../../data/tools/developer-tools-box-shadow-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BoxShadowGenerator />
    </>
  );
}
