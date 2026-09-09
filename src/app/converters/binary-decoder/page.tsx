import type { Metadata } from "next";
import BinaryDecoder from "../../../calculators/converters/BinaryDecoder";
import tool from "../../../data/tools/converters-binary-decoder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BinaryDecoder />
    </>
  );
}
