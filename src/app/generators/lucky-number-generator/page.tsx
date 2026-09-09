import type { Metadata } from "next";
import LuckyNumberGenerator from "../../../calculators/generators/LuckyNumberGenerator";
import tool from "../../../data/tools/generators-lucky-number-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LuckyNumberGenerator />
    </>
  );
}
