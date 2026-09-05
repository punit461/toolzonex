import type { Metadata } from "next";
import DuplicateFileNameChecker from "../../../calculators/text-tools/DuplicateFileNameChecker";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/duplicate-file-name-checker");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DuplicateFileNameChecker />
    </>
  );
}
