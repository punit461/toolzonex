import type { Metadata } from "next";
import TopicGenerator from "../../../calculators/generators/TopicGenerator";
import tool from "../../../data/tools/generators-topic-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TopicGenerator />
    </>
  );
}
