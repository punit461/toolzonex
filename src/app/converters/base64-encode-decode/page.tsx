import type { Metadata } from "next";
import Base64Converter from "../../../calculators/converters/Base64Converter";
import tool from "../../../data/tools/converters-base64-encode-decode";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <Base64Converter />
    </>
  );
}
