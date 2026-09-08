import type { Metadata } from "next";
import DateFormatter from "../../../calculators/utilities/DateFormatter";
import tool from "../../../data/tools/utilities-date-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DateFormatter />
    </>
  );
}
