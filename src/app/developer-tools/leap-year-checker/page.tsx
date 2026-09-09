import type { Metadata } from "next";
import LeapYearChecker from "../../../calculators/developer-tools/LeapYearChecker";
import tool from "../../../data/tools/developer-tools-leap-year-checker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LeapYearChecker />
    </>
  );
}
