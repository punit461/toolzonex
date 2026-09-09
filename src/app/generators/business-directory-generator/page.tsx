import type { Metadata } from "next";
import BusinessDirectoryGenerator from "../../../calculators/generators/BusinessDirectoryGenerator";
import tool from "../../../data/tools/generators-business-directory-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BusinessDirectoryGenerator />
    </>
  );
}
