import type { Metadata } from "next";
import BabyNameGenerator from "../../../calculators/generators/BabyNameGenerator";
import tool from "../../../data/tools/generators-baby-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BabyNameGenerator />
    </>
  );
}
