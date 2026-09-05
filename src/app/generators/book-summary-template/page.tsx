import type { Metadata } from "next";
import BookSummaryTemplate from "../../../calculators/generators/BookSummaryTemplate";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/book-summary-template");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BookSummaryTemplate />
    </>
  );
}
