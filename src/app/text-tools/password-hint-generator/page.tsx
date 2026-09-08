import type { Metadata } from "next";
import PasswordHintGenerator from "../../../calculators/text-tools/PasswordHintGenerator";
import tool from "../../../data/tools/text-tools-password-hint-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PasswordHintGenerator />
    </>
  );
}
