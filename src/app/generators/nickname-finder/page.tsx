import type { Metadata } from "next";
import NicknameFinder from "../../../calculators/generators/NicknameFinder";
import tool from "../../../data/tools/generators-nickname-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <NicknameFinder />
    </>
  );
}
