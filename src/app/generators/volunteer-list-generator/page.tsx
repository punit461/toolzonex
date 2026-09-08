import type { Metadata } from "next";
import VolunteerListGenerator from "../../../calculators/generators/VolunteerListGenerator";
import tool from "../../../data/tools/generators-volunteer-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <VolunteerListGenerator />
    </>
  );
}
