import type { Metadata } from "next";
import EventNameGenerator from "../../../calculators/generators/EventNameGenerator";
import tool from "../../../data/tools/generators-event-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <EventNameGenerator />
    </>
  );
}
