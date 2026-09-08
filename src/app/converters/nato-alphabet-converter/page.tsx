import type { Metadata } from "next";
import NatoAlphabetConverter from "../../../calculators/converters/NatoAlphabetConverter";
import tool from "../../../data/tools/converters-nato-alphabet-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NatoAlphabetConverter />
    </>
  );
}
