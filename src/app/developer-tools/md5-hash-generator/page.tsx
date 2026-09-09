import type { Metadata } from "next";
import Md5HashGenerator from "../../../calculators/developer-tools/Md5HashGenerator";
import tool from "../../../data/tools/developer-tools-md5-hash-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <Md5HashGenerator />
    </>
  );
}
