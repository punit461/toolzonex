import type { Metadata } from "next";
import BabyCareLog from "../../../calculators/generators/BabyCareLog";
import tool from "../../../data/tools/generators-baby-care-log";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BabyCareLog />
    </>
  );
}
