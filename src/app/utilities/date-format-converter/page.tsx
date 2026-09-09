import type { Metadata } from "next";
import DateFormatConverter from "../../../calculators/utilities/DateFormatConverter";
import tool from "../../../data/tools/utilities-date-format-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DateFormatConverter />
    </>
  );
}
