import type { Metadata } from "next";
import ReversePdfPages from "../../../calculators/pdf/ReversePdfPages";
import tool from "../../../data/tools/tools-reverse-pdf-pages";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ReversePdfPages />
    </>
  );
}
