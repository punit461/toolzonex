import type { Metadata } from "next";
import FileTypeIdentifier from "../../../calculators/developer-tools/FileTypeIdentifier";
import tool from "../../../data/tools/developer-tools-file-type-identifier";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <FileTypeIdentifier />
    </>
  );
}
