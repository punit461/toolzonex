import type { Metadata } from "next";
import PhoneValidator from "../../../calculators/tools/PhoneValidator";
import tool from "../../../data/tools/tools-phone-validator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PhoneValidator />
    </>
  );
}
