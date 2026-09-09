import type { Metadata } from "next";
import AgeDifferenceFinder from "../../../calculators/utilities/AgeDifferenceFinder";
import tool from "../../../data/tools/utilities-age-difference-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <AgeDifferenceFinder />
    </>
  );
}
