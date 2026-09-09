import type { Metadata } from "next";
import RemoveExtraSpaces from "../../../calculators/text-tools/RemoveExtraSpaces";
import tool from "../../../data/tools/text-tools-remove-extra-spaces";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RemoveExtraSpaces />
    </>
  );
}
