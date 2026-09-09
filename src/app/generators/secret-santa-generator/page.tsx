import type { Metadata } from "next";
import SecretSantaGenerator from "../../../calculators/generators/SecretSantaGenerator";
import tool from "../../../data/tools/generators-secret-santa-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SecretSantaGenerator />
    </>
  );
}
