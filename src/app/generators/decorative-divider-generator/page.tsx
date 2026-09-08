import type { Metadata } from "next";
import DecorativeDividerGenerator from "../../../calculators/generators/DecorativeDividerGenerator";
import tool from "../../../data/tools/generators-decorative-divider-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DecorativeDividerGenerator />
    </>
  );
}
