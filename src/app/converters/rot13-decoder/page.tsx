import type { Metadata } from "next";
import Rot13Decoder from "../../../calculators/converters/Rot13Decoder";
import tool from "../../../data/tools/converters-rot13-decoder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <Rot13Decoder />
    </>
  );
}
