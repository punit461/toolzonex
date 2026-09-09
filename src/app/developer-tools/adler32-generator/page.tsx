import type { Metadata } from "next";
import Adler32Generator from "../../../calculators/developer-tools/Adler32Generator";
import tool from "../../../data/tools/developer-tools-adler32-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <Adler32Generator />
    </>
  );
}
