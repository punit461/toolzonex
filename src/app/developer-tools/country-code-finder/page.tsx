import type { Metadata } from "next";
import CountryCodeFinder from "../../../calculators/developer-tools/CountryCodeFinder";
import tool from "../../../data/tools/developer-tools-country-code-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CountryCodeFinder />
    </>
  );
}
