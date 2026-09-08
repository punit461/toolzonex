import type { Metadata } from "next";
import RandomPinGenerator from "../../../calculators/generators/RandomPinGenerator";
import tool from "../../../data/tools/generators-random-pin-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RandomPinGenerator />
    </>
  );
}
