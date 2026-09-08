import type { Metadata } from "next";
import IniFormatter from "../../../calculators/developer-tools/IniFormatter";
import tool from "../../../data/tools/developer-tools-ini-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <IniFormatter />
    </>
  );
}
