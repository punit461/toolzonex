import type { Metadata } from "next";
import GenrePicker from "../../../calculators/generators/GenrePicker";
import tool from "../../../data/tools/generators-genre-picker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <GenrePicker />
    </>
  );
}
