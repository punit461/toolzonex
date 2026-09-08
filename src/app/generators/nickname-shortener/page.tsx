import type { Metadata } from "next";
import NicknameShortener from "../../../calculators/generators/NicknameShortener";
import tool from "../../../data/tools/generators-nickname-shortener";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NicknameShortener />
    </>
  );
}
