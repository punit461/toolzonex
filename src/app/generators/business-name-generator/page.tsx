import type { Metadata } from "next";
import BusinessNameGenerator from "../../../calculators/generators/BusinessNameGenerator";
import tool from "../../../data/tools/generators-business-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BusinessNameGenerator />
    </>
  );
}
