import type { Metadata } from "next";
import Ripemd160Generator from "../../../calculators/developer-tools/Ripemd160Generator";
import tool from "../../../data/tools/developer-tools-ripemd160-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <Ripemd160Generator />
    </>
  );
}
