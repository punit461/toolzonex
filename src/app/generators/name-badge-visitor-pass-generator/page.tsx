import type { Metadata } from "next";
import NameBadgeVisitorPassGenerator from "../../../calculators/generators/NameBadgeVisitorPassGenerator";
import tool from "../../../data/tools/generators-name-badge-visitor-pass-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NameBadgeVisitorPassGenerator />
    </>
  );
}
