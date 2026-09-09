import type { Metadata } from "next";
import AddBlankLastPage from "../../../calculators/pdf/AddBlankLastPage";
import tool from "../../../data/tools/tools-add-blank-last-page";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddBlankLastPage />
    </>
  );
}
