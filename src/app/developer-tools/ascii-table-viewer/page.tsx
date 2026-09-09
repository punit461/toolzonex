import type { Metadata } from "next";
import AsciiTableViewer from "../../../calculators/developer-tools/AsciiTableViewer";
import tool from "../../../data/tools/developer-tools-ascii-table-viewer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <AsciiTableViewer />
    </>
  );
}
