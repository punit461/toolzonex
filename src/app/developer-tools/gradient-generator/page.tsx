import type { Metadata } from "next";
import GradientGenerator from "../../../calculators/developer-tools/GradientGenerator";
import tool from "../../../data/tools/developer-tools-gradient-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GradientGenerator />
    </>
  );
}
