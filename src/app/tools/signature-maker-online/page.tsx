import type { Metadata } from "next";
import SignatureMakerOnline from "../../../calculators/pdf/SignatureMakerOnline";
import tool from "../../../data/tools/tools-signature-maker-online";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SignatureMakerOnline />
    </>
  );
}
