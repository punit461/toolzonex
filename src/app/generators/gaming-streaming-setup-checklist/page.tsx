import type { Metadata } from "next";
import GamingStreamingSetupChecklist from "../../../calculators/generators/GamingStreamingSetupChecklist";
import tool from "../../../data/tools/generators-gaming-streaming-setup-checklist";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <GamingStreamingSetupChecklist />
    </>
  );
}
