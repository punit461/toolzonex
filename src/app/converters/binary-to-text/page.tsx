import type { Metadata } from "next";
import BinaryConverter from "../../../calculators/converters/BinaryConverter";
import tool from "../../../data/tools/converters-binary-to-text";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BinaryConverter />
    </>
  );
}
