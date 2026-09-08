import type { Metadata } from "next";
import RandomHobbyGenerator from "../../../calculators/generators/RandomHobbyGenerator";
import tool from "../../../data/tools/generators-random-hobby-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RandomHobbyGenerator />
    </>
  );
}
