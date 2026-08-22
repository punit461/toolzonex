import type { Metadata } from "next";
import PasswordStrengthChecker from "../../../calculators/tools/PasswordStrengthChecker";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/password-strength-checker");

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
