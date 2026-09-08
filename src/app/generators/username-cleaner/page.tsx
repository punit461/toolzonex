import type { Metadata } from "next";
import UsernameCleaner from "../../../calculators/generators/UsernameCleaner";
import tool from "../../../data/tools/generators-username-cleaner";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <UsernameCleaner />
    </>
  );
}
