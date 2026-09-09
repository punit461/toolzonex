import type { Metadata } from "next";
import UuidValidator from "../../../calculators/developer-tools/UuidValidator";
import tool from "../../../data/tools/developer-tools-uuid-validator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <UuidValidator />
    </>
  );
}
