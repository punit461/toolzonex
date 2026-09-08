import type { Metadata } from "next";
import TextEncryptionDecryption from "../../../calculators/text-tools/TextEncryptionDecryption";
import tool from "../../../data/tools/text-tools-text-encryption-decryption";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TextEncryptionDecryption />
    </>
  );
}
