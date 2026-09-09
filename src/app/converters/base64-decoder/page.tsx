import type { Metadata } from "next";
import Base64Decoder from "../../../calculators/converters/Base64Decoder";
import tool from "../../../data/tools/converters-base64-decoder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <Base64Decoder />
    </>
  );
}
