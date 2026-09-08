import type { Metadata } from "next";
import SecretCodeEncoderDecoder from "../../../calculators/converters/SecretCodeEncoderDecoder";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/converters/secret-code-encoder-decoder");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SecretCodeEncoderDecoder />
    </>
  );
}
