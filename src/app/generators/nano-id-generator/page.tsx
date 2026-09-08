import type { Metadata } from "next";
import NanoIdGenerator from "../../../calculators/generators/NanoIdGenerator";
import tool from "../../../data/tools/generators-nano-id-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NanoIdGenerator />
    </>
  );
}
