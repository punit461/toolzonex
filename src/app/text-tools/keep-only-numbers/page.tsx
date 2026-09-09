import type { Metadata } from "next";
import KeepOnlyNumbers from "../../../calculators/text-tools/KeepOnlyNumbers";
import tool from "../../../data/tools/text-tools-keep-only-numbers";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <KeepOnlyNumbers />
    </>
  );
}
