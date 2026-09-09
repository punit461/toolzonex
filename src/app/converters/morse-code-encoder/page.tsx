import type { Metadata } from "next";
import MorseCodeEncoder from "../../../calculators/converters/MorseCodeEncoder";
import tool from "../../../data/tools/converters-morse-code-encoder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MorseCodeEncoder />
    </>
  );
}
