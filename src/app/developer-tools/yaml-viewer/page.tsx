import type { Metadata } from "next";
import YamlTreeViewer from "../../../calculators/developer-tools/YamlTreeViewer";
import tool from "../../../data/tools/developer-tools-yaml-viewer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <YamlTreeViewer />
    </>
  );
}
