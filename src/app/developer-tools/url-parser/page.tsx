import type { Metadata } from "next";
import UrlParser from "../../../calculators/developer-tools/UrlParser";
import tool from "../../../data/tools/developer-tools-url-parser";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <UrlParser />
    </>
  );
}
