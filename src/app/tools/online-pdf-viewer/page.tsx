import type { Metadata } from "next";
import OnlinePdfViewer from "../../../calculators/pdf/OnlinePdfViewer";
import tool from "../../../data/tools/tools-online-pdf-viewer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <OnlinePdfViewer />
    </>
  );
}
