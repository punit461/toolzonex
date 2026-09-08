import type { Metadata } from "next";
import TicketStubGenerator from "../../../calculators/generators/TicketStubGenerator";
import tool from "../../../data/tools/generators-ticket-stub-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TicketStubGenerator />
    </>
  );
}
