import type { Metadata } from "next";
import JavascriptToJson from "../../../calculators/developer-tools/JavascriptToJson";
import tool from "../../../data/tools/developer-tools-javascript-to-json";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JavascriptToJson />
    </>
  );
}
