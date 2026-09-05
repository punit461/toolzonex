import type { Metadata } from "next";
import TimezoneListViewer from "../../../calculators/utilities/TimezoneListViewer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/timezone-list-viewer");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TimezoneListViewer />
    </>
  );
}
