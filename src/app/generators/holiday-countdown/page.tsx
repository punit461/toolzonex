import type { Metadata } from "next";
import HolidayCountdown from "../../../calculators/generators/HolidayCountdown";
import tool from "../../../data/tools/generators-holiday-countdown";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HolidayCountdown />
    </>
  );
}
