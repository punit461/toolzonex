import type { Metadata } from "next";
import SpinTheBottleGenerator from "../../../calculators/generators/SpinTheBottleGenerator";
import tool from "../../../data/tools/generators-spin-the-bottle-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SpinTheBottleGenerator />
    </>
  );
}
