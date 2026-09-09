import type { Metadata } from "next";
import PasswordStrengthChecker from "../../../calculators/tools/PasswordStrengthChecker";
import tool from "../../../data/tools/tools-password-strength-checker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PasswordStrengthChecker />
    </>
  );
}
