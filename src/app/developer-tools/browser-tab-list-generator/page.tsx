import type { Metadata } from "next";
import BrowserTabListGenerator from "../../../calculators/developer-tools/BrowserTabListGenerator";
import tool from "../../../data/tools/developer-tools-browser-tab-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BrowserTabListGenerator />
    </>
  );
}
