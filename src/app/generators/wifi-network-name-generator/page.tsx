import type { Metadata } from "next";
import WifiNetworkNameGenerator from "../../../calculators/generators/WifiNetworkNameGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/wifi-network-name-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WifiNetworkNameGenerator />
    </>
  );
}
