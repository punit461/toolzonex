import type { Metadata } from "next";
import UrlEncoder from "../../../calculators/converters/UrlEncoder";
import tool from "../../../data/tools/converters-url-encode-decode";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <UrlEncoder />
    </>
  );
}
