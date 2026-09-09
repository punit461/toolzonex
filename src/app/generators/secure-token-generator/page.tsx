import type { Metadata } from "next";
import SecureTokenGenerator from "../../../calculators/generators/SecureTokenGenerator";
import tool from "../../../data/tools/generators-secure-token-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SecureTokenGenerator />
    </>
  );
}
