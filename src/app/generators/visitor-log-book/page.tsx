import type { Metadata } from "next";
import VisitorLogBook from "../../../calculators/generators/VisitorLogBook";
import tool from "../../../data/tools/generators-visitor-log-book";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <VisitorLogBook />
    </>
  );
}
