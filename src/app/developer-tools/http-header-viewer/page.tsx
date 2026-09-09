import type { Metadata } from "next";
import HttpHeaderViewer from "../../../calculators/developer-tools/HttpHeaderViewer";
import tool from "../../../data/tools/developer-tools-http-header-viewer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HttpHeaderViewer />
    </>
  );
}
