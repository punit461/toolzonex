import type { Metadata } from "next";
import ContactListFormatter from "../../../calculators/text-tools/ContactListFormatter";
import tool from "../../../data/tools/text-tools-contact-list-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ContactListFormatter />
    </>
  );
}
