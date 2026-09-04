import type { Metadata } from "next";
import CssToTemplateLiteral from "../../../calculators/developer-tools/CssToTemplateLiteral";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/css-to-template-literal");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CssToTemplateLiteral />
    </>
  );
}
