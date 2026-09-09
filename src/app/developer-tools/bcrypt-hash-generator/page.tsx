import type { Metadata } from "next";
import BcryptHashGenerator from "../../../calculators/developer-tools/BcryptHashGenerator";
import tool from "../../../data/tools/developer-tools-bcrypt-hash-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BcryptHashGenerator />
    </>
  );
}
