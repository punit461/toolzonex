import type { Metadata } from "next";
import ContrastColorFinder from "../../../calculators/developer-tools/ContrastColorFinder";
import tool from "../../../data/tools/developer-tools-contrast-color-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ContrastColorFinder />
    </>
  );
}
