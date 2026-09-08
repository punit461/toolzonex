import type { Metadata } from "next";
import RemoveEmptyLines from "../../../calculators/text-tools/RemoveEmptyLines";
import tool from "../../../data/tools/text-tools-remove-empty-lines";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RemoveEmptyLines />
    </>
  );
}
