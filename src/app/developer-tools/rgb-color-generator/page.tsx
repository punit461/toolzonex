import type { Metadata } from "next";
import RgbColorGenerator from "../../../calculators/developer-tools/RgbColorGenerator";
import tool from "../../../data/tools/developer-tools-rgb-color-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RgbColorGenerator />
    </>
  );
}
