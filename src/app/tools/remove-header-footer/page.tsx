import type { Metadata } from "next";
import RemoveHeaderFooter from "../../../calculators/pdf/RemoveHeaderFooter";
import tool from "../../../data/tools/tools-remove-header-footer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RemoveHeaderFooter />
    </>
  );
}
