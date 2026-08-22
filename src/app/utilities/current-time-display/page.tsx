import type { Metadata } from "next";
import CurrentTimeDisplay from "../../../calculators/utilities/CurrentTimeDisplay";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/current-time-display");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CurrentTimeDisplay />
    </>
  );
}
