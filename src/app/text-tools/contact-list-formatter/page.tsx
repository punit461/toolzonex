import type { Metadata } from "next";
import ContactListFormatter from "../../../calculators/text-tools/ContactListFormatter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/contact-list-formatter");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ContactListFormatter />
    </>
  );
}
