import type { Metadata } from "next";
import DiagonalTextGenerator from "../../../calculators/generators/DiagonalTextGenerator";
import tool from "../../../data/tools/generators-diagonal-text-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DiagonalTextGenerator />
    </>
  );
}
