import type { Metadata } from "next";
import QueueNumberGenerator from "../../../calculators/generators/QueueNumberGenerator";
import tool from "../../../data/tools/generators-queue-number-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <QueueNumberGenerator />
    </>
  );
}
