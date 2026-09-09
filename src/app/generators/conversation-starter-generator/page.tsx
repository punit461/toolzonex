import type { Metadata } from "next";
import ConversationStarterGenerator from "../../../calculators/generators/ConversationStarterGenerator";
import tool from "../../../data/tools/generators-conversation-starter-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ConversationStarterGenerator />
    </>
  );
}
