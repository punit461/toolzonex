import type { Metadata } from "next";
import WouldYouRatherGenerator from "../../../calculators/generators/WouldYouRatherGenerator";
import tool from "../../../data/tools/generators-would-you-rather-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WouldYouRatherGenerator />
    </>
  );
}
