import type { Metadata } from "next";
import Crc32Generator from "../../../calculators/developer-tools/Crc32Generator";
import tool from "../../../data/tools/developer-tools-crc32-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <Crc32Generator />
    </>
  );
}
