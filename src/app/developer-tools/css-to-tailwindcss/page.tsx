import type { Metadata } from "next";
import CssToTailwindcss from "../../../calculators/developer-tools/CssToTailwindcss";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/css-to-tailwindcss");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CssToTailwindcss />
    </>
  );
}
