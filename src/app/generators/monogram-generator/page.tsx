import type { Metadata } from "next";
import MonogramGenerator from "../../../calculators/generators/MonogramGenerator";
import tool from "../../../data/tools/generators-monogram-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MonogramGenerator />
    </>
  );
}
