import type { Metadata } from "next";
import JournalReflectionTemplate from "../../../calculators/generators/JournalReflectionTemplate";
import tool from "../../../data/tools/generators-journal-reflection-template";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <JournalReflectionTemplate />
    </>
  );
}
