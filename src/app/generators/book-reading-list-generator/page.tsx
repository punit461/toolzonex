import type { Metadata } from "next";
import BookReadingListGenerator from "../../../calculators/generators/BookReadingListGenerator";
import tool from "../../../data/tools/generators-book-reading-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BookReadingListGenerator />
    </>
  );
}
