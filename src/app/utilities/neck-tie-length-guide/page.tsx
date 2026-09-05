import type { Metadata } from "next";
import NeckTieLengthGuide from "../../../calculators/utilities/NeckTieLengthGuide";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/neck-tie-length-guide");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NeckTieLengthGuide />
    </>
  );
}
