import type { Metadata } from "next";
import QuoteFormatter from "../../../calculators/text-tools/QuoteFormatter";
import tool from "../../../data/tools/text-tools-quote-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <QuoteFormatter />
    </>
  );
}
