import type { Metadata } from "next";
import BirthstoneFinder from "../../../calculators/generators/BirthstoneFinder";
import tool from "../../../data/tools/generators-birthstone-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BirthstoneFinder />
    </>
  );
}
