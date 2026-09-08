import type { Metadata } from "next";
import BookSummaryTemplate from "../../../calculators/generators/BookSummaryTemplate";
import tool from "../../../data/tools/generators-book-summary-template";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BookSummaryTemplate />
    </>
  );
}
