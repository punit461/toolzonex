import type { Metadata } from "next";
import DuplicatePdfPages from "../../../calculators/pdf/DuplicatePdfPages";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/duplicate-pdf-pages");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DuplicatePdfPages />
    </>
  );
}
