import type { Metadata } from "next";
import TimeFormatConverter from "../../../calculators/utilities/TimeFormatConverter";
import tool from "../../../data/tools/utilities-time-format-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TimeFormatConverter />
    </>
  );
}
