import type { Metadata } from "next";
import GoodMorningNightMessageGenerator from "../../../calculators/generators/GoodMorningNightMessageGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/good-morning-night-message-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <GoodMorningNightMessageGenerator />
    </>
  );
}
