import type { Metadata } from "next";
import CssGlassmorphismGenerator from "../../../calculators/developer-tools/CssGlassmorphismGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/css-glassmorphism-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CssGlassmorphismGenerator />
    </>
  );
}
