import type { Metadata } from "next";
import CronJobParser from "../../../calculators/developer-tools/CronJobParser";
import tool from "../../../data/tools/developer-tools-cron-job-parser";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CronJobParser />
    </>
  );
}
