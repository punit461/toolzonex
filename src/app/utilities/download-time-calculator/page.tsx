import type { Metadata } from "next";
import DownloadTimeCalculator from "../../../calculators/utilities/DownloadTimeCalculator";
import tool from "../../../data/tools/utilities-download-time-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DownloadTimeCalculator />
    </>
  );
}
