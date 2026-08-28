import type { Metadata } from "next";
import ChangePdfTextColor from "../../../calculators/pdf/ChangePdfTextColor";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/change-pdf-text-color");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ChangePdfTextColor />
    </>
  );
}
