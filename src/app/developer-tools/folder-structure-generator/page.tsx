import type { Metadata } from "next";
import FolderStructureGenerator from "../../../calculators/developer-tools/FolderStructureGenerator";
import tool from "../../../data/tools/developer-tools-folder-structure-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <FolderStructureGenerator />
    </>
  );
}
