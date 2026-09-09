import type { Metadata } from "next";
import BinaryConverter from "../../../calculators/converters/BinaryConverter";
import tool from "../../../data/tools/converters-text-to-binary";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BinaryConverter url="/converters/text-to-binary" />
    </>
  );
}
