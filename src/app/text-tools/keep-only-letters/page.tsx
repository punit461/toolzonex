import type { Metadata } from "next";
import KeepOnlyLetters from "../../../calculators/text-tools/KeepOnlyLetters";
import tool from "../../../data/tools/text-tools-keep-only-letters";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <KeepOnlyLetters />
    </>
  );
}
