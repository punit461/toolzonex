import type { Metadata } from "next";
import ZipCodeFinder from "../../../calculators/utilities/ZipCodeFinder";
import tool from "../../../data/tools/utilities-zip-code-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ZipCodeFinder />
    </>
  );
}
