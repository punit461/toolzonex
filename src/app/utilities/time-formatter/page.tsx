import type { Metadata } from "next";
import TimeFormatter from "../../../calculators/utilities/TimeFormatter";
import tool from "../../../data/tools/utilities-time-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TimeFormatter />
    </>
  );
}
