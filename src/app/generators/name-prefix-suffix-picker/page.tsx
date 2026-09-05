import type { Metadata } from "next";
import NamePrefixSuffixPicker from "../../../calculators/generators/NamePrefixSuffixPicker";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/name-prefix-suffix-picker");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NamePrefixSuffixPicker />
    </>
  );
}
