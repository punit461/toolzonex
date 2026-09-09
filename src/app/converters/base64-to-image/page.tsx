import type { Metadata } from "next";
import Base64ToImageConverter from "../../../calculators/converters/Base64ToImageConverter";
import tool from "../../../data/tools/converters-base64-to-image";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <Base64ToImageConverter />
    </>
  );
}
