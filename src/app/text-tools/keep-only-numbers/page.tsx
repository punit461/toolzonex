import type { Metadata } from "next";
import KeepOnlyNumbers from "../../../calculators/text-tools/KeepOnlyNumbers";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/keep-only-numbers");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <KeepOnlyNumbers />
    </>
  );
}
