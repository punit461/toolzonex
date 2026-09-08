import type { Metadata } from "next";
import Sha224Generator from "../../../calculators/developer-tools/Sha224Generator";
import tool from "../../../data/tools/developer-tools-sha224-hash-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <Sha224Generator />
    </>
  );
}
