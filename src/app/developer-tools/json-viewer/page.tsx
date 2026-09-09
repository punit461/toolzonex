import type { Metadata } from "next";
import JsonViewer from "../../../calculators/developer-tools/JsonViewer";
import tool from "../../../data/tools/developer-tools-json-viewer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonViewer />
    </>
  );
}
