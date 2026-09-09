import type { Metadata } from "next";
import JwtDecoder from "../../../calculators/developer-tools/JwtDecoder";
import tool from "../../../data/tools/developer-tools-jwt-decoder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JwtDecoder />
    </>
  );
}
