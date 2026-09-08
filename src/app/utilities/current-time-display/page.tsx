import type { Metadata } from "next";
import CurrentTimeDisplay from "../../../calculators/utilities/CurrentTimeDisplay";
import tool from "../../../data/tools/utilities-current-time-display";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CurrentTimeDisplay />
    </>
  );
}
