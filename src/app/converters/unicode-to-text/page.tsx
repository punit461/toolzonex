import type { Metadata } from "next";
import UnicodeToText from "../../../calculators/converters/UnicodeToText";
import tool from "../../../data/tools/converters-unicode-to-text";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <UnicodeToText />
    </>
  );
}
