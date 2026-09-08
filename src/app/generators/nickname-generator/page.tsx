import type { Metadata } from "next";
import NicknameGenerator from "../../../calculators/generators/NicknameGenerator";
import tool from "../../../data/tools/generators-nickname-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <NicknameGenerator />
    </>
  );
}
