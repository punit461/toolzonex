import type { Metadata } from "next";
import WeekendFinder from "../../../calculators/utilities/WeekendFinder";
import tool from "../../../data/tools/utilities-weekend-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WeekendFinder />
    </>
  );
}
