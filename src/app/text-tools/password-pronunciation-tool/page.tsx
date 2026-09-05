import type { Metadata } from "next";
import PasswordPronunciationTool from "../../../calculators/text-tools/PasswordPronunciationTool";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/password-pronunciation-tool");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PasswordPronunciationTool />
    </>
  );
}
