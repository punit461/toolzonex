import type { Metadata } from "next";
import HexColorValidator from "../../../calculators/converters/HexColorValidator";
import tool from "../../../data/tools/converters-hex-color-validator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HexColorValidator />
    </>
  );
}
