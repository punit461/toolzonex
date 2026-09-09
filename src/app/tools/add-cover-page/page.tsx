import type { Metadata } from "next";
import AddCoverPage from "../../../calculators/pdf/AddCoverPage";
import tool from "../../../data/tools/tools-add-cover-page";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddCoverPage />
    </>
  );
}
