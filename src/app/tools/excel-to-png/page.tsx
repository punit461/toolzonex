import type { Metadata } from "next";
import ExcelToPng from "../../../calculators/pdf/ExcelToPng";
import tool from "../../../data/tools/tools-excel-to-png";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ExcelToPng />
    </>
  );
}
