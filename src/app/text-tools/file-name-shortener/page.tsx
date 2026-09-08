import type { Metadata } from "next";
import FileNameShortener from "../../../calculators/text-tools/FileNameShortener";
import tool from "../../../data/tools/text-tools-file-name-shortener";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FileNameShortener />
    </>
  );
}
