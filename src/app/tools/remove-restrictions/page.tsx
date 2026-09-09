import type { Metadata } from "next";
import RemoveRestrictions from "../../../calculators/pdf/RemoveRestrictions";
import tool from "../../../data/tools/tools-remove-restrictions";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RemoveRestrictions />
    </>
  );
}
