import type { Metadata } from "next";
import GradientLibrary from "../../../calculators/developer-tools/GradientLibrary";
import tool from "../../../data/tools/developer-tools-gradient-library";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GradientLibrary />
    </>
  );
}
