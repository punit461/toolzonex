import type { Metadata } from "next";
import SignatureMakerOnline from "../../../calculators/pdf/SignatureMakerOnline";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/signature-maker-online");

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
