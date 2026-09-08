import type { Metadata } from "next";
import TextColumnizer from "../../../calculators/text-tools/TextColumnizer";
import tool from "../../../data/tools/text-tools-text-columnizer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TextColumnizer />
    </>
  );
}
