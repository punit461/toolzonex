import type { Metadata } from "next";
import XRobotsHeaderGenerator from "../../../calculators/developer-tools/XRobotsHeaderGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/x-robots-header-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <XRobotsHeaderGenerator />
    </>
  );
}
