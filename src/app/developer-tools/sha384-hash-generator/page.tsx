import type { Metadata } from "next";
import Sha384HashGenerator from "../../../calculators/developer-tools/Sha384HashGenerator";
import tool from "../../../data/tools/developer-tools-sha384-hash-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <Sha384HashGenerator />
    </>
  );
}
