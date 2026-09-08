import type { Metadata } from "next";
import CssColorNameFinder from "../../../calculators/converters/CssColorNameFinder";
import tool from "../../../data/tools/converters-css-color-name-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CssColorNameFinder />
    </>
  );
}
