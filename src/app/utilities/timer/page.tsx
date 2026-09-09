import type { Metadata } from "next";
import Timer from "../../../calculators/utilities/Timer";
import tool from "../../../data/tools/utilities-timer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <Timer />
    </>
  );
}
