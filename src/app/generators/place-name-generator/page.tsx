import type { Metadata } from "next";
import PlaceNameGenerator from "../../../calculators/generators/PlaceNameGenerator";
import tool from "../../../data/tools/generators-place-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PlaceNameGenerator />
    </>
  );
}
