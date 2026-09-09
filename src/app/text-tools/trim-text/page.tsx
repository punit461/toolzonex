import type { Metadata } from "next";
import TrimText from "../../../calculators/text-tools/TrimText";
import tool from "../../../data/tools/text-tools-trim-text";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TrimText />
    </>
  );
}
