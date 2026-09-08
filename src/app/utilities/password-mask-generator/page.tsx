import type { Metadata } from "next";
import PasswordMaskGenerator from "../../../calculators/utilities/PasswordMaskGenerator";
import tool from "../../../data/tools/utilities-password-mask-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PasswordMaskGenerator />
    </>
  );
}
