import type { Metadata } from "next";
import NumberSequenceGenerator from "../../../calculators/utilities/NumberSequenceGenerator";
import tool from "../../../data/tools/utilities-number-sequence-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NumberSequenceGenerator />
    </>
  );
}
