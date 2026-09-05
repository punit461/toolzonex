import type { Metadata } from "next";
import EmergencyIdContactCardGenerator from "../../../calculators/generators/EmergencyIdContactCardGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/emergency-id-contact-card-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <EmergencyIdContactCardGenerator />
    </>
  );
}
