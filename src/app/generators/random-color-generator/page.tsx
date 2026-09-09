import type { Metadata } from "next";
import RandomColorGenerator from "../../../calculators/generators/RandomColorGenerator";
import tool from "../../../data/tools/generators-random-color-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomColorGenerator />
    </>
  );
}
