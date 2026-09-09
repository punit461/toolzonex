import type { Metadata } from "next";
import NamePrefixSuffixPicker from "../../../calculators/generators/NamePrefixSuffixPicker";
import tool from "../../../data/tools/generators-name-prefix-suffix-picker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NamePrefixSuffixPicker />
    </>
  );
}
