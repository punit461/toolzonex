import type { Metadata } from "next";
import SvgToJsx from "../../../calculators/developer-tools/SvgToJsx";
import tool from "../../../data/tools/developer-tools-svg-to-jsx";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SvgToJsx />
    </>
  );
}
