import type { Metadata } from "next";
import FileExtensionExtractor from "../../../calculators/text-tools/FileExtensionExtractor";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/file-extension-extractor");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FileExtensionExtractor />
    </>
  );
}
