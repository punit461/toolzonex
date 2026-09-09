import type { Metadata } from "next";
import OccasionMessageGenerator from "../../../calculators/generators/OccasionMessageGenerator";
import tool from "../../../data/tools/generators-occasion-message-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <OccasionMessageGenerator />
    </>
  );
}
