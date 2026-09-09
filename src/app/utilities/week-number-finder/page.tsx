import type { Metadata } from "next";
import WeekNumberFinder from "../../../calculators/utilities/WeekNumberFinder";
import tool from "../../../data/tools/utilities-week-number-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WeekNumberFinder />
    </>
  );
}
