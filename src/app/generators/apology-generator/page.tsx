import type { Metadata } from "next";
import ApologyGenerator from "../../../calculators/generators/ApologyGenerator";
import tool from "../../../data/tools/generators-apology-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ApologyGenerator />
    </>
  );
}
