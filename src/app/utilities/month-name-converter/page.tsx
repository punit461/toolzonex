import type { Metadata } from "next";
import MonthNameConverter from "../../../calculators/utilities/MonthNameConverter";
import tool from "../../../data/tools/utilities-month-name-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MonthNameConverter />
    </>
  );
}
