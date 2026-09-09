import type { Metadata } from "next";
import NameInitialsGenerator from "../../../calculators/generators/NameInitialsGenerator";
import tool from "../../../data/tools/generators-name-initials-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NameInitialsGenerator />
    </>
  );
}
