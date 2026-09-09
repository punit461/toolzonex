import type { Metadata } from "next";
import StoreNameGenerator from "../../../calculators/generators/StoreNameGenerator";
import tool from "../../../data/tools/generators-store-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <StoreNameGenerator />
    </>
  );
}
