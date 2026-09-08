import type { Metadata } from "next";
import DareGenerator from "../../../calculators/generators/DareGenerator";
import tool from "../../../data/tools/generators-dare-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DareGenerator />
    </>
  );
}
