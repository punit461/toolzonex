import type { Metadata } from "next";
import PowerballNumberGenerator from "../../../calculators/generators/PowerballNumberGenerator";
import tool from "../../../data/tools/generators-powerball-number-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PowerballNumberGenerator />
    </>
  );
}
