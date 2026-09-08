import type { Metadata } from "next";
import BrowserconfigGenerator from "../../../calculators/developer-tools/BrowserconfigGenerator";
import tool from "../../../data/tools/developer-tools-browserconfig-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BrowserconfigGenerator />
    </>
  );
}
