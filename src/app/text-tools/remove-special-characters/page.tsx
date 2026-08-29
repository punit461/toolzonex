import type { Metadata } from "next";
import RemoveSpecialCharacters from "../../../calculators/text-tools/RemoveSpecialCharacters";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/remove-special-characters");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RemoveSpecialCharacters />
    </>
  );
}
