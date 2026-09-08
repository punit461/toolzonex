import type { Metadata } from "next";
import TextDivider from "../../../calculators/text-tools/TextDivider";
import tool from "../../../data/tools/text-tools-text-divider";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TextDivider />
    </>
  );
}
