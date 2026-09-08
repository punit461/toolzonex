import type { Metadata } from "next";
import CssToTailwindcss from "../../../calculators/developer-tools/CssToTailwindcss";
import tool from "../../../data/tools/developer-tools-css-to-tailwindcss";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
