import type { Metadata } from "next";
import SignatureTextFormatter from "../../../calculators/text-tools/SignatureTextFormatter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/signature-text-formatter");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SignatureTextFormatter />
    </>
  );
}
