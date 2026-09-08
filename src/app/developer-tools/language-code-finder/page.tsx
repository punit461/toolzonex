import type { Metadata } from "next";
import LanguageCodeFinder from "../../../calculators/developer-tools/LanguageCodeFinder";
import tool from "../../../data/tools/developer-tools-language-code-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <LanguageCodeFinder />
    </>
  );
}
