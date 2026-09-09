import type { Metadata } from "next";
import HexToText from "../../../calculators/converters/HexToText";
import tool from "../../../data/tools/converters-hex-to-text";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HexToText />
    </>
  );
}
