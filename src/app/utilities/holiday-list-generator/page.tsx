import type { Metadata } from "next";
import HolidayListGenerator from "../../../calculators/utilities/HolidayListGenerator";
import tool from "../../../data/tools/utilities-holiday-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HolidayListGenerator />
    </>
  );
}
