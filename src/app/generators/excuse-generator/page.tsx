import type { Metadata } from "next";
import ExcuseGenerator from "../../../calculators/generators/ExcuseGenerator";
import tool from "../../../data/tools/generators-excuse-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ExcuseGenerator />
    </>
  );
}
