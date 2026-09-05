import type { Metadata } from "next";
import KeepOnlyLetters from "../../../calculators/text-tools/KeepOnlyLetters";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/keep-only-letters");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <KeepOnlyLetters />
    </>
  );
}
